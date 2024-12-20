import React,{useContext,useState} from 'react'
import classes from "./Payment.module.css"
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import {useStripe,useElements,CardElement} from "@stripe/react-stripe-js";
import CurrencyFormatter from '../../Components/CurrencyFormatter/CurrencyFormatter';
import { axiosInstance } from '../../API/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/Firebase';
import { useNavigate } from 'react-router-dom';
import { TYPE } from '../../Utility/action.type';

function Payment() {

  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);
  
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handlechange = (e) => {
    // console.log(e);
    e?.error?.message? setCardError(e?.error?.message) : setCardError("")
  };

  const handlePayment = async(e) => {
    e.preventDefault();

    try {
      setProcessing(true)
      //1.
      // backend || functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      
      const clientSecret = response?.data?.clientSecret;
      console.log(clientSecret)
      //2. client side (react side confirmation)
      const {paymentIntent}= await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);
      //3. after the confirmation --> order firestore database save, clear basket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty basket
      dispatch({ type:TYPE.EMPTY_BASKET });


      setProcessing(false)
      navigate("/orders", { state: { msg: "you have placed new order" } })

    } catch (error) {
      console.log(error);
      setProcessing(false)

    }

    //3. after the confirmation --> order firestore database save, clear basket 
  }

  return (
    <LayOut>
      {/*Header*/}
      <div className={classes.Payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.Payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>42 badger gate ct</div>
            <div>Catonsvill, MD</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div></div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} Product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment_detailes}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element*/}
                <CardElement onChange={handlechange} />
                {/* price */}

                <div className={classes.Payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormatter amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment






