const Lista_autos = {
    "autos": [
        {
            "nombre": "Corolla",
            "marca": "Toyota",
            "modelo": "XEI",
            "Edad": 2022,
            "precio": 35000000
        },
        {
            "nombre": "208",
            "marca": "Peugeot",
            "modelo": "Allure",
            "Edad": 2023,
            "precio": 28000000
        },
        {
            "nombre": "Cronos",
            "marca": "Fiat",
            "modelo": "Drive",
            "Edad": 2024,
            "precio": 25000000
        },
        {
            "nombre": "Golf",
            "marca": "Volkswagen",
            "modelo": "GTI",
            "Edad": 2021,
            "precio": 42000000
        },
        {
            "nombre": "Civic",
            "marca": "Honda",
            "modelo": "EX",
            "Edad": 2020,
            "precio": 33000000
        }
    ]
};


let autos = Lista_autos.autos;

console.table(autos);

for (let i = 0; i < Lista_autos.autos.length; i++) {

    console.log("----------------- Lista de Autos ----------------");

    let nombre = Lista_autos.autos[i].nombre;
    let marca = Lista_autos.autos[i].marca;
    let modelo = Lista_autos.autos[i].modelo;
    let Edad = Lista_autos.autos[i].Edad;
    let precio = Lista_autos.autos[i].precio;

    console.log("Nombre: ", nombre);
    console.log("Marca: ", marca);
    console.log("Modelo: ", modelo);
    console.log("Aoni: ", Edad);
    console.log("Precio: $", precio);
}

//Sort marca

let ordenarMarca = Lista_autos.autos.sort((a, b) => a.marca.localeCompare(b.marca));

console.log("Autos ordenados por marca:");
console.log(ordenarMarca);

//sort nombre

let ordenarNombre = Lista_autos.autos.sort((a, b) => a.nombre.localeCompare(b.nombre));

console.log("Autos ordenados por nombre:");
console.log(ordenarNombre);

//-------While

let mientras = 0;

if (Lista_autos.autos.length === 0) {
    console.log("No hay autos en la lista");
} else {

    while (mientras < Lista_autos.autos.length) {

        console.log("----------------- Lista de Autos ----------------");

        let nombre = Lista_autos.autos[mientras].nombre;
        let marca = Lista_autos.autos[mientras].marca;
        let modelo = Lista_autos.autos[mientras].modelo;
        let Edad = Lista_autos.autos[mientras].Edad;
        let precio = Lista_autos.autos[mientras].precio;

        console.log("Nombre: ", nombre);
        console.log("Marca: ", marca);
        console.log("Modelo: ", modelo);
        console.log("Edad: ", Edad);
        console.log("Precio: $", precio);

        mientras++;
    }

}
//-----------foreEach

Lista_autos.autos.forEach(function(auto) {

    console.log("----------------- Lista de Autos ----------------");

    let nombre = auto.nombre;
    let marca = auto.marca;
    let modelo = auto.modelo;
    let Edad = auto.Edad;
    let precio = auto.precio;

    console.log("Nombre: ", nombre);
    console.log("Marca: ", marca);
    console.log("Modelo: ", modelo);
    console.log("Edad: ", Edad);
    console.log("Precio: $", precio);

});