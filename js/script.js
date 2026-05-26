// 1. Datos para el Carrusel del Menú del Día
const componentesMenuDia = [
    {
        titulo: "Plato Fuerte: Asado Especial",
        descripcion: "Carne de res seleccionada a la parrilla, sazonada con finas hierbas.",
        img: "https://via.placeholder.com/600x350/d9534f/ffffff?text=Carne+Asada"
    },
    {
        titulo: "Acompañamiento: Arroz e Iniciales",
        descripcion: "Acompañado de arroz blanco suelto, plátano maduro y ensalada fresca.",
        img: "https://via.placeholder.com/600x350/f0ad4e/ffffff?text=Acompañamientos"
    },
    {
        titulo: "Bebida del Día: Jugo Natural",
        descripcion: "Refrescante jugo de la casa preparado con fruta 100% natural.",
        img: "https://via.placeholder.com/600x350/5bc0de/ffffff?text=Jugo+Natural"
    }
];

let slideActual = 0;
const precioMenuDia = 18000; // Precio fijo del combo del día

// Función para renderizar el carrusel
function mostrarSlide(index) {
    if (index >= componentesMenuDia.length) slideActual = 0;
    if (index < 0) slideActual = componentesMenuDia.length - 1;

    const elemento = componentesMenuDia[slideActual];
    document.getElementById("carousel-img").src = elemento.img;
    document.getElementById("carousel-title").innerText = elemento.titulo;
    document.getElementById("carousel-desc").innerText = elemento.descripcion;
}

function cambiarSlide(direccion) {
    slideActual += direccion;
    mostrarSlide(slideActual);
}

// Inicializar el carrusel al cargar la página
mostrarSlide(slideActual);


// 2. Lógica de Acumulación del Pedido (Carrito)
let pedidoAcumulado = [];

function agregarAlPedido(id, nombre, precio) {
    // Verificar si el plato ya está en el pedido para sumar cantidad
    const itemExistente = pedidoAcumulado.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        pedidoAcumulado.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    actualizarInterfazPedido();
}

function agregarPlatoDelDia() {
    // El menú del día usa un ID fijo (ej: 99)
    agregarAlPedido(99, "Combo Menú del Día Completo", precioMenuDia);
}

// Actualiza la lista en pantalla y calcula totales
function actualizarInterfazPedido() {
    const listaHTML = document.getElementById("lista-pedido");
    const totalHTML = document.getElementById("total-precio");
    
    listaHTML.innerHTML = "";
    let totalAcumulado = 0;

    pedidoAcumulado.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalAcumulado += subtotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.cantidad}x</strong> ${item.nombre} 
            <span>$${subtotal.toLocaleString('co-CO')}</span>
        `;
        listaHTML.appendChild(li);
    });

    totalHTML.innerText = `$${totalAcumulado.toLocaleString('co-CO')}`;
}

// 3. Envío final a la caja
function enviarACaja() {
    if (pedidoAcumulado.length === 0) {
        alert("El pedido está vacío. Agrega platos antes de mandar a caja.");
        return;
    }

    // Estructura JSON limpia lista para ser consumida por una API o backend en caja
    const ordenParaCaja = {
        fechaHora: new Date().toISOString(),
        items: pedidoAcumulado,
        totalCobrar: pedidoAcumulado.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    };

    console.log("Enviando los siguientes datos a caja:", ordenParaCaja);
    
    alert(`¡Pedido enviado con éxito!\nTotal a pagar en caja: $${ordenParaCaja.totalCobrar.toLocaleString('co-CO')}`);
    
    // Limpiar el pedido tras enviarlo
    pedidoAcumulado = [];
    actualizarInterfazPedido();
}

