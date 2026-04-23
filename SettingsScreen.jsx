import { motion } from 'framer-motion'
import { Check, X, Crown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const PlanComparison = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const features = [
    { name: 'Subscription Tracking', free: true, pro: true },
    { name: 'Email Detection', free: true, pro: true },
    { name: 'Bank Integration', free: true, pro: true },
    { name: 'Phone Alerts', free: false, pro: true },
    { name: 'Advanced Analytics', free: false, pro: true },
    { name: 'Unlimited Subscriptions', free: false, pro: true },
    { name: 'Priority Support', free: false, pro: true },
    { name: 'Custom Categories', free: false, pro: true },
    { name: 'Export Reports', free: false, pro: true },
    { name: 'API Access', free: false, pro: true }
  ]

  return (
    <motion.div
      className="card"
      style={{ backgroundColor: theme.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold font-heading mb-6" style={{ color: theme.text }}>
        Compare Plans
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <div className="text-center">
          <div
            className="px-4 py-2 rounded-lg font-semibold"
            style={{
              backgroundColor: theme.textSecondary + '20',
              color: theme.textSecondary
            }}
          >
            Free
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: theme.text }}>$0</p>
          <p className="text-sm" style={{ color: theme.textSecondary }}>per month</p>
        </div>
        <div className="text-center">
          <div
            className="px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2"
            style={{
              backgroundColor: theme.primary + '20',
              color: theme.primary
            }}
          >
            <Crown className="w-4 h-4" />
            <span>Pro</span>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: theme.text }}>$9.99</p>
          <p className="text-sm" style={{ color: theme.textSecondary }}>per month</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="grid grid-cols-3 gap-4 p-3 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: theme.inputBg }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ backgroundColor: theme.cardHover }}
          >
            <div className="col-span-1">
              <p className="text-sm font-medium" style={{ color: theme.text }}>
                {feature.name}
              </p>
            </div>
            <div className="flex justify-center">
              {feature.free ? (
                <Check className="w-5 h-5" style={{ color: theme.success }} />
              ) : (
                <X className="w-5 h-5" style={{ color: theme.danger }} />
              )}
            </div>
            <div className="flex justify-center">
              {feature.pro ? (
                <Check className="w-5 h-5" style={{ color: theme.success }} />
              ) : (
                <X className="w-5 h-5" style={{ color: theme.danger }} />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="w-full mt-6 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
        style={{
          backgroundColor: theme.primary,
          color: '#ffffff'
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Crown className="w-5 h-5" />
        <span>Upgrade to Pro</span>
      </motion.button>
    </motion.div>
  )
}

export default PlanComparison