from flask import Flask, render_template, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import re
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.secret_key = 'clave_secreta_cualquiera'

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Miembro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombres = db.Column(db.String(100), nullable=False)
    apellidos = db.Column(db.String(100), nullable=False)
    rut = db.Column(db.String(20), nullable=False)
    correo = db.Column(db.String(120), nullable=False)
    celular = db.Column(db.String(20))
    tipo = db.Column(db.String(30), nullable=False)
    fecha_registro = db.Column(db.DateTime, nullable=False)


class Actividad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    miembro_rut = db.Column(db.String(20), nullable=False)
    correo = db.Column(db.String(120), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    dias = db.Column(db.String(100), nullable=False)
    horas = db.Column(db.String(20), nullable=False)
    link = db.Column(db.String(200))
    foto = db.Column(db.String(200))

@app.route("/")
def inicio():
    miembros = Miembro.query.order_by(Miembro.id.desc()).limit(5).all()
    return render_template("index.html", miembros=miembros)

@app.route("/registrar-miembro", methods=["GET", "POST"])
def registrar_miembro():

    if request.method == "POST":

        nombres = request.form["miembro_nombre"]
        apellidos = request.form["miembro_apellido"]
        rut = request.form["miembro_rut"]
        correo = request.form["miembro_correo"]
        celular = request.form["miembro_celular"]
        tipo = request.form["tipo_miembro"]

        errores = []

        if nombres.strip() == "":
           errores.append("Debe ingresar nombres.")

        if apellidos.strip() == "":
           errores.append("Debe ingresar apellidos.")

        if not re.match(r"^[0-9]{7,8}-[0-9Kk]$", rut):
           errores.append("El RUT debe tener formato 12345678-9.")

        if "@" not in correo or "." not in correo:
            errores.append("El correo debe tener formato válido.")

        if not celular.isdigit() or len(celular) != 9:
           errores.append("El celular debe tener 9 dígitos.")

        if tipo not in ["estudiante", "academico", "funcionario"]:
           errores.append("Debe seleccionar un tipo de miembro.")
        
        if len(errores) > 0:
           return render_template("registrar-miembro.html", errores=errores)

        nuevo_miembro = Miembro(
            nombres=nombres,
            apellidos=apellidos,
            rut=rut,
            correo=correo,
            celular=celular,
            tipo=tipo,
            fecha_registro=datetime.now()
        )

        db.session.add(nuevo_miembro)
        db.session.commit()

        flash("Miembro registrado correctamente.")
        return redirect("/")

    return render_template("registrar-miembro.html")


@app.route("/registrar-actividad", methods=["GET", "POST"])
def registrar_actividad():

    if request.method == "POST":

        miembro_rut = request.form["miembro_rut"]
        correo = request.form["miembro_correo"]
        nombre = request.form["miembro_actividad"]

        tipo = request.form.get("tipo_act")

        dias = request.form["miembro_dia"]
        horas = request.form["miembro_duracion"]

        link = request.form["actividad_link"]

        errores = []

        if not re.match(r"^[0-9]{7,8}-[0-9Kk]$", miembro_rut):
            errores.append("El RUT debe tener formato válido.")

        if "@" not in correo or "." not in correo:
            errores.append("El correo debe tener formato válido.")

        if nombre.strip() == "":
            errores.append("Debe ingresar nombre de actividad.")

        if tipo not in ["artistica", "deportiva", "tecnologica", "social", "recreativa"]:
            errores.append("Debe seleccionar un tipo de actividad.")

        if dias.strip() == "":
            errores.append("Debe ingresar días de actividad.")

        if horas.strip() == "":
            errores.append("Debe ingresar horas dedicadas.")

        if len(errores) > 0:
            return render_template("registrar-actividad.html", errores=errores)

        archivo = request.files.get('actividad_archivo')
        nombre_archivo = None

        if archivo and archivo.filename != '':
            nombre_archivo = secure_filename(archivo.filename)
            archivo.save(os.path.join(UPLOAD_FOLDER, nombre_archivo))
       
        nueva_actividad = Actividad(
            miembro_rut=miembro_rut,
            correo=correo,
            nombre=nombre,
            tipo=tipo,
            dias=dias,
            horas=horas,
            link=link,
            foto=nombre_archivo
        )

        db.session.add(nueva_actividad)
        db.session.commit()
       

        flash("Actividad registrada correctamente.")
        return redirect("/")

    return render_template("registrar-actividad.html")

@app.route("/listado-miembros")
def listado_miembros():
    pagina = request.args.get('pagina', 1, type=int)
    por_pagina = 5
    paginacion = Miembro.query.order_by(Miembro.fecha_registro.desc()).paginate(page=pagina, per_page=por_pagina, error_out=False)
    return render_template("listado-miembros.html", miembros=paginacion.items, paginacion=paginacion)


@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")


@app.route("/miembro/<int:id>")
def ver_miembro(id):
    miembro = Miembro.query.get_or_404(id)
    actividades = Actividad.query.filter_by(miembro_rut=miembro.rut).all()
    return render_template("detalle-miembro.html", miembro=miembro, actividades=actividades)


if __name__ == "__main__":
    app.run(debug=True)