// Common hooks
import React, { useEffect } from 'react';
// Components
import Sortbar from '../components/Sortbar';
import ProductCard from '../components/ProductCard';
// Redux
import { useSelector, useDispatch } from 'react-redux';// Hooks
import { RootState, AppDispatch } from '../store/store';// Types from store
import { fetchProducts, setSelectedCategory, setSearchQuery } from '../store/productsSlice';// Actions
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import secretImg from '../assets/images/secret.jpg';
interface MainPageProps {
    secretBgActive: boolean;
}
const MainPage: React.FC<MainPageProps> = ({ secretBgActive }) => {
    // Get dispatch with type of AppDispatch
    const dispatch = useDispatch<AppDispatch>();
    // Cards view
    const [view, setView] = React.useState<string | null>('grid');
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
    // Cards view change function
    const handleView = (
        // @ts-ignore
        event: React.MouseEvent<HTMLElement>,
        newView: string | null,
    ) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    //Component render
    return (
        <section
            className={
                (secretBgActive
                    ? `bg-url[${secretImg}] bg-cover bg-fixed bg-center`
                    : "bg-neutral-950") +
                " p-4 flex flex-col gap-4 md:px-12"
            }
            style={
                secretBgActive
                    ? { backgroundImage: `url(${secretImg})` }
                    : undefined
            }
        >
            <Sortbar
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
            />
            <div
                className={
                    "flex flex-col items-center bg-neutral-900/60 rounded-md p-2 gap-4 border-1 border-neutral-800"
                }
            >
                <div
                    className="flex justify-between w-full px-2 flex-col md:flex-row"
                >
                    <h1
                        className="text-xl mt-2 text-neutral-200"
                    >
                        Here are some things you might like:
                    </h1>
                    <div
                        className="flex items-center gap-2"
                    >
                        <span
                            className="text-neutral-400"
                        >
                            View

                        </span>
                        <ToggleButtonGroup
                            size="small"
                            value={view}
                            exclusive
                            onChange={handleView}
                            aria-label="cards view"
                        >
                            <ToggleButton
                                value="grid"
                                aria-label="grid"
                                color="primary"
                            >
                                <GridViewIcon />
                            </ToggleButton>
                            <ToggleButton
                                value="list"
                                aria-label="list"
                                color="primary"
                            >
                                <ViewListIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <TextField
                            className="w-80 bg-neutral-800"
                            label="Search"
                            size="small"
                            type="text"
                            placeholder="Enter product name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredData.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default MainPage;
