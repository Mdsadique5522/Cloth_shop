import React, { useContext } from 'react'
import "./Popular.css"
import Item from "../Item/Item"
import { ShopContext } from '../../Context/ShopContext'

const Popular = () => {
  const {all_product} = useContext(ShopContext);
  // Get women's products or fallback to all products
  const popularProducts = all_product.filter(item => item.category === 'women').slice(0, 4);
  
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className='popular-item'>
        {popularProducts.length > 0 ? (
          popularProducts.map((item,i)=>{
            return <Item key={item._id || item.id || i} id={item._id || item.id} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  )
}

export default Popular