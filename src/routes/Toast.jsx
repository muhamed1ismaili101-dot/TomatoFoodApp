import { useEffect,useState } from "react";
import "./Toast.css";

export default function Toast({ type, message, duration, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((p) => Math.max(p - step, 0));
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>

      <button className="toast-close" onClick={onClose}>
        ✕
      </button>

      <div className="toast-progress">
        <div className="toast-progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
