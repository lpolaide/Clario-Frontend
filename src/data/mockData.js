export const onboardingSteps = [
  { id: 1, name: 'Welcome', path: '/welcome', completed: false },
  { id: 2, name: 'Email', path: '/connect-email', completed: false },
  { id: 3, name: 'Bank', path: '/connect-bank', completed: false },
  { id: 4, name: 'Phone', path: '/connect-phone', completed: false },
  { id: 5, name: 'Identity', path: '/connect-identity', completed: false },
  { id: 6, name: 'Permissions', path: '/permissions', completed: false },
  { id: 7, name: 'Success', path: '/success', completed: false }
]

export const emailProviders = [
  { id: 'gmail', name: 'Gmail', icon: 'Mail', color: '#EA4335' },
  { id: 'outlook', name: 'Outlook', icon: 'Mail', color: '#0078D4' },
  { id: 'yahoo', name: 'Yahoo', icon: 'Mail', color: '#6001D2' },
  { id: 'other', name: 'Other Email', icon: 'Mail', color: '#6B7280' }
]

export const bankProviders = [
  { id: 'chase', name: 'Chase', logo: 'Building2', connected: false },
  { id: 'bofa', name: 'Bank of America', logo: 'Building2', connected: false },
  { id: 'wells', name: 'Wells Fargo', logo: 'Building2', connected: false },
  { id: 'citi', name: 'Citibank', logo: 'Building2', connected: false },
  { id: 'capital', name: 'Capital One', logo: 'Building2', connected: false },
  { id: 'other', name: 'Other Bank', logo: 'Building2', connected: false }
]

export const permissions = [
  {
    id: 'transactions',
    title: 'Transaction History',
    description: 'Access your transaction history to identify subscriptions',
    icon: 'Receipt',
    required: true,
    granted: false
  },
  {
    id: 'recurring',
    title: 'Recurring Payments',
    description: 'Monitor recurring charges and subscription renewals',
    icon: 'RefreshCw',
    required: true,
    granted: false
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Receive alerts about upcoming charges and savings',
    icon: 'Bell',
    required: false,
    granted: false
  },
  {
    id: 'analytics',
    title: 'Spending Analytics',
    description: 'Generate insights about your subscription spending',
    icon: 'TrendingUp',
    required: false,
    granted: false
  }
]

export const identityVerificationMethods = [
  { id: 'ssn', name: 'Social Security Number', icon: 'ShieldCheck', secure: true },
  { id: 'license', name: 'Driver\'s License', icon: 'CreditCard', secure: true },
  { id: 'passport', name: 'Passport', icon: 'FileText', secure: true }
]

export const securityFeatures = [
  { id: 1, title: 'Bank-level Encryption', icon: 'Lock', description: '256-bit SSL encryption' },
  { id: 2, title: 'Secure Storage', icon: 'Database', description: 'Data encrypted at rest' },
  { id: 3, title: 'Privacy First', icon: 'Eye', description: 'We never sell your data' },
  { id: 4, title: 'Compliance', icon: 'ShieldCheck', description: 'SOC 2 Type II certified' }
]

export const subscriptionCategories = [
  { id: 'streaming', name: 'Streaming Services', count: 0 },
  { id: 'software', name: 'Software & Apps', count: 0 },
  { id: 'fitness', name: 'Fitness & Wellness', count: 0 },
  { id: 'news', name: 'News & Media', count: 0 },
  { id: 'gaming', name: 'Gaming', count: 0 },
  { id: 'other', name: 'Other', count: 0 }
]

