<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Core DashBoard</title>
<link href="Core/BaseComponents/bootstap3.0/bootstrap3.0.css" rel="stylesheet" type="text/css"/>
<link href="Core/BaseComponents/bootstap3.0/alert_custom_css.css" rel="stylesheet" type="text/css">      
<link href="Core/BaseComponents/customResponsive.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css">
<link href="Core/BaseComponents/Plugins/Slick/slick.css" type="text/css" rel="stylesheet"/>
<link href="Core/BaseComponents/Plugins/Slick/slick-theme.css" type="text/css" rel="stylesheet"/>
<link href="Core/BaseComponents/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Core/BaseComponents/Plugins/DataTable/datatables.min.css" type="text/css" rel="stylesheet"/>
<link href="Core/BaseComponents/Plugins/scroll/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
<link href="Core/BaseComponents/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css">
<style>
.bg-img-background{
	content:'';
	background: url(./images/background.png) repeat;
	height: 100vh;
	z-index:1;
}
nav {
    background-color:#1B2336;
    height:74px;
	border-bottom: 5px solid red;
}
.pad_left0 {
    padding-left: 0px;
}
.align_justify {
    background-color: #000000;
	padding: 21px;
	font-size: 25px;
	color: #fff;
	text-align: center;
	cursor:pointer;
}
.color_red{
	color:red;
}
.color_black{
	color:#333;
}
.font_weight{
	font-weight:bold;
}
.imgage_pos_center{
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
	position: relative;
}
</style>
</head>
<body>  
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1">
					<img src="Core/images/tdp_logo.png" style="margin-top:-5px;"/>
				</div>
				<div class="col-sm-10">
					<img src="Core/images/Symbol.png" class="imgage_pos_center"/>
				</div>
			</div>
		</div>
	</nav>
