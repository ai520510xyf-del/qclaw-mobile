# QClaw Mobile - 完整版产品规格书

> 版本：1.0.0  
> 日期：2026-03-26  
> 目标：复刻桌面端 AI 助手的完整功能到 Android

---

## 1. 产品定位

**一句话描述**：移动端 AI 个人助手，让你随时随地通过文字/语音与我交流，完成各种任务。

**核心价值**：
- 📱 移动端完整 AI 助手体验
- 🔧 技能扩展系统
- ⏰ 定时任务与提醒
- 💾 记忆与上下文连续性
- 🔒 本地优先，数据自主

---

## 2. UI/UX 设计规范

### 2.1 整体风格

**设计语言**：Modern Minimalist + AI Native  
**参考**：Notion + ChatGPT Mobile + Apple Messages

**视觉特点**：
- 深色主题为主（护眼 + AI 感）
- 简洁的卡片式布局
- 柔和的渐变点缀
- 微妙的毛玻璃效果

### 2.2 色彩系统

```
主色调 (Primary):
  - Primary: #667EEA (蓝紫渐变起点)
  - Primary Dark: #764BA2 (蓝紫渐变终点)
  - Primary Light: #8B9FEE

背景色 (Background):
  - Background Dark: #0F0F1A (主背景)
  - Background Card: #1A1A2E (卡片背景)
  - Background Elevated: #252540 (悬浮/输入框)

文字色 (Text):
  - Text Primary: #FFFFFF
  - Text Secondary: #A0A0B0
  - Text Muted: #6B6B7B

功能色 (Semantic):
  - Success: #4ADE80
  - Warning: #FBBF24
  - Error: #EF4444
  - Info: #60A5FA

气泡色 (Chat Bubbles):
  - User Bubble: 渐变 #667EEA → #764BA2
  - AI Bubble: #2A2A3E
  - System Bubble: #333350
```

### 2.3 字体系统

```
字体家族：
  - 中文：PingFang SC / Noto Sans SC / system-ui
  - 英文：SF Pro Display / Roboto / system-ui
  - 代码：JetBrains Mono / SF Mono / monospace

字号层级：
  - H1 (标题): 24px, font-weight: 700
  - H2 (副标题): 18px, font-weight: 600
  - Body (正文): 16px, font-weight: 400
  - Caption (说明): 14px, font-weight: 400
  - Small (辅助): 12px, font-weight: 400

行高：1.5 (正文), 1.3 (标题)
```

### 2.4 间距系统

```
基础单位：4px

间距规范：
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px
  - 2xl: 48px

页面边距：16px
卡片圆角：16px
按钮圆角：12px (小) / 24px (大)
气泡圆角：18px
```

### 2.5 动效规范

```
动画时长：
  - 微交互：150ms
  - 页面切换：300ms
  - 列表加载：200ms
  - 消息气泡：250ms

缓动函数：
  - 默认：cubic-bezier(0.4, 0, 0.2, 1)
  - 弹性：cubic-bezier(0.34, 1.56, 0.64, 1)
  - 减速：cubic-bezier(0, 0, 0.2, 1)

具体动效：
  - 消息发送：轻微弹跳 + 淡入
  - 加载中：三个点依次跳动
  - 页面切换：共享元素过渡
  - 下拉刷新：弹性回弹
  - 按钮点击：轻微缩放 (0.95)
```

### 2.6 页面结构

```
底部导航 (Bottom Tab Bar):
  ┌─────┬─────┬─────┬─────┐
  │ 💬  │ 📋  │ 📁  │ ⚙️  │
  │聊天 │技能 │文件 │设置 │
  └─────┴─────┴─────┴─────┘
  高度：60px + safe-area
  背景：毛玻璃效果
  图标大小：24px
```

**页面列表**：

1. **聊天页 (Chat)**
   - 顶部：App 名称 + 连接状态
   - 中部：消息列表（可滚动）
   - 底部：输入框 + 发送按钮

2. **技能页 (Skills)**
   - 顶部：标题 "技能中心"
   - 分类标签栏
   - 技能卡片网格 (2列)
   - 每个技能：图标 + 名称 + 简短描述

3. **文件页 (Files)**
   - 顶部：标题 + 上传按钮
   - 文件列表（支持文件夹）
   - 支持：图片/文档/音频/视频预览

4. **设置页 (Settings)**
   - 用户信息
   - 连接设置（Gateway URL, Token）
   - 主题切换
   - 清理缓存
   - 关于/版本

### 2.7 组件清单

