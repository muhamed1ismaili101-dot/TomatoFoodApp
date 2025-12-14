import apple from "../../assets/frontend_assets/app_store.png";
import android from "../../assets/frontend_assets/play_store.png";
import "../../components/mobile-app/MobileSection.css";

export default function MobileSection() {
  return (
    <div className="mobile-main" id="mobile-app">
      <div className="mobile">
        <h1>
          For Better Experience Download <br></br>Tomato App
        </h1>
        <img src={apple} alt="apple" />
        <img src={android} alt="apple" />
      </div>
    </div>
  );
}
