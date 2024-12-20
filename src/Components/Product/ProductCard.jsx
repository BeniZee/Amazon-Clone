import React, { useContext } from 'react'
import classes from "./Product.module.css"
import Rating from '@mui/material/Rating';
import CurrencyFormatter from "../CurrencyFormatter/CurrencyFormatter"
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { TYPE } from '../../Utility/action.type';




function ProductCard({ Product, flex, renderDescription , renderAdd}) {
    // console.log(Product);
    
    const { image, title, id, rating, price, description } = Product;
    const [state, dispatch] = useContext(DataContext)
    const addToCart = () => {
        dispatch({
            type: TYPE.ADD_TO_BASKET,
            item: { image, title, id, rating, price, description }
        })
    }
    // console.log(state)

    return (
        <div className={`${classes.card_container} ${flex && classes.product_flexed}`}>
            <Link to={`/products/${id}`}>
                <img src={image} alt="" />
            </Link>
            <div>
                <h3>{title}</h3>
                {renderDescription && <div style={{ maxWidth: "750px" }}>{description}</div>}
                <div className={classes.rating}>
                    { }
                    <Rating value={rating?.rate} precision={0.1} />
                    <small>{rating?.count}</small>
                </div>
                <div>
                    { }
                    <CurrencyFormatter amount={price} />
                </div>
                { renderAdd && <button className={classes.button} onClick={addToCart}>add to cart</button>}
                
            </div>
        </div>
      
    );
}

export default ProductCard