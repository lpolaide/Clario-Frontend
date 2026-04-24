import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const StepCard = ({ step, index, isCopied, onCopy }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme
  const StepIcon = Icons[step.icon] || Icons.Circle

  return (
    <motion.div
      className="relative p-5 rounded-xl transition-all duration-200"
      style={{
        backgroundColor: theme.inputBg,
        border: `1px solid ${theme.border}`
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ backgroundColor: theme.cardHover, scale: 1.01 }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: theme.primary + '20' }}
          >
            <StepIcon className="w-6 h-6" style={{ color: theme.primary }} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
              Step {index + 1}
            </h3>
            <motion.button
              onClick={onCopy}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isCopied ? theme.success + '20' : theme.primary + '10',
                color: isCopied ? theme.success : theme.primary,
                border: `1px solid ${isCopied ? theme.success : theme.primary}`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Step</span>
                </>
              )}
            </motion.button>
          </div>

          <p className="text-base mb-3" style={{ color: theme.text }}>
            {step.instruction}
          </p>

          {step.tip && (
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: theme.primary + '10' }}
            >
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.primary }}>Tip:</strong> {step.tip}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default StepCard