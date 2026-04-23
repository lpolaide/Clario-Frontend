import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, CreditCard, TrendingUp, Settings, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import lightTheme from '../../styles/themes/lightTheme'
import darkTheme from '../../styles/themes/darkTheme'

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, path: '/dashboard' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
    if (onClose) onClose()
  }

  return (
    <motion.div
      className="h-screen sticky top-0 transition-colors duration-300"
      style={{
        backgroundColor: theme.sidebarBg,
        borderRight: `1px solid ${theme.border}`
      }}
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: theme.border }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span
                className="text-xl font-bold font-heading"
                style={{ color: theme.text }}
              >
                SubFinder
              </span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.textSecondary
                }}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: isActive ? theme.primary + '15' : 'transparent',
                  color: isActive ? theme.primary : theme.textSecondary
                }}
                whileHover={{
                  backgroundColor: isActive ? theme.primary + '20' : theme.inputBg,
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t" style={{ borderColor: theme.border }}>
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: theme.primary + '10' }}
          >
            <p className="text-sm font-medium" style={{ color: theme.text }}>
              Need Help?
            </p>
            <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
              Contact support for assistance
            </p>
            <button
              className="mt-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: theme.primary,
                color: '#ffffff'
              }}
            >
              Get Support
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar