<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>ODF Plus Dashboard</title>
	<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
	<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
	<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
	<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
	<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
	<script src="https://use.fontawesome.com/07d3416f74.js"></script>
	<script src="Assests/Plugins/Less/less.js"></script>
	<style>
		header{
			box-shadow: none !important;
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
					<h4 class="text-capital">Panchayat Raj & RD & RWS</h4>
					<p class="white_color">ODF Plus Dashboard- AP</p>
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
<section class="white-block">
	<div class="container-fluid">			
		<div class="row m_top10">
			<div class="col-sm-12">
				<div id="odfOverviewDivId"></div>			
			</div>
		</div>
		<div class="row m_top10">
			<div class="col-sm-12">				
				<div id="odfLocationWiseDetailsDivId"></div>
			</div>
		</div>
	</div>
</section>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/solidWasteManagement/odfPlusDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>