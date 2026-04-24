import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Building2, ArrowLeft, Shield, Lock, Eye } from 'lucide-react'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import ConnectionCard from '../components/ConnectionCard.jsx'
import { bankProviders, securityFeatures } from '../data/mockData'

const ConnectBankScreen = () => {
  const navigate = useNavigate()
  const [selectedBank, setSelectedBank] = useState(null)

  const handleBankConnect = (bank) => {
    setSelectedBank(bank)
    setTimeout(() => {
      navigate('/connect-phone')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="max-w-3xl w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
              <Building2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 font-heading">
              Connect Your Bank
            </h1>
            <p className="text-lg text-gray-600 font-body mb-6">
              Securely link your bank to find all subscriptions
            </p>

            {/* Security Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {securityFeatures.map((feature, index) => {
                const Icon = eval(feature.icon)
                return (
                  <motion.div
                    key={feature.id}
                    className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-gray-700">
                      {feature.title}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Bank Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {bankProviders.map((bank, index) => (
              <motion.div
                key={bank.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ConnectionCard
                  title={bank.name}
                  description="Powered by Plaid - Bank-level security"
                  icon={bank.logo}
                  onClick={() => handleBankConnect(bank)}
                  connected={selectedBank?.id === bank.id}
                />
              </motion.div>
            ))}
          </div>

          {/* Security Notice */}
          <motion.div
            className="glass-card mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Your Security is Our Priority
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <Lock className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                    <span>We use 256-bit encryption, the same security banks use</span>
                  </li>
                  <li className="flex items-start">
                    <Eye className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                    <span>We never see or store your banking credentials</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                    <span>Read-only access - we can't move money or make changes</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/connect-email')}
              className="btn-outline flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              onClick={() => navigate('/connect-phone')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ConnectBankScreen