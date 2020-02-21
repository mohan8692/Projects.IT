<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>IT E & C Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/getorgchart/getorgchart.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
.panel-default
{
	border-color:#333
}
#people {
	width: 100%;
	height: 400px;
}
.get-text.get-text-2
{
	font-size:28px;
}
.slick-prev {

    left: -9px !important;
    z-index: 999;

}
.slick-next {

    right: 0px !important;
    z-index: 999;

}
.departmentModalClkCls {
	cursor:pointer;
}
.panelCollapseIconChange::before {
	margin:0px !important;
}
<!-- ApInnovationScoiety Style -->
.tableStyleCls  th{
		background-color:#e2e9e0 !important;
	}
	.tableStyleCls  td{
		background-color:#fff !important;
	}
	.itBlueCol{
		color:#01209F;
	}
	.indRupStyCls{
		color: #E4B860;
		font-size: 18px;
		background-color: #fff;
		border: 1px solid #E4B860;
	}
	.maroonBlc{
		background-color:#EDD1D1;
		border-radius:2px;
	}
	.purGreyBlc{
		background-color:#DEDEDE;
		border-radius:4px;
	}
	.ulTabStyleCls li.active > a{
		background-color: #305F33 !important;
		color: #fff !important;
		font-size: 13px !important;
	}
	.ulTabStyleCls a{
		background-color: #fff !important;
		border: 1px solid #E2E2E2 !important;
		border-radius: 0px !important;
		border-left: none !important;
		color: #333 !important;
		font-weight: bold !important;
		margin: 0px !important;
	}
	.table_bg_white th,
	.table_bg_white td{
		background-color: #fff !important;
		vertical-align: middle !important;
		text-transform: none !important;
		text-align: center !important;
		font-size: 13px !important;
		font-weight: bold !important;
	}
	.tableGreyCol th{
		background-color:#EBEBEB !important;
	}
	.tablePureGreyCol th{
		background-color:#C9CDD5  !important;
	}
	.startupProfileCls,.startupProfStagesCls,.districtClickCls,.activitiesCls,.startUpCompInfoCls,.bootCampPartiCls{
		cursor: pointer;
		text-decoration: underline;
	}
	.sectioncs {
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16) !important;
		background-color: #ffffff !important;
		border: solid 1px #dcdcdc !important;
		padding-top: 10px !important;
		padding-bottom: 10px !important;
	}
</style>
<script type="text/javascript">
var searchParams = new URLSearchParams(window.location.search);
	searchParams = searchParams.get("component");
</script>
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
					<p>IT E & C - Dashboard</p>
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

	<!--<section class="navbar-section">
		<div class="container-fluid">
			<div class="row">
				<!--<div class="col-sm-2 border_right m_top5">
					<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" style="font-size:13px;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_distId="" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>
				</div>
				<div class="col-sm-12">
					<ul class="list-inline pull-right sub-menu">
						  <div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
							 <input type="text" class="form-control" id="itcDateRangePickerId" style="width: 200px;"/>
						 </div>
					</ul>
				</div>
			</div>
		</div>
	</section>-->
</header>
<main class="m_top5">
	<div class="container-fluid">
		<section>
			<div class="row m_top10">
				<div class="col-sm-12">
					<div id="departmentWiseDivId"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div id="departmentBlockWiseDetailsId"></div>
					<div id="APISXLr8APOverview" class="m_top10"></div>
					<div id="campaignsOverviewBlock" class="m_top10"></div>
					<div id="campusOverviewBlock" class="m_top10"></div>
				</div>
			</div>
		</section>
	</div>
</main>
<div class="modal fade" id="modalId" tabindex="-1" role="dialog" style="z-index:9999;">
	<div class="modal-dialog" role="document" style="width:80%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="modalTitleId">Cohort </h4>
			</div>
			<div class="modal-body">
				<div id="cohortId"></div>
			</div>
		</div>
	</div>
</div>
<!-- Modal For Sector Wise Count Details -->
<div class="modal fade" id="sectorModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:80%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="sectorModalTitleId"></h4>
			</div>
			<div class="modal-body">
				<div id="sectorModalDivId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="departmentModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:85%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h5 class="modal-title" id="headingTitle"></h5>
			</div>
			<div class="modal-body">
				<div id="departmentDetailsDivId"></div>
			</div>
			 <div class="modal-footer">     
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		</div>
	</div>
</div>
<div class="modal fade" id="emeodbStatusModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:99%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="statusModalTitleId"><b>Application Status Details</b></h4>
			</div>
			<div class="modal-body">
				<div id="emeodbApplicationDtlsDivId"></div>
			</div>
		</div>
	</div>
</div>
<!-- Meeseva KPI Online Dept Count -->
<div class="modal fade" id="kpiOnlineDeptModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:40%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="deptServiceHeadingId"><b></b></h4>
			</div>
			<div class="modal-body">
				<div id="kpiOnlineDeptDivId"></div>
			</div>
		</div>
	</div>
</div>
<!-- Meeseva KPI Moblie App Dept Count -->
<div class="modal fade" id="kpiMobileAppDeptModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:40%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="mobileAppHeadingId"><b></b></h4>
			</div>
			<div class="modal-body">
				<div id="kpiMobileAppDeptDivId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="droppedBlockModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:40%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="mobileAppHeadingId"><b>DROPPED</b></h4>
			</div>
			<div class="modal-body">
				<div id="droppedDataFormModal"></div>
				<div id="droppedDataFormModal1"></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="kpiDistrictModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="kpiDistrictHeadingId"><b></b></h4>
			</div>
			<div class="modal-body">
				<div id="kpiDistrictDivId"></div>
			</div>
		</div>
	</div>
</div>
<!-- Incubators Cohort Modal -->
<div class="modal fade" id="cohortModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="cohortModalTitleId"><b></b></h4>
			</div>
			<div class="modal-body">
				<div id="cohortModalDivId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="fundingPatternModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="fundingPatternModalTitleId"></h4>
			</div>
			<div class="modal-body">
				<div id="fundingPatternModalDivId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="catBtoCatAModalDivIdModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="catBtoCatAModalDivIdHeading"></h4>
			</div>
			<div class="modal-body">
				<div id="catBtoCatAModalDivId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="departmentModalDivId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="modalHeadingId"></h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<div id="locationModalDivId"></div>
					</div>
				</div>
				<div id="locationModalPopupDivId"></div>
				<div class="m_top20" id="locationModalServicePopupDivId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="newServicesModalDivId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital">New Service Details</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<div id="newServiceId"></div>
					</div>
				</div>				
			</div>
		</div>
	</div>
</div>	

<!-- modal For ApInnovationSociety -- Nandhini-->
<div class="modal fade" tabindex="-1" id="APInnovationModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital f_16 font_weight" id="APInnovationModalHeadingId"></h4>  
			</div>
			<div class="modal-body">
				<div id="APInnovationModalDetailsDivId"></div>				
			</div>			
		</div>
	</div>
</div>
<div class="modal fade" tabindex="-1" id="startUpCompInforModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital f_16 font_weight" id="startUpCompInfoModalHeadingId"></h4>  
			</div>
			<div class="modal-body">
				<div id="startUpCompInfoModalDetailsDivId"></div>				
			</div>			
		</div>
	</div>
</div>
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
<script src="Assests/Plugins/getorgchart/getorgchart.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/js/locationHierarchy.js"></script>
<script src="Assests/SimplePagination/simplePagination3.js" type="text/javascript"></script>
<script src="Assests/ItcDashboard/ItcDashboard.js" type="text/javascript"></script>
<script src="Assests/js/apInnovationSocietyDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>