<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Grama Darshini Dashboard</title>
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
	.ulTabStyleCls li{
		background-color: #FFFFFF !important;
		border: 1px solid #D3D3D3 !important;
		font-weight: bold !important;
		padding: 10px 15px;
		text-align: center;
		cursor: pointer;
	}
	.ulTabStyleCls li.active .bordBottom{
		border-bottom: 5px solid #ABCF38!important;
		padding-bottom: 5px !important;
	}
	.ulTabStyleCls li.active{
		background-color: #F4F4F4 !important;
		color: #333 !important;
	}
	.ulTabStyleCls1 li{
		background-color: #FFFFFF !important;
		border: 1px solid #E2E2E2 !important;
	}
	.installationsTabCls li{
		border: 1px solid #D0D0D0;
		padding: 10px;
	}
	.blocksCls li {
		margin-top:5px;
		text-align:center !important;
	}
	.trendingGraphCls li{
		padding: 5px 20px 5px 20px !important;
		border-radius: 15px;
		border: 1px solid #E2E2E2;
		cusror: pointer;
	}
	.trendingGraphCls li.active{
		background-color: #A9CB38 !important;
	}
	.m_left20{
		margin-left: 20px;
	}
	.mar_bot_15{
		margin-bottom: 15px;
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
					<h5 class="font_weight text-capital white_color m_top10">Panchayat Raj,RD & News </h5>
					<img src="Assests/images/GramaDarshini.png" alt="" style="height: 25px;"/>
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
				<div class="col-sm-2 m_top10">
				<h5 class="arrowIconChanged"><i class="fa fa-plus-circle" style="font-size:15px;color:#ffba00;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h5>
				<div class="multi-level-selection-menu arrow_box_top"></div>						
				</div>
				<!--<div class="col-sm-3 pull-right">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePicker"/ style="width:200px;">
					</div>
				</div>-->
			</div>
		</div>
	</div>
</section>
<main>
	<div class="container-fluid">
		<div class="groupBox border_yash">
			<h5 class="font_weight text-capital">Overview</h5>
			<div id="overviewId"></div>
			<div class="white-block border_yash pad_10 m_top10">
				<div id="tableId"></div>
			</div>
		</div>
		<!--<div class="groupBox border_yash pad_10 m_top10">
			<h5 class="font_weight text-capital">Trending Visits</h5>
			<div class="white-block border_yash pad_10 m_top10">
				<div class="row">
					<div class="col-sm-4 col-sm-offset-2">
						<ul class="list-inline trendingGraphCls">
							<li class="active" data_type="weekly">Weekly</li>
							<li data_type="monthly" class="m_left10">Monthly</li>
						</ul>
					</div>
					<div class="col-sm-2">
						<select class="chosen-select form-control" id="">
							<option value="officer-level(3)" selected>Officer-Level(3)</option>					
							<option value="officer-level(1)">Officer-Level(1)</option>					
							<option value="officer-level(2)">Officer-Level(2)</option>					
						</select>
					</div>
					<div class="col-sm-2">
						<select class="chosen-select form-control" id="">
							<option value="2018-2019" selected>2018-2019</option>					
							<option value="2016-2017">2016-2017</option>					
							<option value="2017-2018">2017-2018</option>					
						</select>
					</div>
					<div class="col-sm-2">
						<select class="chosen-select form-control" id="" style="height">
							<option value="Aug" selected>Aug</option>					
							<option value="sep">Sep</option>					
						</select>
					</div>
				</div>
				<div id="trendingVisitsGraphId" style="height: 300px;"></div>
			</div>
		</div>-->
		<div class="groupBox border_yash m_top20">
			<div id="ulLiTabsCls"></div>
			<div id="blockOneId"></div>
			<div id="blockTwoId"></div>
			<div id="blockThreeId"></div>
		</div>
		<!--<div class="white-block m_top20 border_yash pad_10">
			<h5 class="font_weight text-capital">Nodal Officers Wise</h5>
			<div class="white-block border_yash pad_5 border_radius_5 m_top10">
				<ul class="list-inline">
					<li>
						<label style="margin-left: 20px;">Officer Level</label>
					</li>
					<li>
						<label class="checkbox-inline m_left20"><input class="stateCls" type="checkbox" value="State" checked>State</label>
					</li>
					<li>
						<label class="checkbox-inline m_left20"><input class="unselectedCls" type="checkbox" value="District">District</label>
					</li>
					<li>
						<label class="checkbox-inline m_left20"><input class="unselectedCls" type="checkbox" value="Constituency">Constituency</label>
					</li>
					<li>
						<label class="checkbox-inline m_left20"><input class="unselectedCls" type="checkbox" value="Mandal">Mandal</label>
					</li>
					<li>
						<label class="checkbox-inline m_left20"><input class="unselectedCls" type="checkbox" value="Municipality">Municipality</label>
					</li>
					<li>
						<label class="checkbox-inline m_left20"><input class="unselectedCls" type="checkbox" value="Village">Village</label>
					</li>
					<li>
						<label class="checkbox-inline m_left20"><input class="unselectedCls" type="checkbox" value="Panchayat">Panchayat</label>
					</li>
					<li>
						<label class="checkbox-inline" style="margin-left: 20px;"><input class="unselectedCls" type="checkbox" value="District">District</label>
					</li>
				</ul>
			</div>
			<div id="nodalOfcTable"></div>
		</div>-->
		<div id="levelWiseDivId"></div>
	</div>
</main>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/GramaDarshiniDashboard/gramaDarshiniDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script src="https://use.fontawesome.com/e94c241642.js"></script>
</body>
</html>