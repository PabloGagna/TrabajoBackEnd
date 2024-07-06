const URL = "https://pablogagna.pythonanywhere.com/"

    let codigo = " ";
    let descripcion = " "; 
    let nombre = " ";
    let cantidad = " ";
    let precio = " ";
    let proveedor = " ";
    let imagen_url = "";
    let imagenSeleccionada = null;
    let imagenUrlTemp = null;
    let mostrarDatosProducto = false;

    document.getElementById('form-obtener-producto').addEventListener('submit', obtenerProducto);
    document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);
    document.getElementById('nuevaImagen').addEventListener('change', seleccionarImagen);

    function obtenerProducto(event) {
        EventTarget.preventDefault();
        codigo = document.getElementById('codigo').value;
        fetch(URL + '/productos/' + codigo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener el producto');
                }
            })
            .then(data => {
                descripcion = data.descripcion;
                nombre = data.nombre;
                cantidad = data.cantidad;
                precio = data.precio;
                proveedor = data.proveedor;
                imagen_url = data.imagen_url;
                mostrarDatosProducto = true;
                mostrarFormulario();
            })
            .catch(error => {
                alert('Codigo no encontrado');
            });
        }

    function mostrarFormulario() {
        if (mostrarDatosProducto) {
            document.getElementById('descripcionModificar').value = descripcion;
            document.getElementById('nombreModificar').value = nombre;
            document.getElementById('cantidadModificar').value = cantidad;
            document.getElementById('precioModificar').value = precio;
            document.getElementById('proveModificar').value = proveedor;
            const imagenActual = document.getElementById('imagen-actual');
            if (imagen_url && !imagenSeleccionada){
                imagenActual.src = 'https://www.pythonanywhere.com/user/PabloGagna/files/home/PabloGagna/mysite/static/img/' + imagen_url;
                imagenActual.style.display = 'block';
            }else{
                imagenActual.style.display = 'none';
            }
            document.getElementById('datos-producto').style.display = 'block';
        }else{
            document.getElementById('datos-producto').style.display = 'none';
        }
    }

    function seleccionarImagen(event) {
        const file = event.target.files[0];
        imagenSeleccionada = file;
        imagenUrlTemp = URL.createObjectURL(file);
        const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
        imagenVistaPrevia.src = imagenUrlTemp;
        imagenVistaPrevia.style.display = 'block';
    }
    
    function guardarCambios(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('codigo',codigo);
        formData.append('descripcion', document.getElementById('descripcionModificar').value);
        formData.append('nombre', document.getElementById('nombreModificar').value);
        formData.append('cantidad', document.getElementById('cantidadModificar').value);
        formData.append('precio', document.getElementById('precioModificar').value);
        formData.append('proveedor', document.getElementById('proveModificar').value);
        if (imagenSeleccionada) {
            formData.append('imagen', imagenSeleccionada, imagenSeleccionada.name);
        }
        fetch(URL + '/productos/' + codigo, {
            method: 'PUT',
            body: formData
        })
            .then(response =>{
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al guardar los cambios del producto');
                }
            })
            .then(data => {
                alert('Producto actualizado correctamente');
                limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:',error);
                alert('Error al actualizar el producto');
            });
        }
        
    function limpiarFormulario() {
        document.getElementById('codigo').value = "";
        document.getElementById('descripcionModificar').value = "";
        document.getElementById('nombreModificar').value = "";
        document.getElementById('cantidadModificar').value = "";
        document.getElementById('precioModificar').value = "";
        document.getElementById('proveModificar').value = "";
        document.getElementById('nuevaImagen').value = "";
        const imagenActual = document.getElementById('imagen-actual');
        imagenActual.style.display = "none";
        const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
        imagenVistaPrevia.style.display = "none";

        codigo = "";
        descripcion = "";
        nombre = "";
        cantidad = "";
        precio = "";
        proveedor = "";
        imagen_url = "";
        imagenSeleccionada = null;
        imagenUrlTemp = null;
        mostrarDatosProducto = false;

        document.getElementById('datos-producto').style.display = "none";
    }
    
