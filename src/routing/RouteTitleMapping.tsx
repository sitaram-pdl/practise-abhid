

import { useLocation } from "react-router-dom";

// Route to title mapping (can be moved to a separate config file if needed)
const RouteTitles: Record<string, string> = {
  '/products': 'Products',
  '/cart': 'Shopping Cart',
  '/user': 'User Profile',
  // Add more routes as needed..
};
  const location = useLocation();

  // Get title from route state or predefined mapping
  const getPageTitle = () => {
    // First check for state title (passed during navigation)
    if (location.state?.title) return location.state.title;
    // Then check predefined route mapping
    if (RouteTitles[location.pathname]) return RouteTitles[location.pathname];
    // Default fallback
    return 'Dashboard'; 
  };
