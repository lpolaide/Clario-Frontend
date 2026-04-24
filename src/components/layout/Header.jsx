import { Sparkles } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import SearchBar from '../dashboard/SearchBar.jsx'
import { useTheme } from '../../context/ThemeContext'
import lightTheme from '../../styles/themes/lightTheme'
import darkTheme from '../../styles/themes/darkTheme'

const Header = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  return (
    <header
      className="sticky top-0 z-30 transition-colors duration-300"
      style={{
        backgroundColor: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: `0 1px 3px ${theme.shadow}`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span
              className="text-xl font-bold font-heading"
              style={{ color: theme.text }}
            >
              SubFinder
            </span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* User Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: theme.primary,
                color: '#ffffff'
              }}
            >
              JD
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default Header