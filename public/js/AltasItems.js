
// -------- COMIENZAN EVENTOS Y FUNCIONES PARA EL MODULO DE ALTAS DE DISPOSITIVOS --------------------------


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
	});

});


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
					"articulo":$("#nom-arti").val(), "folio":$("#folio").val(),
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
						console.log(data);
						/*var datos = eval('(' + data + ')');

						console.log(datos);*/

					}
				});
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
	});
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
				$("#nom-arti").append('<option name="'+datos[0][i].DESCRIP+'" value="'+datos[0][i].NUM_ARTI+'">'+datos[0][i].DESCRIP+'</option>');
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
	});
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
	});
});



