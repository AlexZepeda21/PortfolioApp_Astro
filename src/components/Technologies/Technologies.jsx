import { useEffect, useState } from "react"
import axios from "axios"
import { apiRoute } from "../../lib/api"

export default function Technologies() {
    const [technologies, setTechnologies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hoveredTech, setHoveredTech] = useState(null);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await axios.get(apiRoute.technologies)
                setTechnologies(response.data)
            } catch (error) {
                setError("Ha ocurrido un error: " + error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTechnologies()
    }, [])

    // Función para convertir base64 a URL de imagen
    const getImageSrc = (base64, mime) => {
        return `data:${mime};base64,${base64}`
    }

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <h1 className="text-xl text-white">Cargando, por favor espere...</h1>
            </div>
        )

    if (error)
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <h1 className="text-xl text-red-500">{error}</h1>
            </div>
        )

    if (technologies.length === 0)
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <h1 className="text-xl text-white">Sin tecnologías</h1>
            </div>
        )

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full rounded-xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-10 text-center text-gray-400">Stack</h2>

                {/* Contenedor de tecnologías - usando display: inline-block */}
                <div className="text-center">
                    {technologies.map((tech, index) => {
                        const isHovered = hoveredTech === index
                        const techColor = getLogoColor(tech.name_technology)

                        return (
                            <div
                                key={index}
                                className="inline-block relative m-4"
                                onMouseEnter={() => setHoveredTech(index)}
                                onMouseLeave={() => setHoveredTech(null)}
                                style={{ width: "60px", height: "60px", verticalAlign: "top" }}
                            >
                                <div
                                    className={`w-12 h-12 mx-auto flex items-center justify-center rounded-full transition-all duration-300 ${isHovered ? "scale-125 z-10" : ""
                                        }`}
                                    style={{
                                        background: isHovered
                                            ? `radial-gradient(circle, rgba(10,15,29,0) 0%, rgba(10,15,29,0) 40%, ${techColor}40 70%, rgba(10,15,29,0) 100%)`
                                            : "transparent",
                                    }}
                                >
                                    {/* Efecto de brillo exterior */}
                                    {isHovered && (
                                        <div
                                            className="absolute inset-0 rounded-full blur-md -z-10"
                                            style={{
                                                backgroundColor: techColor,
                                                opacity: 0.4,
                                                transform: "scale(1.3)",
                                            }}
                                        ></div>
                                    )}

                                    {/* Círculo de fondo */}
                                    <div
                                        className={`absolute inset-0 rounded-full transition-all duration-300 ${tech.name_technology.toLowerCase() === "linux" ? "border-2 border-[#FCC624]" : ""
                                            }`}
                                        style={{
                                            backgroundColor: "#1a2236",
                                            boxShadow: isHovered ? `0 0 15px 2px ${techColor}80` : "none",
                                        }}
                                    ></div>

                                    {tech.image_base64 ? (
                                        <img
                                        src={getImageSrc(tech.image_base64, tech.image_mime)}
                                        alt={tech.name_technology}
                                        className="w-7 h-7 object-contain z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    />
                                    
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center z-10 relative">
                                            <span className="text-xs text-gray-400">Sin imagen</span>
                                        </div>
                                    )}
                                </div>

                                {/* Nombre de la tecnología - solo visible en hover */}
                                <div
                                    className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    <p className="text-xs text-white whitespace-nowrap">{tech.name_technology}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// Función para asignar colores a los logos según la tecnología
function getLogoColor(techName) {
    const techColors = {
        // Frontend
        HTML: "#E44D26",
        CSS: "#264DE4",
        JavaScript: "#F7DF1E",
        TypeScript: "#3178C6",
        React: "#61DAFB",
        Vue: "#4FC08D",
        Angular: "#DD0031",
        TailwindCSS: "#38B2AC",
        SASS: "#CC6699",
        Figma: "#F24E1E",

        // Backend
        PHP: "#777BB4",
        Node: "#339933",
        Laravel: "#FF2D20",
        Express: "#000000",
        MySQL: "#4479A1",
        MongoDB: "#47A248",
        "Next.js": "#000000",
        Nginx: "#009639",
        Apache: "#D22128",

        // Otros
        Python: "#3776AB",
        Astro: "#FF5D01",
        Docker: "#2496ED",
        Git: "#F05032",
        GitHub: "#181717",
        VSCode: "#007ACC",
        npm: "#CB3837",
        WordPress: "#21759B",
        Linux: "#FCC624",
        Firebase: "#FFCA28",
        Flutter: "#02569B",
    }

    // Buscar coincidencias parciales en el nombre
    for (const [key, color] of Object.entries(techColors)) {
        if (techName.toLowerCase().includes(key.toLowerCase())) {
            return color
        }
    }

    // Color por defecto si no hay coincidencia
    return "#6e6e6e"
}
