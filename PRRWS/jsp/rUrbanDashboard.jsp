<!doctype html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>RUrban Dashboard</title>
	<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
	<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
	<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/DataTable/new/datatables.css" type="text/css" rel="stylesheet"/>
	<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/Chosen/chosen.css" type="text/less" rel="stylesheet"/>
	<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
	<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
	<script src="https://use.fontawesome.com/07d3416f74.js"></script>
	<script src="Assests/Plugins/Less/less.js"></script>
	<style>
		.status .workStagesCls li {
			border-radius:0px !important;
			text-transform: none;
		}
		table.dataTable thead th, table.dataTable thead td {		
			border-bottom: none !important;
		}
		.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover{
			color: #fff !important;
		}
	</style>
	</head>
<body>
<header style="box-shadow:none;">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj & RD & RWS</h4>
					<p>Rurban Dashboard- AP</p>
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
				<div class="col-sm-3 pull-right">
					<h5 class="font_weight pull-right">Note: Amount In Crores.</h5>
				</div>
			</div>
		</div>
	</section>
</header>
<div class="container-fluid">
	<div class="white-block " style="padding:15px;">
		<!-- Phases -->
		<div class="row m_top10">
			<div  id="phaseWiseDetails"></div>
		</div>
	</div>
	<div class="row m_top20">
		<div class="col-sm-12">
			<div id="levelWisePhaseDetailsId"></div>
		</div>
	</div>
</div>
<div class="modal fade" tabindex="-1" id="clusterModalId" role="dialog" >
		<div class="modal-dialog" style="width:90%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close clusterClose" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">
					<span id="headingId"> </span><span class="font_weight f_15 m_top5 pull-right"style="padding-right: 69px;">Note: Amount In Crores.</span></h4>	
					<!--<h4 class="modal-title" id="headingId"></h4>  -->
				</div>
				<div class="modal-body">
					<div id="clusterWiseDetailsId"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default close clusterClose" data-dismiss="modal" aria-label="Close">Close</button>
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>
<!-- works modal -->
<div class="modal fade" id="worksModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">
				<span id="headingTitle"> </span><span class="font_weight f_15 m_top5 pull-right"style="padding-right: 69px;">Note: Amount In Lakhs.</span></h4>
			</div>
			<div class="modal-body">
				<div id="worksDetailsId"></div>
			</div>
			 <div class="modal-footer">     
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		</div>
	</div>
</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/new/datatables.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="Assests/RurbanDashBoard/RurbanDashBoardNew.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">
var phaseComponentId = "${param.component}";
</script>
</body>
</html>