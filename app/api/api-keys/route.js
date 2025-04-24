import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import crypto from 'crypto';

// In a real application, you would use a database
let apiKeys = [];

export async function GET(request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(apiKeys);
}

export async function POST(request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newKey = {
    id: crypto.randomUUID(),
    name: 'New API Key',
    key: `tvly-${crypto.randomBytes(32).toString('hex')}`,
    usage: 0,
    createdAt: new Date().toISOString(),
  };

  apiKeys.push(newKey);

  return NextResponse.json(newKey);
}

export async function DELETE(request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const keyId = url.searchParams.get('id');

  if (!keyId) {
    return NextResponse.json({ error: 'Key ID is required' }, { status: 400 });
  }

  apiKeys = apiKeys.filter(key => key.id !== keyId);

  return NextResponse.json({ success: true });
} 