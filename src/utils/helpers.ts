// Format date to readable string
export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID
export const generateId = (): string => {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Format currency
export const formatCurrency = (amount: number | string, currency: string = 'USD'): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(numAmount);
};

// Calculate days between dates
export const daysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

// Get status color
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'applied':
      return '#2196F3'; // Blue
    case 'interviewing':
      return '#FF9800'; // Orange
    case 'rejected':
      return '#F44336'; // Red
    case 'offered':
      return '#4CAF50'; // Green
    default:
      return '#9E9E9E'; // Gray
  }
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Parse job description HTML
export const parseJobDescription = (html: string): string => {
  // Remove HTML tags but keep line breaks
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Calculate application success rate
export const calculateSuccessRate = (applications: any[]): number => {
  if (applications.length === 0) return 0;
  
  const successful = applications.filter(app => 
    app.status === 'interviewing' || app.status === 'offered'
  ).length;
  
  return Math.round((successful / applications.length) * 100);
};

// Group applications by company
export const groupByCompany = (applications: any[]): Record<string, any[]> => {
  return applications.reduce((groups, app) => {
    const company = app.company || 'Unknown';
    if (!groups[company]) {
      groups[company] = [];
    }
    groups[company].push(app);
    return groups;
  }, {} as Record<string, any[]>);
};

// Sort jobs by date
export const sortByDate = (jobs: any[], ascending: boolean = false): any[] => {
  return [...jobs].sort((a, b) => {
    const dateA = new Date(a.created_at || a.date || 0).getTime();
    const dateB = new Date(b.created_at || b.date || 0).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};