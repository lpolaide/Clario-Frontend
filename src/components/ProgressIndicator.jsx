import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { onboardingSteps } from '../data/mockData'

const ProgressIndicator = () => {
  const location = useLocation()
  const currentStepIndex = onboardingSteps.findIndex(step => step.path === location.pathname)
  const progress = ((currentStepIndex + 1) / onboardingSteps.length) * 100

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-success rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {onboardingSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isUpcoming = index > currentStepIndex

            return (
              <motion.div
                key={step.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 relative
                    ${
                      isCompleted
                        ? 'bg-success text-white shadow-lg'
                        : isCurrent
                        ? 'bg-primary text-white shadow-xl scale-110'
                        : 'bg-white/30 text-gray-400 backdrop-blur-sm'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}

                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Step Name */}
                <span
                  className={`
                    mt-2 text-xs font-medium text-center
                    ${
                      isCompleted || isCurrent
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {step.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Progress Text */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Step {currentStepIndex + 1} of {onboardingSteps.length}
        </p>
      </div>
    </div>
  )
}

export default ProgressIndicator