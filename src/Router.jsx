import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Result from './Pages/Result/Result';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';


const stripePromise = loadStripe(
  "pk_test_51QTRPfDOMbkx3VxFC0jsR5gVm5ZbHwl0bLDQbX0guKGST5hco9CKB5lHJbJWLt4zt2g1I7oY8T5YtHRArkJHekoH00L7wzisUA"
);



function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute
                msg={"you must log in to pay"}
                redirect={"/payment"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must log in to access your orders"}
                redirect={"/orders"}
              >
                <Elements stripe={stripePromise}>
                  <Orders />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:categoryName" element={<Result />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    );
}

export default Router