import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { LogOut, LayoutDashboard, Users, Package, ShoppingBag, Plus } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const stats = [
        { label: 'Total Sales', value: '$12,450', icon: Package, color: 'var(--primary)' },
        { label: 'Active Users', value: '1,240', icon: Users, color: 'var(--secondary)' },
        { label: 'Orders', value: '85', icon: ShoppingBag, color: 'var(--accent)' },
    ];

    return (
        <div className="p-8 w-full">
            <nav className="flex justify-between items-center mb-12 glass-card p-6">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <LayoutDashboard className="text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/admin/products" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                        <Package size={18} /> Products
                    </Link>
                    <Link to="/admin/categories" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                        <Plus size={18} /> Categories
                    </Link>
                    <button
                        onClick={() => dispatch(logout())}
                        className="flex items-center gap-2 text-error hover:opacity-80 transition-opacity font-semibold"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            <div className="mb-10">
                <h2 className="text-3xl font-bold mb-2">Hello, {user?.name}</h2>
                <p className="text-text-dim">Here's a quick look at your store's performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass-card p-8 flex items-center gap-6 group hover:border-primary/50 transition-colors">
                        <div
                            className="p-5 rounded-2xl"
                            style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                        >
                            <stat.icon size={32} />
                        </div>
                        <div>
                            <p className="text-text-dim text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default AdminDashboard;
