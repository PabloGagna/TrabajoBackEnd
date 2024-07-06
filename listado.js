const URL = "https://pablogagna.pythonanywhere.com/"

fetch(URL + 'producto')
    .then(function (response){
        if (response.ok){
            return response.json();
        } else {
            throw new Error('Error al obtener los productos');
        }
    })

    .then(function (data){
        let tablaProductos = document.getElementById('tablaProductos');
        for (let producto of data){
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + producto.codigo + '</td>' + '<td>' + producto.descripcion + '</td>' + '<td>' + producto.nombre + '</td>' + '<td align="right">' + producto.cantidad + '</td>' 
            + '<td align="right">' + producto.precio + '</td>' + '<td><img src=https://www.pythonanywhere.com/user/PabloGagna/files/home/PabloGagna/mysite/static/img/' + producto.imagen_url + 'alt="Imagen del producto" style="width:100px";></td>'
            + '<td align="right">' + producto.proveedor + '</td>';
            tablaProductos.appendChild(fila);
        }
    })
    .catch(function (error){
        alert('Error al obtener los productos');
    });