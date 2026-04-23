import { motion } from 'framer-motion'
import { Calendar, DollarSign, Download } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const BillingHistory = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const transactions = [
    {
      id: 1,
      date: '2024-02-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 9.99,
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 9.99,
      status: 'completed'
    },
    {
      id: 3,
      date: '2023-12-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 9.99,
      status: 'completed'
    },
    {
      id: 4,
      date: '2023-11-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 9.99,
      status: 'completed'
    },
    {
      id: 5,
      date: '2023-10-01',
      description: 'Pro Plan - Monthly Subscription',
      amount: 9.99,
      status: 'completed'
    }
  ]

  const handleDownload = (transactionId) => {
    console.log('Download invoice:', transactionId)
  }

  return (
    <motion.div
      className="card"
      style={{ backgroundColor: theme.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold font-heading" style={{ color: theme.text }}>
          Billing History
        </h2>
        <button
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: theme.primary }}
        >
          View All
        </button>
      </div>

      {transactions.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: theme.inputBg,
                border: `1px solid ${theme.border}`
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: theme.cardHover }}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: theme.primary + '20' }}
                >
                  <DollarSign className="w-5 h-5" style={{ color: theme.primary }} />
                </div>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: theme.text }}>
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 text-sm" style={{ color: theme.textSecondary }}>
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(transaction.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold" style={{ color: theme.text }}>
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <span
                    className="badge text-xs px-2 py-1"
                    style={{
                      backgroundColor: transaction.status === 'completed' ? theme.success + '20' : theme.warning + '20',
                      color: transaction.status === 'completed' ? theme.success : theme.warning
                    }}
                  >
                    {transaction.status}
                  </span>
                </div>

                <motion.button
                  onClick={() => handleDownload(transaction.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: theme.inputBg,
                    color: theme.textSecondary
                  }}
                  whileHover={{
                    backgroundColor: theme.primary + '20',
                    color: theme.primary,
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: theme.inputBg }}
          >
            <Calendar className="w-8 h-8" style={{ color: theme.textSecondary }} />
          </div>
          <p className="text-lg font-medium" style={{ color: theme.text }}>No billing history</p>
          <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            Your transaction history will appear here
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default BillingHistory