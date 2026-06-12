'use client';

import { useEffect, useState, useRef } from 'react';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  time: string;
  signal?: 'BUY' | 'SELL';
}

interface CandlestickChartProps {
  data: Candle[];
}

export default function CandlestickChart({ data = [] }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width || 600);
        setHeight(entry.contentRect.height || 400);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
        No chart data available
      </div>
    );
  }

  const paddingLeft = 40;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const highs = data.map((c) => c.high);
  const lows = data.map((c) => c.low);
  const maxPrice = Math.max(...highs);
  const minPrice = Math.min(...lows);
  const priceRange = maxPrice - minPrice || 1;

  // Function to map values to coordinates
  const getX = (index: number) => {
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (price: number) => {
    return paddingTop + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  // Generate EMA 20 and SMA 50 points
  const getMA = (period: number) => {
    const maPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) continue;
      const slice = data.slice(i - period + 1, i + 1);
      const sum = slice.reduce((acc, c) => acc + c.close, 0);
      const avg = sum / period;
      maPoints.push({ x: getX(i), y: getY(avg) });
    }
    return maPoints;
  };

  const emaPoints = getMA(5); // shorter period for visual flow with fewer points
  const smaPoints = getMA(10);

  let emaPath = '';
  if (emaPoints.length > 0) {
    emaPath = `M ${emaPoints[0].x} ${emaPoints[0].y}`;
    for (let i = 1; i < emaPoints.length; i++) {
      emaPath += ` L ${emaPoints[i].x} ${emaPoints[i].y}`;
    }
  }

  let smaPath = '';
  if (smaPoints.length > 0) {
    smaPath = `M ${smaPoints[0].x} ${smaPoints[0].y}`;
    for (let i = 1; i < smaPoints.length; i++) {
      smaPath += ` L ${smaPoints[i].x} ${smaPoints[i].y}`;
    }
  }

  const candleWidth = Math.max(3, Math.min(24, (chartWidth / data.length) * 0.6));

  return (
    <div ref={containerRef} className="w-full h-full relative border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm p-4">
      {/* Grid Overlay background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <svg className="w-full h-full overflow-visible">
        {/* Horizontal Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((val, idx) => {
          const y = paddingTop + chartHeight * val;
          const price = maxPrice - (priceRange * val);
          return (
            <g key={idx}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={width - paddingRight + 5}
                y={y + 4}
                className="text-[9px] fill-slate-400 font-medium font-mono"
              >
                ${price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* EMA Line (Blue) */}
        {emaPath && (
          <path
            d={emaPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        )}

        {/* SMA Line (Gray) */}
        {smaPath && (
          <path
            d={smaPath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
        )}

        {/* Candlesticks */}
        {data.map((candle, index) => {
          const isGreen = candle.close >= candle.open;
          const x = getX(index);
          const yHigh = getY(candle.high);
          const yLow = getY(candle.low);
          const yOpen = getY(candle.open);
          const yClose = getY(candle.close);

          const candleTop = Math.min(yOpen, yClose);
          const candleBottom = Math.max(yOpen, yClose);
          const candleHeight = Math.max(1.5, candleBottom - candleTop);

          const color = isGreen ? '#10b981' : '#ef4444';

          return (
            <g key={index}>
              {/* Shadow line (High to Low wick) */}
              <line
                x1={x}
                y1={yHigh}
                x2={x}
                y2={yLow}
                stroke={color}
                strokeWidth="1.5"
              />

              {/* Real body */}
              <rect
                x={x - candleWidth / 2}
                y={candleTop}
                width={candleWidth}
                height={candleHeight}
                fill={color}
                rx="1"
              />

              {/* Signal Overlay */}
              {candle.signal === 'BUY' && (
                <g>
                  {/* Upward BUY Tag */}
                  <rect
                    x={x - 16}
                    y={yLow + 10}
                    width="32"
                    height="18"
                    rx="4"
                    fill="#10b981"
                  />
                  <text
                    x={x}
                    y={yLow + 22}
                    textAnchor="middle"
                    className="text-[9px] font-extrabold fill-white"
                  >
                    BUY
                  </text>
                </g>
              )}

              {candle.signal === 'SELL' && (
                <g>
                  {/* Downward SELL Tag */}
                  <rect
                    x={x - 16}
                    y={yHigh - 28}
                    width="32"
                    height="18"
                    rx="4"
                    fill="#f97316"
                  />
                  <text
                    x={x}
                    y={yHigh - 16}
                    textAnchor="middle"
                    className="text-[9px] font-extrabold fill-white"
                  >
                    SELL
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
