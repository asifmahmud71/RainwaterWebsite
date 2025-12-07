import { AlertCircle, X } from 'lucide-react';

function ErrorAlert({ message, onClose }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
      <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-800">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-red-600 hover:text-red-800">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;