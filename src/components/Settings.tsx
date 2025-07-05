import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Users,
  Mail,
  Smartphone,
  Monitor,
  Sun,
  Moon
} from 'lucide-react';

const Settings = () => {
  const { theme, setTheme, isDark } = useTheme();

  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      items: [
        { label: 'Personal Information', description: 'Update your profile details' },
        { label: 'Account Preferences', description: 'Manage your account settings' },
        { label: 'Profile Picture', description: 'Change your profile image' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Configure email alerts' },
        { label: 'Push Notifications', description: 'Manage browser notifications' },
        { label: 'Slack Integration', description: 'Connect with Slack workspace' }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Password', description: 'Change your password' },
        { label: 'Two-Factor Authentication', description: 'Enable 2FA for extra security' },
        { label: 'API Keys', description: 'Manage your API access keys' }
      ]
    },
    {
      title: 'Team',
      icon: Users,
      items: [
        { label: 'Team Members', description: 'Invite and manage team members' },
        { label: 'Roles & Permissions', description: 'Configure user roles' },
        { label: 'Workspace Settings', description: 'Manage workspace preferences' }
      ]
    }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="p-6 max-w-4xl">
        {/* Theme Settings */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customize how the app looks and feels</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value as any)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    theme === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, index) => (
            <div key={index}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <section.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                      </div>
                      <div className="text-gray-400 dark:text-gray-500">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Export Data</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download your project data</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Key className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">API Access</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generate API keys</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;