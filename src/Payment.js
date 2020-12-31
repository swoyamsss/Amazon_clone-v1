import { Link, useHistory } from "react-router-dom";
import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const [error, setError] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [succeeded, setSucceeded] = React.useState(false);
  const [processing, setProcessing] = React.useState("");
  const [secret, setSecret] = React.useState(true);
  const stripe = useStripe();
  const elements = useElements();
  React.useEffect(() => {
    //generate special stripe secret which allows to charge

    const getSecret = async () => {
      const response = await axios({
        method: "post",
        url: "/payments/create?total=" + getBasketTotal(basket) * 100, //mistakr
      });
      setSecret(response.data.secret);
    };
    getSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirm
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.replace("./orders");
      });
  };
  const handleChange = (e) => {
    //listen for changes in the card element
    //displays the error
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/basket">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>Merlin Lane,OA</p>
            <p>Los Carlos,PW</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* if any error occurs with the card */}
              {error ? <div>error</div> : ""}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
