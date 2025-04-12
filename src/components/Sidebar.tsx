interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Sidebar({ categories, selectedCategory, handleCategoryChange }: SidebarProps) {
  return (
    <section className="w-60 flex flex-col gap-4">
      <h2 className="text-xl">Categories</h2>
      <select
        className="border-1 rounded-md bg-neutral-800 w-60"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option className="bg-neutral-700" value="">All categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </section>
  );
}

export default Sidebar;