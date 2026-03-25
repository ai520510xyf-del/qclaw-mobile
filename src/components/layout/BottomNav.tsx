import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

const tabs = [
  { path: '/', icon: '💬', label: '聊天' },
  { path: '/skills', icon: '📋', label: '技能' },
  { path: '/files', icon: '📁', label: '文件' },
  { path: '/settings', icon: '⚙️', label: '设置' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5">
      <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200 min-w-[60px]',
                isActive ? 'text-primary' : 'text-text-muted hover:text-text-secondary'
              )
            }
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
