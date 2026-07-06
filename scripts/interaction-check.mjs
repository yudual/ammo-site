#!/usr/bin/env node

import fs from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'
import process from 'node:process'
import { spawn, spawnSync } from 'node:child_process'
import { projectRoot } from './lib/research-utils.mjs'

let nextCdpId = 1

function spawnCli(command, args, options) {
  if (process.platform === 'win32') {
    return spawn('cmd.exe', ['/d', '/s', '/c', [command, ...args].join(' ')], {
      ...options,
      shell: false,
    })
  }

  return spawn(command, args, {
    ...options,
    shell: false,
  })
}

function stopProcessTree(child) {
  if (!child?.pid) return

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' })
    return
  }

  child.kill('SIGTERM')
}

function findFreePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE' || error.code === 'EACCES') {
        findFreePort(startPort + 1).then(resolve, reject)
        return
      }
      reject(error)
    })
    server.listen(startPort, '127.0.0.1', () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })
  })
}

async function waitForHttp(url, timeoutMs = 15000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Server is warming up.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`等待服务超时：${url}`)
}

function findChromeExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.GOOGLE_CHROME_BIN,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)

  for (const candidate of candidates) {
    try {
      spawnSync(candidate, ['--version'], { stdio: 'ignore' })
      return candidate
    } catch {
      // Try next candidate.
    }
  }

  return ''
}

function connectCdp(wsUrl) {
  const socket = new WebSocket(wsUrl)
  const pending = new Map()
  const listeners = new Map()

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)

    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(message.error.message || JSON.stringify(message.error)))
      else resolve(message.result || {})
      return
    }

    const callbacks = listeners.get(message.method) || []
    for (const callback of callbacks) callback(message.params || {})
  })

  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      resolve({
        send(method, params = {}) {
          const id = nextCdpId++
          socket.send(JSON.stringify({ id, method, params }))
          return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
        },
        on(method, callback) {
          listeners.set(method, [...(listeners.get(method) || []), callback])
        },
        close() {
          socket.close()
        },
      })
    })
    socket.addEventListener('error', reject)
  })
}

async function createCdpTarget(cdpBase, url) {
  let response = await fetch(`${cdpBase}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' })

  if (!response.ok) {
    response = await fetch(`${cdpBase}/json/new?${encodeURIComponent(url)}`)
  }

  if (!response.ok) {
    throw new Error(`创建浏览器标签页失败：HTTP ${response.status}`)
  }

  return response.json()
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  })

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || '页面脚本执行失败')
  }

  return result.result?.value
}

async function navigate(client, baseUrl, route, width = 390, height = 844) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 640,
  })
  await client.send('Page.navigate', { url: `${baseUrl}${route}` })
  const startedAt = Date.now()
  while (Date.now() - startedAt < 10000) {
    const currentPath = await evaluate(client, 'location.pathname + location.search')
    if (currentPath === route) {
      break
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  await new Promise((resolve) => setTimeout(resolve, 350))
}

function assertCheck(name, condition, details = {}) {
  if (!condition) {
    throw new Error(`${name} 未通过：${JSON.stringify(details)}`)
  }
  return { name, ok: true, details }
}

async function runInteractionChecks(cdpBase, baseUrl) {
  const target = await createCdpTarget(cdpBase, 'about:blank')
  const client = await connectCdp(target.webSocketDebuggerUrl)
  const consoleErrors = []
  const results = []

  try {
    await client.send('Page.enable')
    await client.send('Runtime.enable')
    await client.send('Log.enable')
    client.on('Runtime.exceptionThrown', (params) => {
      consoleErrors.push(params.exceptionDetails?.text || 'runtime exception')
    })
    client.on('Log.entryAdded', (params) => {
      if (params.entry?.level === 'error') consoleErrors.push(params.entry.text || 'log error')
    })

    for (const route of ['/', '/companies', '/universities', '/companies/1', '/universities/aust']) {
      await navigate(client, baseUrl, route)
      const mobile = await evaluate(client, `(() => {
        const root = document.documentElement;
        const body = document.body;
        return {
          route: location.pathname + location.search,
          overflow: Math.max(root.scrollWidth, body.scrollWidth) > root.clientWidth + 1,
          blank: body.innerText.trim().length < 20
        };
      })()`)
      results.push(assertCheck(`移动端无横向溢出 ${route}`, !mobile.overflow && !mobile.blank, mobile))
    }

    await navigate(client, baseUrl, '/companies?page=99&size=10')
    const companyClamp = await evaluate(client, `(() => ({
      url: location.pathname + location.search,
      hasRows: document.querySelectorAll('article').length > 0,
      noEmptyState: !document.body.innerText.includes('没有匹配的企业')
    }))()`)
    results.push(assertCheck('企业列表页码越界夹紧', companyClamp.hasRows && companyClamp.noEmptyState && companyClamp.url.includes('page='), companyClamp))

    await navigate(client, baseUrl, '/universities?page=99&size=10')
    const universityClamp = await evaluate(client, `(() => ({
      url: location.pathname + location.search,
      hasRows: document.querySelectorAll('article').length > 0,
      noEmptyState: !document.body.innerText.includes('没有匹配的院校')
    }))()`)
    results.push(assertCheck('院校列表页码越界夹紧', universityClamp.hasRows && universityClamp.noEmptyState && universityClamp.url.includes('page='), universityClamp))

    await navigate(client, baseUrl, '/companies')
    const companyFlow = await evaluate(client, `(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const waitFor = async (getter, label, timeout = 3000) => {
        const startedAt = Date.now();
        while (Date.now() - startedAt < timeout) {
          const value = getter();
          if (value) return value;
          await wait(50);
        }
        throw new Error('等待页面元素超时：' + label);
      };
      const input = await waitFor(() => document.querySelector('input[placeholder="公司、城市、岗位、民爆、火工品"]'), '企业筛选输入框');
      input.value = '防爆';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await wait(350);
      const detail = await waitFor(() => [...document.querySelectorAll('a[href^="/companies/"]')].find((link) => link.textContent.includes('看详情')), '企业详情入口');
      detail.click();
      await waitFor(() => location.pathname.startsWith('/companies/') && document.querySelector('h1')?.innerText.trim(), '企业详情页');
      const before = { url: location.pathname + location.search, h1: document.querySelector('h1')?.innerText || '' };
      const next = [...document.querySelectorAll('nav[aria-label="相邻条目"] a[href^="/companies/"]')].find((link) => link.textContent.includes('下一家'));
      if (next) {
        next.click();
        await waitFor(() => (location.pathname + location.search) !== before.url && (document.querySelector('h1')?.innerText || '') !== before.h1, '企业下一家切换');
      }
      const after = { url: location.pathname + location.search, h1: document.querySelector('h1')?.innerText || '' };
      const back = await waitFor(() => [...document.querySelectorAll('button')].find((button) => button.textContent.includes('回企业名录')), '回企业名录按钮');
      back.click();
      await waitFor(() => location.pathname === '/companies' && document.querySelector('h1')?.innerText.includes('企业名录'), '企业名录返回');
      return {
        before,
        after,
        finalUrl: location.pathname + location.search,
        finalH1: document.querySelector('h1')?.innerText || '',
        switched: before.url !== after.url && before.h1 !== after.h1
      };
    })()`)
    results.push(assertCheck('企业筛选详情切换返回', companyFlow.switched && companyFlow.finalUrl.includes('keyword=') && companyFlow.finalH1.includes('企业名录'), companyFlow))

    await navigate(client, baseUrl, '/universities')
    const universityFlow = await evaluate(client, `(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const waitFor = async (getter, label, timeout = 3000) => {
        const startedAt = Date.now();
        while (Date.now() - startedAt < timeout) {
          const value = getter();
          if (value) return value;
          await wait(50);
        }
        throw new Error('等待页面元素超时：' + label);
      };
      const input = await waitFor(() => document.querySelector('input[placeholder="比如：北京、兵器、211"]'), '院校筛选输入框');
      input.value = '北京';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await wait(350);
      const detail = await waitFor(() => [...document.querySelectorAll('a[href^="/universities/"]')].find((link) => link.textContent.includes('看详情')), '院校详情入口');
      detail.click();
      await waitFor(() => location.pathname.startsWith('/universities/') && document.querySelector('h1')?.innerText.trim(), '院校详情页');
      const before = { url: location.pathname + location.search, h1: document.querySelector('h1')?.innerText || '' };
      const next = [...document.querySelectorAll('nav[aria-label="相邻条目"] a[href^="/universities/"]')].find((link) => link.textContent.includes('下一所'));
      if (next) {
        next.click();
        await waitFor(() => (location.pathname + location.search) !== before.url && (document.querySelector('h1')?.innerText || '') !== before.h1, '院校下一所切换');
      }
      const after = { url: location.pathname + location.search, h1: document.querySelector('h1')?.innerText || '' };
      const share = await waitFor(() => [...document.querySelectorAll('button')].find((button) => button.textContent.includes('分享本页')), '分享本页按钮');
      share.click();
      await waitFor(() => document.body.innerText.includes('链接已复制'), '复制反馈');
      const copiedText = document.body.innerText.includes('链接已复制');
      const back = await waitFor(() => [...document.querySelectorAll('button')].find((button) => button.textContent.includes('回院校一览')), '回院校一览按钮');
      back.click();
      await waitFor(() => location.pathname === '/universities' && document.querySelector('h1')?.innerText.includes('院校一览'), '院校一览返回');
      return {
        before,
        after,
        copiedText,
        finalUrl: location.pathname + location.search,
        finalH1: document.querySelector('h1')?.innerText || '',
        switched: before.url !== after.url && before.h1 !== after.h1
      };
    })()`)
    results.push(assertCheck('院校筛选详情切换返回与复制反馈', universityFlow.switched && universityFlow.copiedText && universityFlow.finalUrl.includes('keyword=') && universityFlow.finalH1.includes('院校一览'), universityFlow))

    await navigate(client, baseUrl, '/')
    const searchFlow = await evaluate(client, `(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const waitFor = async (getter, label, timeout = 3000) => {
        const startedAt = Date.now();
        while (Date.now() - startedAt < timeout) {
          const value = getter();
          if (value) return value;
          await wait(50);
        }
        throw new Error('等待页面元素超时：' + label);
      };
      const searchButton = await waitFor(() => document.querySelector('button[aria-label="全站搜索"]'), '全站搜索按钮');
      searchButton.click();
      const input = await waitFor(() => document.querySelector('input[aria-label="搜索关键词"]'), '全站搜索输入框');
      const opened = Boolean(input);
      input.value = '控制';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await waitFor(() => document.body.innerText.includes('考研') || document.body.innerText.includes('控制科学'), '搜索结果');
      const hasGraduate = document.body.innerText.includes('考研') || document.body.innerText.includes('控制科学');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await waitFor(() => location.pathname.startsWith('/graduate'), '搜索跳转');
      return {
        opened,
        hasGraduate,
        finalUrl: location.pathname + location.search,
        h1: document.querySelector('h1')?.innerText || ''
      };
    })()`)
    results.push(assertCheck('全站搜索打开搜索考研方向并跳转', searchFlow.opened && searchFlow.hasGraduate && searchFlow.finalUrl.startsWith('/graduate'), searchFlow))

    const external = await evaluate(client, `(() => {
      const links = [...document.querySelectorAll('a[target="_blank"]')];
      return {
        total: links.length,
        empty: links.filter((link) => !link.getAttribute('href')).length,
        withoutNoopener: links.filter((link) => !String(link.rel || '').includes('noopener')).length
      };
    })()`)
    results.push(assertCheck('外链 href 和 noopener', external.empty === 0 && external.withoutNoopener === 0, external))

    results.push(assertCheck('控制台无错误', consoleErrors.length === 0, { consoleErrors }))

    return results
  } finally {
    client.close()
    await fetch(`${cdpBase}/json/close/${target.id}`).catch(() => null)
  }
}

async function main() {
  if (typeof WebSocket === 'undefined') {
    throw new Error('当前 Node 版本没有 WebSocket，无法执行交互检查。')
  }

  const chromeExecutable = findChromeExecutable()
  if (!chromeExecutable) {
    throw new Error('未找到 Chrome / Edge，无法执行交互检查。')
  }

  const previewPort = await findFreePort(4173)
  const cdpPort = await findFreePort(9223)
  const baseUrl = `http://127.0.0.1:${previewPort}`
  const cdpBase = `http://127.0.0.1:${cdpPort}`
  const chromeUserDataDir = path.join(projectRoot, `.chrome-cdp-interaction-${Date.now()}`)
  let previewProcess
  let chromeProcess

  try {
    previewProcess = spawnCli('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(previewPort)], {
      cwd: projectRoot,
      stdio: 'ignore',
    })
    await waitForHttp(baseUrl)

    chromeProcess = spawn(chromeExecutable, [
      '--headless=new',
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${chromeUserDataDir}`,
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ], {
      cwd: projectRoot,
      stdio: 'ignore',
      shell: false,
    })
    await waitForHttp(`${cdpBase}/json/version`)

    const results = await runInteractionChecks(cdpBase, baseUrl)
    console.table(results.map((item) => ({ check: item.name, ok: item.ok })))
    console.log(`交互检查完成：${results.length} 项全部通过。`)
  } finally {
    stopProcessTree(chromeProcess)
    stopProcessTree(previewProcess)
    await new Promise((resolve) => setTimeout(resolve, 500))
    await fs.rm(chromeUserDataDir, { recursive: true, force: true }).catch(() => null)
  }
}

main().catch((error) => {
  console.error(`交互检查失败：${error.message}`)
  process.exit(1)
})
