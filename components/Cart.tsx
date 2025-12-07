
import React, { useState, useEffect } from 'react';
import { Product } from '../backend/models';
import { CartService } from '../services/cartService';
import { SettingsController } from '../backend/controllers/settingsController';
import { Trash2, MessageCircle } from 'lucide-react';
import SEOHead from './SEOHead';

interface CartProps {
  onNavigate?: (page: string, id?: string) => void;
}

const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [currency, setCurrency] = useState('GH₵');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setItems(CartService.getCart());
    const settings = SettingsController.getSettings();
    setCurrency(settings.currencySymbol);
    setPhoneNumber(settings.phoneNumber);

    const handleUpdate = () => {
      setItems(CartService.getCart());
    };
    window.addEventListener('cart-updated', handleUpdate);
    return () => window.removeEventListener('cart-updated', handleUpdate);
  }, []);

  const removeFromCart = (id: string) => {
    CartService.removeFromCart(id);
  };

  const calculateTotal = () => {
    return items.reduce((acc, curr) => acc + curr.price, 0);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = "Hello Hair Aura! I would like to order the following items from my Cart:\n\n";
    items.forEach((item, index) => {
      const link = `${window.location.origin}?product_id=${item.id}`;
      message += `${index + 1}. *${item.name}* - ${currency}${item.price.toLocaleString()}\nLink: ${link}\n\n`;
    });
    message += `Total Price: *${currency}${calculateTotal().toLocaleString()}*\n\nI am located in Ghana. Please confirm availability and delivery.`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <SEOHead title="My Cart" description="Review your items before checkout." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-neutral-100 pb-6 gap-6">
          <div>
             <h1 className="text-3xl md:text-4xl font-serif font-bold text-aura-black mb-2">My Cart</h1>
             <p className="text-neutral-500 text-sm">{items.length} items ready to order</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 border border-dashed border-neutral-200">
            <h2 className="font-serif text-2xl text-neutral-400 mb-4">Your cart is empty</h2>
            <p className="text-neutral-500 text-sm mb-8">Add items to your cart to checkout.</p>
            <button 
              onClick={() => onNavigate && onNavigate('shop')}
              className="bg-aura-black text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map(product => (
                <div key={product.id} className="flex flex-col md:flex-row items-center gap-6 border border-neutral-100 p-4 bg-white relative">
                   <div className="w-full md:w-24 h-24 flex-shrink-0 bg-neutral-100 cursor-pointer" onClick={() => onNavigate && onNavigate('product-details', product.id)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                   </div>

                   <div className="flex-1 text-center md:text-left">
                      <h3 className="font-serif text-lg font-bold text-aura-black cursor-pointer hover:underline" onClick={() => onNavigate && onNavigate('product-details', product.id)}>
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">{product.category}</p>
                   </div>

                   <div className="text-center md:text-right">
                       <p className="text-aura-black font-bold text-lg">{currency}{product.price.toLocaleString()}</p>
                   </div>

                   <button 
                      onClick={() => removeFromCart(product.id)}
                      className="absolute top-4 right-4 md:static text-neutral-400 hover:text-red-600 transition-colors"
                      title="Remove"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 p-8 border border-neutral-200 sticky top-24">
                <h3 className="font-serif text-xl font-bold mb-6 text-aura-black">Order Summary</h3>
                
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-neutral-600">Subtotal</span>
                    <span className="font-bold text-aura-black">{currency}{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-neutral-200">
                    <span className="text-sm text-neutral-600">Delivery</span>
                    <span className="text-xs text-neutral-400 italic">Calculated via WhatsApp</span>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-aura-black uppercase tracking-wider text-sm">Total</span>
                  <span className="font-serif text-2xl font-bold text-aura-black">{currency}{calculateTotal().toLocaleString()}</span>
                </div>

                <div className="bg-aura-gold/20 p-4 mb-6 text-center">
                    <p className="text-xs font-bold text-aura-black">PLEASE NOTE</p>
                    <p className="text-[10px] text-neutral-600 mt-1">We only deliver within Ghana.</p>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-aura-black text-white py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3 shadow-lg"
                >
                  <MessageCircle size={16} /> Checkout on WhatsApp
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
