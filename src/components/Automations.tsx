import React from 'react';
import { Zap, Plus, Play, Pause, Settings, Clock, CheckCircle } from 'lucide-react';

const Automations = () => {
  const automations = [
    {
      id: 1,
      name: 'Auto-assign tasks to team members',
      description: 'Automatically assign new tasks based on workload and expertise',
      trigger: 'New task created',
      action: 'Assign to team member',
      status: 'Active',
      lastRun: '2 hours ago',
      runsToday: 12,
      enabled: true
    },
    {
      id: 2,
      name: 'Send deadline reminders',
      description: 'Send notifications 24 hours before task deadlines',
      trigger: 'Task due in 24 hours',
      action: 'Send notification',
      status: 'Active',
      lastRun: '6 hours ago',
      runsToday: 8,
      enabled: true
    },
    {
      id: 3,
      name: 'Update project status',
      description: 'Automatically update project status when all tasks are complete',
      trigger: 'All tasks completed',
      action: 'Update project status',
      status: 'Paused',
      lastRun: '2 days ago',
      runsToday: 0,
      enabled: false
    },
    {
      id: 4,
      name: 'Weekly progress reports',
      description: 'Generate and send weekly progress reports to stakeholders',
      trigger: 'Every Monday 9 AM',
      action: 'Generate report',
      status: 'Active',
      lastRun: '3 days ago',
      runsToday: 1,
      enabled: true
    },
    {
      id: 5,
      name: 'Slack integration sync',
      description: 'Sync task updates with Slack channels',
      trigger: 'Task status changed',
      action: 'Post to Slack',
      status: 'Active',
      lastRun: '1 hour ago',
      runsToday: 24,
      enabled: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const toggleAutomation = (id: number) => {
    // Toggle automation logic would go here
    console.log(`Toggle automation ${id}`);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Automations</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Streamline your workflow with automated processes</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Automation</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Automations</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">4</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <Zap className="h-6 w-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Runs Today</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">45</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Play className="h-6 w-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Time Saved</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">12h</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Automations List */}
        <div className="space-y-4">
          {automations.map((automation) => (
            <div key={automation.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-2 rounded-lg ${automation.enabled ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <Zap className={`h-5 w-5 ${automation.enabled ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{automation.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(automation.status)}`}>
                        {automation.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{automation.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Trigger</p>
                        <p className="text-sm text-gray-900 dark:text-white">{automation.trigger}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Action</p>
                        <p className="text-sm text-gray-900 dark:text-white">{automation.action}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Last run: {automation.lastRun}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>{automation.runsToday} runs today</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      automation.enabled
                        ? 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                        : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={automation.enabled ? 'Pause automation' : 'Start automation'}
                  >
                    {automation.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Automations;