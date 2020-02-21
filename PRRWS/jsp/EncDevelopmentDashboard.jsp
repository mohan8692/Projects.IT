<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ENC Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/getorgchart/getorgchart.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
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
					<h4 class="text-capital">Panchayat Raj & RD & RWS</h4>
					<p>PRED- AP</p>
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
<main>
	<section>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<div class="white_block">
						<h4>ANDHRA PRADESH STATE OVERVIEW</h4>
						<div class="m_top10" style="border:1px solid lightgrey;margin-bottom:20px;padding:10px">
							<div class="row">
								<div class="col-sm-4 m_top10">
									<div class="row">
										<div class="chart2" id="roadsChartinfo" style="height:250px;"></div>
									</div>
									
								</div>
								<div class="col-sm-8 m_top10">
									<div class="row">
										<div class="col-sm-4 m_top10">
											<div class="enc_block">
												<div class="media">
													<div class="media-left">
														<img src="Assests/icons/BT_CC_icon.png" alt="BTCC"/>
													</div>
													<div class="media-body">
														<p>BT +CC</p>
														<h3 class="m_top10"><b id="btccBlockId"></b></h3>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 m_top10">
											<div class="enc_block">
												<div class="media">
													<div class="media-left">
														<img src="Assests/icons/wbm_icom.png" alt="BTCC"/>
													</div>
													<div class="media-body">
														<p>WBM <span style="font-size:12px">(Water bond macadem)<span></p>
														<h3 class="m_top10"><b id="wbmBlockId"></b></h3>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 m_top10">
											<div class="enc_block">
												<div class="media">
													<div class="media-left">
														<img src="Assests/icons/Gravel_icon.png" alt="BTCC"/>
													</div>
													<div class="media-body">
														<p>Gravel</p>
														<h3 class="m_top10"><b id="grveBlockId"></b></h3>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 m_top10">
											<div class="enc_block">
												<div class="media">
													<div class="media-left">
														<img src="Assests/icons/Earthen_Roads.png" alt="BTCC"/>
													</div>
													<div class="media-body">
														<p>Earthen Roads</p>
														<h3 class="m_top10"><b id="earthenblockId"></b></h3>
													</div>
												</div>
											</div>
										</div>
										
									</div>
								</div>
							</div>
						</div>
						
					   <div class="m_top10" style=" ">
							<div class="row">
								<div id="roadsBlockId"></div>
							</div>
					   </div>
						<div class="row m_top20">
							<div class="col-sm-12">
								<div id="levelWiseEncId"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests\encDashBoard\EncDevlopmentDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>