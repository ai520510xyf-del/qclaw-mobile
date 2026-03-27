# QClaw Mobile - 模型和 Token 管理设计补充

## 1. 默认大模型配置

### 1.1 GLM 默认模型
- **模型名称**：GLM（国产大模型）
- **免费额度**：每天 4000W token
- **额度重置**：每天 00:00 重置
- **超额处理**：自动切换到付费模型或提示用户

### 1.2 模型切换
支持以下模型：
1. **GLM**（默认，免费 4000W token/天）
2. **OpenAI**（需配置 API Key）
3. **Claude**（需配置 API Key）
4. **其他模型**（支持自定义）

---

## 2. Token 额度管理

### 2.1 Token 使用统计

**显示内容：**
- 今日已用 token 数
- 今日剩余免费额度
- 额度使用百分比（进度条）
- 预计用尽时间

**更新频率：**
- 每条消息后实时更新
- 每小时同步一次服务器数据

### 2.2 额度用尽处理

**场景 1：免费额度用尽**
- 弹窗提示："今日免费额度已用尽"
- 提供两个选项：
  1. 切换到付费模型（OpenAI/Claude）
  2. 等待明天重置

**场景 2：切换到付费模型**
- 需要配置对应的 API Key
- 显示该模型的计费标准
- 用户确认后继续使用

### 2.3 Token 计数

**计数方式：**
- 输入 token 数 + 输出 token 数
- 每条消息单独计数
- 累加到今日总数

**数据存储：**
- 本地 SQLite 记录
- 同步到 Gateway 服务器
- 每天 00:00 重置

---

## 3. UI 设计

### 3.1 设置页面 - 模型选择

```
┌─────────────────────────────────┐
│  设置 > 模型与额度              │
├─────────────────────────────────┤
│                                 │
│  当前模型                       │
│  ┌─────────────────────────┐   │
│  │ GLM (默认)              │   │
│  │ 今日免费额度: 4000W     │   │
│  └─────────────────────────┘   │
│                                 │
│  今日使用情况                   │
│  ┌─────────────────────────┐   │
│  │ 已用: 1200W token       │   │
│  │ 剩余: 2800W token       │   │
│  │ ████░░░░░░░░░░░░░░░░░░ │   │
│  │ 30% 已使用              │   │
│  └─────────────────────────┘   │
│                                 │
│  切换模型                       │
│  ┌─────────────────────────┐   │
│  │ ○ GLM (免费)            │   │
│  │ ○ OpenAI (付费)         │   │
│  │ ○ Claude (付费)         │   │
│  └─────────────────────────┘   │
│                                 │
│  [配置 API Key]                 │
│                                 │
└─────────────────────────────────┘
```

### 3.2 聊天页面 - Token 显示

```
┌─────────────────────────────────┐
│ 对话                            │
├─────────────────────────────────┤
│ GLM | 剩余: 2800W token | ⚙️    │
├─────────────────────────────────┤
│                                 │
│ [聊天内容...]                   │
│                                 │
└─────────────────────────────────┘
```

### 3.3 额度用尽提示

```
┌─────────────────────────────────┐
│ ⚠️ 提示                         │
├─────────────────────────────────┤
│                                 │
│ 今日免费额度已用尽              │
│                                 │
│ 您可以：                        │
│ 1. 切换到付费模型继续使用       │
│ 2. 等待明天 00:00 重置          │
│                                 │
│ [切换模型]  [取消]              │
│                                 │
└─────────────────────────────────┘
```

---

## 4. 数据结构

### 4.1 Token 使用记录

```typescript
interface TokenUsage {
  date: string;              // YYYY-MM-DD
  model: string;             // GLM / OpenAI / Claude
  totalTokens: number;       // 总 token 数
  inputTokens: number;       // 输入 token
  outputTokens: number;      // 输出 token
  freeQuota: number;         // 免费额度
  usedQuota: number;         // 已用额度
  remainingQuota: number;    // 剩余额度
  messages: {
    messageId: string;
    inputTokens: number;
    outputTokens: number;
    timestamp: number;
  }[];
}
```

### 4.2 模型配置

```typescript
interface ModelConfig {
  id: string;                // GLM / openai / claude
  name: string;              // 显示名称
  type: 'free' | 'paid';     // 免费或付费
  dailyQuota?: number;       // 每日免费额度（仅免费模型）
  apiKey?: string;           // API Key（仅付费模型）
  endpoint?: string;         // API 端点
  isDefault: boolean;        // 是否默认
}
```

---

## 5. 后端集成

### 5.1 Gateway API

**获取 Token 使用情况**
```
GET /api/token-usage?date=2026-03-26
Response: {
  model: "GLM",
  totalTokens: 1200000,
  freeQuota: 40000000,
  usedQuota: 1200000,
  remainingQuota: 38800000
}
```

**记录 Token 使用**
```
POST /api/token-usage/record
Body: {
  messageId: "msg_123",
  inputTokens: 100,
  outputTokens: 200,
  model: "GLM"
}
```

**切换模型**
```
POST /api/model/switch
Body: {
  model: "openai",
  apiKey: "sk-..."
}
```

---

## 6. 实现清单

- [ ] Token 使用统计组件
- [ ] 模型选择界面
- [ ] 额度显示和进度条
- [ ] 额度用尽提示
- [ ] Token 计数逻辑
- [ ] 本地存储和同步
- [ ] Gateway API 集成
- [ ] 每日重置逻辑
- [ ] 模型切换逻辑
- [ ] API Key 管理

---

## 7. 时间估计

- **UI 设计和实现**：2-3 天
- **后端集成**：2 天
- **测试和优化**：1-2 天
- **总计**：5-7 天

这部分应该在 **Phase 3（高级功能）** 中实现。
