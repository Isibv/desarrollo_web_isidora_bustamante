# Tarea 3 - CC5002 Desarrollo de Aplicaciones Web

Para esta tarea utilicé como base la app previa de
la Tarea 2 usando Flask, MySQL, HTML, CSS y Javascript.

Para los gráficos de estadísticas utilicé Chart.js junto con llamadas asíncronas usando fetch(). Los datos de los gráficos son obtenidos desde rutas en Flask que retornan información en formato JSON.

La funcionalidad de comentarios fue implementada mediante una nueva tabla comentario, utilizando también llamadas asíncronas con fetch() para agregar y visualizar los comentarios sin necesidad de recargar la página.

Durante el desarrollo me encontré con algunos problemas. Inicialmente la tabla miembro no contaba con un atributo comuna, por lo que fue necesario agregar una nueva columna tanto en la base de datos como en el modelo de Flask. Esto permitió implementar correctamente el gráfico de actividades por comuna.

También fue necesario crear la tabla comentario y agregar nuevas rutas para obtener y almacenar los comentarios asociados a cada actividad.

Otro problema que apareció fue que algunos miembros existentes no tenían una comuna registrada, por lo que el gráfico de actividades por comuna no mostraba información. Para solucionarlo agregué valores de comuna a los registros existentes.

Para la generación de gráficos se utilizó la biblioteca Chart.js, la cual fue incluida mediante CDN.

La aplicación fue probada verificando el registro de miembros, registro de actividades, visualización de detalles, comentarios y estadísticas.
