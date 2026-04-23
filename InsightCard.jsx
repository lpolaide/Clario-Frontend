import { createContext, useContext, useState, useEffect } from 'react'
import { subscriptions as initialSubscriptions } from '../data/mockData'

const SubscriptionsContext = createContext()

export const useSubscriptions = () => {
  const context = useContext(SubscriptionsContext)
  if (!context) {
    throw new Error('useSubscriptions must be used within SubscriptionsProvider')
  }
  return context
}

export const SubscriptionsProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subscriptions')
    return saved ? JSON.parse(saved) : initialSubscriptions
  })

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
  }, [subscriptions])

  const addSubscription = (subscription) => {
    const newSubscription = {
      ...subscription,
      id: Date.now(),
      status: 'active'
    }
    setSubscriptions(prev => [...prev, newSubscription])
  }

  const removeSubscription = (id) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id))
  }

  const updateSubscription = (id, updates) => {
    setSubscriptions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, ...updates } : sub))
    )
  }

  const cancelSubscription = (id) => {
    updateSubscription(id, { status: 'canceled' })
  }

  const reactivateSubscription = (id) => {
    updateSubscription(id, { status: 'active' })
  }

  const getSubscriptionsByCategory = (category) => {
    return subscriptions.filter(sub => sub.category === category)
  }

  const getSubscriptionsByStatus = (status) => {
    return subscriptions.filter(sub => sub.status === status)
  }

  const getSubscriptionsByFrequency = (frequency) => {
    return subscriptions.filter(sub => sub.frequency === frequency)
  }

  const getTotalMonthly = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => {
        if (sub.frequency === 'monthly') {
          return total + sub.amount
        } else if (sub.frequency === 'yearly') {
          return total + (sub.amount / 12)
        }
        return total
      }, 0)
  }

  const getTotalYearly = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => {
        if (sub.frequency === 'monthly') {
          return total + (sub.amount * 12)
        } else if (sub.frequency === 'yearly') {
          return total + sub.amount
        }
        return total
      }, 0)
  }

  const getNextRenewal = () => {
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active')
    if (activeSubscriptions.length === 0) return null

    return activeSubscriptions.reduce((nearest, sub) => {
      const subDate = new Date(sub.nextRenewal)
      const nearestDate = new Date(nearest.nextRenewal)
      return subDate < nearestDate ? sub : nearest
    })
  }

  const searchSubscriptions = (query) => {
    const lowerQuery = query.toLowerCase()
    return subscriptions.filter(sub =>
      sub.merchant.toLowerCase().includes(lowerQuery) ||
      sub.category.toLowerCase().includes(lowerQuery)
    )
  }

  const value = {
    subscriptions,
    addSubscription,
    removeSubscription,
    updateSubscription,
    cancelSubscription,
    reactivateSubscription,
    getSubscriptionsByCategory,
    getSubscriptionsByStatus,
    getSubscriptionsByFrequency,
    getTotalMonthly,
    getTotalYearly,
    getNextRenewal,
    searchSubscriptions
  }

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  )
}

export default SubscriptionsContext