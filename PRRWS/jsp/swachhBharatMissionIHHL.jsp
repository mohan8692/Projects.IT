<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Swatch Bharat Mission IHHL</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/><link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
.DTFC_LeftBodyWrapper
{
	top:-13px !important;
}
.DTFC_LeftBodyWrapper tr td
{
	background-color:#fff;
}
.sacnotsacClass
{
	background-color:green !important;
	color:#fff;
}
.notstartinprogresscomClass
{
	background-color:brown !important;
	color:#fff;
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
					<p>Swatch Bharat Mission IHHL</p>
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
				<div class="col-sm-2 border_right">
					<!--Note: All Amount in Lakhs-->
				</div>
				
				<div class="col-sm-6">
					<ul class="list-inline pull-right">
						<li><span class="categoryRondedCss" style="background-color:#F7B519">A</span> 100% and above</li>
						<li><span class="categoryRondedCss" style="background-color:#00AF50">B</span>  90% and above</li>
						<li><span class="categoryRondedCss" style="background-color:#FF6600">C</span>  60% to Below 90%</li>
						<li><span class="categoryRondedCss" style="background-color:#FF0000">D</span> less than 60% &nbsp;&nbsp;&nbsp;</li>
					</ul>
				</div>
				<div class="col-sm-3">
					<div class="input-group pull-right">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePickerAUM" style="width: 200px;"/>
					</div>
				</div>
			</div>
		</div>
	</section>
</header>
<main>
	<div class="container-fluid">
		<div class="white-block">
			<div class="row">
				<div class="col-sm-12">
				  <h3>&nbsp&nbsp&nbspOVERALL PROGRESS DETAILS UP TO 31 MARCH&nbsp&nbsp<span><i style="cursor: pointer; font-size: 16px; margin-top: 10px;color:green;" class="glyphicon glyphicon-info-sign tooltipCls"  data-toggle="tooltip" data-placement="top" title="Total Status Up To 31'st March which includes before OCT 1'st completed works."></i></span><h4>
					<div class="col-sm-3 m_top10">
						<div id="overAllIHHLPerformanceId" style="height:280px;border:1px solid #ccc"></div>
					</div>
					<div class="col-sm-9 m_top10">
						<div id="statusWiseIHHLPerformanceId" style="height:280px;border:1px solid #ccc;margin-left: -5px;"></div>
					</div>
				</div>
			</div>
			<div class="row m_top20"  style="padding: 11px; margin-left: 0px; margin-right: 0px;">
				<div class="col-sm-12" style="border: 1px solid #ccc;">
					<h5 class="m_top10"><b>CATEGORY WISE ANALYSIS&nbsp&nbsp<span><i style="cursor: pointer; font-size: 16px; margin-top: 10px;color:green;" class="glyphicon glyphicon-info-sign tooltipCls"  data-toggle="tooltip" data-placement="top" title="Total Status Up To 31'st March which includes before OCT 1'st completed works."></i></span></b>  <span class="pull-right">Note : D - DISTRICT , C - CONSTITUENCY , M - MANDAL</span></h5>
					<div id="categoryWiseDataId"></div>
				</div>
				<div class="col-sm-12" style="border: 1px solid #ccc;">
				<h5 class="m_top10"><b>CATEGORY WISE ANALYSIS&nbsp&nbsp(<span style="color:green;" id="dailyCategoryWiseAnalysisHeadinId" ></span>)</h5>
					<div id="selectedDatecategoryWiseDataId"></div>
				</div>
			</div>
			<div class="row m_top20"  style="padding: 11px; margin-left: 0px; margin-right: 0px;">
				<div class="col-sm-12" style="border: 1px solid #ccc;">
					<h5 class="m_top10"><b>IHHL Achivement Progress</b></h5>
					<div class="row">
							<ul class="list-inline pull-right calendar_active_IHHL_cls ihhlAchivementProgressCls" attr_level_type="graph">
								<li class="defaultActiveClsDay commpnliCls" attr_val="day"><img src="Assests/icons/Today_icon.png"/>&nbsp;&nbsp;<b><span>Day</span></b></li>
								<li class="active commpnliCls weeklicls" attr_val="week"><img src="Assests/icons/Week_icon.png" />&nbsp;&nbsp;<b><span> Week</span></b></li>
								<li class="commpnliCls" attr_val="month"><img src="Assests/icons/CustomRange_icon.png" />&nbsp;&nbsp;<b><span>Month</span></b></li>
								</li>
							</ul>  
					</div>
					<div id="IHHLAchivementProgress" style="height:300px;"></div>
				</div>
			</div>
		</div>
		<div class="white-block m_top20" style="background-color:#F0F0F0;padding:10px">
			<div class="row">
				<div class="col-sm-12">
					<ul class="list-inline pull-right calendar_active_IHHL_cls" attr_level_type="table">
						<li attr_val="view" style="cursor:none;"><b><span>View wise&nbsp:</span></b></li>
						<li class="defaultActiveClsDay commpnliCls timePeriodCommonCls" attr_val="day"><img src="Assests/icons/Today_icon.png"/>&nbsp;&nbsp;<b><span>Day</span></b></li>
						<li class="active commpnliCls weeklicls locationLevelWeekCls timePeriodCommonCls" attr_val="week"><img src="Assests/icons/Week_icon.png" />&nbsp;&nbsp;<b><span> Week</span></b></li>
						<li class="commpnliCls timePeriodCommonCls" attr_val="month"><img src="Assests/icons/CustomRange_icon.png" />&nbsp;&nbsp;<b><span>Month</span></b></li>
						<!--<li attr_val="custom" id="singleDateRangePicker"><b><span>Custom Range</span></b></li>-->
						</li>
					</ul>  
				</div>
			</div>
			<div class="row m_top20">
				<div class="col-sm-12">
					<div id="levelWiseDetailsBlockId"></div>
				</div>
			</div>
		</div>
	</div>
</main>
<div class="modal fade" id="categoryWiseAnalysisModalDivId" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width: 95%;">
    <div class="modal-content modal-custom">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="color:#fff">&times;</span></button>
        <h4 class="modal-title" id="modalHeadingId"></h4>
      </div>
      <div class="modal-body">
	   <div id="categoryWiseAnalysisTableDivId"></div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/swachhBharatMissionIHHL/swachhBharatMissionIHHL.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>