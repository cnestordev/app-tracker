import "../styles/Category.css";
import { ACTIVE } from "../utils/constants";
import { useSelector } from "react-redux";

const Category = ({ handleFilter, category, activeCategory }) => {
  const theme = useSelector((state) => state.user.theme.type);

  return (
    <div
      onClick={() => handleFilter(category)}
      className={`category-container ${theme} ${
        activeCategory._id === category._id ? ACTIVE : ""
      }`}
    >
      <span className="cat-count">{category.applications.length}</span>
      <h3>{category.value}</h3>
    </div>
  );
};

export default Category;
