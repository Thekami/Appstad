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

        $identificador = Input::get('identificador');
        $id = Input::get('id');
        $num = Input::get('num');


        if ($identificador == "todo") {

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

        if ($identificador == "almacenes") {
            $count = Existencias::where('id_loc','=',$id)->count();

            $Npags = $count/10;
            $Npags = round($Npags);
            $Npags = $Npags + 1;
            $Npags = array('Npags' => $Npags);

            $consulta = Existencias::where('id_loc','=',$id)->take(10)->skip($num)
                                    ->get(array("no_invent", "serie", "nombre", "articulo", 
                                                "grupo", "id_loc", "localiza", "id"));
        }

        //echo $count;
        if ($consulta == "[]") {

            $data[]=array('no_hay'=>"No se encontraron registros");

        }else{

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

        $consulta = Existencias::where('no_invent','=',$val)
                               ->orWhere('serie','=',$val)
                               ->orWhere('nombre','=',$val)
                               ->orWhere('articulo','=',$val)
                               ->orWhere('grupo','=',$val)
                               ->orWhere('localiza','=',$val)
                               ->get(array("no_invent", "serie", "nombre", "articulo", 
                                                "grupo", "id_loc", "localiza"));
       
        if ($consulta == "[]") {
            $data[]=array('no_hay'=>"No se encontraron registros");
        }else{
            foreach ($consulta as $campo) { 
                $data[]=array('no_invent'=>$campo["no_invent"],'serie'=>$campo["serie"],
                'nombre'=>$campo["nombre"],'articulo'=>$campo["articulo"],
                'grupo'=>$campo["grupo"],'id_loc'=>$campo["id_loc"],
                'localiza'=>$campo["localiza"]);
            }
            
            
        }
        echo json_encode($data);
    }

    public function post_cambiar_almacen(){
        $id = Input::get('id');
        //$almacen = ['almacen'=>"..."];

        if ($id != "solo-dom") {

            $datos = Existencias::find($id);
            $info = array('no_invent'=>$datos['no_invent'], 'serie'=>$datos['serie'],
                'articulo'=>$datos['articulo'], 'nombre'=>$datos['nombre'], 
                'localiza'=>$datos['localiza'], 'id_loc'=>$datos['id_loc'], 'id'=>$id);
            
        }else{

            $info = array('no_invent'=>"", 'serie'=>"", 'articulo'=>"", 
                          'nombre'=>"", 'localiza'=>"", 'id_loc'=>"", 'id'=>$id);

        }   

        $almacenes = Kioskosbcs::select('id_clave', 'descrip', 'modulo')->get();

        foreach ($almacenes as $campo) { 
            $almacen[]=array('id_clave'=>$campo["id_clave"],
                             'descrip'=>$campo["descrip"], 
                             'modulo'=>$campo["modulo"]);
        }

        array_push($info, $almacen);
        echo json_encode($info);
        //echo $almacenes;

    }

    public function post_guardar_cambio_almacen(){
        
        $id = Input::get('id');
        $id_loc = Input::get('id_loc');
        $modulo = Input::get('modulo');


        $almacen2 = Kioskosbcs::select('descrip')
                              ->where(array('id_clave'=>$id_loc, 'modulo'=>$modulo))
                              ->get();

        
        $edit = Existencias::find($id);
        $edit->localiza = $almacen2[0]["descrip"];
        $edit->id_loc = $id_loc;
        $edit->save();

        echo "Cambio de almacen Exitoso!";

    }

}

?>