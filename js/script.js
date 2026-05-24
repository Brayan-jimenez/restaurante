// 1. Datos de los platos
const platos = [
    { id: 1, nombre: "Huevos Rancheros", categoria: "desayunos", precio: 14.00, img: "assets/huevos.jpg", desc: "Huevos divorciados con salsa roja y verde." },
    { id: 2, nombre: "Panqueques con Miel", categoria: "desayunos", precio: 12.00, img: "assets/pancakes.jpg", desc: "Tres panqueques esponjosos con arándanos." },
    { id: 3, nombre: "Tacos de Barbacoa", categoria: "fuertes", precio: 15.00, img: "assets/tacos.jpg", desc: "Tres tacos de carne tierna con cebolla y cilantro." },
    { id: 4, nombre: "Lomo Saltado", categoria: "fuertes", precio: 25.00, img: "assets/lomo.jpg", desc: "Jugoso lomo salteado al wok con papas fritas." },
    { id: 5, nombre: "Jugo de Naranja", categoria: "bebidas", precio: 5.00, img: "assets/jugo.jpg", desc: "100% natural y recién exprimido." }
];

// 2. Lógica del Menú del Día Automático
const menusDelDia = {
    0: "Domingo: Familiar de Asado",
    1: "Lunes: Crema de Tomate + Filete de Pollo",
    2: "Martes: Sopa de Lentejas + Lomo de Cerdo",
    3: "Miércoles: Menú Ejecutivo de Tacos",
    4: "Jueves: Pasta Alfredo con Pollo",
    5: "Viernes: Hamburguesa Especial + Papas",
    6: "Sábado: Ajiaco Santafereño Premium"
};

// Al cargar la página, ejecutar funciones
document.addEventListener("DOMContentLoaded", () => {
    mostrarMenuDelDia();
    renderizarPlatos("todos");
    configurarFiltros();
});

// Función para actualizar el Banner del Menú del Día según la fecha real
function mostrarMenuDelDia() {
    const diaActual = new Date().getDay(); // Da un número del 0 (Domingo) al 6 (Sábado)
    document.getElementById("platillo-del-dia").innerText = menusDelDia[diaActual];
}

// Función para pintar los platos en el HTML
function renderizarPlatos(categoriaSeleccionada) {
    const contenedor = document.querySelector(".menu-container");
    contenedor.innerHTML = ""; // Limpiar contenedor

    const platosFiltrados = categoriaSeleccionada === "todos" 
        ? platos 
        : platos.filter(p => p.categoria === categoriaSeleccionada);

    platosFiltrados.forEach(plato => {
        contenedor.innerHTML += `
            <div class="plate-card">
                <img src="${plato.img}" alt="${plato.nombre}">
                <div class="plate-info">
                    <h3>${plato.nombre}</h3>
                    <p>${plato.desc}</p>
                    <div class="plate-price">$${plato.precio.toFixed(2)}</div>
                    <button class="btn-add" onclick="agregarAlCarrito(${plato.precio})">+</button>
                </div>
            </div>
        `;
    });
}

// Variables para el carrito
let totalCarrito = 0;
let cantidadItems = 0;

function agregarAlCarrito(precio) {
    totalCarrito += precio;
    cantidadItems++;
    document.getElementById("cart-count").innerText = cantidadItems;
    document.getElementById("cart-total").innerText = totalCarrito.toFixed(2);
}

// Configurar los clicks en los botones de categoría
function configurarFiltros() {
    const botones = document.querySelectorAll(".nav-btn");
    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            botones.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderizarPlatos(e.target.dataset.category);
        });
    });
}