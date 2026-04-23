import { motion } from 'framer-motion'
import { Bell, TrendingUp, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const NotificationToggles = () => {
  const { isDark, toggleTheme } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const notifications = [
    {
      id: 'renewals',
      label: 'Renewal Alerts',
      description: 'Get notified before subscription renewals',
      icon: Bell,
      enabled: true,
      action: () => console.log('Toggle renewals')
    },
    {
      id: 'spending',
      label: 'Spending Alerts',
      description: 'Receive alerts when spending exceeds limits',
      icon: TrendingUp,
      enabled: true,
      action: () => console.log('Toggle spending')
    },
    {
      id: 'darkMode',
      label: 'Dark Mode',
      description: 'Switch between light and dark theme',
      icon: Moon,
      enabled: isDark,
      action: toggleTheme
    }
  ]

  const Toggle = ({ enabled, onToggle }) => (
    <motion.button
      onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-colors duration-300"
      style={{
        backgroundColor: enabled ? theme.primary : theme.border
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        animate={{
          x: enabled ? 26 : 2
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      />
    </motion.button>
  )

  return (
    <motion.div
      className="card"
      style={{ backgroundColor: theme.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold font-heading mb-6" style={{ color: theme.text }}>
        Notifications & Preferences
      </h2>

      <div className="space-y-4">
        {notifications.map((notification, index) => {
          const Icon = notification.icon
          return (
            <motion.div
              key={notification.id}
              className="flex items-center justify-between p-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: theme.inputBg,
                border: `1px solid ${theme.border}`
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: theme.cardHover }}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: theme.primary + '20' }}
                >
                  <Icon className="w-5 h-5" style={{ color: theme.primary }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold" style={{ color: theme.text }}>
                    {notification.label}
                  </h3>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {notification.description}
                  </p>
                </div>
              </div>
              <Toggle enabled={notification.enabled} onToggle={notification.action} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default NotificationToggles