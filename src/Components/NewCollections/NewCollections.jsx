import React, { useContext } from 'react'
import "./NewCollections.css"
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const NewCollections = () => {
  const {all_product} = useContext(ShopContext);
  // Get newest products (last 8)
  const newCollections = all_product.slice(-8);
  
  return (
    <div className='newcollections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className='collections'>
            {newCollections.length > 0 ? (
              newCollections.map((item,i)=>{
                return <Item key={item._id || item.id || i} id={item._id || item.id} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
              })
            ) : (
              <p>Loading collections...</p>
            )}
        </div>
    </div>
  )
}

export default NewCollections