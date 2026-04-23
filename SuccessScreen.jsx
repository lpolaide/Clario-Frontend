import { motion } from 'framer-motion'
import { CreditCard, Calendar, Lock } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const PaymentMethod = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const paymentInfo = {
    cardNumber: '•••• •••• •••• 4242',
    expiryDate: '12/25',
    cardType: 'Visa',
    cardHolder: 'John Doe'
  }

  return (
    <motion.div
      className="card"
      style={{ backgroundColor: theme.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold font-heading mb-6" style={{ color: theme.text }}>
        Payment Method
      </h2>

      <div
        className="p-6 rounded-xl mb-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          color: '#ffffff'
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <CreditCard className="w-full h-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm font-medium opacity-80">Credit Card</div>
            <div className="text-lg font-bold">{paymentInfo.cardType}</div>
          </div>

          <div className="mb-6">
            <div className="text-2xl font-mono tracking-wider mb-2">
              {paymentInfo.cardNumber}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-70 mb-1">Card Holder</div>
              <div className="text-sm font-medium">{paymentInfo.cardHolder}</div>
            </div>
            <div>
              <div className="text-xs opacity-70 mb-1">Expires</div>
              <div className="text-sm font-medium flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{paymentInfo.expiryDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
        style={{
          backgroundColor: theme.inputBg,
          color: theme.text,
          border: `2px solid ${theme.border}`
        }}
        whileHover={{
          backgroundColor: theme.cardHover,
          borderColor: theme.primary,
          scale: 1.02
        }}
        whileTap={{ scale: 0.98 }}
      >
        <CreditCard className="w-5 h-5" />
        <span>Update Payment Method</span>
      </motion.button>

      <div
        className="mt-6 p-4 rounded-lg flex items-start space-x-3"
        style={{ backgroundColor: theme.success + '15' }}
      >
        <Lock className="w-5 h-5 flex-shrink-0" style={{ color: theme.success }} />
        <div>
          <p className="text-sm font-medium" style={{ color: theme.text }}>Secure Payment</p>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
            Your payment information is encrypted and stored securely. We never share your financial data.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentMethod