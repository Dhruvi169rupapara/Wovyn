import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer"
        >
            {/* Product Image Container */}
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-white/5 relative">
                <img
                    src={product.image ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL.replace('/api', '')}${product.image}`) : 'https://via.placeholder.com/300x400?text=Product'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Wishlist Icon */}
                <div className="absolute top-3 right-3 p-2 bg-white/10 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={18} className="text-white hover:text-secondary hover:fill-secondary transition-all" />
                </div>

                {/* Hover Action (View Similar) - Purely Aesthetic */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-primary/90 translate-y-full group-hover:translate-y-0 transition-transform text-white text-[10px] font-bold text-center">
                    VIEW DETAILS
                </div>
            </div>

            {/* Product Details */}
            <div className="mt-3 px-1">
                <h3 className="text-sm font-black tracking-tight truncate uppercase">{product.name}</h3>
                <p className="text-xs text-text-dim truncate mt-0.5">{product.description || 'Exclusive Wovyn piece'}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold text-primary">Rs. {product.price}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
