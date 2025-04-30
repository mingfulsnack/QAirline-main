import { useEffect } from "react";
import Aos from "aos";
import "./HeroSection.scss";

const HeroSection = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h3>Welcome!</h3>
        <h1>Discover Your Next Adventure</h1>
        <p>
          The person travelling alone can begin today, but the person travelling
          with another person has to wait until they are ready.
        </p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
