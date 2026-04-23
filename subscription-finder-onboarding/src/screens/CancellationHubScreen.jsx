import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import * as Icons from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import StepCard from '../components/cancellation/StepCard.jsx'
import EmailModal from '../components/cancellation/EmailModal.jsx'
import ActionButtons from '../components/cancellation/ActionButtons.jsx'
import { useSubscriptions } from '../hooks/useSubscriptions.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import lightTheme from '../styles/themes/lightTheme.js'
import darkTheme from '../styles/themes/darkTheme.js'
import { cancellationSteps, cancellationInfo } from '../data/mockData.js'

const CancellationHubScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { subscriptions, cancelSubscription } = useSubscriptions()
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [copiedStep, setCopiedStep] = useState(null)

  const subscription = subscriptions.find(sub => sub.id === parseInt(id))
  
  if (!subscription) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: theme.textSecondary }}>
            Subscription not found
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary mt-4"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    )
  }

  const Icon = Icons[subscription.logo] || Icons.Circle

  const handleCopyStep = (stepId, instruction) => {
    navigator.clipboard.writeText(instruction)
    setCopiedStep(stepId)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const handleMarkCanceled = () => {
    cancelSubscription(subscription.id)
    navigate('/dashboard')
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return theme.success
      case 'Medium': return theme.warning
      case 'Hard': return theme.danger
      default: return theme.textSecondary
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <button
          onClick={() => navigate(`/subscription/${id}`)}
          className="flex items-center space-x-2 transition-colors duration-200"
          style={{ color: theme.textSecondary }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Subscription Details</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="card-hover mb-6"
            style={{ backgroundColor: theme.card }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: theme.primary + '20' }}
                >
                  <Icon className="w-8 h-8" style={{ color: theme.primary }} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold font-heading" style={{ color: theme.text }}>
                    Cancel {subscription.merchant}
                  </h1>
                  <p className="text-lg" style={{ color: theme.textSecondary }}>
                    AI-Generated Cancellation Guide
                  </p>
                </div>
              </div>
              <span
                className="badge text-sm px-4 py-2"
                style={{
                  backgroundColor: subscription.status === 'active' ? theme.warning + '20' : theme.success + '20',
                  color: subscription.status === 'active' ? theme.warning : theme.success
                }}
              >
                {subscription.status === 'active' ? 'Active' : 'Canceled'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: theme.inputBg }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5" style={{ color: theme.primary }} />
                  <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Estimated Time
                  </span>
                </div>
                <p className="text-xl font-bold" style={{ color: theme.text }}>
                  {cancellationInfo.estimatedTime}
                </p>
              </div>

              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: theme.inputBg }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5" style={{ color: getDifficultyColor(cancellationInfo.difficulty) }} />
                  <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Difficulty
                  </span>
                </div>
                <p className="text-xl font-bold" style={{ color: getDifficultyColor(cancellationInfo.difficulty) }}>
                  {cancellationInfo.difficulty}
                </p>
              </div>

              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: theme.inputBg }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5" style={{ color: theme.success }} />
                  <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Success Rate
                  </span>
                </div>
                <p className="text-xl font-bold" style={{ color: theme.success }}>
                  95%
                </p>
              </div>
            </div>

            <div
              className="p-4 rounded-xl flex items-start space-x-3"
              style={{ backgroundColor: theme.primary + '10', borderColor: theme.primary }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.primary }} />
              <div>
                <h4 className="font-semibold mb-1" style={{ color: theme.text }}>Important Notes</h4>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {cancellationInfo.notes}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div
                className="card"
                style={{ backgroundColor: theme.card }}
              >
                <h2 className="text-xl font-semibold font-heading mb-4" style={{ color: theme.text }}>
                  Cancellation Steps
                </h2>
                <div className="space-y-4">
                  {cancellationSteps.map((step, index) => (
                    <StepCard
                      key={step.id}
                      step={step}
                      index={index}
                      isCopied={copiedStep === step.id}
                      onCopy={() => handleCopyStep(step.id, step.instruction)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ActionButtons
                cancellationUrl={cancellationInfo.cancellationUrl}
                onGenerateEmail={() => setShowEmailModal(true)}
                onMarkCanceled={handleMarkCanceled}
                isActive={subscription.status === 'active'}
              />

              <div
                className="card"
                style={{ backgroundColor: theme.success + '15', borderColor: theme.success }}
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.success }} />
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.text }}>Pro Tip</h4>
                    <p className="text-sm" style={{ color: theme.textSecondary }}>
                      Take screenshots of each step and confirmation emails as proof of cancellation. This can help if you're charged after canceling.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="card"
                style={{ backgroundColor: theme.card }}
              >
                <h3 className="text-lg font-semibold font-heading mb-3" style={{ color: theme.text }}>
                  Potential Savings
                </h3>
                <p className="text-3xl font-bold" style={{ color: theme.success }}>
                  ${subscription.frequency === 'monthly' ? (subscription.amount * 12).toFixed(2) : subscription.amount.toFixed(2)}
                </p>
                <p className="text-sm mt-2" style={{ color: theme.textSecondary }}>
                  Annual savings after cancellation
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          merchantName={subscription.merchant}
        />
      </div>
    </DashboardLayout>
  )
}

export default CancellationHubScreen