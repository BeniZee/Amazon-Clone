import React from 'react'
import classes from "./Carousel.module.css"
import { Carousel } from "react-responsive-carousel"
import { images} from "./img/data"
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
      autoPlay = {true}
      infiniteLoop = {true}
      showIndicators = {false}
        showThumbs={false}
        showStatus={false}
      >
        {
          images.map((imageLink, i) => {
            return <img key={i} src={imageLink} alt="" />;
          })
        }
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  )
}

export default CarouselEffect