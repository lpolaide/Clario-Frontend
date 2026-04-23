import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Save } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import lightTheme from '../../styles/themes/lightTheme.js'
import darkTheme from '../../styles/themes/darkTheme.js'

const ProfileCard = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com'
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      console.log('Profile saved:', profile)
    }, 1000)
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <motion.div
      className="card"
      style={{ backgroundColor: theme.card }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold font-heading mb-6" style={{ color: theme.text }}>
        Profile Information
      </h2>

      <div className="flex items-center space-x-6 mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
          style={{
            backgroundColor: theme.primary,
            color: '#ffffff'
          }}
        >
          {getInitials(profile.name)}
        </div>
        <div className="flex-1">
          <p className="text-sm" style={{ color: theme.textSecondary }}>Profile Picture</p>
          <button
            className="text-sm font-medium mt-1 transition-colors duration-200"
            style={{ color: theme.primary }}
          >
            Change Photo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Full Name</span>
            </div>
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="input-field"
            style={{
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: theme.border
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </div>
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="input-field"
            style={{
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: theme.border
            }}
          />
        </div>

        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
          style={{
            backgroundColor: theme.primary,
            color: '#ffffff',
            opacity: isSaving ? 0.7 : 1
          }}
          whileHover={{ scale: isSaving ? 1 : 1.02 }}
          whileTap={{ scale: isSaving ? 1 : 0.98 }}
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProfileCard