import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
export const apiUrl = "https://fakestoreapi.com/products";
function MainPage() {

    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Product[]>(apiUrl);
                setData(response.data);

                setCategories([...new Set(response.data.map(product => product.category))]);

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Неизвестная ошибка");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    const filteredData = data.filter(product => {
        const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
        const searchMatch = product.title.toLowerCase().includes(searchQuery);
        return categoryMatch && searchMatch;
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
    return (
        <section
            className="bg-neutral-950 p-4 flex flex-col gap-4 md:px-24"
        >
            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
            />
            <div 
            className="flex flex-col items-center bg-neutral-900 rounded-xl p-2"
            >
                <h1
                    className="mb-4 text-4xl"
                >
                    Product List:
                </h1>
                <input
                    className="border-1 rounded-lg px-2 py-1 my-4 w-64"
                    type="text"
                    placeholder="Enter product name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            </div>

        </section>

    );
}
export default MainPage;