<?php 	

Class AjaxController extends BaseController {
	
	public function post_login(){
		$username = Input::get('username');   //obtenemos el username enviado por el form
        $password = Input::get('password');   //obtenemos el password enviado por el form
        //$password = Hash::make($password);  // <-- eso se descomenta para mandar el alert con una password hasheada
        $response = false;
        // Realizamos la autenticación
        if (Auth::attempt(['username' => $username, 'password' => $password]))
        {
            //return Redirect::to('/hidden');
            $response = true;
        }

        echo json_encode($response); // <-- esto se comenta para mandar el alert con una password hasheada
        //echo json_encode($password);  // <-- eso se descomenta para mandar el alert con una password hasheada
	}

    public function get_llenar_tabla(){

        $identificador = Input::get('identificador'); //obtengo valores enviados por la llamada ajax
        $id = Input::get('id');
        $num = Input::get('num');


        if ($identificador == "todo") { //condicion para saber si voy a cargar la tabla de existencias total
                                        // o si solo sera la de un almacen en espesifico

            $count = Existencias::select("no_invent", "serie", "nombre", "articulo", "grupo", 
                                        "id_loc", "localiza", "id")->count();
            $Npags = $count/10;
            $Npags = round($Npags);
            $Npags = $Npags + 1;
            $Npags = array('Npags' => $Npags);


           $consulta = Existencias::select("no_invent", "serie", "nombre", "articulo", "grupo", 
                                        "id_loc", "localiza", "id")->take(10)->skip($num)->get();

           //consulta equivalente a SELECT no_invent... FROM existencias LIMIT 20 OFFSET 1;
           //toma 20 registros comenzando desde el primero.
        }

// este codifgo carga la tabla de existencias de un solo almacen en espesifico
        if ($identificador == "almacenes") {
            $count = Existencias::where('id_loc','=',$id)->count(); //cuento los registros existentes para el almacen que quiero cargar
                                                                    //mediante el id de localizacion de dicho almacen

            $Npags = $count/10; //hago una divicion para saber cuantas paginas ocupare crear (seran paginas de 10 registros cada una)
            $Npags = round($Npags);
            $Npags = $Npags + 1;
            $Npags = array('Npags' => $Npags); // aqui esta el total de paginas que existiran

            $consulta = Existencias::where('id_loc','=',$id)->take(10)->skip($num) //consulta para cargar los primero 10 registros, osea la primera pagina
                                    ->get(array("no_invent", "serie", "nombre", "articulo", 
                                                "grupo", "id_loc", "localiza", "id"));
        }

        //echo $count;
        if ($consulta == "[]") { //si la consulta no encuenta nada entonces se manda este mensaje

            $data[]=array('no_hay'=>"No se encontraron registros");

        }else{ //de lo contrario se crea el objeto json que se enviara con la consulta resultante

        foreach ($consulta as $campo) { 
            $data[]=array('no_invent'=>$campo["no_invent"],'serie'=>$campo["serie"],
            'nombre'=>$campo["nombre"],'articulo'=>$campo["articulo"],
            'grupo'=>$campo["grupo"],'id_loc'=>$campo["id_loc"],
            'localiza'=>$campo["localiza"], 'id' =>$campo["id"]);}
        }
        
        array_push($data, $Npags);

        echo json_encode($data);

     }


    public function post_buscar(){
        $val = Input::get('val');  //recivo el valor  enviado desde la llamada AJAX

        $consulta = Existencias::where('no_invent','=',$val) //consulta de busqueda de registros
                               ->orWhere('serie','=',$val)
                               ->orWhere('nombre','=',$val)
                               ->orWhere('articulo','=',$val)
                               ->orWhere('grupo','=',$val)
                               ->orWhere('localiza','=',$val)
                               ->get(array("no_invent", "serie", "nombre", "articulo", 
                                                "grupo", "id_loc", "localiza"));
       
        if ($consulta == "[]") { //si en la busqueda no se encuentra nada, entonces se manda este mensaje
            $data[]=array('no_hay'=>"No se encontraron registros");
        }else{ //de lo contrario se llena un objeto json con la consulta realizada
            foreach ($consulta as $campo) { 
                $data[]=array('no_invent'=>$campo["no_invent"],'serie'=>$campo["serie"],
                'nombre'=>$campo["nombre"],'articulo'=>$campo["articulo"],
                'grupo'=>$campo["grupo"],'id_loc'=>$campo["id_loc"],
                'localiza'=>$campo["localiza"]);
            }
            
            
        }
        echo json_encode($data); //mando el resultado de la consulta a la llamada ajax
    }

    public function post_cambiar_almacen(){
        $id = Input::get('id'); //obtengo el valor del id del registro que voy a modifcar
        //$almacen = ['almacen'=>"..."];

        if ($id != "solo-dom") { //condicion para saber si cargare el DOM y la informacion de un egistro o si solo sera el puro DOM

            $datos = Existencias::find($id); //busco el registro que voy a modificar a partir de su id
            $info = array('no_invent'=>$datos['no_invent'], 'serie'=>$datos['serie'], //asigno a una variable solo 
                'articulo'=>$datos['articulo'], 'nombre'=>$datos['nombre'],            //solo los campos que necesito
                'localiza'=>$datos['localiza'], 'id_loc'=>$datos['id_loc'], 'id'=>$id);
            
        }else{ //AQUI solo se cargara el DOM

            $info = array('no_invent'=>"", 'serie'=>"", 'articulo'=>"", 
                          'nombre'=>"", 'localiza'=>"", 'id_loc'=>"", 'id'=>$id);

        }   
        //consulto informacion necesaria para la identificacion de los almacenes
        $almacenes = Kioskosbcs::select('id_clave', 'descrip', 'modulo')->get();

        foreach ($almacenes as $campo) { 
            $almacen[]=array('id_clave'=>$campo["id_clave"],
                             'descrip'=>$campo["descrip"], 
                             'modulo'=>$campo["modulo"]);
        } //esta informacion se metera en los option group

        array_push($info, $almacen); //mando la consulta del registro qe se obtuvo al 
                                     //principio, y en la ultima posicion de ese array
                                     //coloco la informacion de los alamacenes
        echo json_encode($info);
        //echo $almacenes;

    }

    public function post_guardar_cambio_almacen(){
        
        $id = Input::get('id'); //obtengo informacion enviada desde la llamada ajax
        $id_loc = Input::get('id_loc');
        $modulo = Input::get('modulo');


        $almacen2 = Kioskosbcs::select('descrip') //obtengo el nombre del almacen que se utilizara en el update
                              ->where(array('id_clave'=>$id_loc, 'modulo'=>$modulo)) //consulto que id_clave y modulo sean iguales a los valores que elegi
                              ->get();                                               //por que existen nombre de almacenes con id_clave repetidos pero se difrencian por el modulo

        
        $edit = Existencias::find($id); //hago la consulta update
        $edit->localiza = $almacen2[0]["descrip"];
        $edit->id_loc = $id_loc;
        $edit->save(); //guardo

        echo "Cambio de almacen Exitoso!"; //envio el mensaje

    }

    public function post_buscar_no_inv(){
        $no_invent = Input::get("no_invent"); //recivo el numero de inventario

        $consulta = Existencias::where("no_invent","=",$no_invent) //obtengo los campos qu necesito en base a ese numero de inventario
                                ->get(array("no_invent", "serie", "articulo",
                                            "nombre" ,"localiza", "id_loc", "id"));

        echo $consulta; //envio la consulta de regreso
    }


}

?>