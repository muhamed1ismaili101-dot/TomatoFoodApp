import { useState } from "react";
import "../../components/header/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toastContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      onClose();
      showToast('success', 'Successfully signed in.')
      setLoading(false);
      e.target.reset();
    } catch (err) {
      setLoading(false);
      e.target.reset();
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-main" onSubmit={handleSubmit}>
      <h2 className="login-title">Sign Up</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

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
      <label className="checkbox-row">
          <input type="checkbox" />
          <span>
            By continuing, I agree to the terms of use & privacy policy.
          </span>
        </label>

      <button className="login-btn" type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}
