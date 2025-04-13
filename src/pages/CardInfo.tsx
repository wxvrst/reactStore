import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { apiUrl, Product } from '../pages/MainPage';
import { useEffect, useState } from "react";

function CardInfo() {
    const params = useParams();
    const productID = params.productID;
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Product[]>(apiUrl);
                const currentProduct = productID && response.data.find((item) => item.id === parseInt(productID, 10));
                if (currentProduct) {
                    setProduct(currentProduct);
                } else {
                    setError("Продукт не найден");
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    setError(error.message);
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Неизвестная ошибка");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productID]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <>
            <div
                className="flex sm:flex-row p-6 gap-4 flex-col"
            >
                <img
                    className="h-64 w-56 rounded-xl "
                    src={product?.image}
                    alt="image"
                />

                <div className="flex flex-col mt-1 gap-2">

                    <span
                        className="text-2xl mb-2"
                    >
                        {product?.title}
                    </span>
                    <span
                        className="text-lg"
                    >
                        {product?.description}
                    </span>
                    <span
                        className="text-orange-500 font-bold"
                    >
                        {product?.price} $
                    </span>
                    <span>
                        <span
                            className="text-green-500"
                        >
                            {product?.rating.count}
                        </span>-items left
                    </span>
                    <span>
                        <span
                            className="text-amber-300"
                        >
                            ★
                        </span>
                        {product?.rating.rate}
                    </span>
                    <div
                    className="flex gap-4"
                    >
                        <button
                            className="w-28 rounded-lg border-transparent border-1 transition-colors duration-250
                         hover:border-blue-500 bg-neutral-800 py-2 cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                        <button
                            className="w-28 rounded-lg border-transparent border-1 transition-colors duration-250
                         hover:border-blue-500 bg-neutral-800 py-2 cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            Add to basket
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
}
export default CardInfo;