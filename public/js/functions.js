var num = 1;
var limiteLinks = 11;
var inicioLinks = 1;
var finPAgs = 0;
var identificador = "";
var id = 0;
var id_pag_form = 1;
var datos_form = [];
var infoKiosko = []; //se utiliza para enviar informacion desde la primera seccion
					//del formualario altas, hacia la tercera seccion (llena el optionGroup de los kioskos);

$(document).ready(function(){

	$.ajax({
		url:'ajax/llenar-tabla',
		type:'get',
		datatype:'json',
		data: {num:0, identificador:"todo"},
		success:function(data){
			var datos = eval('(' + data + ')');
			finPAgs = datos[10]["Npags"];
			finPAgs = finPAgs + 1;
			for (var i = 0; i < datos.length-1; i++) {
				$("#DatosExistencias").append('<tr>'+
												'<td>'+datos[i].no_invent+'</td>'+
												'<td>'+datos[i].serie+'</td>'+
												'<td>'+datos[i].nombre+'</td>'+
												'<td>'+datos[i].articulo+'</td>'+
												'<td>'+datos[i].grupo+'</td>'+
												'<td>'+datos[i].id_loc+'</td>'+
												'<td>'+datos[i].localiza+'</td>'+
												'<td>'+
													'<div class="btn-group">'+
														'<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
														'<span class="icon-cog"> Opciones </span></a>'+
															'<ul class="dropdown-menu">'+
																'<li><a href="#" id="'+datos[i].id+'" class="move">Mover</a></li>'+
																'<li><a href="#" id="'+datos[i].id+'" class="delete">Eliminar</a></li>'+
															'</ul>'+
													'</div>'+
												'</td>'+
											  '</tr>');
			};	

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			};	
			$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');	
			identificador = "todo";
		}

	});


//--------------------- TERMINA AJAX LLENAR TABLA --------------- INICIA EVENTO LINKS ----------

	$(document).on('click', ".links", function(event){
		event.preventDefault(); //evito que se refresque la pagina
		var pags = ($(this).html()); //guardo en la variable "pags" el valor del link (2, 3, 4 , >, >>, etc)
		var num = 0;

		var response = paginar(pags, limiteLinks, inicioLinks, finPAgs);
		limiteLinks = response[0];
		inicioLinks = response[1];

		$.ajax({
			url:'ajax/llenar-tabla',
			type:'get',
			datatype:'json',
			data: {id:id, num:pags, identificador:identificador},
			success:function(data){
				var datos = eval('(' + data + ')');
				$("#DatosExistencias").empty();
				for (var i = 0; i < datos.length-1; i++) {
					$("#DatosExistencias").append('<tr>'+
													'<td>'+datos[i].no_invent+'</td>'+
													'<td>'+datos[i].serie+'</td>'+
													'<td>'+datos[i].nombre+'</td>'+
													'<td>'+datos[i].articulo+'</td>'+
													'<td>'+datos[i].grupo+'</td>'+
													'<td>'+datos[i].id_loc+'</td>'+
													'<td>'+datos[i].localiza+'</td>'+
													'<td>'+
														'<div class="btn-group">'+
															'<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
															'<span class="icon-cog"> Opciones </span></a>'+
																'<ul class="dropdown-menu">'+
																	'<li><a href="#" id="'+datos[i].id+'" class="move">Mover</a></li>'+
																	'<li><a href="#" id="'+datos[i].id+'" class="delete">Eliminar</a></li>'+
																'</ul>'+
														'</div>'+
													'</td>'+
												  '</tr>');
				};	

			}

		});

	});

// --------------------- TERMINA EVENTO LINKS ------------- INICIA EVENTO BUSQUEDAS -------------


	$(document).on('click', "#findBtn", function(event){
		event.preventDefault();
		var ValBusqueda = $('#findTxt').val();
		var val = ValBusqueda;

		$.ajax({
			url:'ajax/buscar',
			type:'post',
			datatype:'json',
			data: {val, val:ValBusqueda},
			success:function(data){
				var datos = eval('(' + data + ')');
				console.log(datos[0].no_hay);
				if(datos[0].no_hay == "No se encontraron registros"){
					alert(datos[0].no_hay);
				}else{
					$("#DatosExistencias").empty();
					for (var i = 0; i < datos.length; i++) {
						$("#DatosExistencias").append('<tr>'+
														'<td>'+datos[i].no_invent+'</td>'+
														'<td>'+datos[i].serie+'</td>'+
														'<td>'+datos[i].nombre+'</td>'+
														'<td>'+datos[i].articulo+'</td>'+
														'<td>'+datos[i].grupo+'</td>'+
														'<td>'+datos[i].id_loc+'</td>'+
														'<td>'+datos[i].localiza+'</td>'+
														'<td>'+
															'<div class="btn-group">'+
																'<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
																'<span class="icon-cog"> Opciones </span></a>'+
																	'<ul class="dropdown-menu">'+
																		'<li><a href="#" id="'+datos[i].id+'" class="move">Mover</a></li>'+
																		'<li><a href="#" id="'+datos[i].id+'" class="delete">Eliminar</a></li>'+
																	'</ul>'+
															'</div>'+
														'</td>'+
													  '</tr>');
					};
				}
				/*alert(data);
				console.log(data);*/	

			}

		});
	});

});

// -------------------- TERMINA EVENTO BUSQUEDAS --------- EMPIEZA EVENTO LOGIN --------------------------

$(document).on('click', '#loginButton', function(event) {
	event.preventDefault();
	var username =$('#username').val();
	var password =$('#password').val();

	$.ajax({
		url:'ajax/login',
		type:'post',
		data: {username: username, password: password},
		dataType:'json',
		success: function(loggedIn){
			//alert(loggedIn);   // <-- eso se descomenta para mandar el alert con una password hasheada
			if(loggedIn){
				//Redirect a la parte de /hidden
				window.location = 'appstad';
			}
			else{
				//Limpia el campo de texto de la contraseña
				$('#password').val("");
				//Carga el texto de la alerta
				$('#msgText').html("Datos incorrectos, vuelve a intentarlo.");
				//Muestra la alerta
				$('#loginMsg').slideDown(400);
			}
		}
	});
});


function paginar (pags, limiteLinks, inicioLinks, finPAgs) {
	
	if (pags == "Siguiente") {  // INICIA condicion para mostrar paginado al precionar el lin "siguiente"
			
			limiteLinks = limiteLinks + 5;
			inicioLinks = inicioLinks + 5;

			$("#paginacion").empty();
			$("#paginacion").append('<a href="#" class="links" >'+'<<'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" >'+'Anterior'+'</a>&nbsp;');

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			}

			if(limiteLinks < finPAgs){ // condicion pa saber si ya llegue al limite de paginas

				$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
				$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');
			}

		} // ------------------ TERMINA CONDICION DEL LINK "SIGUIENTE" --------------------------------------


		if (pags == "Anterior") {  // INICIA condicion para mostrar paginado al precionar el lin "anterior" 
			
			limiteLinks = limiteLinks - 5;
			inicioLinks = inicioLinks - 5;

			$("#paginacion").empty();

			if(inicioLinks > 1){ //condicion para saber si estoy mostrando el limite inicial de los links

				$("#paginacion").append('<a href="#" class="links" >'+'<<'+'</a>&nbsp;');
				$("#paginacion").append('<a href="#" class="links" >'+'Anterior'+'</a>&nbsp;');
			}

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			}

			$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');

		} // --------------------- TERMINA CONDICION DEL LINK "ANTEIROR" ---------------------------------

		if(pags == "&gt;&gt;"){  // >>
			limiteLinks = finPAgs;
			inicioLinks = finPAgs - 10;

			$("#paginacion").empty();
			$("#paginacion").append('<a href="#" class="links" >'+'<<'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" >'+'Anterior'+'</a>&nbsp;');

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			}

		}

		if(pags == "&lt;&lt;"){  // <<
			limiteLinks = 11;
			inicioLinks = 1;

			$("#paginacion").empty();

			for (var i = inicioLinks; i < limiteLinks; i++) {
				$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
			};	
			$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
			$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');	
		}

		var response = [limiteLinks, inicioLinks];
		return response;
}


