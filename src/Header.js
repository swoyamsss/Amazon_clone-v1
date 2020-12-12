import React from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user ? "/Login" : "/"}>
          <div onClick={handleAuth} className="header_option">
            <span className="header_optionLine1">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header_optionLine2">
              {user ? "sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLine1">Returns</span>
          <span className="header_optionLine2">&Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLine1">Your</span>
          <span className="header_optionLine2">Prime</span>
        </div>
        <Link to="/Basket">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLine2 header_basketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
