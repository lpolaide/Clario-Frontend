import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, CreditCard } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import ProfileCard from '../components/settings/ProfileCard.jsx'
import ConnectionList from '../components/settings/ConnectionList.jsx'
import NotificationToggles from '../components/settings/NotificationToggles.jsx'
import BillingCard from '../components/settings/BillingCard.jsx'
import PlanComparison from '../components/settings/PlanComparison.jsx'
import PaymentMethod from '../components/settings/PaymentMethod.jsx'
import BillingHistory from '../components/settings/BillingHistory.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import lightTheme from '../styles/themes/lightTheme.js'
import darkTheme from '../styles/themes/darkTheme.js'

const SettingsScreen = () => {
  const [activeTab, setActiveTab] = useState('account')
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const tabs = [
    { id: 'account', label: 'Account Settings', icon: Settings },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading" style={{ color: theme.text }}>
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and billing</p>
        </div>

        <div className="flex space-x-2 border-b" style={{ borderColor: theme.border }}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 relative"
                style={{
                  color: isActive ? theme.primary : theme.textSecondary
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: theme.primary }}
                    layoutId="activeTab"
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {activeTab === 'account' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ProfileCard />
                <NotificationToggles />
              </div>
              <div>
                <ConnectionList />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'billing' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <BillingCard />
                <PlanComparison />
                <BillingHistory />
              </div>
              <div>
                <PaymentMethod />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default SettingsScreen