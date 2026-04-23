import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import * as Icons from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import InfoCard from '../components/subscription/InfoCard.jsx'
import ActionButtons from '../components/subscription/ActionButtons.jsx'
import HistoryList from '../components/subscription/HistoryList.jsx'
import InsightCard from '../components/subscription/InsightCard.jsx'
import ConfidenceIndicator from '../components/subscription/ConfidenceIndicator.jsx'
import { useSubscriptions } from '../hooks/useSubscriptions.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import lightTheme from '../styles/themes/lightTheme.js'
import darkTheme from '../styles/themes/darkTheme.js'
import { sampleSubscriptionDetail } from '../data/mockData.js'

const SubscriptionDetailScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { subscriptions } = useSubscriptions()
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const subscription = subscriptions.find(sub => sub.id === parseInt(id)) || sampleSubscriptionDetail
  const Icon = Icons[subscription.logo] || Icons.Circle

  const detailSections = [
    { title: 'Amount', value: `$${subscription.amount}`, icon: 'DollarSign' },
    { title: 'Frequency', value: subscription.frequency, icon: 'Calendar' },
    { title: 'Next Renewal', value: new Date(subscription.nextRenewal).toLocaleDateString(), icon: 'Clock' },
    { title: 'Category', value: subscription.category, icon: 'Tag' },
    { title: 'Source', value: subscription.source, icon: 'Database' },
    { title: 'Status', value: subscription.status, icon: 'Activity' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 transition-colors duration-200"
          style={{ color: theme.textSecondary }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
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
                    {subscription.merchant}
                  </h1>
                  <p className="text-lg" style={{ color: theme.textSecondary }}>
                    {subscription.category}
                  </p>
                </div>
              </div>
              <span
                className="badge text-sm px-4 py-2"
                style={{
                  backgroundColor: subscription.status === 'active' ? theme.success + '20' : theme.danger + '20',
                  color: subscription.status === 'active' ? theme.success : theme.danger
                }}
              >
                {subscription.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {detailSections.map((section, index) => (
                <InfoCard
                  key={index}
                  title={section.title}
                  value={section.value}
                  icon={section.icon}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-6" style={{ borderTop: `1px solid ${theme.border}` }}>
              <div>
                <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>Detection Confidence</p>
                <ConfidenceIndicator confidence={subscription.confidence || 95} />
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" style={{ color: theme.textSecondary }} />
                <span className="text-sm" style={{ color: theme.textSecondary }}>Detected via {subscription.source}</span>
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
                  Quick Actions
                </h2>
                <ActionButtons subscriptionId={subscription.id} />
              </div>

              <div
                className="card"
                style={{ backgroundColor: theme.card }}
              >
                <h2 className="text-xl font-semibold font-heading mb-4" style={{ color: theme.text }}>
                  Transaction History
                </h2>
                <HistoryList history={subscription.history || []} />
              </div>
            </div>

            <div className="space-y-6">
              <InsightCard
                title="Potential Savings"
                amount={subscription.insights?.potentialSavings || 0}
                description={subscription.insights?.description || 'No savings opportunities identified'}
              />

              <div
                className="card"
                style={{ backgroundColor: theme.card }}
              >
                <h3 className="text-lg font-semibold font-heading mb-3" style={{ color: theme.text }}>
                  Annual Cost
                </h3>
                <p className="text-3xl font-bold" style={{ color: theme.primary }}>
                  ${subscription.frequency === 'monthly' ? (subscription.amount * 12).toFixed(2) : subscription.amount.toFixed(2)}
                </p>
                <p className="text-sm mt-2" style={{ color: theme.textSecondary }}>
                  {subscription.frequency === 'monthly' ? 'Based on monthly billing' : 'Yearly subscription'}
                </p>
              </div>

              <div
                className="card"
                style={{ backgroundColor: theme.warning + '15', borderColor: theme.warning }}
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.warning }} />
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.text }}>Renewal Notice</h4>
                    <p className="text-sm" style={{ color: theme.textSecondary }}>
                      Your next charge of ${subscription.amount} will occur on {new Date(subscription.nextRenewal).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

export default SubscriptionDetailScreen