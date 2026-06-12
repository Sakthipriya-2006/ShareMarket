'use client';

import { useEffect, useState, useRef } from 'react';

interface StockChartProps {
  data: number[];
  color?: string;
  showGrid?: boolean;
}

export default function StockChart({ data = [], color = '#2563eb', showGrid = true }: StockChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(240);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width || 400);
        setHeight(entry.contentRect.height || 240);
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

  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  // Map data points to SVG coordinates
  const points = data.map((val, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((val - min) / range) * chartHeight;
    return { x, y };
  });

  // Generate SVG Path using quadratic curves or line segments
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }
  }

  // Generate area path for fill gradient
  const areaD = pathD
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : '';

  // Generate grid values
  const gridLines = [];
  if (showGrid) {
    for (let i = 0; i <= 4; i++) {
      gridLines.push(padding + (chartHeight * i) / 4);
    }
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {showGrid &&
          gridLines.map((y, index) => (
            <line
              key={index}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}

        {/* Gradient Fill under the line */}
        {areaD && <path d={areaD} fill="url(#chartGradient)" />}

        {/* The Line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Dots on points (optional, let's keep it clean with just the last dot) */}
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="4"
            fill={color}
            stroke="#ffffff"
            strokeWidth="2"
          />
        )}
      </svg>
    </div>
  );
}
