import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, TrendingUp, DollarSign, Calendar, AlertCircle } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import { useSubscriptions } from '../hooks/useSubscriptions'
import { useTheme } from '../context/ThemeContext'
import lightTheme from '../styles/themes/lightTheme'
import darkTheme from '../styles/themes/darkTheme'
import * as Icons from 'lucide-react'

const DashboardScreen = () => {
  const { subscriptions, getTotalMonthly, getTotalYearly, getNextRenewal } = useSubscriptions()
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [frequencyFilter, setFrequencyFilter] = useState('all')

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.merchant.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
    const matchesFrequency = frequencyFilter === 'all' || sub.frequency === frequencyFilter
    return matchesSearch && matchesStatus && matchesFrequency
  })

  const monthlyTotal = getTotalMonthly()
  const yearlyTotal = getTotalYearly()
  const nextRenewal = getNextRenewal()
  const activeCount = subscriptions.filter(s => s.status === 'active').length
  const canceledSavings = subscriptions
    .filter(s => s.status === 'canceled')
    .reduce((sum, s) => sum + (s.frequency === 'monthly' ? s.amount : s.amount / 12), 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-heading" style={{ color: theme.text }}>
            Your Subscriptions
          </h1>
          <p className="text-gray-600 mt-1">Manage and track all your recurring payments</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            className="card-hover"
            style={{ backgroundColor: theme.card }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Monthly Total</p>
                <p className="text-2xl font-bold" style={{ color: theme.text }}>
                  ${monthlyTotal.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.primary + '20' }}>
                <DollarSign className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card-hover"
            style={{ backgroundColor: theme.card }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Annual Total</p>
                <p className="text-2xl font-bold" style={{ color: theme.text }}>
                  ${yearlyTotal.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.success + '20' }}>
                <TrendingUp className="w-6 h-6" style={{ color: theme.success }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card-hover"
            style={{ backgroundColor: theme.card }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Active Subscriptions</p>
                <p className="text-2xl font-bold" style={{ color: theme.text }}>
                  {activeCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.primary + '20' }}>
                <Calendar className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card-hover"
            style={{ backgroundColor: theme.card }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Next Renewal</p>
                <p className="text-lg font-bold" style={{ color: theme.text }}>
                  {nextRenewal ? new Date(nextRenewal.nextRenewal).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.warning + '20' }}>
                <AlertCircle className="w-6 h-6" style={{ color: theme.warning }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights Panel */}
        {canceledSavings > 0 && (
          <motion.div
            className="card"
            style={{ backgroundColor: theme.success + '15', borderColor: theme.success }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.success }}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
                  Great Job! You're Saving Money
                </h3>
                <p style={{ color: theme.textSecondary }}>
                  By canceling unused subscriptions, you're saving <strong>${canceledSavings.toFixed(2)}/month</strong> (${(canceledSavings * 12).toFixed(2)}/year)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme.textSecondary }} />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full"
              style={{ backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
              style={{ backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="canceled">Canceled</option>
            </select>
            <select
              value={frequencyFilter}
              onChange={(e) => setFrequencyFilter(e.target.value)}
              className="input-field"
              style={{ backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }}
            >
              <option value="all">All Frequencies</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubscriptions.map((subscription, index) => {
            const Icon = Icons[subscription.logo] || Icons.Circle
            return (
              <motion.div
                key={subscription.id}
                className="card-hover"
                style={{ backgroundColor: theme.card }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.primary + '20' }}>
                      <Icon className="w-6 h-6" style={{ color: theme.primary }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: theme.text }}>
                        {subscription.merchant}
                      </h3>
                      <p className="text-sm" style={{ color: theme.textSecondary }}>
                        {subscription.category}
                      </p>
                    </div>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: subscription.status === 'active' ? theme.success + '20' : theme.danger + '20',
                      color: subscription.status === 'active' ? theme.success : theme.danger
                    }}
                  >
                    {subscription.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: theme.textSecondary }}>Amount</span>
                    <span className="font-semibold" style={{ color: theme.text }}>
                      ${subscription.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.textSecondary }}>Frequency</span>
                    <span className="font-semibold" style={{ color: theme.text }}>
                      {subscription.frequency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.textSecondary }}>Next Renewal</span>
                    <span className="font-semibold" style={{ color: theme.text }}>
                      {new Date(subscription.nextRenewal).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.textSecondary }}>Source</span>
                    <span className="font-semibold" style={{ color: theme.text }}>
                      {subscription.source}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl" style={{ color: theme.textSecondary }}>
              No subscriptions found
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default DashboardScreen