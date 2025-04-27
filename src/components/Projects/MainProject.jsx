import { useState } from "react";
import FetchCategory from "./Logic/FetchCategory";
import FetchProject from "./Logic/FetchProject";
import "../../styles/Projects/main.css";

export default function MainProject() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {/* Mostrar las categorías */}
      <div className="categorylist">
        <FetchCategory onSelectCategory={handleSelectCategory} />
      </div>

      {/* Mostrar los proyectos solo de la categoría seleccionada */}
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
