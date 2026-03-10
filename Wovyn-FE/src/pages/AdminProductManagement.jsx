import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/productSlice';
import { Link } from 'react-router-dom';
import { createProduct, updateProduct, deleteProduct, fetchCategories } from '../services/api';
import Navbar from '../components/Navbar';
import { Plus, Package, Trash2, Edit, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminProductManagement = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        categoryType: 'MEN'
    });

    useEffect(() => {
        dispatch(getProducts());
        loadCategories();
    }, [dispatch]);

    const loadCategories = async () => {
        try {
            const res = await fetchCategories();
            if (res.success) {
                setCategories(res.data);
                if (res.data.length > 0) {
                    setFormData(prev => ({ ...prev, categoryId: res.data[0].id.toString() }));
                }
            }
        } catch (err) {
            toast.error("Failed to load categories");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('categoryId', formData.categoryId);
            data.append('categoryType', formData.categoryType);
            if (imageFile) {
                data.append('image', imageFile);
            }

            let res;
            if (isEditing) {
                res = await updateProduct(currentId, data);
            } else {
                res = await createProduct(data);
            }

            if (res.success) {
                toast.success(isEditing ? "Product updated!" : "Product created!");
                setShowModal(false);
                resetForm();
                dispatch(getProducts());
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentId(product.id);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            categoryId: product.categoryId.toString(),
            categoryType: product.categoryType
        });
        setImageFile(null); // Reset file selection on edit start
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await deleteProduct(id);
                if (res.success) {
                    toast.success("Product deleted!");
                    dispatch(getProducts());
                }
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            categoryId: categories.length > 0 ? categories[0].id.toString() : '',
            categoryType: 'MEN'
        });
        setImageFile(null);
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-32 w-full px-8 pb-20">
                <Link
                    to="/admin"
                    className="flex items-center gap-2 text-text-dim hover:text-primary transition-colors mb-6 font-bold text-sm"
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase">Product Inventory</h1>
                        <p className="text-text-dim mt-2">Manage your catalog items here.</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="btn-primary flex items-center gap-2 max-w-[200px]"
                    >
                        <Plus size={20} /> Add Product
                    </button>
                </div>

                <div className="glass-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-xs uppercase tracking-widest font-bold">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <img
                                            src={p.image ? (p.image.startsWith('http') ? p.image : `${import.meta.env.VITE_API_URL.replace('/api', '')}${p.image}`) : 'https://via.placeholder.com/40'}
                                            alt={p.name}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <span className="font-medium">{p.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-text-dim">{p.category?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 font-bold">Rs. {p.price}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-1 rounded-full">{p.categoryType}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleEdit(p)}
                                                className="text-text-dim hover:text-white transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="text-text-dim hover:text-error transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && !loading && (
                        <div className="p-20 text-center flex flex-col items-center gap-4">
                            <Package size={48} className="text-text-dim opacity-20" />
                            <p className="text-text-dim italic">Catalog is empty.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Basic Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="glass-card w-full max-w-lg p-8 relative z-20">
                        <h2 className="text-2xl font-black mb-6 uppercase">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-text-dim uppercase">Product Name</label>
                                <input
                                    type="text"
                                    className="form-input mt-2"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-text-dim uppercase">Price (Rs.)</label>
                                    <input
                                        type="number"
                                        className="form-input mt-2"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-text-dim uppercase">Type</label>
                                    <select
                                        className="form-input mt-2"
                                        value={formData.categoryType}
                                        onChange={(e) => {
                                            const newType = e.target.value;
                                            const firstOfNewType = categories.find(c => c.categoryType === newType);
                                            setFormData({
                                                ...formData,
                                                categoryType: newType,
                                                categoryId: firstOfNewType ? firstOfNewType.id.toString() : ''
                                            });
                                        }}
                                    >
                                        <option value="MEN">MEN</option>
                                        <option value="WOMEN">WOMEN</option>
                                        <option value="UNISEX">UNISEX</option>
                                        <option value="KIDS">KIDS</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-text-dim uppercase">Category</label>
                                <select
                                    className="form-input mt-2"
                                    required
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories
                                        .filter(c => c.categoryType === formData.categoryType)
                                        .map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-text-dim uppercase">Description</label>
                                <textarea
                                    className="form-input mt-2 h-24 resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-text-dim uppercase">Product Image</label>
                                <input
                                    type="file"
                                    className="form-input mt-2 pt-[10px]"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                                {isEditing && !imageFile && (
                                    <p className="text-[10px] text-text-dim mt-1">Leave empty to keep existing image</p>
                                )}
                            </div>
                            <div className="pt-4 flex gap-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-xs font-bold uppercase hover:bg-white/5 rounded-xl transition-all">Cancel</button>
                                <button type="submit" className="flex-1 btn-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductManagement;
