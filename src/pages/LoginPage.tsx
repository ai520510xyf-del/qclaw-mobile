import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, saveAuth } from '../services/auth';

const DEFAULT_GATEWAY = 'http://127.0.0.1:28789';

export default function LoginPage() {
  const [gatewayUrl, setGatewayUrl] = useState(DEFAULT_GATEWAY);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    getAuth().then((auth) => {
      if (auth) {
        navigate('/chat', { replace: true });
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const handleLogin = async () => {
    if (!gatewayUrl.trim()) {
      setError('请输入 Gateway 地址');
      return;
    }
    if (!token.trim()) {
      setError('请输入认证 Token');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await saveAuth({ gatewayUrl: gatewayUrl.trim(), token: token.trim() });
      navigate('/chat', { replace: true });
    } catch {
      setError('保存失败，请重试');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A14' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: '#667EEA', borderTopColor: 'transparent' }} />
          <p style={{ color: '#8888AA' }}>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#0A0A14' }}>
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl"
          style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)' }}>
          🦞
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>QClaw Mobile</h1>
        <p style={{ color: '#8888AA' }}>连接你的 AI 助手</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#8888AA' }}>
            Gateway 地址
          </label>
          <input
            type="url"
            value={gatewayUrl}
            onChange={(e) => setGatewayUrl(e.target.value)}
            placeholder="http://127.0.0.1:28789"
            className="w-full px-4 py-3 rounded-xl outline-none transition-all"
            style={{ background: '#12121E', color: '#FFFFFF', border: '1px solid #1E1E30' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#8888AA' }}>
            认证 Token
          </label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="输入你的认证 Token"
            className="w-full px-4 py-3 rounded-xl outline-none transition-all"
            style={{ background: '#12121E', color: '#FFFFFF', border: '1px solid #1E1E30' }}
          />
        </div>

        {error && (
          <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-98"
          style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)' }}
        >
          连接
        </button>
      </div>

      {/* Help */}
      <p className="mt-8 text-sm" style={{ color: '#8888AA' }}>
        Token 在 QClaw 设置 → 开发者 中获取
      </p>
    </div>
  );
}
