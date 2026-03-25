import { useState } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { storage } from '../utils/storage';
import { isValidUrl } from '../utils/validation';

export function SettingsPage() {
  const { gatewayUrl, token, isConnected, setGatewayUrl, setToken, setConnected } = useSettingsStore();
  const [localGatewayUrl, setLocalGatewayUrl] = useState(gatewayUrl);
  const [localToken, setLocalToken] = useState(token);
  const [urlError, setUrlError] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [cacheSize, setCacheSize] = useState('2.4 MB');

  const handleSave = () => {
    if (!isValidUrl(localGatewayUrl)) {
      setUrlError(true);
      return;
    }
    setUrlError(false);
    setGatewayUrl(localGatewayUrl);
    setToken(localToken);
    setConnected(true);
    alert('设置已保存');
  };

  const handleTestConnection = async () => {
    if (!isValidUrl(localGatewayUrl)) {
      setUrlError(true);
      return;
    }
    // Simulate connection test
    setConnected(true);
    alert('连接成功！');
  };

  const handleClearCache = () => {
    storage.clear();
    setCacheSize('0 B');
    alert('缓存已清理');
  };

  const handleClearChat = () => {
    if (confirm('确定要清除所有聊天记录吗？')) {
      localStorage.removeItem('qclaw-chat');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-dark">
      <PageHeader title="设置" subtitle="配置应用参数" />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-4 no-scrollbar">
        {/* Connection Settings */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            🔗 连接设置
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Gateway URL
              </label>
              <Input
                value={localGatewayUrl}
                onChange={(e) => {
                  setLocalGatewayUrl(e.target.value);
                  setUrlError(false);
                }}
                placeholder="http://localhost:8080"
                error={urlError}
              />
              {urlError && (
                <p className="text-xs text-error mt-1">请输入有效的 URL</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Access Token
              </label>
              <div className="relative">
                <Input
                  type={showToken ? 'text' : 'password'}
                  value={localToken}
                  onChange={(e) => setLocalToken(e.target.value)}
                  placeholder="输入你的访问令牌"
                />
                <button
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showToken ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={handleTestConnection}>
                测试连接
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleSave}>
                保存
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-secondary">状态：</span>
              <span className={isConnected ? 'text-success' : 'text-text-muted'}>
                {isConnected ? '● 已连接' : '○ 未连接'}
              </span>
            </div>
          </div>
        </Card>

        {/* Storage Settings */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            💾 存储管理
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">缓存大小</span>
              <span className="text-sm text-text-primary">{cacheSize}</span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={handleClearCache}>
                清理缓存
              </Button>
              <Button variant="ghost" className="flex-1 text-error" onClick={handleClearChat}>
                清除聊天记录
              </Button>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            ℹ️ 关于
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">应用名称</span>
              <span className="text-sm text-text-primary">QClaw Mobile</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">版本</span>
              <span className="text-sm text-text-primary">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">构建日期</span>
              <span className="text-sm text-text-primary">2026-03-26</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">框架</span>
              <span className="text-sm text-text-primary">React + Capacitor</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
