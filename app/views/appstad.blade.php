@extends('layouts.AdminMaster')
@section('title')
AppstadAlmacen
@stop
@section('container')

<div class="row">
	<div class="span3">
		<div class="sidebar">
            <ul class="widget widget-menu unstyled">
                
                <li>
                    <a class="collapsed" data-toggle="collapse" href="#MenuAltas">
                        <i class="menu-icon icon-cog"></i>
                        <i class="icon-chevron-down pull-right"></i>
                        <i class="icon-chevron-up pull-right"></i>
                        Equipo 
                    </a>
                    <ul id="MenuAltas" class="collapse unstyled">
                        <li><a href="#"><i class="icon-inbox"></i>Altas </a></li>
                        <li><a href="#"><i class="icon-inbox"></i>Cambio de Almacen </a></li>
                        <li><a href="#"><i class="icon-inbox"></i>Historial de Cambios </a></li>
                    </ul>
                </li>
                 
                <li>   
                    <a class="collapsed" data-toggle="collapse" href="#MenuAlmacenes">
                        <i class="menu-icon icon-tasks"></i>
                        <i class="icon-chevron-down pull-right"></i>
                        <i class="icon-chevron-up pull-right"></i>
                        Almacenes 
                    </a>
                    <ul id="MenuAlmacenes" class="collapse unstyled">
                        <li>
                            @foreach($almacen as $almacenes)
                                <a href="#" id = "{{$almacenes['almacen']}}">
                                <i></i>
                                {{$almacenes['nombre']}}
                                </a>
                            @endforeach
                            
                        </li>
                    </ul>
                </li>

                <li>   
                    <a class="collapsed" data-toggle="collapse" href="#MenuMsg">
                        <i class="menu-icon icon-inbox"></i>
                        <i class="icon-chevron-down pull-right"></i>
                        <i class="icon-chevron-up pull-right"></i>
                        Mensajes 
                    </a>
                    <ul id="MenuMsg" class="collapse unstyled">
                        <li>
                            <a href="#">
                                <i class="icon-inbox"></i>
                                Leer 
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon-inbox"></i>
                                Redactar
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i class="menu-icon icon-signout"></i>
                        Cerrar Sesion 
                    </a>
                </li>
            </ul>
    </div>
	</div>

	<div class="span9">
		<div class="module">
            <div class="module-head">
                {{Form::open(array('method' => 'POST', 'class'=>'input-append'))}}
                {{ Form::text('username','',  array('placeholder'=>'Buscar', 'id'=>'findTxt')) }}
                {{Form::submit('Go', array('class' => 'btn btn-default','id'=>'findBtn' ))}}
                {{form::close()}}
            </div>
            <div class="module-body table">
                <table class="table  table-striped table-condensed"
                    width="100%">
                    <thead>
                        <tr>
                            <th>No. Inventerio</th>
                            <th>Serie</th>
                            <th>Nombre</th>
                            <th>Articulo</th>
                            <th>Grupo</th>
                            <th>Id Localizacion</th>
                            <th>Localizacion</th>
                        </tr>
                    </thead>
                    <tbody id="DatosExistencias">
                    	
                    </tbody>
                </table>
                <div id="paginacion"></div>
            </div>
        </div>
	</div>
</div>
@stop 