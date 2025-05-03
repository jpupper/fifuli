// Configuration file to automatically detect environment
const config = {
  // Detect if we're running on the server or locally
  getSocketConfig: function() {
    // Check if we're running on localhost
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';
    
    if (isLocal) {
      // Local configuration
      return {
        url: 'http://localhost:3002',
        options: {
          path: '/fifuli/socket.io'  // Same path as server configuration
        }
      };
    } else {
      // VPS server configuration
      return {
        url: 'https://vps-4455523-x.dattaweb.com',
        options: {
          path: '/fifuli/socket.io'
        }
      };
    }
  }
};
