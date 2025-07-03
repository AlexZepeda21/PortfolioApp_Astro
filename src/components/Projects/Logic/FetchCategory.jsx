import { useEffect, useState } from "react";
import axios from "axios";
import { apiRoute } from "../../../lib/api";
import "../../../styles/Categories/categories.css"

export default function FetchCategory({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    axios.get(apiRoute.categoriesProject)
      .then(response => {
        setCategories(response.data);
        // Opcionalmente, establecer la primera categoría como activa por defecto
        if (response.data.length > 0) {
          setActiveCategory(response.data[0].id_project_category);
        }
      })
      .catch(() => {
        setError("Error al cargar categorías");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.id_project_category);
    onSelectCategory(category);
  };

  if (loading) {
    return (
      <div className="categories-loading">
        <div className="loading-spinner"></div>
        <p>Cargando categorías...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="categories-error">
        <p>{error}</p>
      </div>
    );
  }
  
  if (categories.length === 0) {
    return (
      <div className="categories-empty">
        <p className="noElement">No hay categorías disponibles</p>
      </div>
    );
  }

  return (
    <div className="categories-container">
      <nav className="categories-nav">
        <ul className="categories-list">
          {categories.map(category => (
            category && (
              <li key={category.id_project_category} className="category-item">
                <button
                  onClick={() => handleCategoryClick(category)} 
                  className={`category-button ${activeCategory === category.id_project_category ? 'active' : ''}`}
                  aria-current={activeCategory === category.id_project_category ? 'page' : undefined}
                >
                  <span className="category-text">{category.title}</span>
                  {activeCategory === category.id_project_category && (
                    <span className="active-indicator"></span>
                  )}
                </button>
              </li>
            )
          ))}
        </ul>
      </nav>
      
      <style jsx>{`
        .categories-container {
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
        }
        
        .categories-nav {
          position: relative;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        .categories-nav::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        .categories-list {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 0.5rem;
        }
        
        .category-item {
          position: relative;
        }
        
        .category-button {
          position: relative;
          background: rgba(79, 107, 218, 0.1);
          border: 1px solid rgba(79, 107, 218, 0.2);
          color: #ffffff;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: max-content;
        }
        
        .category-button:hover {
          background: rgba(79, 107, 218, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 107, 218, 0.15);
        }
        
        .category-button.active {
          background: linear-gradient(135deg, rgba(79, 107, 218, 0.25), rgba(167, 139, 250, 0.25));
          border: 1px solid rgba(79, 107, 218, 0.4);
          box-shadow: 0 4px 15px rgba(79, 107, 218, 0.2);
          font-weight: 600;
        }
        
        .category-text {
          position: relative;
          z-index: 1;
        }
        
        .active-indicator {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 3px;
          background: linear-gradient(to right, #4f6bda, #a78bfa);
          border-radius: 3px 3px 0 0;
        }
        
        /* Estados de carga y error */
        .categories-loading,
        .categories-error,
        .categories-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #a0a0b0;
          text-align: center;
          background: rgba(10, 10, 15, 0.3);
          border-radius: 8px;
          border: 1px solid rgba(79, 107, 218, 0.1);
        }
        
        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(79, 107, 218, 0.3);
          border-radius: 50%;
          border-top-color: #4f6bda;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .categories-container {
            margin: 1rem 0;
          }
          
          .categories-list {
            padding: 0.5rem;
          }
          
          .category-button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}