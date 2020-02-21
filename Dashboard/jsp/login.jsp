<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard login</title>
<link href="Core/BaseComponents/bootstap3.0/bootstrap3.0.css" rel="stylesheet" type="text/css"/>
<link href="Core/BaseComponents/logincustom.css" rel="stylesheet" type="text/css"/>
<link href="Core/BaseComponents/animate.css" type="text/css" rel="stylesheet">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css">
</head>
<body>
<header>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-1 col-xs-4">
				<img src="Core/images/tdplogo.png" alt="tdp logo"/>
			</div>
			<div class="col-sm-4 col-sm-offset-3 col-xs-6">
				<img src="Core/images/realtime.png" alt="realtime" class="realtimelogo"/>
			</div>
		</div>
	</div>
</header>
<main>
	<div class="container-fluid">
		<div class="login">
			<div class="row">
				<div class="col-sm-12">
					<img src="Core/images/logo.png" class="logo" alt="logo"/>
				</div>
				<div class="col-sm-12">
					<div class="login-input">
						<div class="float-left login-box">
							<label class="label" for="membershipId">Membership ID</label>
							<input type="text" class="form-control"  autofocus  name="myInput" aria-label="Enter your membership id" id="membershipId" placeholder="Enter Membership ID" input-type="membershipid" maxlength="8"/>	
						</div>
						<div class="float-left">
							<i class="glyphicon glyphicon-download-alt loginBtn otpBtn"></i><img id="membershipLoadingId" src="Core/images/smallLoader.gif" style="width:25px;height:25px;position: relative;left: 6px;top: -3px;display:none;"/>
						</div>
					</div>
				</div>
			</div>
		</div>	
		<div class="otp hide">
			<div class="row">
				<div class="col-sm-12">
					<h1 class="welcome-text">Welcome</h1>
					<img src="Core/images/Group 3544.png" class="userProfile logo" alt="profile image"/>
					<h2 class="welcome-username">lokesh nara</h2>
					<label class="label membershipNumber">Membership ID</label>
				</div>
				<div class="col-sm-12">
					<div class="login-input">
						<div class="float-left login-box">
							<div class="input-group">
								<input type="password" class="form-control" autofocus id="otpInput" input-type="otp" maxlength="6" placeholder="Enter 6 digit OTP"/>
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-eye-close password"></i>
								</span>
							</div>
						</div>
						<div class="float-left">
							<i class="glyphicon glyphicon-download-alt loginBtn otpVerifyBtn"></i><img id="otpLoadingId" src="Core/images/smallLoader.gif" style="width:25px;height:25px;position: relative;left: 6px;top: -3px;display:none;"/>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div class="login-input-responsive">
						<h5 style="margin-top:10px;" class="otpNumber color_white"></h5>
						<h5 style="margin-top:8px;" class="otpExpiryNumber color_white"></h5>
						<h5 style="margin-top:5px;">
							<span class="backBtn text-danger" style="cursor:pointer;">
								<i class="fas fa-arrow-left"></i> Back to Login
							</span>
							<span class="resendOtp text-danger pull-right" style="cursor:pointer;position: relative;right: 80px;">
								 Resend OTP Now
							</span>
						</h5>
					</div>
				</div>
			</div>
			
				
			
		</div>
		<div class="row">
			<div class="col-sm-12">
				<p class="text-danger error-div text-center" style="margin-top:30px;"></p>
			</div>
		</div>
	</div>
