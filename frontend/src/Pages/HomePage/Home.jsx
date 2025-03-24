import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="home flex container">
      <div className="mainText">
        <h1 data-aos="fade-up" data-aos-duration="2500">
          <i>QAirline Hơn cả một chuyến bay!</i>
        </h1>
      </div>

      <div className="videoDiv">
        <video
          src="/assets/sky.mp4"
          autoPlay
          muted
          loop
          className="video"
        ></video>
      </div>

      <div className="homeImages flex">
        <img src="assets/plane-nobg.png" alt="" className="plane" />
      </div>
      <img src="assets/support.jpg" alt="" className="supportImg" />
    </div>
  );
};

export default Home;
