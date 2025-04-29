import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addToBasket } from '../store/basketSlice';
import { IconButton, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { toggleFavourite } from "../store/favouriteSlice";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        image: string;
        rating: {
            rate: number;
            count: number;
        };
    };
}

function Product({ product }: ProductCardProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const basketItems = useSelector((state: RootState) => state.basket.items);
    const isInBasket = basketItems.some(item => item.productId === product.id);

    const favouriteItems = useSelector((state: RootState) => state.favourite.items);
    const isInFavourite = favouriteItems.includes(product.id);

    const handleSwitchFavourite = (id: number) => {
        dispatch(toggleFavourite(id));
    };
    
    return (
        <li
            className="flex flex-col relative rounded-lg p-2 text-left cursor-pointer group hover:bg-neutral-800"
            key={product.id}
            onClick={() => navigate(`/reactStore/card-info/${product.id}`)}
        >
            <img
                className="h-full max-h-80 max-w-96 rounded-lg"
                src={product.image}
                alt="image"
            />
            <div
                className="absolute right-2"
            >
                <IconButton
                    aria-label="favourite"
                    color="primary"
                    onClick={(event) => {
                        event.stopPropagation(); // Cancel <li> onClick
                        handleSwitchFavourite(product.id)
                    }}
                >
                    {isInFavourite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                </IconButton>
            </div>

            <div className="flex flex-col gap-1 mt-1">
                <Typography
                    className="font-bold"
                    color='primary'
                >
                    {product.price} $
                </Typography>
                <span className="truncate">{product.title}</span>
                <span>
                    <span className="text-amber-300">★</span>{product.rating.rate}&nbsp;
                    <span className="text-neutral-400 text-sm">{product.rating.count}&nbsp;ratings</span>
                </span>
                <Button
                    className="h-10 w-full"
                    size="small"
                    variant="outlined"
                    disabled={isInBasket}
                    onClick={(event) => {
                        event.stopPropagation(); // Cancel <li> onClick
                        dispatch(addToBasket(product.id));
                    }}
                >
                    {isInBasket ? 'Already added' : 'Add to basket'}
                </Button>
                
            </div>
        </li>
    );
}

export default Product;