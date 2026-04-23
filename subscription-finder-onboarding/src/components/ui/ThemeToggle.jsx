import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import lightTheme from '../../styles/themes/lightTheme'
import darkTheme from '../../styles/themes/darkTheme'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full flex items-center transition-colors duration-300"
      style={{
        backgroundColor: isDark ? theme.primary : theme.inputBg,
        border: `2px solid ${theme.border}`
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <motion.div
        className="absolute w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
        style={{
          backgroundColor: '#ffffff'
        }}
        animate={{
          x: isDark ? 22 : 2
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-primary" />
        ) : (
          <Sun className="w-4 h-4 text-warning" />
        )}
      </motion.div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun
          className="w-4 h-4 transition-opacity duration-300"
          style={{
            color: isDark ? theme.textSecondary : theme.warning,
            opacity: isDark ? 0.3 : 1
          }}
        />
        <Moon
          className="w-4 h-4 transition-opacity duration-300"
          style={{
            color: isDark ? '#ffffff' : theme.textSecondary,
            opacity: isDark ? 1 : 0.3
          }}
        />
      </div>
    </motion.button>
  )
}

export default ThemeToggle