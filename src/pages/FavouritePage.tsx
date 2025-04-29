import { useSelector } from 'react-redux';// Hooks
import { RootState } from '../store/store';// Types from store
import ProductCard from '../components/ProductCard';

function FavouritePage() {
    // Get data from redux store
    const products = useSelector((state: RootState) => state.products.data);
    const favouriteItems = useSelector((state: RootState) => state.favourite.items);
    const getProductById = (id: number) => products.find(p => p.id === id);

    return (
        <div
            className="flex flex-col items-center bg-neutral-900 rounded-md my-12 mx-24 gap-4 border-1 border-neutral-800"
        >
            <h1
                className="text-2xl pt-6"
            >
                Favourite&nbsp;
                <span
                    className="text-base text-neutral-400"
                >
                    {favouriteItems.length} products
                </span>
            </h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                {favouriteItems.map((productId) => {
                    const product = getProductById(productId);
                    if (!product) { return null; }
                    return (<ProductCard key={product.id} product={product} />)
                })}
            </ul>
        </div>
    );
}
export default FavouritePage;