$(document).on('click', '.alm', function(event) {
	id = this.id;

	$.ajax({
			url:'ajax/llenar-tabla',
			type:'get',
			datatype:'json',
			data: {id:id, num:0, identificador:"almacenes"},
			success:function(data){
				//console.log(data);

				var datos = eval('(' + data + ')');

				finPAgs = datos[10]["Npags"];
				finPAgs = finPAgs + 1;
				limiteLinks = finPAgs;

				if(datos[0].no_hay == "No se encontraron registros"){
					alert(datos[0].no_hay);
				}else{
					$("#DatosExistencias").empty();
					for (var i = 0; i < datos.length-1; i++) {
						$("#DatosExistencias").append('<tr>'+
														'<td>'+datos[i].no_invent+'</td>'+
														'<td>'+datos[i].serie+'</td>'+
														'<td>'+datos[i].nombre+'</td>'+
														'<td>'+datos[i].articulo+'</td>'+
														'<td>'+datos[i].grupo+'</td>'+
														'<td>'+datos[i].id_loc+'</td>'+
														'<td>'+datos[i].localiza+'</td>'+
														'<td>'+
															'<div class="btn-group">'+
																'<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
																'<span class="icon-cog"> Opciones </span></a>'+
																	'<ul class="dropdown-menu">'+
																		'<li><a href="#" id="'+datos[i].id+'" class="move">Mover</a></li>'+
																		'<li><a href="#" id="'+datos[i].id+'" class="delete">Eliminar</a></li>'+
																	'</ul>'+
															'</div>'+
														'</td>'+
													  '</tr>');
					};
					$("#paginacion").empty();
					for (var i = inicioLinks; i < limiteLinks; i++) {
						$("#paginacion").append('<a href="#" class="links" >'+i+'</a>&nbsp;');
					};	
					if (limiteLinks > 10) {
					$("#paginacion").append('&nbsp;<a href="#" class="links" id="siguiente">'+'Siguiente'+'</a>&nbsp;');
					$("#paginacion").append('<a href="#" class="links" id="ultimo">'+'>>'+'</a>');
					};
					identificador = "almacenes";
				}
					

			}
		});

});

