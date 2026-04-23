import { motion } from 'framer-motion'
import { Mail, Building2, Smartphone, ShieldCheck, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const ConnectionList = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const connections = [
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      status: 'connected',
      provider: 'Gmail',
      lastSync: '2 hours ago'
    },
    {
      id: 'bank',
      name: 'Bank Account',
      icon: Building2,
      status: 'connected',
      provider: 'Chase',
      lastSync: '5 hours ago'
    },
    {
      id: 'phone',
      name: 'Phone Number',
      icon: Smartphone,
      status: 'connected',
      provider: '+1 (555) 123-4567',
      lastSync: '1 day ago'
    },
    {
      id: 'identity',
      name: 'Identity Verification',
      icon: ShieldCheck,
      status: 'disconnected',
      provider: 'Not verified',
      lastSync: 'Never'
    }
  ]

  const handleAction = (connectionId, action) => {
    console.log(`${action} ${connectionId}`)
  }

  return (
    <motion.div
      className="card"
      style={{ backgroundColor: theme.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold font-heading mb-6" style={{ color: theme.text }}>
        Connected Services
      </h2>

      <div className="space-y-4">
        {connections.map((connection, index) => {
          const Icon = connection.icon
          const isConnected = connection.status === 'connected'
          const StatusIcon = isConnected ? CheckCircle : XCircle

          return (
            <motion.div
              key={connection.id}
              className="flex items-center justify-between p-4 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: theme.inputBg,
                border: `1px solid ${theme.border}`
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                backgroundColor: theme.cardHover,
                scale: 1.01
              }}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: theme.primary + '20' }}
                >
                  <Icon className="w-6 h-6" style={{ color: theme.primary }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold" style={{ color: theme.text }}>
                      {connection.name}
                    </h3>
                    <StatusIcon
                      className="w-4 h-4"
                      style={{ color: isConnected ? theme.success : theme.danger }}
                    />
                  </div>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {connection.provider}
                  </p>
                  <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                    Last sync: {connection.lastSync}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => handleAction(connection.id, isConnected ? 'disconnect' : 'reconnect')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: isConnected ? theme.danger + '20' : theme.success + '20',
                  color: isConnected ? theme.danger : theme.success,
                  border: `1px solid ${isConnected ? theme.danger : theme.success}`
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <div
        className="mt-6 p-4 rounded-xl"
        style={{ backgroundColor: theme.primary + '10' }}
      >
        <p className="text-sm" style={{ color: theme.text }}>
          <strong>Security Note:</strong> Disconnecting services will stop subscription detection from that source. Your data remains encrypted and secure.
        </p>
      </div>
    </motion.div>
  )
}

export default ConnectionList