```
基础组件：
  □ Button (按钮) - 主要/次要/文字/图标
  □ Input (输入框) - 单行/多行
  □ Card (卡片) - 标准/可点击
  □ Badge (徽章) - 数字/点
  □ Avatar (头像) - 圆形
  □ Chip (标签) - 可选中/不可选中
  □ Divider (分割线)
  □ EmptyState (空状态)
  □ Loading (加载态)

聊天组件：
  □ ChatBubble (消息气泡) - 用户/AI/系统
  □ TypingIndicator (输入中指示器)
  □ ChatInput (聊天输入框)
  □ MessageAction (消息操作：复制/删除)
  □ ImagePreview (图片预览)
  □ VoiceInput (语音输入)

技能组件：
  □ SkillCard (技能卡片)
  □ SkillCategory (技能分类)
  □ SkillDetail (技能详情弹窗)

文件组件：
  □ FileItem (文件项)
  □ FolderItem (文件夹项)
  □ FilePreview (文件预览)
  □ UploadProgress (上传进度)

通用组件：
  □ BottomSheet (底部弹出)
  □ Modal (模态框)
  □ Toast (轻提示)
  □ ConfirmDialog (确认对话框)
  □ PullToRefresh (下拉刷新)
```

---

## 3. 功能规格

### 3.1 核心功能

#### 3.1.1 即时通讯 (IM)
```
功能描述：
  - 与 AI 进行实时文字对话
  - 支持 Markdown 渲染
  - 支持代码高亮显示
  - 支持图片发送与预览
  - 支持语音消息（可选）

用户流程：
  1. 用户在输入框输入文字
  2. 点击发送或按回车
  3. 消息立即显示在列表中
  4. AI "正在输入" 状态
  5. AI 响应逐字/逐句流式显示
  6. 消息完整显示，可复制/删除

技术实现：
  - WebSocket 长连接（实时通信）
  - 消息队列（离线时缓存）
  - 本地消息历史（SQLite）
  - 消息状态：发送中/已发送/发送失败
```

#### 3.1.2 技能中心 (Skills)
```
功能描述：
  - 展示所有可用技能
  - 按分类筛选技能
  - 点击技能查看详情
  - 快捷触发常用技能

技能分类：
  - 🔍 信息获取：搜索、天气、新闻、日历
  - ✍️ 内容创作：写作、翻译、摘要、改写
  - 💻 开发工具：代码、API、数据库
  - 📁 文件管理：整理、搜索、转换
  - ⏰ 效率工具：提醒、定时、日程
  - 🎨 创意工具：图片、语音、设计

技术实现：
  - 技能列表从 API 获取
  - 本地缓存技能配置
  - 技能执行通过对话触发
```

#### 3.1.3 文件管理 (Files)
```
功能描述：
  - 浏览云端/本地文件
  - 上传文件到云端
  - 下载文件到本地
  - 预览常见格式（图片/文档）

支持操作：
  - 上传（单文件/多文件）
  - 下载
  - 删除
  - 重命名
  - 新建文件夹
  - 复制/移动

技术实现：
  - 调用 QClaw 文件 API
  - 支持大文件分片上传
  - 本地缓存已浏览的文件列表
```

#### 3.1.4 定时任务 (Cron)
```
功能描述：
  - 创建一次性提醒
  - 创建周期性提醒
  - 查看任务列表
  - 取消/修改任务

用户流程：
  1. 在聊天中说 "明天早上8点提醒我开会"
  2. AI 解析意图，创建定时任务
  3. 到达时间，App 推送通知
  4. 点击通知跳转到 App

技术实现：
  - 通过 API 与 QClaw Cron 系统交互
  - 本地缓存任务列表
  - 系统级推送通知（Push Notification）
```

#### 3.1.5 记忆系统 (Memory)
```
功能描述：
  - 跨会话记忆
  - 用户偏好学习
  - 重要信息存储

技术实现：
  - 调用 QClaw Memory API
  - 自动提取和存储关键信息
  - 支持记忆检索
```

### 3.2 连接架构

```
┌─────────────────────────────────────────────┐
│              QClaw Mobile App                │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │  Chat   │  │ Skills  │  │  Files  │   │
│  │  Page   │  │  Page   │  │  Page   │   │
│  └────┬────┘  └────┬────┘  └────┬────┘   │
│       │             │             │         │
│       └─────────────┼─────────────┘         │
│                     │                       │
│              ┌──────┴──────┐               │
│              │  API Layer  │               │
│              │  (Gateway)  │               │
│              └──────┬──────┘               │
└─────────────────────┼───────────────────────┘
                      │
              ┌──────┴──────┐
              │              │
         ┌────▼────┐  ┌─────▼─────┐
         │ Local DB │  │ QClaw API │
         │ (SQLite) │  │ (HTTP/WS) │
         └──────────┘  └───────────┘
```

### 3.3 错误处理

```
网络错误：
  - 连接失败：显示重连按钮
  - 请求超时：自动重试 3 次
  - 离线：缓存消息，联网后同步

业务错误：
  - 权限不足：提示并引导授权
  - 资源不存在：显示友好提示
  - 服务端错误：显示错误码，联系支持

边界情况：
  - 空消息：不发送
  - 消息过长：提示字数限制
  - 大文件：显示上传进度
  - 无网络：离线模式降级
```

---

## 4. 技术架构

### 4.1 技术栈

```
前端框架：
  - Framework: React 18 + TypeScript
  - UI Library: Tailwind CSS
  - 状态管理: Zustand
  - 路由: React Router v6
  - HTTP: Axios
  - WebSocket: Native WebSocket
  - 本地存储: AsyncStorage
  - 日期处理: Day.js

移动端：
  - Capacitor 6 (Android)
  - 平台: Android 7.0+
  - 架构: WebView + Native Bridge

构建：
  - Vite 5 (开发 + 构建)
  - GitHub Actions (CI/CD)
  - Gradle (Android 构建)
```

### 4.2 项目结构

```
qclaw-mobile/
├── src/
│   ├── components/          # React 组件
│   │   ├── common/         # 通用组件
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── Toast.tsx
│   │   ├── chat/          # 聊天相关
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── MessageList.tsx
│   │   ├── skills/        # 技能相关
│   │   │   ├── SkillCard.tsx
│   │   │   └── SkillDetail.tsx
│   │   ├── files/         # 文件相关
│   │   │   └── FileItem.tsx
│   │   └── layout/        # 布局组件
│   │       ├── BottomNav.tsx
│   │       └── PageHeader.tsx
│   │
│   ├── pages/             # 页面
│   │   ├── ChatPage.tsx
│   │   ├── SkillsPage.tsx
│   │   ├── FilesPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── hooks/             # 自定义 Hooks
│   │   ├── useChat.ts
│   │   ├── useWebSocket.ts
│   │   ├── useStorage.ts
│   │   └── useNotifications.ts
│   │
│   ├── services/          # API 服务
│   │   ├── api.ts         # API 基础配置
│   │   ├── chat.ts        # 聊天 API
│   │   ├── skills.ts      # 技能 API
│   │   ├── files.ts        # 文件 API
│   │   └── cron.ts        # 定时任务 API
│   │
│   ├── stores/            # Zustand Store
│   │   ├── chatStore.ts
│   │   ├── skillsStore.ts
│   │   ├── filesStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── types/             # TypeScript 类型
│   │   ├── chat.ts
│   │   ├── skill.ts
│   │   ├── file.ts
│   │   └── api.ts
│   │
│   ├── utils/             # 工具函数
│   │   ├── storage.ts
│   │   ├── date.ts
│   │   └── validation.ts
│   │
│   ├── constants/          # 常量
│   │   ├── theme.ts
│   │   ├── config.ts
│   │   └── skills.ts
│   │
│   ├── App.tsx            # 根组件
│   ├── main.tsx           # 入口文件
│   └── index.css          # 全局样式
│
├── public/                 # 静态资源
├── android/               # Capacitor Android 项目
├── .github/
│   └── workflows/
│       └── build.yml       # GitHub Actions
├── capacitor.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── vite.config.ts
```

### 4.3 API 接口设计

```typescript
// 基础配置
BASE_URL: string  // QClaw Gateway 地址
AUTH_TOKEN: string  // 认证 Token

// 聊天接口
POST /api/chat/send
  Request: { message: string, sessionId?: string }
  Response: { messageId: string, content: string }

WebSocket /ws/chat
  - 发送: { type: 'message', content: string }
  - 接收: { type: 'response', content: string }
  - 接收: { type: 'typing', isTyping: boolean }

// 技能接口
GET /api/skills
  Response: { skills: Skill[] }

GET /api/skills/:id
  Response: { skill: SkillDetail }

// 文件接口
GET /api/files
  Response: { files: FileItem[], folders: Folder[] }

POST /api/files/upload
  Request: FormData { file: File }
  Response: { fileId: string, url: string }

DELETE /api/files/:id
  Response: { success: boolean }

// 定时任务接口
GET /api/cron
  Response: { jobs: CronJob[] }

POST /api/cron
  Request: { name: string, schedule: CronSchedule, action: string }
  Response: { jobId: string }

DELETE /api/cron/:id
  Response: { success: boolean }
```

---

## 5. 代码规范

### 5.1 TypeScript 规范

