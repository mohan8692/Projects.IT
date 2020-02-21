<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NTR SUJALA</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
	body {
		background-color:#fff;
	}
	.borderNone td{
		border:none !important;
		font-weight:bold;
	}
	.table_Ntr_Custom1 th {
		text-align:center;
		vertical-align:middle;
	}
	.pad_15_10 {
		padding:15px 10px;
	}
	.text_danger {
		color:#F90929;
	}
	.motherPlant th{
		background-color:#B9B3B3 !important;
	}
	.overlapImg {
		width: 34%;
		position: absolute;
		z-index: 9;
		left: 33%;
		top: 0;
		opacity: 0.06;
		height: 400px;
	}
	.font_15 {
		font-size:15px;
	}
</style>
</head>
<body>
 <header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj, RD & RWS</h4>
					<p>NTR SUJALA DASHBOARD</p>
				</div>
				<div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
					<div class="menu-data-cls">
						<div class="arrow_box_top">
							<div  id="menu"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

</header>
<main>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<div class="pad_15 border_yash" style="background-color:#F5F5F5;">
					<div id="overViewDetails"></div>
				</div>
				<div class="pad_15 border_yash m_top20" style="background-color:#F5F5F5;">
					<h5 class="font_weight">NTR Sujala - Water Dispense Trending</h5>
					<div class="pad_15 border_yash m_top10" style="background-color:#fff;">
						<div class="row">
							<div class="col-sm-4 col-sm-offset-3">
								<ul class="switch-btn-apita activateCls">
									<li attr_name="Last10Days">Last 30 Days</li>
									<li attr_name="Last10Weeks">Last 10 Weeks</li>
									<li class="active" attr_name="monthly">Monthly</li>
								</ul>
							</div> 
							<div class="col-sm-2 pull-right">
								<div class="row">
									<div class="col-sm-6 m_top5">
										<h5 class="pull-right">Select Year</h5>
									</div>	
									<div class="col-sm-6">
										<input type="text" id="dateYearId" class="form-control dateRangeYearCls">
									</div>
								</div>	
							</div>
						</div>
						<div class="m_top10" id="waterDispenseChartId"></div>
					</div>
				</div>
				<div class="pad_15 border_yash m_top20" style="background-color:#F5F5F5;">
					<ul class="switch-btn-apita jobFairClkCls" style="padding:0px;">
						<li class="active" attr_name="motherplantsCls">Mother Plants</li>
						<li attr_name="rduCls">RDUs</li>
					</ul>
					<div class="border_yash pad_10 default_white">
						<div class="motherplantsCls">
							<div id="motherPlantsOverviewId"></div>
						</div>	
						<div class="rduCls">
							<div id="rdusOverviewId"></div>
						</div>	
					</div>
				</div>
			</div>
		</div>
		<div class="row m_top20">
			<div class="col-sm-12">
				<div class="panel panel-default">
					 <div class="panel-heading" style="display:block;">
						<h3 class="panel-title font_weight">District Wise Details</h3>
					</div>
					<div class="panel-body" style="">
						<div id="districtWiseMpDetailsId"></div>
					</div>
				</div>
				
				<div class="panel panel-default">
					 <div class="panel-heading" style="display:block;">
						<h3 class="panel-title font_weight">Constituency Wise Details</h3>
					</div>
					<div class="panel-body" style="">
						<div id="constituencyWiseMpDetailsId"></div>
					</div>
				</div>
			</div>
		</div>	
	</div>
	
	<div class="modal fade" id="mother_plants" role="dialog">
		<div class="modal-dialog modal-lg" style="width:95%; margin:auto;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h3 class="modal-title"><b>Mother Plants Overview</b></h3>
				</div>
				<div class="modal-body" >	
					<div class="row">
						<div class="col-sm-12">
							<!--<div id="motherPlantsOverviewId"></div>-->
						</div>
						
					</div>
				</div>
				<div class="modal-footer" style="background-color:#E1E1E1;">
				  <button type="button" class="btn btn-default Close_st" data-dismiss="modal">CLOSE</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="mother_plants_Details" role="dialog">
		<div class="modal-dialog modal-lg" style="width:95%;">
			<div class="modal-content">
				<div class="modal-header linerGradientCss">
					<button type="button" class="close zIndexCls" data-dismiss="modal">&times;</button>
					<h3 class="media-heading font_weight" style="font-size: 20px;" id="mpDetailsHeadingId"></h3>
				</div>
				<div class="modal-body" >	
					<div id="motherPlantsDetailsId"></div>
				</div>
				<div class="modal-footer" style="background-color:#E1E1E1;">
				  <button type="button" class="btn btn-default Close_st zIndexCls" data-dismiss="modal">CLOSE</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="mother_plants_Details_low_level" role="dialog">
		<div class="modal-dialog modal-lg" style="width:95%; margin:auto;">
			<div class="modal-content">
				<div class="modal-header linerGradientCss" style="padding: 10px;">
					<button type="button" class="close closeSecondModal" data-dismiss="modal">&times;</button>
					<div class="row">
						<div class="col-sm-7">
							<div class="media m_top0">
							  <div class="media-left">
								<a href="#">
								 <img class="media-object" src="Assests/images/icon-motherPlanet.png" alt="..." style="width: 40px;">
								</a>
							  </div>
							  <div class="media-body">
								<h3 class="media-heading font_weight" style="font-size: 20px;" id="mp30DaysHeadingId"></h3>
								<h5 class="m_top5">Mother Plant</h5>
							  </div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="m_top10" style="margin-right:20px;">
								<h3 style="font-size: 20px;" id="">Last <span style="padding:5px;border:1px solid #ccc;border-radius:5px;">30Days</span> Wise Overview</h3>
							</div>
							
						</div>
					</div>
					
				</div>
				<div class="modal-body" >	
					<div id="motherPlantsLowLevelDetailsId"></div>
				</div>
				<div class="modal-footer" style="background-color:#E1E1E1;">
				  <button type="button" class="btn btn-default Close_st closeSecondModal" data-dismiss="modal">CLOSE</button>
				</div>
			</div>
		</div>
	</div> 
	<div class="modal fade" id="mother_plants_Details_water_tank" role="dialog">
		<div class="modal-dialog modal-lg" style="width:95%; margin:auto;">
			<div class="modal-content">
				<div class="modal-header linerGradientCss" style="padding: 10px;">
					<button type="button" class="close closeSecondModal" data-dismiss="modal">&times;</button>
					<h3 class="media-heading font_weight" style="font-size: 20px;" id="rduHeadingId"></h3>
				</div>
				<div class="modal-body" >
				<input type="hidden" value="" id="rduHiddenFieldId" />
					<input type="hidden" value="" id="rduTypeHiddenFieldId" />
					<div class="row">
						<div class="col-sm-3 pull-right">
							<span class="input-group">
								<input type="text" id="dateRangeForTrainingId" style="width:200px" class="form-control pull-right" />
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>
							</span>
						</div>
					</div>
					<div class="m_top10" id="motherPlantsRDUDetailsId"></div>
				</div>
				<div class="modal-footer" style="background-color:#E1E1E1;">
				  <button type="button" class="btn btn-default Close_st closeSecondModal" data-dismiss="modal">CLOSE</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="districtWiseModalDivId" role="dialog">
		<div class="modal-dialog modal-lg" style="width:95%; margin:auto;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h3 class="modal-title" id="districtHeadId"></h3>
				</div>
				<div class="modal-body" >	
					<div class="row">
						<div class="col-sm-12">
							<div id="districtWiseDetailsDivId"></div>
						</div>
						
					</div>
				</div>
				<div class="modal-footer" style="background-color:#E1E1E1;">
				  <button type="button" class="btn btn-default Close_st" data-dismiss="modal">CLOSE</button>
				</div>
			</div>
		</div>
	</div>
</main>		
			
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyD_ELXOA5iHgPThVcenSQjMwkev64EcZbE"></script>
<script src="Assests/NTRSujala/ntrSujalaDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script>
	$('.pooverCls').popover()
	onLoadcalls();
	function onLoadcalls() {
		$(".rduCls").hide();
		$(".motherplantsCls").show();
		getNtrSujalaWaterDispenceTrending("yearly");
	}
	$(document).on("click",".activateCls li",function(){
		var type = $(this).attr("attr_name");
		$(".activateCls li").removeClass("active");
		$(this).addClass("active");
		getNtrSujalaWaterDispenceTrending(type);
	});
	$(document).on("click",".jobFairClkCls li",function(){
		$(".jobFairClkCls li").removeClass("active"); 
		$(this).addClass("active");  
		var name = $(this).attr("attr_name");
		if(name == "motherplantsCls") {
			$(".rduCls").hide();
			$(".motherplantsCls").show();
		} else {
			$(".motherplantsCls").hide();
			$(".rduCls").show();
		}
	});
</script>
</body>
</html>