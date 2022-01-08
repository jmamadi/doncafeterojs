console.log("Prueba de la clase")

//Agregar algo al file

localStorage.setItem("Origen", "Colombiano")
localStorage.setItem("Precio", 120)
localStorage.setItem("Importado", true)

/*
origen = localStorage.setItem("Origen")
precio = localStorage.setItem("Precio")
importado = localStorage.setItem("Importado")
*/

//Saludar a un determinado usuario y que ya quede guardado

/*
let nombre = ""
if( localStorage.getItem("usuario") === null) {
    nombre = prompt("ingrese nombre");
    localStorage.setItem("usuario", nombre)
}

nombre = localStorage.getItem("usuario")
alert("hola " + nombre)
*/

//Saludar a un determinado usuario y que por cada pestaña le pida nuevamente el usuario para saludo
/*let nombre = ""
if( sessionStorage.getItem("usuario") === null) {
    nombre = prompt("ingrese nombre");
    sessionStorage.setItem("usuario", nombre)
}

nombre = sessionStorage.getItem("usuario")
alert("hola " + nombre)
*/
/*
//Saludar a un determinado usuario y que a través de una lista detecte el nombre (almacenando la info en local)
let listaUsuarios = ["jamadi", "mvamadi", "cdattero"]
localStorage.setItem("listaUsuarios", listaUsuarios)
//el a.split(",") se utiliza para separar ese arrays
let listaUsuariosGet = localStorage.getItem("listaUsuarios").split(",")
*/
// localStorage.getItem("lista") === localStorage["lista"] === localStorage.lista (es lo mismo) para llamarlo en la consola
