<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Grievance Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/sliderbar/bootstrap-slider.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
header{
	box-shadow: none !important;
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
						<h4 class="text-capital white_color">Panchayat Raj & RD & RWS</h4>
						<p>Grievances</p>
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
		<section class="navbar-section" style="background-color: #E6E6E6;">
			<div class="container-fluid">			
				<div class="row">
					<div class="col-sm-4">					
					<!--<select class="chosen-select form-control" id="deptId" multiple>
						<option value="0">All</option>						
						<option value="10083,10082,100167">Panchayathi Raj</option>					
						<option value="10072">RD</option>					
						<option value="10081">RWS</option>					
					</select>-->
					<label class="checkbox-inline">
					  <input type="checkbox" value="0" id="allId" class="getDeptWiseHodsCls" name="department" checked="checked" attr_dept="all">All
					</label>
					<label class="checkbox-inline">
					  <input type="checkbox" id="prCheckBoxId" class ="individual getDeptWiseHodsCls" value="100083,100082,100167" name="department" attr_dept="PR">Panchayathi Raj
					</label>
					<label class="checkbox-inline">
					  <input type="checkbox" id="rdCheckBoxId" value="100072" class ="individual getDeptWiseHodsCls" name="department" attr_dept="RD">RD
					</label>
					<label class="checkbox-inline">
					  <input type="checkbox" id="rwsCheckBoxId" value="100081" class ="individual getDeptWiseHodsCls" name="department" attr_dept="RWS">RWS
					</label>
					<label class="checkbox-inline">
					  <input type="checkbox" id="ITECCheckBoxId" value="100084" class ="individual getDeptWiseHodsCls" name="department" attr_dept="ITEC">IT E&C
					</label>
				</div>
				<div class="col-sm-4 border_right">
					<div class="form-horizontal">
						<div class="form-group form-group-sm">
							<label class="col-sm-2" for="formGroupInputLarge">HOD's</label>
							<div class="col-sm-10">
								<select id="deptHODId" class="chosen-select" multiple></select>
							</div>
						</div>
					</div>
				
				</div>
				
				<div class="col-sm-1">	
					<button class="btn btn-success btn-sm getDepartmentWiseCls" style="border-radius:0px;">SUBMIT</button>
				</div>
					<div class="col-sm-3 pull-right">
						<div class="input-group inline-block" style="margin-left: 50px;">
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
							</span>
							<input class="form-control" id="dateRangePickerGrievance" type="text" style="width:200px;cursor:pointer;">
						</div>
					</div>					
				</div>
			</div>
		</section>	
	</header>
	<section style="background-color: #f5f5f5;padding:10px;">
		<div class="container-fluid">			
			<div class="row m_top10">
				<div id="sourcesTabId"></div>
			</div>
			<div class="row m_top10">
				<div class="col-sm-6 pull-right">
					<ul class="list-inline switch-btn pull-right grievanceTableViewCls" role="tabCummulative">
						<li class="active" attr_type="location" style="font-size:12px !important;">Location Wise</li>
						<!--<li attr_type="officer" style="font-size:12px !important;">Officer Wise</li>-->
						<li attr_type="topGrievance" style="font-size:12px !important;">Top Grievances</li>
					</ul>
				</div>				
			</div>
			<div id="locationGrievanceTableViewDetailsDivId" class="m_top10 locationCls"></div>
			<div id="topGrievanceTableViewDetailsDivId" class="m_top10 topGrievanceCls"  style="display:none;"></div>
		</div>
	</section>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/sliderbar/bootstrap-slider.js" type="text/javascript"></script>
<script src="Assests/js/grievanceDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">
var globalDeptName = "${param.deptName}";
</script>
</body>
</html>