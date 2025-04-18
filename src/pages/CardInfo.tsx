// Common hooks
import { useEffect, useState } from "react";
// Router hooks
import { useNavigate, useParams } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";// Hook
import { RootState } from "../store/store";// Type from store
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addToBasket } from '../store/basketSlice';
import Button from "@mui/material/Button";

const CardInfo: React.FC = () => {
    // Navigatore initializing 
    const navigate = useNavigate();
    // Get productID from url (/card-info/:productID)
    const { productID } = useParams<{ productID: string }>();
    // Get data from redux store
    const { data, loading, error } = useSelector((state: RootState) => state.products);
    // Variables- local states
    const [product, setProduct] = useState<typeof data[0] | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    // Searching for product by id
    useEffect(() => {
        if (productID) {
            const found = data.find(p => p.id === parseInt(productID, 10));
            if (found) {
                setProduct(found);
                setLocalError(null);
            } else {
                setLocalError("Product is not found");
            }
        } else {
            setLocalError("Product ID not specified");
        }
    }, [data, loading, productID]);
    // Loading and errors renders
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (localError) return <div>{localError}</div>;
    if (!product) return null;
    // Add to basket
    const dispatch = useDispatch<AppDispatch>();
    // Component render
    return (
        <div className="flex sm:flex-row p-6 gap-4 flex-col bg-neutral-900 m-4 rounded-lg">
            <img className="h-64 w-56 rounded-xl" src={product.image} alt={product.title} />
            <div className="flex flex-col mt-1 gap-2">
                <span className="text-2xl mb-2">{product.title}</span>
                <span className="text-lg">{product.description}</span>
                <span className="text-orange-500 font-bold">{product.price} $</span>
                <span>
                    <span className="text-green-500">{product.rating.count}</span>-items left
                </span>
                <span>
                    <span className="text-amber-300">★</span>
                    {product.rating.rate}
                </span>
                <div className="flex gap-4">
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(addToBasket(product.id))}
                    >
                        Add to basket
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CardInfo;