import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { symbol, type, targetPrice } = await req.json();
    if (!symbol || !type || !targetPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const alert = await prisma.alert.create({
      data: {
        userId: user.id,
        symbol: symbol.toUpperCase(),
        type: type.toUpperCase(),
        targetPrice: parseFloat(targetPrice),
        isActive: true,
        isTriggered: false,
      },
    });

    return NextResponse.json({ success: true, alert });
  } catch (err) {
    console.error('Create alert error:', err);
    return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
  }
}
