var productos = [];
var reciente = [];
var compra = [];
var listaproductos = [];
var detalleProd = [];
var orden = [];
var resultado="";

function validar(){

	if(document.getElementById("idCodigo").value == ""){
		alert("Hace falta ingresar el código del producto!");
		return false;
	}

	if(document.getElementById("idNombre").value == ""){
		alert("Hace falta ingresar el nombre del producto!");
		return false;
	}

	if(document.getElementById("idPrecio").value == ""){
		alert("Hace falta ingresar el Precio del producto!");
		return false;
	}

	if (document.getElementById("idImagen").value == "") {
		alert("Hace falta ingresar la imagen del producto!");
		return false;
	}

}

function getFile(){

	
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();

	reader.addEventListener("load", function(){
		resultado = reader.result;
		sessionStorage.setItem("url", resultado);
	},false);

	if (file){
		reader.readAsDataURL(file);
	}

}

function llenarArreglo(){
	var codigo = document.getElementById("idCodigo").value;
	var nombre = document.getElementById("idNombre").value;
	var precio = document.getElementById("idPrecio").value;
	var imagen = sessionStorage.getItem("url");

	var codigoExiste = false;

	if(localStorage.getItem("registro") != null){
		productos = JSON.parse(localStorage.getItem("registro"));

		for(var i=0; i<productos.length; i++){

			if (productos[i].codigo == codigo) {
				codigoExiste = true;
				alert("EL CODIGO INGRESADO YA EXISTE!");
			}

		}
	}

	if(codigoExiste == false){

		var prod = new objproducto(codigo, nombre, precio, imagen);
		reciente.push(prod);
		productos.push(prod);
		localStorage.clear();
		localStorage.setItem("registro", JSON.stringify(productos));
	}
	
}

function objproducto(codigo, nombre, precio, imagen){
	this.codigo = codigo,
	this.nombre = nombre,
	this.precio = precio,
	this.imagen = imagen
}

function actualizarTabla(){

	debugger;

	var scriptTabla="";

	for(var index=0; index<reciente.length; index++){

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+reciente[index].codigo+"</td>";
		scriptTabla+="<td>"+reciente[index].nombre+"</td>";
		scriptTabla+="<td>Q "+reciente[index].precio+"</td>";
		scriptTabla+="<td><img src=\""+reciente[index].imagen+"\" width=\"75px\"></td>";
		scriptTabla+="</tr>";

	}

	document.getElementById("idTableBody").innerHTML = scriptTabla;

}

function limpiar(){
	document.getElementById("idCodigo").value = "";
	document.getElementById("idNombre").value = "";
	document.getElementById("idPrecio").value = "";
	document.getElementById("idImagen").value = "";
}



function objpedido(codigo, nombre, precio, imagen, cantidad){
	this.codigo=codigo,
	this.nombre=nombre,
	this.precio=precio,
	this.imagen=imagen,
	this.cantidad=cantidad
}


//Esta funcion ya trabaja con api 

function agregarCarrito(id){

	debugger;

	var codigo = id;
	var cantidad = document.getElementById("c"+id).value;
	var nombre;
	var precio;
	var imagen;
	var auxiliar = [];
	var getProducto = [];

	if(cantidad !="" && cantidad>0){

		fetch("https://localhost:44320/api/productos")
		.then(response => response.json())
		.then(res => {

			var i = 0;
			var encontrado = false;

			while(i<res.length && !encontrado){

				if(res[i].codigo == codigo){
					nombre = res[i].nombre;
					precio = res[i].precio;
					imagen = res[i].imagen;

					encontrado = true;
				}

				i++;

			}

			//Este if permite actualizar la cantidad de un producto que ya había sido agregado al carrito
			if(JSON.parse(sessionStorage.getItem("regPedido"))!=null){

				var actualizar = false;

				//Los pedidos se están guardando en sessionStorage
				auxiliar = JSON.parse(sessionStorage.getItem("regPedido"));

				for(var y=0; y<auxiliar.length; y++){
					if(auxiliar[y].codigo == codigo){
						actualizar = true;
						break;
					}
				}

				if(actualizar == true){
					for(var z=0; z<auxiliar.length; z++){
						if(auxiliar[z].codigo != codigo){
							getProducto.push(auxiliar[z]);
						}
					}

					var ped = new objpedido(codigo, nombre, precio, imagen, cantidad);

					getProducto.push(ped);

					sessionStorage.clear();
					sessionStorage.setItem("regPedido", JSON.stringify(getProducto));
				}else{

					getProducto = auxiliar;

					var ped = new objpedido(codigo, nombre, precio, imagen, cantidad);

					getProducto.push(ped);

					sessionStorage.clear();
					//Se debe guardar en sessionStorage porque el pedido sólo es por usuario en una sóla sesión
					sessionStorage.setItem("regPedido", JSON.stringify(getProducto));

				}

			}else{
				var ped = new objpedido(codigo, nombre, precio, imagen, cantidad);

				getProducto.push(ped);

				sessionStorage.clear();
				sessionStorage.setItem("regPedido", JSON.stringify(getProducto));
			}

		});

	}else{
		alert("Debe ingresar una cantidad!!!");
	}

}

