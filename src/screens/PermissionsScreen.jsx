import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, CheckCircle, Circle } from 'lucide-react'
import * as Icons from 'lucide-react'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import { permissions } from '../data/mockData'

const PermissionsScreen = () => {
  const navigate = useNavigate()
  const [grantedPermissions, setGrantedPermissions] = useState([])

  const togglePermission = (permissionId) => {
    setGrantedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const handleContinue = () => {
    const requiredPermissions = permissions.filter(p => p.required)
    const allRequiredGranted = requiredPermissions.every(p =>
      grantedPermissions.includes(p.id)
    )

    if (allRequiredGranted) {
      navigate('/success')
    }
  }

  const requiredPermissions = permissions.filter(p => p.required)
  const allRequiredGranted = requiredPermissions.every(p =>
    grantedPermissions.includes(p.id)
  )

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
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 font-heading">
              Grant Permissions
            </h1>
            <p className="text-lg text-gray-600 font-body">
              Choose what data we can access to help you save
            </p>
          </div>

          {/* Permissions List */}
          <div className="space-y-4 mb-8">
            {permissions.map((permission, index) => {
              const Icon = Icons[permission.icon] || Icons.Circle
              const isGranted = grantedPermissions.includes(permission.id)

              return (
                <motion.button
                  key={permission.id}
                  onClick={() => togglePermission(permission.id)}
                  className={`
                    w-full p-6 rounded-2xl text-left transition-all duration-300
                    backdrop-blur-md border shadow-lg
                    ${
                      isGranted
                        ? 'bg-success/10 border-success/30 shadow-success/20'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div
                        className={`
                          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                          ${
                            isGranted
                              ? 'bg-success text-white'
                              : 'bg-primary/10 text-primary'
                          }
                        `}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {permission.title}
                          </h3>
                          {permission.required && (
                            <span className="badge badge-error text-xs">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {permission.description}
                        </p>
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="ml-4">
                      {isGranted ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Info Notice */}
          <motion.div
            className="glass-card mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-700">
              <strong>Your Privacy Matters:</strong> You can change these permissions anytime in your account settings. We only use this data to help you manage subscriptions and save money.
            </p>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={handleContinue}
              disabled={!allRequiredGranted}
              className={`
                btn-primary w-full mb-4
                ${
                  !allRequiredGranted
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
              `}
            >
              Continue to Dashboard
            </button>
            {!allRequiredGranted && (
              <p className="text-sm text-center text-red-600">
                Please grant all required permissions to continue
              </p>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('/connect-identity')}
              className="btn-outline flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PermissionsScreen