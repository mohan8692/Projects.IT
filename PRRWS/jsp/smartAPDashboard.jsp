
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Smart AP Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/pdfexpand_prrws/source/jquery.fancybox-1.3.4.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/pdfexpand_prrws/source/helpers/jquery.fancybox-buttons.css" type="text/css" rel="stylesheet"/>
<!--<link href="Assests/Plugins/pdfexpand_prrws/source/helpers/jquery.fancybox-thumbs.css" type="text/css" rel="stylesheet"/>-->
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">

<style>
section{
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
	background-color: #ffffff;
	border: solid 1px #dcdcdc;	
	padding-top: 10px;
	padding-bottom: 10px;	
}
body {
		background-color:#ffffff;
}
h1,h2,h3,h4,h5,h6{
	font-weight: bold;
}	
	
</style>
</head>
<body class="smartApCss">
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h5 class="font_weight text-capital white_color">Panchayat Raj,RD&News </h5>
					<p>Smart AP<span><img src="Assests/images/smartAP.png" style="background: #333333;"></span></p>
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
	<div class="block displayNone">	
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-9">
					<h5 class="m_top10 font_weight">Note: Amount In Lakhs</h5>
				 </div>
				<div class="col-sm-3 pull-right">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePicker"/ style="width:200px;">
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="container-fluid">
	<div class="row">
	<div class=" " style="background-color: #e6e6e6;">		
	<div class="pad_10">		
		<div id="overviewId"></div>
	</div>
	<div class="p_lr20">
	<div class="white-block pad_10">
		<h5 id="componentWiseTabId">DONATIONS COMPONENT ANALYSIS</h5>
		<!--<div id="componentAnalysisId"></div>-->
		<div id="firstBlockDivId"></div>
		<div id="secondBlockDivId"></div>
		<div id="thirdBlockDivId"></div>
		<div id="partnerShipsGraphDivId" style="display: none;">
			<div class="white-block border_yash pad_10 m_top20">
				<h5 id="">Monthly Trending</h5>
				<div class="white-block border_yash pad_15 m_top10">
					<div class="row">
						<div class="col-sm-11">
							<ul class="list-inline activeUlCls monthlyTrndingulStyleCls monthlytrendClcCls">
								<li class="active" attr_type="adoption">Adoption GPs/Wards</li>
								<li attr_type="partnership">Partnership Activities</li>
							</ul>
						</div>
						<div class="col-sm-1">
							<select class="chosen-select" id="partnershipYearId">
								<option value="2017" selected>2017</option>					
								<option value="2018">2018</option>					
							</select>
						</div>
					</div>
					<div class="m_top10">
						<div id="partnershipLineChartId" style="height:200px;"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="NPRGraphDivId" style="display: none;">
			<div class="white-block border_yash pad_10 m_top20">
				<div class="row">
					<div class="col-sm-11">
						<h5>Monthly Trending-Completed Tentatives</h5>
					</div>
					<div class="col-sm-1">
						<select class="chosen-select" id="NRPYearId">
							<option value="2017" selected>2017</option>					
							<option value="2018">2018</option>					
						</select>
					</div>
				</div>
				<div id="NPRLineChartId" style="height:200px;"></div>
			</div>
		</div>		
	</div>
	</div>
	<div class="p_lr20">
	<div id="levelWiseDivId"></div>
	</div>
	<!--<div id="locationDistrictWiseId"></div> -->
	<div id="locationComponentWiseId"></div>
</div>
</div>
</div>

<!-- Smart AP Popup -->
<div class="modal fade" id="inProgProjId" role="dialog">
	<div class="modal-dialog modal-lg" style="margin:auto; width: 95%;">
		<div class="modal-content" style="border-bottom: 0px !important;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" style="color: #EA1D25; opacity: 1;">&times;</button>
				<h5 class="modal-title" id="inProgProjTitle"></h5>
			</div>
			<div class="modal-body">
				<div id="inProgProjDetailsDivId"></div>
			</div>
		</div>
	</div>
</div>

<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/js/smartAPDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script src="https://use.fontawesome.com/e94c241642.js"></script>
</body>
</html>