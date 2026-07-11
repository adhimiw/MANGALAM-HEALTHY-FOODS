import { useState } from 'react';
import { validateCoupon, createOrder, logActivity } from '../utils/api';

export default function CartDrawer({ isOpen, onClose, cart, onRemove, onCheckout }) {
    const [isCheckoutMode, setIsCheckoutMode] = useState(false);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const discount = appliedCoupon ? parseFloat(appliedCoupon.discount) : 0;
    const shipping = subtotal > 999 ? 0 : (cart.length > 0 ? 50 : 0); // shipping is free above 999
    const total = subtotal - discount + shipping;
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleStartCheckout = () => {
        setIsCheckoutMode(true);
        logActivity('CHECKOUT_INIT', { cart_items: cart, subtotal });
    };

    const handleCancelCheckout = () => {
        setIsCheckoutMode(false);
        setErrorMessage('');
    };

    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;

        setCouponMessage({ text: 'Validating...', type: '' });
        logActivity('COUPON_ATTEMPT', { code: couponCode, subtotal });

        const result = await validateCoupon(couponCode, subtotal);
        if (result.valid) {
            setAppliedCoupon(result);
            setCouponMessage({ text: result.message, type: 'success' });
            logActivity('COUPON_SUCCESS', { code: couponCode, discount: result.discount });
        } else {
            setAppliedCoupon(null);
            setCouponMessage({ text: result.message, type: 'error' });
            logActivity('COUPON_FAILURE', { code: couponCode, error: result.message });
        }
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        if (!name.trim() || !mobile.trim() || !address.trim()) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        const orderData = {
            name,
            mobile,
            address,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                option: item.option
            })),
            coupon_code: appliedCoupon ? appliedCoupon.code : null
        };

        const response = await createOrder(orderData);
        setIsSubmitting(false);

        if (response.success) {
            setOrderSuccess(true);
            // Clear cart & reset states in parent via onCheckout callback
            onCheckout(); 
        } else {
            setErrorMessage(response.error || 'Something went wrong. Please try again.');
        }
    };

    const handleCloseSuccess = () => {
        // Reset states
        setIsCheckoutMode(false);
        setName('');
        setMobile('');
        setAddress('');
        setCouponCode('');
        setCouponMessage({ text: '', type: '' });
        setAppliedCoupon(null);
        setOrderSuccess(false);
        onClose();
    };

    return (
        <div className={`cart-drawer ${isOpen ? 'active' : ''}`} aria-hidden={!isOpen}>
            <div className="cart-drawer-overlay" role="presentation" onClick={onClose}></div>
            <div className="cart-drawer-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                {/* Header */}
                <div className="cart-header">
                    <h2>
                        {orderSuccess ? 'Order Placed!' : (isCheckoutMode ? 'Secure Checkout' : `Your Rituals (${totalQty})`)}
                    </h2>
                    <button type="button" className="cart-close" onClick={orderSuccess ? handleCloseSuccess : onClose} aria-label="Close Shopping Cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                {/* Body Content */}
                <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {orderSuccess ? (
                        // SUCCESS STATE
                        <div style={{ textAlign: 'center', padding: '40px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(44, 120, 68, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-primary, #2c7844)'
                            }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)' }}>Formulation Confirmed!</h3>
                            <p style={{ color: '#646a66', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                Thank you, <strong>{name}</strong>. Your wellness ritual order has been processed.
                            </p>
                            <div style={{
                                backgroundColor: '#f4f6f4',
                                padding: '16px',
                                borderRadius: '8px',
                                borderLeft: '4px solid var(--color-primary)',
                                textAlign: 'left',
                                fontSize: '0.85rem',
                                color: '#333'
                            }}>
                                💬 <strong>WhatsApp Alert Dispatched:</strong> An automated order summary was sent directly to our team. We will verify your shipping details and prepare your package.
                            </div>
                            <button type="button" 
                                className="btn btn-primary" 
                                style={{ width: '100%', marginTop: '20px' }}
                                onClick={handleCloseSuccess}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : isCheckoutMode ? (
                        // CHECKOUT FORM STATE
                        <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <button type="button" 
                                onClick={handleCancelCheckout}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-primary)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    padding: 0,
                                    marginBottom: '10px'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                Back to Cart
                            </button>

                            {errorMessage && (
                                <div style={{ color: '#d93838', fontSize: '0.85rem', fontWeight: 600, backgroundColor: '#fdf2f2', padding: '10px', borderRadius: '4px' }}>
                                    ⚠️ {errorMessage}
                                </div>
                            )}

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-primary)' }}>
                                    Full Name *
                                </label>
                                <input 
                                    type="text" 
                                    required 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Adhithan Dev"
                                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #c9d1cc', backgroundColor: '#fcfdfd', color: '#1b231f', fontSize: '0.95rem' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-primary)' }}>
                                    Mobile Number *
                                </label>
                                <input 
                                    type="tel" 
                                    required 
                                    value={mobile} 
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="e.g. +91 98765 43210"
                                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #c9d1cc', backgroundColor: '#fcfdfd', color: '#1b231f', fontSize: '0.95rem' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-primary)' }}>
                                    Delivery Address *
                                </label>
                                <textarea 
                                    required 
                                    rows="3"
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your complete doorstep address..."
                                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #c9d1cc', backgroundColor: '#fcfdfd', color: '#1b231f', fontSize: '0.95rem', resize: 'vertical' }}
                                />
                            </div>

                            {/* Coupon Input */}
                            <div style={{ borderTop: '1px solid #e9ebe9', paddingTop: '15px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-primary)' }}>
                                    Promo Code / Coupon
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input 
                                        type="text" 
                                        value={couponCode} 
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="e.g. WELCOME10"
                                        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #c9d1cc', textTransform: 'uppercase', fontSize: '0.9rem' }}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={handleApplyCoupon}
                                        className="btn btn-secondary" 
                                        style={{ padding: '0 16px', fontSize: '0.85rem', height: 'auto' }}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponMessage.text && (
                                    <p style={{ 
                                        fontSize: '0.8rem', 
                                        marginTop: '6px', 
                                        fontWeight: 600,
                                        color: couponMessage.type === 'success' ? '#2c7844' : (couponMessage.type === 'error' ? '#d93838' : '#888') 
                                    }}>
                                        {couponMessage.text}
                                    </p>
                                )}
                            </div>
                        </form>
                    ) : (
                        // CART ITEMS LIST STATE
                        cart.length === 0 ? (
                            <div className="cart-empty-message">
                                Your daily wellness ritual is currently empty. Add a formulation to begin.
                            </div>
                        ) : (
                            cart.map((item, index) => (
                                <div className="cart-item" key={`${item.id}-${item.option}`}>
                                    <div className="cart-item-info">
                                        <h4 className="cart-item-title">{item.name}</h4>
                                        <p className="cart-item-price" style={{ textTransform: 'capitalize', fontSize: '0.75rem', color: '#b3ad7e' }}>
                                            {item.option} plan
                                        </p>
                                        <div className="cart-item-price">
                                            ₹{parseFloat(item.price).toFixed(2)} x {item.quantity}
                                        </div>
                                    </div>
                                    <button type="button" 
                                        className="cart-item-remove" 
                                        onClick={() => {
                                            logActivity('REMOVE_FROM_CART', { product_id: item.id, option: item.option });
                                            onRemove(index);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        )
                    )}
                </div>
                
                {/* Footer (for non-success states) */}
                {!orderSuccess && (
                    <div className="cart-footer" style={{ borderTop: '1px solid #e9ebe9', padding: '20px', backgroundColor: '#fcfdfd', opacity: cart.length === 0 ? 0.5 : 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#646a66' }}>
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            
                            {discount > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#2c7844', fontWeight: 600 }}>
                                    <span>Coupon Discount ({appliedCoupon.code})</span>
                                    <span>-₹{discount.toFixed(2)}</span>
                                </div>
                            )}

                            {isCheckoutMode && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#646a66' }}>
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)', borderTop: '1px solid #e9ebe9', paddingTop: '8px', marginTop: '4px' }}>
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {isCheckoutMode ? (
                            <button type="button" 
                                className="btn btn-primary checkout-btn" 
                                onClick={handleSubmitOrder}
                                disabled={isSubmitting || cart.length === 0}
                                style={{ width: '100%' }}
                            >
                                {isSubmitting ? 'Confirming Order...' : `Buy & Send to WhatsApp (₹${total.toFixed(2)})`}
                            </button>
                        ) : (
                            <button type="button" 
                                className="btn btn-primary checkout-btn" 
                                onClick={handleStartCheckout}
                                disabled={cart.length === 0}
                                style={{ width: '100%' }}
                            >
                                Secure Checkout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
