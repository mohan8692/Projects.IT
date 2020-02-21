<!doctype html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>AP Fiber Dashboard</title>
	<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
	<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
	<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/Chosen/chosen.css" type="text/less" rel="stylesheet"/>
	<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
	<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
	<script src="https://use.fontawesome.com/07d3416f74.js"></script>
	<script src="Assests/Plugins/Less/less.js"></script>
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
					<img src="Assests/img/apfiber_logo.png" style="height: 60px;margin-left: -40px;"/>
				</div>
				<div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right" id="menuIconId"></i>
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
		<div class="white-block m_top10" style="border: 1px solid #ddd;box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);padding:10px">
			<div class="row ">					
				<div id="customerDetailsId"></div>
			</div>
		</div>
		<div class="white-block m_top10" style="border: 1px solid #ddd;box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);padding:10px">
			<div class="row ">
				<div id="fiberCoverageDetailsId"></div>	
			</div>
		</div>
		<div class="white-block m_top10" style="border: 1px solid #ddd;box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);padding:10px">
			<div class="row ">
				<div id="popWiseDetailsId"></div>
			</div>
		</div>
		<div class="white-block m_top10" style="border: 1px solid #ddd;box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);padding:10px">
			<div class="row ">
				<div id="recentNewConnectionsId"></div>
				
				<!--<div class="col-sm-12 m_top10">
					<h4 class="p_left10">Last 10 Days New Connections Tending</h4>
					<div class="pad_border">						
						<div id="connection-chart-wrapper" style="height:300px;"></div>
					</div>
				</div>-->
			</div>
		</div>
		<div class="white-block">
			<div class="row m_top10">
				<div class="col-sm-12">	
					<div id="locationsData"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Connection Details modal -->
<div class="modal fade" id="connectionModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="headingTitle"></h4>
			</div>
			<div class="modal-body">
				<div id="connectionDetailsId"></div>
			</div>
			 <div class="modal-footer">     
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		</div>
	</div>
</div>

<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="Assests/fiberGridDashboard/fiberGridDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">
function buildGraph(){
	$('#connection-chart-wrapper').highcharts({
		chart: {
			type: 'line',
			
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: ['Day-1', 'Day-2', 'Day-3', 'Day-4', 'Day-5', 'Day-6', 'Day-7', 'Day-8', 'Day-9', 'Day-10']
		},
		yAxis: {
			min:0,
			title: {
				text: 'Connections'
			}
			
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: false
			}
		},
		series: [{
			name: 'Days',
			data: [300, 500, 400, 700, 600, 800, 400, 900, 700, 300]
		}]
	});
}
</script>

</body>
</html>