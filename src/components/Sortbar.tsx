import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortbarProps {
	categories: string[];
	selectedCategory: string;
	handleCategoryChange: (event: SelectChangeEvent) => void;
}

function Sidebar({ categories, selectedCategory, handleCategoryChange }: SortbarProps) {
	return (
		<Box className="flex flex-col gap-4 bg-neutral-900/60 p-4 rounded-md border-1 border-neutral-800 ">
			<FormControl fullWidth size="small">
				<InputLabel id="select-label">Categories</InputLabel>
				<Select
					labelId="select-label"
					className="w-60 bg-neutral-800"
					value={selectedCategory}
					label="All categories"
					onChange={handleCategoryChange}
				>
					<MenuItem value="">All categories</MenuItem>
					{categories.map((category, index) => (
						<MenuItem key={index} value={category}>{category}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

export default Sidebar;