function revisarPedido(){
	var carrito = [];
	var total = 0;
	carrito = JSON.parse(sessionStorage.getItem("regPedido"));

	var scriptTabla;

	for(var index=0; index<carrito.length; index++){

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+carrito[index].codigo+"</td>";
		scriptTabla+="<td>"+carrito[index].nombre+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src=\""+carrito[index].imagen+"\" width=\"75px\"></td>"
		scriptTabla+="<td>"+carrito[index].cantidad+"<br><br><label for=\""+carrito[index].codigo+"\">Cantidad: </label> <input type=\"number\" id=\""+"c"+carrito[index].codigo+"\" onchange=\"actualizarCantidad(this.id)\">&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" value=\"Descartar\" id=\""+carrito[index].codigo+"\" onclick=\"quitarCarrito(this.id)\"></td>";
		scriptTabla+="<td>Q "+carrito[index].precio+"</td>";
		scriptTabla+="<td>Q "+carrito[index].cantidad*carrito[index].precio+"</td>";
		scriptTabla+="</tr>";
		total+=carrito[index].cantidad*carrito[index].precio;
	}

	document.getElementById("idTableBody3").innerHTML = scriptTabla;
	document.getElementById("total").innerHTML = "Total de su compra:&nbsp;&nbsp;&nbsp;&nbsp;Q "+total;
}

function actualizarCantidad(id){
	var nuevoid = id.substring(1);
	
	agregarCarrito(nuevoid);

	revisarPedido();
}

function quitarCarrito(id){

	var pedidoActual = [];
	var nuevoPedido = [];

	pedidoActual = JSON.parse(sessionStorage.getItem("regPedido"));

	for(var y=0; y<pedidoActual.length; y++){
		if(pedidoActual[y].codigo != id){
			nuevoPedido.push(pedidoActual[y]);
		}
	}

	sessionStorage.clear();
	sessionStorage.setItem("regPedido", JSON.stringify(nuevoPedido));

	revisarPedido();

}

function validarCompra(){

	var total = document.getElementById("total");
	var contenido = total.innerHTML;

	if(contenido.charAt(contenido.length-1) == 0){
		alert("NO HAY PRODUCTOS EN EL CARRITO!");
		return false;
	}

	if(document.getElementById("idNombre").value == ""){
		alert("DEBE INGRESAR SU NOMBRE COMPLETO!");
		return false;
	}

	if(document.getElementById("idDireccion").value == ""){
		alert("DEBE INGRESAR UNA DIRECCION DE ENTREGA!");
		return false;
	}

}

function comprar(){

	if(validarCompra()==false){
		return false;
	}

	document.getElementById("idNit").value="";
	document.getElementById("idNombre").value="";
	document.getElementById("idDireccion").value="";
	alert("Su pedido se registro correctamente!\n Muchas gracias por su compra!");

}

function agregarProducto(){

	if(validar()==false){
		return false;
	}

	agregarProductodb();
	limpiar();

	

}


