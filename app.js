//recibe de parámetro a qué id de span del html se ejecuta la función
//a ese id del span le muestra un determinado texto
function mostrarMensaje(idSpan, texto) {
    document.getElementById(idSpan).textContent = texto;
}

function buscarUsuarioPorEmail(email){ //Toma de parámetro un email, que es el que se va a enviar por el método de validarEmail
    let usuariosRegistrados = localStorage.getItem("usuarios"); //Obtengo los textos guardados en LocalStorage
    let listaUsuarios = []; //Creo una lista vacía

    if (usuariosRegistrados !== null){ //Si encuentra usuarios en el LocalStorage, por eso distinto de null
        listaUsuarios = JSON.parse(usuariosRegistrados); //Transformo el JSON en un array
    }

    for(let i = 0; i < listaUsuarios.length; i++){ //Recorro la lista de usuarios para encontrar el email
        let usuarioActual = listaUsuarios[i]; //Almaceno el usuario encontrado en "usuarioActual"
        if (usuarioActual.email === email){ //Si el email ingresado es el mismo que el 
            return usuarioActual; //Me devuelve el usuario que contiene el email
        }
    }
    return null; //Si no encuentra nada, solo devuelve null
}

function validarNombre(){
    let nombre = document.getElementById("nombre").value.trim(); //Obtengo el valor del input del html 
    let nombreValido = false; //Inicializo la bandera en false
    let regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; //Validar que sean solo letras

    if (nombre === ""){ //Nombre no vacío
        mostrarMensaje("errorNombre", "Este campo es obligatorio");
    } else if (nombre.length > 50) { //Nombre no mayor a 50 caracteres
        mostrarMensaje("errorNombre", "El nombre no puede superar los 50 caracteres");
    } else if (!regexLetras.test(nombre)){ //Solo permite letras
        mostrarMensaje("errorNombre", "El nombre no puede contener números ni caracteres especiales")
    } else {
        mostrarMensaje("errorNombre", "") //Limpio los mensajes en pantalla 
        nombreValido = true; //Cambio la bandera a true
    }
    return nombreValido; //Devuelvo el resultado
}

function validarApellido(){
    let apellido = document.getElementById("apellido").value.trim(); //Obtengo el valor del input del html 
    let apellidoValido = false; //Inicializo la bandera en false
    let regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; //Validar que sean solo letras

    if (apellido === ""){ //Apellido no vacío
        mostrarMensaje("errorApellido", "Este campo es obligatorio");
    } else if (apellido.length > 50) { //Apellido no mayor a 50 caracteres
        mostrarMensaje("errorApellido", "El apellido no puede superar los 50 caracteres");
    } else if (!regexLetras.test(apellido)){ //Solo permite letras
        mostrarMensaje("errorApellido", "El apellido no puede contener números ni caracteres especiales")
    } else {
        mostrarMensaje("errorApellido", "") //Limpio los mensajes en pantalla 
        apellidoValido = true; //Cambio la bandera a true
    }
    return apellidoValido; //Devuelvo el resultado
}

function validarEmail(){
    let email = document.getElementById("email").value.trim(); //Obtengo el valor del input del html
    let emailValido = false; //Inicializo la bandera en false 
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Validar que contenga @, un .

    if (email === ""){
        mostrarMensaje("errorEmail", "Este campo es obligatorio");
    } else if (!regexEmail.test(email)){
        mostrarMensaje("errorEmail", "El email debe tener un formato válido (incluir un @ y un punto)");
    } else if (buscarUsuarioPorEmail(email) !== null){ //Si no devuelve null, significa que ya existe
        mostrarMensaje("errorEmail", "Este email ya se encuentra registrado. Por favor, ingrese otro")
    } else {
        mostrarMensaje("errorEmail", ""); //Limpio los mensajes
        emailValido = true;
    }
    return emailValido; //Devuelvo el resultado
}

function validarPassword(){
    let password = document.getElementById("password").value.trim(); //Obtengo la contraseña del input
    let passwordValido = false; //Inicializo la bandera en false
    let regexNumero = /\d/; // El símbolo \d significa "cualquier dígito numérico del 0 al 9"

    if (password === ""){
        mostrarMensaje("errorPassword", "La contraseña es obligatoria");
    } else if (password.length < 8){
        mostrarMensaje("errorPassword", "La contraseña debe tener mínimo 8 caracteres")
    } else if (!regexNumero.test(password)){
        mostrarMensaje("errorPassword", "La contraseña debe incluir al menos un número")
    } else {
        mostrarMensaje("errorPassword", "");
        passwordValido = true;
    }
    return passwordValido;
}

function validarConfirmacion(){
    let password = document.getElementById("password").value.trim(); //Obtengo la contraseña
    let confirmarPassword = document.getElementById("confirmarPassword").value.trim(); //Obtengo la confirmación de la contraseña
    let confirmacionValida = false;

    if (confirmarPassword === ""){
        mostrarMensaje("errorConfirmarPassword", "Debes confirmar tu contraseña");
    } else if (password !== confirmarPassword){
        mostrarMensaje("errorConfirmarPassword", "Las contraseñas no coinciden")
    } else {
        mostrarMensaje("errorConfirmarPassword", "");
        confirmacionValida = true;
    }
    return confirmacionValida;
}

