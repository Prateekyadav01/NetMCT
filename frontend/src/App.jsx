import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import FrontPage from "./Components/Index/FrontPage";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import FrontForm from "./Components/Extra/FrontForm";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Home/Home";
import DetailsPage from "./Components/MovieDetail/DetailsPage";
import MainSection from "./Components/Home/MainSection";
import Explore from "./Components/Explore/Explore";
import Search from "./Components/Search/Search";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FrontPage />,
      children: [
        {
          path: "/",
          element: <FrontForm />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "/home",
          element: <MainSection />,
        },
        {
          path: "details/:mediaType/:id",
          element: <DetailsPage />,
        },
        {
          path: "explore/:mediaType",
          element: <Explore />,
        },
        {
          path: "search/:searchKeyword",
          element: <Search />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer stacked />
    </Provider>
  );
}

export default App;
