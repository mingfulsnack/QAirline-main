// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// // import { HiOutlineLocationMarker } from "react-icons/hi";
// // import { RiAccountPinCircleLine } from "react-icons/ri";
// // import { RxBookmark, RxCalendar } from "react-icons/rx";
// import Aos from "aos";
// import "aos/dist/aos.css";

// const Search = () => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [adultCount, setAdultCount] = useState("0");
//   const [childrenCount, setChildrenCount] = useState("0");
//   const [flightClass, setFlightClass] = useState("Any");

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/flights/search`, {
//         origin,
//         destination,
//         departureDate,
//         returnDate,
//         adultCount,
//         childrenCount,
//         flightClass,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching flights:", error);
//     }
//   };

//   useEffect(() => {
//     Aos.init({ duration: 2000 });
//   }, []);

//   return (
//     <div className="search container section">
//       <div
//         data-aos="fade-up"
//         data-aos-duration="2500"
//         className="sectionContainer grid"
//       >
//         <div className='mainText'>
//           <h1 data-aos='fade-up' data-aos-duration='2500'>Find Your Flight!</h1>
//         </div>
//         <div id="booking" className="section">
//           <div className="section-center">
//             <div className="container">
//               <div className="row">
//                 <div className="booking-form">
//                   <form onSubmit={handleFormSubmit}>
//                     <div className="row">
//                       {/* Flying From */}
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <span className="form-label">Flying from</span>
//                           <div
//                             id="from"
//                             name="from"
//                             className="form-control departsfrom-select"
//                             class="select animated zoomIn"
//                             value={origin}
//                             onChange={(e) => setOrigin(e.target.value)}
//                             required>
//                             <input type="radio" name="option"/>
//                             <i class="toggle icon icon-arrow-down"></i>
//                             <i class="toggle icon icon-arrow-up"></i>
//                             <span class="placeholder">Select city</span>
//                             <div className="iconDiv">
//                             {/* <HiOutlineLocationMarker className="icon" /> */}
//                           </div>
//                             <label class="option" value="Mumbai">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Mumbai</span>
//                             </label>
//                             <label class="option" value="Tokyo">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Tokyo</span>
//                             </label>
//                             <label class="option" value="Hanoi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Hanoi</span>
//                             </label>
//                             <label class="option" value="Delhi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Delhi</span>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       {/* Flying To */}
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <span className="form-label">Flying to</span>
//                           <div
//                             id="from"
//                             name="from"
//                             className="form-control departsfrom-select"
//                             class="select animated zoomIn"
//                             value={origin}
//                             onChange={(e) => setOrigin(e.target.value)}
//                             required>
//                             <input type="radio" name="option"/>
//                             <i class="toggle icon icon-arrow-down"></i>
//                             <i class="toggle icon icon-arrow-up"></i>
//                             <span class="placeholder">Select city</span>
//                             <label class="option" value="Mumbai">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Mumbai</span>
//                             </label>
//                             <label class="option" value="Tokyo">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Tokyo</span>
//                             </label>
//                             <label class="option" value="Hanoi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Hanoi</span>
//                             </label>
//                             <label class="option" value="Delhi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Delhi</span>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       {/* Departing */}
//                       <div className="col-md-5">
//                         <div className="form-group">
//                           <span className="form-label">Departing</span>
//                           <input
//                             className="form-control"
//                             type="date"
//                             name="departureDate"
//                             value={departureDate}
//                             onChange={(e) => setDepartureDate(e.target.value)}
//                             required
//                           />
//                         </div>
//                       </div>
//                       {/* Returning */}
//                       <div className="col-md-5">
//                         <div className="form-group">
//                           <span className="form-label">Returning</span>
//                           <input
//                             className="form-control"
//                             type="date"
//                             name="returnDate"
//                             value={returnDate}
//                             onChange={(e) => setReturnDate(e.target.value)}
//                             required
//                           />
//                         </div>
//                       </div>
//                       {/* Adults */}
//                       <div className="col-md-3">
//                         <div className="form-group">
//                           <span className="form-label">Adults (18+)</span>
//                           <div
//                             id="from"
//                             name="from"
//                             className="form-control departsfrom-select"
//                             class="select animated zoomIn"
//                             value={origin}
//                             onChange={(e) => setOrigin(e.target.value)}
//                             required>
//                             <input type="radio" name="option"/>
//                             <i class="toggle icon icon-arrow-down"></i>
//                             <i class="toggle icon icon-arrow-up"></i>
//                             <span class="placeholder">0</span>
//                             <label class="option" value="Mumbai">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">0</span>
//                             </label>
//                             <label class="option" value="Tokyo">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">1</span>
//                             </label>
//                             <label class="option" value="Hanoi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">2</span>
//                             </label>
//                             <label class="option" value="Delhi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">3</span>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       {/* Children */}
//                       <div className="col-md-3">
//                         <div className="form-group">
//                           <span className="form-label">Children (0 - 17)</span>
//                           <div
//                             id="from"
//                             name="from"
//                             className="form-control departsfrom-select"
//                             class="select animated zoomIn"
//                             value={origin}
//                             onChange={(e) => setOrigin(e.target.value)}
//                             required>
//                             <input type="radio" name="option"/>
//                             <i class="toggle icon icon-arrow-down"></i>
//                             <i class="toggle icon icon-arrow-up"></i>
//                             <span class="placeholder">0</span>
//                             <label class="option" value="Mumbai">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">0</span>
//                             </label>
//                             <label class="option" value="Tokyo">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">1</span>
//                             </label>
//                             <label class="option" value="Hanoi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">2</span>
//                             </label>
//                             <label class="option" value="Delhi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">3</span>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       {/* Travel Class */}
//                       <div className="col-md-5">
//                         <div className="form-group">
//                           <span className="form-label">Travel class</span>
//                           <div
//                             id="from"
//                             name="from"
//                             className="form-control departsfrom-select"
//                             class="select animated zoomIn"
//                             value={origin}
//                             onChange={(e) => setOrigin(e.target.value)}
//                             required>
//                             <input type="radio" name="option"/>
//                             <i class="toggle icon icon-arrow-down"></i>
//                             <i class="toggle icon icon-arrow-up"></i>
//                             <span class="placeholder">Any</span>
//                             <label class="option" value="Mumbai">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Economy Class</span>
//                             </label>
//                             <label class="option" value="Tokyo">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">Business Class</span>
//                             </label>
//                             <label class="option" value="Hanoi">
//                                 <input type="radio" name="option"/>
//                                 <span class="title">First Class</span>
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       {/* Submit Button */}
//                       <div className="col-md-5">
//                         <div className="form-btn">
//                           <button className="submit-btn" type="submit">
//                             Show flights
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <div className="btns flex">
//           <div className="singleBtn">
//             <span>Economy</span>
//           </div>

//           <div className="singleBtn">
//             <span>Business</span>
//           </div>

//           <div className="singleBtn">
//             <span>First Class</span>
//           </div>
//         </div>

//         <div
//           data-aos="fade-up"
//           data-aos-duration="2000"
//           className="searchInputs flex"
//         >
//           <div className="singleInput flex">
//             <div className="iconDiv">
//               <HiOutlineLocationMarker className="icon" />
//             </div>
//             <div className="texts">
//               <h4>Từ</h4>
//               <input type="text" placeholder="Where do you want to go?" />
//             </div>
//           </div>

//           <div className="singleInput flex">
//             <div className="iconDiv">
//               <RiAccountPinCircleLine className="icon" />
//             </div>
//             <div className="texts">
//               <h4>Tới</h4>
//               <input type="text" placeholder="Add guests" />
//             </div>
//           </div>

//           <div className="singleInput flex">
//             <div className="iconDiv">
//               <RxCalendar className="icon" />
//             </div>
//             <div className="texts">
//               <h4>Ngày đi</h4>
//               <input type="text" placeholder="Add date" />
//             </div>
//           </div>

//           <div className="singleInput flex">
//             <div className="iconDiv">
//               <RxCalendar className="icon" />
//             </div>
//             <div className="texts">
//               <h4>Ngày về</h4>
//               <input type="text" placeholder="Add date" />
//             </div>
//           </div>

//           <div className="singleInput flex">
//             <div className="iconDiv">
//               <RxBookmark className="icon" />
//             </div>
//             <div className="texts">
//               <h4>Hành khách</h4>
//               <input type="text" placeholder="1" />
//             </div>
//           </div>

//           <div className="singleInput flex">
//             <div className="iconDiv">
//               <RxBookmark className="icon" />
//             </div>
//             <div className="texts">
//               <h4>Mã giảm giá</h4>
//               <input type="text" placeholder="1" />
//             </div>
//           </div>
//         </div> */}

//         <div>
//           <button className="btn btnBlock">Search Flight</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;
