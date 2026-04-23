import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const ConfidenceIndicator = ({ confidence }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const getConfidenceColor = (value) => {
    if (value >= 80) return theme.success
    if (value >= 50) return theme.warning
    return theme.danger
  }

  const getConfidenceLabel = (value) => {
    if (value >= 80) return 'High Confidence'
    if (value >= 50) return 'Medium Confidence'
    return 'Low Confidence'
  }

  const color = getConfidenceColor(confidence)
  const label = getConfidenceLabel(confidence)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: theme.text }}>
          {label}
        </span>
        <span className="text-sm font-bold" style={{ color }}>
          {confidence}%
        </span>
      </div>

      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: theme.inputBg }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <p className="text-xs mt-2" style={{ color: theme.textSecondary }}>
        Based on transaction patterns and detection algorithms
      </p>
    </div>
  )
}

export default ConfidenceIndicator