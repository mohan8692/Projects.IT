<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>10 STAR RATING</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>	

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
					<h4 class="text-capital">Panchayat Raj,RD & RWS</h4>
					<p>10 STAR RATING</p>
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
<!--<section class="" style="padding: 10px;background-color: #E6E6E6;">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 pull-right">
				<label>Financial Year</label>
				<select class="form-control chosen-select" id="finicalYearId">
					<option value="0">Select Financial Year</option>
				</select>
			</div>
		</div>
	</div>
</section>-->
<div class="container-fluid" style="padding-left: 0px; padding-right: 0px;">
	<div class="white-block" style="padding:15px;">
		<h4 class="font_weight text-capital">State Level Overview</h4>
		<div class="pad_border m_top10">
			<h5 class="font_weight text-capital" id="totalPanchayatiesId"></h5>
			<div class="row">
				<div class="col-sm-7 m_top10">
					<div class="panel panel-default block_shadow">
					  <div class="panel-body">
						<div class="row">
							<div id="overViewStarRatingDetails" style="height:555px;"></div>
						</div>
					  </div>
					</div>
				</div>
				<div class="col-sm-5 m_top10">
					<div class="panel panel-default block_shadow">
					  <div class="panel-body">
						<div class="row">
							<div class="col-sm-12">
								<ul class="switch-btn-New pull-right" style="padding:0px !important;border:0px !important">
									<li class="active" attr_type="top">Top Districts</li>
									<li  attr_type="poor">Poor Districts</li>
								</ul>
							</div>
						</div>
						<div class="row">
							<div id="districtWiseOverViewStarRatingDetails" style="height:200px;"></div>
						</div>
					  </div>
					</div>
					<div class="panel panel-default block_shadow">
					  <div class="panel-body">
						 <h5 class="font_weight">Component Wise Overview</h5>
							<div id="donutFirstPart"></div>
					  </div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div class="panel-group" id="accordion_Dist_Wise" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading_Dist_Wise">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion_Dist_Wise" href="#collapse_Dist_Wise" aria-expanded="true" aria-controls="collapse_Dist_Wise">
							<h4 class="panel-title text-capital">District Wise Star Rating Comparison</h4>
							</a>
						</div>
						<div id="collapse_Dist_Wise" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_Dist_Wise">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<div id="districtWiseStarRatingDivId"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div class="panel-group" id="accordion_Comp" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading_Comp">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion_Comp" href="#collapse_Comp" aria-expanded="true" aria-controls="collapse_Comp">
							<h4 class="panel-title text-capital">Component Wise Rating</h4>
							</a>
						</div>
						<div id="collapse_Comp" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_Comp">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<div id="componentWiseRatingDivId"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div class="panel-group" id="accordion_dist_Comp" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading_Comp">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion_dist_Comp" href="#collapse_dist_Comp" aria-expanded="true" aria-controls="collapse_dist_Comp">
							<h4 class="panel-title text-capital">District Wise Components Achievement</h4>
							</a>
						</div>
						<div id="collapse_dist_Comp" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_dist_Comp">
							<div class="panel-body">
								<div class="row">								
									<!--<ul class="list-inline pull-right">
										<li><span class="statusCls" style="background-color:#00AF50;"></span> <span class="m_left_5">90% and Below 100%</span> </li>
										<li class="m_left10"><span class="statusCls" style="background-color:#ff6600;"></span> <span class="m_left_5">60% to Below 90%</span> </li>
										<li class="m_left10"><span class="statusCls" style="background-color:#FF0000;"></span> <span class="m_left_5"> less than 60%</span> </li>
									</ul>-->									
									<div class="col-sm-9">
										<ul class="list-inline switch-btn starWiseCompareCls" role="tabCummulative">
											<li class="active" attr_type="byDefault" style="font-size:12px !important;">Default</li>
											<li attr_type="componentWise" style="font-size:12px !important;">Component Wise Comparision</li>
											<li  attr_type="starWise" style="font-size:12px !important;">Star Wise Comparision</li>							
										</ul>
									</div>									
									<div id="districtWiseComponentWiseRatingDivId"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div id="levelWiseStarRatingsId"></div>
		</div>
	</div>
</div>
 <div class="modal fade" id="componentModalPopup" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width:95%;">
		<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h5 class="modal-title text-capital font_weight" id="modalHeadingId"></h5>
			  </div>
			  <div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<div id="componentWiseDetailsDivId"></div>
					</div>
				</div>
			  </div>
			   <div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		  </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
  <div class="modal fade" id="ratingWiseModalPopup" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width:95%;">
		<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h5 class="modal-title text-capital font_weight" id="ratingWiseModelHeadingId"></h5>
			  </div>
			  <div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<div id="ratingWiseModelDetailsDivId"></div>
					</div>
				</div>
			  </div>
			   <div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		  </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/tenStarRatingDashBoard/tenStarRatingDashBoard.js"></script>
</body>
</html>