//Borra los datos ingresados en el formulario de orden de compra
function limpiarOC(){
	document.getElementById('idOrden').value = "";
	document.getElementById('idFechaEmision').value = "";
	document.getElementById('idProveedor').value = "";
	document.getElementById("idProducto").value == "";
	document.getElementById("idCantidad").value == "";
	document.getElementById('idOrden').disabled = false;
	document.getElementById('idFechaEmision').disabled = false;
	document.getElementById('idProveedor').disabled = false;
	document.getElementById('idBtnGuardar').disabled = true;
}






function actualizarEstado(num){
	debugger;
	ordenes = JSON.parse(localStorage.getItem("regOrdenes"));
	localStorage.removeItem("regOrdenes");
	for(var index=0; index<ordenes.length; index++){
		if(ordenes[index].codigo == num){
			ordenes[index].estado = status;
			break;
		}
	}

	status = "";

	localStorage.setItem("regOrdenes", JSON.stringify(ordenes));
	document.getElementById("idTableBodyEP").innerHTML = "";
	mostrarOrdenes();

}

function objdetalle(codigo,producto,proveedor, cantidad, fecha){
	this.codigo=codigo,
	this.producto=producto,
	this.proveedor = proveedor,
	this.cantidad=cantidad,
	this.fecha = fecha
}

function objOrden(codigo, fecha, proveedor, estado){
	this.codigo=codigo,
	this.fecha=fecha,
	this.proveedor=proveedor,
	this.estado = "SOLICITADO"
}

function guardarOrden(){
	if(localStorage.getItem("regOrdenes") != null){

		var nuevaOC = new objOrden(document.getElementById('idOrden').value, document.getElementById('idFechaEmision').value, document.getElementById('idProveedor').value);
		orden = JSON.parse(localStorage.getItem("regOrdenes"));
		localStorage.removeItem("regOrdenes");
		orden.push(nuevaOC);
		localStorage.setItem("regOrdenes", JSON.stringify(orden));

	}else{

		var nuevaOC = new objOrden(document.getElementById('idOrden').value, document.getElementById('idFechaEmision').value, document.getElementById('idProveedor').value);
		orden.push(nuevaOC);
		localStorage.setItem("regOrdenes", JSON.stringify(orden));

	}

	if(localStorage.getItem("detalles") != null){

		detalleProd = JSON.parse(localStorage.getItem("detalles"));
		localStorage.removeItem("detalles");
		
		for(var i = 0; i < listaproductos.length; i++){
			detalleProd.push(listaproductos[i]);
		}

		localStorage.setItem("detalles", JSON.stringify(detalleProd));

	}else{

		for(var i = 0; i < listaproductos.length; i++){
			detalleProd.push(listaproductos[i]);
		}

		localStorage.setItem("detalles", JSON.stringify(detalleProd));
	}

	limpiarOC();
}

function llenarOrden(){

	var codigo= document.getElementById("idOrden").value;
	var fecha = document.getElementById("idFechaEmision").value;
	var proveedor = document.getElementById("idProveedor").value;
	var producto = document.getElementById("idProducto").value;
	var cantidad = document.getElementById("idCantidad").value;
	var compr = new objdetalle(codigo, producto, proveedor,cantidad, fecha);
	listaproductos.push(compr);

}

function mostrartablaorden(){

	var tablaordencompra="";

		// Se actualiza la tabla para escribir en el html por medio de Apis; document e InnerHtml.
		for(var index=0; index<listaproductos.length; index++){

			tablaordencompra+="<tr>";
			tablaordencompra+="<td>"+listaproductos[index].codigo+"</td>";
			tablaordencompra+="<td>"+listaproductos[index].producto+"</td>";
			tablaordencompra+="<td>"+listaproductos[index].proveedor+"</td>";
			tablaordencompra+="<td>"+listaproductos[index].cantidad+"</td>";
			tablaordencompra+="</tr>";

		}

		document.getElementById("idTableBodyOrden").innerHTML = tablaordencompra;
}

