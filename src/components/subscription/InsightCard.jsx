import { motion } from 'framer-motion'
import { TrendingUp, Lightbulb } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const InsightCard = ({ title, amount, description }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  return (
    <motion.div
      className="card relative overflow-hidden"
      style={{
        backgroundColor: theme.success + '15',
        borderColor: theme.success
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <TrendingUp className="w-full h-full" style={{ color: theme.success }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: theme.success }}
          >
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold font-heading" style={{ color: theme.text }}>
            {title}
          </h3>
        </div>

        <p className="text-4xl font-bold mb-2" style={{ color: theme.success }}>
          ${amount.toFixed(2)}
        </p>

        <p className="text-sm" style={{ color: theme.textSecondary }}>
          {description}
        </p>

        <motion.button
          className="mt-4 w-full py-2 px-4 rounded-lg font-medium transition-all duration-200"
          style={{
            backgroundColor: theme.success,
            color: '#ffffff'
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          View Savings Tips
        </motion.button>
      </div>
    </motion.div>
  )
}

export default InsightCard