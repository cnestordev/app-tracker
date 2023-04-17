import "../styles/Category.css";

const Category = ({ handleFilter, category, activeCategory }) => {
  return (
    <div
      onClick={() => handleFilter(category)}
      className={`category-container light blue ${
        activeCategory._id === category._id ? "active" : ""
      }`}
    >
      <span className="cat-count">{category.applications.length}</span>
      <h3>{category.value}</h3>
    </div>
  );
};

export default Category;
