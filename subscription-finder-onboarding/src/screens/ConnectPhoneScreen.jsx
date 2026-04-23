import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Smartphone, ArrowLeft, MessageSquare } from 'lucide-react'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import { useForm } from 'react-hook-form'

const ConnectPhoneScreen = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('phone') // 'phone' or 'verify'
  const [phoneNumber, setPhoneNumber] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onPhoneSubmit = (data) => {
    setPhoneNumber(data.phone)
    setStep('verify')
  }

  const onVerifySubmit = (data) => {
    console.log('Phone verified:', data.code)
    navigate('/connect-identity')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="max-w-xl w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
              <Smartphone className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 font-heading">
              {step === 'phone' ? 'Verify Your Phone' : 'Enter Verification Code'}
            </h1>
            <p className="text-lg text-gray-600 font-body">
              {step === 'phone'
                ? 'We\'ll send you a code to verify your number'
                : `We sent a code to ${phoneNumber}`}
            </p>
          </div>

          {step === 'phone' ? (
            /* Phone Number Form */
            <motion.div
              className="glass-card mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit(onPhoneSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    className={`input-field ${errors.phone ? 'input-error' : ''}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Why we need this:</strong> We'll send alerts about upcoming charges and potential savings opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Verification Code
                </button>
              </form>
            </motion.div>
          ) : (
            /* Verification Code Form */
            <motion.div
              className="glass-card mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit(onVerifySubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    {...register('code', {
                      required: 'Verification code is required',
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: 'Code must be 6 digits'
                      }
                    })}
                    className={`input-field text-center text-2xl tracking-widest ${errors.code ? 'input-error' : ''}`}
                    placeholder="000000"
                    maxLength={6}
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-sm text-primary hover:underline"
                >
                  Didn't receive a code? Resend
                </button>

                <button type="submit" className="btn-primary w-full">
                  Verify Phone Number
                </button>
              </form>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => step === 'phone' ? navigate('/connect-bank') : setStep('phone')}
              className="btn-outline flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              onClick={() => navigate('/connect-identity')}
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

export default ConnectPhoneScreen