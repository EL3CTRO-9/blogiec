// src/components/SecretTrigger.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SecretTrigger() {
  const navigate = useNavigate();

  // Click trigger
  const [clicks, setClicks] = useState(0);

  // Key sequence trigger
  const secretKeys = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
  const [keyIndex, setKeyIndex] = useState(0);

  // Click handler (optional)
  const handleClick = () => {
    setClicks(c => c + 1);
    if (clicks + 1 >= 5) {
      navigate('/h4x90p-secret-doorway-29'); // Secret route
    }
  };

  // Key sequence handler
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === secretKeys[keyIndex]) {
        setKeyIndex(i => i + 1);
        if (keyIndex + 1 === secretKeys.length) {
          navigate('/h4x90p-secret-doorway-29');
          setKeyIndex(0); // reset after success
        }
      } else {
        setKeyIndex(0); // reset if wrong key
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [keyIndex, navigate, secretKeys]); // ✅ include secretKeys to satisfy ESLint

  return (
    <div>
      {/* Hidden click trigger */}
      <h1 onClick={handleClick} style={{ display: 'none' }}>Secret</h1>
    </div>
  );
}
