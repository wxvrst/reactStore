// Redux
import { useSelector, useDispatch } from "react-redux";// Hook
import { RootState, AppDispatch } from "../store/store";// Type from store
import { addToBasket, removeFromBasket, decreaseQuantity, clearBasket } from '../store/basketSlice';// Actions
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { toggleFavourite } from "../store/favouriteSlice";
function BasketPage() {
    const dispatch = useDispatch<AppDispatch>();
    // Get data from redux store
    const products = useSelector((state: RootState) => state.products.data);
    const basketItems = useSelector((state: RootState) => state.basket.items);
    const getProductById = (id: number) => products.find(p => p.id === id);

    const favouriteItems = useSelector((state: RootState) => state.favourite.items);

    const handleSwitchFavourite = (id: number) => {
        dispatch(toggleFavourite(id));
    };
    return (
        <section
            className="flex flex-col justify-between px-10 md:flex-row gap-10 w-full">
            <div
                className="bg-neutral-900 rounded-lg p-8 my-8 w-full  border-1 border-neutral-800"
            >
                <div
                    className="flex justify-between items-center"
                >
                    <h1
                        className="text-2xl"
                    >
                        Basket&nbsp;
                        <span
                            className="text-base text-neutral-400"
                        >
                            {basketItems.length} products
                        </span>
                    </h1>
                    {basketItems.length > 0 && (
                        <Button
                            variant="outlined"
                            onClick={() => dispatch(clearBasket())}
                        >
                            Clear basket
                        </Button>
                    )}
                </div>

                <ul
                    className="flex flex-col gap-4 mt-4"
                >
                    {basketItems.map(({ productId, quantity }) => {
                        const product = getProductById(productId);
                        if (!product) { return null; }
                        const isInFavourite = favouriteItems.includes(product.id);
                        return (
                            <li
                                className="flex gap-4 bg-neutral-800 p-4 rounded-lg justify-between"
                                key={productId}
                                style={{ marginBottom: 12 }}
                            >
                                <div
                                    className="flex flex-row justify-between gap-2"
                                >
                                    <img
                                        className="w-46 h-46 rounded-lg"
                                        src={product.image}
                                    />
                                    <div
                                        className="flex flex-col gap-2 justify-between"
                                    >
                                        <div>
                                            <h1
                                                className="text-lg max-w-86 max-h-8 truncate"
                                            >
                                                {product.title}
                                            </h1>
                                            <h2
                                                className="text-lg max-w-86"
                                            >
                                                <span className="text-amber-300">★</span>{product.rating.rate}
                                            </h2>
                                        </div>

                                        <div
                                            className="flex gap-4"
                                        >
                                            <IconButton
                                                aria-label="favourite"
                                                color="primary"
                                                onClick={() => handleSwitchFavourite(product.id)}
                                            >
                                                {isInFavourite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                color="primary"
                                                onClick={() => dispatch(removeFromBasket(productId))}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="flex items-baseline justify-between w-62"
                                >
                                    <div>
                                        <IconButton
                                            aria-label="increase"
                                            color="primary"
                                            onClick={() => dispatch(decreaseQuantity(productId))}
                                            disabled={quantity > 1 ? false : true}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <span
                                            className="mx-4"
                                        >{quantity}</span>
                                        <IconButton

                                            aria-label="decrease"
                                            color="primary"
                                            onClick={() => dispatch(addToBasket(productId))}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                    <Typography
                                        className="font-bold mx-4"
                                        color='primary'
                                    >
                                        {product.price * quantity} $
                                    </Typography>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div
                className="bg-neutral-900 rounded-lg p-8 my-8 w-[24vw] border-1 border-neutral-800 h-full"
            >
                <h1
                    className="text-2xl mb-4 text-center"
                >
                    Sumbit order
                </h1>
                <h2>
                    Delivery to pick-up point
                </h2>

            </div>
        </section>
    );
}
export default BasketPage;