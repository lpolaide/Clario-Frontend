import { motion } from 'framer-motion'
import { MessageSquare, XCircle, BarChart3, CheckCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const ActionButtons = ({ subscriptionId }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const actions = [
    {
      id: 'explain',
      label: 'Explain Charge',
      icon: MessageSquare,
      color: theme.primary,
      onClick: () => console.log('Explain charge for:', subscriptionId)
    },
    {
      id: 'cancel',
      label: 'Cancellation Steps',
      icon: XCircle,
      color: theme.danger,
      onClick: () => console.log('Show cancellation steps for:', subscriptionId)
    },
    {
      id: 'compare',
      label: 'Compare Plans',
      icon: BarChart3,
      color: theme.warning,
      onClick: () => console.log('Compare plans for:', subscriptionId)
    },
    {
      id: 'mark',
      label: 'Mark as Canceled',
      icon: CheckCircle,
      color: theme.success,
      onClick: () => console.log('Mark as canceled:', subscriptionId)
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <motion.button
            key={action.id}
            onClick={action.onClick}
            className="flex items-center space-x-3 p-4 rounded-xl transition-all duration-200"
            style={{
              backgroundColor: theme.inputBg,
              border: `2px solid ${theme.border}`
            }}
            whileHover={{
              scale: 1.03,
              backgroundColor: action.color + '10',
              borderColor: action.color
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: action.color + '20' }}
            >
              <Icon className="w-5 h-5" style={{ color: action.color }} />
            </div>
            <span className="font-medium" style={{ color: theme.text }}>
              {action.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

export default ActionButtons