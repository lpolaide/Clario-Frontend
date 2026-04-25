import GmailCallback from "./screens/GmailCallback.jsx";
import { useTheme } from './context/ThemeContext'
import lightTheme from './styles/themes/lightTheme'
import darkTheme from './styles/themes/darkTheme'
import { Routes, Route, Navigate } from 'react-router-dom'
import WelcomeScreen from './screens/WelcomeScreen.jsx'
import ConnectEmailScreen from './screens/ConnectEmailScreen.jsx'
import ConnectBankScreen from './screens/ConnectBankScreen.jsx'
import ConnectPhoneScreen from './screens/ConnectPhoneScreen.jsx'
import ConnectIdentityScreen from './screens/ConnectIdentityScreen.jsx'
import PermissionsScreen from './screens/PermissionsScreen.jsx'
import SuccessScreen from './screens/SuccessScreen.jsx'
import DashboardScreen from './screens/DashboardScreen.jsx'
import SubscriptionDetailScreen from './screens/SubscriptionDetailScreen.jsx'
import SettingsScreen from './screens/SettingsScreen.jsx'

const App = () => {
  const { isDark } = useTheme()
  const theme = isDark ? darkTheme : lightTheme

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d, #1e3a5f)'
          : 'linear-gradient(to bottom right, #EFF6FF, #E0E7FF, #DDD6FE)'
      }}
    >
      <Routes>
        <Route path="/gmail/callback" element={<GmailCallback />} />
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/connect-email" element={<ConnectEmailScreen />} />
        <Route path="/connect-bank" element={<ConnectBankScreen />} />
        <Route path="/connect-phone" element={<ConnectPhoneScreen />} />
        <Route path="/connect-identity" element={<ConnectIdentityScreen />} />
        <Route path="/permissions" element={<PermissionsScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/subscription/:id" element={<SubscriptionDetailScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </div>
  )
}

export default App
