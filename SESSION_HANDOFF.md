# 本轮工作交接（2026-07-04）

> 仅给下一个 Codex 会话快速续接。读完可删，别长期保留。
> 先读：AGENTS.md、CODEX_PROJECT_MEMORY.md、QA_CHECKLIST.md。

## 宇少是谁
- 叫 宇少，纯工科小白，不懂 VPS/网站/前端。
- 已给最大权限，不要向他申请执行权限，不阿谀奉承，不废话。
- 规矩来自 AGENTS.md 和 QA_CHECKLIST.md 第4章 文案口吻。

## 当前目标
优化 UI、交互、使用体验；修 bug 和小问题；最终上线。
宇少原话：继续优化，bug 及小问题修一修，有什么规划。

## 已经做完并 commit（倒序）

| commit | 内容 | 验证 |
|--------|------|------|
| 待提交 | 详情页 上一家/下一家 yyyy 相邻导航（CompanyDetail + UniversityDetail）+ AppIcon 加 arrow-right | build 绿 758ms vue-tsc 通过；未跑 qa:routes |
| e1ac7c7 | 列表页 每页 10/20/30 切换，URL 同步 size | build绿 + qa:routes 210/0 + CDP 行为级 PASS ALL |
| 7e56adb | 落锚上个会话浮动前端改动（去AI味、emoji转AppIcon、BackToTop/GlobalSearch/ReadingProgress 等） | npm run qa 210/0 全绿 |

## 当前工作区
- 已改未提交：src/components/AppIcon.vue、src/views/CompanyDetail.vue、src/views/UniversityDetail.vue（上面那个待提交项）。
- 仍游离（别碰，另一条线）：research-drafts/knowledge-pool/INDEX.md、batches/enterprise/enterprise-scout-2026-07-02-1940.md。

## 新会话第一步（必须做）
1. 跑 npm run qa 全套（build + 数据质量 + 210 路由 + 移动端）。全绿则：
   - commit 待提交改动，message 如 Add prev/next adjacent nav on detail pages。
   - 把本 SESSION_HANDOFF.md 一起 commit。
2. 若 qa 有红项：先看下方 踩过的坑 对照，多半是相邻 nav 插入位置问题。

## 剩余计划（按优先级，逐条独立 commit）

### 阶段2-3 详情页侧栏 TOC 滚动联动（下一步）
- 两详情页都有侧栏 pageSections = overview/核实/档案/来源，现点锚点是即时跳转无高亮。
- 加 IntersectionObserver 监听各 section，滚动时给当前侧栏项加 active 高亮。
- 点击用 scrollIntoView with behavior smooth 而非默认 jump。
- 留意 sticky 顶栏偏移：scroll-margin-top 留出 site-nav 高度。

### 阶段2-4 首页 Bento 三卡整卡可点
- 核查 HomePage.vue 第二屏三功能卡是否整卡可点（可能只有文字链接）。

### 阶段2-5 行为级冒烟 CDP
- 上个会话写过 smoke-p2.mjs 验证 ReadingProgress 真跟滚动、sticky 真锁、aria-live 就位。本轮没跑。
- 本轮只在 dist 上验过 size 切换。

### 阶段3-1 ESLint + Vitest
- 项目自述 无 ESLint 无测试。引入基础 lint + 文案禁忌钩子（QA第4章禁忌词扫单）+ 首批组件单测。

### 阶段3-2 抽 PageHero 公共组件
- 各页重复 hero 样式（companies/universities/详情页都有 *-list-hero::before 那套径向渐变）抽出来。

### 阶段3-3 logo 资源
- 34 所院校，当前只 7 个 png。

### 阶段4 Vercel 部署
- vercel.json 已存在。宇少小白，全程带做。

## 上个会话踩过的坑（别重蹈）
1. 交接摘要不可信：是另一个模型写的，已证实失真。唯一可信是 git + 项目自带 md。
2. dev server 可能 serve 旧代码：Windows Vite watcher 偶尔追不上。CDP 行为级验证必须用 dist 自建静态服务，别用 dev server。脚本模板见 $env:TEMP 下 smoke-size2.mjs（本轮写）。
3. selector 别用 scoped class：列表项 scoped CSS 名如 .company-summary-card 不是 DOM class，实际是 Tailwind 行卡片，用 a[href^=/companies/]。
4. 中文 exact-match 在 PowerShell 易翻车：改 Vue 源码统一用 Node 脚本按 anchor split/join，带两阶段校验（先校验所有 anchor 命中数，全对才写盘），避免局部命中后整体未落盘的假象。
5. PS 格式串：("...{0,4}..." -f $i) 花括号别写成 {,4}，会整批报错。
6. CDP 脚本端口：项目 qa 默认 9222，CDP 冒烟用 9557+ 避冲突。
7. dev/preview/headless Chrome 用完要关（QA第6章）。

## 关键路径
- 源码：E:\弹药网站\ammo-site\src\（views/ components/ composables/ data/）
- 规矩：QA_CHECKLIST.md、PROJECT_STATUS.md、CODEX_PROJECT_MEMORY.md、DATA_SCHEMA.md
- QA脚本：scripts\qa-check.mjs + check-data-quality.mjs
- Chrome：C:\Program Files\Google\Chrome\Application\chrome.exe
- 无 puppeteer/playwright，CDP 冒烟手写原生 WebSocket（Node 24 ESM，http 静态服务 dist）。

## 验证收尾规矩（QA_CHECKLIST）
- 小改动：至少 npm run build。
- 正常改动：npm run qa 全套（210 路由 + 数据质量 + 移动端横滚 + 缺图 + 外链 noopener + 控制台报错）。
- commit 前必须全绿。
- 不改 src/data/companies.ts 和 universities.ts（正式库），除非宇少明示。
