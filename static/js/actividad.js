//validar el ingreso correcto de actividades

function validarActividad(){
  const rutInput = document.getElementById("miembro_rut");
  const correoInput = document.getElementById("miembro_correo");
  const actividadInput = document.getElementById("miembro_actividad");
  const diaInput = document.getElementById("miembro_dia");
  const duracionInput = document.getElementById("miembro_duracion");
  const archivoInput = document.getElementById("actividad_archivo");
  const linkInput = document.getElementById("actividad_link");

  const rut = rutInput.value.trim();
  const correo = correoInput.value.trim();
  const actividad = actividadInput.value.trim();
  const dia = diaInput.value.trim();
  const duracion = duracionInput.value.trim();
  const link = linkInput.value.trim();

 let patronRut = /^\d{7,8}-[\dkK]$/;

    if (!patronRut.test(rut)) {
    alert("El rut ingresado es inválido");
    return false;
  }

  let patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!patronCorreo.test(correo)) {
    alert("Ingresa un correo válido");
    return false;
  }

    if (actividad === "" || actividad.length < 3) {
    alert("Debes ingresar un nombre de actividad válido");
    return false;
  }

  let tipos = document.getElementsByName("tipo_act");
  let tipoSeleccionado = false;

  for (let i = 0; i < tipos.length; i++) {
    if (tipos[i].checked) {
      tipoSeleccionado = true;
    }
  }

  if (!tipoSeleccionado) {
    alert("Debes seleccionar un tipo de actividad");
    return false;
  }

  if (dia === "") {
    alert("Debes ingresar el día o los días de la actividad");
    return false;
  }
  let patronHoras = /^[0-9]+$/;

  if (!patronHoras.test(duracion) || Number(duracion) <= 0) {
    alert("Las horas dedicadas deben ser un número válido");
    return false;
  }

   if (archivoInput.files.length === 0) {
    alert("Debes adjuntar una foto o video");
    return false;
  }

   let patronLink = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

   if (link !== "" && !patronLink.test(link)) {
     alert("Si ingresas un enlace, debe ser válido y comenzar con http:// o https://");
     return false;
   }
  return true;
 
}



