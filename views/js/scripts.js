// Lo primero que ve el usuario es el cartel para ingresar el usuario
const username = prompt("Ingresa tu usuario") // A la espera del usuario...

// const socket = io('http://localhost:9000'); // the / namespace/endpoint

// ===============================
// "io" viene de ./slack.js
// Nos conectamos al servicio y usamos la opcion para enviar el numero de username
// ===============================
const socket = io('http://localhost:9000', {
    query: {
        username
    }
});

// La constante 'socket', en el atributo opts, tiene el username, obtenido de lo que ingreso el usuario en el browser
// junto con otra data como el hostname, puerto, path
// console.log('socket en scripts.js es : ', socket);

let nsSocket = "";

// =================================
// Escuchando por un nsList (listado de los namespace)
// nsList viene desde slack.js con un emit
// =================================
socket.on('nsList', (nsData) => {
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`
    })

    // Add a clicklistener for each NS
    Array.from(document.getElementsByClassName('namespace')).forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const nsEndpoint = elem.getAttribute('ns');
            joinNs(nsEndpoint)
        })
    })
    joinNs('/wiki');
})