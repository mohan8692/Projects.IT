<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login Page</title>
<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="Assests/css/style.css" rel="stylesheet" type="text/css">
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
.logoCls
{
	height:70px;
	padding:5px 12px;
}
.login_block{
	padding:20px;
	background-color:#fff;
	box-shadow:0px 5px 5px rgba(225, 225, 225, 0.4);
	border-radius:5px;
}
.text-capital{
	text-transform:uppercase;
}
.text_bold{
	font-weight:bold;
}
hr{
	border-top: 1px solid #333;
	margin-top:5px;
	margin-bottom:5px;
}
.login_row {
	padding-top: 1rem;
	border-bottom: 1px solid #ccc;
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
input:hover {

    border:none !important;

}
.m_top15{
	margin-top:15px;
}
.m_top10{
	margin-top:15px;
}
.m_top30{
	margin-top:35px;
}
</style>
</head>
<body class="bg_class">
<header>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-1 col-xs-3">
				<img src="Assests/img/aplogo.png" class="logoCls" alt="logo">
			</div>
			<div class="col-sm-9 col-xs-6">
				<h5 style="margin-bottom: 0px;margin-top: 10px;color: #EC2027"><b>MINISTER <span style="font-size: 10px;">DASHBOARD</span></b></h5>
				<p style="font-size: 10px;color : #065e06;font-weight:bold;"><b>Information Technology, Panchayath Raj & <br/>
				Rural Development</b></p>
			</div>
			<div class="col-sm-2 col-xs-3">
			<!--<a class="btn btn-primary btn-large btn-block btnSearch m_top20 validateLoginCls" style="display:inline-block; width:95px;" style="cursor:pointer;" >Login</a>-->
			</div>
		</div>
	</div>
</header>
<div class="container-fluid" style="margin-top:70px;">
	<div class="row">
		<div class="col-sm-12">
			<div class="col-sm-6 col-sm-offset-3">
				<div class="login_block">
					<div class="row">
						<div class="col-sm-6">
							<img src="Assests/img/Group 2329.png" alt="image" style="margin-left:auto;margin-right:auto;display:block;width:150px;">
							<h4 style="color: #EC2027;text-align:center;"><b>NARA LOKESH</b></h4>
							<p style="font-size: 12px;text-align:center;">Minister for Information Technology,<br/> Panchayath Raj and Rural Development,<br/>(Government of Andhra Pradesh)</p>
						</div>
						<div class="col-sm-6">
							<h5 class="text-capital text-center text_bold">LOGIN</h5>
							<hr/>
							<div class="login_row m_top10">
								<i class="fa fa-user"></i> 
								<input type="text" class="" value="" placeholder="USERNAME" id="loginName" style="border: 0px;background-color: #fff;">
								<span id="statusErrUserId"></span>	
							</div>
							<div class="login_row m_top15">
								<i class="fa fa-lock"></i> 
								<input type="password" class="" value="" placeholder="PASSWORD" id="loginPass" style="border: 0px;background-color: #fff;">
								<span id="statusErrPwdId"></span>
							</div>
							<div class="row">
								<div class="col-sm-10 m_top30">
									<button type="button" class="btn btn-success btn-lg" onClick="userLogin();" style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;border-radius:0px;outline:none;background-color: #333;width:100%"><span style="float: right;margin-right: 16px;">SIGN IN <i class="fa fa-sign-in" aria-hidden="true"></i></span></button> 
								</div>
								<div class="col-sm-2 m_top30">
									<img src="Assests/images/spinner.gif" id="spinnerImg" style="display:none;width:35px;">
								</div>
							</div>
							<div class="row">
								<h6 style="font-weight:bold;text-align:center;" id="successMessage"></h6>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script type="text/javascript">
function userLogin(){
	$("#statusErrUserId").html(' ');
	$("#statusErrPwdId").html(' ');
	$("#successMessage").html(' ');
		
	var userName = $("#loginName").val();
	var password = $("#loginPass").val();

	var errorStr = '';
	var errorPwdStr='';
	if(userName == 0 || userName == '' || userName == null || userName.trim().length == 0){
		errorStr += "<p style='color:red'>Username is required</p>";
	}
	if(password == 0 || password == ''  || password == null  || password.trim().length == 0 ){
		errorPwdStr += "<p style='color:red'>Password is required</p>";
	}
	if(errorStr.length >0)
	{
		$('#statusErrUserId').html(errorStr);
		return ;
	}else{
		$('#statusErrUserId').html('');
	}
	if(errorPwdStr.length >0)
	{
		$('#statusErrPwdId').html(errorPwdStr);
		return ;
	}else{
		$('#statusErrPwdId').html('');
	}
	$("#spinnerImg").show();
	 var json = {
	  username:userName,
	  passwordHashText:password
	} 
	/* var json = {
		userName:"itgrids",
		password:"itgrids@123"
	} */
	$.ajax({                
	  type:'POST',    
	  url: 'userLogin',  
	  dataType: 'json',
	data : JSON.stringify(json),
	beforeSend :   function(xhr){
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
	}  
	}).done(function(result){
		if(result !=  null){
		  if(result.responceCode == 0){
			$("#successMessage").html("<span style='color:red'>Invalid UserName and Password,Please Try Again..<span>");
			$("#spinnerImg").hide();
		  }else if(result.responceCode == 1){
			$("#successMessage").html("<span style='color:green'>Login Successfull,Page is Refreshing,Please Wait...<span>");
			$(location).attr('href', result.url);
			$("#spinnerImg").hide();
		  }
		}
	});
}
$(document).bind('keypress', function(event) {
	 var keyCode = (event.keyCode ? event.keyCode : event.which); 
    if(keyCode == 13){
       $('#signinId').trigger('click');
     }  
}); 
</script>
</body>
</html>