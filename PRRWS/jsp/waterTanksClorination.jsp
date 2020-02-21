<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WATER TANKS CHLORINATION</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="Assests/Plugins/Less/less.js"></script>
<script src="https://use.fontawesome.com/e94c241642.js"></script>
</head>
<body>
<header style = "box-shadow:none;background-color:#fff;">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayati Raj, RD & RWS</h4>
					<p>WATER TANKS CHLORINATION - Dashboard</p>
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
<main class="m_top5">
	<div class="container-fluid">
		<section class="chartDateWise m_top10">
			<div class="date_block_css">
				<div class="row">
					<div class="col-sm-12">
						<ul class="list-inline pull-right calendar_active_cls">
							<li attr_val="Overall" ><img src="Assests/icons/Overall_icon.png"/>&nbsp;&nbsp;<b><span>Overall</span></b></li>
							<li attr_val="Last 7 Days" class="active"><img src="Assests/icons/Week_icon.png"/>&nbsp;&nbsp;<b><span> Last 7 Days</span></b></li>
							<li attr_val="Last 30 Days"><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>Last 30 Days</span></b></li>
							<li attr_val="3Months" ><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>3Months</span></b></li>
							<li attr_val="6Months"><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>6Months</span></b></li>
							<li attr_val="Year"><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>Year</span></b></li>
							<li attr_val="custom" id="singleDateRangePicker"><img src="Assests/icons/CustomRange_icon.png"/>&nbsp;&nbsp;<b><span>Custom Range</span></b></li>
							</li>
						</ul> 
					</div>
				</div>
			</div>
		</section>
		<section class="m_top10">
			<div class="row">
				<div id="clorinatedMainViewId"></div>
			</div>
		</section>
		<section class="m_top10">
				<div id="levelWiseWaterTankDetails"></div>
		</section>
	</div>
</main>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/clorination/waterTanksClorination.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>