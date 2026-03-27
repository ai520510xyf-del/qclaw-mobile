# Phase 1：基础架构搭建 - 详细计划

## 目标
在 Android 手机上搭建完整的 OpenClaw Gateway + Pi Agent 运行环境，为后续 UI 开发做准备。

## 技术方案

### 1. Capacitor + Node.js 集成
- 使用 `@capacitor/node` 插件在 Android 上运行 Node.js
- 或使用 Termux 方案作为备选

### 2. OpenClaw Gateway 打包
- 精简 OpenClaw 依赖（去掉不必要的插件）
- 打包为 Node.js 模块
- 集成到 Capacitor 应用中

### 3. 配置管理系统
- 从桌面端导入 `~/.openclaw/openclaw.json`
- 支持 LLM 配置（GLM/OpenAI/Claude）
- 支持通道配置（微信、QQ 等）

### 4. 本地存储
- SQLite 数据库存储聊天历史
- 消息、会话、任务数据持久化

## 开发步骤

### Step 1：项目初始化（Day 1）
```bash
# 创建新的 Capacitor 项目
npm create vite@latest qclaw-mobile-v2 -- --template react-ts
cd qclaw-mobile-v2
npm install @capacitor/core @capacitor/cli @capacitor/node
npx cap init
```

### Step 2：集成 Node.js 运行时（Day 1-2）
- 安装 `@capacitor/node` 插件
- 配置 Node.js 环境
- 测试 Node.js 可用性

### Step 3：打包 OpenClaw Gateway（Day 2-3）
- 复制 OpenClaw 核心模块
- 精简依赖树
- 创建启动脚本

### Step 4：配置导入系统（Day 3-4）
- 实现配置文件读取
- 支持从桌面端导入配置
- 验证配置有效性

### Step 5：本地存储设置（Day 4）
- 集成 SQLite
- 创建数据库 schema
- 实现数据持久化

### Step 6：基础 UI 框架（Day 5）
- 创建页面路由结构
- 实现底部 Tab 导航
- 创建基础布局

## 关键文件结构

```
qclaw-mobile-v2/
├── src/
│   ├── components/          # React 组件
│   ├── pages/               # 页面
│   ├── services/            # API 服务
│   ├── stores/              # 状态管理
│   ├── types/               # TypeScript 类型
│   ├── utils/               # 工具函数
│   ├── App.tsx
│   └── main.tsx
├── android/                 # Capacitor Android 项目
├── node_modules/
│   └── openclaw/            # 打包的 OpenClaw Gateway
├── capacitor.config.json
├── package.json
└── vite.config.ts
```

## 验收标准

- [ ] Capacitor 项目成功创建
- [ ] Node.js 运行时可用
- [ ] OpenClaw Gateway 可启动
- [ ] 配置文件可导入
- [ ] SQLite 数据库可创建
- [ ] 基础 UI 框架完成
- [ ] APK 可编译

## 时间估计
**总计：5 天**

## 下一步
确认后立即开始 Step 1。
