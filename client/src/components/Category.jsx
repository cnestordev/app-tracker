import "../styles/Category.css";
import { Briefcase } from "react-feather";

const Category = ({ handleFilter, category }) => {
  return (
    <div
      onClick={() => handleFilter(category)}
      className="category-container light"
    >
      <Briefcase />
      <h3>{category.name}</h3>
    </div>
  );
};

export default Category;
