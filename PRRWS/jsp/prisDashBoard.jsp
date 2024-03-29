<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PRIS Survey Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>

</head>
<body>
<style>
.bg_color{
	background-color : #ddd;
}
</style>
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-4 m_top10 col-xs-9 headingBlock">
					<h4 class="text-capital">PRIS Survey</h4>
					<p>DASHBOARD</p>
				</div>
				
				<div class="col-sm-1 col-xs-12 col-sm-offset-5">
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
				<div class="col-sm-3">
					<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" style="font-size:13px;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>
				</div>
				<div class="col-sm-9">
					<ul class="list-inline pull-right calendar_active_cls">
						<li attr_val="Overall" class="active"><img src="Assests/icons/Overall_icon.png"/>&nbsp;&nbsp;<b><span>Overall</span></b></li>
						<li attr_val="Today"><img src="Assests/icons/Today_icon.png"/>&nbsp;&nbsp;<b><span>Today</span></b></li>
						<li attr_val="Week"><img src="Assests/icons/Week_icon.png"/>&nbsp;&nbsp;<b><span> Week</span></b></li>
						<li  attr_val="Month"><img src="Assests/icons/Month_icon.png"/>&nbsp;&nbsp;<b><span>Month</span></b></li>
						<li attr_val="3Months"><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>3Months</span></b></li>
						<li attr_val="6Months"><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>6Months</span></b></li>
						<li attr_val="Year"><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>Year</span></b></li>
						<li attr_val="custom" id="singleDateRangePicker"><img src="Assests/icons/CustomRange_icon.png"/>&nbsp;&nbsp;<b><span>Custom Range</span></b></li>
						</li>
					</ul>  
				</div>
			</div>
		</div>
	</section>
</header>
<main>
	<div class="container-fluid">
	<section>
			<div class="row m_top5">
				<div class="col-sm-12">
					<div id="levelBlocksDivId"></div>
				</div>
			</div>
			<div class="row m_top5">
				<div class="col-sm-3 mainBlock">
					<div class="white-block">
						<div class="media blockHeights block_styles">
						  <div class="media-left img_middle">
							  <img class="media-object" src="Assests/icons/house_icon.png" alt="house_icon">
						  </div>
						  <div class="media-body">
							<h4 class="">TOTAL HOUSEHOLDS</h4>
							<h4 class="m_top10 title_align" id="totalHouseHolds"></h4>
						  </div>
						</div>
					</div>
				</div>
				<div class="col-sm-3 mainBlock">
					<div class="white-block">
						<div class="media blockHeights block_styles">
						  <div class="media-left img_middle">
							  <img class="media-object" src="Assests/icons/Target_icon.png" alt="Target_icon">
						  </div>
						  <div class="media-body">
							<h4 class="panel-title">TARGET <span class="pull-right color_Tlabel" id="targetOverallPercent"></span></h4>
							<small>Overall</small>
							<h4 class="title_align" id="targetOverall"></h4>
						  </div>
						</div>
					</div>
				</div>
				<div class="col-sm-3 mainBlock">
					<div class="white-block">
						<div class="media blockHeights block_styles">
						  <div class="media-left img_middle">
							  <img class="media-object" src="Assests/icons/Achived_icon.png" alt="Achived_icon">
						  </div>
						  <div class="media-body">
							<h4 class="">ACHIEVED <span class="pull-right color_Alabel" id="achievedOverallpercent"></span></h4>
							<small>Overall</small>
							<h4 class="m_top10 title_align" id="achievedOverall"></h4>
						  </div>
						</div>
					</div>
				</div>
				<div class="col-sm-3 mainBlock">
					<div class="white-block">
						<div class="media blockHeights block_styles">
							<p> <span class="thisMonthOverview text-capital">JUNE</span> </p>
							<div class="row m_top5">
								<div class="col-sm-6">
									<img class="img_width" src="Assests/icons/Target_icon.png" alt="Achived_icon">
									<span class="pull-right color_Tlabel" id="subTargetPercentage"></span>
									<h5>TARGET</h5>
									<h4 class="m_top5"><b id="subTarget"></b></h4>
								</div>
								<div class="col-sm-6 border_right border_adjust_align">
									<img  class="img_width" src="Assests/icons/Achived_icon.png" alt="Achived_icon">
									<span class="pull-right color_Alabel" id="subAchievedPercentage"></span>
									<h5>ACHIEVED</h5>
									<h4 class="m_top5"><b id="subAchieved"></b></h4>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			
		</section>
		<section>
			<div id="levelWiseBlockId" class="m_top20"></div>
		</section>
	</div>
</main>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js" type="text/javascript"></script>
<script type="text/javascript" src="http://cdn.rawgit.com/niklasvh/html2canvas/0.5.0-alpha2/dist/html2canvas.min.js"></script>
<script type="text/javascript" src="http://cdn.rawgit.com/MrRio/jsPDF/master/dist/jspdf.min.js"></script>
<script type="text/javascript" src="Assests/js/locationHierarchy.js"></script>
<script src="Assests/prisDashBoard/prisDashBoard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>