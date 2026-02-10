# Kiveiv

This repository is the Kiveiv development workspace. Directory layout follows the structure in `references/directory.md`.

- Frontend: `frontend/app`
- Backend: `backend/`
- Agent: `agent/`
- Docs: `docs/`
- Progress: `to-do.md`

## 启动流程

按下面顺序测就行（注意：真正的 git 仓库在子目录 `-Users-liuyunlin-Downloads-kiveiv-pre_yunlin_design-` 里）。

1) 确认是不是这个仓库
```bash
cd /Users/liuyunlin/ComateProjects/comate-zulu-demo-1770689928256/-Users-liuyunlin-Downloads-kiveiv-pre_yunlin_design-
git remote -v
git branch --show-current
git log -1 --oneline
```
- `remote` 里应该能看到 `origin https://github.com/liuyunlin/-Users-liuyunlin-Downloads-kiveiv-pre_yunlin_design-.git`
- `git log -1` 应该是 `883971c ...`（你刚 push 的那笔）

2) 跑前端（Vite）
```bash
cd frontend/app
npm install
npm run dev
```
- 默认会尝试 `5173`；如果 `5173` 被占用就会自动跳到 `5174`（你之前看到的情况就是这样）

想强制用 `5173`（被占用就直接报错）：
```bash
npm run dev -- --port 5173 --strictPort
```

3) 确认 localhost 跑的是“对的代码”
```bash
cd /Users/liuyunlin/ComateProjects/comate-zulu-demo-1770689928256/-Users-liuyunlin-Downloads-kiveiv-pre_yunlin_design-
git rev-parse HEAD
```
然后对照：
- 终端里 `npm run dev` 打印出来的 Local URL（`http://localhost:5173/` 或 `http://localhost:5174/`）打开页面
- 再用 `git rev-parse HEAD` 确认当前工作区就是你 push 的那次 commit（应该是 `883971c...` 开头）

如果你把你本机 `npm run dev` 的输出贴出来（包含端口号），我可以帮你判断应该访问哪个 URL、以及怎么快速点点点验证页面功能。