function validarFecha(){
    let fechaNacimiento = document.getElementById("fechaNacimiento").value; //Input del usuario
    let fechaNacimientoObjeto = new Date(fechaNacimiento); //Transformo la fecha a un objeto para comparar el contenido
    let mayorDeEdad = new Date(); //Objeto de tipo Date
    let hoy = new Date(); //Para la segunda validación
    mayorDeEdad.setFullYear(mayorDeEdad.getFullYear() - 18); //18 años menos
    let fechaValida = false; //Bandera

    if (fechaNacimiento === ""){
        mostrarMensaje("errorFechaNacimiento", "Este campo es obligatorio");
    } else if (fechaNacimientoObjeto >= hoy){ //Compara si la fecha de nacimiento es igual o superior a la actual
        mostrarMensaje("errorFechaNacimiento", "La fecha de nacimiento no puede ser igual o superior a la fecha actual");
    } else if (fechaNacimientoObjeto >= mayorDeEdad){ //La fecha de nacimiento es mayor o igual al límite de 18 años atrás
        mostrarMensaje("errorFechaNacimiento", "Debés ser mayor de 18 años");
    } else {
        mostrarMensaje("errorFechaNacimiento", "");
        fechaValida = true;
    }   
    return fechaValida;
}

function validarTerminos(){
    let terminos = document.getElementById("terminos").checked //checked devuelve un booleano
    let terminosValidos = false
    if (terminos === false) {
        mostrarMensaje("errorTerminos", "Por favor, aceptá los términos y condiciones");
    } else {
        mostrarMensaje("errorTerminos", "")
        terminosValidos = true; //No cambio "terminos" porque si no da false, devuelve true
    }
    return terminosValidos;
}

let usuarioEncontrado = null; //Arranca en null porque no hay usuarios encontrados por el momento

function validarEmailLogin(){
    let emailLogin = document.getElementById("emailLogin").value
    let emailValidoLogin = false;
    usuarioEncontrado = buscarUsuarioPorEmail(emailLogin);
    if (emailLogin === ""){
        mostrarMensaje("errorEmailLogin", "Este campo es obligatorio");
    } else if (usuarioEncontrado === null){
        mostrarMensaje("errorEmailLogin", "Email o contraseña incorrectos");
    } else {
        mostrarMensaje("errorEmailLogin", "");
        emailValidoLogin = true;
    }
    return emailValidoLogin;
}

function validarPasswordLogin(){
    let passwordLogin = document.getElementById("passwordLogin").value
    let passwordLoginValido = false;
    if (passwordLogin === ""){
        mostrarMensaje("errorPasswordLogin", "Este campo es obligatorio");
    } else if (passwordLogin !== usuarioEncontrado.password){
        mostrarMensaje("errorPasswordLogin", "Email o contraseña incorrectos");
    } else {
        mostrarMensaje("errorPasswordLogin", "")
        passwordLoginValido = true;
    }
    return passwordLoginValido;
}

function guardarUsuario(usuario){
    let usuariosRegistrados = localStorage.getItem("usuarios"); //Obtengo la lista del localStorage
    let listaUsuarios = []; //Lista vacía por defecto

    if (usuariosRegistrados !== null){ //Si ya hay usuarios guardados
        listaUsuarios = JSON.parse(usuariosRegistrados); //Convierto el JSON a array
    }

    listaUsuarios.push(usuario); //Agrego el nuevo usuario a la lista
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios)); //Guardo la lista actualizada
}

function fakeRequest(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 2000);
    });
}

async function registrar(event) {
    event.preventDefault();
    let usuario = { //Guardo los datos del usuario en un JSON
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    fechaNacimiento: document.getElementById("fechaNacimiento").value
    }
    let nombreValido = validarNombre();
    let apellidoValido = validarApellido();
    let emailValido = validarEmail();
    let passwordValido = validarPassword();
    let confirmacionValida = validarConfirmacion();
    let fechaValida = validarFecha();
    let terminosValidos = validarTerminos();
    if (nombreValido && apellidoValido && emailValido && passwordValido && confirmacionValida && fechaValida && terminosValidos){
        mostrarMensaje("cargando", "Cargando...");
        await fakeRequest();
        guardarUsuario(usuario);
        mostrarMensaje("registroExito", "Te registraste con éxito");
        setTimeout(() => {
            document.getElementById("registroOcultar").style.display = "none";
            document.getElementById("loginOcultar").style.display = "block";
        }, 3000);
    }
}

async function login(event) {
    event.preventDefault();
    mostrarMensaje("iniciarSesion", "");
    if (validarEmailLogin() && validarPasswordLogin()){
        mostrarMensaje("iniciarSesion", "Iniciando sesión...")
        await fakeRequest();
        mostrarMensaje("inicioExitoso", "¡Bienvenido " + usuarioEncontrado.nombre + " " + usuarioEncontrado.apellido + "!")
    }
}

document.getElementById("registro").addEventListener("submit", registrar);
document.getElementById("login").addEventListener("submit", login);