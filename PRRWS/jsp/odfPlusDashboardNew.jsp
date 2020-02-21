
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ODF Plus Dashboard</title>
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
<style>
section{
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
	border: solid 1px #dcdcdc;	
	padding-top: 10px;
	padding-bottom: 10px;	
}
.gpAnalysisCls{
	cursor: pointer;
	color: #372775;
	text-decoration: underline;
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
					<p>ODF Plus</p>
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
			<div class="col-sm-3 m_top10 pull-right">
				<div class="input-group inline-block" style="width:230px;">
					<span class="input-group-addon">
						<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
					</span>
					<input class="form-control" id="dateRangePickerOdfPlus" type="text" style="cursor:pointer;">
				</div>
			</div>			
		</div>
	</div>
</section>	
<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">
	<div class="white-block p_60_20">
		<div class="row">
			<div class="pad_20" style="background-color:#f5f5f5;border:1px solid #cbcbcb;">
				<div class="row">
					<div class="col-sm-12">
						<h4 class="font_weight">Overview</h4>
					</div>				
					<div class="col-sm-3 m_top5 text-center">
						<div class="pad_15 white-block" style="border: solid 1px #e5e5e5;box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);">
							<div class="media">
								<div class="media-left">
									<img src="Assests/images/odf plus icons/Business-Approval-icon.png" class="m_top10" style="width: 55px;"/>
								</div>
								<div class="media-body">
									<h5 class="font_weight m_top10">ODF Plus Satisfied</h5>
									<h4 class="m_top10 good_color font_weight" id="odfSatisfiedPercId"></h4>
									<h5 class="m_top5 font_weight" id="odfSatisfiedCountId"></h5>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-3 m_top5 text-center">
						<div class="pad_15 white-block" style="border: solid 1px #e5e5e5;box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);">
							<div class="media">
								<div class="media-left">
									<img src="Assests/images/odf plus icons/Group 2745.png" style="width: 55px;"/>
								</div>
								<div class="media-body">
									<h5 class="font_weight m_top10">Total Panchayats</h5>
									<h4 class="m_top15 font_weight"  id="totalPanchayatsId" style="margin-bottom: 15px;"></h4>										
								</div>
							</div>
						</div>
					</div>					
					<div class="col-sm-6 m_top5">
						<div class="pad_15 white-block" style="border: solid 1px #e5e5e5;box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);">
							<div class="row">
								<div class="col-sm-4 text-center">
									<div class="media">
										<div class="media-left">
											<img src="Assests/images/odf plus icons/Group 2750.png" class="m_top10" style="width: 55px;"/>
										</div>
										<div class="media-body">
											<h5 class="font_weight m_top10">Swachhagrahis</h5>
											<h4 class="m_top15 font_weight">-</h4>										
										</div>
									</div>
								</div>
								<div class="col-sm-4 text-center">
									<div class="br_left">
										<h5 class="font_weight m_top10">Swachhagrahis GP's</h5>
										<h4 class="m_top15 font_weight">-</h4>
										<h5 class="font_weight good_color m_top15"></h5>
									</div>
								</div>
								<div class="col-sm-4 text-center">
									<div class="br_left">
										<h5 class="font_weight m_top10">Not Swachhagrahis GP's</h5>
										<h4 class="m_top15 font_weight">-</h4>
										<h5 class="font_weight good_color m_top15"></h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="m_top10 pad_15 white-block" style="border: solid 1px #e5e5e5;">
					<div class="row">
						<div class="col-sm-12">
							<div id="overviewTableDivId"></div>
						</div>
					</div>			
				</div>			
			</div>
		</div>
		<div class="row m_top20">
			<div class="pad_20" style="background-color:#f5f5f5;border:1px solid #cbcbcb;">
				<div class="row">
					<div class="col-sm-12">
						<h4 class="font_weight">Components Overview</h4>
						<div id="componentOverviewDivId"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row m_top20">
			<div id="odfLocationWiseDetailsDivId"></div>
		</div>
	</div>
</div>
<!-- modal -->
<div class="modal fade" tabindex="-1" id="odfPlusModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="odfPlusHeadingId"></h4>  
			</div>
			<div class="modal-body">
				<div id="subComponentsGpsAnalysisDivId"></div>
			</div>				
		</div>
	</div>
</div>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
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
<script src="Assests/solidWasteManagement/odfPlusDashboardNew.js" type="text/javascript"></script>
<script src="Assests/js/locationHierarchyMGNREGS.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>

</html>