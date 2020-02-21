<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Light Monitoring Installation</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<!-- for file uploader -->
<link href="Assests/Plugins/dragAndDropPhoto/css/jquery.filer.css" type="text/css" rel="stylesheet" />
<link href="Assests/Plugins/dragAndDropPhoto/css/themes/jquery.filer-dragdropbox-theme.css" type="text/css" rel="stylesheet" />  
<!-- for file uploader -->
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
	.menuStl {
		color:#fff;
		padding:5px;
		text-align:center;
		cursor:pointer;
	}
</style>
</head>
<body style="background-color:#fff;">
<header style="box-shadow:none;">
	<nav>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<h4 class="text-capital">Panchayat Raj, RD & RWS</h4>
					<p>Andhra Pradesh</p>
				</div>
				<div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
					<div class="menu-data-cls">
						<div class="arrow_box_top">
							<div class="row">
								<div class="col-sm-6 m_top5 gotoViewClkCls" attr_type="userDashboard">
									<div class="menuStl text-capital font_weight" style="background-color:#FFBA00;">User </br> Dashboard</div>
								</div>
								<div class="col-sm-6 m_top5 gotoViewClkCls" attr_type="installationEntry">
									<div class="menuStl text-capital font_weight" style="background-color:#56A3C5;">Installation </br> Entry</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6 m_top5 gotoViewClkCls" attr_type="stockDetailsEntry">
									<div class="menuStl text-capital font_weight" style="background-color:#87b5a6;">Stock </br> Details Entry</div>
								</div>
								<div class="col-sm-6 m_top5 gotoViewClkCls" attr_type="addPayments">
									<div class="menuStl text-capital font_weight" style="background-color:#77a1e5;">Add </br> Payments</div>
								</div>
							</div>
							<div class="row m_top5">
								<div class="col-sm-12">
									<a href="FieldLogout" style="color:#fff;background-color:#2C546C;display:block;" class="menuStl text-capital font_weight" >Log Out</a>
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
<div class="container-fluid">
	<div class="showHideCls" id="installationEntry" style="display:block;">
		<div class="row">
			<div class="col-sm-12">
				<h3 class="font_weight text-capital m_top20 text-center">${sessionScope.User.vendorName}</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="panel panel-default m_top10 border_css">
					<div class="panel-body panelCls">
						<h5 class="font_weight text-capital" style="color:#1878B1;">Installation Entry</h5>
						<div class="m_top10 m_bottom_0 border_top_yash">
							<div class="panel-body">
								<label class="radio-inline"><input type="radio" name="installEntryRadio" value="1" checked class="installationRadioCls defaultCheck">LED Installation</label>
								<label class="radio-inline"><input type="radio" name="installEntryRadio" value="2" class="installationRadioCls">CCMS Installation</label>
								<div class="groupBox m_top10">
									<div class="row">
										<div class="col-sm-3 m_top5">
											<label>Select District</label><span style="color:red;">*</span><span id="districtErrMsgId" style="color:red;"></span>
											<select class="form-control chosen-select" id="installDistrictId">
												<option value="0">Select District</option>
											</select>
										</div>
										<!--<div class="col-sm-3 m_top5">
											<label>Select Division</label>
											<select class="form-control chosen-select">
												<option value="0">Bhimavaram</option>
											</select>
										</div>-->
										<div class="col-sm-3 m_top5">
											<label>Select Mandal</label><span style="color:red;">*</span><span id="mandalLoading"></span><span id="mandalErrMsgId"style="color:red;"></span>
											<select class="form-control chosen-select" id="installMandalId">
												<option value="0">Select Mandal</option>
											</select>
										</div>
										<div class="col-sm-3 m_top5">
											<label>Select Panchayath</label><span style="color:red;">*</span><span id="villageLoading"></span><span id="villageErrMsgId"style="color:red;"></span>
											<select class="form-control chosen-select" id="installPanchayatId">
												<option value="0">Select Panchayat</option>
											</select>
										</div>
										<div class="col-sm-3">
											<label>Select Instalation Date</label>
											<div class="input-group">
												<input type="text" class="form-control dateForInstallEntryId">
												<span class="input-group-addon" id="start-date"><span class="glyphicon glyphicon-calendar"></span></span>
											</div>	
										</div>	
									</div>
								<!--	<div class="row m_top15">
									</div>		-->
								</div>
								<div id="installSuggestDivId"></div>
								
								<div class="groupBox m_top10">
									<div class="row">
										<div class="col-sm-3 m_top5">
											<label>Sub Vendor</label><span style="color:red;">*</span><span id="installSubVenErrMsgId"style="color:red;"></span>
											<select class="form-control chosen-select" id="installSubVendorId">
												<option value="0">Select Sub Vendor</option>
											</select>
										</div>
										<div class="col-sm-3 m_top5">
											<label>Fitted <span class="levelWiseNameChange"></span></label><span style="color:red;">*</span><span id="installFittedErrMsgId"style="color:red;"></span>
											<input type="text" class="form-control" id="installLedCountId">
										</div>
										<div class="col-sm-3 m_top5">
											<label>Man Power</label><span style="color:red;">*</span><span id="installManPowerErrMsgId"style="color:red;"></span>
											<input type="text" class="form-control" id="installLedTeamId">
										</div>
										<div class="col-sm-3 m_top25">
											<button type="button" class="btn btn-success border_css installSubmitCls">Submit</button>
											<img id="installationLoadingImgId" src="Assests/images/spinner.gif" style="width:30px;height:30px;display:none;"/>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 m_top10">
										<h4 class="text-success text-center" id="installEntrySuccessDivId"></h4>
										<h4 class="text-danger text-center" id="installEntryFailureDivId"></h4>
									</div>
								</div>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="showHideCls" id="stockDetailsEntry">
		<h4 class="font_weight text-capital m_top20 text-center" >${sessionScope.User.vendorName}</h4>
			<div class="row">
				<div class="col-sm-12">
					<div class="panel panel-default m_top10 border_css">
						<div class="panel-body panelCls">
							<h5 class="font_weight text-capital" style="color:#1878B1;">Stock Entry</h5>
							<div class="m_top10 m_bottom_0 border_top_yash">
								<div class="panel-body">
									<label class="radio-inline"><input type="radio" name="stockEntryRadio" value="1" checked class="stockRadioCls defaultStockCheck">LED </label>
									<label class="radio-inline"><input type="radio" name="stockEntryRadio" value="2" class="stockRadioCls">CCMS</label>
									<div class="groupBox m_top10">
										<div class="row">
											<div class="col-sm-3 m_top5">
												<label>Sub Vendor</label><span style="color:red;">*</span><span id="stockEntrySVErrMsgId"style="color:red;"></span>
												<select class="form-control chosen-select" id="stockEntrySubVendorId">
													<option value="0">Select Sub Vendor</option>
												</select>
											</div>
										</div>
									</div>
									<div id="stockEntryUpdatedDetailsDivId"></div>
									
									<div class="groupBox m_top10">
										<div class="row">
											<div class="col-sm-3 m_top5">
												<label>New Stock <span class="levelWiseStockId"></span></label><span style="color:red;">*</span><span id="stockEntryLightsErrMsgId"style="color:red;"></span>
												<input type="text" class="form-control" id="stockEntryCountId">
											</div>
											<div class="col-sm-3 m_top5">
												<label>Stock updated date</label>
												<div class="input-group">
													<input type="text" class="form-control dateForStockEntryId">
													<span class="input-group-addon" id="start-date"><span class="glyphicon glyphicon-calendar"></span></span>
												</div>
											</div>
											<div class="col-sm-3 m_top25">
												<button type="button" class="btn btn-success border_css stockEntrySubmitCls">Submit</button>
												<img id="stockLoadingImgId" src="Assests/images/spinner.gif" style="width:30px;height:30px;display:none;"/>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 m_top10">
											<h4 class="text-success text-center" id="stockEntrySuccessDivId"></h4>
											<h4 class="text-danger text-center" id="stockEntryFailureDivId"></h4>
										</div>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>
			</div>
	</div>
	<div class="showHideCls" id="addPayments">
		<h4 class="font_weight text-capital m_top20 text-center">${sessionScope.User.vendorName}</h4>
		<div class="row">
			<div class="col-sm-12">
				<div class="panel panel-default m_top10 border_css">
					<div class="panel-body panelCls">
						<h5 class="font_weight text-capital" style="color:#1878B1;">Add Payments</h5>
						<div class="m_top10 m_bottom_0 border_top_yash">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<ul class="nav nav-tabs liboderStl">
											<li class="active"><a data-toggle="tab" href="#addPayment">Add Payments</a></li>
											<li><a data-toggle="tab" href="#viewDetails" class="paymentDetailsCls">View Details</a></li>
										</ul>
										<div class="tab-content">
											<div id="addPayment" class="tab-pane fade in active">
												<form action="saveLEDPaymentDetails" id="adminProfileForm" name="adminProfileFormName" enctype="multipart/form-data" method="post">
													<div class="groupBox m_top10">
														<div class="row">
															<div class="col-sm-3 m_top5">
																<label>Bill No</label><span style="color:red;">*</span><span id="paymentsBillErrMsgId"style="color:red;"></span>
																<input type="text" class="form-control" id="paymentsBillNo" name="billNo">
															</div>
															<div class="col-sm-3 m_top5">
																<label>Payment Made Date</label>
																<div class="input-group">
																	<input type="text" class="form-control dateForPaymentsId" id="dateForPaymentId" name="paymentDate">
																	<span class="input-group-addon" id="start-date"><span class="glyphicon glyphicon-calendar"></span></span>
																</div>
															</div>
															<div class="col-sm-3 m_top5">
																<label>Total Amount Received</label><span style="color:red;">*</span><span id="paymentsAmountErrMsgId"style="color:red;"></span>
																<input type="text" placeholder="Enter In Rupees" class="form-control" id="paymentsRecievedAmountId" name="recievedAmount">
															</div>
															<div class="col-sm-3 m_top5">
																<label>Add Documents</label><span style="color:red;">*</span><span id="paymentsDocuErrMsgId"style="color:red;"></span>
																<!--<div class="form-control"><input type="file" id="paymentsDocumentId"></div>-->
																<input type="file" name="filesist" attr_name="filesist" id="projectDocUpload" multiple="multiple"/>
															</div>
														</div>
														<div class="row m_top20">
															<div class="col-sm-2 col-sm-offset-5 m_top25">
																<button type="button" class="btn btn-success pull-right paymentsSubmitBtnCls border_css">Submit</button>
																<img id="paymentLoadingImgId" src="Assests/images/spinner.gif" style="width:30px;height:30px;display:none;"/>
															</div>
														</div>
														<div class="row">
															<div class="col-sm-12 m_top10">
																<h4 class="text-success text-center" id="paymentSuccessDivId"></h4>
															</div>
														</div>
													</div>
												</form>
											</div>
											<div id="viewDetails" class="tab-pane fade">
												<div id="paymentsViewDetailsDivId"></div>
											</div>
											<div id="documentsDivId"></div>
										</div>
									</div>
								</div>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="showHideCls" id="userDashboard">
		<h4 class="font_weight text-capital m_top20 text-center">${sessionScope.User.vendorName}</h4>
		<div class="row">
			<div class="col-sm-12">				
				<div id="installationStockPaymentDetailsDivId"></div>
				<div id="runRateDivId"></div>				
				<div id="vendorWiseLocationDetailsDivId"></div>
				<div class="box_shadow_grievance pad_10 m_top10">
					<div class="row m_top10">
						<div class="col-sm-12">
							<h4 class="font_weight m_top10">LED Installation Trending<h4>
							<div id="LinstTrendLineChartId"  style="height:300px"></div>
						</div>
					</div>
				</div>
				<div id="LEDVendorDetailsDivId"></div>			
				<div id="LevelWiseLEDInstallationDetailsDivId"></div>	
			</div>
		</div>
	</div>
</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script> 
<!-- for file uploader  -->              
<script type="text/javascript" src="Assests/Plugins/dragAndDropPhoto/js/jquery.filer.min.js"></script>
<script type="text/javascript" src="Assests/Plugins/dragAndDropPhoto/js/multipleFileuploadNewDocuments.js"></script>                          
<!-- for file uploader -->           
<script type="text/javascript" src="Assests/login/loginMenu.js"></script>
<script src="Assests/lightMonitoringDashBoard/lightsMonitoringInstallationEntry.js" type="text/javascript"></script>
<script src="Assests/lightMonitoringDashBoard/lightsMonitoringUserDashboard.js" type="text/javascript"></script>
<script>
var globalVendorName = '${sessionScope.User.vendorName}';
var globalVendorId = '${sessionScope.User.vendorId}';
</script>
</body>
</html>