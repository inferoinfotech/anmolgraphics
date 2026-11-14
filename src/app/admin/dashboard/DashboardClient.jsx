'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TiptapEditor from '@/components/Admin/TiptapEditor';
import { useAdminToaster } from '@/components/Admin/AdminToaster';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  Grid, 
  Package, 
  Upload, 
  X, 
  Star, 
  Check, 
  Eye, 
  AlertCircle,
  Search,
  GripVertical
} from 'lucide-react';

const VALID_TABS = ['products', 'categories'];

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast, Toaster } = useAdminToaster();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(() =>
    VALID_TABS.includes(tabParam) ? tabParam : 'products'
  );
  
  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category Form State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryFormMode, setCategoryFormMode] = useState('add'); // 'add' | 'edit'
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categorySubmitting, setCategorySubmitting] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryModalError, setCategoryModalError] = useState('');

  // Product Modal / Form States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null if adding, product object if editing
  
  const [productTitle, setProductTitle] = useState('');
  const [productSlug, setProductSlug] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productRating, setProductRating] = useState(5);
  const [productDescription, setProductDescription] = useState('');
  const [productNote, setProductNote] = useState('Prices may vary based on purchase quantity and any customizations. An 18% GST charge will apply.');
  const [productHighlights, setProductHighlights] = useState(['']);
  const [productImages, setProductImages] = useState([]); // array of urls
  const [productThumbnail, setProductThumbnail] = useState(''); // url
  const [productSections, setProductSections] = useState([]); // array of sections
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Search States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [categorySearch, setCategorySearch] = useState('');
  const [draggedProductId, setDraggedProductId] = useState(null);
  const [dragOverProductId, setDragOverProductId] = useState(null);
  const [reorderSaving, setReorderSaving] = useState(false);

  // Dropdown States
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);

  // Confirm Modal States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmError, setConfirmError] = useState('');
  
  // File Upload State
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [productFormError, setProductFormError] = useState('');

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const catRes = await fetch('/api/admin/categories');
      const prodRes = await fetch('/api/admin/products');
      
      if (catRes.status === 401 || prodRes.status === 401) {
        toast('Session expired. Please sign in again.', 'error');
        router.push('/admin/login');
        return;
      }

      const catData = await catRes.json();
      const prodData = await prodRes.json();

      setCategories(catData.categories || []);
      setProducts(prodData.products || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast('Failed to load catalog data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (VALID_TABS.includes(tab) && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  const switchTab = useCallback(
    (tab) => {
      if (!VALID_TABS.includes(tab)) return;
      setActiveTab(tab);
      router.replace(`/admin/dashboard?tab=${tab}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.custom-select-container')) {
        setIsCategoryDropdownOpen(false);
        setIsRatingDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast('Signed out successfully.', 'success');
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast('Could not sign out. Try again.', 'error');
    }
  };

  const resetCategoryForm = () => {
    setNewCategoryName('');
    setCategoryFormMode('add');
    setEditingCategoryId(null);
  };

  const closeCategoryModal = () => {
    if (categorySubmitting) return;
    setIsCategoryModalOpen(false);
    setCategoryModalError('');
    resetCategoryForm();
  };

  const openAddCategoryModal = () => {
    setCategoryFormMode('add');
    setEditingCategoryId(null);
    setNewCategoryName('');
    setCategoryModalError('');
    setIsCategoryModalOpen(true);
  };

  const startEditCategory = (category) => {
    setCategoryFormMode('edit');
    setEditingCategoryId(category._id);
    setNewCategoryName(category.name);
    setCategoryModalError('');
    setIsCategoryModalOpen(true);
  };

  // Add or update category
  const handleCategoryFormSubmit = async (e) => {
    e.preventDefault();
    setCategoryModalError('');

    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      const message = 'Category name is required.';
      setCategoryModalError(message);
      toast(message, 'error');
      return;
    }

    setCategorySubmitting(true);
    try {
      const isEdit = categoryFormMode === 'edit' && editingCategoryId;
      const res = await fetch('/api/admin/categories', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isEdit ? { id: editingCategoryId, name: trimmedName } : { name: trimmedName }
        ),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast(
          isEdit ? 'Category updated successfully!' : 'Category added successfully!',
          'success'
        );
        setIsCategoryModalOpen(false);
        resetCategoryForm();
        fetchData();
      } else {
        const message = data.error || (isEdit ? 'Failed to update category' : 'Failed to add category');
        setCategoryModalError(message);
        toast(message, 'error');
      }
    } catch (err) {
      const message = 'An error occurred while saving the category.';
      setCategoryModalError(message);
      toast(message, 'error');
    } finally {
      setCategorySubmitting(false);
    }
  };

  // Delete Category
  const handleDeleteCategory = (id) => {
    showConfirm(
      'Delete Category',
      'Are you sure you want to delete this category? Products in this category will not be deleted but they will reference a deleted category.',
      async () => {
        try {
          const res = await fetch(`/api/admin/categories?id=${id}`, {
            method: 'DELETE',
          });
          const data = await res.json();

          if (res.ok && data.success) {
            toast('Category deleted successfully!', 'success');
            if (editingCategoryId === id) {
              setIsCategoryModalOpen(false);
              resetCategoryForm();
            }
            fetchData();
            return { success: true };
          } else {
            const errMsg = data.error || 'Failed to delete category';
            toast(errMsg, 'error');
            return { error: errMsg };
          }
        } catch (err) {
          const errMsg = 'An error occurred while deleting the category.';
          toast(errMsg, 'error');
          return { error: errMsg };
        }
      }
    );
  };

  // Open Product Add Modal
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductTitle('');
    setProductSlug('');
    setProductCategory(categories[0]?.name || '');
    setProductRating(5);
    setProductDescription('');
    setProductNote('Prices may vary based on purchase quantity and any customizations. An 18% GST charge will apply.');
    setProductHighlights(['']);
    setProductImages([]);
    setProductThumbnail('');
    setProductSections([]);
    setProductFormError('');
    setIsCategoryDropdownOpen(false);
    setIsRatingDropdownOpen(false);
    setIsProductModalOpen(true);
  };

  // Open Product Edit Modal
  const openEditProductModal = (product) => {
    setEditingProduct(product);
    setProductTitle(product.title);
    setProductSlug(product.slug || '');
    setProductCategory(product.category);
    setProductRating(product.rating || 5);
    setProductDescription(product.description);
    setProductNote(product.note || 'Prices may vary based on purchase quantity and any customizations. An 18% GST charge will apply.');
    setProductHighlights(product.highlights?.length ? product.highlights : ['']);
    setProductImages(product.images || []);
    setProductThumbnail(product.thumbnail || '');
    setProductSections(product.sections || []);
    setProductFormError('');
    setIsCategoryDropdownOpen(false);
    setIsRatingDropdownOpen(false);
    setIsProductModalOpen(true);
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    showConfirm(
      'Delete Product',
      'Are you sure you want to delete this product? This action is permanent.',
      async () => {
        try {
          const res = await fetch(`/api/admin/products/${id}`, {
            method: 'DELETE',
          });
          const data = await res.json();

          if (res.ok && data.success) {
            toast('Product deleted successfully!', 'success');
            fetchData();
            return { success: true };
          } else {
            const errMsg = data.error || 'Failed to delete product';
            toast(errMsg, 'error');
            return { error: errMsg };
          }
        } catch (err) {
          const errMsg = 'An error occurred while deleting the product.';
          toast(errMsg, 'error');
          return { error: errMsg };
        }
      }
    );
  };

  // Image Upload Handling
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setProductFormError('');

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const newUrls = data.urls;
        setProductImages((prev) => [...prev, ...newUrls]);
        // Set first uploaded image as default thumbnail if none selected
        if (!productThumbnail) {
          setProductThumbnail(newUrls[0]);
        }
      } else {
        const message = data.error || 'Failed to upload images';
        setProductFormError(message);
        toast(message, 'error');
      }
    } catch (err) {
      const message = 'Error uploading files';
      setProductFormError(message);
      toast(message, 'error');
    } finally {
      setUploading(false);
    }
  };

  // Remove Image from list
  const removeImage = (urlToRemove) => {
    setProductImages((prev) => prev.filter((url) => url !== urlToRemove));
    if (productThumbnail === urlToRemove) {
      const remaining = productImages.filter((url) => url !== urlToRemove);
      setProductThumbnail(remaining[0] || '');
    }
  };

  // Add / Edit Product Submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductFormError('');

    if (!productTitle.trim() || !productDescription.trim() || !productCategory) {
      const message = 'Title, description, and category are required.';
      setProductFormError(message);
      toast(message, 'error');
      return;
    }

    setSubmitting(true);

    const payload = {
      title: productTitle.trim(),
      slug: productSlug.trim(),
      category: productCategory,
      price: "",
      rating: Number(productRating),
      description: productDescription.trim(),
      note: productNote.trim(),
      highlights: productHighlights.filter((h) => h.trim() !== ''),
      hashtags: getAutoHashtags(productCategory, productTitle),
      images: productImages,
      thumbnail: productThumbnail || productImages[0] || '/placeholder.svg',
      sections: productSections,
    };

    const url = editingProduct 
      ? `/api/admin/products/${editingProduct._id}` 
      : '/api/admin/products';
      
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const message = editingProduct
          ? 'Product updated successfully!'
          : 'Product added successfully!';
        toast(message, 'success');
        fetchData();
        setIsProductModalOpen(false);
      } else {
        const message = data.error || 'Failed to save product';
        setProductFormError(message);
        toast(message, 'error');
      }
    } catch (err) {
      const message = 'An error occurred while saving the product';
      setProductFormError(message);
      toast(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Highlights input handlers
  const handleAddHighlight = () => {
    setProductHighlights([...productHighlights, '']);
  };

  const handleRemoveHighlight = (index) => {
    const next = [...productHighlights];
    next.splice(index, 1);
    setProductHighlights(next.length ? next : ['']);
  };

  const handleHighlightChange = (index, val) => {
    const next = [...productHighlights];
    next[index] = val;
    setProductHighlights(next);
  };

  const canReorderProducts =
    productCategoryFilter === 'all' && !productSearch.trim();

  // Search Filters
  const filteredProducts = products.filter((product) => {
    if (productCategoryFilter !== 'all' && product.category !== productCategoryFilter) {
      return false;
    }
    const query = productSearch.toLowerCase().trim();
    if (!query) return true;
    return (
      (product.title || '').toLowerCase().includes(query) ||
      (product.category || '').toLowerCase().includes(query) ||
      (product.slug || '').toLowerCase().includes(query) ||
      (product.hashtags || []).some(tag => tag.toLowerCase().includes(query))
    );
  });

  const resetProductDragState = () => {
    setDraggedProductId(null);
    setDragOverProductId(null);
  };

  const handleProductDragStart = (e, productId) => {
    if (!canReorderProducts || reorderSaving) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', productId);
    setDraggedProductId(productId);
  };

  const handleProductDragOver = (e, productId) => {
    if (!canReorderProducts || reorderSaving || !draggedProductId) return;
    e.preventDefault();
    if (draggedProductId !== productId) {
      setDragOverProductId(productId);
    }
  };

  const handleProductDrop = async (e, targetId) => {
    e.preventDefault();
    if (!canReorderProducts || !draggedProductId || draggedProductId === targetId) {
      resetProductDragState();
      return;
    }

    const idList = products.map((p) => p._id);
    const fromIndex = idList.indexOf(draggedProductId);
    const toIndex = idList.indexOf(targetId);
    if (fromIndex === -1 || toIndex === -1) {
      resetProductDragState();
      return;
    }

    const newIdList = [...idList];
    newIdList.splice(fromIndex, 1);
    newIdList.splice(toIndex, 0, draggedProductId);

    const idToProduct = new Map(products.map((p) => [p._id, p]));
    setProducts(newIdList.map((id) => idToProduct.get(id)).filter(Boolean));

    setReorderSaving(true);
    resetProductDragState();
    try {
      const res = await fetch('/api/admin/products/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: newIdList }),
      });
      if (res.ok) {
        toast('Product display order saved.', 'success', 3000);
      } else {
        toast('Could not save display order.', 'error');
        await fetchData();
      }
    } catch {
      toast('Could not save display order.', 'error');
      await fetchData();
    } finally {
      setReorderSaving(false);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const query = categorySearch.toLowerCase().trim();
    if (!query) return true;
    return (category.name || '').toLowerCase().includes(query);
  });

  const getCategoryProductCount = (name) =>
    products.filter((p) => p.category === name).length;

  const totalCategorizedProducts = products.filter((p) =>
    categories.some((c) => c.name === p.category)
  ).length;

  const showConfirm = (title, message, confirmCallback) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setOnConfirm(() => confirmCallback);
    setConfirmError('');
    setIsConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!onConfirm) return;
    setConfirmLoading(true);
    setConfirmError('');
    try {
      const result = await onConfirm();
      if (result && result.error) {
        setConfirmError(result.error);
        toast(result.error, 'error');
        setConfirmLoading(false);
      } else {
        setConfirmLoading(false);
        setIsConfirmOpen(false);
      }
    } catch (err) {
      const message = 'An unexpected error occurred.';
      setConfirmError(message);
      toast(message, 'error');
      setConfirmLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-roboto">
      <Toaster />
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-slate-900 text-white flex items-center justify-between p-4 sticky top-0 z-40 shadow-md">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-1.5 hover:bg-white/10 rounded-lg transition"
          title="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <img 
          src="/assets/images/erasebg-transformed.png" 
          alt="Logo" 
          className="h-8 bg-white/15 p-1 rounded" 
        />
        
        <div className="w-9" /> {/* Visual spacer balance */}
      </header>

      {/* Mobile Overlay backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-[17.5rem] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white
          flex flex-col z-50 transition-transform duration-300 transform border-r border-white/5 shadow-2xl lg:shadow-none
          lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 lg:flex shrink-0
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/assets/images/erasebg-transformed.png"
                alt="Anmol Graphics"
                className="h-10 w-10 object-contain bg-white rounded-lg p-1 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Admin</p>
                <p className="text-sm font-bold text-white truncate leading-tight">Anmol Graphics</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition text-slate-400 hover:text-white"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Management
          </p>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => {
                switchTab('products');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-white text-slate-900 shadow-lg shadow-black/25'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Package className={`w-5 h-5 shrink-0 ${activeTab === 'products' ? 'text-slate-900' : ''}`} />
              Products
            </button>
            <button
              type="button"
              onClick={() => {
                switchTab('categories');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'categories'
                  ? 'bg-white text-slate-900 shadow-lg shadow-black/25'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Grid className={`w-5 h-5 shrink-0 ${activeTab === 'categories' ? 'text-slate-900' : ''}`} />
              Categories
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Session</p>
            <p className="text-sm font-semibold text-white mt-0.5">Administrator</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto lg:max-h-screen">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 font-roboto">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              {activeTab === 'products' ? 'Products Directory' : 'Categories Directory'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-normal">
              Add, update or delete your store inventory configuration.
            </p>
          </div>

          {activeTab === 'products' && (
            <button
              type="button"
              onClick={openAddProductModal}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          )}

          {activeTab === 'categories' && (
            <button
              type="button"
              onClick={openAddCategoryModal}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          )}
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg 
              className="animate-spin h-8 w-8 text-slate-900" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm font-medium text-slate-500">Loading catalog...</span>
          </div>
        ) : (
          <>
            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                {/* Search & filters */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
                  <div className="relative flex-1 max-w-xl">
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products by title, category, slug..."
                      className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white"
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Search className="w-4 h-4" />
                    </div>
                    {productSearch && (
                      <button
                        type="button"
                        onClick={() => setProductSearch('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      Category
                    </label>
                    <select
                      value={productCategoryFilter}
                      onChange={(e) => setProductCategoryFilter(e.target.value)}
                      className="w-full sm:w-52 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white text-slate-800"
                    >
                      <option value="all">All categories</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {!canReorderProducts && products.length > 0 && (
                  <p className="text-xs text-slate-500 px-1">
                    Clear search and set category to &quot;All categories&quot; to drag and reorder how products appear on the site.
                  </p>
                )}
                {reorderSaving && (
                  <p className="text-xs font-semibold text-slate-600 px-1">Saving display order…</p>
                )}

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto max-h-[65vh] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-100 shadow-sm">
                      <tr>
                        <th className="px-3 py-4 w-10 text-xs font-bold text-slate-500 uppercase tracking-wider" title="Drag to reorder">
                          #
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-10 text-slate-400">
                            {products.length === 0 ? 'No products found. Add one to get started!' : 'No matching products found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product, displayIndex) => (
                          <tr
                            key={product._id}
                            draggable={canReorderProducts && !reorderSaving}
                            onDragStart={(e) => handleProductDragStart(e, product._id)}
                            onDragOver={(e) => handleProductDragOver(e, product._id)}
                            onDragLeave={() => {
                              if (dragOverProductId === product._id) setDragOverProductId(null);
                            }}
                            onDrop={(e) => handleProductDrop(e, product._id)}
                            onDragEnd={resetProductDragState}
                            className={`transition ${
                              draggedProductId === product._id ? 'opacity-40' : 'hover:bg-slate-50/50'
                            } ${dragOverProductId === product._id ? 'bg-slate-100 ring-1 ring-inset ring-slate-300' : ''}`}
                          >
                            <td className="px-3 py-4 text-slate-400">
                              <div className="flex items-center gap-1">
                                {canReorderProducts ? (
                                  <button
                                    type="button"
                                    className="p-1 rounded cursor-grab active:cursor-grabbing hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                                    title="Drag to reorder"
                                    onMouseDown={(e) => e.stopPropagation()}
                                  >
                                    <GripVertical className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <span className="text-xs tabular-nums pl-1">{displayIndex + 1}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={product.thumbnail || '/placeholder.svg'}
                                  alt={product.title}
                                  className="w-12 h-12 object-cover rounded-lg border border-slate-100"
                                />
                                <div>
                                  <div className="font-semibold text-slate-800">{product.title}</div>
                                  <div className="text-xs text-slate-400 font-mono mt-0.5">/{product.slug}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-slate-600 font-medium">{product.category}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < (product.rating || 5) 
                                        ? 'text-yellow-400 fill-yellow-400' 
                                        : 'text-slate-200'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => openEditProductModal(product)}
                                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                                  title="Edit Product"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product._id)}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

            {/* CATEGORIES TAB */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total categories</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">{categories.length}</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Products linked</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">{totalCategorizedProducts}</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Showing results</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">
                      {filteredCategories.length}
                      {categorySearch ? ` / ${categories.length}` : ''}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[420px]">
                  <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">All categories</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Use edit to rename — linked products update automatically.</p>
                    </div>
                    <div className="relative w-full sm:max-w-xs">
                      <input
                        type="text"
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white"
                      />
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      {categorySearch && (
                        <button
                          type="button"
                          onClick={() => setCategorySearch('')}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto flex-1 max-h-[62vh] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-12">#</th>
                          <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Category name</th>
                          <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Products</th>
                          <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredCategories.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center py-12 text-slate-400">
                              <Grid className="w-8 h-8 mx-auto mb-2 opacity-40" />
                              {categories.length === 0
                                ? 'No categories yet. Click Add Category to create one.'
                                : 'No categories match your search.'}
                            </td>
                          </tr>
                        ) : (
                          filteredCategories.map((category, index) => {
                            const productCount = getCategoryProductCount(category.name);
                            return (
                              <tr key={category._id} className="hover:bg-slate-50/60 transition">
                                <td className="px-5 py-4 text-slate-400 font-medium tabular-nums">{index + 1}</td>
                                <td className="px-5 py-4 font-semibold text-slate-800">{category.name}</td>
                                <td className="px-5 py-4">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                      productCount > 0
                                        ? 'bg-slate-100 text-slate-700'
                                        : 'bg-slate-50 text-slate-400'
                                    }`}
                                  >
                                    {productCount} {productCount === 1 ? 'product' : 'products'}
                                  </span>
                                </td>
                                <td className="px-5 py-4">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      type="button"
                                      onClick={() => startEditCategory(category)}
                                      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                                      title="Edit category"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCategory(category._id)}
                                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                      title="Delete category"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* CATEGORY FORM MODAL */}
      {isCategoryModalOpen && (
        <div
          onClick={(e) => {
            if (categorySubmitting) return;
            if (e.target === e.currentTarget) {
              closeCategoryModal();
            }
          }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold">
                  {categoryFormMode === 'edit' ? 'Edit Category' : 'Add Category'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {categoryFormMode === 'edit'
                    ? 'Renaming updates all products in this category.'
                    : 'Create a new category for your catalog.'}
                </p>
              </div>
              <button
                type="button"
                disabled={categorySubmitting}
                onClick={closeCategoryModal}
                className="p-1.5 hover:bg-white/10 rounded-lg transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {categoryModalError && (
                <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-xl mb-4 border border-red-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {categoryModalError}
                </div>
              )}

              <form onSubmit={handleCategoryFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Category name
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Identity Cards"
                    disabled={categorySubmitting}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm disabled:opacity-60"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={categorySubmitting}
                    onClick={closeCategoryModal}
                    className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={categorySubmitting}
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition disabled:opacity-60 min-w-[120px]"
                  >
                    {categorySubmitting
                      ? 'Saving...'
                      : categoryFormMode === 'edit'
                        ? 'Update'
                        : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT FORM MODAL */}
      {isProductModalOpen && (
        <div 
          onClick={(e) => {
            if (submitting) return;
            if (e.target === e.currentTarget) {
              setIsProductModalOpen(false);
            }
          }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-8 py-5 bg-slate-900 text-white flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-lg font-bold">
                {editingProduct ? 'Modify Product Listing' : 'Add New Product Listing'}
              </h2>
              <button 
                disabled={submitting}
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8">
              {productFormError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-semibold mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> {productFormError}
                </div>
              )}

              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product Title*</label>
                      <input
                        type="text"
                        required
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        placeholder="e.g. Swivel Hooks Set"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                      />
                    </div>



                    <div className="custom-select-container relative">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category*</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                            setIsRatingDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white text-left flex justify-between items-center transition shadow-sm hover:border-slate-300"
                        >
                          <span className={productCategory ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                            {productCategory || 'Select Category'}
                          </span>
                          <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {isCategoryDropdownOpen && (
                          <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 animate-in fade-in duration-100">
                            {categories.length === 0 ? (
                              <div className="px-4 py-2 text-sm text-slate-400">No categories available</div>
                            ) : (
                              categories.map((c) => (
                                <button
                                  key={c._id}
                                  type="button"
                                  onClick={() => {
                                    setProductCategory(c.name);
                                    setIsCategoryDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition flex items-center justify-between ${
                                    productCategory === c.name ? 'bg-slate-50 text-slate-900 font-semibold' : 'text-slate-600'
                                  }`}
                                >
                                  <span>{c.name}</span>
                                  {productCategory === c.name && (
                                    <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                  )}
                                </button>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="custom-select-container relative">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Admin Star Rating (1 to 5)*</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsRatingDropdownOpen(!isRatingDropdownOpen);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white text-left flex justify-between items-center transition shadow-sm hover:border-slate-300"
                        >
                          <span className="text-slate-800 font-medium flex items-center gap-1.5">
                            <span className="text-yellow-400 font-semibold">
                              {'★'.repeat(productRating)}{'☆'.repeat(5 - productRating)}
                            </span>
                            <span className="text-slate-500 text-xs">({productRating} Stars)</span>
                          </span>
                          <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isRatingDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {isRatingDropdownOpen && (
                          <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl py-1 animate-in fade-in duration-100">
                            {[5, 4, 3, 2, 1].map((ratingVal) => (
                              <button
                                key={ratingVal}
                                type="button"
                                onClick={() => {
                                  setProductRating(ratingVal);
                                  setIsRatingDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition flex items-center justify-between ${
                                  productRating === ratingVal ? 'bg-slate-50 text-slate-900 font-semibold' : 'text-slate-600'
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="text-yellow-400">
                                    {'★'.repeat(ratingVal)}{'☆'.repeat(5 - ratingVal)}
                                  </span>
                                  <span className="text-slate-400 text-xs">({ratingVal} Stars)</span>
                                </span>
                                {productRating === ratingVal && (
                                  <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>


                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description*</label>
                      <textarea
                        required
                        rows="3"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Describe the product and its target uses..."
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Highlights (List bullet points)</label>
                      <div className="space-y-2">
                        {productHighlights.map((hl, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={hl}
                              onChange={(e) => handleHighlightChange(idx, e.target.value)}
                              placeholder={`Highlight #${idx + 1}`}
                              className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveHighlight(idx)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="mt-2 text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Bullet Point
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Note (Disclaimer/Conditions)</label>
                      <textarea
                        rows="2"
                        value={productNote}
                        onChange={(e) => setProductNote(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* IMAGES UPLOAD SECTION */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Product Media</h3>
                  
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    {/* Upload Box */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer relative text-slate-500 transition aspect-[4/3] max-h-40">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        required
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="w-6 h-6 mb-2" />
                      <span className="text-xs font-bold text-center">
                        {uploading ? 'Uploading...' : 'Choose Photos'}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">Multi-upload ready</span>
                    </div>

                    {/* Previews */}
                    {productImages.map((url, idx) => (
                      <div 
                        key={idx} 
                        className={`relative rounded-2xl overflow-hidden border aspect-[4/3] max-h-40 group flex items-center justify-center bg-slate-50 ${
                          productThumbnail === url ? 'ring-4 ring-slate-900' : ''
                        }`}
                      >
                        <img 
                          src={url} 
                          alt="preview" 
                          className="w-full h-full object-cover" 
                        />
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 p-2">
                          <button
                            type="button"
                            onClick={() => setProductThumbnail(url)}
                            className="bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-slate-100"
                          >
                            {productThumbnail === url ? '★ Cover Image' : 'Set as Cover'}
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => removeImage(url)}
                            className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {productThumbnail === url && (
                          <div className="absolute top-2 left-2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" /> Cover
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION SETUP */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Section Setup</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Add rich text sections that will appear after the Note on the product page.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductSections([...productSections, { content: '' }])}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Section
                    </button>
                  </div>

                  {productSections.length === 0 ? (
                    <p className="text-xs text-slate-400 py-3 text-center border border-dashed border-slate-200 rounded-xl">No sections added yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {productSections.map((sec, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3 relative group">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-600">TEXT SECTION - {idx + 1}</span>
                            <div className="flex items-center gap-1">
                              {/* Move Up */}
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => {
                                  const next = [...productSections];
                                  const temp = next[idx];
                                  next[idx] = next[idx - 1];
                                  next[idx - 1] = temp;
                                  setProductSections(next);
                                }}
                                className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30 font-semibold"
                                title="Move Up"
                              >
                                ↑
                              </button>
                              {/* Move Down */}
                              <button
                                type="button"
                                disabled={idx === productSections.length - 1}
                                onClick={() => {
                                  const next = [...productSections];
                                  const temp = next[idx];
                                  next[idx] = next[idx + 1];
                                  next[idx + 1] = temp;
                                  setProductSections(next);
                                }}
                                className="p-1 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30 font-semibold"
                                title="Move Down"
                              >
                                ↓
                              </button>
                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => {
                                  const next = productSections.filter((_, i) => i !== idx);
                                  setProductSections(next);
                                }}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                title="Remove Section"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <TiptapEditor
                            value={sec.content}
                            onChange={(html) => {
                              const next = [...productSections];
                              next[idx] = { ...next[idx], content: html };
                              setProductSections(next);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 ${
                      submitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitting ? (
                      <>
                        <svg 
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION MODAL */}
      {isConfirmOpen && (
        <div 
          onClick={(e) => {
            if (confirmLoading) return;
            if (e.target === e.currentTarget) {
              setIsConfirmOpen(false);
            }
          }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{confirmTitle}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Confirmation Required</p>
                </div>
              </div>
              
              {confirmError && (
                <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-xl mb-4 border border-red-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {confirmError}
                </div>
              )}

              <p className="text-sm text-slate-600 leading-relaxed">
                {confirmMessage}
              </p>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={confirmLoading}
                  onClick={() => setIsConfirmOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={confirmLoading}
                  onClick={handleConfirmAction}
                  className="px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition flex items-center gap-1.5 disabled:opacity-70 shadow-sm"
                >
                  {confirmLoading ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Confirm Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getAutoHashtags(category, title) {
  const tags = new Set();
  
  // 1. Add tags based on category
  const cat = (category || '').toLowerCase().trim();
  if (cat.includes('lanyard') || cat.includes('accessory') || cat.includes('attachments')) {
    tags.add('#lanyardhooks');
    tags.add('#badgeclips');
    tags.add('#swivelhooks');
    tags.add('#idcardaccessories');
    tags.add('#idclip');
    tags.add('#lanyardclip');
    tags.add('#badgeholder');
    tags.add('#officeuse');
  } else if (cat.includes('badge') || cat.includes('pin')) {
    tags.add('#buttonbadge');
    tags.add('#roundbadge');
    tags.add('#namebadge');
    tags.add('#nametag');
    tags.add('#staffbadge');
    tags.add('#promotional');
    tags.add('#events');
    tags.add('#branding');
    tags.add('#corporate');
    tags.add('#school');
  } else if (cat.includes('card') || cat.includes('identity')) {
    tags.add('#identitycard');
    tags.add('#idcard');
    tags.add('#membershipcard');
    tags.add('#schoolid');
    tags.add('#corporateid');
    tags.add('#giftcard');
    tags.add('#privilegecard');
    tags.add('#loyaltycard');
    tags.add('#retail');
    tags.add('#security');
  } else if (cat.includes('medal') || cat.includes('award') || cat.includes('recognition')) {
    tags.add('#rosette');
    tags.add('#awardbadge');
    tags.add('#prizeday');
    tags.add('#school');
    tags.add('#eventbadge');
    tags.add('#custommedals');
    tags.add('#institutionmedal');
    tags.add('#corporategift');
    tags.add('#schoolaward');
    tags.add('#sportsmedal');
    tags.add('#marathonmedal');
    tags.add('#finishermedal');
    tags.add('#eventawards');
  } else if (cat.includes('keychain') || cat.includes('keyring')) {
    tags.add('#metalkeychain');
    tags.add('#keyring');
    tags.add('#corporategift');
    tags.add('#promotional');
    tags.add('#fabrickeychain');
    tags.add('#printedkeychain');
    tags.add('#lanyardkeychain');
    tags.add('#branding');
  } else if (cat.includes('mouse') || cat.includes('pad')) {
    tags.add('#mousepad');
    tags.add('#custommousepad');
    tags.add('#corporategift');
    tags.add('#branding');
  } else {
    tags.add('#branding');
    tags.add('#customised');
    tags.add('#promotional');
  }

  // 2. Add tags dynamically from title words
  const words = (title || '').toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['with', 'their', 'from', 'this', 'that', 'your', 'and', 'set', 'combo', 'multi', 'multiple', 'designs', 'sizes', 'premium', 'models'].includes(w));
  
  words.forEach(word => {
    tags.add('#' + word);
  });

  return Array.from(tags).slice(0, 10);
}
