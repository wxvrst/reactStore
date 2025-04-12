import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';

interface Product {
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

function App() {
	const [data, setData] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [categories, setCategories] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');

	const apiUrl = "https://fakestoreapi.com/products";

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
	//https://fakestoreapi.com/products/category/<категория>
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(event.target.value);
	};

	const filteredData = data.filter(product => {
		const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
		const searchMatch = product.title.toLowerCase().includes(searchQuery);
		return categoryMatch && searchMatch;
	});

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value.toLowerCase());
	};

	return (
		<>
			<main
				className="flex flex-row p-2 gap-24"
			>
				{/* Side filters section */}
				<Sidebar
					categories={categories}
					selectedCategory={selectedCategory}
					handleCategoryChange={handleCategoryChange}
				/>
				{/* Center list section */}
				<section>
					<h1
						className="mb-4 text-4xl"
					>
						Product List:
					</h1>
					<input
						className="bg-neutral-800 border-1 rounded-2xl px-2 py-1 my-4 w-64"
						type="text"
						placeholder="Enter product name"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mr-6">
						{filteredData.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</ul>
				</section>
			</main>
		</>
	);
}

export default App;