$(document).on('click', '#guardar-cambo-almacen', function(event){

	var id = $('.control-group').attr('id');
	var id_loc = $('#almacen-destino').val();
	var modulo = parseInt($('almacen-destino').attr('name'));



	$.ajax({
		url:'ajax/guardar-cambio-almacen',
		type:'post',
		datatype:'json',
		data:{id:id, id_loc:id_loc, modulo:modulo},
		success:function(data){
			//aqui estoy dibujando el mensage que aparecera al terminar la accion de cambiar un registro de almacen
			$(".msg").append('<div class="alert alert-success">'+
								    '<button type="button" class="close" data-dismiss="alert">×'+
							        '</button>'+
							        '<strong>'+data+'</strong>'+ 
						     '</div>');
		}
	});

	//console.log("" +no_invent+ " -- " +serie+ " -- " +articulo+ " -- " +nombre+ " -- " +almacen1+"");

});
$(document).on('click', '.move', function(event) {
	var id = this.id;

		$.ajax({
			url:'ajax/cambiar-almacen',
			type:'post',
			datatype:'json',
			data: {id:id, num:0, identificador:"almacenes"},
			success:function(data){ 

				var datos = eval('(' + data + ')');
				
	// En este bloque de codigo dibujare toda la seccion de "Cambio de Almacen" sustituyendo en el html los valores que necesetio precargados------------------------
				$(".module-head").empty();
				$(".module-head").append('<h3>Cambio de almacen</h3>');

				$(".module-body").empty();
				$(".module-body").append('<form class="form-horizontal row-fluid">'+
										 	'<div class="control-group" id="'+datos.id+'">'+ //utilizo el id de este div para guardar el id del registro que se va a modificar
												'<label class="control-label">No. Inventario</label>'+
													'<div class="controls col-md-3">'+
														'<div class="input-append">'+
															'<input type="text" id="no-inv" value="'+datos.no_invent+'"placeholder="NI-00006138"  >'+
															'<input type="submit" id="buscar-no-inv" class="btn btn-default" value="Buscar" />'+
														'</div>'+
													'</div>'+

												'<br>'+
												'<label class="control-label">Serie</label>'+
													'<div class="controls col-md-3">'+
														
														'<input type="text" id="serie" value="'+datos.serie+'" disabled="true" >'+
													'</div>'+

												'<br>'+
												'<label class="control-label">Articulo</label>'+
													'<div class="controls col-md-3">'+
														'<input type="text" id="articulo" value="'+datos.articulo+'" disabled="true" >'+
													'</div>'+

												'<br>'+
												'<label class="control-label">Descripcion</label>'+
													'<div class="controls col-md-3">'+
														'<input type="text" id="nombre" value="'+datos.nombre+'">'+
													'</div>'+

												'<br>'+
												'<label class="control-label">Ubicacion Actual</label>'+
													'<div class="controls col-md-3">'+
														'<select tabindex="1" id="almacen-origen" class="almacenes-list">'+
															'<option value="'+datos.id_loc+'">'+datos.localiza+'</option>'+
														'</select>'+
													'</div>'+

												
												'<br>'+
												'<label class="control-label">Nueva Ubicacion</label>'+
													'<div class="controls col-md-3">'+
														'<select tabindex="1" id="almacen-destino" class="almacenes-list">'+
															'<option value="">Selecciona uno..</option>'+
														'</select>'+
													'</div>'+
												
												'<br>'+
												'<br>'+

												'<div class="msg"></div>'+

												'<label class="control-label"></label>'+
													'<div class="controls col-md-3">'+
														'<input type="submit" id="guardar-cambo-almacen" class="btn btn-default" value="Cambiar" />'+
													'</div>'+

												'&nbsp'+
												'<label class="control-label"></label>'+
													'<div class="controls col-md-3">'+
														'<input type="submit" class="btn btn-default" value="Limpiar" />'+
													'</div>'+	
											'</div>'+
										 '</form>');
			//creacion de los optionGroup con los distintos almacenes existentes 	
				for (var i = 0; i < datos[0].length; i++) {
					$(".almacenes-list").append('<option name="'+datos[0][i].modulo+'" value="'+datos[0][i].id_clave+'">'+datos[0][i].descrip+'</option>');						
				};
															
				
			}
		});

});


$(document).on('click', '#buscar-no-inv', function(event) {

	var no_invent = $("#no-inv").val();
	
	$.ajax({
		url: 'ajax/buscar-no-inv',
		type: 'post',
		datatype: 'json',
		data:{no_invent:no_invent},
		success:function(data){ //recivo la informacion

			var datos = eval('(' + data + ')'); //la evaluo para poder leerla

			$("#serie").val(datos[0].serie); //inserto en cada campo el valor que obtive de la consulta
			$("#articulo").val(datos[0].articulo);
			$("#nombre").val(datos[0].nombre);
			$("#almacen-origen").val(datos[0].id_loc);
			/*var almacenOrigen = $("#almacen-origen").children();
			console.log(almacenOrigen);*/
		}
	});
});


// -------- COMIENZAN EVENTOS Y FUNCIONES PARA EL MODULO DE ALTAS DE DISPOSITIVOS --------------------------

$(document).on('click', '#altas-dom', function(event){

	$.ajax({
		url:'ajax/altas-dom',
		type: 'get',
		datatype: 'json',
		success:function(data){

			var datos = eval('(' + data + ')');
		
			$(".module-head").empty();
			$(".module-head").append('<h3>Registro de dispositivos</h3>');

			$(".module-body").empty();

			form_altas(id_pag_form, datos);

		}
	})

});


 //PAGINADO DEL FORMLARIO ALTAS -------------------------
