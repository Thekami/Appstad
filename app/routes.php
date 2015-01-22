<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Route::controller('ajax', 'AjaxController'); //Controlador que maneja las llamadas AJAX


Route::get('/', function()
{
	return View::make('login');
});



//Ruta para login ----------------------------------------------------------------------------------------

//Página oculta donde sólo puede ingresar un usuario identificado
Route::get('/appstad', ['before' => 'auth', function(){
    return View::make('appstad')->with('almacen', Kioskosbcs::select('id_clave', 'descrip')->get());
}]);
//Procesa el formulario e identifica al usuario
//Route::post('/login', ['uses' => 'AuthController@doLogin', 'before' => 'guest']);
//Desconecta al usuario
Route::get('/logout', ['uses' => 'AuthController@doLogout', 'before' => 'auth']);



