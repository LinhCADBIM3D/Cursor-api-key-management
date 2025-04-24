"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createApiKey, getApiKeys, deleteApiKey, updateApiKey } from '@/lib/supabase';
import Toast from '../components/Toast';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState([]);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    key: '',
    usage: 0,
    request_limit: 1000
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyForm, setNewKeyForm] = useState({
    name: '',
    limit: 1000
  });
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const suggestedNames = [
    { name: 'development', description: 'For local development and testing' },
    { name: 'production', description: 'For production environment' },
    { name: 'staging', description: 'For staging environment' },
    { name: 'mobile-app', description: 'For mobile application' },
    { name: 'web-app', description: 'For web application' },
    { name: 'analytics', description: 'For data analytics' },
    { name: 'backup', description: 'For backup services' },
    { name: 'testing', description: 'For testing purposes' }
  ];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchApiKeys();
    }
  }, [status, router]);

  const fetchApiKeys = async () => {
    try {
      const keys = await getApiKeys();
      setApiKeys(keys);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setLoading(false);
    }
  };

  const handleCreateNewKey = async (e) => {
    e.preventDefault();
    try {
      const newKey = await createApiKey({ 
        name: newKeyForm.name,
        limit: parseInt(newKeyForm.limit)
      });
      setApiKeys([newKey, ...apiKeys]);
      setShowCreateModal(false);
      setNewKeyForm({
        name: '',
        limit: 1000
      });
    } catch (error) {
      console.error('Error creating new API key:', error);
      alert('Failed to create API key');
    }
  };

  const handleSuggestionClick = (name) => {
    setNewKeyForm(prev => ({ ...prev, name }));
    setSelectedSuggestion(name);
  };

  const handleDeleteKey = async (keyId) => {
    try {
      await deleteApiKey(keyId);
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      setToast({
        show: true,
        message: 'API key deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
      setToast({
        show: true,
        message: 'Failed to delete API key'
      });
    }
  };

  const copyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      setToast({
        show: true,
        message: 'API key copied to clipboard!'
      });
    } catch (error) {
      console.error('Error copying key:', error);
      setToast({
        show: true,
        message: 'Failed to copy API key'
      });
    }
  };

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newState = {
        ...prev,
        [keyId]: !prev[keyId]
      };
      setToast({
        show: true,
        message: newState[keyId] ? 'API key is now visible' : 'API key is now hidden'
      });
      return newState;
    });
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setEditForm({
      name: key.name,
      key: key.key,
      usage: key.usage || 0,
      request_limit: key.request_limit
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update in Supabase
      const updatedKey = await updateApiKey(editingKey.id, {
        name: editForm.name,
        key: editForm.key,
        usage: parseInt(editForm.usage),
        limit: parseInt(editForm.request_limit)
      });

      // Update local state
      setApiKeys(apiKeys.map(key => 
        key.id === editingKey.id ? {
          ...key,
          name: editForm.name,
          key: editForm.key,
          usage: parseInt(editForm.usage),
          request_limit: parseInt(editForm.request_limit)
        } : key
      ));

      setShowEditModal(false);
      setEditingKey(null);
      setEditForm({
        name: '',
        key: '',
        usage: 0,
        request_limit: 1000
      });
    } catch (error) {
      console.error('Error updating API key:', error);
      alert('Failed to update API key');
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.push('/')}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
        >
          {/* Animated background overlay */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Icon with animation */}
          <svg 
            className="w-5 h-5 relative transition-transform duration-300 group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          
          {/* Text with subtle animation */}
          <span className="relative font-semibold">Back to Home</span>
        </button>

        <div className="flex items-center gap-4">
          <span>Welcome, {session?.user?.email}</span>
          <button 
            onClick={() => router.push('/api/auth/signout')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Current Plan Overview */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-xl p-6 text-white">
          <div className="mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">CURRENT PLAN</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Researcher</h2>
          <div>
            <p className="text-sm mb-2">API Limit</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-sm mt-2">0/1000 Requests</p>
          </div>
        </div>
      </div>

      {/* API Keys Management */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">API Keys</h2>
            <p className="text-gray-600">The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Create New Key
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">NAME</th>
                <th className="text-left p-4">USAGE</th>
                <th className="text-left p-4">KEY</th>
                <th className="text-right p-4">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.id} className="border-b">
                  <td className="p-4">{key.name}</td>
                  <td className="p-4">{key.usage || 0}/{key.request_limit}</td>
                  <td className="p-4">
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {visibleKeys[key.id] ? key.key : `${key.key.substring(0, 8)}•••••••••••••••••`}
                    </code>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => copyKey(key.key)}
                      className="text-gray-600 hover:text-gray-900 mx-1" 
                      title="Copy"
                    >
                      📋
                    </button>
                    <button 
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="text-gray-600 hover:text-gray-900 mx-1" 
                      title={visibleKeys[key.id] ? "Hide Key" : "Show Key"}
                    >
                      {visibleKeys[key.id] ? '👁️' : '👁️‍🗨️'}
                    </button>
                    <button 
                      onClick={() => handleEdit(key)}
                      className="text-gray-600 hover:text-gray-900 mx-1" 
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-gray-600 hover:text-gray-900 mx-1"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity" onClick={() => {
            setShowCreateModal(false);
            setNewKeyForm({ name: '', limit: 1000 });
            setSelectedSuggestion('');
          }}></div>
          <div className="bg-white rounded-lg p-6 w-[500px] relative z-50 animate-modal-appear">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold">Create a new API key</h3>
                <p className="text-gray-600 text-sm mt-1">Enter a name and limit for the new API key.</p>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewKeyForm({ name: '', limit: 1000 });
                  setSelectedSuggestion('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateNewKey} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Key Name <span className="text-gray-500">— A unique name to identify this key</span>
                </label>
                <input
                  type="text"
                  value={newKeyForm.name}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Key Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Suggested names:</label>
                <div className="flex flex-wrap gap-2">
                  {suggestedNames.map((suggestion) => (
                    <button
                      key={suggestion.name}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion.name)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        selectedSuggestion === suggestion.name
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {suggestion.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={true}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled
                  />
                  <span className="text-sm font-medium">Limit monthly usage*</span>
                </label>
                <input
                  type="number"
                  value={newKeyForm.limit}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, limit: e.target.value })}
                  className="w-full mt-2 p-2 border rounded-lg"
                  min="1"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  *If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewKeyForm({ name: '', limit: 1000 });
                    setSelectedSuggestion('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity" onClick={() => {
            setShowEditModal(false);
            setEditingKey(null);
            setEditForm({
              name: '',
              key: '',
              usage: 0,
              request_limit: 1000
            });
          }}></div>
          <div className="bg-white rounded-lg p-6 w-[500px] relative z-50 animate-modal-appear">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit API Key</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingKey(null);
                  setEditForm({
                    name: '',
                    key: '',
                    usage: 0,
                    request_limit: 1000
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter API key name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={editForm.key}
                  onChange={(e) => setEditForm({ ...editForm, key: e.target.value })}
                  className="w-full p-2 border rounded-md font-mono text-sm"
                  placeholder="Enter API key"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Usage
                  </label>
                  <input
                    type="number"
                    value={editForm.usage}
                    onChange={(e) => setEditForm({ ...editForm, usage: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Limit
                  </label>
                  <input
                    type="number"
                    value={editForm.request_limit}
                    onChange={(e) => setEditForm({ ...editForm, request_limit: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingKey(null);
                    setEditForm({
                      name: '',
                      key: '',
                      usage: 0,
                      request_limit: 1000
                    });
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Toast component at the end */}
      <Toast 
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: '' })}
      />
    </div>
  );
} 