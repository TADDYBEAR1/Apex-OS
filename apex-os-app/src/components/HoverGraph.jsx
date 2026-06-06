import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

// Generates a smooth cubic bezier path for an array of [x, y] coordinates
const smoothLinePath = (points) => {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0][0]},${points[0][1]}`;

  const bezierCommand = (point, i, a) => {
    const cps = (p1, p2, p3, t = 0.2) => {
      const d01 = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
      const d12 = Math.sqrt(Math.pow(p3[0] - p2[0], 2) + Math.pow(p3[1] - p2[1], 2));
      const fa = t * d01 / (d01 + d12) || 0;
      const fb = t * d12 / (d01 + d12) || 0;
      return [
        [p2[0] - fa * (p3[0] - p1[0]), p2[1] - fa * (p3[1] - p1[1])],
        [p2[0] + fb * (p3[0] - p1[0]), p2[1] + fb * (p3[1] - p1[1])]
      ];
    };

    const [cpsX, cpsY] = cps(a[i - 1] || a[i], a[i], a[i + 1] || a[i]);
    const [cpeX, cpeY] = cps(a[i] || a[i + 1], a[i + 1], a[i + 2] || a[i + 1]);
    return `C ${cpsY[0]},${cpsY[1]} ${cpeX[0]},${cpeX[1]} ${a[i + 1][0]},${a[i + 1][1]}`;
  };

  return points.reduce((acc, point, i, a) => {
    return i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${bezierCommand(point, i - 1, a)}`;
  }, '');
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function HoverGraph({ data, unit, isPositive }) {
  const containerRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [animateStroke, setAnimateStroke] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStroke(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length < 2) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--font-display)' }}>
        Record more entries to see your trend graph
      </div>
    );
  }

  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
  }

  const values = data.map(d => Number(d.value));
  let minVal = Math.min(...values);
  let maxVal = Math.max(...values);
  
  if (minVal === maxVal) {
    minVal -= 5;
    maxVal += 5;
  }
  
  const range = (maxVal - minVal);

  const { width, height } = dimensions;
  
  // Axes layout padding
  const paddingLeft = 45; // Space for Y labels
  const paddingBottom = 24; // Space for X labels
  const paddingTop = 12;
  const paddingRight = 12;

  const usableW = width - paddingLeft - paddingRight;
  const usableH = height - paddingTop - paddingBottom;

  const points = values.map((val, i) => {
    const x = paddingLeft + (i / (values.length - 1)) * usableW;
    const y = paddingTop + usableH - ((val - minVal) / range) * usableH;
    return [x, y];
  });

  const linePath = smoothLinePath(points);
  // Close the area path down to the X-axis baseline
  const graphBottom = paddingTop + usableH;
  const areaPath = `${linePath} L ${points[points.length - 1][0]},${graphBottom} L ${points[0][0]},${graphBottom} Z`;

  const color = isPositive ? 'var(--cyan)' : 'var(--orange)';

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    
    // Find closest point within usable area bounds
    if (x < paddingLeft || x > width - paddingRight) {
      setHoverIndex(null);
      return;
    }

    let closestIdx = 0;
    let minDistance = Infinity;
    points.forEach((pt, i) => {
      const dist = Math.abs(pt[0] - x);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    });
    setHoverIndex(closestIdx);
  };

  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;
  const activeData = hoverIndex !== null ? data[hoverIndex] : null;

  // Grid lines (3 horizontal lines)
  const gridLines = [
    { y: paddingTop, value: maxVal },
    { y: paddingTop + usableH / 2, value: (maxVal + minVal) / 2 },
    { y: paddingTop + usableH, value: minVal }
  ];

  // Format value based on unit
  const formatY = (val) => {
    if (unit === 'TIME') {
      const m = Math.floor(val / 60);
      const s = Math.round(val % 60);
      return m > 0 ? `${m}m` : `${s}s`;
    }
    return Math.round(val);
  };

  const formatHoverValue = (val) => {
    if (unit === 'TIME') {
      const m = Math.floor(val / 60);
      const s = Math.round(val % 60);
      return m > 0 ? `${m}m ${s}s` : `${s}s`;
    }
    return val;
  };

  return (
    <div 
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative', cursor: 'crosshair', overflow: 'visible', touchAction: 'none' }}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setHoverIndex(null)}
      onTouchMove={handlePointerMove}
      onTouchEnd={() => setHoverIndex(null)}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`grad-pro`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Grid Lines & Y Axis Labels */}
        {gridLines.map((line, i) => (
          <g key={`grid-${i}`}>
            <text 
              x={paddingLeft - 8} 
              y={line.y + 3} 
              fill="var(--muted)" 
              fontSize="9" 
              fontFamily="var(--font-display)" 
              textAnchor="end"
              fontWeight="600"
            >
              {formatY(line.value)}
            </text>
            <line 
              x1={paddingLeft} 
              y1={line.y} 
              x2={width - paddingRight} 
              y2={line.y} 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="1" 
              strokeDasharray="4 4" 
            />
          </g>
        ))}

        {/* X Axis Date Labels (First, Mid, Last if enough space, else just First/Last) */}
        {points.map((pt, i) => {
          // Only show certain labels to avoid clutter
          const isFirst = i === 0;
          const isLast = i === points.length - 1;
          const isMid = i === Math.floor(points.length / 2) && points.length > 3;
          if (!isFirst && !isLast && !isMid) return null;

          return (
            <text 
              key={`xlabel-${i}`}
              x={pt[0]} 
              y={height - 4} 
              fill="var(--muted)" 
              fontSize="9" 
              fontFamily="var(--font-display)" 
              textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
              fontWeight="500"
            >
              {formatDate(data[i].date)}
            </text>
          );
        })}

        {/* Area Fill */}
        <path 
          d={areaPath} 
          fill="url(#grad-pro)" 
          style={{ 
            opacity: animateStroke ? 1 : 0, 
            transition: 'opacity 1s ease', 
            transitionDelay: '0.2s' 
          }} 
        />
        
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: animateStroke ? 0 : 2000,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Hover Laser Line */}
        {activePoint && (
          <line 
            x1={activePoint[0]} 
            y1={paddingTop} 
            x2={activePoint[0]} 
            y2={graphBottom} 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1" 
          />
        )}

        {/* Static dots */}
        {points.map((pt, pi) => (
          <circle
            key={pi}
            cx={pt[0]}
            cy={pt[1]}
            r={pi === points.length - 1 ? 5 : 3}
            fill={pi === points.length - 1 ? color : 'var(--surface)'}
            stroke={color}
            strokeWidth="2"
            style={{ 
              opacity: hoverIndex === pi ? 0 : (animateStroke ? 1 : 0),
              transition: 'opacity 0.3s ease' 
            }}
          />
        ))}

        {/* Hover Active Dot */}
        {activePoint && (
          <circle
            cx={activePoint[0]}
            cy={activePoint[1]}
            r={6}
            fill="#fff"
            stroke={color}
            strokeWidth="3"
            filter="url(#glow)"
          />
        )}
      </svg>

      {/* Floating Tooltip */}
      {activePoint && activeData && (
        <div style={{
          position: 'absolute',
          left: `${activePoint[0]}px`,
          top: `${activePoint[1] - 40}px`,
          background: 'rgba(20,20,25,0.95)',
          border: `1px solid ${color}`,
          backdropFilter: 'blur(10px)',
          padding: '6px 10px',
          borderRadius: '6px',
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          fontWeight: 700,
          pointerEvents: 'none',
          boxShadow: `0 4px 15px ${color.replace(')', ', 0.3)').replace('var(--', 'rgba(')}`,
          zIndex: 50,
          transform: (activePoint[0] / width) > 0.8 ? 'translateX(-110%)' : 'translateX(10%)'
        }}>
          <span style={{ color }}>{formatHoverValue(activeData.value)}</span> {unit !== 'TIME' && <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 500 }}>{unit.toLowerCase()}</span>}
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 400, marginTop: '2px' }}>{formatDate(activeData.date)}</div>
        </div>
      )}
    </div>
  );
}
