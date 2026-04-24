import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import lightTheme from '../../styles/themes/lightTheme'
import darkTheme from '../../styles/themes/darkTheme'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  const handleClear = () => {
    setSearchQuery('')
  }

  return (
    <div className="relative w-full">
      <div
        className="relative flex items-center transition-all duration-200"
        style={{
          borderRadius: '0.75rem'
        }}
      >
        {/* Search Icon */}
        <Search
          className="absolute left-3 w-5 h-5 transition-colors duration-200"
          style={{
            color: isFocused ? theme.primary : theme.textSecondary
          }}
        />

        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search subscriptions..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: theme.inputBg,
            color: theme.text,
            border: `2px solid ${isFocused ? theme.primary : theme.border}`,
            boxShadow: isFocused ? `0 0 0 3px ${theme.primary}20` : 'none'
          }}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              onClick={handleClear}
              className="absolute right-3 w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                backgroundColor: theme.textSecondary + '20',
                color: theme.textSecondary
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{
                backgroundColor: theme.danger + '20',
                color: theme.danger
              }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Search Suggestions (Optional - can be expanded) */}
      <AnimatePresence>
        {isFocused && searchQuery && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-lg overflow-hidden z-50"
            style={{
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3">
              <p
                className="text-sm"
                style={{ color: theme.textSecondary }}
              >
                Press Enter to search for "{searchQuery}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar