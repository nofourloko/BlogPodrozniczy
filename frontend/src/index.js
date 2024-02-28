import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage/MainPage';
import TravelReportsMain from './ TravelReports/TravelReportsMain/TravelReportsMain';
import "./BodyStyleCss.css"
import Error from './Utils/error';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PickedDestination from './Destination/PickedDestination/pickedDestination';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/relacje",
    element : <TravelReportsMain />
  },
  {
    path : "relacje/:place",
    element : <PickedDestination />
  },
  {
    path : '*',
    element: <Error />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


