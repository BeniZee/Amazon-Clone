import React from 'react'
import Category from '../../Components/Category/Category'
import CarouselEffect from '../../Components/Carousel/CarouselEffect'
import Product from '../../Components/Product/Product'
import LayOut from '../../Components/LayOut/LayOut'

function Landing() {
  return (
      <>
          <LayOut>
     <CarouselEffect/>
      <Category/>
      <Product />
     </LayOut>
    
      </>
  )
}

export default Landing