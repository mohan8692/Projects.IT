<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mahatma Gandhi National Rural EGS</title>
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
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<link href="Assests/css/print.css" rel="stylesheet" type="text/css"/>
<style>
.bg_color{
	background-color : #ddd;
}
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
<script type="text/javascript">
var loggedInUserId = '${sessionScope.User.userId}';
var searchParams = new URLSearchParams(window.location.search);
	searchParams = searchParams.get("component");
</script>
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj, RD & RWS</h4>
					<p>MGNREGS - AP</p>
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
				<div class="col-sm-2 border_right m_top5">
					<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" id="selectedName1" style="font-size:13px;cursor:pointer;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_distId="" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>
				</div>
				<div class="col-sm-3 border_right">
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
				<div class="col-sm-3 border_right">
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
				<div class="col-sm-12 text-right" id="logOutId" style="display:none;">
		              <a href="loginPage" class="btn btn-success btn-logout">Logout</a>
	             </div>
			</div>
		</div>
	</section>
</header>
<main>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<div class="col-sm-10">
					<ul class="list-inline pull-right">
						<li><span class="color-label color-label-gold"></span> 100% and above</li>
						<li><span class="color-label color-label-success"></span> 90% and Below 100%</li>
						<li><span class="color-label color-label-default"></span> 60% to Below 90%</li>
						<li><span class="color-label color-label-danger"></span> less than 60% &nbsp;&nbsp;&nbsp;</li>
						<li><button type="button" class="btn btn-primary btn-xs" title="Webservice Details" id="getWebserviceDetailsId">WS</button> </li>
					</ul> 
				</div>
				<div class="col-sm-2">
						<div class="menu-top-selection pull-right" style="padding: 6px 7px;border: 1px solid #333;border-radius: 50%;margin-left: 10px;margin-top: 3px;">
						<i class="glyphicon glyphicon-cog menu-top-selection-icon" title="Setup Components For Consolidated View"></i>
						<div class="arrow_box_top">
							<div class="row">
								<div id="navTabsMenuSelectionId"></div>
							</div>
						</div>
					</div>
					<ul class="nav navbar-nav tableMenu list-inline pull-right" id="viewSwitchBtn">
						<li class="active" attr_name="consolidated">Consolidated</li>
					</ul>
				</div>
				
			</div>
		</div>
		<div class="row">
			<!--<div class="col-sm-12 text-right">
				<p class="text-danger">Note: Amount in lakhs</p>
			</div>-->
			<div class="col-sm-12">
				<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-black">
						<div class="panel-heading" role="tab" id="headingOne">
							<a role="button" class="panelCollapseIcon" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								<h4 class="panel-title">MGNREGS - PROJECTS</h4>
							</a>
						</div>
						<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
							<div class="panel-body">
								<!--<div id="projectsOverviewConsolidated"></div>-->
								<div id="projectsOverview"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<section id="dashboardView">
		<div class="container-fluid">
			<div id="nregasAvgOverData"></div>
			<div id="nregasOverData"></div>
			<div id="projectOverviewBlock"></div>
			<div id="projectData"></div>
			<div id="projectDetails"></div>
		</div>
	</section>
	<section id="consolidatedView">
		<div class="container-fluid m_top20">
			<div id="projectDataConsolidated" class="m_top20"></div>
		</div>
	</section>
	
	<section id="pendingWorksComponentScollView">
		<div class="container-fluid m_top20 pendingWorksComponentView">
			<div id="pendingWorksComponentDivId" class="m_top20"></div>
		</div>
	</section>
	<div class="modal fade" tabindex="-1" id="pendingWorksComponentModalId" role="dialog" style="z-index:99999;">
		<div class="modal-dialog" style="width:90%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="pendingWorksHeadingId"></h4>  
				</div>
				<div class="modal-body">
					<div id="pendingWorksComponentBodyId"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>
	
	<div class="modal fade" id="webserviceDetailsModalDivId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width:80%;margin:auto">
			<div class="modal-content">    
				<div class="modal-header bg_EE">          
					<div class="row">
						<div class="col-md-8 col-xs-12 col-sm-4">
							<h4 class="modal-title text-capitalize" id="">Web Service Status Details</h4>
						</div>
						<div class="col-md-3 col-xs-12 col-sm-4">  
							<div class="input-group">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
								</span>
								<input type="text" class="form-control" id="dateRangePickerAUM"/>
							</div>
						</div>
						<div class="col-md-1 col-xs-12 col-sm-4">       
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>    
						</div>        
					</div>
				</div>
				<div class="modal-body">
					<div id="webserviceDetailsModalId"></div>
				</div>  
			</div>
		</div>
	</div>        
	<div class="modal fade" tabindex="-1" id="nregsConsitenModalId" role="dialog" style="z-index:99999;">
		<div class="modal-dialog" style="width:90%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close closeShowPdfCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="modalHeadingDivId"></h4>  
				</div>
				<div class="modal-body">
					<div id="nregsOverviewBodyId"></div>
					<div id="nregsConsitenBodyId"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default closeShowPdfCls" data-dismiss="modal">Close</button>
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>
   <!-- PopUp For LabourBudget PanchayatExp -->
	<div class="modal fade" tabindex="-1" id="nregsPanExpModalId" role="dialog" style="z-index:99999;">
		<div class="modal-dialog" style="width:90%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close closeShowPdfCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="larBudExpHeadingId"></h4>  
				</div>
				<div class="modal-body">
					<div id="LabBudgtPanExBodyOverviewId"></div>
					<div id="LabBudgtPanExBodyId"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default closeShowPdfCls" data-dismiss="modal">Close</button>
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>	
	<div class="modal fade" tabindex="-1" id="iconModalId" role="dialog" style="z-index:99999;">
		<div class="modal-dialog" style="width:60%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close closeShowPdfCls1" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="panchayatId">Panchayats vs Expenditure comments updating</h4>  
				</div>
				<div class="modal-body">
					<div class="row">	
						<div class="col-sm-4">
						<label>Select Status</label>
							<select class="form-control chosen-select" id="statusModalId">
								<!--<option value="0">Select Status </option>-->
							</select>
						</div>
						<div class="col-sm-8">
							<div class="row">
								<div class="col-sm-6">
								  <label>Comment</label>
									<textarea class="form-control" rows="3" id="commentId"></textarea>
								</div>
								<div class="col-sm-6">
								   <label>Action Plan</label>
									<textarea class="form-control" rows="3" id="actionTypeId"></textarea>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<button type="button" class="btn btn-success btn-sm" id="updateId">Submit</button>
							<div id="errorId"  style="color:red;"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<!--<button type="button" class="btn btn-default" data-dismiss="modal closeShowPdfCls">Close</button>-->
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>	
	<!-- PopUp For Month Wise Expenditure-->
	<div class="modal fade" tabindex="-1" id="nregsMnthExpModalId" role="dialog" style="z-index:99999;">
		<div class="modal-dialog" style="width:90%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close closeShowPdfCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="mnthExpHeadingId"></h4>  
				</div>
				<div class="modal-body">
					<div id="mnthExBodyId"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default closeShowPdfCls" data-dismiss="modal">Close</button>
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>
</main>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
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
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
<script src="Assests/MGNREGS/NregaConsolidated.js" type="text/javascript"></script>
<script src="Assests/MGNREGS/MGNREGS.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">

$(".menu-top-selection-icon").tooltip();
onLoadCallsConsolidated();
//onLoadCalls();
$(document).on("click","#viewSwitchBtn li",function(){
	$("[overview-state],[overview-district]").removeClass("active");
	$(this).addClass("active");
	$("#consolidatedView").show();
	$("#projectData,#projectOverviewBlock").hide();
});
if(loggedInUserId == 1){
 $("#logOutId").show();
}
</script>
</body>
</html>