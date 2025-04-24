'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ApiKeysPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchApiKeys();
    }
  }, [status]);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/api-keys');
      const data = await response.json();
      setApiKeys(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setLoading(false);
    }
  };

  const createNewKey = async () => {
    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newKey = await response.json();
      setApiKeys([...apiKeys, newKey]);
    } catch (error) {
      console.error('Error creating new API key:', error);
    }
  };

  const deleteKey = async (keyId) => {
    try {
      await fetch(`/api/api-keys/${keyId}`, {
        method: 'DELETE',
      });
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  const copyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      alert('API key copied to clipboard!');
    } catch (error) {
      console.error('Error copying key:', error);
    }
  };

  const refreshKey = async (keyId) => {
    try {
      const response = await fetch(`/api/api-keys/${keyId}/refresh`, {
        method: 'POST',
      });
      const updatedKey = await response.json();
      setApiKeys(apiKeys.map(key => 
        key.id === keyId ? updatedKey : key
      ));
    } catch (error) {
      console.error('Error refreshing key:', error);
    }
  };

  const startEdit = (key) => {
    setEditingKey(key.id);
    setEditName(key.name);
  };

  const saveEdit = async (keyId) => {
    try {
      const response = await fetch(`/api/api-keys/${keyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      });
      const updatedKey = await response.json();
      setApiKeys(apiKeys.map(key => 
        key.id === keyId ? { ...key, name: editName } : key
      ));
      setEditingKey(null);
    } catch (error) {
      console.error('Error updating key:', error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
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

      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">API Keys</h2>
          <p className="text-gray-600">The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.</p>
        </div>
        <button
          onClick={createNewKey}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                <td className="p-4">
                  {editingKey === key.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                      onBlur={() => saveEdit(key.id)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(key.id)}
                      autoFocus
                    />
                  ) : (
                    key.name
                  )}
                </td>
                <td className="p-4">{key.usage}</td>
                <td className="p-4">
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {key.key.substring(0, 8)}•••••••••••••••••
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
                    onClick={() => refreshKey(key.id)}
                    className="text-gray-600 hover:text-gray-900 mx-1" 
                    title="Refresh"
                  >
                    🔄
                  </button>
                  <button 
                    onClick={() => startEdit(key)}
                    className="text-gray-600 hover:text-gray-900 mx-1" 
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteKey(key.id)}
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
  );
} 