import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addToBasket } from "../store/basketSlice";
import { toggleFavourite } from "../store/favouriteSlice";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const CardInfo: React.FC = () => {
    const [product, setProduct] = useState<typeof data[0] | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { productID } = useParams<{ productID: string }>();
    const { data, loading, error } = useSelector((state: RootState) => state.products);
    const basketItems = useSelector((state: RootState) => state.basket.items);
    const favouriteItems = useSelector((state: RootState) => state.favourite.items);

    const isInBasket = product ? basketItems.some(item => item.productId === product.id) : false;
    const isInFavourite = product ? favouriteItems.includes(product.id) : false;

    const handleSwitchFavourite = (id: number) => {
        dispatch(toggleFavourite(id));
    };

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (localError) return <div>{localError}</div>;
    if (!product) return null;

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
                        size="small"
                        variant="outlined"
                        disabled={isInBasket}
                        onClick={(event) => {
                            event.stopPropagation();
                            dispatch(addToBasket(product.id));
                        }}
                    >
                        {isInBasket ? 'Already added' : 'Add to basket'}
                    </Button>
                    <IconButton
                        aria-label="favourite"
                        color="primary"
                        onClick={() => handleSwitchFavourite(product.id)}
                    >
                        {isInFavourite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