</main>
<script src="Core/BaseComponents/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Core/BaseComponents/bootstap3.0/bootstrap3.0.js" type="text/javascript"></script>
<script type="text/javascript">
	var mobileNo,
		userMembershipId;
	$('input[name=myInput]').focus();
	$(document).on('click','.backBtn',function(){
		$(".login").removeClass('hide');
		$(".otp").addClass('hide');
		$("#membershipId").val('');
	});
	$('[data-toggle="tooltip"]').tooltip()
	
	$(document).on('click','.otpVerifyBtn',function(){
		var value = $("#otpInput").val();
		if(value.length == 6 && mobileNo){
			verifyOtp(value)
		}else if(value.length == 0){
			$(".error-div").html('OTP Is Invalid.Please Check Once').addClass('animated tada');
		}else if(value.length > 0 && value.length < 6){
			$(".error-div").html('OTP Is Invalid.Please Check Once').addClass('animated tada');
		}
	});
	
	$(document).on('keypress','#otpInput,#membershipId',function (e) {
		var inputType = $(this).attr('input-type');
		userMembershipId = $("#membershipId").val();
		if (e.which == 13) {
			if(inputType == 'membershipid'){
				generateOtp(userMembershipId,"NotForResetOTP");
			}else if(inputType == 'otp'){
				var value = $("#otpInput").val();
				verifyOtp(value)
			}
			
		}
	});
	
	$(document).on('click','.resendOtp',function(){
		generateOtp(userMembershipId,"ForResetOTP");
	});
	
	$(document).on('click','.otpBtn',function(){
		userMembershipId = $("#membershipId").val();
			
		if(userMembershipId.length == 8){
			generateOtp(userMembershipId,"NotForResetOTP")
		}else if(userMembershipId.length == 0){
			$(".error-div").html('Please Enter Valid Membership ID').addClass('animated tada');
		}else if(userMembershipId.length > 0 && userMembershipId.length < 8){
			$(".error-div").html('Please Enter Valid Membership ID').addClass('animated tada');
		}
		setTimeout(function(){
			$(".error-div").removeClass('animated tada');
		},1000)
	});
	function generateOtp(value,forOtp){
		$("#membershipLoadingId").show();
		var json={
			"moduleType": value,
			"impactLevel":forOtp
		};
		$.ajax({
			url: 'generateOtpForLogin',
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(response) {
				$("#membershipLoadingId").hide();
				if(response.shortName && response.name){
					$(".welcome-username").html(response.shortName.toLowerCase()).addClass('animated zoomIn');
					$(".userProfile").attr('src','http://mytdp.com/images/cadre_images/'+response.statusType).addClass('animated zoomInDown')
					$(".userProfile").attr('onerror','setDefaultImage(this)').addClass('animated zoomInDown')
					mobileNo = response.name;
					$(".membershipNumber").html('(MID: '+value+')');
					$(".otpNumber").html('Your OTP Sent to '+mobileNo.substring(0,2)+'*******'+mobileNo.substring(8,10)+'');
					$(".otpExpiryNumber").html(response.alertType);
					//$("#validOtpId").html(response.alertType);
					$(".login").addClass('hide');
					$(".otp").removeClass('hide')
					$(".error-div").html('').removeClass('animated tada');
				}else{
					$(".error-div").html('Your Membership ID Is Invalid Please Check Membership ID.').addClass('animated tada');
					setTimeout(function(){
						$(".error-div").removeClass('animated tada');
					},1000)
				}			
			},
		});
	}
	function verifyOtp(value){
		$("#otpLoadingId").show();
		var json={
				"impactLevel" : value,
				"moduleType": userMembershipId
			};
		$.ajax({
			url: 'otpVerificationForLogin',
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(response) {
				$("#otpLoadingId").hide();
				console.log(response);
				if(response.name !=null && response.name.trim().length>0){
					window.location.replace('mainLayout','_self');
					$(".login").addClass('hide');
					$(".otp").removeClass('hide')
					$(".error-div").html('').removeClass('animated tada');
					$(".input-group").removeClass("input-group-alert")
				}else{
					$(".error-div").html('Your OTP is invalid. Please check once').addClass('animated tada');
					$(".input-group").addClass("input-group-alert")
					setTimeout(function(){
						$(".error-div").removeClass('animated tada');
					},1000);
				}
				//window.location.replace('mainLayout?cadreId='+response.name+'','_self');
				//window.location.replace('mainLayout','_self');
				
			},
		});
	}
	$(document).on('click','.password',function(){
		var $listSort = $('#otpInput');
		if ($listSort.attr('type') === 'password') {
			$listSort.attr('type','text');
			$(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
		} else {
			$listSort.attr('type','password');
			$(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
		}
	});
	function setDefaultImage(img){
		img.src = "Core/images/human.jpg";
	}
</script>
</body>
</html>