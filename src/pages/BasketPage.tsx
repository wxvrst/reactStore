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
import React from "react";
function BasketPage() {
    const dispatch = useDispatch<AppDispatch>();
    // Get data from redux store
    const products = useSelector((state: RootState) => state.products.data);
    const basketItems = useSelector((state: RootState) => state.basket.items);

    const getProductById = (id: number) => products.find(p => p.id === id);
    const [isInFavourite, setIsInFavourite] = React.useState<boolean>(false);
    const handleSwitchFavourite = () => {
        setIsInFavourite(!isInFavourite);
    }
    return (
        <section>
            <div
                className="bg-neutral-900 rounded-lg p-8 w-[80%] my-8 mx-auto"
            >
                <h1
                    className="text-2xl mb-4"
                >
                    Basket
                </h1>
                {basketItems.length === 0 &&
                    <h2
                        className="text-2xl text-center"
                    >
                        Basket is empty
                    </h2>
                }
                {basketItems.length > 0 && (
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(clearBasket())}
                    >
                        Clear basket
                    </Button>
                )}
                <ul
                    className="flex flex-col gap-4 mt-4"
                >
                    {basketItems.map(({ productId, quantity }) => {
                        const product = getProductById(productId);
                        if (!product) { return null; }
                        return (
                            <li
                                className="flex gap-4 bg-neutral-800 p-4 rounded-lg"
                                key={productId}
                                style={{ marginBottom: 12 }}
                            >
                                <img
                                    className="w-46 h-46 rounded-lg"
                                    src={product.image}
                                />
                                <div
                                    className="flex flex-col justify-between"
                                >
                                    <div
                                        className="flex flex-col gap-2"
                                    >
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
                                            onClick={handleSwitchFavourite}
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
                                    <span
                                        className="text-orange-500 font-bold mx-4"
                                    >
                                        {product.price * quantity} $
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>

            </div>
        </section>
    );
}
export default BasketPage;