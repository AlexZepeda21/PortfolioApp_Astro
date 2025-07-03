import { useState } from "react";
import FetchCategory from "./Logic/FetchCategory";
import FetchProject from "./Logic/FetchProject";
import "../../styles/Projects/main.css";

export default function MainProject() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="categorylist">
        <FetchCategory onSelectCategory={handleSelectCategory} />
      </div>

      {selectedCategory && (
        <div className="projectlist">
          <FetchProject
            id_categoria={selectedCategory.id_project_category}
            title={selectedCategory.title}
          />
        </div>
      )}


    </div>
  );
}
