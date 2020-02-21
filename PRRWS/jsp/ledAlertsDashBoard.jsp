<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LED Alerts Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/css/customLessAMS.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link rel="stylesheet" href="Assests/Plugins/slick/slick.css" type="text/css" rel="stylesheet"/>
<link rel="stylesheet" href="Assests/SimplePagination/simplePagination" type="text/css"/>
<link rel="stylesheet" type="text/css" href="http://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.0/slick/slick-theme.css"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
	body {
		background-color:#fff;
	}
	.DTFC_LeftBodyWrapper {
		top:-13px !important;
	}
	.DTFC_LeftBodyWrapper tr td {
		background-color:#fff;
	}
	.DTFC_LeftBodyWrapper {
		border-right: 1px solid #ccc !important;
	}
	.font_10 {
		font-size:10px !important; 
	}
	.slick-prev {
		left: -6px !important;
		z-index: 999;
	}
	.slick-next {
		right: 0px !important;
		z-index: 999;
	}
	.block {
		padding: 5px;
		background-color: #F5F5F5;
		position: relative;
		box-shadow: 0px 0px 8px rgba(0,0,0,0.16);
	}
	.slick-prev::before, .slick-next::before {
		color:#000 !important;
	}
	.ledTable th {
		background-color:#fff !important;
	}
	.bg_E9 {
		background-color:#E9E9E9 !important;
	}
	.mainBlockUl .blocksLi li {
		text-align:left !important;
		margin-top:5px;
	}
	.mainBlockUl {
		border-spacing:6px 0px !important;
	}
	.border_relative_block::before {
		position: absolute;
		border-radius: 0%;
		background: -moz-linear-gradient(to left, #9ED9B4, #FFFFFF);
		padding: 5px;
		content: '';
		margin: 0px;
		left: 0px;
		transform: rotate(175deg);
		top: 0px;
	}
	.discomm::before {
		left:4px !important;
	}
	.streetLight::before {
		left:10px !important;
		top:32px !important;
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
					<img src="Assests/images/led_logo.png" alt="..."/ style="width:8%;">
					<h4 class="m_top5" style="color:#fff; font-size:15px;">Panchayat Raj</h4>
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
<section>
	<div class="block displayNone">	
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-3 pull-right">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePicker"/ style="width:200px;">
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="container-fluid">
	<div class="pad_20">
		<div class="m_top10" id="overallLEDListId"></div>
		<div class="panel panel-default panelCls m_top20 border_radius_0">
			<div class="panel-body">
				<div class="">
					<h4 class="font_weight text-capital" id="headNameId">Overall Details</h4>
					<div class="alertCodeCls" id="checkBoxStatusId"></div>
					<div class="m_top10" id="columnChartId"></div>
					<div class="panel-group m_top10 alertCodeCls" id="accordionTimeline" role="tablist" aria-multiselectable="true">
						<div class="panel panel-default panel-black">
							<div class="panel-heading" role="tab" id="headingTimeline">
								<a role="button" class="panelCollapseIcon Timeline"  data-toggle="collapse" data-parent="#accordionTimeline" href="#collapseTimeline" aria-expanded="true" aria-controls="collapseTimeline">
									<h4 class="panel-title text-capital">Timeline analasys</h4>
								</a>
							</div>
							<div id="collapseTimeline" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTimeline">
								<div class="panel-body">
									<div class="row">
										<div class="col-sm-6 pull-right">
											<div class="groupBox pad_10 border_yash">
												<div class="row">
													<div class="col-sm-2 m_top5">
														<label class="containerRadio checkedStatusCls" attr_val="monthly"><input class="statusCheckedCls" type="radio" name="filter" value=""><span class="checkmarkRadio"></span>Monthly</label>
													</div>
													<div class="col-sm-2 m_top5">
														<label class="containerRadio checkedStatusCls" attr_val="weekly"><input type="radio" name="filter" value="" checked><span class="checkmarkRadio" ></span>Weekly</label>
													</div>
													<div class="col-sm-4">
														<div class="input-group">
															<span class="input-group-addon">
																<i class="glyphicon glyphicon-calendar"></i>
															</span>
															<input type="text" class="form-control" id="yearRangePicker"/>
														</div>
													</div>
													<div class="col-sm-4">
														<select  class="form-control select-chosen" id="monthPicker">
															<option value="0">All</option>
															<option value="01">Jan</option>
															<option value="02">Feb</option>
															<option value="03">Mar</option>
															<option value="04">April</option>
															<option value="05">May</option>
															<option value="06">June</option>
															<option value="07">July</option>
															<option value="08">Aug</option>
															<option value="09">Sep</option>
															<option value="10">Oct</option>
															<option value="11">Nov</option>
															<option value="12">Dec</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div id="overallId"></div>
								</div>
							</div>	
						</div>
					</div>
					<!--<div class="border_pink ledAlertsBor alertCodeCls m_top10" style="background-color:#fff; display:none;">
						<h5 class="font_weight">Timeline Analysis</h5>
					</div>-->
					<div class="panel-group m_top10" id="accordionLifeCycle" role="tablist" aria-multiselectable="true">
						<div class="panel panel-default panel-black">
							<div class="panel-heading" role="tab" id="headingLifeCycle">
								<a role="button" class="panelCollapseIcon collapsed LifeCycle"  data-toggle="collapse" data-parent="#accordionLifeCycle" href="#collapseLifeCycle" aria-expanded="true" aria-controls="collapseLifeCycle">
									<h4 class="panel-title text-capital">Lifecycle analysis</h4>
								</a>
							</div>
							<div id="collapseLifeCycle" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingLifeCycle">
								<div class="panel-body">
									<ul class="switch-btn-apita alertCodeCls" style="padding:0px;">
										<li class="active alertLifeCls" attr_type="alertlife">Alert Lifecycle Analysis</li>
										<li attr_type="alertCode">Alerts Code</li>
									</ul>
									<!--<div class="border_pink pad_10 border_yash">-->
										<div id="alertsLifeCycleId"></div>
									<!--</div>-->
								</div>
							</div>
						</div>
					</div>		
					<div class="m_top10" id="levelWiseLEDAlertsId"></div>
				</div>
			</div>
		</div>		
	</div>	
</div> 
<div id="alertsClickId" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width:95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title text-capital" id="alertsHeadingId"></h4>
			</div>
			<div class="modal-body">
				<div id="ledAlertsTableDataId"></div>
				<!--<div class="paginationDivCls m_top10"></div> -->
				<div class="row"> 
					<div class="col-sm-12">
						<div class="pull-right" id="paginationDivId"></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/slick/slick.js"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/SimplePagination/simplePagination3.js" ></script>
<script src="Assests/ledAlertsDashboard/ledAlertsPopup.js" type="text/javascript"></script>
<script src="Assests/ledAlertsDashboard/ledAlertsDashboard.js" type="text/javascript"></script>
</body>
</html>