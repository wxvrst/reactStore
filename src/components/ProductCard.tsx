import { useNavigate } from "react-router-dom";

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
    return (
      <li
        className="flex flex-col relative rounded-2xl p-2 text-left cursor-pointer group hover:bg-neutral-700"
        key={product.id}
        onClick={() => navigate(`/card-info/${product.id}`)}
      >
        <img
          className="h-full max-h-84 max-w-96 rounded-xl"
          src={product.image}
          alt="image"
        />
        <button
          className="invisible group-hover:visible absolute top-76 w-[90%] place-self-center rounded-lg
          border-transparent border-1 transition-colors duration-250 hover:border-blue-500 bg-neutral-800
          py-1 px-4 my-1 cursor-pointer"
          onClick={() => navigate(`/card-info/${product.id}`)}
        >
          More info
        </button>
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-orange-500 font-bold">{product.price} $</span>
          <span>
            <span className="text-green-500">{product.rating.count}</span>-items left
          </span>
          <span className="truncate">{product.title}</span>
          <span>
            <span className="text-amber-300">★</span>{product.rating.rate}
          </span>
        </div>
      </li>
    );
  }
  
  export default Product;