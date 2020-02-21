<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta content=’width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0′ name=’viewport’ />
    <meta name=”viewport” content=”width=device-width” />
    <meta name="theme-color" content="#000000">
    <title>Core DashBoard</title>
	<script src="Core/BaseComponents/jquery-1.11.3.js" type="text/javascript"></script>
    <link href="Core/BaseComponents/bootstrap.css" rel="stylesheet" type="text/css"/>
	<link href="Core/BaseComponents/custom.css" rel="stylesheet" type="text/css"/>
	<link href="Core/BaseComponents/customResponsive.css" rel="stylesheet" type="text/css"/>
	<link href="Core/BaseComponents/menu.css" rel="stylesheet" type="text/css"/>
	<link href="Core/BaseComponents/Plugins/Date/daterangepicker.css" rel="stylesheet" type="text/css"/>
	<link href="Core/BaseComponents/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
	<link href="Core/BaseComponents/Plugins/Slick/slick.css" type="text/css" rel="stylesheet"/>
	<link href="Core/BaseComponents/Plugins/Slick/slick-theme.css" type="text/css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="Core/BaseComponents/Plugins/DataTable/datatables.min.css"/>
	<link href="Core/BaseComponents/Plugins/Rating/bootstrap-rating.css" type="text/css" rel="stylesheet"/>
	<link href="Core/BaseComponents/Plugins/ImageExpand/source/jquery.fancybox.css" type="text/css" rel="stylesheet"/>
	<link href="Core/BaseComponents/Plugins/ImageExpand/source/helpers/jquery.fancybox-buttons.css" type="text/css" rel="stylesheet"/>
	<link href="Core/BaseComponents/Plugins/ImageExpand/source/helpers/jquery.fancybox-thumbs.css" type="text/css" rel="stylesheet"/>
	<link href="Core/BaseComponents/Plugins/Map/leaflet.css" type="text/css" rel="stylesheet"/>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css">
	<link href="Core/BaseComponents/animate.css" type="text/css" rel="stylesheet">
	<style> 
		.table_custom_meeting thead tr th, .table_custom_meeting tbody tr td{
			background-color:#fff;
		}
	</style>
