import React from 'react';
import { XCircle } from 'lucide-react';

const Unauthorised = () => {
  return (
    <div className="mt-10 bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <XCircle className="h-20 w-20 text-red-500" />
        </div>
        
        {/* Main content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-lg text-gray-600">
            Sorry, you don't have permission to access this page.
          </p>
        </div>
        
        {/* Action buttons */}
        {/* <div className="space-y-3">
          <button 
            onClick={() => window.history.back()} 
            className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
          
          <button 
            onClick={() => window.location.href = '/'} 
            className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Return Home
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Unauthorised;