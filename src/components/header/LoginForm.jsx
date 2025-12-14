import { useState } from "react";
import "../../components/header/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toastContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
export default function LoginForm({ onClose }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { showToast} = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('success', 'Successfully logged in.')
      navigate("/");
      onClose();
      e.target.reset();
      setLoading(false);
    } catch (err) {
      e.target.reset();
      setLoading(false);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError("Login failed. Try again.");
      }
    }
  }

  return (
    <>
      <form className="login-main" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Your email"
          required
        />

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Your password"
          required
        />

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
}
