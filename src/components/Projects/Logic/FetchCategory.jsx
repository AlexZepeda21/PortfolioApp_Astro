import { useEffect, useState } from "react";
import axios from "axios";
import { apiRoute } from "../../../lib/api";
import "../../../styles/Categories/categories.css";

export default function FetchCategory({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(apiRoute.categoriesProject)
      .then(response => {
        setCategories(response.data);
      })
      .catch(() => {
        setError("Error al cargar categorías");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>Cargando categorías...</h1>;
  if (error) return <h1>{error}</h1>;
  if (categories.length === 0) return <h1>No hay categorías disponibles</h1>;

  return (
    <div className="container">
      <ul className="list">
        {categories.map(category => (
          category && (
            <li key={category.id_project_category} >
              <button
                onClick={() => onSelectCategory(category)} 
                className="item"
              >
                {category.title}
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}
