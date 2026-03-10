import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, LogOut } from 'lucide-react';
import { logout } from '../store/authSlice';

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg px-8">
            <div className="w-full h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-3xl font-black text-primary tracking-tighter">
                        WOVYN
                    </Link>

                    {user?.role !== 'ADMIN' && (
                        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
                            <Link to="/men" className="hover:text-primary transition-colors uppercase">Men</Link>
                            <Link to="/women" className="hover:text-primary transition-colors uppercase">Women</Link>
                            <Link to="/kids" className="hover:text-primary transition-colors uppercase">Kids</Link>
                        </div>
                    )}
                </div>


                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center group cursor-pointer relative">
                        <User size={20} className="group-hover:text-primary transition-colors" />
                        <span className="text-[10px] uppercase font-bold mt-1 group-hover:text-primary transition-colors">Profile</span>

                        {/* Profile Dropdown */}
                        <div className="absolute top-full right-0 mt-4 w-48 bg-card-bg backdrop-blur-xl border border-white/10 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl">
                            {isAuthenticated ? (
                                <>
                                    <div className="p-3 border-b border-white/10">
                                        <p className="font-bold text-sm">{user?.name}</p>
                                        <p className="text-xs text-text-dim">{user?.email}</p>
                                    </div>
                                    {user?.role === 'ADMIN' && (
                                        <Link to="/admin" className="block p-2 hover:bg-white/5 rounded-md text-sm transition-colors">Admin Dashboard</Link>
                                    )}
                                    <button
                                        onClick={() => dispatch(logout())}
                                        className="w-full text-left p-2 hover:bg-white/5 rounded-md text-sm text-error transition-colors flex items-center gap-2"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </>
                            ) : (
                                <div className="p-2 space-y-2">
                                    <Link to="/login" className="block w-full text-center bg-primary py-2 rounded-md text-sm font-bold">Login / Signup</Link>
                                </div>
                            )}
                        </div>
                    </div>


                    <Link to="/cart" className="flex flex-col items-center group relative">
                        <ShoppingBag size={20} className="group-hover:text-accent transition-colors" />
                        <span className="text-[10px] uppercase font-bold mt-1 group-hover:text-accent transition-colors">Bag</span>
                        <span className="absolute -top-1 -right-2 bg-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
