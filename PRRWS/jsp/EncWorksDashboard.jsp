<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ENC Works Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/getorgchart/getorgchart.css" type="text/css" rel="stylesheet"/>
<link rel="stylesheet" href="Assests/Plugins/Scroller/bootstrap-multiselect.css" type="text/css">
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
	.DTFC_LeftBodyWrapper{
		top:-13px !important;
		background-color:#fff;
		border-right:1px solid #ccc;
	}
	.DTFC_LeftBodyLiner{
		overflow-y: hidden !important;
	}
</style>
</head>
<body>
<style>
table td.crossed
{
   background-image: linear-gradient(to top right,  transparent calc(50% - 1px), #ccc, calc(50% + 1px),#ccc); 
}
.exceedCls th, .exceedCls td {
	padding: 3px !important;
}
.exceedCls td {
	font-size:12px !important;
}
.encWorksCls td {
	font-size:12px !important;
	padding: 5px !important;
}
</style>
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj</h4>
					<p>ENC Works- DashBoard</p>
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
<section class="" style="padding: 10px;background-color: #DFDFE0;">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 m_top10">
				<h5 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" style="font-size:13px;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h5>
				<div class="multi-level-selection-menu arrow_box_top"></div>						
			</div>
			<!--<div class="col-sm-3">
				<h5 class="m_top10 font_weight">Note: Amount In Lakhs & Length in KMS</h5>
			</div>-->
			<div class="col-sm-3 pull-right">
				<div class="input-group">
					<span class="input-group-addon">
						<i class="glyphicon glyphicon-calendar"></i>
					</span>
					<input type="text" class="form-control" id="dateRangePickerAUM" style="width: 200px;"/>
				</div>
			</div>
			<div class="col-sm-2 pull-right">
				<!--<label>Scheme</label>-->
				<select id="schemeDivId" class=""  data-placeholder="Select Schemes" multiple>
				</select>
			</div>
			<div class="col-sm-2 pull-right">
				<!--<label>Financial Year</label>-->
				<select id="financialYearId" class="chosenSelect"></select>
			</div>
			
			
		</div>
	</div>
</section>
<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">
	<div class="white-block" style="padding:15px;">
		<div class="row">
			<h5 class="m_top10 font_weight pull-right">Note: Amount In Lakhs & Length in KMS</h5>
			<div class="col-sm-12 m_top10">				
				<div class="panel-group" id="accordionEX1">
					<div class="panel panel-default panel-black">
						<div class="panel-heading" id="headingEX1">
							<a role="button" class="panelCollapseIcon collapsed collapseClick" data-toggle="collapse" data-parent="#accordionEX1" href="#collapseEX1" aria-expanded="true" aria-controls="collapseEX1">
								<h4 class="panel-title text-capital">Scheme wise OVERVIEW</h4>
							</a>	
						</div>
						<div id="collapseEX1" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading1">
							<div class="panel-body">
								<div id="encSchemesEffeciencyDivId"></div>
								<div id="encSchemesTableDivId"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row m_top20">
			<div class="col-sm-12">
				<h4 class="font_weight" style="font-size: 17px;">WORKS - OVERVIEW</h4>
			</div>
		</div>
		<div class="pad_border m_top10">
			<div class="row">
				<div class="col-sm-12">
					<div class="chart2" id="enclocationWiseChart"></div>
				</div>
			</div>
		</div>
		<div class="row m_top20">
			<div class="col-sm-12">
				<h4 class="font_weight" style="font-size: 17px;">EXCEEDED WORK DETAILS</h4>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6 m_top10">
				<div class="row">
					<div class="col-sm-2">
					</div>
					<div class="col-sm-10">
						<div class="row">
							<div class="col-sm-6">
								<label class="radio-inline m_top10">
									<input type="radio" class="exceedWorkTypeCls"  name="optradio1" value="ongoing" checked> Under Progress Works-(<span id="underProgID"></span>)
								</label>
							</div>
							<div class="col-sm-6">
								<label class="radio-inline m_top10">
									<input type="radio"  class="exceedWorkTypeCls"  name="optradio1" value="" > Grounded Works-(<span id="groundedID"></span>)
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="pad_border m_top10">
					<div class="chart2" id="ExceededWorkDetailsGraph"></div>
				</div>
			</div>
			<div class="col-sm-6 m_top20">
				<div class="row">
					<div class="col-sm-4">
						<h5 class="font_weight">Not Grounded Works-(<span id="notGroundedID"></span>)</h5>
					</div>
				</div>
				<div class="pad_border m_top10">
					<div class="chart2" id="NotGroundedExceededWorkDetailsGraph"></div>
				</div>
			</div>
		</div>
		<div class="row m_top20">
			<div class="col-sm-12">
				<div class="panel-group" id="accordionEX2" >
					<div class="panel panel-default panel-black">
						<div class="panel-heading" id="headingEX2">
							<a role="button" class="panelCollapseIcon collapseClick" data-toggle="collapse" data-parent="#accordionEX2" href="#collapseEX2" aria-expanded="true" aria-controls="collapseEX2">
								<h4 class="panel-title text-capital">Progress Report</h4>
							</a>	
						</div>
						<div id="collapseEX2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading2">
							<div class="col-sm-3 pull-right m_top10">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
									<input type="text" class="form-control" id="dateRangePickerReport" style="width: 200px;"/>
								</div>
							</div>
							<div class="panel-body">
								<div id="weeklyReportTableDivId"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row m_top20">
			<div class="col-sm-12">
				<div id="levelWiseOverviewId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modalHablitationDivId" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document" style="width: 95%;">
	<div class="modal-content modal-custom">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="color:#fff">&times;</span></button>
			<h4 class="modal-title" id="modalHabliHeadingId"></h4>
		</div>
		<div class="modal-body">
			<div id="modalAmountSchemeTable"></div>
			<div id="modalSchemsTable"></div>
			<div id="modalExceededTable"></div>
			<div id="modalNotGroundedExceededTable"></div>
			<div id="modalReviewReportTable"></div>
		</div>
	</div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div>
<div class="modal fade" id="worksHistoryDivId" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document" style="width: 80%;">
	<div class="modal-content modal-custom">
		<div class="modal-header">
			<button type="button" class="close closeShowPdfCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" style="color:#fff">&times;</span></button>
			<h4 class="modal-title" id="worksHistoryHeadingId"></h4>
		</div>
		<div class="modal-body">
			<div id="worksHistoryTable"></div>			
		</div>
	</div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/encDashBoard/EncWorksDashboard.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/Plugins/Scroller/bootstrap-multiselect.js"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/js/locationHierarchy.js"></script>
<script type="text/javascript">
$(document).on("click",".clickToViewTable",function(){
	var type=$('.workWiseDetailsCls').find('li.active').attr('attr_type');
	var blockId=$(this).attr('attr_block_id');
	var location=$(this).attr('attr_loc');
	var count=$(this).attr('attr_cnt');
	var status=$(this).attr('attr_status');
	if(type=="works"){
		getLocationWiseWorksInformation(blockId,location,"table");
	}else if(type=="exceed"){ 
		getLocationWiseExceededWorkDetails(blockId,location,'table',status,"overAll");
	}else if(type=="notGrounded"){ 
		getLocationWiseNotGroundedExceededWorkDetails(blockId,location,'table',"","notGrounded");
	}
	
});
</script>
</body>
</html>
</html>