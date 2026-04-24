import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import ConnectionCard from '../components/ConnectionCard.jsx'
import { emailProviders } from '../data/mockData'
import { useForm } from 'react-hook-form'

const ConnectEmailScreen = () => {
  const navigate = useNavigate()
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log('Email connected:', data)
    navigate('/connect-bank')
  }

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
              <Mail className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 font-heading">
              Connect Your Email
            </h1>
            <p className="text-lg text-gray-600 font-body">
              We'll scan your inbox for subscription receipts
            </p>
          </div>

          {!showForm ? (
            /* Provider Selection */
            <div className="space-y-4 mb-8">
              {emailProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConnectionCard
                    title={provider.name}
                    description="Connect securely with OAuth 2.0"
                    icon={provider.icon}
                    onClick={() => handleProviderSelect(provider)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            /* Email Form */
            <motion.div
              className="glass-card mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to providers
              </button>

              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Connect {selectedProvider?.name}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    className={`input-field ${errors.password ? 'input-error' : ''}`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Secure Connection:</strong> Your credentials are encrypted and never stored. We use OAuth 2.0 for secure authentication.
                  </p>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Connect Email
                </button>
              </form>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/welcome')}
              className="btn-outline flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              onClick={() => navigate('/connect-bank')}
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

export default ConnectEmailScreen