function form_altas(id_pag_form, datos){
	
	if ((id_pag_form > 4) || (id_pag_form < 1)) { 
			id_pag_form = 1;
	};

	if (id_pag_form == 1) {
		$(".module-body").append('<form class="form-horizontal row-fluid">'+
										'<div class="control-group">'+
											
											'<label class="control-label">Almacen</label>'+
												'<div class="controls">'+
													'<select tabindex="1" id="almacen" class="span6">'+
														'<option value="">Selecciona uno..</option>'+
													'</select>'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Grupo Articulo</label>'+
												'<div class="controls">'+
													'<select tabindex="1" id="gp-arti" class="span6">'+
														'<option value="">Selecciona uno..</option>'+
													'</select>'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Nombre Articulo</label>'+
												'<div class="controls">'+
													'<select tabindex="1" id="nom-arti" class="span6">'+
														'<option value="">Esperando..</option>'+
													'</select>'+
												'</div>'+
											'<br>'+

			   								'<label class="control-label">Folio</label>'+
												'<div class="controls">'+
													'<input type="text" id="folio" class="span6" value="">'+
												'</div>'+
											'<br>'+
											
											'<label class="control-label">Numero de Inventario</label>'+
												'<div class="controls">'+
													'<input type="text" id="no-inv" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Fecha</label>'+
												'<div class="controls">'+
													'<input type="text" id="fecha" class="span6" value="" placeholder="DD-MM-YY">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Clave</label>'+
												'<div class="controls">'+
													'<input type="text" id="clave" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Factura</label>'+
												'<div class="controls">'+
													'<input type="text" id="factura" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label"></label>'+
												'<div class="controls">'+
													'<input type="submit" id="guardar-form" class="btn btn-default span6" value="Guardar y Seguir" />'+
												'</div>'+

										'</div>'+
								 	 '</form>');

			for (var i = 0; i<datos[0].length; i++) {
				$("#gp-arti").append('<option name="" value="'+datos[0][i].grupo+'">'+datos[0][i].descrip+'</option>');
				
				if (i < datos[1].length) {
					$("#almacen").append('<option name="" value="'+datos[1][i].almacen+'">'+datos[1][i].nombre+'</option>');
				};
			}	
	};

	if (id_pag_form == 2) {
		$(".module-body").append('<form class="form-horizontal row-fluid">'+
										'<div class="control-group">'+
											
											'<label class="control-label">Unidad Medida</label>'+
												'<div class="controls">'+
													'<input type="text" id="uni-med" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Costo</label>'+
												'<div class="controls">'+
													'<input type="text" id="costo" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Orden Compra</label>'+
												'<div class="controls">'+
													'<input type="text" id="orden-comp" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Unidad Entrada</label>'+
												'<div class="controls">'+
													'<input type="text" id="uni-ent" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Cargos</label>'+
												'<div class="controls">'+
													'<input type="text" id="cargos" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Unidad Salida</label>'+
												'<div class="controls">'+
													'<input type="text" id="uni-sal" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Abonos</label>'+
												'<div class="controls">'+
													'<input type="text" id="abonos" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Proveedor</label>'+
												'<div class="controls">'+
													'<select tabindex="1" id="provedor" class="span6">'+
														'<option value="">Selecciona uno..</option>'+
													'</select>'+
												'</div>'+
											'<br>'+

											'<label class="control-label"></label>'+
												'<div class="controls">'+
													'<input type="submit" id="guardar-form" class="btn btn-default span6" value="Guardar y Seguir" />'+
												'</div>'+										
											
										'</div>'+
								 	 '</form>');
			for (var i = 0; i<datos[0].length; i++) {
				$("#provedor").append('<option name="" value="'+datos[2][i].NUM_PROV+'">'+datos[2][i].NOM_PROV+'</option>');
			}			
	};

	if (id_pag_form == 3) {
		$(".module-body").append('<form class="form-horizontal row-fluid">'+
										'<div class="control-group">'+
											
											'<label class="control-label">Tipo de Uso</label>'+
												'<div class="controls">'+
													'<input type="text" id="t-us" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Serie</label>'+
												'<div class="controls">'+
													'<input type="text" id="serie" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Kiosko</label>'+
												'<div class="controls">'+
													'<select tabindex="1" id="kiosko" class="span6">'+
														'<option value="">Selecciona uno..</option>'+
													'</select>'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Modelo</label>'+
												'<div class="controls">'+
													'<input type="text" id="modelo" class="span6" value="" disabled>'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Modulo</label>'+
												'<div class="controls">'+
													'<select tabindex="1" id="modulo" class="span6">'+
														'<option value="">Selecciona uno..</option>'+
													'</select>'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Folio Cambio</label>'+
												'<div class="controls">'+
													'<input type="text" id="folio-cam" class="span6" value="">'+
												'</div>'+
											'<br>'+
											
											'<label class="control-label">Resguardo</label>'+
												'<div class="controls">'+
													'<input type="text" id="resguardo" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Fecha Resguardo</label>'+
												'<div class="controls">'+
													'<input type="text" id="fecha-resg" class="span6" value="" placeholder="DD-MM-YY">'+
												'</div>'+
											'<br>'+

											'<label class="control-label"></label>'+
												'<div class="controls">'+
													'<input type="submit" id="guardar-form" class="btn btn-default span6" value="Guardar y Seguir" />'+
												'</div>'+								
											
										'</div>'+
								 	 '</form>');
		for (var i = 0; i<infoKiosko[0].length; i++) {
				$("#kiosko").append('<option name="" value="'+infoKiosko[0][i].id_clave+'">'+infoKiosko[0][i].descrip+'</option>');
			}
	};

	if (id_pag_form == 4) {
		$(".module-body").append('<form class="form-horizontal row-fluid">'+
										'<div class="control-group">'+
											
											'<label class="control-label">Resguardo Folio</label>'+
												'<div class="controls">'+
													'<input type="text" id="resg-folio" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Fin Garantia</label>'+
												'<div class="controls">'+
													'<input type="text" id="fin-garantia" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Nom Prov</label>'+
												'<div class="controls">'+
													'<input type="text" id="nom-prov" class="span6" value="">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Id Folio R</label>'+
												'<div class="controls">'+
													'<input type="text" id="id-fol-r" class="span6" value="">'+
												'</div>'+
											'<br>'+
											
											'<label class="control-label">Fecha OPE</label>'+
												'<div class="controls">'+
													'<input type="text" id="fecha-ope" class="span6" value="" placeholder="DD-MM-YY">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Fecha FAC</label>'+
												'<div class="controls">'+
													'<input type="text" id="fecha-fac" class="span6" value="" placeholder="DD-MM-YY">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Fecha Cambio</label>'+
												'<div class="controls">'+
													'<input type="text" id="fecha-cam" class="span6" value="" placeholder="DD-MM-YY">'+
												'</div>'+
											'<br>'+

											'<label class="control-label">Fecha Mantenimiento</label>'+
												'<div class="controls">'+
													'<input type="text" id="fecha-mant" class="span6" value="" placeholder="DD-MM-YY">'+
												'</div>'+
											'<br>'+

											'<div class="msg"></div>'+

											'<label class="control-label"></label>'+
												'<div class="controls">'+
													'<input type="submit" id="guardar-form" class="btn btn-default span6" value="Guardar" />'+
												'</div>'+								
											
										'</div>'+
								 	 '</form>');
	};
}

