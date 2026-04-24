import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Sparkles, TrendingUp, DollarSign, Calendar } from 'lucide-react'

const SuccessScreen = () => {
  const navigate = useNavigate()

  const stats = [
    { icon: DollarSign, label: 'Potential Savings', value: '$247/mo', color: 'text-success' },
    { icon: Calendar, label: 'Subscriptions Found', value: '12', color: 'text-primary' },
    { icon: TrendingUp, label: 'Monthly Spending', value: '$89', color: 'text-warning' }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Animation */}
        <motion.div
          className="inline-block mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="relative">
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center shadow-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-success rounded-full"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4 font-heading">
            You're All Set!
          </h1>
          <p className="text-xl text-gray-600 font-body mb-12">
            We're analyzing your subscriptions and finding savings opportunities
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="glass-card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`inline-block p-3 bg-white/50 rounded-xl mb-3 ${stat.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Next Steps */}
        <motion.div
          className="glass-card text-left mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                What Happens Next?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                  <span>We'll scan your accounts for recurring subscriptions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a detailed report of all subscriptions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                  <span>Get personalized recommendations to save money</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                  <span>Receive alerts before upcoming charges</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <button
            onClick={() => navigate('/welcome')}
            className="btn-primary text-lg px-12 py-4 shadow-2xl"
          >
            Go to Dashboard
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Your subscription analysis will be ready in a few minutes
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SuccessScreen