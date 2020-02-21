	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>APITA Dashboard</title>
	<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
	<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
	<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
	<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/Chosen/chosen.css" type="text/less" rel="stylesheet"/>
	<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
	<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
	<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
	<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
	<script src="https://use.fontawesome.com/07d3416f74.js"></script>
	<script src="Assests/Plugins/Less/less.js"></script>
	<style>
		.companiesClkCls {
			cursor:pointer;
		}
		.icon_stl {
			margin-left: auto;
			margin-right: auto;
			display: ruby;
		}
	</style>
	</head>
	<body>
	<header style="box-shadow:none;">
		<nav>
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-1 col-xs-3 pad_left0">
						<img src="Assests/images/aplogo.png" class="logo"/>
					</div>
					<div class="col-sm-10 m_top10 col-xs-9">
						<h4 class="text-capital">Panchayat Raj & RD & RWS</h4>
						<p>APITA</p>
					</div>
					<div class="col-sm-1 col-xs-12">
						<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
						<div class="menu-data-cls">
							<div class="arrow_box_top">
								<div id="menu"></div> 
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<!--<section class="navbar-section" style="background-color: #E6E6E6;">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-3 pull-right">
						<h5 class="font_weight pull-right">Note: Amount In Lakhs.</h5>
					</div>
				</div>
			</div>
		</section>-->
	</header>
	<div class="container-fluid m_top10">
		<div class="row">
			<!--<div class="col-sm-2">
				<h4 class="arrowIconChanged m_top10"><i class="glyphicon glyphicon-menu-hamburger" style="font-size:13px;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
				<div class="multi-level-selection-menu arrow_box_top"></div>
				
			</div>-->
			<!--<div class="col-sm-3 pull-right m_top5">
				<span class="input-group">
					<input type="text" id="dateRangeForTrainingId" style="width:200px" class="form-control pull-right" />
					<span class="input-group-addon">
						<i class="glyphicon glyphicon-calendar"></i>
					</span>
				</span>
			</div>-->
			<div class="col-sm-9 pull-right">
				<div class="row">
					<div class="col-sm-4">
						<div class="row">
							<div class="col-sm-4 m_top5">
								<label>FROM DATE</label>
							</div>
							<div class="col-sm-8">
								<div class="input-group inline-block">
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
									</span>
									<input type="text" class="form-control" id="dateRangePickerMGNF"/>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="row">
							<div class="col-sm-4 m_top5">
								<label>TO DATE</label>
							</div>
							<div class="col-sm-8">
								<div class="input-group inline-block">
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
									</span>
									<input type="text" class="form-control" id="dateRangePickerMGNT"/>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<ul class="switch-btn pull-right" role="tabCummulative">
							<li class="active" attr_type="thisFin" style="font-size:12px !important;">This Fin. Year</li>
							<li  attr_type="prevFin" style="font-size:12px !important;">Prev Fin. Year</li>
						</ul>
					</div>
				</div>
			</div>	
		</div>
		<div class="whiteBlockStl m_top10">
			<span class="headClrGray font_weight font_16">Overview</span>
			<div id="trainingDetailsDivId"></div>
			<div class="whiteBlockStl m_top10">
				<div class="row">
					<div class="col-sm-2 m_top5">
						<div class="jobFairStyleCls">
							<h5>RECRUITMENT DRIVES</h5>
						</div>
					</div>
					<div class="col-sm-10 m_top5">
						<ul class="switch-btn-apita pull-right jobFairClkCls">
							<li class="active" attr_name="all">ALL</li>
							<li attr_name="mega Drive">MEGA</li>
							<li attr_name="individual Drive">INDIVIDUAL</li>
							<li attr_name="leap Drive">LEAP</li>
						</ul>
					</div>
				</div>
				<div class="m_top10" id="jobFairId"></div>
			</div>
		</div>
		<div class="whiteBlockStl m_top10">
			<div class="row">
				<div class="col-sm-5 m_top10">
					<span class="headClrTrending font_weight font_16">Trending</span>
				</div>
				<div class="col-sm-3 m_top10">
					<ul class="switch-btn-apita activateCls pull-right border_right">
						<li class="active" attr_monthId="1">Monthly</li>
						<li class="" attr_monthId="2">Quarterly</li>
						<li class="" attr_monthId="3">Half yearly</li>
					</ul>
				</div>
				<div class="col-sm-3 m_top10">
					<ul class="switch-btn-apita yearActivateCls">
						<li class="" attr_yearId="3">Last 5 years</li>
						<li class="" attr_yearId="2">Last 3 years</li>
						<li class="active" attr_yearId="1">This year</li>
					</ul>
				</div>
				<div class="col-sm-1 m_top10">
					<button class="btn btn-success getTrendingDetailsCls btn-sm m_top15 " style="border-radius:0px;">SUBMIT</button>
				</div>
			</div>
			<div id="trendingGraphDivId"></div>		
			
		</div>
		<div class="panel-group m_top10" id="trainingAccordion" role="tablist" aria-multiselectable= "true">
			<div class="panel panel-default panel-white">
				<div class="panel-heading padding_15" role="tab" id="trainingHeadingOne" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
					<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#trainingAccordion" href="#trainingCollapseOne" aria-expanded="false" aria-controls="trainingCollapseOne">
						<h5 class="font_weight text-capital">Training overview - Course wise</h5>
					</a>
				</div>
				<div id="trainingCollapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="trainingHeadingOne">
					<div class="panel-body">
						<div class="row mb_20">
							<div class="col-sm-2 pull-right">
								<select class="form-control chosen-select" id="trainingOverviewSelId">
									<option value="0">All District</option>
								</select>
							</div>
						</div>
						<span class="headClrGray font_weight font_16">All</span>
						<div class="m_top_bottom" id="allDetailsId"></div>
						<span class="headClrGray font_weight font_16 ">Technical</span>
						<div class="m_top_bottom" id="technicalId"></div>
						<span class="headClrGray font_weight font_16 ">Non - Technical</span>
						<div class="m_top10" id="nonTechnicalId"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="panel-group m_top10" id="hackathonAccordion" role="tablist" aria-multiselectable= "true">
			<div class="panel panel-default panel-white">
				<div class="panel-heading padding_15" role="tab" id="trainingHeadingOne" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
					<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#hackathonAccordion" href="#hackathonCollapseOne" aria-expanded="false" aria-controls="hackathonCollapseOne">
						<h5 class="font_weight text-capital">Hackathons</h5>
					</a>
				</div>
				<div id="hackathonCollapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="hackathonHeadingOne">
					<div class="panel-body">
						<span class="headClrGray font_weight font_16 ">Hackathon</span>
						<div class="m_top_bottom" id="trainHackathonDetailsDivId"></div>
					</div>
				</div>
			</div>
		</div>   -->
		<div class="panel-group" id="trainingCentersAccordion" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-white">
				<div class="panel-heading padding_15" role="tab" id="trainingCentersHeading" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
					<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#trainingCentersAccordion" href="#trainingCentersCollapse" aria-expanded="false" aria-controls="trainingCentersCollapse">
						<h5 class="font_weight text-capital">RECRUITMENT OVERVIEW</h5>
					</a>
				</div>
				<div id="trainingCentersCollapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="trainingCentersHeading">
					<div class="panel-body">
						<div class="row mb_20">
							<div class="col-sm-10">
								<ul class="nav nav-tabs worksBlock text-capital" style="border-bottom:none;">
									<li class="active"><a data-toggle="tab" href="#companiesHiring">HIRING DETAILS</a></li>
									<!--<li><a data-toggle="tab" href="#trainingLocations">Training Locations</a></li>-->
								</ul>
							</div>	
							<div class="col-sm-2">
								<select class="form-control chosen-select" id="trainingOverViewDistrictDrpId">
									<option value="0">All Districts</option>
								</select>
							</div>
						</div>
						<div class="tab-content m_top10">
							<div id="companiesHiring" class="tab-pane fade in active">
								<div id="companiesHiringTabBlkId"></div>
							</div>
							<!--<div id="trainingLocations" class="tab-pane fade">
								<div class="table-responsive">
									<table class="table table-bordered m_top10 table_custom_SC">
										<thead>
											<tr>
												<th rowspan="3">Rank</th>
												<th rowspan="3">
													<div class="media">
														<div class="media-left">
															<i class="fa fa-building fa-lg m_top5" aria-hidden="true" style="color:#A7DC4A;"></i>
														</div>
														<div class="media-body" style="width:100%;">
															<h4 class="media-heading font_weight m_top5 font_12">Training Center Location</h4>
														</div>
													</div>
												</th>
												<th rowspan="3">
													<div class="media">
														<div class="media-left">
															<img src="Assests/images/Group 2258.png" class="media-object" style="margin-top:3px;">
														</div>
														<div class="media-body" style="width:100%;">
															<h4 class="media-heading font_weight m_top5 font_12">District</h4>
														</div>
													</div>
												</th>
												<th rowspan="3">
													<div class="media">
														<div class="media-left">
															<img src="Assests/images/Group 1251.png" class="media-object">
														</div>
														<div class="media-body" style="width:100%;">
															<h4 class="media-heading font_weight m_top5 font_12">Tainers</h4>
														</div>
													</div>
												</th>
												<th rowspan="3">
													<div class="media">
														<div class="media-left">
															<img src="Assests/images/book.png" class="media-object" style="margin-top:3px;">
														</div>
														<div class="media-body" style="width:100%;">
															<h4 class="media-heading font_weight m_top5 font_12">Courses</h4>
														</div>
													</div>
												</th>
												<th colspan="7">Tained Students</th>
											</tr>
											<tr>
												<th rowspan="2">Total</th>
												<th colspan="2">Engineering</th>
												<th colspan="2">Degree</th>
												<th colspan="2">Others</th>
											</tr>
											<tr>
												<th>count</th>
												<th>%</th>
												<th>count</th>
												<th>%</th>
												<th>count</th>
												<th>%</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td><div class="companies_rounded">1</div></td>
												<td>Nellore</td>
												<td>Nellore</td>
												<td><u>3</u></td>
												<td><u>5</u></td>
												<td>1005</td>
												<td>404</td>
												<td>40.16%</td>
												<td>353</td>
												<td>35.13%</td>
												<td>353</td>
												<td>35.13%</td>
											</tr>
											<tr>
												<td><div class="companies_rounded">2</div></td>
												<td>Tirupati</td>
												<td>Chittoor</td>
												<td><u>3</u></td>
												<td><u>5</u></td>
												<td>1005</td>
												<td>404</td>
												<td>40.16%</td>
												<td>353</td>
												<td>35.13%</td>
												<td>353</td>
												<td>35.13%</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>-->
						</div>	
					</div>
				</div>
			</div>
		</div>
		<div class="panel-group" id="allDistricAccordion" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-white">
				<div class="panel-heading padding_15" role="tab" id="allDistrictHeading" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
					<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#allDistricAccordion" href="#allDistrictCollapse" aria-expanded="false" aria-controls="allDistrictCollapse">
						<h5 class="font_weight text-capital">Location Wise</h5>
					</a>
				</div>
				<div id="allDistrictCollapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="allDistrictHeading">
					<div class="panel-body">
						<!--<div class="row mb_20">
							<div class="col-sm-2 pull-right">
								<select class="form-control chosen-select" id="locationWiseDistritSelId">
									<option value="0">All District</option>
								</select>
							</div>
						</div>-->
						<div id="trainingOverviewDetailsDivId"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-group" id="eventOverViewAccordion" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-white">
				<div class="panel-heading padding_15" role="tab" id="eventOverViewHeading" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
					<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#eventOverViewAccordion" href="#eventOverViewCollapse" aria-expanded="false" aria-controls="allDistrictCollapse">
						<h5 class="font_weight text-capital">Events OverView</h5>
					</a>
				</div>
				<div id="eventOverViewCollapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="eventOverViewHeading">
					<div class="panel-body">
						<!--<div class="row mb_20">
							<div class="col-sm-2 pull-right">
								<select class="form-control chosen-select" id="locationWiseDistritSelId">
									<option value="0">All District</option>
								</select>
							</div>
						</div>-->
						<div class="row">
							<div class="col-sm-12">
								<span class="headClrGray font_weight font_16 ">TV5 College Connect Program</span>
								<div class="m_top10" id="tv5OverviewDetailsDivId"></div>
								<span class="headClrGray font_weight font_16 ">INDUSTRY-ACADEMIA CONCLAVE</span>
								<div class="m_top10" id="industryAcademyDetailsDivId"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!--<div class="panel-group" id="allCollageAccordion" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-white">
				<div class="panel-heading padding_15" role="tab" id="allCollageHeading" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
					<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#allCollageAccordion" href="#allCollageCollapse" aria-expanded="false" aria-controls="allCollageCollapse">
						<h5 class="font_weight text-capital">College Wise</h5>
					</a>
				</div>
				<div id="allCollageCollapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="allCollageHeading">
					<div class="panel-body">
						<div class="row mb_20">
							<div class="col-sm-2 pull-right">
								<select class="form-control chosen-select" id="collageWiseDistritSelId">
									<option value="0">All District</option>
								</select>
							</div>
						</div>
						<div id="trainingOverviewCollegeWiseDivId"></div>
					</div>
				</div>
			</div>
		</div>-->	
	
	<div id="companiesModalId" class="modal fade" role="dialog">
		<div class="modal-dialog widthclass" style="width:95%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="companiesHeadingId"></h4>
				</div>
				<div class="modal-body">
					<div id="companiesModalDivId"></div> 
					<div class="row"> 
					<div class="col-sm-4">
							<div class="m_top20" id="paginationCountDivId"></div>
						</div>
						<div class="col-sm-8 ">
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
	<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
	<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
	<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
	<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
	<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
	<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
	<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
	<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
	<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
	<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
	<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
	<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
	<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
	<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
	<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
	<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	<!--<script type="text/javascript" src="Assests/js/locationDistrictHierarchy.js"></script>-->
	<script src="Assests/js/apitaDashboardNew.js" type="text/javascript"></script>
	<script src="Assests/Menu/menu.js" type="text/javascript"></script>
	<script src="Assests/SimplePagination/simplePagination3.js" type="text/javascript"></script>
	</body>
	</html>