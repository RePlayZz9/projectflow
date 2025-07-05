import React from 'react';
import { FileText, Plus, Search, Folder, Clock, User } from 'lucide-react';

const Docs = () => {
  const documents = [
    {
      id: 1,
      title: 'Project Requirements',
      type: 'Requirements',
      lastModified: '2 hours ago',
      author: 'Sarah Chen',
      size: '2.4 MB',
      folder: 'Planning'
    },
    {
      id: 2,
      title: 'API Documentation',
      type: 'Technical',
      lastModified: '1 day ago',
      author: 'Mike Johnson',
      size: '1.8 MB',
      folder: 'Development'
    },
    {
      id: 3,
      title: 'User Research Findings',
      type: 'Research',
      lastModified: '3 days ago',
      author: 'Alex Rodriguez',
      size: '5.2 MB',
      folder: 'Research'
    },
    {
      id: 4,
      title: 'Design System Guide',
      type: 'Design',
      lastModified: '1 week ago',
      author: 'Emily Davis',
      size: '3.1 MB',
      folder: 'Design'
    },
    {
      id: 5,
      title: 'Meeting Notes - Sprint Planning',
      type: 'Notes',
      lastModified: '2 weeks ago',
      author: 'John Smith',
      size: '0.8 MB',
      folder: 'Meetings'
    }
  ];

  const folders = [
    { name: 'Planning', count: 8, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { name: 'Development', count: 12, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    { name: 'Research', count: 5, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    { name: 'Design', count: 7, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
    { name: 'Meetings', count: 15, color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' }
  ];

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Documents</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage and organize your project documentation</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Document</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Folders */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {folders.map((folder, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Folder className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{folder.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{folder.count} files</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Documents</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">Folder</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">Author</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">Modified</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 dark:text-white">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={doc.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 transition-colors ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                    }`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-400">
                            {getTypeIcon(doc.type)}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{doc.type}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{doc.folder}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">{doc.author.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white">{doc.author}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{doc.lastModified}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{doc.size}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;