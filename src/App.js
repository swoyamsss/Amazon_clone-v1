import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Basket from "./Basket";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

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
