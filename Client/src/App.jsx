import "./App.css";
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Website from "./pages/Website";
import { Suspense, useState } from "react";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailContext from "./components/context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
function App() {

  const querclient= new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
    <QueryClientProvider client={querclient}>
    <BrowserRouter >
    <Suspense fallback={<div>Loading....</div> }>
    <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings/>}/>
              </Route>
            </Routes>
    </Suspense>
    </BrowserRouter>
    <ToastContainer/>
    <ReactQueryDevtools intialIsOpen={false}/>
    </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
