const API_URL = "http://127.0.0.1:8000/api";

export const apiRoute = {
    categoriesProject:`${API_URL}/projectCategory`, 
    projects:`${API_URL}/project`,
};

export function projectsByCategory(id_project_category) {
    return `${API_URL}/category/${id_project_category}/projects`;
  }
  