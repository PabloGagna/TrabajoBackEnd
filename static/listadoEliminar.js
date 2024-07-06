const URL = "https://pablogagna.pythonanywhere.com/"

        function obtenerProducto(){
            fetch(URL + 'productos')
                .then(response =>{
                    if(response.ok){
                        return response.json();
                    }
                })
                .then(data => {
                    const productosTable = document.getElementById('productos-table').getElementsByTagName('tbody')[0];
                    productosTable.innerHTML = ' ';
                    data.forEach(producto => {
                        const row = productosTable.insertRow();
                        row.innerHTML = `
                        <td>${producto.codigo}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td align="right">${producto.precio}</td>
                        <td><button onclick="eliminarProducto('${producto.codigo}')">Eliminar</button></td>
                    `;
                });
            })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al obtener los productos');
                });
        }
        
        function eliminarProducto(codigo){
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')){
                fetch(URL + 'productos/${codigo}',{method: 'DELETE'})
                    .then(response => {
                        if(response.ok){
                            obtenerProducto();
                            alert('Producto eliminado correctamente');
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        }

        document.addEventListener('DOMContentLoaded', obtenerProductos);
