import { motion } from 'framer-motion'
import { Calendar, DollarSign } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const HistoryList = ({ history }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ color: theme.textSecondary }}>No transaction history available</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {history.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-xl transition-colors duration-200"
          style={{
            backgroundColor: theme.inputBg,
            border: `1px solid ${theme.border}`
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ backgroundColor: theme.cardHover }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.primary + '15' }}
            >
              <DollarSign className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div>
              <p className="font-medium" style={{ color: theme.text }}>
                ${transaction.amount.toFixed(2)}
              </p>
              <div className="flex items-center space-x-2 text-sm" style={{ color: theme.textSecondary }}>
                <Calendar className="w-4 h-4" />
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <span
            className="badge text-xs px-3 py-1"
            style={{
              backgroundColor: transaction.status === 'completed' ? theme.success + '20' : theme.warning + '20',
              color: transaction.status === 'completed' ? theme.success : theme.warning
            }}
          >
            {transaction.status}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default HistoryList