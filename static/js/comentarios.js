function agregarComentario(event, actividadId) {
    event.preventDefault();

    let formulario = event.target;

    let nombre = formulario.nombre.value;
    let texto = formulario.texto.value;

    fetch("/agregar-comentario", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
            "actividad_id=" + actividadId +
            "&nombre=" + encodeURIComponent(nombre) +
            "&texto=" + encodeURIComponent(texto)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje);
        formulario.reset();
        cargarComentarios(actividadId);
    });

    return false;
}


function cargarComentarios(actividadId) {

    fetch("/comentarios/" + actividadId)
    .then(response => response.json())
    .then(data => {

        let div = document.getElementById("comentarios-" + actividadId);

        div.innerHTML = "";

        data.comentarios.forEach(comentario => {

            div.innerHTML +=
                "<p><b>" +
                comentario.nombre +
                "</b> (" +
                comentario.fecha +
                ")<br>" +
                comentario.texto +
                "</p>";

        });

    });

}
