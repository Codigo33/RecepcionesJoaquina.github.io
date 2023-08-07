document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});


function iniciarApp() {
    botonMenu();
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function botonMenu() {
    const button = document.querySelector('button');
    const navegacion = document.querySelector('.navegacion');

    button.addEventListener('click', () => {
        button.classList.toggle('activo');
        navegacion.classList.toggle('mostrar');
    });
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const nosotros = document.querySelector('.nosotros');
    // console.log(nosotros.getBoundingClientRect());
    window.addEventListener('scroll', () => {
        if ( nosotros.getBoundingClientRect().top < 409.6981201171875 ) {
            barra.classList.add('fijo');
        } else {
            barra.classList.remove('fijo');
        }
    });
}

// Configurando el scroll de las secciones
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({ behavior: "smooth" });
        })
    });
}

// Despliega una lista de 12 fotos una vez cargado el DOM
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpeg" alt="Entrada Joaquina">
        `;

        imagen.onclick = () => {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

// Muestra imagen en grande al dar click en las imagenes de la galeria
function mostrarImagen(id) {
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpeg" alt="Entrada Joaquina">
        `;

    // Crea el overlay con la imagen en grande
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = () => {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Boton para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = () => {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // Añadiendo modal al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

