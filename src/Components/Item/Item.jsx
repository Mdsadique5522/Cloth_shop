import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'
import { getImageSrc } from '../../utils/imageHelper'

const Item = (props) => {
  const productId = props.id || props._id;
  const imageSrc = getImageSrc(props.image);
  
  return (
    <div className='item'>
       <Link to={`/product/${productId}`}>
         <img onClick={window.scrollTo(0,0)} src={imageSrc} alt={props.name || ''} />
       </Link>
        <p>{props.name}</p>
        <div className='item-prices'>
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item