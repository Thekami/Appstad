ArchivosJs : {
	
	"CargaInicial.js": {
		"Document ready": "Cargar datos de tabla", 
		"Event OnClick": { 
		  	".links" : "Comportamiento de links de paginacion", 
		  	"#findBtn" : "Busqueda de registros", 
		  	"#loginButton" : "Login",
		  	".alm": "carga la info de la tabla deseada"
		},
		"funciones": {
		 	"paginar" : "integra el bloque para paginar registros"
		}
	},

	"CambioAlmacen.js": {
	 	"Event OnClick": {
	 		"#guardar-cambo-almacen" : "Guarda el cambio de almacen de un articulo",
	 		".move" : "manda a la vista de cambio de almacen cuando seleccionas en el dropdown menu de cada articulo",
	 		"#buscar-no-inv" : "trae informacion del articulo a partir de su numero de inventrio",
	 	}
	},

	"AltasItems.js":{
		"funciones":{
			"form_altas" : {
				"descripcion": " - genera todo el html necesario para cargar el formulario
							 	 - utiliza ls variables globales 'datosform', 'infokiosko' e 'id_pag_form'",
				"variables": { 
					"datosform" : "se van guardando los datos almacenados de cada porcion(pagina)
								   del formulario mostrado y se van agregando susecivamente 
								   los datos de las siguientes porciones del formulario mostrado",
					"infokiosko" : "cuando se selecciona un opccion en el optiongroup de Almacen
									se carga la informacion de los kioskos existentes en relacion
									con el almacen que se selecciono.. Esta informacion es utilizada
									en la tercera pagina del formulario de altas",
					"id_pag_form" : "sirve para identificar en que porcion(pagina) del formulario
									 te encuentras y se va incrementando cada vez que guardas el 
									 contenido de cada porcion, cuando el valor de la variable llega
									 a 4 significa que estas en el tulimo formulario y se mandara 
									 el total de la informacion a guardarse en la DB"
				}
			}
		},
		"Event OnClick": {
			"#altas-dom" : "recarga el div principal para mostrar el formulario de altas de articulos",
			"#guardar-form" : "va guardando la informacion de cada porcion del formulario en la variable 'datosfrm' 
								y al final cuando tiene toda la informacion guardada en la variable, la manda a la DB",
		},
		"Event OnChange" : {
			"#almacen" : "obtiene la informacion necesaria para la variable 'infokiosko'",
			"#gp-arti" : "obtiene la informacion de la DB para llenar el optiongroup de 'Nombre Articulo' ",
			"#kiosko" : "obtiene la informacion de la DB para llenar el campo 'modelo' y simula un evento 
						 de tipo 'change' en ese mismo campo(el campo 'modelo')",
			"#modelo" : "obtiene la informacion de la DB para llenar el optiongroup de 'Modulo' ",
		}
	}

};