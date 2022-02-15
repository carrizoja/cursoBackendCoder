const template = Handlebars.compile(`<ul>
<li>{{nombre}}</li>
<li>{{apellido}}</li>
<li>{{edad}}</li>
<li>{{email}}</li>
<li>{{telefono}}</li>
</ul>`)

const html = template({
    nombre: "Mauricio",
    apellido: "Espinosa",
    edad: 25,
    email: "correoMauricio",
    telefono: "12341242342342"
})
document.getElementById("data").innerHTML = html