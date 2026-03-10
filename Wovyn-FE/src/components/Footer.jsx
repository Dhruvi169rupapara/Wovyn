import { Github, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-background pt-20 pb-10 border-t border-white/10 mt-20">
            <div className="w-full px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Online Shopping</h4>
                    <ul className="space-y-3 text-sm text-text-dim">
                        <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Kids</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Customer Policies</h4>
                    <ul className="space-y-3 text-sm text-text-dim">
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">T&C</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms Of Use</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Track Orders</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Experience Wovyn App</h4>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex gap-4">
                            {/* Simplified representation of store badges */}
                            <div className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-[10px] font-bold">GET IT ON <br /><span className="text-sm">Google Play</span></div>
                            <div className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-[10px] font-bold">Download on the <br /><span className="text-sm">App Store</span></div>
                        </div>
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mt-12 mb-6">Keep In Touch</h4>
                    <div className="flex gap-6">
                        <Facebook className="text-text-dim hover:text-white cursor-pointer transition-colors" size={20} />
                        <Twitter className="text-text-dim hover:text-white cursor-pointer transition-colors" size={20} />
                        <Instagram className="text-text-dim hover:text-white cursor-pointer transition-colors" size={20} />
                        <Github className="text-text-dim hover:text-white cursor-pointer transition-colors" size={20} />
                    </div>
                </div>

                <div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-bold mb-4">Newsletter</h4>
                        <p className="text-xs text-text-dim mb-4 leading-relaxed">Be the first to know about new arrivals, sales & promos!</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full outline-none focus:border-primary transition-colors" />
                            <button className="bg-primary text-white p-2 rounded-lg font-bold text-xs uppercase">Join</button>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
