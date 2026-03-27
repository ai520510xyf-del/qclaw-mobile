import { useModelStore } from '../stores/modelStore';

export default function TokenPage() {
  const { models, tokenUsage, currentModel, getCurrentModelConfig } = useModelStore();

  const currentConfig = getCurrentModelConfig();
  const totalUsed = tokenUsage?.usedQuota || 0;
  const totalRemaining = tokenUsage?.remainingQuota || 0;
  const percentage = tokenUsage ? (totalUsed / tokenUsage.freeQuota) * 100 : 0;

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A14' }}>
      {/* Header */}
      <div className="px-4 py-3" style={{ background: '#12121E', borderBottom: '1px solid #1E1E30' }}>
        <h1 className="font-semibold" style={{ color: '#FFFFFF' }}>Token 管理</h1>
        <p className="text-xs" style={{ color: '#8888AA' }}>监控 AI 模型使用量</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="p-4 rounded-xl" style={{ background: '#12121E', border: '1px solid #1E1E30' }}>
          <p className="text-xs mb-1" style={{ color: '#8888AA' }}>已使用</p>
          <p className="text-2xl font-bold" style={{ color: '#667EEA' }}>{(totalUsed / 1000).toFixed(1)}K</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#12121E', border: '1px solid #1E1E30' }}>
          <p className="text-xs mb-1" style={{ color: '#8888AA' }}>剩余额度</p>
          <p className="text-2xl font-bold" style={{ color: '#22C55E' }}>{(totalRemaining / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Current Model */}
      <div className="px-4">
        <h2 className="text-sm font-medium mb-3" style={{ color: '#FFFFFF' }}>当前模型</h2>
        <div className="p-4 rounded-xl" style={{ background: '#12121E', border: '1px solid #1E1E30' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{currentConfig.name}</span>
            <span className="text-xs px-2 py-1 rounded" style={{ background: currentConfig.type === 'free' ? '#22C55E33' : '#667EEA33', color: currentConfig.type === 'free' ? '#22C55E' : '#667EEA' }}>
              {currentConfig.type === 'free' ? '免费' : '付费'}
            </span>
          </div>
          {currentConfig.dailyQuota && (
            <>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#1E1E30' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    background: percentage > 80 ? '#EF4444' : 'linear-gradient(90deg, #667EEA, #764BA2)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: '#8888AA' }}>
                <span>已用: {(totalUsed / 1000000).toFixed(2)}M</span>
                <span>额度: {(currentConfig.dailyQuota / 1000000).toFixed(0)}M/天</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Available Models */}
      <div className="flex-1 overflow-y-auto px-4 mt-4">
        <h2 className="text-sm font-medium mb-3" style={{ color: '#FFFFFF' }}>可用模型</h2>
        <div className="space-y-2">
          {models.map((model) => (
            <div
              key={model.id}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{
                background: '#12121E',
                border: currentModel === model.id ? '1px solid #667EEA' : '1px solid #1E1E30',
              }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{model.name}</p>
                <p className="text-xs" style={{ color: '#8888AA' }}>
                  {model.type === 'free' ? '免费额度' : '按量付费'}
                </p>
              </div>
              <div className="text-right">
                {model.dailyQuota && (
                  <p className="text-sm" style={{ color: '#667EEA' }}>
                    {(model.dailyQuota / 1000000).toFixed(0)}M/天
                  </p>
                )}
                {model.isDefault && (
                  <span className="text-xs" style={{ color: '#8888AA' }}>默认</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
