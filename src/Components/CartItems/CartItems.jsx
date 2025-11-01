import React, { useContext, useState } from 'react'
import "./CartItems.css"
import remove_icon from "../../assets/remove.webp"
import { ShopContext } from '../../Context/ShopContext'
import { getImageSrc } from '../../utils/imageHelper'
import { orderAPI, authAPI } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, user } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [showAddressForm, setShowAddressForm] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!authAPI.isAuthenticated() || !user) {
            alert('Please login to proceed to checkout');
            navigate('/login');
            return;
        }

        const cartItemCount = Object.values(cartItems).reduce((sum, qty) => sum + (qty > 0 ? 1 : 0), 0);
        if (cartItemCount === 0) {
            alert('Your cart is empty');
            return;
        }

        if (!showAddressForm) {
            setShowAddressForm(true);
            return;
        }

        // Validate address
        if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
            alert('Please fill in all address fields');
            return;
        }

        try {
            setLoading(true);
            await orderAPI.create({
                shippingAddress,
                paymentMethod: 'cash_on_delivery'
            });
            alert('Order placed successfully!');
            navigate('/');
        } catch (error) {
            console.error('Checkout error:', error);
            alert(error.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='cartItems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                const productId = e._id || e.id;
                if (cartItems[productId] > 0) {
                    const imageSrc = getImageSrc(e.image);
                    return <div key={productId}>
                        <div className='cartItems-format cartitems-format-main'>
                            <img src={imageSrc} alt={e.name || ''} height="100px" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>
                                {cartItems[productId]}
                            </button>
                            <p>${(e.new_price*cartItems[productId]).toFixed(2)}</p>
                            <img src={remove_icon} alt="" onClick={()=> removeFromCart(productId)} height="20px" style={{cursor: 'pointer'}}/>
                        </div>
                        <hr/>
                    </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    {showAddressForm && (
                        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <h3>Shipping Address</h3>
                            <input 
                                type="text" 
                                placeholder="Street Address" 
                                value={shippingAddress.street}
                                onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd' }}
                            />
                            <input 
                                type="text" 
                                placeholder="City" 
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd' }}
                            />
                            <input 
                                type="text" 
                                placeholder="State" 
                                value={shippingAddress.state}
                                onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd' }}
                            />
                            <input 
                                type="text" 
                                placeholder="Zip Code" 
                                value={shippingAddress.zipCode}
                                onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd' }}
                            />
                            <input 
                                type="text" 
                                placeholder="Country" 
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                                style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd' }}
                            />
                        </div>
                    )}
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <button onClick={handleCheckout} disabled={loading}>
                        {loading ? 'Processing...' : showAddressForm ? 'PLACE ORDER' : 'PROCEED TO CHECKOUT'}
                    </button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type='text' placeholder='promo code'/>
                        <button>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems