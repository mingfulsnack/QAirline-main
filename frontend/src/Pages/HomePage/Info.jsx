import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {RxCalendar} from 'react-icons/rx'
import { BsShieldCheck } from 'react-icons/bs'
import { BsBookmarkCheck } from 'react-icons/bs'

const Info = () => {
  useEffect(() => {
    Aos.init({duration: 2000})
  }, [])

  return (
    <div className='info section'>
      <div className="infoContainer container">

        <div className="titleDiv flex">
          <h2 data-aos='fade-right' data-aos-duration='2500'>Travel to make memories all around the world</h2>
          <button data-aos='fade-left' data-aos-duration='2500' className='btn'>
            View All
          </button>
        </div>

        <div className="cardsDiv grid">
          <div data-aos='fade-up' data-aos-duration='1500' className="singleCard grid">
            <div className="iconDiv flex colorOne">
              <RxCalendar className='icon'/>
            </div>

            <span className="cardTitle">Book & Relax</span>
            <p>You can also call airplines from your phone and book a flight ticket!</p>
          </div>

          <div data-aos='fade-up' data-aos-duration='1500' className="singleCard grid">
            <div className="iconDiv flex colorTwo">
              <BsShieldCheck className='icon'/>
            </div>

            <span className="cardTitle">Smart Checklist</span>
            <p>You can also call airplines from your phone and book a flight ticket!</p>
          </div>

          <div data-aos='fade-up' data-aos-duration='1500' className="singleCard grid">
            <div className="iconDiv flex colorOne">
              <BsBookmarkCheck className='icon'/>
            </div>

            <span className="cardTitle">Save more</span>
            <p>You can also call airplines from your phone and book a flight ticket!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info