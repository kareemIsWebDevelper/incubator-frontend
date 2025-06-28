export const isMobile = typeof window !== 'undefined' ? window.matchMedia("(max-width: 640px)").matches : false;
export const isTablet = typeof window !== 'undefined' ? window.matchMedia("(min-width: 640px) and (max-width: 1024px)").matches : false;
export const isDesktop = typeof window !== 'undefined' ? window.matchMedia("(min-width: 1024px) and (max-width: 1280px)").matches : false;