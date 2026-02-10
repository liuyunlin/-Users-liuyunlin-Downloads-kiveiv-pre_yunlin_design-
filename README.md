# Kiveiv

This repository is the Kiveiv development workspace. Directory layout follows the structure in `references/directory.md`.

- Frontend: `frontend/app`
- Backend: `backend/`
- Agent: `agent/`
- Docs: `docs/`
- Progress: `to-do.md`

## 启动流程

### 前端
1. 进入前端目录：
   `cd frontend/app`
2. 安装依赖：
   `npm install`
3. 启动开发服务器：
   `npm run dev`

默认本地地址由 Vite 输出，通常为 `http://localhost:5173`。

## 同时跑两套前端（主分支 vs feature 对照）

前提：你需要两份代码目录（例如两个 clone / 两个 worktree / 或者一个是主分支目录、一个是 feature 分支目录），并且两边都安装过依赖。

在本仓库目录下运行：

`bash scripts/run-two-frontends.sh <main_dir> <feature_dir> 5173 5174`

示例（main 用当前目录，feature 在隔壁目录）：

`bash scripts/run-two-frontends.sh . ../kiveiv-feature 5173 5174`
