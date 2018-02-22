function cargar() {

    montaLocalStorage();

    menu = document.getElementsByClassName("menu");
    platos = document.getElementsByClassName("platos");

    //datos generales que modifican la estetica o la info de la web
    colores = ["#F22121", "#3A81F8", "#1BD66F", "#F39C12", "#9601FC", "#611600"];
    TipoComida = ["Entrantes", "Menu Infantil", "Pescado", "Carnes", "Bebidas", "Postres"];

    MontaOpciones();

    CargaAlimentos();
}

function montaLocalStorage() {
    //Patron-> Nombre;Tipo;Disponibilidad;foto
    //creo unos platos por defecto para poder trabajar con ellos
    
    //en caso de no queres ningun plato por defecto borrar el array y el bucle
    var Comida = ["Garbanzas;Entrantes;Disponible;garbanzas.jpg",
                "Croquetas;Menu Infantil;Disponible;croquetas.jpg",
                "Queso blanco;Entrantes;Disponible;queso blanco.jpg",
                "Bacalao encebollado;Pescado;No Disponible;bacalao encebollado.jpg",
                "Papas Con Costillas;Carnes;Disponible;papas con costillas.jpg",
                "Papas arrugadas con mojo;Entrantes;Disponible;papas arrugadas.jpg",
                "Escaldón o gofio escaldado;Entrantes;Disponible;escaldon de gofio.jpg",
                "Carne de cabra;Carnes;Disponible;carne cabra.jpg",
                "Queso asado con mojo;Entrantes;Disponible;queso asado con mojo.jpg"];

    if (localStorage.getItem("Comida") == undefined) {

        localStorage.setItem("Comida", "");

        for (var cont = 0; cont < Comida.length; cont++) {

            localStorage.Comida = localStorage.Comida + Comida[cont] + "/";
        }
    }
}
//recoge de una variable unos valores inciales y los monta el local

function MontaOpciones() {
    var textos = ["Añadir", "Borrar", "No Diponible", "Marcar Todo", "Desmarcar Todo", "Ordenar"];

    //creo el bloque con los tipos de platos
    var bloquePadre = document.createElement("div");
    bloquePadre.setAttribute("id", "bloques");

    for (var cont = 0; cont < TipoComida.length; cont++) {
        var bloque1 = document.createElement("div");
        bloque1.style.backgroundColor = colores[cont];

        var texto = document.createTextNode(TipoComida[cont]);

        var bloqueHijo = document.createElement("input");
        bloqueHijo.setAttribute("type", "radio");
        bloqueHijo.setAttribute("class", "bloque");
        bloqueHijo.setAttribute("name", "Tcomida");
        bloqueHijo.setAttribute("Onclick", "GuardarTipo()");

        if (cont == 0) {
            bloqueHijo.setAttribute("checked", "");
        }

        bloque1.appendChild(texto);
        bloque1.appendChild(bloqueHijo);
        bloquePadre.appendChild(bloque1);
    }

    //creo el buscador
    var bloque_Buscar = document.createElement("div");
    bloque_Buscar.setAttribute("class", "buscador");

    var textarea = document.createElement("input");
    textarea.setAttribute("type", "text");
    textarea.setAttribute("class", "TBnombre");
    textarea.setAttribute("placeholder", " Nombre del Plato");
    textarea.setAttribute("onkeypress", "validar(event)");
    bloque_Buscar.appendChild(textarea);

    //creo el menu_de_opciones
    var menuOpciones = document.createElement("div");
    menuOpciones.setAttribute("id", "menu_opciones");

    //aqui tengo todas las clases a usar para la libreria de iconos
    var iconos = ["icon-add", "icon-marcar", "icon-cross", "icon-select-all", "icon-deselect-all", "icon-order"];

    var funciones = ["add()", "del()", "cross()", "select_all(1)", "select_all(2)", "order()", "GuardarTipo()"];

    for (var cont = 0; cont < 6; cont++) {

        var div = document.createElement("div");
        div.setAttribute("class", iconos[cont] + " icon");
        div.setAttribute("title", textos[cont]);
        div.setAttribute("onclick", funciones[cont]);

        menuOpciones.appendChild(div);
    }

    //añado los 3 bloques principales a el html
    menu[0].appendChild(bloquePadre);
    menu[0].appendChild(bloque_Buscar);
    menu[0].appendChild(menuOpciones);
}
//monta todos los menus

function CargaAlimentos() {

    var Comida = localStorage.Comida.split("/");

    for (var cont = 0; cont < Comida.length - 1; cont++) {
        var dato = Comida[cont].split(";");

        var plato = new Object();
        plato.Nombre = dato[0];
        plato.Tipo = dato[1];
        plato.Disponibilidad = dato[2];
        plato.img = dato[3];

        mostrarPlato(plato);
    }
}
//carga la comida del localStorage y llama a la funcion mostrar

