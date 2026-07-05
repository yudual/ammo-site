# 网站优化进度卡

> 给压缩后的 Codex 会话快速接上用。新会话只读这一个文件 + AGENTS.md 就能继续干，不用重新 ls 整个目录。

## 项目一句话

E:\弹药网站\ammo-site 是 Vue3 + Vite + TS + Tailwind 的纯前端静态导航站。正式数据在 src/data/companies.ts(56家) 和 src/data/universities.ts(34所)。本任务只优化网站代码本身，不碰 research-drafts/knowledge-pool 知识库工作，不碰部署/VPS/域名。

## 工作纪律（每压缩一次都要遵守）

1. 每步只动 1 个文件、只改 1 处逻辑
2. 改完立刻跑 npm run build 确认不破东西
3. 改完更新本文件的当前步和已完成清单
4. 不重新通读整个代码库；只读需要改的那一处上下文

## 命令速查（要在 ammo-site 里跑）

```bash
cd E:\弹药网站\ammo-site
npm run build          # 构建（含 vue-tsc 类型检查），约 1 秒
npm run qa:routes      # headless 路由+数据质量检查，约 100 秒，210 项
npm run qa             # 全量 QA（含 build/audit/routes），耗时较长
```

## 当前状态：P0 已全部修完且浏览器验证通过

最近一次 npm run qa:routes 结果（2026-07-05，P0/P1/P2 全部完成后）：210 项，失败 0 项。企业 56 / 院校 34 / 错误 0 / 提示 8（提示是知识库阶段的旧项 sources 数量建议，与本次改动无关）。

## 已发现的问题（按优先级）

### 🔴 P0 真 Bug（全部已修 + 浏览器验证）
- [x] **P0-3 主题 FOUC**：index.html 加 inline 防闪脚本（localStorage 读 mode → 设 data-theme + 同步 theme-color meta）；useTheme.ts 模块加载时读 DOM 的 data-theme 作为 resolved 初值，applyMode 写 DOM 时同步 theme-color meta。
- [x] **P0-2 详情页 goBack 误判**：CompanyDetail.vue / UniversityDetail.vue 的 goBack 改成只在 history.state.back 是同级列表页前缀（/companies、/companies?、/companies#，院校同构）时 router.back()，否则明确 push 列表页。
- [x] **P0-1 全局搜索语义化**：GlobalSearch.vue 的 button→RouterLink，import 加 RouterLink，.gs-item CSS 加 text-decoration:none 和 color:inherit。中键新开、右键复制、SEO 都拿得到真实 URL。

### 🟡 P1 重构去重（下一波，按顺序做）
- [x] **P1-A 抽 useShareLink**（第一个做，风险最低）：copyShareLink 在 4 个文件复制 4 遍（CompanyDetail.vue、UniversityDetail.vue、Companies.vue、Universities.vue）。建议建 src/composables/useShareLink.ts，导出 isCopied ref 和 copyShareLink(url?) 函数（navigator.clipboard.writeText(window.location.href)，2 秒后清 isCopied）。然后 4 个文件 import 并删原本各自的局部 copyShareLink 和 isCopied。
- [x] **P1-B 抽 useDetailNav**：详情页 goBack + navSections + scrollToSection + prev/next 在两个详情页重复。已建 src/composables/useDetailNav.ts，接收 primaryKey（'companies'|'universities'）、数据集、currentId 和 hasVerification；CompanyDetail / UniversityDetail 已接入。
- [x] **P1-C 页码分页省略**：universityPageNumbers / companyPageNumbers 全量渲染；条目若上千会炸。已建 src/utils/pagination.ts，按「首尾 + 当前 ±1 + 中间省略号」生成页码，两列表页已接入。
- [x] **P1-D 内联 :style 泛滥**：已收敛普通 card / border / ghost button 三类高频静态样式到 .surface-card / .surface-card-strong / .border-soft / .btn-ghost；动态高亮、状态色、特殊 color-mix 背景保留内联，避免语义混乱。

### 🟢 P2 锦上添花
- [x] AppIcon dev 模式未知 name console.warn（src/components/AppIcon.vue）
- [x] useSectionNavigation 缓存 getComputedStyle 结果（src/composables/useSectionNavigation.ts）
- [x] 暗色配色微调（src/style.css 的 --accent 暖橙与 --surface-strong 冷青绿对比稍跳）

## 已完成（最新在底）

