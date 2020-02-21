<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BIOMETRIC-ITE&C SECRETARIAT</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
.table-employeeAtten {
	border-spacing: 4px 0px;
}
.table-employeeAtten tr th:nth-child(1){
	background-color:#FFFFFF;
}
.table-employeeAtten tr th:nth-child(n+2){
	background-color:#00D1B5;
	color:#FFFFFF;
}
.table-employeeAtten tr th:nth-child(n+6){
	border-top:2px solid  #898989 !important;
	background-color:#EDEBEB;
	color:#00BD13;
}

.table-employeeAtten tr th:nth-child(2){
	border-top:2px solid #3FDCC7;
	border-left:2px solid #3FDCC7;
	border-top-left-radius:10px;
}
.table-employeeAtten tr td:nth-child(2){
	border-left:2px solid #3FDCC7;
}
.table-employeeAtten tr th:nth-child(5){
	border-top:2px solid #3FDCC7;
	border-right:2px solid #3FDCC7;
	border-top-right-radius:10px;
}
.table-employeeAtten tr td:nth-child(5){
	border-right:2px solid #3FDCC7;
}
.table-employeeAtten tr th:nth-child(6){
	border-top:2px solid #898989 !important;
	border-left:2px solid #898989 !important;
	border-top-left-radius:10px;
}
.table-employeeAtten tr td:nth-child(6){
	border-left:2px solid #898989 !important;
}
.table-employeeAtten tr td:nth-child(9){
	border-right:2px solid #898989 !important;
}
.table-employeeAtten tr:last-child td:nth-child(9){
	border-bottom:2px solid  #898989 !important;
	border-right:2px solid #898989 !important;
	border-bottom-right-radius:10px;
}
.table-employeeAtten tr:last-child th:nth-child(9){
	border-top:2px solid  #898989 !important;
	border-right:2px solid #898989 !important;
	border-top-right-radius:10px;
}
.table-employeeAtten tr:last-child td:nth-child(6){
	border-bottom:2px solid  #898989 !important;
	border-left:2px solid #898989 !important;
	border-bottom-left-radius:10px;
}
.table-employeeAtten tr:last-child td:nth-child(n+2){
	border-bottom:2px solid #3FDCC7;
	
}
.table-employeeAtten tr:last-child td:nth-child(n+6){
	border-bottom:2px solid  #898989 !important;

}
.table-employeeAtten tr:last-child td:nth-child(2){
	border-bottom-left-radius:10px;
}
.table-employeeAtten tr:last-child td:nth-child(5){
	border-bottom-right-radius:10px;
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
					<p>BIOMETRIC - ITE&C SECRETARIAT</p>
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
		<div class="white-block" style="padding:10px;">
			<h4><span class="employeeSqCss"></span> <span class="employeeCss">EMP ATTENDANCE Overview </span></h4>
			<div class="row m_top10">
				<div class="col-sm-12">
					<div style="border:1px solid #ccc;padding:10px;border-radius:5px;">
							<div class="row">
								<div class="col-sm-12">
									<h5 class="pull-right todayBio">Today</h5>
								</div>
							</div>
							<div class="row">
								<div id="empOverViewBlockId"></div>
							</div>
							<div class="row m_top10">
								<div class="col-sm-8" style="border-right:1px solid #ccc;">
									<h5 class="font_weight m_top10" style="margin-left:15px">IN-TIME STATISTICS</h5>
									<div id="inTimeStatisticsDivId" style="height:180px;" class="m_top10"></div>
								</div>
								<div class="col-sm-4">
									<h5 class="font_weight m_top10" style="margin-left:15px">Information Technologies</h5>
									<div class="m_top20" style="background-color:#F1F1F1;padding:10px;">
									<div class="row">
										<div class="col-sm-6">
											<div class="media">
												<div class="media-left">
													<img src="Assests/icons/bioMetric/login.png" class="media-object"  width="50px" height="60px" />
												</div>
												<div class="media-body">
													<h4 class="media-heading" id="avgInTimeId" style="color:#FF851B;">-</h4>
													<p>Average In-Time</p>
												</div>
											</div>  
										</div>
										<div class="col-sm-6">
											<div class="media">
												<div class="media-left">
													<img src="Assests/icons/bioMetric/logout.png" class="media-object"  width="50px" height="60px" />
												</div>
												<div class="media-body">
													<h4 class="media-heading" id="avgOutTimeId" style="color:#85134A;">-</h4>
													<p>Average Out-Time</p>
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
			<div class="row m_top10">
				<div class="col-sm-12">
					<div style="border:1px solid #ccc;padding:10px;border-radius:5px;">
					   <h5 class="font_weight" id="daysReportHeadingId"></h5>
							<div class="row">
								<div class="col-sm-12">
									<div class="input-group pull-right dateRangePickerCls">
									<input type="text" id="dateRangeId" style="width:190px" class="form-control"/>
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
								</div>
								</div>
							</div>
							<div id="lastDaysStatisticsDivId" style="height:250px;" class="m_top10"></div>
						
							<h5 class="font_weight m_top10">EMPLOYEE ATTENDANCE</h5>
							<div id="attandanceOverviewDetailsId" class="m_top10"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
<div class="modal fade" id="openModalDiv" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index:9999;">
	<div class="modal-dialog" role="document" style="width:95%">
		<div class="modal-content">
			<div class="modal-header">
				<div class="row" >
					<div class="col-md-8">
						<h4 class="theme-title-color text-capital font_weight" id="bioMetricTitleId">Title</h4>
					</div>
					<div class="col-sm-3 pull-right">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
				</div>
			</div>
			<div class="modal-body">      
					<div class="row">
						<div class="col-sm-12">
							<div class="input-group pull-right dateRangePickerCls">
							<input type="text" id="dateRangePopupId" style="width:190px" class="form-control"/>
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
						 </div>
						</div>
					</div>
					<div class="row m_top10">
						<div class="col-sm-12">
							<div id="empDetailsModalDivId"></div>
						</div>		
					</div>	
					<div class="row m_top20">
						<div class="col-sm-12">
							<div style="border:1px solid #ccc;padding:10px;border-radius:5px;">
								<h5 class="font_weight" style="margin-left:15px">IN-TIME STATISTICS</h5>
								<div id="empInTimeGraphModalDivId" style="height:180px;" class="m_top10"></div>
							</div>
						</div>		
					</div>	
					<div class="row m_top10">
						<div class="col-sm-12">
							<div style="border:1px solid #ccc;padding:10px;border-radius:5px;">
							 <h5 class="font_weight" id="individaualEmpdaysReportHeadingId"></h5>
								<div id="empLastDaysStatisticsDivId" style="height:250px;" class="m_top10"></div>
							</div>
						</div>		
					</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
  <div class="modal fade" id="empDetailsModalId" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document" style="width:85%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title text-capital"><b id="employeeDetaislHeadingId">Employee Details</b></h4>
				</div>
				<div class="modal-body">
					<div id="employeeDetailsDivId"></div>
				</div>
			</div>
		</div>
	</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/bioMetric/bioMetric.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
 <script type = "text/javascript">
 
 </script>
</body>
</html>