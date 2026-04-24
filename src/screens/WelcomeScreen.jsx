import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Shield, TrendingUp, Zap } from 'lucide-react'
import ProgressIndicator from '../components/ProgressIndicator.jsx'

const WelcomeScreen = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Sparkles,
      title: 'Find Hidden Subscriptions',
      description: 'Discover subscriptions you forgot about'
    },
    {
      icon: TrendingUp,
      title: 'Track Spending',
      description: 'Monitor your monthly subscription costs'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: Zap,
      title: 'Cancel Anytime',
      description: 'Manage and cancel subscriptions easily'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold text-gray-800 mb-4 font-heading">
              Welcome to SubFinder
            </h1>
            <p className="text-xl text-gray-600 font-body">
              Take control of your subscriptions in minutes
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="glass-card hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => navigate('/connect-email')}
              className="btn-primary text-lg px-12 py-4 shadow-2xl"
            >
              Get Started
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Setup takes less than 5 minutes
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomeScreen