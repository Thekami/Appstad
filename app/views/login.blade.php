@extends('layouts.master')
@section('title')
Log In
@stop

@section('container')

	<div class="row">
		<div class="module module-login span4 offset4">
			{{Form::open(array('method' => 'POST', 'class' => 'form-vertical'))}} 
				<div class="module-head">
					<h3>Sign In</h3>
				</div>
				<div class="module-body">
					<div class="control-group">
						<div class="controls row-fluid">
							{{ Form::text('username','',  array('placeholder'=>'Username', 'class' => 'span12', 'id'=>'username', 'autofocus')) }}
						</div>
					</div>
					<div class="control-group">
						<div class="controls row-fluid">
							{{ Form::password('password', array('placeholder' => 'Password', "class" => 'span12', 'id'=>'password')) }}
						</div>
					</div>
				</div>
				<div class="module-foot">
					<div class="control-group">
						<div class="controls clearfix">
							{{Form::submit('Go', array('class' => 'btn btn-primary pull-right','id'=>'loginButton' ))}}
						</div>
					</div>
				</div>
				<div class="alert alert-danger" id="loginMsg" style="display:none;">
			    	<button type="button" class="close" onclick="$('#loginMsg').slideUp(400);">&times;</button>
			    	<p id="msgText"></p>
				</div>
			{{Form::close()}}
		</div>
	</div>
	
</div>

@stop