$(document).on('click', '#guardar-form', function(event){

	if (id_pag_form == 4) {
		var confirmar = confirm("El total de la informacion proporcionada se guardara, ¿Esta usted seguro? ");
	}else{
		var confirmar = confirm("¿Esta usted seguro? Los datos se guardaran y no podran ser modificados posteriormente");
	}
	
	if(confirmar){

		switch(id_pag_form){
			case 1:
				form = {"almacen":$("#almacen").val(), "grupo":$("#gp-arti").val(), 
					"nombe":$("#nom-arti").val(), "folio":$("#folio").val(), 
					"no-inv":$("#no-inv").val(), "fecha":$("#fecha").val(), 
					"clave":$("#clave").val(), "factura":$("#factura").val()};
				break;

			case 2:
				form = {"uni-med":$("#uni-med").val(), "costo":$("#costo").val(), 
					"orden-comp":$("#orden-comp").val(), "uni-ent":$("#uni-ent").val(), 
					"cargos":$("#cargos").val(), "uni-sal":$("#uni-sal").val(), 
					"abonos":$("#abonos").val(), "proveedor":$("#proveedor").val()};
				break;

			case 3:
				form = {"t-us":$("#t-us").val(), "serie":$("#serie").val(), 
					"kiosko":$("#kiosko").val(), "modelo":$("#modelo").val(), 
					"modulo":$("#modulo").val(), "folio-cam":$("#folio-cam").val(), 
					"resguardo":$("#resguardo").val(), "fecha-resg":$("#fecha-resg").val()};
				break;

			case 4:
				form = {"resg-folio":$("#resg-folio").val(), "fin-garantia":$("#fin-garantia").val(), 
					"mnom-prov":$("#mnom-prov").val(), "id-fol-r":$("#id-fol-r").val(), 
					"fecha-ope":$("#fecha-ope").val(), "fecha-fac":$("#fecha-fac").val(), 
					"fecha-cam":$("#fecha-cam").val(), "fecha-mant":$("#fecha-mant").val()};
				id_pag_form = 0;

				//alert(datos_form[0].almacen + " --- " + datos_form[1].costo);
				break;
		}

		datos_form.push(form);

		if (id_pag_form == 0){
			$.ajax({
					url:'ajax/guardar-altas',
					type:'post',
					datatype:'json',
					data: {datos_form:datos_form},
					success:function(data){

						var datos = eval('(' + data + ')');

						console.log(datos);

					}
				})
		};

		id_pag_form++;
		$("#altas-dom").trigger("click"); //sumula el evento click del objeto seleccionado
		
		//console.log(datos_form[0].almacen); 

	} 

});

 // ---------- EVENTOS ON CHANGE DE LOS OPTIPONGROUP DEL FORMULARIO DE ALTAS ------------- 
