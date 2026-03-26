import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  name: string;
  schedule: string;
  description: string;
  enabled: boolean;
  nextRun?: string;
}

const DEMO_TASKS: Task[] = [
  { id: '1', name: '小红书日记', schedule: '0 20 * * *', description: '每天晚上 8 点写小红书日记', enabled: true, nextRun: '今天 20:00' },
  { id: '2', name: '早安问候', schedule: '0 8 * * *', description: '每天早上 8 点发送问候', enabled: true, nextRun: '明天 08:00' },
  { id: '3', name: '新闻摘要', schedule: '0 9 * * 1-5', description: '工作日上午 9 点发送新闻', enabled: false },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', schedule: '', description: '' });
  const navigate = useNavigate();

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const deleteTask = (id: string) => {
    if (confirm('确定删除这个任务？')) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const addTask = () => {
    if (!newTask.name.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      name: newTask.name,
      schedule: newTask.schedule || '0 20 * * *',
      description: newTask.description,
      enabled: true,
      nextRun: newTask.schedule ? '即将执行' : undefined,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ name: '', schedule: '', description: '' });
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A14' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#12121E', borderBottom: '1px solid #1E1E30' }}>
        <div>
          <h1 className="font-semibold" style={{ color: '#FFFFFF' }}>定时任务</h1>
          <p className="text-xs" style={{ color: '#8888AA' }}>管理自动化任务</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)' }}
        >
          <span className="text-white text-xl">+</span>
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-5xl mb-4">⏰</span>
            <p style={{ color: '#8888AA' }}>暂无定时任务</p>
            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 px-4 py-2 rounded-xl"
              style={{ background: '#1E1E30', color: '#667EEA' }}
            >
              创建第一个任务
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-xl"
              style={{ background: '#12121E', border: '1px solid #1E1E30' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium" style={{ color: '#FFFFFF' }}>{task.name}</h3>
                  <p className="text-sm mt-1" style={{ color: '#8888AA' }}>{task.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-3">
                  <input
                    type="checkbox"
                    checked={task.enabled}
                    onChange={() => toggleTask(task.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      background: task.enabled ? '#667EEA' : '#1E1E30',
                    }}
                  />
                </label>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid #1E1E30' }}>
                <div>
                  <span className="text-xs px-2 py-1 rounded" style={{ background: '#1E1E30', color: '#8888AA' }}>
                    {task.schedule}
                  </span>
                  {task.nextRun && (
                    <span className="text-xs ml-2" style={{ color: '#667EEA' }}>{task.nextRun}</span>
                  )}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-sm px-2 py-1 rounded"
                  style={{ color: '#EF4444' }}
                >
                  删除
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAdd && (
        <div
          className="fixed inset-0 flex items-end justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowAdd(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-3xl p-6"
            style={{ background: '#12121E' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 mx-auto mb-4 rounded-full" style={{ background: '#1E1E30' }} />
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>新建任务</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#8888AA' }}>任务名称</label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  placeholder="例如：每日提醒"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ background: '#0A0A14', color: '#FFFFFF', border: '1px solid #1E1E30' }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#8888AA' }}>Cron 表达式</label>
                <input
                  type="text"
                  value={newTask.schedule}
                  onChange={(e) => setNewTask({ ...newTask, schedule: e.target.value })}
                  placeholder="0 20 * * *"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ background: '#0A0A14', color: '#FFFFFF', border: '1px solid #1E1E30' }}
                />
                <p className="text-xs mt-1" style={{ color: '#8888AA' }}>格式：分 时 日 月 周</p>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: '#8888AA' }}>描述</label>
                <input
                  type="text"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="任务说明"
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={{ background: '#0A0A14', color: '#FFFFFF', border: '1px solid #1E1E30' }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-3 rounded-xl"
                style={{ background: '#1E1E30', color: '#8888AA' }}
              >
                取消
              </button>
              <button
                onClick={addTask}
                className="flex-1 py-3 rounded-xl font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)' }}
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
