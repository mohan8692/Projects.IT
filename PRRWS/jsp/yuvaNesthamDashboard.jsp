<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Yuvanestam Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
	body{
		background-color:#fff !important;
	}
</style>
</head>
<body>
<header style="box-shadow: 0px 1px 2px 4px rgba(0, 0, 0, 0.2);">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<img src="Assests/images/yuvanestam.png" alt="" style="height: 50px;"/>
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

	<section class="navbar-section">
		<div class="container-fluid">
			<div class="row">
				<!--<div class="col-sm-2 m_top5">
					<h5 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" id="selectedName1" style="font-size:13px;cursor:pointer;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_distId="" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h5>
					<div class="multi-level-selection-menu arrow_box_top"></div>
				</div>-->
				<div class="col-sm-2 m_top10">
					<h5 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" style="font-size:13px;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h5>
					<div class="multi-level-selection-menu arrow_box_top"></div>						
				</div>
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
	</section>
</header>
<main style="margin-top: 20px !important;">
	<div class="container-fluid">
		<h5 class="font_weight">Note: Sanctioned Count Upto Current Date</h5>
		<div class="white-block-border m_top15">
			<div class="row">	
				<div class="col-sm-12">
					<h4 class="font_weight">OVERVIEW DETAILS</h4>
				</div>
			</div>
			<div id="overviewId"></div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div class="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading1">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion1" href="#collapse1" aria-expanded="true" aria-controls="collapse1">
							<h4 class="panel-title text-capital">YUVANESTAM DAY WISE - ANALYSIS</h4>
							</a>
						</div>
						<div id="collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading1">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<div id="timeLineViewTableId"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading2">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion2" href="#collapse2" aria-expanded="true" aria-controls="collapse2">
							<h4 class="panel-title text-capital"><span id="headingGriTypeId">Grievance Type Wise</span> - ANALYSIS</h4>
							</a>
						</div>
						<div id="collapse2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading2">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<ul class="switch-btn-New pull-right mainBlockClkCls">
											<li class="active text-capital" attr_name="GRIEVANCE TYPE WISE" attr_typeId="2">GRIEVANCE TYPE WISE</li>
											<li class="text-capital" attr_name="GRIEVANCE LIFECYCLE WISE" attr_typeId="1">GRIEVANCE LIFECYCLE ANALYSIS</li>
										</ul>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 m_top10">
										<div id="grievanceTypeDivId"></div>
										<div id="grievanceLifeCycleDivId" style="display:none;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div class="panel-group" id="accordion3" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading3">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion3" href="#collapse3" aria-expanded="true" aria-controls="collapse3">
							<h4 class="panel-title text-capital"><span id="headingAppTypeId">Category Wise</span> - ANALYSIS</h4>
							</a>
						</div>
						<div id="collapse3" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading3">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<ul class="switch-btn-New pull-right appBlockClkCls">
											<li class="active text-capital" attr_name="Category Wise" attr_typeId="CategoryWise">Category Wise</li>
											<li class="text-capital" attr_name="Age Wise" attr_typeId="AgeWise">Age Wise</li>
											<li class="text-capital" attr_name="Gender Wise" attr_typeId="GenderWise">Gender Wise</li>
											<li class="text-capital" attr_name="Education Wise" attr_typeId="EducationWise">Education Wise</li>
										</ul>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 m_top10">
										<div id="categoryWiseDivId"></div>
										<div id="ageWiseDivId" style="display:none;"></div>
										<div id="genderWiseDivId" style="display:none;"></div>
										<div id="educationWiseDivId" style="display:none;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="levelWiseDivId"></div>
	</div>
</main>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/js/locationDistrictHierarchy.js"></script>
<script src="Assests/js/yuvaNesthamDashboard.js" type="text/javascript"></script>
</body>
</html>