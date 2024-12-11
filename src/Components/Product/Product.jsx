import React, { useEffect, useState } from 'react'
import Classes from "./Product.module.css"
import axios from 'axios';
import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';

function Product() {
    const [Product, setProduct] = useState([]);
    const[isLoading,setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        axios
            .get("https://fakestoreapi.com/products")
            .then((res) => {
                setProduct(res.data);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
            });
    }, []);
    // console.log(Product);
    return (
    <>
        {isLoading ? (<Loader/>): (<div className={Classes.products_container}>
            {Product.map((singleProduct, i) => (
                <ProductCard key={i} Product=
                    {singleProduct}
                renderAdd={true}
                />
            ))}
            </div>
        )}
        </>
    );
}

export default Product