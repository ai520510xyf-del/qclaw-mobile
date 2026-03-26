import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getAuth } from '../services/auth';

export default function SettingsPage() {
  const [gatewayUrl, setGatewayUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAuth().then((auth) => {
      if (auth) setGatewayUrl(auth.gatewayUrl);
    });
  }, []);

  const handleLogout = async () => {
    if (confirm('确定退出登录？')) {
      await clearAuth();
      navigate('/login', { replace: true });
    }
  };

  const handleClearCache = () => {
    if (confirm('确定清除所有缓存？')) {
      localStorage.clear();
      sessionStorage.clear();
      alert('缓存已清除');
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A14' }}>
      {/* Header */}
      <div className="px-4 py-3" style={{ background: '#12121E', borderBottom: '1px solid #1E1E30' }}>
        <h1 className="font-semibold" style={{ color: '#FFFFFF' }}>设置</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Connection Info */}
        <div className="rounded-xl p-4" style={{ background: '#12121E' }}>
          <h2 className="font-medium mb-3" style={{ color: '#FFFFFF' }}>连接信息</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span style={{ color: '#8888AA' }}>Gateway</span>
              <span style={{ color: '#FFFFFF' }}>{gatewayUrl || '未配置'}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8888AA' }}>状态</span>
              <span style={{ color: '#10B981' }}>已连接</span>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="rounded-xl p-4" style={{ background: '#12121E' }}>
          <h2 className="font-medium mb-3" style={{ color: '#FFFFFF' }}>账号</h2>
          <div className="space-y-3">
            <button
              onClick={handleClearCache}
              className="w-full py-3 rounded-xl text-left px-4 transition-all hover:opacity-80"
              style={{ background: '#1E1E30', color: '#FFFFFF' }}
            >
              清除缓存
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl text-left px-4 transition-all hover:opacity-80"
              style={{ background: '#1E1E30', color: '#EF4444' }}
            >
              退出登录
            </button>
          </div>
        </div>

        {/* About */}
        <div className="rounded-xl p-4" style={{ background: '#12121E' }}>
          <h2 className="font-medium mb-3" style={{ color: '#FFFFFF' }}>关于</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span style={{ color: '#8888AA' }}>版本</span>
              <span style={{ color: '#FFFFFF' }}>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#8888AA' }}>构建</span>
              <span style={{ color: '#FFFFFF' }}>React + Capacitor</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="rounded-xl p-4" style={{ background: '#12121E' }}>
          <h2 className="font-medium mb-3" style={{ color: '#FFFFFF' }}>功能</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 rounded-lg text-center" style={{ background: '#1E1E30' }}>
              <span className="text-lg">💬</span>
              <p style={{ color: '#8888AA' }}>聊天</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: '#1E1E30' }}>
              <span className="text-lg">📋</span>
              <p style={{ color: '#8888AA' }}>技能</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: '#1E1E30' }}>
              <span className="text-lg">⏰</span>
              <p style={{ color: '#8888AA' }}>任务</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: '#1E1E30' }}>
              <span className="text-lg">🎙️</span>
              <p style={{ color: '#8888AA' }}>语音</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
