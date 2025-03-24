
const Travelers = () => {
  return (
    <div className='travelers container section'>
      <div className="sectionContainer">
        <h2>
          Top travels of this month!
        </h2>

        <div className="travelersContainer grid">
          <div className="singleTraveler">
            <img src="/assets/paris.jpg" alt="" className='destinationImage'/>

            <div className="travelerDetails">
              <div className="travelerPicture">
                <img src="/assets/traveler.jpg" alt="" className='travelerImage'/>
              </div>

              <div className='travelerName'>
                <span>Mark</span>
                <p>@mark69</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Travelers