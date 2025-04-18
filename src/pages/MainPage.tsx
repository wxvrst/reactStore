// Common hooks
import React, { useEffect } from 'react';
// Components
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
// Redux
import { useSelector, useDispatch } from 'react-redux';// Hooks
import { RootState, AppDispatch } from '../store/store';// Types from store
import { fetchProducts, setSelectedCategory, setSearchQuery } from '../store/productsSlice';// Actions
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const MainPage = () => {
    // Get dispatch with type of AppDispatch
    const dispatch = useDispatch<AppDispatch>();
    // Get data from redux store
    const { data, loading, error, categories, selectedCategory, searchQuery } = useSelector(
        // Take only part of the state- 'products' (we dont need 'users' here)
        (state: RootState) => state.products
    );
    // Effect for loading data on mounting
    useEffect(() => {
        // Load data only if it's not there and loading is not in the progress
        if (data.length === 0 && !loading) {
            // Launching async
            dispatch(fetchProducts());
        }
        //Dependencies 
    }, [data, loading, dispatch]);
    // Products filter
    const filteredData = data.filter(product => {
        const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
        const searchMatch = product.title.toLowerCase().includes(searchQuery);
        return categoryMatch && searchMatch;
    });
    // Handler of search change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };
    // Handler of category change
    const handleCategoryChange = (e: SelectChangeEvent) => {
        dispatch(setSelectedCategory(e.target.value));
    };
    // Loading and errors renders
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    //Component render
    return (
        <section className="bg-neutral-950 p-4 flex flex-col gap-4 md:px-24">
            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
            />
            <div className="flex flex-col items-center bg-neutral-900 rounded-xl p-2 gap-4">
                <h1 className="text-4xl">Product List:</h1>
                <TextField
                    label="Search"
                    size="small"
                    type="text"
                    placeholder="Enter product name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredData.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default MainPage;
