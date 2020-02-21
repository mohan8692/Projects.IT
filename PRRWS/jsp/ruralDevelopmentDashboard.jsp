<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rural Development Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<script type="text/javascript">
var searchParams = new URLSearchParams(window.location.search);
	searchParams = searchParams.get("component");
</script>
</head>
<header>
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj, RD & RWS</h4>
					<p>Rural Development - AP</p>
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
				<div class="col-sm-2 border_right m_top5">
					<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" style="font-size:13px;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>
				</div>
				<div class="col-sm-3 border_right">
					<div class="row">
						<div class="col-sm-4 m_top5">
							<label>FROM DATE</label>
						</div>
						<div class="col-sm-8">
							<div class="input-group inline-block">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
								</span>
								<input type="text" class="form-control" id="dateRangePickerMGNF"/>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-3 border_right">
					<div class="row">
						<div class="col-sm-4 m_top5">
							<label>TO DATE</label>
						</div>
						<div class="col-sm-8">
							<div class="input-group inline-block">
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
								</span>
								<input type="text" class="form-control" id="dateRangePickerMGNT"/>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4">
					<ul class="switch-btn pull-right" role="tabCummulative">
						<li class="active" attr_type="thisFin" style="font-size:12px !important;">This Fin. Year</li>
						<li  attr_type="prevFin" style="font-size:12px !important;">Prev Fin. Year</li>
					</ul>
				</div>
				<!--<div class="col-sm-6 m_top5 pad_right0">
					<ul class="list-inline pull-left">
						<li><span class="color-label color-label-gold"></span> 100% and above</li>
						<li><span class="color-label color-label-success"></span> 90% and above</li>
						<li><span class="color-label color-label-default"></span> 60% to Below 90%</li>
						<li><span class="color-label color-label-danger"></span> less than 60% &nbsp;&nbsp;&nbsp;</li>
					</ul>
				</div>-->
			</div>
		</div>
	</section>
</header>
<main>
<div class="col-sm-6 m_top5 pad_right0 pull-right">
	<ul class="list-inline pull-left">
		<li><span class="color-label color-label-gold"></span> 100% and above</li>
		<li><span class="color-label color-label-success"></span> 90% and above</li>
		<li><span class="color-label color-label-default"></span> 60% to Below 90%</li>
		<li><span class="color-label color-label-danger"></span> less than 60% &nbsp;&nbsp;&nbsp;</li>
	</ul>
</div>
	<section>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<div id="overViewAbstract"></div>
				</div>
				<div class="col-sm-12 m_top20">
					<div id="projectOverviewBlock"></div>
				</div>
				<div class="col-sm-12 m_top20">
					<div id="projectData"></div>
				</div>
				<div class="col-sm-12 m_top20" style="display:none;">
					<div id="projectDatatest"></div>
				</div>
			</div>
		</div>
	</section>
</main>
<div class="modal fade" tabindex="-1" id="installedDetailsModalId" role="dialog" style="z-index:99999;">
		<div class="modal-dialog" style="width:90%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close closeShowPdfCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="installedDetailsHeadingId">Installed Details</h4>  
				</div>
				<div class="modal-body">
					<div id="installedDetailsModalBodyId"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default closeShowPdfCls" data-dismiss="modal">Close</button>
				</div>
			</div><!--  /.modal-content -->  
		</div><!--  /.modal-dialog -->
	</div>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
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
<script src="Assests/MGNREGS/ruralDevelopment.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>