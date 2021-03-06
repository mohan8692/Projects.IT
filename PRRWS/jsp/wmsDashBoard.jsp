<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WMS - DashBoard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/sliderbar/bootstrap-slider.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
.slick-prev{left: -10px !important;}
.slick-next{right: -7px !important;}
.slider.slider-horizontal {
    width: 125px !important;
    left: -16px !important;
}
.slider-handle{display: none;}

.accordionmodal-toggle , .accordionmodal-toggle:active ,.accordionmodal-toggle:hover
{
	color:#666 !important
}
.accordionmodal-toggle:before {
    /* symbol for "opening" panels */
    font-family:'Glyphicons Halflings';
    content:"\2212";
    float: right;
    color: inherit;
	font-size:10px;
	margin-top:0px;
	font-weight:400 !important;
	margin-left:-4px;
	background:transparent;
	border:1px solid #663300;
	padding:1px 3px;
	border-radius:2px;
}
.accordionmodal-toggle.collapsed:before {
    /* symbol for "collapsed" panels */
    content:"\2b";
}
.panel-custommodal
{
	border-radius:0px !important;
	margin-top:0px !important;
	box-shadow:none !important;
	border-bottom:1px solid #333;
}
.panel-custommodal .panel-heading
{
	border-radius:0px;
	background:#f5f5f5;
	
}
.panel-custommodal .panel-body
{
	box-shadow:inset 0 2px 10px 0 rgba(0, 0, 0, 0.35);
	padding:15px;
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
					<h4 class="text-capital">Panchayat Raj</h4>
					<p id="wmsDeptBasedTitleId"></p>
				</div>
				<div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
					<div class="menu-data-cls">
						<div class="arrow_box_top">
							<div  id="menu"></div> 
						</div>
					</div>
				</div>
				<!-- <div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
					<div class="menu-data-cls">
						<div class="arrow_box_top">
							<div class="row">
								<!--<div class="col-sm-12">
									<div class="menu-block" style="background-color:#FFBA00">
										<a href="newfundManagementDashboard">
											<h3>FMS</h3>
											<p>Fund Management System</p>
										</a>
									</div>
								</div>  -->
								<!--<div class="col-sm-12">
									<div class="menu-heading-block">
										<h4 class="text-capital">Rural Water Supply</h4>
										<div class="row">
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#56A3C5">
													<a href="ruralWaterSupplyDashBoard">
														<h3>RWS</h3>
														<p>Rural Water Supply</p>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#8A2BE2">
													<a href="newsArticles?deptId=2171">
														<h3>RWS News</h3>
														<p>Rural&nbsp;Water&nbsp;Supply&nbsp;News</p>
													</a>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#1e92b2">
													<a href="swachhBharatMissionIHHL">
														<h3>IHHL</h3>
														<p>Swatch Bharat Mission</p>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#1c94ef">
													<a href="waterTanksClorinationDashBoard">
														<h3>WTC</h3>
														<p>Water Tank chlorination</p>
													</a>
												</div>
											</div>
											<div class="col-sm-12 m_top10">
												<div class="menu-block" style="background-color:#483D8B">
													<a href="vehicleTrackingDashboard">
														<h3>VT</h3>
                           								 <p>Vehicle Tracking</p>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-12 m_top10">
									<div class="menu-heading-block">
										<h4>PANCHAYAT RAJ</h4>
										<div class="row">
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#0F685C">
													<a href="prisDashBoard">
														<h3>PRIS</h3>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#31B8B7">
													<a href="drainDashBoard">
														<h3>DRAINS</h3>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#2C546C">
													<a href="EncDevelopmentDashboard">
														<h3>ENC</h3>
														<p>Engineering Dept</p>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#512507">
													<a href="getdailySpikeReport">
														<h3>SA</h3>
														<p>Spike Analysis</p>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#888420">
													<a href="getlightsMonitoringDashboard">
														<h3>LED</h3>
														<p>Light Monitoring</p>
													</a>
												</div>
											</div>
											<!-- <div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#ff5e1c">
													<a href="prExpenditureDashboard">
														<h3>PR EXP</h3>
														<p>Panchayat Raj <br/>Expenditure</p>
													</a>
												</div>
											</div>
											<div class="col-sm-12 m_top10">
												<div class="menu-block" style="background-color:#1c94ef">
													<a href="waterTanksClorinationDashBoard">
														<h3>WTC</h3>
														<p>Water Tank Clorination</p>
													</a>
												</div>
											</div>-->
											<!--<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#ff5e1c">
													<a href="solidWasteManagementDashboard">
														<h3>SWM</h3>
                           								 <p>Solid Waste Management</p>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#FF1493">
													<a href="panchayatTaxDashboard">
														<h3>Taxes</h3>
                           								 <p>Panchayat Raj Taxes</p>
													</a>
												</div>
											</div>
											<div class="col-sm-6 m_top10">
												<div class="menu-block" style="background-color:#7B68EE">
													<a href="eMeetingsDashboard">
														<h3>E Meetings</h3>
                           								 <p>Panchayat Raj eMeetings</p>
													</a>
												</div>
											</div>
											<div class="col-sm-12 m_top10">
												<div class="menu-block" style="background-color:#008000">
													<a href="newsArticles?deptId=2210">
														<h3>PR News</h3>
                           								 <p>Panchayat Raj News</p>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-12 m_top10">
									<div class="menu-heading-block">
										<h4>RURAL DEVELOPMENT</h4>
										<div class="row">
											<div class="col-sm-12 m_top10">
												<div class="menu-block" style="background-color:#88186B">
													<a href="MGNREGSDashboard">
														<h3>MGNREGS</h3>
														<p>Mahatma Gandhi Rural employement guarantee scheme</p>
													</a>
												</div>
											</div>
											<div class="col-sm-12 m_top10">
											<div class="row">
											<div class="col-sm-6">
												<div class="menu-block" style="background-color:#ff1c5e">
													<a href="RuralDevelopmentDashboard">
														<h3>RD</h3>
														<p>Rural&nbsp;Development&nbsp;Dashboard</p>
													</a>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="menu-block" style="background-color:#8B0000">
													<a href="newsArticles?deptId=2170">
														<h3>RD News</h3>
														<p>Rural Development News</p>
													</a>
												</div>
											</div>
											</div>
											</div>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-12 m_top10">
									<div class="menu-block" style="background-color:#de4524 ">
										<a href="itcDashboard">
											<h3>IT E & C</h3>
											<p>Dashboard</p>
										</a>
									</div>
								</div>-->
								<!-- <div class="col-sm-12 m_top10">
									<div class="menu-block" style="background-color:#989820">
										<a href="newsArticles">
											<h3>News Articles</h3>
											<p>Dashboard</p>
										</a>
									</div>
								</div>-->
						<!--	</div>
						</div>
					</div>
				</div>-->
			</div>
		</div>
	</nav>
	

<section class="navbar-section" style="padding: 10px;background-color: #fff;">
		<div class="container-fluid">
			<div class="row">
				<!--<div class="col-sm-2 m_top5">
					<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" id="selectedName1" style="font-size:13px;cursor:pointer;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_distId="" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>
				</div>-->
				<div class="col-sm-3  pull-right">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePicker" style="width: 200px;"/>
					</div>
				</div>
			</div>
		</div>
	</section>
</header>
<section style="padding: 10px;background-color: #fff;margin-top:1px;">
	<div class="container-fluid">
		<div class="white-block">
			<div class="row">
				<div class="col-sm-12">
					<!--<h3 class="font_BebasNeue" style="color:#252D30;">WORK TYPES-<span id="noofUGDWorksId"></span></h3>-->
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div id="overAllWorkTypesDivId"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div id="timeLinesWorkTypesDivId"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div id="stateLevelWorkTypesDivId"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div id="locationWiseWorkTypesDivId"></div>
				</div>
			</div>
		</div>
	</div>	
</section>	
<div class="modal fade" id="locationLevelPopupId" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width: 90%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="font_BebasNeue" id="locationLevelHeadingId"></h3>
      </div>
      <div class="modal-body">
       <div id="locationLevelFirstBlockDivId"></div>
	   <div id="locationWiseDocumentsDivId"></div>
	    <div class="row">
			<div class="col-sm-12 m_top10">
				<h3 class="font_BebasNeue">MONITORING SYSTEM</h3>
			</div>
			<div class="col-sm-12">
				<div id="locationWiseWorkStagesDivId"></div>
			</div>
			<div class="col-sm-12">
				<div id="locationLevelFourthBlockDivId"></div>
			</div>
	   </div>
	   
       <div id="locationLevelSecondBlockDivId"></div>
       <div id="locationLevelThirdBlockDivId"></div>
	  
      </div>
	   <div class="modal-footer">
		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	  </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="workZoneModalDivId" tabindex="-1" role="dialog" style="z-index:9999;">
  <div class="modal-dialog" role="document" style="width: 90%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="workZoneCloseCls close closeSecondModal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="workZoneHeadingId"></h4>
      </div>
      <div class="modal-body">
		<div class="row">
			<div class="col-sm-8">
				<div id="workZoneOverviewBlockDivId"></div>
				<div id="workZoneWorkStatusBlockDivId"></div>
			</div>
			<div class="col-sm-4">
				<div id="workZoneDocumentsDivId"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<h3 class="font_BebasNeue">MONITORING SYSTEM</h3>
			</div>
			<div class="col-sm-12">
				<div id="workZoneWorkStagesDivId"></div>
			</div>
			<div class="col-sm-12">
				<div id="workZoneGraphBlockDivId"></div>
			</div>
		</div>
      </div>
	   <div class="modal-footer">
		<button type="button" class="btn btn-default workZoneCloseCls closeSecondModal" data-dismiss="modal">Close</button>
	  </div>
	  </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
  <div class="modal fade" id="mainWorkZoneModalId" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width: 90%;">
    <div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close closeSecondModal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title" id="mainWorkZoneModalHeadingId"></h4>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-sm-12">
					<div id="mainWorkZoneModalDivId1"></div>
				</div>
			</div>
			<div class="row">
				<div id="mainWorkZoneModalDivId2"></div>
			</div>
			
		</div>
		 <div class="modal-footer">
			<button type="button" class="btn btn-default closeSecondModal" data-dismiss="modal">Close</button>
		  </div>
      </div>
	  </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
  <div class="modal fade" id="imageDocumentsModalDivId" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width:90%;">
    <div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title text-capital" id="">ugd MONITORING Images - <span class="font_weight" id="workStageHeadingId"></span></h4>
		  </div>
		  <div class="modal-body">
			<div class="row">
				<div class="col-sm-9">
					<div class="row">
						<div id="ugdMonitoringDatesDivId"></div>
					</div>
					<div id="ugdMonitoringImagesDivId"></div>
				</div>
				<div class="col-sm-3">
					<div id="ugdMonitoringlocationDivId"></div>
				</div>
			</div>
		  </div>
		   <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		  </div>
	  </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/sliderbar/bootstrap-slider.js" type="text/javascript"></script>
<script src="Assests/js/wmsDashBoard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">
$(".chosen-select").chosen();
var globalDeptId=${param.deptId};
var urlDeptId = ${param.deptId};
if(globalDeptId == 1){
	$('#wmsDeptBasedTitleId').html("PR UGD - DashBoard");
}else{
	$('#wmsDeptBasedTitleId').html("RWS UGD - DashBoard");
}

onloadCalls();
</script>
</body>
</html>