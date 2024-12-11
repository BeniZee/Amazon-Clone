import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useActionData, useParams } from 'react-router-dom'
import { productUrl } from '../../API/EndPoints'
import ProductCard from '../../Components/Product/ProductCard'
import LayOut from '../../Components/LayOut/LayOut'
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] =
  useState(false)
  const { productId } = useParams()
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
    })
  }, [])
  
  
  return (
     <LayOut>
      {isLoading ? <Loader /> :
        <ProductCard Product={product}
          flex={true}
          renderDescription={true}
          renderAdd={true}
        />}
          
    </LayOut>
          
  );
}

export default ProductDetail