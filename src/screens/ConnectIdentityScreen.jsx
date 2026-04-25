import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import ConnectionCard from '../components/ConnectionCard.jsx'
import { identityVerificationMethods } from '../data/mockData'
import { useForm } from 'react-hook-form'
const handleGmailLogin = async () => {
  const res = await fetch("/api/gmail/auth-url");
  const data = await res.json();
  window.location.href = data.url;
};
const ConnectIdentityScreen = () => {
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log('Identity verified:', data)
    navigate('/permissions')
  }

  const handleMethodSelect = (method) => {
    setSelectedMethod(method)
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
      ...
    </div>
  </motion.div>
</div>

          className="max-w-2xl w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 font-heading">
              Verify Your Identity
            </h1>
            <p className="text-lg text-gray-600 font-body">
              Required by law to protect your financial information
            </p>
          </div>

          {!showForm ? (
          <button onClick={handleGmailLogin} className="mb-4 p-3 bg-blue-600 text-white rounded-lg">
            Connect Gmail
          </button>
            ) : (
              <>
               {/* Method Selection */}
               <div className="space-y-4 mb-8">

              <div className="glass-card mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Why this is required:</strong> Federal regulations require us to verify your identity to prevent fraud and protect your account.
                    </p>
                  </div>
                </div>
              </div>

              {identityVerificationMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConnectionCard
                    title={method.name}
                    description="Secure verification - encrypted and protected"
                    icon={method.icon}
                    onClick={() => handleMethodSelect(method)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            /* Verification Form */
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
                Back to methods
              </button>

              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Verify with {selectedMethod?.name}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {selectedMethod?.id === 'ssn' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Social Security Number
                      </label>
                      <input
                        type="text"
                        {...register('ssn', {
                          required: 'SSN is required',
                          pattern: {
                            value: /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/,
                            message: 'Invalid SSN format'
                          }
                        })}
                        className={`input-field ${errors.ssn ? 'input-error' : ''}`}
                        placeholder="XXX-XX-XXXX"
                      />
                      {errors.ssn && (
                        <p className="text-red-500 text-sm mt-1">{errors.ssn.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        {...register('dob', { required: 'Date of birth is required' })}
                        className={`input-field ${errors.dob ? 'input-error' : ''}`}
                      />
                      {errors.dob && (
                        <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
                      )}
                    </div>
                  </>
                )}

                {selectedMethod?.id === 'license' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver's License Number
                      </label>
                      <input
                        type="text"
                        {...register('license', { required: 'License number is required' })}
                        className={`input-field ${errors.license ? 'input-error' : ''}`}
                        placeholder="Enter license number"
                      />
                      {errors.license && (
                        <p className="text-red-500 text-sm mt-1">{errors.license.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        {...register('state', { required: 'State is required' })}
                        className={`input-field ${errors.state ? 'input-error' : ''}`}
                      >
                        <option value="">Select state</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                      </select>
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                      )}
                    </div>
                  </>
                )}

                {selectedMethod?.id === 'passport' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Number
                    </label>
                    <input
                      type="text"
                      {...register('passport', { required: 'Passport number is required' })}
                      className={`input-field ${errors.passport ? 'input-error' : ''}`}
                      placeholder="Enter passport number"
                    />
                    {errors.passport && (
                      <p className="text-red-500 text-sm mt-1">{errors.passport.message}</p>
                    )}
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Secure & Encrypted:</strong> Your information is encrypted with 256-bit SSL and stored securely. We never share your personal data.
                  </p>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Verify Identity
                </button>
              </form>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/connect-phone')}
              className="btn-outline flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              onClick={() => navigate('/permissions')}
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

export default ConnectIdentityScreen
