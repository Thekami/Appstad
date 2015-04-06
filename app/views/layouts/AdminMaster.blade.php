<!DOCTYPE html>
<html lang="es-mx">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- <link rel="shortcut icon" href="{{URL::asset('favicon.ico')}}"> -->
	<title>@yield('title')</title>
	@yield('styles')

	<link rel="stylesheet" href="{{URL::asset('css/bootstrap.min.css')}}">
	<link rel="stylesheet" href="{{URL::asset('css/bootstrap-responsive.min.css')}}">
	<link rel="stylesheet" href="{{URL::asset('css/theme.css')}}">
	<link rel="stylesheet" href="{{URL::asset('css/font-awesome.css')}}">
	<link type="text/css" href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600' rel='stylesheet'>

</head>
<body>

	@yield('navGuest')
		<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
					<i class="icon-reorder shaded"></i>
				</a>

			  	<a class="brand" href="{{ URL::to('/appstad') }}">
			  		Appstad
			  	</a>

				<div class="nav-collapse collapse navbar-inverse-collapse">
				
					<ul class="nav pull-right">

						<li>
							<a href="{{ URL::to('/logout') }}">Salir</a>
						</li>
					</ul>
				</div><!-- /.nav-collapse -->
			</div>
		</div><!-- /navbar-inner -->
	</div><!-- /navbar -->

		<div class="wrapper">
			<div class="container">
				
				@yield('container')
			</div>
		</div>

 <!-- -------------------------------------- Footer ---------------------------------------- -->
 
		<div class="footer">
		<div class="container">
			 @yield('footer')

			<b class="copyright">&copy; 2015 ZonaZero - Tecnologias de Informacion </b> All rights reserved.
		</div>
	</div>

	@yield('scripts')

	<script src="{{URL::asset('js/jquery-1.11.1.min.js')}}"></script>
	<script src="{{URL::asset('js/CargaInicial.js')}}"></script>
	<script src="{{URL::asset('js/CambioAlmacen.js')}}"></script>
	<script src="{{URL::asset('js/AltasItems.js')}}"></script>
	
	<script src="{{URL::asset('js/jquery-ui-1.10.1.custom.min.js')}}"></script>
	<script src="{{URL::asset('js/bootstrap.min.js')}}"></script>
	<script src="{{URL::asset('js/jquery.flot.js')}}"></script>
	<script src="{{URL::asset('js/jquery.flot.pie.js')}}"></script>
	<script src="{{URL::asset('js/jquery.flot.resize.js')}}"></script>
	
	<script src="{{URL::asset('js/common.js')}}"></script>
</body>
</html>