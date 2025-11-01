import React, { useContext } from 'react'
import "./RealatedProducts.css"
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'

const RelatedProducts = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  
  // Find current product to get its category
  const currentProduct = all_product.find((e) => 
    e._id === productId || e.id === parseInt(productId) || e.id?.toString() === productId
  );
  
  // Get related products from same category (excluding current product)
  const relatedProducts = currentProduct 
    ? all_product
        .filter(item => 
          item.category === currentProduct.category && 
          (item._id || item.id) !== (currentProduct._id || currentProduct.id)
        )
        .slice(0, 4)
    : all_product.slice(0, 4);
  
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item,i)=>{
                return <Item key={item._id || item.id || i} id={item._id || item.id} _id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
              })
            ) : (
              <p>Loading related products...</p>
            )}
        </div>
    </div>
  )
}

export default RelatedProducts