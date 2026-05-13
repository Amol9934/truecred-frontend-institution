import React from 'react'

const variants = {
  primary: `
    bg-accent text-white border border-accent/30
    hover:bg-blue-500 hover:border-blue-400
    shadow-lg shadow-accent/20 hover:shadow-accent/40
    hover:-translate-y-0.5
  `,
  secondary: `
    bg-white/5 text-slate-300 border border-white/10
    hover:bg-white/10 hover:text-white hover:border-white/20
    hover:-translate-y-0.5
  `,
  success: `
    bg-success/90 text-white border border-success/30
    hover:bg-emerald-500 hover:border-emerald-400
    shadow-lg shadow-success/20 hover:shadow-success/40
    hover:-translate-y-0.5
  `,
  danger: `
    bg-danger/90 text-white border border-danger/30
    hover:bg-red-500 hover:border-red-400
    hover:-translate-y-0.5
  `,
  outline: `
    bg-transparent text-accent border border-accent/40
    hover:bg-accent/10 hover:border-accent
    hover:-translate-y-0.5
  `,
  ghost: `
    bg-transparent text-slate-400 border border-transparent
    hover:bg-white/5 hover:text-white
  `,
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-sm rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={14} strokeWidth={2} />
      ) : null}
      {children}
    </button>
  )
}