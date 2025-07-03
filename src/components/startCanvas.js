const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Función para crear las estrellas fijas
function generateStars(numStars) {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5, // Estrellas de tamaños variados
            alpha: Math.random() * 0.2 + 0.3, // Transparencia para hacerlo sutil
        });
    }
    return stars;
}

// Estrellas fugaces
function createShootingStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 50 + 50, // Longitud de las estrellas fugaces
        opacity: 1,
        speed: Math.random() * 3 + 2, // Velocidad aleatoria
        angle: (Math.random() * Math.PI) / 4 + Math.PI / 8, // Ángulo aleatorio para las fugaces
    };
}

// Dibuja las estrellas fijas
function drawStars(stars) {
    // Hacer que las estrellas "parpadeen"
    stars.forEach((star) => {
        star.alpha += (Math.random() - 0.5) * 0.02; // Variar ligeramente la opacidad
        star.alpha = Math.max(0.3, Math.min(1, star.alpha)); // Limitar el rango de opacidad
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
}

// Dibuja las estrellas fugaces
function drawShootingStars(shootingStars) {
    shootingStars.forEach((star) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
            star.x - star.length * Math.cos(star.angle),
            star.y - star.length * Math.sin(star.angle),
        );
        // Ajustar el grosor y opacidad
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 1; // Más grosor
        ctx.shadowBlur = 5; // Añadir un efecto de brillo
        ctx.shadowColor = "white";
        ctx.stroke();
        ctx.shadowBlur = 0; // Reiniciar el brillo para otros elementos
    });
}

// Animación y actualización
let stars = generateStars(200); // 200 estrellas fijas
let shootingStars = [];
setInterval(() => {
    shootingStars.push(createShootingStar()); // Crear una nueva estrella fugaz cada 3 segundos
}, 3000);

// Animar el cielo estrellado
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    drawStars(stars); // Dibuja las estrellas fijas
    drawShootingStars(shootingStars); // Dibuja las estrellas fugaces

    // Animar las estrellas fugaces
    shootingStars.forEach((star, index) => {
        star.x -= star.speed * Math.cos(star.angle); // Mover la estrella fugaz
        star.y -= star.speed * Math.sin(star.angle);
        star.opacity -= 0.005; // Desvanecer la estrella fugaz

        // Eliminar las estrellas fugaces que ya desaparecieron
        if (star.opacity <= 0) {
            shootingStars.splice(index, 1);
        }
    });

    requestAnimationFrame(animate); // Continuar la animación
}

animate(); 