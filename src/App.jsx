import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Science from './pages/Science';
import About from './pages/About';
import { fetchProducts, fetchSiteConfig, logActivity } from './utils/api';

export default function App() {
    const [page, setPageState] = useState('home');
    const [activeProductId, setActiveProductId] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Backend Dynamic Content States
    const [products, setProducts] = useState([]);
    const [siteConfig, setSiteConfig] = useState(null);

    // Load dynamic data on mount
    useEffect(() => {
        const loadInitialData = async () => {
            const fetchedProducts = await fetchProducts();
            if (fetchedProducts && fetchedProducts.length > 0) {
                setProducts(fetchedProducts);
            }
            const fetchedConfig = await fetchSiteConfig();
            if (fetchedConfig) {
                setSiteConfig(fetchedConfig);
            }
        };
        loadInitialData();
    }, []);

    // Track page views and active product views
    useEffect(() => {
        if (page === 'product' && activeProductId) {
            logActivity('VIEW_PRODUCT', { product_id: activeProductId });
        } else {
            logActivity('PAGE_VIEW', { page_name: page });
        }
    }, [page, activeProductId]);

    // Scroll to top on page change
    const setPage = (newPage) => {
        setPageState(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleProductView = (productId) => {
        setActiveProductId(productId);
        setPage('product');
    };

    const handleAddToCart = (id, name, price, option = 'one-time', quantity = 1) => {
        setCart(prevCart => {
            const existingIndex = prevCart.findIndex(
                item => item.id === id && item.option === option
            );

            if (existingIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: newCart[existingIndex].quantity + quantity,
                };
                return newCart;
            } else {
                return [...prevCart, { id, name, price, option, quantity }];
            }
        });
        
        // Log Add to Cart activity
        logActivity('ADD_TO_CART', { product_id: id, name, price, option, quantity });
        setIsCartOpen(true);
    };

    const handleRemoveFromCart = (index) => {
        const item = cart[index];
        if (item) {
            logActivity('REMOVE_FROM_CART', { product_id: item.id, option: item.option, quantity: item.quantity });
        }
        setCart(prevCart => prevCart.filter((_, idx) => idx !== index));
    };

    const handleCheckoutSuccess = () => {
        logActivity('CHECKOUT_SUCCESS', { cart_items: cart });
        setCart([]);
        // The drawer shows the success confirmation view, so we don't close it instantly.
    };

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <Header 
                page={page} 
                setPage={setPage} 
                cartCount={totalCartCount} 
                onCartOpen={() => {
                    logActivity('CART_OPEN', { total_items: totalCartCount });
                    setIsCartOpen(true);
                }} 
                siteConfig={siteConfig}
            />

            {/* Page Router */}
            {page === 'home' && (
                <Home 
                    setPage={setPage} 
                    onProductView={handleProductView} 
                    onAddToCart={handleAddToCart} 
                    products={products}
                />
            )}
            
            {page === 'shop' && (
                <Shop 
                    onProductView={handleProductView} 
                    onAddToCart={handleAddToCart} 
                    products={products}
                />
            )}
            
            {page === 'product' && (
                <ProductDetail 
                    productId={activeProductId} 
                    onAddToCart={handleAddToCart} 
                    onBack={() => setPage('shop')} 
                    products={products}
                />
            )}
            
            {page === 'science' && (
                <Science setPage={setPage} />
            )}
            
            {page === 'about' && (
                <About setPage={setPage} />
            )}

            <CartDrawer 
                isOpen={isCartOpen} 
                onClose={() => {
                    logActivity('CART_CLOSE');
                    setIsCartOpen(false);
                }} 
                cart={cart} 
                onRemove={handleRemoveFromCart} 
                onCheckout={handleCheckoutSuccess} 
            />

            <Footer setPage={setPage} />
        </>
    );
}