| 时间 | 步骤 | 改的文件 | 验证 |
|---|---|---|---|
| 2026-07-05 | 清理临时产物（.chrome-cdp-* 43 个 / *.log 6 个 / qa-screenshots/） | 无（删除） | 重建后跑 4 步 build 全过 |
| 2026-07-05 | P0-3 主题 FOUC：inline 防闪脚本 + useTheme 读 DOM 初值 + 同步 theme-color meta | index.html、src/composables/useTheme.ts | npm run build 909ms 通过 |
| 2026-07-05 | P0-2 详情页 goBack 误判：改成只在 back 指向同级列表页前缀时 router.back()，否则 push 列表页 | src/views/CompanyDetail.vue、src/views/UniversityDetail.vue | npm run build 544ms 通过 |
| 2026-07-05 | P0-1 GlobalSearch 语义化：button→RouterLink + import + .gs-item CSS text-decoration/color | src/components/GlobalSearch.vue | npm run build 468ms 通过 |
| 2026-07-05 | 浏览器路由验证：跑 npm run qa:routes | 无改动 | 210 项 0 失败，企业 56/院校 34/错误 0 |
| 2026-07-05 | P1-A 抽 useShareLink:建 src/composables/useShareLink.ts,4 处内联 copyShareLink/isCopied 收敛(CompanyDetail/UniversityDetail/Companies/Universities) | src/composables/useShareLink.ts、src/views/CompanyDetail.vue、src/views/UniversityDetail.vue、src/views/Companies.vue、src/views/Universities.vue | npm run build 441~473ms 全绿;Universities 16 行未提交改动完整保留 |
| 2026-07-05 | ⚠️ Companies 8 行丢失:误用 git checkout HEAD -- 冲掉未提交改动;git/reflog/磁盘/dist 均查无副本 | 无(数据丢失) | build 仍全绿;Universities 镜像可参照重建 |
| 2026-07-05 | P1-B 抽 useDetailNav:建 src/composables/useDetailNav.ts,收敛详情页 goBack/navSections/scrollToSection/prev-next；CompanyDetail/UniversityDetail 接入 composable | src/composables/useDetailNav.ts、src/views/CompanyDetail.vue、src/views/UniversityDetail.vue | npm run build 3 次全绿（新增 composable、CompanyDetail 接入、UniversityDetail 接入） |
| 2026-07-05 | P1-C 页码分页省略:建 src/utils/pagination.ts, companyPageNumbers/universityPageNumbers 改成首尾+当前±1+省略号；模板对 ellipsis 渲染不可点击文本并修复重复 key | src/utils/pagination.ts、src/views/Companies.vue、src/views/Universities.vue | npm run build 5 次全绿（工具函数、Companies 接入/修 key、Universities 接入/修 key） |
| 2026-07-05 | P1-D 起步:src/style.css 加 surface-card/surface-card-strong/btn-ghost；Companies/Universities 分页上一页/页码/下一页改用 btn-ghost，移除该区域重复 :style | src/style.css、src/views/Companies.vue、src/views/Universities.vue | npm run build 3 次全绿（加 class、Companies 替换、Universities 替换） |
| 2026-07-05 | P1-D 列表页提示块:Companies/Universities 页码下方“都在这里了”提示 span 改用 surface-card-strong，移除该区域重复 background/border 内联样式 | src/views/Companies.vue、src/views/Universities.vue | npm run build 2 次全绿（Companies 替换、Universities 替换） |
| 2026-07-05 | P1-D 收尾:补 .border-soft；机械收敛全仓库完全等价的 var(--border)、surface+border、surface-strong+border 静态内联样式，覆盖 17 个 Vue 文件约 104 处；剩余 :style 从 264 降到 160，主要为动态状态/特殊色 | src/style.css、src/views/*.vue、src/components/SourceList.vue | npm run build 通过；npm run qa:routes 第一次 1 个浏览器空白偶发，复跑 210 项 0 失败 |
| 2026-07-05 | 补回 Companies 8 行丢失遗留的确定项:参考 Universities 镜像，Companies initFromQuery 对 ownership/relevance/status 加枚举 includes 守卫，updateUrlQuery 的 any→string，模板顶部 pt-20/24→pt-6/8；direction 因 options 定义顺序不同暂保留原逻辑 | src/views/Companies.vue | npm run build 通过 |
| 2026-07-05 | P2 AppIcon dev warn:未知 icon name 开发环境 console.warn 一次，生产仍静默空 path | src/components/AppIcon.vue | npm run build 通过 |
| 2026-07-05 | P2 useSectionNavigation 缓存 anchor offset:getComputedStyle(scroll-margin-top) / fallback bottom 从每次 IntersectionObserver 回调移到 mounted+resize 缓存 | src/composables/useSectionNavigation.ts | npm run build 通过 |
| 2026-07-05 | P2 暗色配色微调:dark --surface-strong 从 #202722 调到 #222823，--accent/#accent-soft 从偏暖橙 #ee937c 调到 #e88d78，降低冷暖跳感 | src/style.css | npm run build 通过 |
| 2026-07-05 | P0/P1/P2 最终路由验证 | 无 | npm run qa:routes 210 项 0 失败；企业 56 / 院校 34 / 错误 0 / 提示 8 |

## 当前进行中

P0/P1/P2 优化项已全部完成。Companies 8 行丢失遗留的确定项已补回。最终 npm run qa:routes 210 项 0 失败。

历史遗留已处理：改 Companies.vue 时曾误用 git checkout HEAD -- 冲掉约 8 行未提交改动；本轮已参考 Universities 镜像补回确定项（ownership/relevance/status query 守卫、updateUrlQuery 类型、顶部间距）。direction query 仍保留原逻辑，因为 directionOptions 定义在 initFromQuery 后面，强行镜像会扩大改动面。

## 下次会话怎么续

新会话直接说:「按 ammo-site/OPTIMIZATION_PROGRESS.md 继续推进 P2」即可。只需读进度卡 + AGENTS.md(宇少偏好:直白简洁、称宇少、不奉承) + 要改的具体文件那一处上下文。

记住：每步只动 1 个文件、改完跑 build、更新本卡。
