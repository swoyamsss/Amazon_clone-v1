import React from "react";
import "./basket.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
function Basket() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="basket">
      <div className="basket_left">
        <img
          className="basket_ad"
          src="https://prestocloud-project.eu/wp-content/uploads/2019/09/4news_again-1600x200.png"
        />
        <div>
          <h3> Hello, {!user ? "guest" : user.email}</h3>
          <h2 className="basket_title">Your Shopping Basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="basket_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Basket;