</head>
<body class="scrollTopDefault">
	<header>
		<nav>
			<div class="container-fluid">
				<div class="row">
					<div class="col-3">
						<div class="row">
							<div class="col-sm-12">
								<div class="overlay"></div>
								<div class="side_menu">
									<div class="burger_box">
										<i class="fas fa-align-justify align_justify menu-icon js-menu_toggle closed"></i>
										
									</div>
									<div class="">
										<h6 class="text-center color_white m_top25 text-uppercase">COREDASHBOARD MENU</h6>
										<ul class="list_load levelWiseDetailsCls">
											
											<li class="active" attr_name="favourites" attr_type="favourites" >
												<i class="fas fa-star"></i>  <span class="m_left_5">FAVOURITES</span>
											</li>
											
											<li attr_type="ALERTS" attr_name="ALERTS" id="Alerts" style="display:none;">
												<i class="fas fa-bell"></i>  <span class="m_left_5">Alerts</span>
											</li>
											<li attr_type="MEETINGS" attr_name="MEETINGS" id="Meetings" class="displayNoneCls">
												<i class="fas fa-users"></i>  <span class="m_left_5">Meetings</span>
											</li>
											<li attr_type="SPECIALMEETINGS" attr_name="SPECIAL MEETINGS" id="SpecialMeetings" class="displayNoneCls">
												<i class="fas fa-users"></i>  <span class="m_left_5">SPECIAL Meetings</span>
											</li>
											<li attr_type="ACTIONBOTS" attr_name="ACTION BOTS" id="ActionBots" class="displayNoneCls">
												<i class="fas fa-users"></i>  <span class="m_left_5">Action Bots</span>
											</li>
											<li attr_type="TOURS" attr_name="TOURS" id="Tours" class="displayNoneCls">
												<i class="fas fa-bus-alt"></i>  <span class="m_left_5">Tours</span>
											</li>
											<li attr_type="DEBATES" attr_name="DEBATES" id="Debate" class="displayNoneCls">
												<i class="fas fa-users"></i>  <span class="m_left_5">DEBATES</span>
											</li>
											<li attr_type="PRESSMEETS" attr_name="PRESSMEETS" id="Pressmeets" class="displayNoneCls">
												<i class="fas fa-newspaper"></i>  <span class="m_left_5">PRESSMEETS</span>
											</li>
											<li attr_type="PRINTMEDIA" attr_name="PRINT MEDIA" id="PrintMedia" class="displayNoneCls">
												<i class="fas fa-newspaper"></i>  <span class="m_left_5">PRINT MEDIA</span>
											</li>
											<li attr_type="ELECTRONICMEDIA" attr_name="ELECTRONIC MEDIA" id="ElectronicMedia" class="displayNoneCls">
												<i class="fas fa-tv"></i>  <span class="m_left_5">ELECTRONIC MEDIA</span>
											</li>
											<li attr_type="EMCOVERAGETIME" attr_name="EM COVERAGE TIME" id="EMCoverageTime" class="displayNoneCls">
												<i class="fas fa-tv"></i>  <span class="m_left_5">EM Coverage Time</span>
											</li>
											<li attr_type="CBNARMY" attr_name="CBN ARMY" id="CBNArmy" class="displayNoneCls">
												<i class="fas fa-user"></i>  <span class="m_left_5">CBN ARMY</span>
											</li>
											<li attr_type="TRAININGS" attr_name="TRAININGS" id="Trainings" class="displayNoneCls">
												<i class="fas fa-user"></i>  <span class="m_left_5">SEVAMITRA TRAININGS</span>
											</li>
											<li attr_type="ACTIVITIES" attr_name="ACTIVITIES" id="Activities" class="displayNoneCls">
												<i class="fas fa-user"></i>  <span class="m_left_5">SEVAMITRA ACTIVITIES</span>
											</li>
										</ul>	
									</div>
								</div>
							</div>
							
						</div>
					</div>
					<div class="col-6">
						<img src="Core/images/Symbol.png" class="imgage_pos_center img-fluid"/>
					</div>
					<div class="col-3 desktopViewCls">
						<div class="media float-right m_right20">
						  <img class="login_img" onerror="setDefaultImage(this);" src="http://mytdp.com/images/cadre_images/${sessionScope.User.phoneNo}" alt="Generic placeholder image">
						  <div class="media-body m_top_left_8">
							<h5 class="color_white m_bottom_5">Welcome</h5>
							<h6 class="color_white m_bottom_5 font_weight"><i>${sessionScope.User.userName}</i> <i class="fas fa-caret-down logoutIconCls"></i></h6>
							<div class="menuLogin-data-cls">
								<div class="arrow_box_top">
									<div class="row">
										<div class="col-sm-12">
											<a  href="signOut"><i class="fas fa-sign-out-alt" style="color:red;"></i><span style="color:#1B2336;font-weight:bold;font-size:13x;margin-left:5px;">Logout</span></a>
										</div>
									</div>
								</div>
							</div>
						  </div>
						</div>
					</div>
					<div class="col-3 mobileViewCls">
						<img class="login_img" onerror="setDefaultImage(this);" src="http://mytdp.com/images/cadre_images/${sessionScope.User.phoneNo}" alt="Generic placeholder image">
						<i class="color_white font_weight fas fa-caret-down logoutIconMobileViewCls" style=""></i>
						<div class="menuLoginMV-data-cls">
								<div class="arrow_box_top">
									<div class="row">
										<div class="col-sm-12">
											<h5 class="m_bottom_5">Welcome</h5>
											<h6 class="m_bottom_5 font_weight"><i>${sessionScope.User.userName}</i></h6>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12">
											<a  href="signOut" class="float-right"><i class="fas fa-sign-out-alt" style="color:red;"></i><span style="color:#1B2336;font-weight:bold;font-size:13x;margin-left:5px;">Logout</span></a>
										</div>
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-1">
			</div>
			<div class="col-sm-10">
				<h4 class="m_top20 text-center font_weight m_bottom_0 text-uppercase" id="blockHeadingNameId">favourites</h4>
				<img src="Core/images/border_image.png" class="" id="blockHeadingNameImg" style="margin-left: auto;margin-right: auto;display: block;"/>
			</div>
			<div class="col-sm-1">
				<span class="settings_icon menu-cls" style="display:none;"><i class="fas fa-cogs" style="color:#fff;"></i></span>
				<div class="menu-data-cls">
					<div class="arrow_box_top">
						<div class="row">
							<div class="col-sm-12">
								<h6 class="font_weight font_12">PARTY</h6>
								<select class="form-control select-chosen partyId" id="">
									<option value="872" selected>TDP</option>
									<option value="1117">YSRC</option>
									<option value="362">INC</option>
									<option value="163">BJP</option>
									<option value="1853">JANASENA</option>
								</select>
							</div>
							<div class="col-sm-12 m_top10">
								<h6 class="font_weight font_12">SELECT TYPE</h6>
								<select class="form-control select-chosen selectTypeId" id="">
									<option value="1" selected>Positive</option>
									<option value="2">Negative</option>
								</select>
							</div>
							<div class="col-sm-12 m_top10 printMediaCls" style="display:none;">
								<h6 class="font_weight font_12">EDITION</h6>
								<select class="form-control select-chosen editionTypeId" id="">
									<option value="0" selected>ALL</option>
									<option value="1">Main</option>
									<option value="2">District</option>
								</select>
							</div>
							<div class="col-sm-12 m_top10 electronicMediaCls" style="display:none;">
								<h6 class="font_weight font_12">News Type</h6>
								<select class="form-control select-chosen newsTypeId" id="">
									<option value="0" selected>ALL</option>
									<option value="2">News Program</option>
									<option value="1">News Bulletin</option>
								</select>
							</div>
							<div class="col-sm-12 m_top10">
								<button type="button" class="btn btn-sm btn-success btn-block font_weight getNewsDetilsCls" style="border-radius:0px;">SUBMIT</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="favouritesDivId" block-category-type="favourites" class="row"></div>
		<div id="categoryWiseDivId" class="m_bottom30"></div>
		
		<div class="row">
			<div class="col-sm-12">
				<div class="scrollMoreDetailsCls"></div>
			</div>
		</div>
		
		<div class="row">
			<div class="col-sm-12 m_top20">
				<div id="moreDetailsBlockDivId"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="scrollTopHtml displayHide">
					<i class="fas fa-arrow-up"></i>
				 </div>
			</div>
		</div>
	</div>
	 
	<div class="modal fade" id="overViewDetailsModalDivId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog modal-lg" role="document" style="min-width:30%">
		<div class="modal-content">
			<div id="modalOverViewBlockDivId"></div>
		</div>
	  </div>
	</div>
	
	<div class="modal fade modalScroll" id="meetingTypeModalDivId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top: -25px;padding-left: 0px;">
	  <div class="modal-dialog modal-lg" role="document" style="min-width:85% !important;box-shadow: 5px 1px 5px 2px rgba(0, 0, 0, 9.0);">
	  
		<div class="modal-content">
			<div class="modal-body" style="height:auto !important;">
				<button type="button" class="close close_btn_stl1" data-dismiss="modal"><i class="far fa-times-circle"></i></button>
					<div class="row">
						<div class="col-sm-12">
							<h5 class=""><span class="font_weight text-uppercase" id="meetingTypeHeadingId"></span></h5>
						</div>
					</div>
					<hr class="hr_cls"/>
					
					<div id="meetingWiseWiseModalDivId"></div>
					<div id="meetingWiseAttendanceDtsDivId"></div>
				</div>
			   <div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		</div>
	  </div>
	</div>
	
	<div class="modal fade modalScroll" id="actionBotsModalDivId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top: -25px;padding-left: 0px;">
	  <div class="modal-dialog modal-lg" role="document" style="min-width:85% !important;box-shadow: 5px 1px 5px 2px rgba(0, 0, 0, 9.0);">
	  <div class="modal-content">
			<div class="modal-body" style="height:auto !important;">
				<button type="button" class="close close_btn_stl1" data-dismiss="modal"><i class="far fa-times-circle"></i></button>
					<div class="row">
						<div class="col-sm-12">
							<h4 class="color_yash"><i class="fas fa-bell"></i> <img src="Core/images/logo-ActionBots.png" class="img-responsive" alt="actionBots" style="width: 200px;height: auto;"> - <small class="text-uppercase" style="color:#1B2336 !important" id="actionBotsHeadingId"></small>   </h4>
						</div>
					</div>
					<hr class="hr_cls"/>
					<div id="actionBotsDetailsDivId"></div>
					<div id="actionBotsSubClickDetailsDivId"></div>
				</div>
			   <div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		</div>
	  </div>
	</div>
	
	<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" id="myModalShowNew">
		<div class="modal-dialog modal-lg" role="document" style="min-width:80% !important;">
			<div class="modal-content">
				<div id="myModalShowNewId"></div>
			</div>
		</div>  
	</div>	
	
	<script src="Core/BaseComponents/popper.min.js"></script>
	<script src="Core/BaseComponents/bootstrap.js" type="text/javascript"></script>
	<script type="text/javascript" src="Core/BaseComponents/Plugins/DataTable/datatables.min.js"></script>
	<script src="Core/BaseComponents/Plugins/Date/moment.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/Rating/bootstrap-rating.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/ImageExpand/source/jquery.fancybox.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/ImageExpand/source/helpers/jquery.fancybox-buttons.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/ImageExpand/source/helpers/jquery.fancybox-thumbs.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/Slick/slick.js" type="text/javascript"></script>
	<script src="Core/BaseComponents/Plugins/tableFixed/tableHeadFixer.js"></script>
	<script src="Core/BaseComponents/Plugins/Map/Boundaries.js"></script>
	<script src="Core/BaseComponents/Plugins/Map/leaflet.js"></script>
	
	<script src="Core/Templates/mainLayout.js" type="text/javascript"></script>
	<script src="Core/Templates/coreComponent.js" type="text/javascript"></script>
	<script src="Core/Templates/politicalAlertModal.js" type="text/javascript"></script>
	<script src="Core/Templates/politicalAlertModalClicks.js" type="text/javascript"></script>
	<script src="Core/Templates/meetingsModal.js" type="text/javascript"></script>
	<script src="Core/Templates/actionbotsModal.js" type="text/javascript"></script>
	<script src="Core/Templates/pressMeetsModal.js" type="text/javascript"></script>
	<script src="Core/Templates/toursModal.js" type="text/javascript"></script>
	<script src="Core/Templates/printMediaModal.js" type="text/javascript"></script>
	<script src="Core/Templates/EMCoverageTime.js" type="text/javascript"></script>
	<script src="Core/Templates/cbnArmy.js" type="text/javascript"></script>
	<script src="Core/Templates/Map.js" type="text/javascript"></script>
	<script src="Core/Templates/specialMeetingModal.js" type="text/javascript"></script>
	<script src="Core/Templates/TrainingsModal.js" type="text/javascript"></script>
	<script src="Core/Templates/activitiesModal.js" type="text/javascript"></script>
	<script type="text/javascript">
		//alert('${sessionScope.User.responceCode}')
		//alert('${sessionScope.User.userTypeId}')
		//alert('${sessionScope.User.userType}')
		$(".chosen-select").chosen();
		$(".tooltipCls").tooltip();
		$(".select-chosen").chosen();
		$(document).on('click','.js-menu_toggle.closed',function(e){
			e.preventDefault(); $('.list_load li').stop(); 
			$(this).removeClass('closed').addClass('opened');
			$(this).removeClass('fas fa-align-justify').addClass('fas fa-times');
			$('.overlay').show();
			$('.side_menu').css({ 'left':'0px' });
		});
		
		$(document).on('click','.js-menu_toggle.opened',function(e){
			e.preventDefault(); $('.list_load li').stop();
			$(this).removeClass('fas fa-times').addClass('fas fa-align-justify');
			$(this).removeClass('opened').addClass('closed');
			$('.overlay').hide();
			$('.side_menu').css({ 'left':'-225px' });
		});
	</script>
	<script type="text/javascript">
	var blockArr = [{blockNo:'5',blockName:"ALERTS",blockShow:'none',
						categoryWiseArr:[{id:"politicalAlertId",name:"POLITICAL ALERTS",icon:"<i class='fas fa-bell color_yash'></i>",url:"politicalAlertsDetails",module_owner:'Kumar Chowdary',sub_heading:"OVERALL PENDING",mian_tail_ajax_call:'getPoliticalAlertOverviewDetails',mobileNo:'9704225678'}]
						
					},{blockNo:'6',blockName:"MEETINGS",blockShow:'none',
						categoryWiseArr:[{id:"meetingId",name:"MEETINGS",icon:"<i class='fas fa-users color_yash'></i>",url:"",module_owner:'G.RAJESH',sub_heading:"NOT CONDUCTED MEETING",mian_tail_ajax_call:'getPartyMeetingOverviewDetails',mobileNo:'9989910909'}]
						
					},{blockNo:'8',blockName:"ACTIONBOTS",blockShow:'none',
						categoryWiseArr:[{id:"actionBotsId",name:"ACTION BOTS",icon:"<i class='fas fa-bell color_yash'></i>",url:"",module_owner:'G.RAJESH',sub_heading:"OVERALL PENDING",mian_tail_ajax_call:'getActionBoatsDetails',mobileNo:'9989910909'}]
						
					},{blockNo:'4',blockName:"TOURS",blockShow:'none',
						categoryWiseArr:[{id:"toursId",name:"TOURS",icon:"<i class='fas fa-bus-alt'></i>",url:"",module_owner:'G.RAJESH',sub_heading:"OVERALL",mian_tail_ajax_call:'getTourOverviewDetails',mobileNo:'9989910909'}]
						
					}/* ,{blockNo:'12',blockName:"favourites",blockShow:'none',
						categoryWiseArr:[{id:"favouritesDivId",name:"favourites",icon:"fas fa-users",url:"",module_owner:'',sub_heading:"",mian_tail_ajax_call:''}]
						
					} */,{blockNo:'3',blockName:"DEBATES",blockShow:'none',
						categoryWiseArr:[{id:"debatesId",name:"DEBATES",icon:"<i class='fas fa-bell color_yash'></i>",url:"",module_owner:'ANIL',sub_heading:"TDP RATING TILL NOW",mian_tail_ajax_call:'getDebatePerformanceOverciewDetails',mobileNo:'9848810430'}]
					},{blockNo:'7',blockName:"PRESSMEETS",blockShow:'none',
						categoryWiseArr:[{id:"pressmeetsId",name:"PRESS MEETS",icon:"<i class='fas fa-newspaper color_yash'></i>",url:"",module_owner:'ANIL',sub_heading:"TDP RATING TILL NOW",mian_tail_ajax_call:'getPressmeetOverviewDetails',mobileNo:'9848810430'}]
					},{blockNo:'1',blockName:"PRINTMEDIA",blockShow:'none',
						categoryWiseArr:[{id:"printMediaId",name:"PRINT MEDIA",icon:"<i class='fas fa-newspaper color_yash'></i>",url:"",module_owner:'PEDDI RAMA RAO',sub_heading:"OVERALL POSITIVE NEWS TDP",mian_tail_ajax_call:'getCoreDashBoardPrintMediaOverAllDetails',mobileNo:'9391005610'}]
					},{blockNo:'2',blockName:"ELECTRONICMEDIA",blockShow:'none',
						categoryWiseArr:[{id:"elctronicMediaId",name:"ELECTRONIC MEDIA",icon:"<i class='fas fa-tv color_yash'></i>",url:"",module_owner:'PEDDI RAMA RAO',sub_heading:"OVERALL POSITIVE NEWS TDP",mian_tail_ajax_call:'getEMOverallChannelWiseDetails',mobileNo:'9391005610'}]
					},{blockNo:'11',blockName:"EMCOVERAGETIME",blockShow:'none',
						categoryWiseArr:[{id:"emCovreageTimeId",name:"EM Coverage Time",icon:"<i class='fas fa-tv color_yash'></i>",url:"",module_owner:'K Rajesh',sub_heading:"OVERALL POSITIVE NEWS TDP",mian_tail_ajax_call:'getEMCoverageTimeOverallChannelWiseDetails',mobileNo:'9849047241'}]
					},{blockNo:'10',blockName:"CBNARMY",blockShow:'none',
						categoryWiseArr:[{id:"cbnArmyId",name:"CBN ARMY",icon:"<i class='fas fa-user'></i>",url:"",module_owner:'',sub_heading:"PENDING TASKS",mian_tail_ajax_call:'getDashboardCBNArmyOverViewDetails',mobileNo:'9999999999'}]
					},{blockNo:'9',blockName:"SPECIALMEETINGS",blockShow:'none',
						categoryWiseArr:[{id:"specialMeetingId",name:"SPECIAL MEETINGS",icon:"<i class='fas fa-users color_yash'></i>",url:"",module_owner:'G.RAJESH',sub_heading:"INVITEES NOT ATTENED",mian_tail_ajax_call:'getSpecialMeetingsMainTileOverView',mobileNo:'9989910909'}]
					},{blockNo:'13',blockName:"TRAININGS",blockShow:'none',
						categoryWiseArr:[{id:"trainingsId",name:"TRAININGS",icon:"<i class='fas fa-users color_yash'></i>",url:"",module_owner:'G.RAJESH',sub_heading:"YET TO TRAIN",mian_tail_ajax_call:'getSevamitraTrainingOveralDeatils',mobileNo:'9989910909'}]
					},{blockNo:'14',blockName:"ACTIVITIES",blockShow:'none',
						categoryWiseArr:[{id:"activitiesId",name:"ACTIVITIES",icon:"<i class='fas fa-users color_yash'></i>",url:"",module_owner:'G.RAJESH',sub_heading:"NOT COVERED BOOTHS",mian_tail_ajax_call:'getSevaMitraActivityTiles',mobileNo:'9989910909'}]
					}];
					
	//Block Wise Building
	var cadreId = '${param.cadreId}';
	getComponentDetailsOfMember();
	CoreComponent.favourite.init();
	CoreComponent.favourite.getComponent();
	//CoreDashboard.mainLayout.buildmainLayout('categoryWiseDivId',"");
	var loginResponse="";
	function getComponentDetailsOfMember(){
		var json={
				"cadreId" : cadreId
			};
		$.ajax({
			url: 'getComponentDetailsOfMember',
			data: JSON.stringify(json),
			type: "POST",
			dataType: 'json', 
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(response) {
				if(response !=null && response.length>0){
					$("#blockHeadingNameId,#blockHeadingNameImg").show();
					loginResponse = response;
					for(var lg in response){
						console.log(response[lg].name)
						$("#"+response[lg].name).show();
					}
					CoreDashboard.mainLayout.buildmainLayout('categoryWiseDivId');
				}else{
					$("#blockHeadingNameId,#blockHeadingNameImg,.displayNoneCls").hide();
					$("#categoryWiseDivId").html("<h5 class='text-center text-uppercase m_top30 font_weight'>No Access Privilages.</h5>");
					setTimeout(function(){ 
						window.location.replace('login','_self');
					}, 5000);
					
				}
				
			},
		});
	}
	
	
	//CoreDashboard.mainLayout.buildmainLayout('categoryWiseDivId');
	$(document).on("click",".levelWiseDetailsCls li",function(e){
		$(this).closest("ul").find("li").removeClass("active");
		$(this).addClass("active");
		
		$(".opened").trigger("click");
		var levelType = $(this).attr("attr_type");
		var blockNo = $(this).attr("attr_blockNo");
		var name = $(this).attr("attr_name");
		
		$("#moreDetailsBlockDivId").hide();
		$("#blockHeadingNameId").html(name.toUpperCase())
		
		
		
		$("[block-category-type]").hide();
		$("[block-category-type="+levelType+"]").show();
		$("[favouriteBlock].fas").show();
		
		if(levelType == "PRINTMEDIA" || levelType == "ELECTRONICMEDIA" || levelType == "EMCOVERAGETIME"){
			var partyId=$('.checkStatusCls'+levelType).attr('attr_party_id');
			var status=$('.checkStatusCls'+levelType).attr('attr_statustype');
			var editionId=$('.checkStatusCls'+levelType).attr('attr_edn_type_id');
			$('.partyId').val(parseInt(partyId)).trigger('chosen:updated');
			$('.selectTypeId').val(parseInt(status)).trigger('chosen:updated');
			$('.newsTypeId').val(parseInt(editionId)).trigger('chosen:updated');
			$(".menu-cls").show();
		}else{
			$(".menu-cls").hide();
		}
		
		if(levelType == "PRINTMEDIA"){
			$(".printMediaCls").show();
			$(".electronicMediaCls").hide();
		}else if(levelType == "ELECTRONICMEDIA" || levelType == "EMCOVERAGETIME"){
			$(".printMediaCls").hide();
			$(".electronicMediaCls").show();
		}
		
	});
	
	$(document).on("click",".logoutIconCls",function(e){
		e.stopPropagation();
		$(".menuLogin-data-cls").toggle();
	});
	
	$(document).on("click",".logoutIconMobileViewCls",function(e){
		e.stopPropagation();
		$(".menuLoginMV-data-cls").toggle();
	});
	
	$(document).on("click",".menu-cls",function(e){
		e.stopPropagation();
		$(".menu-data-cls").toggle();
	});
	
	$(document).on("click",".menu-data-cls",function(e){
		e.stopPropagation();
	});
	
	$(document).on("click",function(){
		$(".menu-data-cls").hide();
		$(".menuLogin-data-cls").hide();
		$(".menuLoginMV-data-cls").hide();
	});
	
	
	$(document).on("click",".getNewsDetilsCls",function(e){
		
		var levelType="";
		$('.levelWiseDetailsCls li').each(function () {
			if($(this).hasClass("active")){
				levelType = $(this).attr("attr_type");
			}
			
		});
		
		globalpartyId = $(".partyId").val() ;
		globalBenefitId = $(".selectTypeId").val();
		if(levelType == "PRINTMEDIA"){
			globalEditioinTypeId = $(".editionTypeId").val();
		}else if(levelType == "ELECTRONICMEDIA" || levelType == "EMCOVERAGETIME"){
			globalEditioinTypeId = $(".newsTypeId").val();
		}
		
		var partyName = $(".partyId option:selected").text() ;
		var subheadingNews='';
		if(globalBenefitId == 1){
			subheadingNews = "OVERALL POSITIVE NEWS "+partyName+"";
		}else{
			subheadingNews = "OVERALL NEGATIVE NEWS "+partyName+"";
		}
		
		if(levelType == "PRINTMEDIA"){
			CoreComponent.ajax.newsDynamicAjaxCalls(levelType,"printMediaId","getCoreDashBoardPrintMediaOverAllDetails","PEDDI RAMA RAO","<i class='fas fa-newspaper color_yash'></i>",subheadingNews,"","9391005610");
		}else if(levelType == "ELECTRONICMEDIA"){
			CoreComponent.ajax.newsDynamicAjaxCalls(levelType,"elctronicMediaId","getEMOverallChannelWiseDetails","PEDDI RAMA RAO","<i class='fas fa-tv color_yash'></i>",subheadingNews,"","9391005610");
		}else if(levelType == "EMCOVERAGETIME"){
			CoreComponent.ajax.newsDynamicAjaxCalls(levelType,"emCovreageTimeId","getEMCoverageTimeOverallChannelWiseDetails","K Rajesh","<i class='fas fa-tv color_yash'></i>",subheadingNews,"","9849047241");
		}
		$(".menu-data-cls").hide();
	});
	
	$(window).scroll(function(){
		var windowScrollTop = $(window).scrollTop();
		if (windowScrollTop>200) {
			$(".scrollTopHtml").removeClass("displayHide");
		} else {
			$(".scrollTopHtml").addClass("displayHide");
		}
		
	});
	$(document).on("click",".scrollTopHtml",function(){
		setTimeout(function(){
			$('html,body').animate({
				scrollTop: $(".scrollTopDefault").offset().top
			},'slow');
		},100);
	}); 
	
	function setDefaultImage(img){
		img.src = "Core/images/human.jpg";
	}	
	</script>
</body>
</html>