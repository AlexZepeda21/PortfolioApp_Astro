import { useState, useEffect } from "react";
import axios from "axios";
import { apiRoute, projectsByCategory } from "../../../lib/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/Projects/project.css"

export default function FetchProject({ id_categoria, title }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id_categoria) return; // Evitar errores si id_categoria es null

    axios.get(projectsByCategory(id_categoria))
      .then(response => {
        setProjects(response.data.data.projects);
      })
      .catch(() => {
        setError("Ha ocurrido un error al intentar extraer los proyectos");
      });
  }, [id_categoria]);

  if (error) return <h1>{error}: Ha ocurrido un problema</h1>;
  if (projects.length === 0) return <h1>No hay proyectos para esta categoría</h1>;

  return (

    <div className="containerProjects">
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css"
      />

      <h2>Proyectos de la categoría: {title}</h2>
      <ul className="containerProjects">
        {projects.map(project => (
          project && (
            <article className="card">
              <h4>{project.type_project}</h4>
              <h3>{project.title_project}</h3>
              <p>{project.development_start_date}/{project.development_end_date}</p>
              <p>{project.image_base64}</p>
              <p>{project.image_mime}</p>
              <p>{project.description}</p>
              <p>{project.last_edition}</p>
              <div className="container">
                <div className="row">
                  <div className="col linkProject">

                    <a href={`${project.url_github}`} className="navbars">
                      <i class="fi fi-brands-github social-icon"></i>
                      Ver codigo
                    </a>
                  </div>
                  <div className="col linkProject">
                    <a href={`${project.url_site}`} className="navbars">
                      <i class="fi fi-brands-linkedin social-icon"></i>
                      Ver Website</a>
                  </div>
                  <div className="col linkProject">
                    <a href={`${project.url_download}`} className="navbars">
                      <i class="fi fi-brands-linkedin social-icon"></i>
                      Descargar App</a>
                  </div>
                </div>
              </div>
            </article>
          )
        ))}
      </ul>
      <br />
    </div>

  );
}
