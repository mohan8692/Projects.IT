
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LED Report</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<link href="Assests/css/print.css" rel="stylesheet" type="text/css"/>
<style type="text/css">
	.thirdWireCls{
		cursor: pointer;
		text-decoration: underline;
	}
</style>
</head>
<body id="printableArea">
<header class="dispalyNone">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="f_16 font_weight text-capital white_color">Panchayat Raj,RD&News </h4>
					<p>LED Report</p>
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
<section id="printcontent">
<div class="container">
	<div class="row m_top10">
		<div class="col-sm-1 pull-right">
			<button class="btn btn-md btn-info printViewCls pull-right dispalyNone" attr_divId="printableArea">Print</button>
		</div>
	</div>
	<div class="white-block pad_20 m_top10 clearfix" style="box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);">
		<h4 class="font_weight text-capital print-text"><strong>Status Report on LED Project - EESL</strong></h4>
		<div class="pad_20 m_top10 border_yash">				
			<div class="row">
				<div class="col-sm-12">
					<h4 class="font_weight text-capital f_16 text-info">Lights</h4>
				</div>
				<div class="col-sm-6 col-xs-6 m_top5">
					<div class="bg_yash_color_10">							
						<h4 class="font_weight f_16">Target</h4>
						<h3 class="font_weight m_top5" id="lightsTargetId"></h3>
					</div>
				</div>
				<div class="col-sm-6 col-xs-6 m_top5">
					<div class="bg_yash_color_10">
						<h4 class="font_weight f_16">Stock Available</h4>
						<h3 class="font_weight m_top5" id="lightsStockAvailId"></h3>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div id="lightsReportDetailsDivId"></div>
				</div>					
			</div>
			<div class="row m_top20">
				<div class="col-sm-12">
					<h5 class="font_weight text-capital">Average Run  Rate/Day</h5>
				</div>
				<div class="col-sm-12">
					<div class="m_top5 " style="border-width: 2px;">
						<div class="row">
							<div class="col-sm-4 col-xs-4 m_top5">
								<div class="pad_light_yash_bg">
									<h5 class="font_weight f_16">Required Run Rate </h5>
									<h4 class="font_weight m_top5" id="reqRunRateId"></h4>
								</div>
							</div>
							<div class="col-sm-4 col-xs-4 m_top5">
								<div class="pad_light_yash_bg">
									<h5 class="font_weight">Last 30 Days</h5>
									<h4 class="font_weight m_top5" id="last30daysRunrateId"></h4>
								</div>
							</div>
							<div class="col-sm-4 col-xs-4 m_top5">
								<div class="pad_light_yash_bg">
									<h5 class="font_weight">Achieved</h5>
									<h4 class="font_weight m_top5" id="achievedRunrateId"></h4>
								</div>
							</div>							
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pad_20 m_top10 border_yash"">
			<div class="row">
				<div class="col-sm-12">
					<h4 class="font_weight text-capital text-info print-heading">ccms</h4>
				</div>
				<div class="col-sm-6 col-xs-6 m_top5">
					<div class="bg_yash_color_10">							
						<h4 class="font_weight f_16">Target</h4>
						<h3 class="font_weight m_top5" id="ccmsTargetId"></h3>
					</div>
				</div>
				<div class="col-sm-6 col-xs-6 m_top5">
					<div class="bg_yash_color_10">					
						<h4 class="font_weight f_16">Stock Available</h4>
						<h3 class="font_weight m_top5" id="ccmsStockAvailId"></h3>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div id="CCMSReportDetailsDivId"></div>
				</div>					
			</div>
			<div class="row">
				<div class="col-sm-12">
					<h5 class="font_weight f_16 m_top10">Switching Points</h5>
				</div>
				<div class="col-sm-12">
					<div id="totalSwitchingPointsDivId"></div>					
				</div>
			</div>			
		</div>
		<div class="pad_20 m_top10 border_yash pagebreak">
			<div class="row">
				<div class="col-sm-12">
					<h4 class="font_weight text-capital text-info">3rd Wire Installation GPs</h4>
				</div>
				<div class="col-sm-12">
					<div id="thirdWireInstallationGpsDivId"></div>					
				</div>
			</div>
		</div>		
		<div class="pad_20 m_top10 border_yash">
			<div class="row">
				<div class="col-sm-12">
					<h4 class="font_weight text-capital text-info">Payments</h4>
				</div>
				<div class="col-sm-12">	
					<div id="paymentReportDetailsDivId"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</section>
<!— modal —>
<div class="modal fade" tabindex="-1" id="LEDReportModalId" role="dialog" style="z-index:99999;">
  <div class="modal-dialog" style="width:90%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title text-capital f_16 font_weight" id="LEDReportModalHeadingId"></h4>  
      </div>
      <div class="modal-body">
        <div id="LEDReportModalDetailsDivId"></div>        
      </div>      
    </div>
  </div>
</div>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/lightMonitoringDashBoard/ledReport.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
</body>

</html>