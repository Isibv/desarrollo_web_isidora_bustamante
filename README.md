# desarrollo_web_isidora_bustamante

Para la creación de este prototipo, primero definí las páginas necesarias para cumplir con los requerimientos de la tarea. Decidí estructurar el sistema a partir de un archivo principal (index), el cual permite navegar hacia las distintas secciones: registro de miembros, registro de actividades, listado de miembros y estadísticas. Todos estos archivos fueron organizados dentro de una carpeta HTML para mantener el orden del proyecto.

En la sección de registro de miembros, seleccioné los datos que, a mi criterio, permiten identificar correctamente a una persona (nombre, apellido, RUT, correo y celular). Además, incorporé la clasificación de miembros en estudiantes, académicos y funcionarios. Dependiendo del tipo seleccionado, se despliegan campos adicionales específicos, lo que fue implementado mediante funciones en JavaScript para mostrar u ocultar contenido.

Para las validaciones, utilice JavaScript en todos los formularios, sin usar required, cumpliendo así con lo solicitado en la pauta. Se validaron formatos como RUT (sin puntos y con guion), correo electrónico, número de celular y campos obligatorios, además de verificar selecciones de opciones y carga de archivos.

En la sección de actividades, se solicitó información relevante como nombre de la actividad, tipo, horarios, archivo adjunto y enlace. En este caso, se decidió que el enlace fuera opcional, pero validado en caso de ser ingresado.

Para el listado de miembros, utilicé datos inventados que permiten filtrar fácilmente los distintos tipos de usuarios mediante JavaScript.

Para la sección de estadisticas deje fijo un gráfico creado con canva, el cual no refleja datos reales y en esta página solo se puede visualizar los gráficos

Finalmente, el diseño visual se mantuvo simple, priorizando la funcionalidad, claridad del código y cumplimiento de los requisitos por sobre la estética, todo esto se ve en el file css, en el cual solo busque que se bviera ordenada la página.

## Consideraciones

- El sistema corresponde a un prototipo, por lo que no almacena información en una base de datos.
- Todas las validaciones fueron implementadas en JavaScript.
- Los archivos pueden ser ejecutados directamente en el navegador sin necesidad de un servidor.
- Se priorizó la funcionalidad por sobre el diseño visual.
  
  
