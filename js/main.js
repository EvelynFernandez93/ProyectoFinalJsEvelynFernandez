


//Tercer pre-entrega
 document.addEventListener('DOMContentLoaded', () => { 

    // USO DE ARRAY CON OBJETOS
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Hemograma',
            precio: 600,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoMU5oKf-OO90YEdKaCFG_3nz0QHiAEV2ptcDiwM_qLRAD0JTfIg3T36-trU-Kg5LR7XA&usqp=CAU'
        },
        {
            id: 2,
            nombre: 'Perfil renal',
            precio: 600,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0Pvm1nr8TPuacsPp48fYY5873ANpnAYT-A&usqp=CAU'
        },
        {
            id: 3,
            nombre: 'Perfil hepático',
            precio: 1200,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0Pvm1nr8TPuacsPp48fYY5873ANpnAYT-A&usqp=CAU'
        },
        
        {
            id: 4,
            nombre: 'Perfil Pancreático',
            precio: 1200,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0Pvm1nr8TPuacsPp48fYY5873ANpnAYT-A&usqp=CAUg'
        },
        
        {
            id: 5,
            nombre: 'Perfil Lipídico',
            precio: 1200,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0Pvm1nr8TPuacsPp48fYY5873ANpnAYT-A&usqp=CAU'
        },
        
        {
            id: 6,
            nombre: 'Ionograma',
            precio: 1000,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VzqNlUsErZzbbfWYYPUIgf2moYLz6daztg&usqp=CAU'
        },
        
        {
            id: 7,
            nombre: 'Coagulación',
            precio: 1200,
            imagen: 'https://reactlab.com.ec/wp-content/uploads/2020/04/Tubo-celeste-con-citrato-de-sodio-800x800-comp.jpg'
        },
        
        
        {
            id: 7,
            nombre: 'Determinacion independiente ',
            precio: 300,
            imagen: 'https://kadilab.pe/wp-content/uploads/2020/10/Hemograma-completo.jpg'
        },
        {
            id: 8,
            nombre: 'Extracción',
            precio: 300,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOi4sqNfX1FFBIHxMQIAVOopwRQ5MobcPpwkEG6PcUWw&s'
        }

    ];
    //USO DE DOM 
    let carrito = [];
    const divisa = ' pesos';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    

    

 //CREO MI CARD USANDO JS  
 function renderizarProductos() {
        
        baseDeDatos.forEach((info) => {
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`; 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
            
            
        
        });
    } 
    
    /* baseDeDatos.forEach((info) => {
        
        const miNodo = `
          <div class="card col-sm-4">
            <div class="card-body">
              <h5 class="card-title">${info.nombre}</h5>
              <img class="img-fluid" src="${info.imagen}" />
              <p class="card-text">${info.precio}${divisa}</p>
              <button class="btn btn-primary" marcador="${info.id}" click="anyadirProductoAlCarrito()">+</button>
            </div>
          </div>
        `;
        DOMitems.innerHTML += miNodo;
      }); */

   //EVENTO PARA AÑADIR LOS PRODUCTOS Y CALCULAR EL PRESUPUESTO 
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

   //FUNCIONES DE ORDEN SUPERIOR
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }

    //EVENTO PARA BORRAR UN NODO DEL CARRITO
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }
    function calcularTotal() { 
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

   //CREACIÓN DE FUNCION PARA UTILIZAR POSTERIORMENTE LOCAL STORAGE 
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    DOMbotonVaciar.addEventListener('click', vaciarCarrito); 

    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});

//APIS, AJACKT FRENCH
/* a continuación podremos ver el valor que me interesa obtener de la API */
/*  fetch('https://criptoya.com/api/dolar')
  .then(response => response.json()) // Convertir la respuesta en formato JSON
  .then(data => {
    
    const datoCambio = data.oficial; // Obtener la tasa de cambio de USD a la moneda deseada
    const cartValue = (carrito);  // Valor del carrito en USD
    
    const convertirValor = cartValue * datoCambio; // Convertir el valor del carrito a la moneda deseada
    console.log(`Valor en dólares: ${convertirValor}`);
   

  })
  .catch(error => console.error(error)); */ // Manejar errores en la petición


