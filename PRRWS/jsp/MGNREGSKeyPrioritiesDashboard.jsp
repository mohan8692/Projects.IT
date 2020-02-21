
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MGREGS Key Priorities Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
section{
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
	border: solid 1px #dcdcdc;	
	padding-top: 10px;
	padding-bottom: 10px;	
}
.arrow_box {
	position: relative;
	background: #fcb922;
}
.arrow_box:after, .arrow_box:before {
	left: 100%;
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.arrow_box:after {
	border-color: rgba(252, 185, 34, 0);
	border-left-color: #fcb922;
	border-width: 5px;
	margin-top: -4px;
}
.arrow_box:before {
	border-color: rgba(231, 231, 231, 0);
	border-left-color: #e7e7e7;
	border-width: 5px;
	margin-top: -5px;
}
.arrow_box_yash {
	position: relative;
	background: #dddddd;
}
.arrow_box_yash:after, .arrow_box_yash:before {
	left: 100%;
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.arrow_box_yash:after {
	border-color: rgba(252, 185, 34, 0);
	border-left-color: #dddddd;
	border-width: 4px;
	margin-top: -4px;
}
.arrow_box_yash:before {
	border-color: rgba(231, 231, 231, 0);
	border-left-color: #e7e7e7;
	border-width: 5px;
	margin-top: -5px;
}
.componentCls{
	display: none;
}
.slick-prev, .slick-next{
	top:27px !important;
}
.tableGrey th{
	background-color:#cfcfcf !important;
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
					<h4 class="f_16 font_weight text-capital white_color">Panchayat Raj,RD&News </h4>
					<p>MGREGS Key Priorities</p>
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
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 m_top10">
				<h5 class="arrowIconChanged"><i class="fa fa-plus-circle" style="font-size:15px;color:#ffba00;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h5>
				<div class="multi-level-selection-menu arrow_box_top"></div>						
			</div>				
			
			<div class="col-sm-10">
				<ul class="list-inline switch-btn-New selectionWiseDtsCls pull-right">
					<li class="active" attr_type="achievement">Achievement</li>
					<li attr_type="expenditure">Expenditure</li>
				</ul>
			</div>
			<!--<div class="col-sm-2 pull-right">
				<div class="input-group inline-block">
					<span class="input-group-addon">
						<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
					</span>
					<input class="form-control" id="dateRangePickerKeyPrior" type="text" style="width:150px;cursor:pointer;">
				</div>
			</div>-->			
		</div>
	</div>
</section>	
<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">		
	<div class="white-block" style="padding:20px">	
		<div class="achievement">
			<div class="row">
				<div class="col-sm-12">
					<h5 class="font_weight pull-right m_top10 weeklyNoteCls">WEEK : Saturday to Friday</h5>	
					<h4 class="font_weight text-capital text-center m_top10" id="blockWiseHeadingId">Achievement Wise Details</h4>	
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<ul class="switch-btn-key workComparisionCls m_top20">
						<li class="active" data-type="Weekly">Weekly</li>
						<li class="" data-type="Monthly">Monthly</li>
						<li class="" data-type="Combined">Combined</li>
					</ul>		
					<div class="pad_15" style="border:1px solid #cbcbcb; background-color: #f5f5f5;">
						<div class="row">					
							<div class="col-sm-12">					
								<h5 class="font_weight text-capital font_16">Department Wise</h5>					
								<div class="pad_15 white-block m_top10" style="border: 1px solid #ccc;">
									<div id="departmentwiseDetailsDivId" class=""></div>
									<!--<p class="show-view text-center font_weight" style="cursor:pointer;">Click to more</p>-->
								</div>
							</div>
						</div>							
					</div>	
				</div>	
			</div>	
			<div class="row">
				<div class="col-sm-12">	
					<div class="panel-group m_top10" id="accordionKPComponentComparision" role="tablist" aria-multiselectable="true">
						<div class="panel panel-default panel-black">
							<div class="panel-heading" role="tab">		
								<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionKPComponentComparision" href="#collapseKPComponentComparision" aria-expanded="true" aria-controls="collapseKPComponentComparision">		
									<h4 class="panel-title text-capital">Component Wise Comparision</h4>						
								</a>
							</div>
							<div id="collapseKPComponentComparision" class="panel-collapse collapse in" role="tabpanel">	
								<div class="panel-body">
									<div class="row">
										<div class="col-sm-12">
											<div class="row m_top10">															
												<div class="col-sm-2">
													<select class="chosen-select form-control" id= "componentCompareDepartment">										
													</select>
												</div>
											</div>
											<div id="componentWiseComparisionDivId"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div class="panel-group m_top10" id="accordionKPComponentsDistrictComparision" role="tablist" aria-multiselectable="true">
						<div class="panel panel-default panel-black">
							<div class="panel-heading" role="tab">		
								<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionKPComponentsDistrictComparision" href="#collapseKPComponentsDistrictComparision" aria-expanded="true" aria-controls="collapseKPComponentsDistrictComparision">		
									<h4 class="panel-title text-capital">Components District Wise Comparision</h4>						
								</a>
							</div>
							<div id="collapseKPComponentsDistrictComparision" class="panel-collapse collapse in" role="tabpanel">	
								<div class="panel-body">
									<div class="row">
										<div class="col-sm-12">									
											<div id="KPComponentsDistrictComparisionDivId"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div class="panel-group m_top10" id="accordionKPComponentAnalysis" role="tablist" aria-multiselectable="true">
						<div class="panel panel-default panel-black">
							<div class="panel-heading" role="tab">		
								<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionKPComponentAnalysis" href="#collapseKPComponentAnalysis" aria-expanded="true" aria-controls="collapseKPComponentAnalysis">		
									<h4 class="panel-title text-capital">Component Analysis</h4>						
								</a>
							</div>
							<div id="collapseKPComponentAnalysis" class="panel-collapse collapse in" role="tabpanel">	
								<div class="panel-body">
									<div class="row">
										<div class="col-sm-12">
											<div class="row m_top10">															
												<div class="col-sm-2">
													<select class="chosen-select form-control" id= "componentAnalysisDepartment">										
													</select>
												</div>
												<div class="col-sm-2">
													<select class="chosen-select form-control" id= "componentDivId">										
													</select>
												</div>
												<div class="col-sm-1">
													<button class="btn btm-sm btn-primary CASubmit">submit</button>
												</div>
											</div>
										</div>
									</div>						
									<!--<div class="white-block border_yash pad_10 m_top10">
										<div id="componentAnalysisGraphId">
										</div>
									</div>-->
									<div class="row m_top20">
										<div class="col-sm-12">
											<div class="pad_15">
												<div class="row">
													<div id="keyPrioritiesLocationWiseDetailsDivId"></div>
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
		<div class="expenditure expenditureUlLiCss"  style="display:none;">
			<div class="border_pad m_top20">
				<div class="row">
					<div class="col-sm-12 ">
						<h5 class="font_weight text-capital">OverAll</h5>
					</div>
				</div>
				<div id="overAllExpenditureDts"></div>
			</div>
			
			<div class="border_pad m_top20">
				<div class="row">
					<div class="col-sm-12 ">
						<h5 class="font_weight text-capital">Department Wise</h5>
					</div>
				</div>
				<div id="departmentwiseExpenditureDetailsDivId" class=""></div>
			</div>
			<div class="border_pad m_top20">
				<div class="row">
					<div class="col-sm-6 ">
						<h5 class="font_weight text-capital">DISTRICT WISE - <span id="expendTimPaymenttitId">Expenditure</span></h5>
					</div>
					<div class="col-sm-6 ">
						<ul class="list-inline pull-right switch-btn-New districtWiseExpTimelyDtsCls">
							<li class="active" attr_type="Expenditure" attr_table_id ="deptwiseExpenditureDetailsDivId">Expenditure</li>
							<li class="" attr_type="Timely Payments" attr_table_id ="deptwiseTimlyDetailsDivId">Timely Payments</li>
						</ul>
					</div>
				</div>
				<div id="deptwiseExpenditureDetailsDivId" class="expendPaymentShowHideCls"></div>
				<div id="deptwiseTimlyDetailsDivId" class="expendPaymentShowHideCls" style="display:none;"></div>
			</div>
		</div>
	</div>
</div>
<!-- modal -->
<div class="modal fade" tabindex="-1" id="deptWiseModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:85%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital font_weight" id="deptHeadingId"></h4>  
			</div>
			<div class="modal-body">
				<div id="deptWiseDtsDivId"></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>	
		</div>
	</div>
</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/tableFixed/tableHeadFixer.js" type="text/javascript"></script>
<script src="Assests/js/locationHierarchy.js" type="text/javascript"></script>
<script src="Assests/MGNREGS/MGNREGSKeyPrioritiesDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
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