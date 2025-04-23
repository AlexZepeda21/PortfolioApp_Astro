import { useState } from "react";
import FetchCategory from "./Logic/FetchCategory";
import FetchProject from "./Logic/FetchProject";

export default function MainProject() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {/* Mostrar las categorías */}
      <div>
        <FetchCategory onSelectCategory={handleSelectCategory} />
      </div>

      {/* Mostrar los proyectos solo de la categoría seleccionada */}
      {selectedCategory && (
        <div>
          <FetchProject
            id_categoria={selectedCategory.id_project_category}
            title={selectedCategory.title}
          />
        </div>
      )}
    </div>
  );
}
