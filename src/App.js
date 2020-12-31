import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Basket from "./Basket";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Hzl3mIUZLNu0MpbKHbpr4bmIG2bc7B0y8M3Um0sEcoBu7EwHJZ9L0g0UAyBkomUUe8VcQfv5mzVRGaNzISKdsGl00eTJEdh5R"
);

function App() {
  const [{}, dispatch] = useStateValue();
  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        //user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Basket">
          <Header />
          <Basket />
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/">
          <div className="app">
            <Header />
            <Home />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