function agregarCompra(){

	agregarPedidodb();
	llenarOrden();
	mostrartablaorden();
	limpiarOC();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////Ulizacion de web api /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function agregarProductodb(){
	var nom=document.getElementById("idNombre").value;
	var pre=document.getElementById("idPrecio").value;

	
	

	fetch("https://localhost:44320/api/productos",{
		method:"POST",
		body:JSON.stringify({
			nombre: nom,
			precio: parseFloat(pre),
			imagen: resultado
		}),

		headers:{
			"Acept":"application/json",
			"Content-Type": "application/json",
		}

	})

	.then( respuesta => {
		alert("El producto se ha sido registrado");
	});
}


function mostrarProductos(){

	fetch("https://localhost:44320/api/productos")
	.then(respues=>respues.json())
	.then(datos=>{
			var scriptTabla;

		for(var index=0; index<datos.length; index++){

			scriptTabla+="<tr>";
			scriptTabla+="<td>"+datos[index].codigo+"</td>";
			scriptTabla+="<td>"+datos[index].nombre+"<br><br><label for=\""+datos[index].codigo+"\">Cantidad: </label> <input type=\"number\" id=\""+"c"+datos[index].codigo+"\"></td>";
			scriptTabla+="<td>Q "+datos[index].precio+"<br><br><input type=\"button\" value=\"Agregar al carrito\" id=\""+datos[index].codigo+"\" onclick=\"agregarCarrito(this.id)\"></td>";
			scriptTabla+="<td><img src=\""+datos[index].imagen+"\" width=\"75px\"></td>";
			scriptTabla+="</tr>";
		}

		document.getElementById("idTableBody2").innerHTML = scriptTabla;

	})
}


function agregarPedidodb(){

	
	var fecdb=document.getElementById("idFechaEmision").value;
	var codprodb=document.getElementById("idProveedor").value;
	var codPdb=document.getElementById("idProducto").value;
	var cantdb=document.getElementById("idCantidad").value;

	
	

	fetch("https://localhost:44320/api/pedidos",{
		method:"POST",
		body:JSON.stringify({
			
			fecha: fecdb,
			proveedor: codprodb,
			producto: codPdb,
			cantidad: parseInt(cantdb)
		}),

		headers:{
			"Acept":"application/json",
			"Content-Type": "application/json",
		}

	})

	.then( respuesta => {
		alert("El pedido se ha sido registrado");
	});
}



function mostrarOrdenes(){

	fetch("https://localhost:44320/api/pedidos")
	.then(respues=>respues.json())
	.then(datos=>{
			var scriptTabla;

		for(var index=0; index<datos.length; index++){

			scriptTabla+="<tr>";
			scriptTabla+="<td>"+datos[index].numero+"</td>";
			scriptTabla+="<td>"+datos[index].fecha+"</td>";
			scriptTabla+="<td>"+datos[index].proveedor+"</td>";
			scriptTabla+="<td>"+datos[index].producto+"</td>";
			scriptTabla+="<td>"+datos[index].cantidad+"</td>";
			scriptTabla+="</tr>";

		}

		document.getElementById("idTableBodyEP").innerHTML = scriptTabla;

	})
}


function mostrarExistencias(){

	fetch("https://localhost:44320/api/pedidos")
	.then(respues=>respues.json())
	.then(datos=>{
			var scriptTabla;

		for(var index=0; index<datos.length; index++){

			scriptTabla+="<tr>";
			scriptTabla+="<td>"+datos[index].producto+"</td>"
			scriptTabla+="<td>"+datos[index].cantidad+"</td>"
			scriptTabla+="</tr>"

		}

		document.getElementById("idTableBodyE").innerHTML = scriptTabla;

	})
}





//Este método se llama desde el botón de ingresar en el login

function acceso(){

	debugger;
	var usuario = document.getElementById("idUsuario").value;
	var contraseña = document.getElementById("idContraseña").value;

	fetch('https://localhost:44320/api/usuarios')
	.then(response => response.json())
	.then(datos => {

		var contador = 0;
		var encontrado = false;

		while(contador < datos.length && !encontrado){

			if(datos[contador].idUsuario == usuario && datos[contador].contraseña == contraseña){

				localStorage.setItem("tipoUsuario", "Empleado");
				encontrado=true;
				window.location='../index.html';

			}

			contador++;

		}

		if(encontrado == false){
			alert('Los datos ingresados son incorrectos!!!');
		}

	});

}

