import React, { useContext } from 'react'
import classes from "./Header.module.css"
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from './LowerHeader';
 import { BiCart } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/Firebase"


function Header() {
    const [{user, basket }, dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    },0)
    return (
      <section className={classes.fixed}>
        <section className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="amzon log"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/*search section*/}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="search product" />
            <BsSearch size={25} />
          </div>
          <div>
            {/*other section*/}

            <div className={classes.order_container}>
              <Link to="" className={classes.language}>
                <img
                  src="https://pngimg.com/uploads/flags/small/flags_PNG14592.png"
                  alt=""
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>
              {/*three components*/}
              <Link to={!user && "/auth"}>
                <div>
                  {user ? (
                    <>
                      <p>Hello {user?.email?.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sing Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sign In</p>

                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </Link>
              <Link to="/Orders">
                <p>returns</p>
                <span>& Orders</span>
              </Link>
              {/*cart*/}
              <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    );
}

export default Header