import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

const TICKER_PRICES: { [key: string]: number } = {
  AAPL: 192.42,
  TSLA: 238.45,
  NVDA: 822.79,
  MSFT: 374.08,
  GOOGL: 141.22,
  AMZN: 175.35,
  AMD: 112.50,
  INTC: 44.80,
  META: 485.00,
  BTC: 64310.50,
  ETH: 3450.00,
};

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { symbol, type, quantity } = await req.json();

    if (!symbol || !type || !quantity || quantity <= 0) {
      return NextResponse.json({ error: 'Invalid trade parameters' }, { status: 400 });
    }

    const price = TICKER_PRICES[symbol.toUpperCase()];
    if (!price) {
      return NextResponse.json({ error: 'Unknown ticker symbol' }, { status: 400 });
    }

    const totalCost = price * quantity;
    const upperType = type.toUpperCase();

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (upperType === 'BUY') {
      if (dbUser.cashBalance < totalCost) {
        return NextResponse.json({ error: 'Insufficient cash balance' }, { status: 400 });
      }

      // Update or create holding
      const existing = await prisma.holding.findUnique({
        where: { userId_symbol: { userId: user.id, symbol: symbol.toUpperCase() } },
      });

      if (existing) {
        const newQty = existing.quantity + quantity;
        const newAvg = (existing.avgPrice * existing.quantity + price * quantity) / newQty;
        await prisma.holding.update({
          where: { id: existing.id },
          data: { quantity: newQty, avgPrice: newAvg },
        });
      } else {
        await prisma.holding.create({
          data: {
            userId: user.id,
            symbol: symbol.toUpperCase(),
            quantity,
            avgPrice: price,
          },
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { cashBalance: dbUser.cashBalance - totalCost },
      });

    } else if (upperType === 'SELL') {
      const existing = await prisma.holding.findUnique({
        where: { userId_symbol: { userId: user.id, symbol: symbol.toUpperCase() } },
      });

      if (!existing || existing.quantity < quantity) {
        return NextResponse.json({ error: 'Insufficient holdings to sell' }, { status: 400 });
      }

      const newQty = existing.quantity - quantity;
      if (newQty < 0.001) {
        await prisma.holding.delete({ where: { id: existing.id } });
      } else {
        await prisma.holding.update({
          where: { id: existing.id },
          data: { quantity: newQty },
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { cashBalance: dbUser.cashBalance + totalCost },
      });
    } else {
      return NextResponse.json({ error: 'Invalid trade type. Use BUY or SELL.' }, { status: 400 });
    }

    // Log transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        symbol: symbol.toUpperCase(),
        type: upperType,
        quantity,
        price,
      },
    });

    return NextResponse.json({ success: true, message: `${upperType} ${quantity} ${symbol} @ $${price.toFixed(2)}` });
  } catch (err: any) {
    console.error('Trade error:', err);
    return NextResponse.json({ error: 'Trade execution failed' }, { status: 500 });
  }
}
