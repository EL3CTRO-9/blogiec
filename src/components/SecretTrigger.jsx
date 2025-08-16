// SecretTrigger.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SecretTrigger() {
  const navigate = useNavigate();

  // Option 1: click pattern trigger
  const [clicks, setClicks] = useState(0);

  // Option 2: key sequence trigger (optional)
  const secretKeys = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown'];
  const [keyIndex, setKeyIndex] = useState(0);

  const handleClick = () => {
    setClicks(c => c + 1);
    if (clicks + 1 >= 5) { // after 5 clicks, go to secret
      navigate('/h4x90p-secret-doorway-29');
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === secretKeys[keyIndex]) {
        setKeyIndex(i => i + 1);
        if (keyIndex + 1 === secretKeys.length) {
          navigate('/h4x90p-secret-doorway-29');
        }
      } else {
        setKeyIndex(0);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [keyIndex, navigate]);

  return (
    <div>
      {/* Hidden clickable element */}
      <h1 onClick={handleClick} style={{ display: 'none' }}>Secret</h1>
    </div>
  );
}
