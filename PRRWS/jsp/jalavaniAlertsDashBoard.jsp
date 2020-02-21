<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title id="titleId"></title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/customLessAMS.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
.DTFC_LeftBodyWrapper
{
	top:-13px !important;
}
.DTFC_LeftBodyWrapper tr td
{
	background-color:#fff;
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
				<div class="col-sm-10 m_top10 col-xs-9j">
					<h4 class="text-capital" id="nameHeaderId"></h4>
					<p id="nameId"></p>
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
	

<section class="navbar-section" style="padding: 10px;background-color: #fff;">
		<div class="container-fluid">
			<div class="row">
				
				<div class="col-sm-1  m_top10 pull-right">
					<!--<ul class="list-inline">
						<li><h6 class="font_weight closedReopenAlertsCls" attr_statusId="12" attr_statusName="Closed" style="text-decoration:underline;cursor:pointer;">Closed Alerts</h6></li>
						<li><h6 class="font_weight closedReopenAlertsCls" attr_statusId="11" attr_statusName="Reopen" style="text-decoration:underline;cursor:pointer;">Reopen Alerts</h6></li>
					</ul>-->
					<i class="fa fa-info-circle menu-cls2 pull-right m_top20" title="Click To Show Closed And Reopen Alerts"></i>
					<div class="menuCls-table2">
						<div class="arrow_box_top1">
							<div class="row">
								<div class="col-sm-12">
									<ul class="list-inline text-center">
										<li><h5 class="font_weight closedReopenAlertsCls" attr_statusId="12" attr_statusName="Closed" style="text-decoration:underline;cursor:pointer;">Closed Alerts</h5></li>
									</ul>
									<ul class="list-inline text-center">
										<li><h5 class="font_weight closedReopenAlertsCls" attr_statusId="11" attr_statusName="Reopen" style="text-decoration:underline;cursor:pointer;">Reopen Alerts</h5></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-3 pull-right m_top20">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePicker"/>
					</div>
				</div>
				<div class="col-sm-4 pull-right">
					<div class="row">
						<div class="col-sm-6">
							<label>Department</label>
							<select class="form-control chosen-select departmentCls" id="deptId"></select>
						</div>
						<div class="col-sm-6">
							<label>Sub Department</label>
							<select class="form-control chosen-select subDepartmentCls" id="subDeptId"><option value="0" selected>Select</option></select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</header>
<section class="" style="padding: 10px;background-color: #fff;margin-top:1px;">
	<div class="container-fluid">
		<div class="white-block">
			<div class="pad_border">
				<div class="row">
					<div class="col-sm-12">
						<h3 class="" id="componentId"></h3>
					</div>
				</div>
				<div class="row">
					<div id="jalavaniTabOverVewDivId" class="m_top10"></div>
				</div>
				<div class="pad_border m_top10">
					<div class="row">
						<div class="col-sm-12">
							<h4 class="font_weight">FILTERS</h4>
							<div class="col-sm-3 m_top10">
								<label class="font_weight">ALERT SOURCE</label>
								<select class="form-control chosen-select" id="alertTypeId">
									<option value="0">All</option>
									<option value="2">Print Media</option>
									<option value="3">Electronic Media</option>
									<option value="4">Call Center</option>
									<option value="5">Social Media</option>
								</select>
							</div>
							<!--<div class="col-sm-3 m_top10">
								<label class="font_weight">VIEW DATA</label>
								<select class="form-control chosen-select" id="viewTypeId">
									<option value="0">Select View Type</option>
									<option value="Alert" selected>Alert</option>
									<option value="Status">Status</option>
								</select>
							</div>-->
							<div class="col-sm-2 m_top40">
								<h6 style="padding:8px;border:1px solid #4FB800;color:#4FB800;cursor:pointer;" class="m_top25 text-center getResultsCls">GET DETAILS</h6>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div id="jalavaniTableViewDetailsDivId" class="m_top10"></div>
				</div>
			</div>	
		</div>
	</div>
</section>	
<div class="modal fade" id="alertManagementPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document" style="width:95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalHeadingTotal"></h4>
			</div>
			<div class="modal-body modal-insurance">
				
				<div id="alertManagementPopupBody"></div>
			</div>
		</div>
  </div>
</div>	
<div class="modal fade" id="alertManagementPopup1" tabindex="-2" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close closeSecondModal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="alertManagementPopupHeading">Modal title</h4>
			</div>
			<div class="modal-body">
				<div id="alertManagementPopupBody1"></div>
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
				<button type="button" class="btn btn-default closeSecondModal" data-dismiss="modal">Close</button>
			</div>
		</div>
  </div>
</div> 
<div class="modal fade" id="timeSeriesWiseModalId" tabindex="-2" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document" style="width:70%;">
		<div class="modal-content">
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-10">
						<h4 style="font-weight:bold;">Alert Feed Back Details</h4>
					</div>
					<div class="col-sm-2">
						<button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="color:red;font-size:30px;">&times;</span></button>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div id="timeSeriesWisGraphDivId" style="height:300px;"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
							<h4 style="font-weight:bold;">Alert IVR Summary</h4>
					</div>
				</div>	
				<div class="row">
					<div class="col-sm-12">
						<div id="timeSeriesIVRGraphDivId" style="height:300px;"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
							<h4 style="font-weight:bold;">IVR Respondant Details</h4>
					</div>
				</div>	
				<div class="row">
					<div class="col-sm-12">
						<div id="timeSeriesIVRRespondantGraphDivId" style="height:300px;"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
  </div>
</div> 
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
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
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/SimplePagination/simplePagination3.js" type="text/javascript"></script>
<script src="Assests/js/jalavaniAlertsDashBoard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">
	var globalDepartmentId=["${param.deptId}"];
	for(var i in globalDepartmentId){
		if(globalDepartmentId[i] == 19){
			$("#titleId").html("IT E&C Alerts DashBoard");
			$("#nameHeaderId").html("<span style='position: relative;top: 10px;'>IT E&C ALERTS</span>");
			$("#componentId").html("ALERTS OVERVIEW");
		}else if(globalDepartmentId[i] == 20){
			$("#titleId").html("Panchayat Raj Alerts DashBoard");
			$("#nameHeaderId").html("<span style='position: relative;top: 10px;'>PANCHAYAT RAJ - COMMISSIONER</span>");
			$("#componentId").html("ALERTS OVERVIEW");
		}else if(globalDepartmentId[i] == 71){
			$("#titleId").html("Panchayat Raj Alerts DashBoard");
			$("#nameHeaderId").html("<span style='position: relative;top: 10px;'>PANCHAYAT RAJ - ENC</span>");
			$("#componentId").html("ALERTS OVERVIEW");
		}else if(globalDepartmentId[i] == 48){
			$("#titleId").html("Rural Developement Alerts DashBoard");
			$("#nameHeaderId").html("<span style='position: relative;top: 10px;'>RURAL DEVELOPMENT ALERTS</span>");
			$("#componentId").html("ALERTS OVERVIEW");
		}else if(globalDepartmentId[i] == 49){
			$("#titleId").html("Jalavani Alerts DashBoard");
			$("#nameHeaderId").html("<span style='position: relative;top: 10px;'> JALAVANI DASHBOARD</span>");
			$("#componentId").html("JALAVANI");
			//$("#nameId").html("JALAVANI DASHBOARD");
		}else if(globalDepartmentId[i] == 0){
			$("#titleId").html("Alerts DashBoard");
			$("#componentId").html("ALERTS OVERVIEW");
			$("#nameHeaderId").html("<span style='position: relative;top: 10px;'>PACHAYAT RAJ, RD, RWS, IT E&C ALERTS</span>");
		}
	}
</script> 
<script>
  var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()
</script>
</body>
</html>