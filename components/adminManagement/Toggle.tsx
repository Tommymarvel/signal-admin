import React from 'react';

type ToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

const Toggle: React.FC<ToggleProps> = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Toggle;
