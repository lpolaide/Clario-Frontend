import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Mail } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const EmailModal = ({ isOpen, onClose, merchantName }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme
  const [isCopied, setIsCopied] = useState(false)

  const emailSubject = `Request to Cancel ${merchantName} Subscription`
  const emailBody = `Dear ${merchantName} Support Team,

I am writing to request the cancellation of my subscription to ${merchantName}.

Account Details:
- Account Email: [Your email address]
- Subscription Plan: [Your plan name]
- Reason for Cancellation: [Optional: Your reason]

I would like to cancel my subscription effective immediately. Please confirm the cancellation and provide details about:
1. The effective cancellation date
2. Any final charges or refunds
3. Confirmation that no future charges will occur

Please send a confirmation email once the cancellation is processed.

Thank you for your assistance.

Best regards,
[Your Name]`

  const handleCopyEmail = () => {
    const fullEmail = `Subject: ${emailSubject}\n\n${emailBody}`
    navigator.clipboard.writeText(fullEmail)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-content"
            style={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: theme.primary + '20' }}
                >
                  <Mail className="w-6 h-6" style={{ color: theme.primary }} />
                </div>
                <h2 className="text-2xl font-bold font-heading" style={{ color: theme.text }}>
                  Cancellation Email Template
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.textSecondary
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                  Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  readOnly
                  className="input-field"
                  style={{
                    backgroundColor: theme.inputBg,
                    color: theme.text,
                    borderColor: theme.border
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
                  Email Body
                </label>
                <textarea
                  value={emailBody}
                  readOnly
                  rows={16}
                  className="input-field resize-none"
                  style={{
                    backgroundColor: theme.inputBg,
                    color: theme.text,
                    borderColor: theme.border,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            <div
              className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: theme.warning + '15' }}
            >
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.text }}>Note:</strong> Remember to fill in the bracketed placeholders [like this] with your actual information before sending.
              </p>
            </div>

            <div className="flex space-x-3">
              <motion.button
                onClick={handleCopyEmail}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{
                  backgroundColor: isCopied ? theme.success : theme.primary,
                  color: '#ffffff'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCopied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Email Template</span>
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={onClose}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  border: `2px solid ${theme.border}`
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EmailModal