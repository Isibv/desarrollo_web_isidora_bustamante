// definir mostrarTipo()
// validación del formulario 


function mostrarTipo() {
  let estudiante = document.getElementById("datos_estudiante");
  let academico = document.getElementById("datos_academico");
  let funcionario = document.getElementById("datos_funcionario");

  estudiante.style.display = "none";
  academico.style.display = "none";
  funcionario.style.display = "none";

  let opciones = document.getElementsByName("tipo_miembro");

  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      if (opciones[i].value == "estudiante") {
        estudiante.style.display = "block";
      }
      if (opciones[i].value == "academico") {
        academico.style.display = "block";
      }
      if (opciones[i].value == "funcionario") {
        funcionario.style.display = "block";
      }
    }
  }
}

// validaciones

function validarMiembro() {
  const nombreInput = document.getElementById("miembro_nombre");
  const apellidoInput = document.getElementById("miembro_apellido");
  const rutInput = document.getElementById("miembro_rut");
  const correoInput = document.getElementById("miembro_correo");
  const celularInput = document.getElementById("miembro_celular");

  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const rut = rutInput.value.trim();
  const correo = correoInput.value.trim();
  const celular = celularInput.value.trim();

  if (nombre === "" || nombre.length < 3) {
    alert("El nombre es obligatorio");
    return false;
  }

  if (apellido === "" || apellido.length < 3) {
    alert("El apellido es obligatorio");
    return false;
  }

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

  let patronCelular = /^9\d{8}$/;

  if (!patronCelular.test(celular)) {
    alert("Número inválido, por favor ingresa exactamente 9 dígitos");
    return false;
  }

  
  alert("Ya eres miembro de ActividaDCC")
  return true;
}






