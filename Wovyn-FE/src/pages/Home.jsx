import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../store/productSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { items, loading: pLoading, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (isAuthenticated && user?.role === 'ADMIN') {
            navigate('/admin');
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-24">
                {/* Banner Section */}
                <section className="w-full px-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative h-[450px] rounded-3xl overflow-hidden group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="Hero Banner"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-16">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-2 text-primary font-bold text-sm tracking-[0.3em] uppercase mb-4"
                            >
                                <Sparkles size={16} /> New Collection 2026
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-6xl font-black text-white leading-[1.1] mb-6 max-w-xl"
                            >
                                ELEVATE YOUR <br /><span className="text-primary uppercase">EVERYDAY STYLE</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-white/60 text-lg mb-8 max-w-md"
                            >
                                Discover the latest trends in fashion and lifestyle.
                            </motion.p>
                            <div className="flex gap-4">
                                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                                    Shop Men <ArrowRight size={18} />
                                </button>
                                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                                    Shop Women <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </section>


                {/* Products Grid */}
                <section className="w-full px-8 mb-32">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Editor's Choice</h2>
                            <p className="text-text-dim text-sm">Handpicked styles for your unique taste.</p>
                        </div>
                        <button className="text-primary font-bold text-sm hover:underline">View All</button>
                    </div>

                    {pLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="animate-spin text-primary mb-4" size={40} />
                            <p className="text-text-dim">Fetching latest styles...</p>
                        </div>
                    ) : items.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
                            {items.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 glass-card p-10">
                            <p className="text-text-dim italic">No products found. Start by adding some in the admin panel!</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
