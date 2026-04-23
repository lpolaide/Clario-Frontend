import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

const ConnectionCard = ({ title, description, icon, onClick, connected = false, disabled = false }) => {
  const IconComponent = Icons[icon] || Icons.Circle

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-6 rounded-2xl text-left transition-all duration-300
        backdrop-blur-md border shadow-lg
        ${
          connected
            ? 'bg-success/10 border-success/30 shadow-success/20'
            : disabled
            ? 'bg-gray-100/50 border-gray-200 cursor-not-allowed opacity-60'
            : 'bg-white/10 border-white/20 hover:bg-white/20 hover:shadow-xl hover:scale-105'
        }
      `}
      whileHover={!disabled && !connected ? { y: -4 } : {}}
      whileTap={!disabled && !connected ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Icon */}
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              ${
                connected
                  ? 'bg-success text-white'
                  : 'bg-primary/10 text-primary'
              }
            `}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600">
              {description}
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="ml-4">
          {connected ? (
            <div className="flex items-center space-x-2">
              <Icons.CheckCircle className="w-6 h-6 text-success" />
              <span className="text-sm font-medium text-success">Connected</span>
            </div>
          ) : (
            <Icons.ChevronRight className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>
    </motion.button>
  )
}

export default ConnectionCard