//Este método se llama desde el body de la página index.html 

function cargarIndex(){

	if(localStorage.getItem("tipoUsuario") == "Empleado"){

		var opciones = "";
			

			
			opciones+="<li><a href=\"\" onclick=\"salirIndex()\">Salir</a></li>";
			opciones+="<li><a href=\"pages/registro.html\">Registro</a></li>";
			opciones+="<li><a href=\"index.html\">Inicio</a></li>";
			opciones+="<li><a href=\"pages/agregar-pruducto.html\">Agregar</a></li>";
			opciones+="<li><a href=\"pages/estado_pedido.html\">Estado del Pedido</a></li>";
			opciones+="<li><a href=\"pages/orden_compra.html\">Orden de Compra</a></li>";
			opciones+="<li><a href=\"pages/existencia.html\">Existencia</a></li>";
			opciones+="<li><a href=\"pages/catalogo.html\">Productos</a></li>";
			opciones+="<li><a href=\"pages/confimacion_pedido.html\">Confirmación</a></li>";
			
		document.getElementById("idMenu").innerHTML = opciones;

	}else{

		var opciones = "";

		
		opciones+="<li><a href=\"index.html\">Inicio</a></li>";
		opciones+="<li><a href=\"pages/pedido.html\">Pedido</a></li>";
		opciones+="<li><a href=\"pages/catalogo.html\">Productos</a></li>";
		opciones+="<li><a href=\"pages/login.html\">Entrar</a></li>";

		document.getElementById("idMenu").innerHTML = opciones;

	}

}

function salirIndex(){

	localStorage.removeItem("tipoUsuario");

	window.location = 'index.html';

}


//Este método se llama desde el body de las páginas secundarias
function cargarPaginas(){

	if(localStorage.getItem("tipoUsuario") == "Empleado"){

		var opciones = "";


			opciones+="<li><a onclick=\"salirPaginas()\" href=\"../index.html\">Salir</a></li>";
			opciones+="<li><a href=\"../index.html\">Inicio</a></li>";
			opciones+="<li><a href=\"registro.html\">Registro</a></li>";
			opciones+="<li><a href=\"agregar-pruducto.html\">Agregar</a></li>";
			opciones+="<li><a href=\"estado_pedido.html\">Estado del Pedido</a></li>";
			opciones+="<li><a href=\"orden_compra.html\">Orden de Compra</a></li>";
			opciones+="<li><a href=\"existencia.html\">Existencia</a></li>";
			opciones+="<li><a href=\"catalogo.html\">Productos</a></li>";
			opciones+="<li><a href=\"confimacion_pedido.html\">Confirmación</a></li>";

		document.getElementById("idMenu").innerHTML = opciones;

	}else{

		var opciones = "";

		opciones+="<li><a href=\"login.html\">Entrar</a></li>";
		opciones+="<li><a href=\"pedido.html\">Mi Pedido</a></li>";
		opciones+="<li><a href=\"catalogo.html\">Productos</a></li>";
		opciones+="<li><a href=\"../index.html\">Inicio</a></li>";

		document.getElementById("idMenu").innerHTML = opciones;

	}

}

function salirPaginas(){

	localStorage.removeItem("tipoUsuario");


}

function resgistrarUsuario(){

var user = document.getElementById("idUsuario").value;
var contra = document.getElementById("idContraseña").value;


fetch("https://localhost:44320/api/usuarios",{
		method:"POST",
		body:JSON.stringify({
			
			idUsuario:user,
			contraseña:contra,
			tipoUsuario:"Empleado"
			
		}),

		headers:{
			"Acept":"application/json",
			"Content-Type": "application/json",
		}

	})

	.then( respuesta => {
		alert("El usuario se ha registrado correctamente");
	});

	document.getElementById("idUsuario").value="";
	document.getElementById("idContraseña").value="";

}