function filtrarMiembros() {
    let filtro = "todos";
    let opciones = document.getElementsByName("filtro_tipo");

    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            filtro = opciones[i].value;
        }
    }

    let miembros = document.getElementsByClassName("miembro");

    for (let i = 0; i < miembros.length; i++) {
        let tipo = miembros[i].getAttribute("data-tipo");

        if (filtro === "todos" || tipo === filtro) {
            miembros[i].style.display = "block";
        } else {
            miembros[i].style.display = "none";
        }
    }
}

function ordenarMiembros() {
    let orden = "";
    let opciones = document.getElementsByName("orden");

    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            orden = opciones[i].value;
        }
    }

    let contenedor = document.getElementById("resultados");
    let miembros = Array.from(document.getElementsByClassName("miembro"));

    miembros.sort(function(a, b) {
        let textoA = a.textContent.trim().toLowerCase();
        let textoB = b.textContent.trim().toLowerCase();

        let datosA = textoA.split(" - ");
        let datosB = textoB.split(" - ");

        let nombreCompletoA = datosA[0];
        let nombreCompletoB = datosB[0];

        let partesA = nombreCompletoA.split(" ");
        let partesB = nombreCompletoB.split(" ");

        let compararA = "";
        let compararB = "";

        if (orden === "nombre") {
            compararA = partesA[0];
            compararB = partesB[0];
        }

        if (orden === "apellido") {
            compararA = partesA[1];
            compararB = partesB[1];
        }

        if (orden === "correo") {
            compararA = datosA[2];
            compararB = datosB[2];
        }

        if (compararA < compararB) return -1;
        if (compararA > compararB) return 1;
        return 0;
    });

    contenedor.innerHTML = "";

    for (let i = 0; i < miembros.length; i++) {
        contenedor.appendChild(miembros[i]);
    }

    filtrarMiembros();
}