```typescript
// 1. 类型定义优先
interface User {
  id: string;
  name: string;
  avatar?: string;
}

// 2. 使用泛型约束
function getItem<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// 3. 避免 any，使用 unknown 代替
function parseJSON(input: string): unknown {
  return JSON.parse(input);
}

// 4. 箭头函数优先
const handleClick = (event: MouseEvent) => {
  event.preventDefault();
};

// 5. 显式返回类型
function getMessage(id: string): Message | null {
  return messages.get(id) ?? null;
}
```

### 5.2 React 组件规范

```typescript
// 1. 函数组件 + Hooks
function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <div className={cn(
      "rounded-2xl px-4 py-2 max-w-[80%]",
      isOwn ? "bg-gradient-to-r from-primary to-primary-dark" : "bg-gray-800"
    )}>
      {message.content}
    </div>
  );
}

// 2. Props 类型定义
interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
}

// 3. 组件放在对应目录
// components/chat/ChatBubble.tsx
// components/chat/index.ts (导出)

export default ChatBubble;
```

### 5.3 CSS / Tailwind 规范

```typescript
// 1. 使用 Tailwind 工具类
<div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">

// 2. 复杂样式抽离为常量
const CARD_STYLES = "bg-gray-800 rounded-2xl p-4 shadow-lg";

// 3. 使用 clsx/classnames 合并条件类
import { clsx } from 'clsx';

<div className={clsx(
  "px-4 py-2 rounded-full",
  isActive && "bg-blue-500 text-white",
  !isActive && "bg-gray-700 text-gray-300"
)}>

// 4. 响应式设计
<div className="w-full md:w-1/2 lg:w-1/3">
```

### 5.4 文件命名

```
组件文件: PascalCase
  - ChatBubble.tsx
  - BottomNav.tsx
  - FileItem.tsx

工具文件: camelCase
  - useChat.ts
  - formatDate.ts
  - apiClient.ts

样式文件: 与组件同名
  - ChatBubble.module.css

类型文件: 同模块名
  - chat.ts
  - skill.ts
```

---

## 6. 技能清单

### 6.1 必备技能

| 技能名称 | 功能描述 | 优先级 |
|---------|---------|--------|
| 搜索 | 搜索网络信息 | P0 |
| 天气 | 查询天气 | P0 |
| 日历 | 查看/管理日程 | P0 |
| 提醒 | 创建定时提醒 | P0 |
| 写作 | 辅助写作、改写、摘要 | P0 |
| 翻译 | 多语言翻译 | P1 |
| 代码 | 代码生成、解释、调试 | P1 |
| 文件管理 | 文件整理、搜索 | P1 |
| 新闻 | 每日新闻摘要 | P2 |
| 笔记 | 快速记录 | P2 |

### 6.2 高级技能

| 技能名称 | 功能描述 | 优先级 |
|---------|---------|--------|
| 小红书 | 内容发布、舆情分析 | P1 |
| 微信 | 消息管理 | P2 |
| 飞书 | 日程、文档 | P2 |
| GitHub | Issue、PR 管理 | P2 |
| 邮件 | 收发邮件 | P2 |
| TTS | 文字转语音 | P3 |
| STT | 语音转文字 | P3 |

---

## 7. 测试计划

### 7.1 单元测试
- 工具函数测试
- Hook 测试
- 组件渲染测试

### 7.2 集成测试
- API 调用测试
- WebSocket 连接测试
- 页面流程测试

### 7.3 E2E 测试 (Playwright)
- 登录流程
- 发送消息流程
- 技能触发流程
- 文件上传流程
- 定时任务流程

---

## 8. 发布计划

### 8.1 版本规划

| 版本 | 功能 | 状态 |
|-----|------|------|
| v1.0 | 基础聊天 + 设置 | 开发中 |
| v1.1 | 技能中心 + 文件管理 | 待开发 |
| v1.2 | 定时任务 + 推送 | 待开发 |
| v2.0 | 完整功能版 | 待开发 |

### 8.2 安装方式

1. **直接安装 APK** - 适合测试
2. **Google Play** - 正式分发
3. **官网下载** - 备用分发

---

## 9. 附录

### 9.1 参考资料

- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [React 官方文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [QClaw API 文档](https://docs.openclaw.ai)

### 9.2 术语表

| 术语 | 定义 |
|-----|------|
| WebView | Android 内置浏览器组件 |
| Capacitor | 将 Web 应用打包为原生 App 的框架 |
| WebSocket | 实时双向通信协议 |
| Streaming | 流式响应，边生成边显示 |
| Skill | 技能扩展，增强 AI 能力 |
