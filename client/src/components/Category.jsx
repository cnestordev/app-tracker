import "../styles/Category.css";
import { Briefcase } from "react-feather";

const Category = (props) => {
  return (
    <div className="category-container light">
      <Briefcase />
      <h3>Category</h3>
    </div>
  );
};

export default Category;
