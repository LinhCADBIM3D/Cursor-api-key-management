'use client'

import { useState, useEffect } from 'react'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
}

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const generateApiKey = () => {
    return 'sk-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleCreate = () => {
    if (!newKeyName) return
    
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: generateApiKey(),
      createdAt: new Date().toISOString()
    }
    
    setApiKeys([...apiKeys, newKey])
    setNewKeyName('')
  }

  const handleDelete = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const handleEdit = (key: ApiKey) => {
    setEditingKey(key)
    setNewKeyName(key.name)
  }

  const handleUpdate = () => {
    if (!editingKey || !newKeyName) return
    
    setApiKeys(apiKeys.map(key => 
      key.id === editingKey.id 
        ? { ...key, name: newKeyName }
        : key
    ))
    setEditingKey(null)
    setNewKeyName('')
  }

  if (!isMounted) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">API Key Management Dashboard</h1>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Key Management Dashboard</h1>
        
        {/* Create/Edit Form */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingKey ? 'Edit API Key' : 'Create New API Key'}
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter API key name"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={editingKey ? handleUpdate : handleCreate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingKey ? 'Update' : 'Create'}
            </button>
            {editingKey && (
              <button
                onClick={() => {
                  setEditingKey(null)
                  setNewKeyName('')
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{apiKey.name}</h3>
                  <p className="text-sm text-gray-600">{apiKey.key}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(apiKey.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(apiKey)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(apiKey.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 