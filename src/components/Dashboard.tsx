import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock,
  BarChart3,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Tasks', value: '156', change: '+12%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'In Progress', value: '24', change: '+8%', icon: Clock, color: 'text-blue-600' },
    { label: 'Team Members', value: '12', change: '+2', icon: Users, color: 'text-purple-600' },
    { label: 'Completion Rate', value: '87%', change: '+5%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentTasks = [
    { name: 'Design new landing page', assignee: 'Sarah Chen', status: 'In Progress', priority: 'High' },
    { name: 'Implement user auth', assignee: 'Mike Johnson', status: 'Pending', priority: 'Medium' },
    { name: 'Write API docs', assignee: 'Alex Rodriguez', status: 'Complete', priority: 'Low' },
    { name: 'Set up CI/CD', assignee: 'Emily Davis', status: 'Blocked', priority: 'High' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Overview of your project progress and team activity</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Overview</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
                <div key={index} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tasks</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {recentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{task.assignee}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'Complete' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;