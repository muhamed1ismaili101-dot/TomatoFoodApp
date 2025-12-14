import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Modal from "../Modal";
import logo from "../../assets/frontend_assets/logo.png";
import "../../components/header/Header.css";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { useToast } from "../../context/toastContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header() {
  const { cartQuantity } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  const {showToast} = useToast();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);


  async function handleLogOut() {
    await signOut(auth);
    showToast('error', 'You are logged out!');
  }

  return (
    <div className="header" id="home">
      <div className="tomato-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <ul className="nav-menu">
        <HashLink smooth to='/#home'>Home</HashLink>
        <HashLink smooth to='/#menu'>Menu</HashLink>
        <HashLink smooth to='/#mobile-app'>Mobile App</HashLink>
        <HashLink smooth to='/#mobile-app'>Contact</HashLink>
      </ul>

      <div className="header-actions">
        <Link to="/cart" className="cart-link">
          {cartQuantity() > 0 && <span className="cart-dot">.</span>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="22"
            height="22"
            fill="#333"
          >
            {" "}
            <path d="M320 64C326.6 64 332.9 66.7 337.4 71.5L481.4 223.5L481.9 224L560 224C577.7 224 592 238.3 592 256C592 270.5 582.4 282.7 569.2 286.7L523.1 493.9C516.6 523.2 490.6 544 460.6 544L179.3 544C149.3 544 123.3 523.2 116.8 493.9L70.8 286.7C57.6 282.8 48 270.5 48 256C48 238.3 62.3 224 80 224L158.1 224L158.6 223.5L302.6 71.5C307.1 66.7 313.4 64 320 64zM320 122.9L224.2 224L415.8 224L320 122.9zM240 328C240 314.7 229.3 304 216 304C202.7 304 192 314.7 192 328L192 440C192 453.3 202.7 464 216 464C229.3 464 240 453.3 240 440L240 328zM320 304C306.7 304 296 314.7 296 328L296 440C296 453.3 306.7 464 320 464C333.3 464 344 453.3 344 440L344 328C344 314.7 333.3 304 320 304zM448 328C448 314.7 437.3 304 424 304C410.7 304 400 314.7 400 328L400 440C400 453.3 410.7 464 424 464C437.3 464 448 453.3 448 440L448 328z" />{" "}
          </svg>
        </Link>

        {!user && (
          <button
            onClick={() => {
              setAuthMode("login"); 
              setIsOpen(true);
            }}
          >
            Sign in
          </button>
        )}

        {user && (
          <div className="logged-menu">
            <Link to="/myorders" className="logged-link">
              Orders
            </Link>
            <button className="logout-btn" onClick={handleLogOut}>
              Sign Out
            </button>
          </div>
        )}

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div key={authMode}>
            {authMode === "login" ? (
              <>
                <LoginForm onClose={() => setIsOpen(false)} />

                <div className="register-text">
                  Create a new account?
                  <span
                    className="register-link"
                    onClick={() => setAuthMode("signup")}
                  >
                    Click here
                  </span>
                </div>
              </>
            ) : (
              <>
                <SignUpForm onClose={() => setIsOpen(false)} />

                <div className="register-text">
                  Already have an account? 
                  <span
                    className="register-link"
                    onClick={() => setAuthMode("login")}
                  >
                    Login
                  </span>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}
