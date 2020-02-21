<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Assets Verification Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet"
	type="text/less">
<link href="Assests/css/custom-assets.less" rel="stylesheet" type="text/less" />
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet" />
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet" />
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet" />
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet" />
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet" />
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet" />
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet" />
<link href="Assests/Plugins/fancy box/jquery.fancybox.css" type="text/less" rel="stylesheet" />
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet" />
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<script src="Assests/Plugins/Less/less.js"></script>
</head>
<body>
</body>
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj,RD & News</h4>
					<p>Assets  Verification</p>
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

	<section class="navbar-section" style="padding: 5px;background-color: #DFDFE0;">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-6 m_top5">
					<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" id="selectedName1" style="font-size:13px;cursor:pointer;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_distId="" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>
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
</header>	
<section class="">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<h4 class="font_weight m_top10" id="levelWiseOverViewId">State Level OverView</h4>
			</div>
		</div>
		<div id="completeOverViewDivId"></div>
		<div class="row">
			<div class="col-sm-12">
				<div id="imagesSliderDivId"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div id="assestsTypeComponentsDivId"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div id="locationWiseAssestTypeDivId"></div>
			</div>
		</div>
	</div>
</section>
<div class="modal fade" id="locationWiseComponentModalId" role="dialog">
	<div class="modal-dialog modal-lg" style="width:90%; margin:auto;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title text-capital font_weight f_14" id="headingId"></h4>
			</div>
			<div class="modal-body" >	
				<div class="row">
					<div class="col-sm-12">
						<div id="locationWiseComponentBlockData"></div>
						<div id="onclickimagesSliderDivId"></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
			  <button type="button" class="btn btn-default Close_st" data-dismiss="modal">CLOSE</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="componentModalId" role="dialog">
	<div class="modal-dialog modal-lg" style="width:90%; margin:auto;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title text-capital font_weight f_14" id="headingComponentId"></h4>
			</div>
			<div class="modal-body" >	
				<div class="row">
					<div class="col-sm-12">
						<div id="componentBlockData"></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
			  <button type="button" class="btn btn-default Close_st" data-dismiss="modal">CLOSE</button>
			</div>
		</div>
	</div>
</div>
<div class="modal" id="schemeWiseModalId" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document" style="width:80%;">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-capital"><span id="schemeHeadingId" style="font-size:14px;font-weight:bold;"></span>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		</h4>
      </div>
      <div class="modal-body" >
		<div id="schemeWiseModalBodyDivId"></div>
	  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="modal" id="assestLowLevelModalId" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document" style="width:80%;">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-capital"><span id="headindassestId" style="font-size:14px;font-weight:bold;"></span>
			<button type="button" class="close closeModalSecond" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		</h4>
      </div>
      <div class="modal-body" >
		<div id="assestModalLowLevelBodyDivId"></div>
	  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary closeModalSecond" data-dismiss="modal">Close</button>
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
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/SimplePagination/simplePagination3.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/fancy box/jquery.fancybox.min.js"type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.min.js"type="text/javascript"></script>
<script src="Assests/ruralWaterSupply/assetVerificationDashboard.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/Plugins/Scroller/bootstrap-multiselect.js"></script>
<script type="text/javascript" src="Assests/ruralWaterSupply/locationHierarchyAssets.js"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>

</script>
<script>
  var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()
</script>
</body>
</html>