</header>
<div class="container-fluid">
	<div class="row">
		<!-- Alerts Start -->
		<div class="col-md-12 col-xs-12 col-sm-12 alertsBlock">
			<div class="panel panel-default panelNewCustom">
				<div class="panel-heading">
					<div class="row">
						<div class="col-md-8 col-sm-7 col-xs-12">
							<h4 class="text-capital"><i class="fas fa-bell"> </i> POLITICAL Alerts <small class="" style="color:#000;"> - <span id="alertDateHeadingId">  </span></small></h4>
						</div>
						<div class="col-md-4 col-sm-5 col-xs-12">
							<span class="alertSettingBlock pull-right" style="margin-top: 5px;">
							 <i title="" data-placement="top" data-toggle="tooltip" class="fas fa-cogs" data-original-title="Settings"></i>
							</span>
							<span class="input-group pull-right dateRangePickerClsForAlert" style="width:200px;margin-right: 11px;">
								<input type="text" id="dateRangeIdForAlert" style="width:180px;height:32px;" class="form-control" />
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>
							</span>
						</div>     
					</div>
					<div class="basicAlertBlockDropDown documentCloseClass" style="z-index:999;margin-top: -3px;" >
						<i class="glyphicon glyphicon-remove basicAlertSetClose pull-right" style="cursor:pointer;"></i>
						<div class="row">
							<div class="col-md-6 col-xs-12 col-sm-6 pad_right0 m_top20">
							  <ul class="nav nav-tabs navTabsSettings" role="tablist">
								<li role="presentation" class="text-capital active"><a href="#impactScope" aria-controls="impactScope" role="tab" data-toggle="tab" class="f_16">Impact Scope </a></li>
								<li role="presentation"   class="text-capital"><a href="#alertStatus" aria-controls="alertStatus" role="tab" data-toggle="tab"  class="f_16">Alert Status</a></li>
							  </ul>
								
							 
							</div>
							<div class="col-md-6 col-xs-12 col-sm-6 pad_left0 pad_right4">
							  <div class="tab-content navTabsSettingsContent">
								<div role="tabpanel" class="tab-pane active" id="impactScope">
								<hr style ="margin-bottom:0px;" />
									<ul class="settingsUl alertImpactSettingCls">
											<li>
												<label class="checkbox-inline">
												<input type="checkbox" attr_scope_type="All" class="alertImpactCheckCls" id="alertImpactScopeSelectAllId" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">All</h5></div>
												</label>
											</li>
										   	 <li>
												<label class="checkbox-inline">
													<input type="checkbox" attr_scope_type="State" class="alertImpactCheckCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">State</h5></div>
												</label>
											</li>
											<li>
												<label class="checkbox-inline">
													<input type="checkbox" attr_scope_type="District" class="alertImpactCheckCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">District</h5></div>
												</label>
											</li>
											<li>
												<label class="checkbox-inline">
													<input type="checkbox" attr_scope_type="Parliament" class="alertImpactCheckCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">Parliament</h5></div>
												</label>
											</li>
											<li>												
												<label class="checkbox-inline">
													<input type="checkbox" attr_scope_type="Constituency" class="alertImpactCheckCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">Constituency</h5></div>
												</label>	
											</li>	
											<li>
												<label class="checkbox-inline">
													<input type="checkbox" attr_scope_type="MuncipalityGMC" class="alertImpactCheckCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">CORP-GMC</h5></div>
												</label>
											</li>
											<li>
												<label class="checkbox-inline">
													<input type="checkbox" attr_scope_type="mandalMuncipality" class="alertImpactCheckCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">Mandal/MUNICIPALITY</h5></div>
												</label>
											</li>
											<li>
												<label class="checkbox-inline">
												<input type="checkbox" attr_scope_type="VillageWardPanchayat"  class="alertImpactCheckCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">Village/ward/PANCHAYAT</h5></div>
												</label>
											</li>	
									</ul>
								</div>
								<div role="tabpanel" class="tab-pane" id="alertStatus">
									<hr style ="margin-bottom:0px;" />
									 <ul class="settingsUl alertStatusSettingUl">
									  <!--<div id="alertStatusliDivId"></div>-->
									  <li>
										<label class="checkbox-inline">
										<input type="checkbox" id="alertStatusSelectAllId" attr_scope_type="All" attr_status_id="0" class="alertStausCls" checked>
										<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">All</h5></div>
										</label>
									  </li>
									     <li>
											<label class="checkbox-inline">
											<input type="checkbox" attr_status_id="1"  class="alertStausCls" checked>
												<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">PENDING</h5></div>
											</label>
										   </li>
											<li>
												<label class="checkbox-inline">
												<input type="checkbox" attr_status_id="2"  class="alertStausCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">NOTIFIED</h5></div>
												</label>
											 </li>
											  <li>
												<label class="checkbox-inline">
												<input type="checkbox" attr_status_id="3"  class="alertStausCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">ACTION IN PROGRESS</h5></div>
												</label>
											 </li> 
											<li>
												<label class="checkbox-inline">
												<input type="checkbox" attr_status_id="4"  class="alertStausCls" checked>
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">COMPLETED</h5></div>
												</label>
											 </li>	
											<li>
												<label class="checkbox-inline">
												<input type="checkbox" attr_status_id="6"  class="alertStausCls">
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">ACTION NOT REQUIRED</h5></div>
												</label>
											 </li>	
											 <li>
												<label class="checkbox-inline">
												<input type="checkbox" attr_status_id="7"  class="alertStausCls">
													<div style="margin-top: 3px;"><h5 class="text-capital" style="color:#54616C;">DUPLICATE</h5></div>
												</label>
											 </li>	
									</ul>
								</div>
								<button type="button" class="btn btn-success getAlertDetailsCls" onClick="getAlertDtlsBasedOnSelection('click');">Get Details</button>
							  </div>
							</div>
						</div>
					 </div>
				</div>
				<div class="panel-body">
				   
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10 districtAltCtnCls">
						<div class="panel panel-default panelNew">
							<div class="panel-heading panelNew" style="background: rgb(237, 238, 240) none repeat scroll 0% 0% ! important;">
								<div class="row">
									<div class="col-md-6 col-xs-12 col-sm-6 pull-right">
										<ul class="activeUlCls alertFilterCls list-inline pull-right">
											<li class="active optionsCls text-capital" onClick="getAlertDetails('1')" attr_id="1" style="margin-left: -7px;">Overview</li>
											<li class="optionsCls text-capital" onClick="getAlertDetails('2')" attr_id="2" style="margin-left: -5px;">Status</li>
											<li class="optionsCls text-capital" onClick="getAlertDetails('5')" attr_id="5" style="margin-left: -5px;">Category</li> 
											<li class="optionsCls text-capital" onClick="getAlertDetails('3')" attr_id="3" style="margin-left: -6px;">Publication</li>  
											<!--<li  id="alertSettingsId"><i class="fa fa-gears" style="cursor:pointer;" data-toggle="tooltip" data-placement="top" title="" data-original-title="Settings"></i></li>-->
										</ul>
									</div>
									<div class="col-md-3 col-xs-12 col-sm-6">
										<label class="checkbox-inline f_16 text-capital">
										  <input type="checkbox" id="impactAlertsId" value="option2" checked onClick="getAlertDetails('1')" class="checkedAlertsCls">Impact Wise
										</label>
										<label class="checkbox-inline f_16 text-capital">
										  <input type="checkbox" id="locationAlertsId" value="option1" onClick="getLocationWiseAlertDetails()" class="checkedAlertsCls">Location Wise 
										</label>
									</div>
							   </div>
							</div>
							
							<div class="panel-body alertImpctLevelBlcock">  
								<div class="row">
									<div class="col-md-12 col-xs-12 col-sm-12 stateImpactLevelBlockCls">
									   <div class="panel panel-default panelNew">
										<div class="panel-heading">
											<h4 class="panel-title"><span class="headingColor" id="stateOverviewHeadingId">state overview - impact alerts</span></h4>
										</div>
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12 col-xs-12 col-sm-12">
													  <!-- Nav tabs -->
													  <ul class="nav nav-tabs navTabsAlerts pull-right" role="tablist">
														<li role="presentation" onClick="stateLevelHighchartBuildingFunction();"  class="active impactLevelCls collapseHIghChartViewCls"><a href="#stateOvervwGraph" aria-controls="stateOvervwGraph" role="tab" data-toggle="tab"><i class="fa fa-chart-line"></i></a></li>
														<li role="presentation" onClick="stateLevelTblBuildingFunction();" class="impactLevelCls collapseTblViewCls"><a href="#stateOvervwTable" aria-controls="stateOvervwTable" role="tab" data-toggle="tab">
															<i class="fa fa-table"></i>
														</a></li>
													  </ul>
												</div>
													<div class="col-md-12 col-xs-12 col-sm-12">
													  <!-- Tab panes -->
													  <div class="tab-content">
														<div role="tabpanel" class="tab-pane active collapseHIghChartViewCls" id="stateOvervwGraph">
															<div id="stateImpactLevelHighChartDivId" style="height:250px;"></div>
														</div>
														<div role="tabpanel" class="tab-pane collapseTblViewCls" id="stateOvervwTable">
															<div id="stateImpactLevelTblDivId"></div>
														</div>
													  </div>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									
									
									<div class="col-md-12 col-xs-12 col-sm-12 districtImpactLevelBlockCls">
										<div class="panel panel-default panelNew">
											<div class="panel-heading">
												<h4 class="panel-title"><span class="headingColor" id="districtOverviewHeadingId">District overview - impact alerts</span></h4>
											</div>
											<div class="panel-body">
												<div class="row" >
													<div class="col-md-8 col-xs-12 col-sm-8">
														<ul class="list-inline activeUlCls districtUl">
															<li class="descendingConstituencyCls active" onClick="getSortedDistrictInRequiredFormat('Decending')">
																<i class="glyphicon glyphicon-sort-by-attributes" ></i>
															</li>
															<li class="ascendingConstituencyCls" onClick="getSortedDistrictInRequiredFormat('Ascending')">
																<i class="glyphicon glyphicon-sort-by-attributes-alt" style="transform:rotate(180deg)"></i>
															</li>
															<li class="atozDistrictSortingCls" onClick="getSortedDistrictInRequiredFormat('AlphabeticalAscending')">
																A-Z
															</li>
															<li class="ztoaDistrictSortingCls" onClick="getSortedDistrictInRequiredFormat('AlphabeticalDescending')">
																Z-A
															</li>
															<li>
																<select class="form-control" id="districtSelectBoxId" onChange="getSortedDistrictInRequiredFormat('Search')">
																 <option value="0">Select District </option>
																</select>
															</li>
														</ul>
													</div>
													<div class="col-md-4 col-xs-12 col-sm-4">
														<!-- Nav tabs -->
														<ul class="nav nav-tabs navTabsAlerts pull-right" role="tablist">
															<li role="presentation" onClick="districtLevelHighchartBuildingFunction();" class="active impactLevelCls collapseHIghChartViewCls districtCollapseHIghChartViewCls"><a href="#districtOvervwGraph" aria-controls="districtOvervwGraph" role="tab" data-toggle="tab"><i class="fa fa-chart-line"></i></a></li>
															<li role="presentation" onClick="districtLevelTblBuildingFunction();" class="impactLevelCls collapseTblViewCls districtCollapseTblViewCls">
																<a href="#districtOvervwTable" aria-controls="districtOvervwTable" role="tab" data-toggle="tab"><i class="fa fa-table"></i></a>
															</li>
														</ul>
													</div>
													<div class="col-md-12 col-xs-12 col-sm-12">
														<!-- Tab panes -->
														<div class="tab-content">
															<div role="tabpanel" class="tab-pane active collapseHIghChartViewCls districtCollapseHIghChartViewCls" id="districtOvervwGraph">
																<div id="districtImpactLevelHighChartDivId" style="height:650px;"></div>
															</div>
															<div role="tabpanel" class="tab-pane collapseTblViewCls districtCollapseTblViewCls" id="districtOvervwTable">
																<div id="districtImpactLevelTblDivId"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									<!--swadhin-->
									
									<div class="col-md-12 col-xs-12 col-sm-12 parliamentImpactLevelBlockCls">
										<div class="panel panel-default panelNew">
											<div class="panel-heading">
												<h4 class="panel-title"><span class="headingColor" id="parliamentOverviewHeadingId">Parliament overview - impact alerts</span></h4>
											</div>
											<div class="panel-body">
												<div class="row" >
													<div class="col-md-8 col-xs-12 col-sm-8">
														<ul class="list-inline activeUlCls parliamentUl">
															<li class="descendingConstituencyCls active" onClick="getSortedParliamentInRequiredFormat('Decending')">
																<i class="glyphicon glyphicon-sort-by-attributes" ></i>
															</li>
															<li class="ascendingConstituencyCls" onClick="getSortedParliamentInRequiredFormat('Ascending')">
																<i class="glyphicon glyphicon-sort-by-attributes-alt" style="transform:rotate(180deg)"></i>
															</li>
															<li class="atozParliamentSortingCls" onClick="getSortedParliamentInRequiredFormat('AlphabeticalAscending')">
																A-Z
															</li>
															<li class="ztoaParliamentSortingCls" onClick="getSortedParliamentInRequiredFormat('AlphabeticalDescending')">
																Z-A
															</li>
															<li>
																<select class="form-control" id="parliamentSelectBoxId" onChange="getSortedParliamentInRequiredFormat('Search')">
																	<option value="0">Select Parliament </option>
																</select>
															</li>
														</ul>
													</div>
													<div class="col-md-4 col-xs-12 col-sm-4">
														<!-- Nav tabs -->
														<ul class="nav nav-tabs navTabsAlerts pull-right" role="tablist">
															<li role="presentation" onClick="parliamentLevelHighchartBuildingFunction();" class="active impactLevelCls collapseHIghChartViewCls parliamentCollapseHIghChartViewCls"><a href="#parliamentOvervwGraph" aria-controls="parliamentOvervwGraph" role="tab" data-toggle="tab"><i class="fa fa-chart-line"></i></a></li>
															<li role="presentation" onClick="parliamentLevelTblBuildingFunction();" class="impactLevelCls collapseTblViewCls parliamentCollapseTblViewCls">
																<a href="#parliamentOvervwTable" aria-controls="parliamentOvervwTable" role="tab" data-toggle="tab"><i class="fa fa-table"></i></a>
															</li>
														</ul>
													</div>
													<div class="col-md-12 col-xs-12 col-sm-12">
														<!-- Tab panes -->
														<div class="tab-content">
															<div role="tabpanel" class="tab-pane active collapseHIghChartViewCls parliamentCollapseHIghChartViewCls" id="parliamentOvervwGraph">
																<div id="parliamentImpactLevelHighChartDivId" style="height:650px;"></div>
															</div>
															<div role="tabpanel" class="tab-pane collapseTblViewCls parliamentCollapseTblViewCls" id="parliamentOvervwTable">
																<div id="parliamentImpactLevelTblDivId"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									
									
									
									<div class="col-md-12 col-xs-12 col-sm-12 gmcImpactLevelBlockCls">
										<div class="panel panel-default panelNew">
											<div class="panel-heading">
												<h4 class="panel-title"><span class="headingColor" id="corpOverviewHeadingId">CORP-GMC overview - impact alerts</span></h4>
											</div>
											<div class="panel-body">
												<div class="row">
													<div class="col-md-12 col-xs-12 col-sm-12">
														  <!-- Nav tabs -->
														  <ul class="nav nav-tabs navTabsAlerts pull-right" role="tablist">
															<li role="presentation" onClick="gmcLevelHighchartBuildingFunction();" class="active impactLevelCls collapseHIghChartViewCls"><a href="#corpGmcOvervwGraph" aria-controls="corpGmcOvervwGraph" role="tab" data-toggle="tab"><i class="fa fa-chart-line"></i></a></li>
															<li role="presentation" onClick="gmcLevelTblBuildingFunction();" class="impactLevelCls collapseTblViewCls"><a href="#corpGmcOvervwTable" aria-controls="corpGmcOvervwTable" role="tab" data-toggle="tab">
																<i class="fa fa-table"></i>
															</a></li>
														  </ul>
													</div>
													<div class="col-md-12 col-xs-12 col-sm-12">
														<!-- Tab panes -->
														<div class="tab-content">
															<div role="tabpanel" class="tab-pane active collapseHIghChartViewCls" id="corpGmcOvervwGraph">
																<div id="gmcImpactLevelHighChartDivId" style="height:250px;"></div>
															</div>
															<div role="tabpanel" class="tab-pane collapseTblViewCls" id="corpGmcOvervwTable">
																<div id="gmcImpactLevelTblDivId"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-12 col-xs-12 col-sm-12 constituencyImpactLevelBlockCls">
										<div class="panel panel-default panelNew">
												<div class="panel-heading">
													<h4 class="panel-title"><span class="headingColor" id="constituencyOverviewHeadingId">Constituency overview - impact alerts</span></h4>
												</div>
											<div class="panel-body">
												<div class="row">
													<div class="col-md-8 col-xs-12 col-sm-8">
														<ul class="list-inline activeUlCls  constituencyUl">
																<li class="descendingConstituencyCls active" onClick="getSortedConstituencyInRequiredFormat('Decending')">
																	<i class="glyphicon glyphicon-sort-by-attributes" ></i>
																</li >
																<li class="ascendingConstituencyCls" onClick="getSortedConstituencyInRequiredFormat('Ascending')">
																	<i class="glyphicon glyphicon-sort-by-attributes-alt" style="transform:rotate(180deg)"></i>
																</li>
																<li class="atozConstituecySortingCls" onClick="getSortedConstituencyInRequiredFormat('AlphabeticalAscending')">
																	A-Z
																</li>
																<li class="ztozConstituecySortingCls" onClick="getSortedConstituencyInRequiredFormat('AlphabeticalDescending')">
																	Z-A
																</li>
																<li class="ascendingSortingByConstituencyIdCls" onClick="getSortedConstituencyInRequiredFormat('locationIdAscendingOrder')">
																	constituency id&nbsp;&nbsp;<i class="fa fa-long-arrow-up"></i>
																</li>
																<li class="ascendingSortingByConstituencyIdCls" onClick="getSortedConstituencyInRequiredFormat('locationIdDescendingOrder')">
																	constituency id&nbsp;&nbsp;<i class="fa fa-long-arrow-down"></i>
																</li>
																<li>
																<select class="form-control" id="constituencySeletBoxId" onChange="getSortedConstituencyInRequiredFormat('Search')">
																	<option value="0">Select Constitency </option>
																</select>
																</li>
															</ul>
													</div>
													<div class="col-md-4 col-xs-12 col-sm-4">
														  <!-- Nav tabs -->
														  <ul class="nav nav-tabs navTabsAlerts pull-right" role="tablist">
															<li role="presentation" onClick="constituencyLevelHighchartBuildingFunction();" class="active impactLevelCls collapseHIghChartViewCls constituencyHighChartViewCls"><a href="#constituencyOvervwGraph" aria-controls="constituencyOvervwGraph" role="tab" data-toggle="tab"><i class="fa fa-chart-line"></i></a></li>
															<li role="presentation" onClick="constituencyTblBuildingFunction();" class="impactLevelCls collapseTblViewCls constituencyCollapseTblViewCls"><a href="#constituencyOvervwTable" aria-controls="constituencyOvervwTable" role="tab" data-toggle="tab">
																<i class="fa fa-table"></i>
															</a></li>
														  </ul>
													</div>
													<div class="col-md-12 col-xs-12 col-sm-12">
														  <!-- Tab panes -->
														<div class="tab-content">
															<div role="tabpanel" class="tab-pane active collapseHIghChartViewCls constituencyHighChartViewCls" id="constituencyOvervwGraph">
																<div id="constituencyLevelHighChartDivId" style="height:450px;"></div>
															</div>
															<div role="tabpanel" class="tab-pane collapseTblViewCls constituencyCollapseTblViewCls" id="constituencyOvervwTable">
																<div id="constituencyLevelTblDivId"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-12 col-xs-12 col-sm-12">
										<div class="panel panel-default panelNew">
												<div class="panel-heading">
													<h4 class="panel-title groupAssignCls"><span class="headingColor text-capital">Alert Assigned Group Members - Status</span></h4>
												</div>
											<div class="panel-body">
												<div id="groupAssignAlertDlsDivId" class="row m_top20"></div>     
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> 
					
				</div>
			</div>
		</div>
	</div>
