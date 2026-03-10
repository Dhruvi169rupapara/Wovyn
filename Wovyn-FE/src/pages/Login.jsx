import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure, clearError } from '../store/authSlice';
import { loginUser } from '../services/api';
import AuthLayout from '../components/AuthLayout';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

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
        dispatch(loginStart());
        try {
            const data = await loginUser(formData);
            if (data.success) {
                dispatch(loginSuccess({ user: data.data.user, token: data.data.token }));
                toast.success('Welcome back!');
            } else {
                dispatch(loginFailure(data.message));
                toast.error(data.message);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed';
            dispatch(loginFailure(errorMsg));
            toast.error(errorMsg);
        }
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Please enter your details to sign in">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-text-dim">Password</label>
                        <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                        <input
                            type="password"
                            name="password"
                            className="form-input pl-11"
                            placeholder="••••••••"
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
                            <span>Signing in...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <span>Sign In</span>
                            <ArrowRight size={20} />
                        </div>
                    )}
                </button>

                <p className="text-center text-sm text-text-dim">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary font-semibold hover:underline">Register here</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
