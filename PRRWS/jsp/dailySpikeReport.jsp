<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DAILY SPIKE REPORT</title>
<link href="Assests/css/bootstrap.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/RangeSlider/jquery-ui-1.8.10.custom.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/RangeSlider/iThing.css" type="text/css" rel="stylesheet"/>
<link href="Assests/css/custom.less" type="text/less" rel="stylesheet"/>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
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
					<h4 class="text-capital">HM&FW DEPARTMENT</h4>
					<p>Government Of Andhra Pradesh</p>
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
				<div class="col-sm-6">
					 
				</div>      
				<div class="col-sm-3">
					<ul class="switch-btn list-inline" id="spikeReportTypeId">
						<li class="active" attr_type="All">All</li>
						<li attr_type="Rural">Rural</li>
						<li attr_type="Urban">Urban</li>
					</ul>					 
				</div>
				<div class="col-sm-3 pull-right"> 
					<div class="input-group dateRangePickerCls" >
						<span class="input-group-addon" >
							<i class="glyphicon glyphicon-calendar" ></i>
						</span>
						<input type="text" class="" style="width:200px;" id="reportrange">
					</div>
				</div>
			</div>
		</div>
	</section>
</header>
<main>
	<section>
		<div class="container-fluid">
			<div class="col-sm-12">
				<div class="row">
					<div class="col-sm-6">
						<div class="col-sm-12 white_block">
							<div class="col-sm-3">
								<img src="Assests/img/Dengue&maleria_Bg.png">
							</div>
							<div class="col-sm-9">
								<div class="col-sm-8">
									<h2>Dengue & Malaria Cases</h2>
								</div>
								<div class="col-sm-4">
									<h1 style="color:#FF0000" id="totalCasesId">0</h1>
								</div>
							</div>
							<div class="col-sm-12 counts_block">
								<p style="display:none;">Rural -<span>600</span></p>
								<p style="display:none;">Urban -<span>400</span></p>
								<p class="pull-right">Today -<span id="todayTotalCasesId">0</span></p>
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="col-sm-12 white_block">
							<div class="col-sm-6">
								<h2>Dengue</h2>
								<img src="Assests/img/Dengue_bg.png">
							</div>
							<div class="col-sm-6 text-center">
								<h1 style="color:#E8007C" id="dengueCountId">0</h1>
								<span id="denguePercentId">0</span><span>% Percent</span>
							</div>
							<div class="col-sm-12 counts_block">
								<p style="display:none;">Rural -<span>600</span></p>
								<p style="display:none;">Urban -<span>400</span></p>
								<p class="pull-right">Today -<span id="dengueTodayId">0</span></p>
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="col-sm-12 white_block">
							<div class="col-sm-6">
								<h2>Malaria</h2>
								<img src="Assests/img/maleria_Bg.png">
							</div>
							<div class="col-sm-6 text-center">
								<h1 style="color:#006BF7" id="malariaCountId">0</h1>
								<span id="malariaPercentId">0</span><span>% Percent</span>
							</div>
							<div class="col-sm-12 counts_block">
								<p style="display:none;">Rural -<span>600</span></p>
								<p style="display:none;">Urban -<span>400</span></p>
								<p class="pull-right">Today -<span id="malariaTodayId">0</span></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="m_top20">     
		<div class="container-fluid">
			<div class="col-sm-12">
				<div class="panel panel-default panel-black">
					<div class="panel-heading">
						<div class="row">
							<div class="col-sm-4">
								<h4 class="panel-title">RANK WISE ANALYSIS</h4>
							</div>   
							<div class="col-sm-8">
								<p><span class="pull-right">D - DISTRICT , C - CONSTITUENCY , M - MANDAL , T -  TOWN </span></p>
							</div>
						</div>
					</div>
					<div class="panel-body">
						<div class="row" id="showHideRangeId">
							<div class="col-sm-11">
								<div id="tourSlider"></div>
							</div>
							<div class="col-sm-1">
								<div><button type="button" class="btn btn-primary btn-sm" style="border-top-width: 1px; padding-top: 5px; margin-top: 20px;" id="getRangeId">submit</button></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12 m_top20">
								<div  id="rankDivId"></div>
							</div>
						</div>
					</div>
				</div>
				
				
			</div>
		</div>
	</section>  
	<section class="m_top20">
		<div class="container-fluid">
			<div class="col-sm-12">
				<div class="row">
					<div class="col-sm-12">
						<div class="white_block chartDateWise">
							<div class="col-sm-12">
								 <ul class="list-inline calendar_active_cls pull-right">
									<li attr_val="Day" class="active" id="defaultButtonId"><img src="Assests/icons/Today_icon.png"/>&nbsp;&nbsp;<b><span>Day</span></b></li>
								<li attr_val="Week"><img src="Assests/icons/Week_icon.png"/>&nbsp;&nbsp;<b><span> Week</span></b></li>
								<li attr_val="Month"><img src="Assests/icons/3612months_icon.png"/>&nbsp;&nbsp;<b><span>Month</span></b></li>
								</ul>
							</div>
							<div  id="chronologicalId"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="m_top20">
		<div class="container-fluid">
			<div class="col-sm-12">
				<div class="row">
					<div class="col-sm-12">
						<div id="levelBlock"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
<script type="text/javascript" src="Assests/js/jquery-1.11.3.js"></script>        
<script type="text/javascript" src="Assests/js/bootstrap.js"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.min.js" type="text/javascript"></script>   
<script src="Assests/Plugins/RangeSlider/jquery-ui.js" type="text/javascript"></script>   
<script src="Assests/Plugins/RangeSlider/jQDateRangeSlider-withRuler-min.js" type="text/javascript"></script>   
<script src="Assests/dailySpileReport/dailySpileReport.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script> 
</body>
</html>