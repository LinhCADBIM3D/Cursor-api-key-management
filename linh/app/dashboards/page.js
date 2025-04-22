'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [editingKey, setEditingKey] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    limit: '',
  });
  const [newKey, setNewKey] = useState({
    name: '',
    usage: '0',
    limit: '1000'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load API keys from localStorage on component mount
  useEffect(() => {
    if (mounted) {
      try {
        const savedKeys = localStorage.getItem('apiKeys');
        if (savedKeys) {
          setApiKeys(JSON.parse(savedKeys));
        } else {
          // Initialize with default key if no keys exist
          const defaultKey = {
            id: 'default',
            name: 'default',
            key: generateApiKey(),
            usage: '24',
            createdAt: new Date().toISOString()
          };
          setApiKeys([defaultKey]);
          localStorage.setItem('apiKeys', JSON.stringify([defaultKey]));
        }
      } catch (error) {
        console.error('Error loading API keys:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [mounted]);

  // Save API keys to localStorage whenever they change
  useEffect(() => {
    if (mounted && !isLoading) {
      try {
        localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
      } catch (error) {
        console.error('Error saving API keys:', error);
      }
    }
  }, [apiKeys, isLoading, mounted]);

  const generateApiKey = () => {
    const randomString = Array(32)
      .fill(0)
      .map(() => Math.random().toString(36).charAt(2))
      .join('');
    return `tvly-${randomString}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKey(prev => ({ ...prev, [name]: value }));
  };

  const addApiKey = () => {
    if (newKey.name.trim()) {
      const newApiKey = {
        id: Date.now(),
        ...newKey,
        key: generateApiKey(),
        usage: '0',
        createdAt: new Date().toISOString()
      };
      setApiKeys([...apiKeys, newApiKey]);
      setNewKey({
        name: '',
        usage: '0',
        limit: '1000'
      });
      setShowAddForm(false);
    }
  };

  const deleteApiKey = (id) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskApiKey = (key) => {
    if (!key) return '••••••••••';
    
    const parts = key.split('-');
    if (parts.length < 2) return key;

    const prefix = parts[0];
    const rest = parts.slice(1).join('-');
    return `${prefix}-${'•'.repeat(Math.min(rest.length, 32))}`;
  };

  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditForm({
      name: key.name,
      limit: key.limit || '1000',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEdit = (keyId) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? {
        ...key,
        name: editForm.name,
        limit: editForm.limit
      } : key
    ));
    setEditingKey(null);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditForm({
      name: '',
      limit: '',
    });
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const totalRequests = 1000;
  const usedRequests = apiKeys.reduce((sum, key) => sum + parseInt(key.usage || 0), 0);
  const usagePercentage = (usedRequests / totalRequests) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Overview</h1>

        {/* Current Plan Card */}
        <div className="rounded-2xl p-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white">
          <div className="mb-6">
            <span className="px-4 py-2 rounded-full bg-white/20 text-sm font-medium">
              CURRENT PLAN
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-8">Researcher</h2>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">API Limit</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
            <span className="text-sm">{usedRequests}/{totalRequests} Requests</span>
          </div>
        </div>

        {/* API Keys Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h2>
              <p className="text-gray-600 text-sm">
                The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>+ Create New Key</span>
            </button>
          </div>

          {/* API Keys Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">NAME</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">USAGE</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">KEY</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {editingKey === key.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter key name"
                        />
                      ) : (
                        key.name
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {editingKey === key.id ? (
                        <input
                          type="number"
                          name="limit"
                          value={editForm.limit}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter limit"
                        />
                      ) : (
                        key.usage
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 font-mono">
                      {visibleKeys.has(key.id) ? key.key : maskApiKey(key.key)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => toggleKeyVisibility(key.id)}
                          className={`text-gray-400 hover:text-gray-600 transition-colors ${
                            visibleKeys.has(key.id) ? 'text-blue-500 hover:text-blue-600' : ''
                          }`}
                          title={visibleKeys.has(key.id) ? "Hide API Key" : "Show API Key"}
                        >
                          {visibleKeys.has(key.id) ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(key.key);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        {editingKey === key.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(key.id)}
                              className="text-green-500 hover:text-green-600"
                              title="Save"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-gray-400 hover:text-gray-600"
                              title="Cancel"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEditing(key)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => deleteApiKey(key.id)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New API Key Modal */}
        {showAddForm && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
              onClick={() => setShowAddForm(false)}
              style={{ backdropFilter: 'blur(4px)' }}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div 
                className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ease-out animate-modal-appear"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="absolute -right-2 -top-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <h2 className="text-xl font-semibold mb-4">Create a new API key</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Enter a name and limit for the new API key.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm mb-2">
                        Key Name — <span className="text-gray-500">A unique name to identify this key</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newKey.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Key Name"
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
                        />
                        <span className="text-sm">Limit monthly usage*</span>
                      </label>
                      <input
                        type="number"
                        name="limit"
                        value={newKey.limit}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="1000"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        *If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addApiKey}
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 