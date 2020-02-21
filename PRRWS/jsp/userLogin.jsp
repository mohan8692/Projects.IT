<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html >
<head>
  <meta charset="UTF-8">
  <title>Login</title>
	<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="Assests/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
	<script src="https://use.fontawesome.com/07d3416f74.js"></script>
</head>
<style>
.liner_gradient {
	background: -webkit-linear-gradient(to right, #333,#777);
	background: -o-linear-gradient(to right, #333,#777);
	background: -moz-linear-gradient(to right, #333,#777);
	background: linear-gradient(to right, #333,#777);

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  text-align:center;
  font-weight:bold;
  color:#fff;
  padding-top: 0px;
  padding-right: 5px;
  padding-bottom: 10px;
  padding-left: 5px;
}
.login_row {
	padding-top: 1rem;
	border-bottom: 1px solid #333;
}
input {

    text-align: left !important;
    border: 2px solid transparent;
    border-radius: 3px;
    font-size: 14px  !important;;
    padding: 10px  !important;;
    padding-bottom: 10px  !important;;
    width: 250px  !important;;
    transition: border .5s  !important;;
    color: #000  !important;;
    font-weight: bold !important;
	border: 0px !important;
	background-color: #fff !important;
	padding-bottom: 5px !important;

}
input:focus {

    box-shadow:none !important;

}
.logoCls
{
	height:70px;
	padding:5px 12px;
}
.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #fff;
}

.focus-input100::after {
  font-family: Material-Design-Iconic-Font;
  font-size: 22px;
  color: #fff;

  content: attr(data-placeholder);
  display: block;
  width: 100%;
  position: absolute;
  top: 6px;
  left: 0px;
  padding-left: 5px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.input100 {
  font-family: Poppins-Regular;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 45px;
  background: transparent;
  padding: 0 5px 0 38px;
}
.btn-success:hover{
	border-color: none !important;
}
</style>
<body>
<header>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-1 col-xs-3">
				<img src="Assests/img/aplogo.png" class="logoCls" alt="logo">
			</div>
			<div class="col-sm-9 col-xs-6">
				<h5 style="margin-bottom: 0px;margin-top: 10px;color: #EC2027"><b>MINISTER <span style="font-size: 10px;">DASHBOARD</span></b></h5>
				<p style="font-size: 10px;color : #22A67E"><b>Information Technology, Panchayath Raj & <br/>
				Rural Development</b></p>
			</div>
			<div class="col-sm-2 col-xs-3">
			<!--<a class="btn btn-primary btn-large btn-block btnSearch m_top20 validateLoginCls" style="display:inline-block; width:95px;" style="cursor:pointer;" >Login</a>-->
			</div>
		</div>
	</div>
</header>
<main style="margin-top:60px;">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
				<div class="login-block liner_gradient" style="">
					<div class="row">
						<img src="Assests/images/promotionLogin.png" style="width: 35px;position: relative;top: 7px;"/>
					</div> 
					<span style="position: relative;top: 6px;">LOG IN</span>
				</div>
				<div class="login-block" style="box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);margin-top:0px;border: 1px solid #333;">
					<div class="row">
						<div class="col-sm-9 col-sm-offset-2">
							<div class="login_row">
								<i class="fa fa-lock"></i> 
								<input type="password" class="" value="" placeholder="Password" id="login-pass" style="border: 0px;background-color: #fff;">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-sm-offset-4"  style="margin-top: 40px;">
							<div class="row">
								<div class="col-sm-8">
									<button type="button" class="btn btn-success btn-sm" onClick="getDetailsCls();" style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;border-radius: 15px;outline:none;background-color: #333;">SIGN IN</button> 
								</div>
								<div class="col-sm-4">
									<img src="Assests/images/spinner.gif" id="loadingSymbolId" style="display:none;width:35px;">
								</div>
							</div>
							
						</div>
					</div>
					<div class="row">
						<h5 style="font-weight:bold;text-align:center;" id="statusMessagePwd"></h5>
					</div>
				</div>
			</div>
		</div>
	</div>				
</main>
<script type = "text/javascript" src = "Assests/js/jquery-1.11.3.js"></script>
<script type="text/javascript">
 function getDetailsCls(){
	
	$("#statusMessagePwd").html("");
	var password = $("#login-pass").val();
	var errorStr = '';
	var errorPwdStr='';
	if(password == 0){
		errorPwdStr += "<span style='color:red'>Password is required</span>";
	}
	if(errorPwdStr.length >0)
	{
		$('#statusMessagePwd').html(errorPwdStr);
		return ;
	}
	$("#loadingSymbolId").show();
	 var json = {
	  passwordHashText:password
	} 
	$.ajax({                
	  type:'POST',    
	  url: 'validatePWD',  
	  dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}  
	}).done(function(result){
		$("#loadingSymbolId").hide();
		if(result !=  null){
		  if(result.responceCode == 1){
			$("#statusMessagePwd").html("<span style='color:green'>Login Successfull,Page is Refreshing,Please Wait...<span>");
			$(location).attr('href', result.url);
		  }else{
			  $("#statusMessagePwd").html("<span style='color:red'>Password is Incorrect,Please Try Again...<span>");
		  }
		}
	}); 
 }
</script>
</body>
</html>