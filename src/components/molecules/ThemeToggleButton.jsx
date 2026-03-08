import { useState, useEffect } from 'react'
import Icon from '../icons/Icon'

/**
 * ThemeToggleButton Component
 *
 * Simple icon button that toggles between light and dark mode
 * Sets data-theme attribute on document root and persists to localStorage
 */
export default function ThemeToggleButton({ className = '' }) {
  const [isDark, setIsDark] = useState(false)

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialIsDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setIsDark(initialIsDark)

    if (initialIsDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`kol-btn kol-btn-control ${className}`}
      style={{
        width: '48px',
        height: '48px',
        padding: '12px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Icon
        name={isDark ? 'moon' : 'sun'}
        size={24}
      />
    </button>
  )
}
