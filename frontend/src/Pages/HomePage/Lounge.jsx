import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Lounge = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="lounge container section">
      <div className="sectionContainer grid">
        <div data-aos="fade-left" data-aos-duration="2500" className="imgDiv">
          <img src="/assets/lounge.jpg" alt="" />
        </div>

        <div className="textDiv">
          <h2 data-aos="fade-right" data-aos-duration="2500">
            Unaccompanied Minor Lounge
          </h2>
        </div>

        <div className="grids grid">
          <div className="singleGrid">
            <span className="gridTitle">Help throungh the airport</span>
            <p>
              You can also call airplanes from your phone and book a flight
              ticket to one of your favourite destinations.
            </p>
          </div>
        </div>

        <div className="grids grid">
          <div className="singleGrid">
            <span className="gridTitle">Priority Boarding</span>
            <p>
              You can also call airplanes from your phone and book a flight
              ticket to one of your favourite destinations.
            </p>
          </div>
        </div>

        <div className="grids grid">
          <div className="singleGrid">
            <span className="gridTitle">Help throungh the airport</span>
            <p>
              You can also call airplanes from your phone and book a flight
              ticket to one of your favourite destinations.
            </p>
          </div>
        </div>

        <div className="grids grid">
          <div className="singleGrid">
            <span className="gridTitle">Help throungh the airport</span>
            <p>
              You can also call airplanes from your phone and book a flight
              ticket to one of your favourite destinations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lounge;