export const subscriptions = [
  {
    id: 1,
    merchant: 'Netflix',
    amount: 15.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-15',
    source: 'email',
    category: 'streaming',
    status: 'active',
    logo: 'Tv'
  },
  {
    id: 2,
    merchant: 'Spotify',
    amount: 9.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-20',
    source: 'bank',
    category: 'streaming',
    status: 'active',
    logo: 'Music'
  },
  {
    id: 3,
    merchant: 'Adobe Creative Cloud',
    amount: 54.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-10',
    source: 'email',
    category: 'software',
    status: 'active',
    logo: 'Palette'
  },
  {
    id: 4,
    merchant: 'GitHub Pro',
    amount: 48,
    frequency: 'yearly',
    nextRenewal: '2024-06-15',
    source: 'bank',
    category: 'software',
    status: 'active',
    logo: 'Github'
  },
  {
    id: 5,
    merchant: 'Planet Fitness',
    amount: 22.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-05',
    source: 'bank',
    category: 'fitness',
    status: 'active',
    logo: 'Dumbbell'
  },
  {
    id: 6,
    merchant: 'New York Times',
    amount: 17,
    frequency: 'monthly',
    nextRenewal: '2024-02-25',
    source: 'email',
    category: 'news',
    status: 'active',
    logo: 'Newspaper'
  },
  {
    id: 7,
    merchant: 'Xbox Game Pass',
    amount: 14.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-18',
    source: 'bank',
    category: 'gaming',
    status: 'active',
    logo: 'Gamepad2'
  },
  {
    id: 8,
    merchant: 'Dropbox Plus',
    amount: 119.88,
    frequency: 'yearly',
    nextRenewal: '2024-08-10',
    source: 'email',
    category: 'software',
    status: 'active',
    logo: 'Cloud'
  },
  {
    id: 9,
    merchant: 'Hulu',
    amount: 7.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-12',
    source: 'email',
    category: 'streaming',
    status: 'canceled',
    logo: 'Tv'
  },
  {
    id: 10,
    merchant: 'LinkedIn Premium',
    amount: 29.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-08',
    source: 'bank',
    category: 'software',
    status: 'active',
    logo: 'Briefcase'
  },
  {
    id: 11,
    merchant: 'Audible',
    amount: 14.95,
    frequency: 'monthly',
    nextRenewal: '2024-02-22',
    source: 'email',
    category: 'other',
    status: 'active',
    logo: 'Headphones'
  },
  {
    id: 12,
    merchant: 'Apple Music',
    amount: 10.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-14',
    source: 'bank',
    category: 'streaming',
    status: 'canceled',
    logo: 'Music'
  },
  {
    id: 13,
    merchant: 'Notion',
    amount: 96,
    frequency: 'yearly',
    nextRenewal: '2024-05-20',
    source: 'email',
    category: 'software',
    status: 'active',
    logo: 'FileText'
  },
  {
    id: 14,
    merchant: 'Disney+',
    amount: 7.99,
    frequency: 'monthly',
    nextRenewal: '2024-02-16',
    source: 'email',
    category: 'streaming',
    status: 'active',
    logo: 'Tv'
  },
  {
    id: 15,
    merchant: 'Grammarly Premium',
    amount: 144,
    frequency: 'yearly',
    nextRenewal: '2024-07-01',
    source: 'bank',
    category: 'software',
    status: 'active',
    logo: 'PenTool'
  }
]

export const detectionSources = [
  { id: 'email', name: 'Email', icon: 'Mail', color: '#EA4335' },
  { id: 'bank', name: 'Bank', icon: 'Building2', color: '#0078D4' },
  { id: 'phone', name: 'Phone', icon: 'Smartphone', color: '#6001D2' },
  { id: 'identity', name: 'Identity', icon: 'ShieldCheck', color: '#2F9E44' }
]

export const sampleSubscriptionDetail = {
  id: 999,
  merchant: 'Sample Subscription',
  amount: 19.99,
  frequency: 'monthly',
  nextRenewal: '2024-03-15',
  source: 'email',
  category: 'software',
  status: 'active',
  logo: 'Zap',
  confidence: 95,
  history: [
    {
      id: 1,
      date: '2024-02-15',
      amount: 19.99,
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-15',
      amount: 19.99,
      status: 'completed'
    },
    {
      id: 3,
      date: '2023-12-15',
      amount: 19.99,
      status: 'completed'
    },
    {
      id: 4,
      date: '2023-11-15',
      amount: 19.99,
      status: 'completed'
    },
    {
      id: 5,
      date: '2023-10-15',
      amount: 19.99,
      status: 'completed'
    }
  ],
  insights: {
    potentialSavings: 47.88,
    description: 'Switch to annual billing to save 20% on your subscription costs'
  }
}

export const cancellationSteps = [
  {
    id: 1,
    icon: 'LogIn',
    instruction: 'Log in to your account on the merchant\'s website or app using your credentials.',
    tip: 'Make sure you\'re using the email address associated with your subscription.'
  },
  {
    id: 2,
    icon: 'Settings',
    instruction: 'Navigate to Account Settings or Subscription Management section.',
    tip: 'This is usually found in the profile menu or settings dropdown.'
  },
  {
    id: 3,
    icon: 'CreditCard',
    instruction: 'Locate your active subscription plan and click on \"Manage\" or \"Edit Subscription\".',
    tip: 'Some services hide this under \"Billing\" or \"Payment Methods\".'
  },
  {
    id: 4,
    icon: 'XCircle',
    instruction: 'Find and click the \"Cancel Subscription\" or \"End Membership\" button.',
    tip: 'Be prepared to answer a survey about why you\'re canceling.'
  },
  {
    id: 5,
    icon: 'AlertTriangle',
    instruction: 'Confirm the cancellation when prompted. Read any retention offers carefully.',
    tip: 'Some services offer discounts or pauses instead of cancellation.'
  },
  {
    id: 6,
    icon: 'Mail',
    instruction: 'Check your email for a cancellation confirmation. Save this email for your records.',
    tip: 'If you don\'t receive confirmation within 24 hours, contact support.'
  },
  {
    id: 7,
    icon: 'CheckCircle',
    instruction: 'Verify the cancellation by checking your account status and upcoming charges.',
    tip: 'Take a screenshot of the confirmation page as proof.'
  }
]

export const cancellationInfo = {
  estimatedTime: '5-10 min',
  difficulty: 'Medium',
  notes: 'Most subscriptions can be canceled online. If you encounter issues, contact customer support directly. Keep all confirmation emails and take screenshots of each step.',
  cancellationUrl: 'https://example.com/cancel'
}