export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // Mock implementation for tracking events (e.g., GA4 or custom backend)
  if (typeof window !== 'undefined') {
    // In a real app, this would be: window.gtag('event', eventName, params);
  }
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

export const trackSearch = (query: string) => {
  trackEvent('search', {
    search_term: query,
  });
};

export const trackCTA = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
};
