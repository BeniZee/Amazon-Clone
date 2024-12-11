import React from 'react'
import classes from "./Category.module.css"
import { CategoryInfo } from './CategoryFulllnfo'
import CategoryCard from './CategoryCard'

function Category() {
  return (
      <section className={classes.category_container}>
          {CategoryInfo.map((info, i) => {
              return <CategoryCard key={i} data=
                  {info} />;
          })}
          
    </section>
  )
}

export default Category