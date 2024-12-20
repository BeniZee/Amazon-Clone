
import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Cart.module.css";
import { Link } from "react-router-dom";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TYPE } from "../../Utility/action.type";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: TYPE.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: TYPE.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket?.map((item) => (
              <section className={classes.cart_product} key={item.id}>
                {" "}
                <ProductCard
                  Product={item}
                  renderDescription={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.btn_container}>
                  <button onClick={() => increment(item)}>
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => decrement(item.id)}>
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
                <div></div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>
                Subtotal ({basket?.length} item{basket.length > 1 ? "s" : ""})
              </p>
              <CurrencyFormatter amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