$(document).on('change', '#almacen', function(event){
	
	$.ajax({
		url:'ajax/option-change',
		type:'get',
		datatype:'json',
		data: {option_change:"almacen"},
		success:function(data){

			var datos = eval('(' + data + ')');

			infoKiosko = datos;

		}
	})
});

$(document).on('change', '#gp-arti', function(event){

	var almacen = $("#almacen").val();
	var gp_arti = $("#gp-arti").val();

	$("#nom-arti").empty();

	$.ajax({
		url: 'ajax/option-change',
		type: 'get',
		datatype: 'json',
		data: {option_change:"gp_arti", almacen:almacen, gp_arti:gp_arti},
		success:function(data){
			
			var datos = eval('(' + data + ')');

			console.log(datos[0]);

			for (var i = 0; i<datos[0].length; i++) {
				$("#nom-arti").append('<option name="" value="'+datos[0][i].NUM_ARTI+'">'+datos[0][i].DESCRIP+'</option>');
			}

		}
	});
});

$(document).on('change', '#kiosko', function(event){
	
	var id_clave = $("#kiosko").val();

	$.ajax({
		url: 'ajax/option-change',
		type: 'get',
		datatype: 'json',
		data: {option_change:"kiosko", id_clave:id_clave},
		success:function(data){
			
			var datos = eval('(' + data + ')');

			$("#modelo").val(""+datos[0][0].modelo+"");
			$("#modelo").trigger("change");
		}
	})
});

$(document).on('change', '#modelo', function(event){

	var modelo = $("#modelo").val();
	var id_clave = $("#kiosko").val();

	$("#modulo").empty();

	$.ajax({
		url: 'ajax/option-change',
		type: 'get',
		datatype: 'json',
		data: {option_change:"modelo", modelo:modelo, id_clave:id_clave},
		success:function(data){
			
			var datos = eval('(' + data + ')');

			for (var i = 0; i<datos[0].length; i++) {
				$("#modulo").append('<option name="" value="'+datos[0][i].modulo+'">'+datos[0][i].modulo+'</option>');
			}

		}
	})
});