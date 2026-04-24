import { motion } from 'framer-motion'
import { ExternalLink, Mail, CheckCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const ActionButtons = ({ cancellationUrl, onGenerateEmail, onMarkCanceled, isActive }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const actions = [
    {
      id: 'open-link',
      label: 'Open Cancellation Link',
      icon: ExternalLink,
      color: theme.primary,
      onClick: () => window.open(cancellationUrl, '_blank'),
      disabled: !cancellationUrl
    },
    {
      id: 'generate-email',
      label: 'Generate Cancellation Email',
      icon: Mail,
      color: theme.warning,
      onClick: onGenerateEmail,
      disabled: false
    },
    {
      id: 'mark-canceled',
      label: 'Mark as Canceled',
      icon: CheckCircle,
      color: theme.success,
      onClick: onMarkCanceled,
      disabled: !isActive
    }
  ]

  return (
    <div
      className="card"
      style={{ backgroundColor: theme.card }}
    >
      <h2 className="text-xl font-semibold font-heading mb-4" style={{ color: theme.text }}>
        Quick Actions
      </h2>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.id}
              onClick={action.onClick}
              disabled={action.disabled}
              className="w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: action.disabled ? theme.inputBg + '80' : theme.inputBg,
                border: `2px solid ${action.disabled ? theme.border : action.color + '40'}`,
                opacity: action.disabled ? 0.5 : 1,
                cursor: action.disabled ? 'not-allowed' : 'pointer'
              }}
              whileHover={!action.disabled ? {
                scale: 1.03,
                backgroundColor: action.color + '10',
                borderColor: action.color
              } : {}}
              whileTap={!action.disabled ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: action.disabled ? 0.5 : 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: action.color + '20' }}
              >
                <Icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <span className="font-medium flex-1 text-left" style={{ color: theme.text }}>
                {action.label}
              </span>
              {action.id === 'open-link' && !action.disabled && (
                <ExternalLink className="w-4 h-4" style={{ color: theme.textSecondary }} />
              )}
            </motion.button>
          )
        })}
      </div>

      {!isActive && (
        <div
          className="mt-4 p-3 rounded-lg"
          style={{ backgroundColor: theme.success + '15' }}
        >
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            <strong style={{ color: theme.success }}>✓</strong> This subscription is already marked as canceled.
          </p>
        </div>
      )}
    </div>
  )
}

export default ActionButtons