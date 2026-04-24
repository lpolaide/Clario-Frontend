import { motion } from 'framer-motion'
import { Crown, ArrowRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const BillingCard = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme
  const currentPlan = 'free'

  const plans = {
    free: {
      name: 'Free Plan',
      description: 'Basic subscription tracking with limited features',
      badge: 'Free',
      badgeColor: theme.textSecondary
    },
    pro: {
      name: 'Pro Plan',
      description: 'Advanced features with unlimited subscriptions',
      badge: 'Pro',
      badgeColor: theme.primary
    }
  }

  const plan = plans[currentPlan]

  return (
    <motion.div
      className="card relative overflow-hidden"
      style={{ backgroundColor: theme.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Crown className="w-full h-full" style={{ color: theme.primary }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold font-heading" style={{ color: theme.text }}>
                Current Plan
              </h2>
              <span
                className="badge text-xs px-3 py-1 font-semibold"
                style={{
                  backgroundColor: plan.badgeColor + '20',
                  color: plan.badgeColor
                }}
              >
                {plan.badge}
              </span>
            </div>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              {plan.description}
            </p>
          </div>
        </div>

        {currentPlan === 'free' && (
          <motion.button
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            style={{
              backgroundColor: theme.primary,
              color: '#ffffff'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Crown className="w-5 h-5" />
            <span>Upgrade to Pro</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}

        {currentPlan === 'pro' && (
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.success + '15' }}
          >
            <p className="text-sm font-medium" style={{ color: theme.success }}>
              ✓ You're on the Pro plan with all premium features unlocked
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6" style={{ borderTop: `1px solid ${theme.border}` }}>
          <div>
            <p className="text-sm" style={{ color: theme.textSecondary }}>Subscriptions</p>
            <p className="text-2xl font-bold" style={{ color: theme.text }}>
              {currentPlan === 'free' ? '5/10' : 'Unlimited'}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: theme.textSecondary }}>Storage</p>
            <p className="text-2xl font-bold" style={{ color: theme.text }}>
              {currentPlan === 'free' ? '1 GB' : '50 GB'}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: theme.textSecondary }}>Support</p>
            <p className="text-2xl font-bold" style={{ color: theme.text }}>
              {currentPlan === 'free' ? 'Email' : '24/7'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BillingCard