</div>

<input type="hidden" id="alertTypeHiddenId"></input> 
<input type="hidden" id="alertEditionTypeHiddenId"></input>  
<input type="hidden" id="hiddenActivityId"></input> 
<input type="hidden" id="hiddenLevelTypeId" attr_level_type="impactScopeWise"></input>
<input type="hidden" id="alertCategoryTypeHiddenId" attr_alert_static_category_id_string="1,2,3" attr_alert_category_id_str="1,2,3"></input> 
<button  style="display:none" class="userStructureClass" attr_activityMemberId="1" attr_userTypeId="3" attr_userAccessLevelId="3" attr_userAccessLevelValuesString="11,12,15" > ActivityMember </button>
<!-- Modal For Alert Start -->
<div class="modal fade" id="alertModalId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document" style="width:90%"> 
    <div class="modal-content" style="border-radius:0px">
      <div class="modal-header" style="background-color:#CCC">
        <button type="button" class="close alertModalCloseCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       <div class="row">
			<div class="col-md-5 col-xs-12 col-sm-12">
				<h4 class="text-capital" id="alertModalHeadingId"></h4>
			</div>
			<div class="col-md-7 col-xs-12 col-sm-12" id="commitLvlId" style="display:none;">        
				<label class="radio-inline">
					<input class="commitLvlCls" type="radio" name="commitLvlName" id="commitLvlId1" value="All" checked> All
				</label>
				<label class="radio-inline">
					<input class="commitLvlCls" type="radio" name="commitLvlName" id="commitLvlId6" value="Central"> Central
				</label>   
				<label class="radio-inline">
					<input class="commitLvlCls" type="radio" name="commitLvlName" id="commitLvlId2" value="State"> State
				</label>    
				<label class="radio-inline">       
					<input class="commitLvlCls" type="radio" name="commitLvlName" id="commitLvlId3" value="District"> District
				</label>
				<label class="radio-inline">
					<input class="commitLvlCls" type="radio" name="commitLvlName" id="commitLvlId4" value="Mandal"> Mandal/Municipality
				</label>
				<label class="radio-inline">
					<input class="commitLvlCls" type="radio" name="commitLvlName" id="commitLvlId5" value="Village"> Village/Ward
				</label>
			</div>
		</div>
      </div>
       <div class="modal-body">
        <div class="row">
			<div class="col-md-12 col-xs-12 col-sm-12">
			<div ><center ><img style="display: none;" src="images/icons/loading.gif" id="alertProcessingImgId"></center></div>
			<div id="alertDetailsDivId"></div> 
			</div>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default alertModalCloseCls" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- End -->
