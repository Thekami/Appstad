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

