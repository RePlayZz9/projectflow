import React from 'react';
import { Target, Plus, TrendingUp, Calendar, Users } from 'lucide-react';

const Goals = () => {
  const goals = [
    {
      id: 1,
      title: 'Launch Product V2.0',
      description: 'Complete development and launch the next version of our product',
      progress: 75,
      dueDate: 'Dec 31, 2024',
      priority: 'High',
      assignees: ['SC', 'MJ', 'AR'],
      status: 'On Track'
    },
    {
      id: 2,
      title: 'Increase User Engagement',
      description: 'Improve user engagement metrics by 25%',
      progress: 45,
      dueDate: 'Jan 15, 2025',
      priority: 'Medium',
      assignees: ['ED', 'JS'],
      status: 'At Risk'
    },
    {
      id: 3,
      title: 'Team Training Program',
      description: 'Complete training program for all team members',
      progress: 90,
      dueDate: 'Dec 20, 2024',
      priority: 'Low',
      assignees: ['LW', 'SC'],
      status: 'On Track'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'At Risk':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Behind':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-orange-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Goals</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track and manage your team's objectives</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{goal.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{goal.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`h-4 w-4 ${getPriorityColor(goal.priority)}`} />
                    <span className={`text-sm ${getPriorityColor(goal.priority)}`}>{goal.priority}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div className="flex -space-x-1">
                    {goal.assignees.map((assignee, index) => (
                      <div 
                        key={index}
                        className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800"
                      >
                        <span className="text-white text-xs font-medium">{assignee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;