'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addApiKey = () => {
    if (newKey.trim()) {
      setApiKeys([...apiKeys, { id: Date.now(), key: newKey }]);
      setNewKey('');
    }
  };

  const deleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditValue(key.key);
  };

  const saveEdit = () => {
    setApiKeys(apiKeys.map(key => 
      key.id === editingKey ? { ...key, key: editValue } : key
    ));
    setEditingKey(null);
    setEditValue('');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Key Management</h1>
        
        {/* Add new API key */}
        <div className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Enter new API key"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={addApiKey}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Key
            </button>
          </div>
        </div>

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex items-center gap-4 p-4 border rounded">
              {editingKey === key.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{key.key}</span>
                  <button
                    onClick={() => startEditing(key)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteApiKey(key.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 