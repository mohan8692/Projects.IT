<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SWACHH DHARA</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js" type="text/javascript"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/sliderbar/bootstrap-slider.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
.slick-prev{left: -10px !important;}
.slick-next{right: -7px !important;}
.slider.slider-horizontal {
    width: 125px !important;
    left: -16px !important;
}
.slider-handle{display: none;}
.accordionmodal-toggle , .accordionmodal-toggle:active ,.accordionmodal-toggle:hover
{
	color:#666 !important
}
.accordionmodal-toggle:before {
    /* symbol for "opening" panels */
    font-family:'Glyphicons Halflings';
    content:"\2212";
    float: right;
    color: inherit;
	font-size:10px;
	margin-top:0px;
	font-weight:400 !important;
	margin-left:-4px;
	background:transparent;
	border:1px solid #663300;
	padding:1px 3px;
	border-radius:2px;
}
.accordionmodal-toggle.collapsed:before {
    /* symbol for "collapsed" panels */
    content:"\2b";
}
.panel-custommodal
{
	border-radius:0px !important;
	margin-top:0px !important;
	box-shadow:none !important;
	border-bottom:1px solid #333;
}
.panel-custommodal .panel-heading
{
	border-radius:0px;
	background:#f5f5f5;
	
}
.panel-custommodal .panel-body
{
	box-shadow:inset 0 2px 10px 0 rgba(0, 0, 0, 0.35);
	padding:15px;
}
header{
  box-shadow: none !important;
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
          <h4 class="text-capital">Panchayat Raj & RD & RWS</h4>
          <p class="white_color">SWACHH DHARA - AP</p>
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
				<div class="col-sm-3 col-xs-12 m_top10 pull-right">
					<div class="input-group inline-block pull-right">
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
						</span>
						<input class="form-control" id="dateRangePicker" type="text" style="background-color: #fff; width:190px;cursor:pointer;">
					</div>
				</div>				
			</div>
		</div>
	</section>
</header>

<!-- <section class="white-block">
  <div class="container-fluid">      
    <div class="row m_top10">
      <div class="col-sm-12">
			<div class="media">
				<div class="media-left">
					<img src="Assests/images/ohsr.PNG" />
				</div>
				<div class="media-body">
					<h4 class="m_top20 font_weight">OHSR<span class="pull-right f_16">ONE CYCLE - 6 MONTHS</span></h4>
				</div>
			</div>
	   </div>
	 </div>
  </div>
</section> -->

<section class="white-block">
	<div class="container-fluid">
		<div class="row m_top10">
			<div class="col-sm-12">
				<div class="media">
					<div class="media-left">
						<img src="Assests/images/ohsr.PNG" style="height: 50px !important;" />
					</div>
					<div class="media-body">
						<h4 class="m_top20 font_weight">SWACHH DHARA<span class="pull-right f_16">ONE CYCLE - 6 MONTHS</span></h4>
					</div>
				</div>
				<div class="row m_top10">
					<div class="col-sm-8">
						<div class="pad_10 box_shad5">
							<div class="row">
								<div class="col-sm-3 text-center">
									<h4 class="f_16 m_top50">TOTAL NUMBER OF OHSRs</h4>
									<h3 class="font_weight m_top10 spinnerCls" id="totNumOhrrsCntId"></h3>
								</div>
								<div class="col-sm-5 text-center ">
									<div class="br_left br_right">
										<div class="col-sm-12">
											<h4 class="f_16">COMPLETED OHSRs</h4>
											<h3 class="font_weight m_top10 spinnerCls" id="completedOhrsCnt"></h3>
											<h5 class="font_weight text-success m_top5 spinnerCls" id="completedOhrsCntPerc"></h5>
											<hr/>
										</div>
										<div class="row">										
											<div class="col-sm-6 text-center">
												<h4 class="f_16">IN-PROGRESS</h4>
												<h3 class="font_weight m_top10 spinnerCls" id="inProgressOhrsCnt"></h3>
												<h5 class="font_weight text-primary m_top5 spinnerCls" id="inProgressOhrsCntPerc"></h5>
											</div>
											<div class="col-sm-6 text-center">
												<div class="br_left">
													<h4 class="f_16">NOT STARTED</h4>
													<h3 class="font_weight m_top10 spinnerCls" id="notStartedCnt"></h3>
													<h5 class="font_weight text-danger m_top5 spinnerCls" id="notStartedCntPerc"></h5>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div id="ohsrDoNutChart" style="height:200px;"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="pad_10 box_shad5">
							<div id="ohsrColumnChart" style="height:200px;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row m_top10">
			<div class="col-sm-12">
				<div id="timeLinesWorkTypesDivId"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div id="stateLevelWorkTypesDivId"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div id="locationWiseWorkTypesDivId"></div>
			</div>
		</div>
	</div>	
</section>
<div class="modal fade" id="locationLevelPopupId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width: 95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h3 class="font_BebasNeue" id="locationLevelHeadingId"></h3>
			</div>
			<div class="modal-body">
				<div class="row m_top10">
					<div id="locationLevelFirstBlockDivId"></div>
				</div>
				<hr style="border-top-color:#333;"/>
				<div class="row">
					<div class="col-sm-12">
						<h4 class="text-capital font_weight" style="color:#252D30;">Work Progress stage wise Overview</h4>
						<div id="locationWiseDocumentsDivId"></div>
					</div>				
				</div>
				<hr style="border-top-color:#333;"/>
				<div class="p_lr20 m_top10">
					<div class="row">
						<div class="col-sm-12 m_top10">
							<div id="locationLevelSecondBlockDivId"></div>
						</div>
						<div class="col-sm-12 m_top10">
							<div id="locationLevelThirdBlockDivId"></div>	 
						</div>
					</div>
				</div>
				<div class="p_lr20 border_yash m_top10">
					<div class="row">
						<div class="col-sm-12 m_top10">
							<div id="locationWiseWorkStagesDivId"></div>
						</div>
						<div class="col-sm-12 m_top10">
							<div id="locationLevelFourthBlockDivId"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="timeLineLocationWiseModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="timeLineLocationWiseModalHeadingId"></h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<div id="timeLineLocationWiseModalDivId"></div>
					</div>
				</div>				
			</div>				
			<div class="modal-footer">
				<button type="button" class="btn btn-default " data-dismiss="modal">Close</button>
			</div>
		</div>
	</div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
<div class="modal fade" id="locationWiseStatusModalId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="locationWiseStatusModalHeadingId"></h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<div id="locationWiseStatusModalDivId"></div>
					</div>
				</div>				
			</div>				
			<div class="modal-footer">
				<button type="button" class="btn btn-default " data-dismiss="modal">Close</button>
			</div>
		</div>
	</div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
<div class="modal fade" id="imageDocumentsModalDivId" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="">OHSR MONITORING Images - <span class="font_weight" id="workStageHeadingId"></span></h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-9">						
						<div id="phasesListsDivId"></div>
						<div id="ohrsImagesDivId"></div>
					</div>
					<div class="col-sm-3">
						<div id="ohrsLocationDivId"></div>
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
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/js/locationDistrictHierarchy.js" type="text/javascript"></script>
<script src="Assests/Plugins/sliderbar/bootstrap-slider.js" type="text/javascript"></script>
<script src="Assests/OHSR/ohsrDashboard.js" type="text/javascript"></script>
<script src="Assests/Plugins/fancy box/jquery.fancybox.min.js"type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>
