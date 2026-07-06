# 前端上线前检查清单

这份清单只用于前端体验收口。执行时不部署、不碰 VPS、不改域名、不改服务器配置。

## 1. 先分清当前改动

提交前先用：

```bash
git status --short
git diff --stat
```

当前工作树通常按三组看：

- 前端体验和 QA：`src/App.vue`、`src/components/*`、`src/composables/*`、`src/router.ts`、`src/views/*`、`src/data/aboutMajor.ts`、`src/data/graduate.ts`、`package.json`、`scripts/interaction-check.mjs`。
- 正式数据：`src/data/companies.ts`。这是数据治理/正式库改动，避免和纯前端提交混在一起。
- 知识库候选：`research-drafts/knowledge-pool/INDEX.md`。这是知识库流程改动，不能当作前端体验改动处理。

不要回滚不属于本轮的改动；如果要提交，按上面三组拆开。

## 2. 前端体验必跑命令

改动涉及页面、搜索、筛选、按钮或详情页时，至少跑：

```bash
npm run build
npm run qa:interactions
npm run qa:routes
```

如果要做完整上线前总检查，再跑：

```bash
npm run qa
```

`npm run qa` 会多跑依赖审计；依赖数据提示不等于构建失败。

## 3. 手动看一眼的页面

- `/`
- `/companies`
- `/companies/1`
- `/universities`
- `/universities/aust`
- `/about-major`
- `/graduate`

手机宽度重点看：

- 顶部导航是否换行正常。
- 筛选抽屉是否能打开、关闭、滚动。
- 分页按钮是否挤压。
- 详情页顶部按钮是否遮挡标题。
- 搜索弹窗是否能输入、显示结果、跳转。

## 4. 链路检查

- 首页四个入口能进对应页面。
- 企业/院校列表筛选后 URL 带 query，刷新后状态还原。
- 列表点“看详情”进入详情页。
- 详情页上一条/下一条切换后，标题和正文同步变化。
- 详情页“回企业名录 / 回院校一览”保留最近筛选 URL。
- 顶部“返回企业列表 / 返回院校列表”保留最近筛选 URL。
- 复制链接按钮有“链接已复制”反馈。
- 外部入口只检查 `href` 非空且 `target="_blank"` 链接带 `noopener`，不要批量打开站外页。

## 5. 数据质量提示处理口径

`npm run qa:routes` 可能出现数据质量提示，例如：

- 企业 51-56 调研来源少于 5 条。
- 企业 57-59 存在来源类型不在推荐枚举内。
- 院校 `ustc`、`ustb` 调研来源少于 6 条。

这些是正式数据治理问题。前端体验任务里只记录，不顺手改正式数据；后续单独按来源补全、枚举修正、dry-run/质量扫描流程处理。
