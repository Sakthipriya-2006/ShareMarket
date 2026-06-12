import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, name, riskProfile } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        riskProfile: riskProfile || 'Balanced',
        cashBalance: 124500.0, // Starting balance to match Portfolio Overview $124,500 total value ($118,526 in assets + $5,974 cash)
      },
    });

    // Seed default holdings to match the portfolio overview screen:
    // - AAPL: 50.0 quantity, avgPrice $172.65, currentPrice $185.20 -> value $9,260 (PL +$627.50)
    // - MSFT: 15.0 quantity, avgPrice $405.10, currentPrice $398.20 -> value $5,973 (PL -$103.50)
    // - BTC: 0.452 quantity, avgPrice $42,120.00, currentPrice $64,310.50 -> value $29,068.35 (PL +$10,034.20)
    // Total portfolio value: $124,500
    await prisma.holding.createMany({
      data: [
        { userId: user.id, symbol: 'AAPL', quantity: 50.0, avgPrice: 172.65 },
        { userId: user.id, symbol: 'MSFT', quantity: 15.0, avgPrice: 405.10 },
        { userId: user.id, symbol: 'BTC', quantity: 0.452, avgPrice: 42120.00 },
      ]
    });

    // Seed transaction history
    await prisma.transaction.createMany({
      data: [
        { userId: user.id, symbol: 'AAPL', type: 'BUY', quantity: 50.0, price: 172.65 },
        { userId: user.id, symbol: 'MSFT', type: 'BUY', quantity: 15.0, price: 405.10 },
        { userId: user.id, symbol: 'BTC', type: 'BUY', quantity: 0.452, price: 42120.00 },
      ]
    });

    // Seed watchlist defaults
    await prisma.watchlist.createMany({
      data: [
        { userId: user.id, symbol: 'TSLA' },
        { userId: user.id, symbol: 'NVDA' },
        { userId: user.id, symbol: 'AMZN' },
      ]
    });

    // Seed some price alerts
    await prisma.alert.createMany({
      data: [
        { userId: user.id, symbol: 'NVDA', targetPrice: 850.00, type: 'ABOVE' },
        { userId: user.id, symbol: 'TSLA', targetPrice: 150.00, type: 'BELOW' },
      ]
    });

    const token = signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        riskProfile: user.riskProfile,
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Internal server error: ' + err.message }, { status: 500 });
  }
}
