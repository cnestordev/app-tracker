import "../styles/Category.css";
import { Tag } from "react-feather";

const Category = ({ handleFilter, category, activeCategory }) => {
  return (
    <div
      onClick={() => handleFilter(category)}
      className={`category-container light blue ${
        activeCategory._id === category._id ? "active" : ""
      }`}
    >
      <Tag />
      <h3>{category.value}</h3>
    </div>
  );
};

export default Category;
