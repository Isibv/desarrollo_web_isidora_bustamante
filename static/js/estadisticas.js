fetch("/datos/miembros-por-dia")
.then(response => response.json())
.then(data => {
    new Chart(document.getElementById("graficoMiembros"), {
        type: "line",
        data: {
            labels: data.map(d => d.dia),
            datasets: [{
                label: "Miembros",
                data: data.map(d => d.cantidad)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

fetch("/datos/actividades-por-tipo")
.then(response => response.json())
.then(data => {
    new Chart(document.getElementById("graficoTipos"), {
        type: "pie",
        data: {
            labels: data.map(d => d.tipo),
            datasets: [{
                label: "Actividades",
                data: data.map(d => d.cantidad)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

fetch("/datos/actividades-por-comuna")
.then(response => response.json())
.then(data => {
    new Chart(document.getElementById("graficoComunas"), {
        type: "bar",
        data: {
            labels: data.map(d => d.comuna),
            datasets: [{
                label: "Actividades",
                data: data.map(d => d.cantidad)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});