<div class="modal fade" tabindex="-1" id="tourDocumentId" role="dialog">
	<div class="modal-dialog" style="width:95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="alertCntTitId">Tour Document</h4>  
			</div>
			<div class="modal-body" id="tourDocumentBodyId">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div><!--  /.modal-content -->  
	</div><!--  /.modal-dialog -->
</div><!--  /.modal -->
<div class="modal" tabindex="-1" role="dialog" id="cdrModelDivId">
		  <div class="modal-dialog modal-lg">       
			<div class="modal-content" style="border-radius:0px">
			  <div class="modal-header" style="background-color:#999999">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="tourDocHeadingId">Cadre Registration Comparison Details</h4>  
			  </div>
			  <div class="modal-body">   
				<div class="row">
					<div class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="cdrModelId"></div>
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="alertDestId" ></div>
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="sourceHeadingId"></div>
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="headingNameId" ></div>
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="alertDocHeadingId"></div>
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="alertDocId" ></div>
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="alertAttachTitId"></div>    
					</div> 
					<div class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="alertAttachImgId"></div>  
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="alertGroupAttachTitId"></div>    
					</div> 
					<div class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="alertGroupAttachImgId"></div>  
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="alertInvolvedCandidates"></div>        
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="alertAssignedCandidates"></div>  
					</div>
					<div class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="alertStatusDiv" ></div>    
					</div>
					<div  class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="alertCommentsDiv"></div>  
					</div> 
					<div  class="col-md-12 col-xs-12 col-sm-12 m_top10"> 
						<div id="alertVerificationDiv"></div>    
					</div>
					<div  class="col-md-12 col-xs-12 col-sm-12"> 
						<div id="alertVerificationDtlsDiv"></div>  
					</div>
				</div>
			  </div>
			  <div class="modal-footer">     
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
			</div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
<div class="modal fade" id="myModalShowNew">
	<div class="modal-dialog modal-lg" role="document" style="width:90%">
		<div class="modal-content">
			<div id="myModalShowNewId"></div>
		</div>
	</div>  
</div>	
<script src="Core/BaseComponents/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Core/BaseComponents/bootstap3.0/bootstrap3.0.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/DataTable/datatables.min.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/Slick/slick.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/scroll/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Core/BaseComponents/Plugins/scroll/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Core/Templates/politicalAlertDetails.js" type="text/javascript"></script>
<script type="text/javascript">
var typeId = "${param.type}"
</script> 
</body>
</html>