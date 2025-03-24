import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Support = () => {
  useEffect(() => {
    Aos.init({duration: 2000})
  }, [])

  return (
    <div className='support container section'>
      <div className='sectionContainer'>
        <div className="titlesDiv">
          <small>Travel support</small>
          <h2>Plan your travel</h2>
          <p>Find help with booking and travel plans, see what to expect along the yourney!</p>
        </div>

        <div className="infoDiv grid">
          <div className="textDiv grid">
            <div data-aos='fade-up' data-aos-duration='2500' className="singleInfo">
              <span className="number colorOne">01</span>
              <h4>Travel requirements for Dubai</h4>
              <p>Find help with booking and travel plans, see what to expect along the journey to your favourite destination!</p>
            </div>
            <div data-aos='fade-up' data-aos-duration='2500' className="singleInfo">
              <span className="number colorTwo">02</span>
              <h4>Travel requirements for Dubai</h4>
              <p>Find help with booking and travel plans, see what to expect along the journey to your favourite destination!</p>
            </div>
            <div data-aos='fade-up' data-aos-duration='2500' className="singleInfo">
              <span className="number colorOne">03</span>
              <h4>Travel requirements for Dubai</h4>
              <p>Find help with booking and travel plans, see what to expect along the journey to your favourite destination!</p>
            </div>
          </div>

          <div data-aos='fade-left' data-aos-duration='2500' className="imgDiv">
            <img src="/assets/plane2.jpg" alt="" /></div>  
        </div>
      </div>
    </div>
  )
}

export default Support