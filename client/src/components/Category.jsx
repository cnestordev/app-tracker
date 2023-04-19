import "../styles/Category.css";
import { ACTIVE } from "../utils/constants";

const Category = ({ handleFilter, category, activeCategory }) => {
  return (
    <div
      onClick={() => handleFilter(category)}
      className={`category-container lightblue ${
        activeCategory._id === category._id ? ACTIVE : ""
      }`}
    >
      <span className="cat-count">{category.applications.length}</span>
      <h3>{category.value}</h3>
    </div>
  );
};

export default Category;
