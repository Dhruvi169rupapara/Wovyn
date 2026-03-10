import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerStart, registerSuccess, registerFailure, clearError } from '../store/authSlice';
import { registerUser } from '../services/api';
import AuthLayout from '../components/AuthLayout';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
        return () => dispatch(clearError());
    }, [isAuthenticated, user, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerStart());
        try {
            const data = await registerUser(formData);
            if (data.success) {
                dispatch(registerSuccess({ user: data.data.user, token: data.data.token }));
                toast.success('Account created successfully!');
            } else {
                dispatch(registerFailure(data.message));
                toast.error(data.message);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed';
            dispatch(registerFailure(errorMsg));
            toast.error(errorMsg);
        }
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join Wovyn today and start shopping">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-dim">Full Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                        <input
                            type="text"
                            name="name"
                            className="form-input pl-11"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-dim">Email Address</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                        <input
                            type="email"
                            name="email"
                            className="form-input pl-11"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-dim">Password</label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                        <input
                            type="password"
                            name="password"
                            className="form-input pl-11"
                            placeholder="Min. 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={20} />
                            <span>Creating account...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <span>Register</span>
                            <ArrowRight size={20} />
                        </div>
                    )}
                </button>

                <p className="text-center text-sm text-text-dim">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-semibold hover:underline">Sign in here</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;
