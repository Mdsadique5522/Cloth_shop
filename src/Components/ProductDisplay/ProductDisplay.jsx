import React, { useContext, useState } from 'react'
import "./ProductDisplay.css"
import star_icon from "../../assets/star_icon.png"
import star_dull_icon from "../../assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { getImageSrc } from '../../utils/imageHelper';

const ProductDisplay = (props) => {
  const { product } = props;
  const {addTocart} = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const imageSrc = getImageSrc(product?.image);
  
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addTocart(product._id || product.id);
  };
  
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={imageSrc} alt={product?.name || ''} height="150px" />
          <img src={imageSrc} alt={product?.name || ''} height="150px" />
          <img src={imageSrc} alt={product?.name || ''} height="150px" />
        </div>
        <div className='productdisplay-img'>
          <img className='productdisplay-main-img' src={imageSrc} alt={product?.name || ''} height="300px" />
        </div>
      </div>
      <div className="productdisplay-right">
<h1>{product?.name}</h1>
<div className="productdisplay-right-star">
  <img src={star_icon} alt="" height="20px" />
  <img src={star_icon} alt="" height="20px" />
  <img src={star_icon} alt="" height="20px" />
  <img src={star_icon} alt="" height="20px" />
  <img src={star_dull_icon} alt="" height="20px" />
  <p>(130)</p>
</div>
<div className="productdisplay-right-prices">
  <div className="productdisplay-right-price-old">
${product?.old_price}
  </div>
  <div className="productdisplay-right-price-new">
    ${product?.new_price}
  </div>
  </div>
  <div className="productdisplay-right-description">
    {product?.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, eaque. Amet reiciendis minus modi eum soluta hic autem, rem corrupti quibusdam? Quam omnis saepe et expedita ratione, quasi unde repudiandae.'}
  </div>
  <div className='productdisplay-right-size'>
    <h1>Select Size</h1>
    <div className="productdisplay-right-sizes">
      {sizes.map((size) => (
        <div 
          key={size}
          onClick={() => setSelectedSize(size)}
          style={{
            cursor: 'pointer',
            border: selectedSize === size ? '2px solid #ff4141' : '1px solid #ccc',
            backgroundColor: selectedSize === size ? '#fff5f5' : '#fff',
            padding: '10px 15px',
            margin: '5px',
            display: 'inline-block',
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}
        >
          {size}
        </div>
      ))}
    </div>
  </div>
  <button onClick={handleAddToCart}>ADD TO CART</button>
  <div className="productdisplay-right-category">
    <span>Category: <span>{product?.category || 'N/A'}</span></span>
  </div>
</div>
      </div>
    
  )
}

export default ProductDisplay