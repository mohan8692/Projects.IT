<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chalivendram Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
.media-left, .media-right, .media-body {
    display: ruby;
    vertical-align: top;
}
</style>
</head>
<body style="background-color: #fff;">
<header style="box-shadow:none !important;">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<img src="Assests/images/Chalivendram-Logo1.png" style="height: 60px; position: relative; top: -5px; right: 50px; width: 95px;"></img>
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
<section class="" style="padding: 10px;background-color: #DFDFE0;">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-2 m_top5">
					<!--<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" id="selectedName1" style="font-size:13px;cursor:pointer;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_distId="" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>-->
				</div>
				<div class="col-sm-3  pull-right">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePicker" style="width: 200px;"/>
					</div>
				</div>
			</div>
		</div>
	</section>
	
<section class="navbar-section" style="padding: 10px;">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<h4 class="font_weight text-capital">Chalivendram - Overview</h4>
			</div>
		</div>
		<div id="chalivendramOverViewDivId"></div>
		<div class="row">
			<div class="col-sm-12 m_top15">
				<h4 class="font_weight text-capital">Images Captured</h4>
			</div>
		</div>
		<div class="border_pad m_top15">
			<div class="row">
				<div class="col-sm-12">
					<div id="chalivendramOverImagesId"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top15">
				<h4 class="font_weight text-capital">Time Line Series</h4>
			</div>
		</div>
		<div class="border_pad m_top15">
			<div class="row">
				<div class="col-sm-12">
					<div id="chalivendramTimeLineSeriesDivId" style="height:250px;"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div id="locationsData"></div>
			</div>
		</div>
	</div>
</section>	

<!--modal start-->
<div class="modal" id="chalivendramsModalId" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document" style="width:65%;">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Chalivendrams Info
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		</h4>
      </div>
      <div class="modal-body" >
		<div id="chalivendramsModalBodyDivId"></div>
	  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="modal" id="chalivendramsLowLevelModalId" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document" style="width:70%;">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span id="headindChalivendramId"></span>
			<button type="button" class="close closeModalSecond" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		</h4>
      </div>
      <div class="modal-body" >
		<div id="chalivendramsModalLowLevelBodyDivId"></div>
	  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary closeModalSecond" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!--modal end-->

<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
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
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script src="Assests/js/activityDashboard.js" type="text/javascript"></script>
</body>
</html>