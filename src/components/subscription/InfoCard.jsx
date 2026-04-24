import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const InfoCard = ({ title, value, icon }) => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme
  const IconComponent = Icons[icon] || Icons.Info

  return (
    <motion.div
      className="glass-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: theme.primary + '15' }}
        >
          <IconComponent className="w-5 h-5" style={{ color: theme.primary }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>
            {title}
          </p>
          <p className="text-lg font-semibold" style={{ color: theme.text }}>
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default InfoCard