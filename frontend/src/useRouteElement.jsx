import { useRoutes } from "react-router-dom";

// import Booking from "./Pages/BookingPage/Booking";
// import Information from "./Pages/Information/Information";
import FlightResults from "./Pages/FlightResults/FlightResults";
import Homepage from "./Pages/HomePage/HomePage";
import BookingUserInfo from "./Pages/BookingUserInfo/BookingUserInfo";
import SearchResults from "./Pages/SearchResult/SearchResults";
import FlightInfo from "./Pages/FlightInfo/FlightInfo";
import TicketSuccess from "./Pages/TicketSuccess/TicketSuccess";
import CancelFlight from "./Pages/CancelFlight/CancelFlight";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ForgotPW from "./Pages/RegisterPage/ForgotPW";
import HomeAdmin from "./AdminPages/HomeAdmin/HomeAdmin";
import AircraftInfo from "./AdminPages/AircraftInfo/AircraftInfo";
import Posts from "./AdminPages/Posts/Posts";
import FlightsInfo from "./AdminPages/FlightsInfo/FlightsInfo";
import StatisticsDashboard from "./AdminPages/StatisticsDashboard.jsx";
import MyBooking from "./Pages/Mybooking/MyBooking.jsx";
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/FlightResults",
      element: <FlightResults />,
    },

    {
      path: "/BookingUserInfo",
      element: <BookingUserInfo />,
    },
    {
      path: "/SearchResults",
      element: <SearchResults />,
    },
    {
      path: "/FlightInfo",
      element: <FlightInfo />,
    },
    {
      path: "/TicketSuccess",
      element: <TicketSuccess />,
    },
    {
      path: "/CancelFlight",
      element: <CancelFlight />,
    },
    {
      path: "/LoginPage",
      element: <LoginPage />,
    },
    {
      path: "/RegisterPage",
      element: <RegisterPage />,
    },
    {
      path: "/ForgotPW",
      element: <ForgotPW />,
    },
    {
      path: "/AircraftInfo",
      element: <AircraftInfo />,
    },
    {
      path: "/HomeAdmin",
      element: <HomeAdmin />,
    },
    {
      path: "/FlightsInfo",
      element: <FlightsInfo />,
    },
    {
      path: "/Posts",
      element: <Posts />,
    },
    {
      path: "/statistic",
      element: <StatisticsDashboard />,
    },
    {
      path: "/MyBooking",
      element: <MyBooking />,
    },
  ]);
  return routeElement;
}
