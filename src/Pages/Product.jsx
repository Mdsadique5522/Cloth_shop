import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Bredcrums from '../Components/Bredcrums/BredCrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Description from '../Components/Description/Description';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  // Handle both MongoDB _id and numeric id formats
  const product = all_product.find((e) => 
    e._id === productId || e.id === parseInt(productId) || e.id?.toString() === productId
  );
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div>
      <Bredcrums product={product}/>
      <ProductDisplay product={product}/>
      <Description/>
      <RelatedProducts/>
    </div>
  )
}

export default Product