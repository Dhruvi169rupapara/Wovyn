import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/api';
import { Plus, Trash2, Edit, Loader2, ListTree, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminCategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        categoryType: 'MEN'
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const res = await fetchCategories();
            if (res.success) {
                setCategories(res.data);
            }
        } catch (err) {
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (isEditing) {
                res = await updateCategory(currentId, formData);
            } else {
                res = await createCategory(formData);
            }

            if (res.success) {
                toast.success(isEditing ? "Category updated!" : "Category created!");
                setShowModal(false);
                resetForm();
                loadCategories();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        }
    };

    const handleEdit = (category) => {
        setIsEditing(true);
        setCurrentId(category.id);
        setFormData({
            name: category.name,
            categoryType: category.categoryType
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const res = await deleteCategory(id);
                if (res.success) {
                    toast.success("Category deleted!");
                    loadCategories();
                }
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: '', categoryType: 'MEN' });
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
                        <h1 className="text-4xl font-black uppercase tracking-tight">Category Catalog</h1>
                        <p className="text-text-dim mt-2">Organize your products with custom categories.</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="btn-primary flex items-center gap-2 max-w-[220px]"
                    >
                        <Plus size={20} /> Add New Category
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-primary mb-4" size={40} />
                        <p className="text-text-dim text-sm font-medium tracking-widest uppercase">Fetching categories...</p>
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-text-dim">
                                <tr>
                                    <th className="px-8 py-5">Category Name</th>
                                    <th className="px-8 py-5">Type</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {categories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_theme('colors.primary.DEFAULT')]" />
                                                <span className="font-bold tracking-tight">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] font-black bg-white/5 border border-white/10 px-3 py-1.5 rounded-full tracking-widest">
                                                {cat.categoryType}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-5">
                                                <button
                                                    onClick={() => handleEdit(cat)}
                                                    className="text-text-dim hover:text-white transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat.id)}
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
                        {categories.length === 0 && (
                            <div className="p-20 text-center flex flex-col items-center gap-6">
                                <div className="p-6 bg-white/5 rounded-full">
                                    <ListTree size={48} className="text-text-dim opacity-20" />
                                </div>
                                <div>
                                    <p className="text-text-dim italic">No categories yet.</p>
                                    <p className="text-[10px] text-text-dim mt-2 uppercase tracking-widest font-bold">Start organizing your collections</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modern Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-background/90 backdrop-blur-md"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="glass-card w-full max-w-md p-10 relative z-20 border-white/20 shadow-2xl">
                        <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">
                            {isEditing ? 'Edit Category' : 'Create Category'}
                        </h2>
                        <p className="text-text-dim text-sm mb-8">Define how your products will be grouped.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em]">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    required
                                    placeholder="e.g. Summer Essentials"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em]">Audience</label>
                                <select
                                    className="form-input cursor-pointer"
                                    value={formData.categoryType}
                                    onChange={(e) => setFormData({ ...formData, categoryType: e.target.value })}
                                >
                                    <option value="MEN">MEN</option>
                                    <option value="WOMEN">WOMEN</option>
                                    <option value="UNISEX">UNISEX</option>
                                    <option value="KIDS">KIDS</option>
                                </select>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 btn-primary uppercase tracking-widest text-xs">
                                    {isEditing ? 'Update' : 'Launch Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoryManagement;
