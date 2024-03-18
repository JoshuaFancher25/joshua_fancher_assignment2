import React from 'react';
import ReactDOM from 'react-dom/client';


import { Data_provider } from './Data_provider.jsx';

import Box from './Box.jsx';
import BoxComponent from './BoxComponent.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Help from './Help.jsx';
import Nav from './Nav.jsx';
import Credits from './Credits.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BoxComponent />,
  },
  {
    path:"/help", 
    element: <Help />
  },
  {
    path:"/Credits", 
    element: <Credits />
  }
]);


// must wrapt the data_provider around everything 
// then must wrap the routerProvider around that 
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    
    <Data_provider>
    <RouterProvider router={router}>
      <BoxComponent />
      </ RouterProvider>
    </Data_provider>
   
  </React.StrictMode>
);


