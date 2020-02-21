<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NEWS ARTICLES</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
.panel-black .panel-heading {
    background-color: #333;
    border-radius: 0;
    color: #fff;
}
.tooltip-inner {
    max-width: 170px;
    /* If max-width does not work, try using width instead */
    width: 170px; 
}
</style>
</head>
<body>
<header style="box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.3);">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital"><span id="newsArticlesId"></span>&nbsp;News Articles</h4>
					<!-- <p>News Articles</p> -->
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
				<div class="col-sm-3 pull-right">
					<div class="input-group pull-right">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePickerAUM" style="width: 200px;"/>
					</div>
				</div>
			</div>
		</div>
	</section>
</header>
<main style="margin-top:5px;background-color:#fff;padding-bottom:20px;">
<div class="container-fluid">
	<div class="row mainDepartmentPDf">
		<div class="col-sm-1 pull-right m_top10">
				<img class="dataLoadingsPdfImgcls0" src="Assests/images/loading.gif" style="width: 25px; height: 20px;display:none;">
			</div>
		<div class="col-sm-3 pull-right">
				<ul class="list-inline m_top10 pull-right">
					<li>
						<div class="btn-group " style="">
							<button type="button" class="btn btn-default btn-sm"  style="border-top-right-radius: 1px; border-top-left-radius: 4px ! important; border-bottom-left-radius: 4px; border-bottom-right-radius: 1px; background-color: rgb(92, 184, 92); color: rgb(255, 255, 255);padding:5px;"> <span class="fa fa-download"aria-hidden="true" ></span></button>
							<button attr_pdf_type="positive" attr_pdf_dept_id="0" type="button" class="btn btn-default btn-sm pdfGeneratePrintEMCls" style="background-color: rgb(92, 184, 92); color: rgb(255, 255, 255);padding:5px;">Download&nbsp;+ve&nbsp;Pdf</button>
						</div>
					</li>
					<li>
						<div class="btn-group " style="">
							<button type="button" class="btn btn-default btn-sm"  style="border-top-right-radius: 1px; border-top-left-radius: 4px ! important; border-bottom-left-radius: 4px; border-bottom-right-radius: 1px; background-color: #d9534f; color: rgb(255, 255, 255);padding:5px;"> <span class="fa fa-download"aria-hidden="true" ></span>
							</button> <button attr_pdf_type="negative" attr_pdf_dept_id="0" type="button" class="btn btn-default btn-sm pdfGeneratePrintEMCls" style="background-color: #d9534f; color: rgb(255, 255, 255);padding:5px;">Download&nbsp;-ve&nbsp;Pdf</button>
						</div>
					</li>
				</ul>
		</div>
		<div class="col-sm-4 pull-right m_top10">
			<ul class="list-inline pull-right switch-btn-News">
				<li class="active" attr_type="print">Print Media</li>
				<li class="" attr_type="electronic">Electronic Media</li>
			</ul>
		</div>
	</div>
	<div class="row m_top20" id="newsDiv" style="display:none;">
		<div class="col-sm-6">
			<div class="white_block">
				<h4 class="font_weight">Print Media</h4>
				<div id="overAllPrintMediaDivId"></div>
				<h4 class="font_weight m_top10">District wise Total Overview</h4>
				<div id="overAllDistrictWiseDivId" class="m_top10" style="height:250px;"></div>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="white_block">
				<h4 class="font_weight">Electronic Media</h4>
				<div id="overAllElectronicMediaDivId"></div>
				<h4 class="font_weight m_top10">District wise Total Overview</h4>
				<div id="overAllDistrictEMWiseDivId" class="m_top30" style="height:250px;"></div>
			</div>
		</div>
	</div>
	<div class="row m_top20">
		<div class="col-sm-12">
			<div class="white_block">
				<h4 class="font_weight">Department Wise Details</h4>
				<div class="row">
					<ul class="list-inline pull-right switch-btn">
						<li class="active removecss addcss" attr_type="print">Print Media</li>
						<li class="removecss" attr_type="electronic">Electronic Media</li>
					</ul>
				</div>
				<div class="row">
					<div id="departmentWiseDetailsDivId"></div>
				</div>
			</div>
		</div>
	</div>
	
</div>
</main>
</body>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/js/newsArticles.js"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">
var globalDeptId = "${param.deptId}";
var globalfavName = "${param.name}";
</script>
</body>
</html>