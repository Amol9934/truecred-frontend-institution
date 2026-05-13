import React, { useRef } from 'react'

export default function StatCard({ title, value, icon: Icon, color, delay = 0, trend }) {
  const cardRef = useRef(null)

  const colorMap = {
    blue: {
      icon: 'text-blue-400',
      bg: 'from-blue-500/10 to-blue-500/5',
      border: 'border-blue-500/20',
      glow: 'rgba(59,130,246,0.15)',
      iconBg: 'bg-blue-500/10',
      num: 'text-blue-100',
    },
    teal: {
      icon: 'text-emerald-400',
      bg: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20',
      glow: 'rgba(16,185,129,0.15)',
      iconBg: 'bg-emerald-500/10',
      num: 'text-emerald-100',
    },
    amber: {
      icon: 'text-amber-400',
      bg: 'from-amber-500/10 to-amber-500/5',
      border: 'border-amber-500/20',
      glow: 'rgba(245,158,11,0.15)',
      iconBg: 'bg-amber-500/10',
      num: 'text-amber-100',
    },
    red: {
      icon: 'text-red-400',
      bg: 'from-red-500/10 to-red-500/5',
      border: 'border-red-500/20',
      glow: 'rgba(239,68,68,0.15)',
      iconBg: 'bg-red-500/10',
      num: 'text-red-100',
    },
  }

  const c = colorMap[color] || colorMap.blue

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
    card.style.boxShadow = `${rotateY * 2}px ${rotateX * -2}px 30px ${c.glow}, 0 8px 32px rgba(0,0,0,0.4)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)'
    card.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative rounded-2xl p-5 cursor-default
        bg-gradient-to-br ${c.bg}
        border ${c.border}
        transition-transform duration-200
        fade-up-delay-${delay}
      `}
      style={{
        background: 'linear-gradient(135deg, #0D1B2A 0%, #112236 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        animationDelay: `${delay * 0.1}s`,
      }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 rounded-2xl shimmer-line pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${c.iconBg}`}>
          <Icon size={20} className={c.icon} strokeWidth={1.8} />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trend > 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>

      {/* Value */}
      <p className={`text-3xl font-bold ${c.num} leading-none mb-2 font-display`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>

      {/* Title */}
      <p className="text-sm text-slate-400 font-medium leading-tight">{title}</p>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-6 right-6 h-px opacity-30`}
        style={{ background: `linear-gradient(90deg, transparent, ${c.glow.replace('0.15', '1')}, transparent)` }}
      />
    </div>
  )
}