function mostrarPlato(Plato) {
    if (document.getElementById("lista") == null) {
        var ul = document.createElement("ul");
        ul.setAttribute("id", "lista");
        platos[0].appendChild(ul);
    }

    var li = document.createElement("li");
    li.setAttribute("class", Plato.Nombre);

    for (var cont = 0; cont < TipoComida.length; cont++) {

        if (TipoComida[cont] == Plato.Tipo) {
            li.style.backgroundColor = colores[cont];
        }
    }

    var imagen = document.createElement("img");
    imagen.src = "img/platos/" + Plato.img;

    var div = document.createElement("div");
    div.setAttribute("class", "bloque_plato");

    if (Plato.Disponibilidad == "No Disponible") {
        div.setAttribute("Style", "text-decoration:line-through")
    }

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "plato");
    checkbox.setAttribute("id", Plato.Nombre);

    var texto = document.createTextNode(Plato.Nombre);

    div.appendChild(checkbox);
    div.appendChild(texto);

    li.appendChild(imagen);
    li.appendChild(div);

    document.getElementById("lista").appendChild(li);
}
//crea la lista si no existe y la rrellena con los datos pasados

function add() {
    var nombrePlato = document.getElementsByClassName("TBnombre")[0].value;

    if (nombrePlato != "") {

        var Tipocomida = document.getElementsByName("Tcomida");

        for (var cont = 0; cont < Tipocomida.length; cont++) {
            if (Tipocomida[cont].checked == true) {
                Tipocomida = TipoComida[cont];
                cont = 20;
            }
        }

        //añado al LocalStogare
        //Patron-> Nombre;Tipo;Disponibilidad;foto
        localStorage.Comida = localStorage.Comida + nombrePlato + ";" + Tipocomida + ";D;Imagen_no_disponible.png/";

        elimina_lista();
        CargaAlimentos();

    } else {
        alert("Introduce el nombre del plato");
    }
}
//añade

function del() {

    //todos los li (los platos) tienen un input con la clase plato y el id del nombre
    var platos = document.getElementsByName("plato");
    var nombre;

    for (var cont = 0; cont < platos.length; cont++) {
        if (platos[cont].checked == true) {
            nombre = platos[cont].getAttribute("id");
        }
    }

    //obtengo el localStorage
    var Local = localStorage.getItem("Comida");
    Local = Local.split("/");
    localStorage.Comida = "";

    for (var cont = 0; cont < Local.length - 1; cont++) {

        var datos = Local[cont].split(";");

        if (datos[0] != nombre) {
            localStorage.Comida = localStorage.Comida + Local[cont] + "/";
        }
    }
    elimina_lista();
    CargaAlimentos();
}
//elimina

function cross() {
    var platos = document.getElementsByName("plato");
    var nombre = "";

    for (var cont = 0; cont < platos.length; cont++) {
        if (platos[cont].checked == true) {
            nombre = platos[cont].getAttribute("id");
        }
    }

    //obtengo el localStorage
    var Local = localStorage.getItem("Comida");
    Local = Local.split("/");
    localStorage.Comida = "";

    for (var cont = 0; cont < Local.length - 1; cont++) {

        var datos = Local[cont].split(";");

        if (datos[0] == nombre) {

            if (datos[2] == "No Disponible") {
                datos[2] = "Disponible";
            } else {
                datos[2] = "No Disponible";
            }

            var TextoEditado = datos[0] + ";" + datos[1] + ";" + datos[2] + ";" + datos[3];
            localStorage.Comida = localStorage.Comida + TextoEditado + "/";
        } else {
            localStorage.Comida = localStorage.Comida + Local[cont] + "/";
        }
    }

    elimina_lista();
    CargaAlimentos();
}
//tacha el texto

function select_all(a) {
    var platos = document.getElementsByName("plato");
    for (var cont = 0; cont < platos.length; cont++) {

        if (a == 1) {
            platos[cont].checked = true; //marca todo
        } else {
            platos[cont].checked = false; //desmarca todo
        }
    }
}
//marca y desmarcar todo

function order() {
    //obtengo el localStorage
    var Local = localStorage.getItem("Comida");
    Local = Local.split("/");
    
    elimina_lista();
    
    for(var cont=0;cont<TipoComida.length;cont++){
        
        for(var contLocal=0;contLocal<Local.length;contLocal++){
            var elemento = Local[contLocal].split(";");
            
            if(TipoComida[cont]==elemento[1]){
                 var plato = new Object();
                plato.Nombre = elemento[0];
                plato.Tipo = elemento[1];
                plato.Disponibilidad = elemento[2];
                plato.img = elemento[3];

                mostrarPlato(plato);
            }          
        }
    }
}
//ordenar

function validar(e) {
    //analizo cada vez que toca una tecla dentro el input
    tecla = (document.all) ? e.keyCode : e.which;

    if (tecla == 13) { //13 es el numero de la tecla ENTER
        add();
    }
}
//VALIDA QUE SEA EL ENTER Y LLAMA A ADD

function elimina_lista() {
    var ul = document.getElementById("lista");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}
//elimina los platos mostrados