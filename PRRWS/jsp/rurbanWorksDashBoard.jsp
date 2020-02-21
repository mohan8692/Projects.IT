<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rurban Works DashBoard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
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
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<style>
body{
	background-color:#fff;
}
.daterangepicker{
	z-index:99999 !important;
}
.error_Mgscls{
 	font-size: 82% !important;
	color: red;
	margin-top: 3px;
	margin-bottom: 0px;
	font-weight: 500 !important;
}
.dateRangePickerCls .form-control{
	height: 37px;
}
</style>	
</head>
<body>
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
							<ul class="list-inline rurbanworksCls">
								<li attr_type="work">
									Enter New Work
								</li>
								<li attr_type="dashBoard">
									DashBoard
								</li>
								<li>
									<a href="FieldLogout">Log Out</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
	<section class="navbar-section" style="background-color: #E6E6E6;">
		<div class="container-fluid">
			<div class="row">
			<div class="col-sm-9">
					<h4 class="font_weight" id="clusterNameID"></h4>
				</div>
			</div>
		</div>
	</section>
</header>
<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">
	<div class="white-block" style="padding:15px;">
		<div class="worksCls">			
		<div class="container m_top20 pad_10">			
			<div class="row">
				<div class="col-sm-12">
					<h4 class="font_weight text-capital">Enter New Work Details</h4>
				</div>
			</div>
			<form action="saveRurbanWork" id="workdataID" enctype="multipart/form-data" method="post">
				<div class="row">
					 <div class="col-sm-3 m_top20">
					<label>Enter Work Name</label>
					<input type="text" class="form-control" name= "workName" id="workNameId" placeholder="Enter Work Name">
					<span id="errWorkNameId"  class="error_Mgscls" style="display:none;"></span>
				 </div>	
				</div>
				<div class="row">
					<div class="col-sm-2 m_top10 mandalCls">
						<label>Mandal</label>
						<select class="form-control chosen-select" id="mandalId" name="mandal">
							<option value="0">Select Mandal</option>
						</select>	
						<span id="errMandalId" class="error_Mgscls" style="display:none;"></span>
					</div>
					<div class="col-sm-2 m_top10">
						<label>Panchayat</label>
						<select class="form-control chosen-select" id="panchayatId" name="panchayatId">
							<option value="0">Select Panchayat</option>
						</select>	
						<span id="errPanchayatId" class="error_Mgscls" style="display:none;"></span>
					</div>
					<div class="col-sm-2 m_top10">
						<label>Components</label>
						<select class="form-control chosen-select" id="componenetId" name="componentId">
							<option value="0">Select Component</option>
						</select>	
						<span id="errComponenetId" class="error_Mgscls" style="display:none;"></span>
					</div>
					<div class="col-sm-2 m_top10">
						<label>Departments</label>
						<select class="form-control chosen-select" id="departmentId" name="departmentId">
							<option value="0">Select Department</option>
						</select>	
						<span id="errDepartmentId" class="error_Mgscls" style="display:none;"></span>
					</div>
					<div class="col-sm-2 m_top10">
						<label>Work Status</label>
						<select class="form-control chosen-select" id="workStatusId" name="workStatusId">
							<option value="0">Select Work Status</option>
						</select>	
						<span id="errWorkStatusId" class="error_Mgscls" style="display:none;"></span>
					</div>
				</div>
				<hr style="border-top: 1px solid #ccc;"/>
				<div class="row">
					<div class="col-sm-3 m_top10">
						<label>Estimation Cost</label><br>
						<div class="col-sm-3 m_top10">
							CGF:
						</div>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="estimationCost1Id" placeholder="Enter CGF In Lakhs" name="TotalCgfAmount" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value); estimatedTotalAmount()">
							<span id="errEstimationCost1Id" class="error_Mgscls" style="display:none;"></span>
						</div>
						
						<div class="col-sm-3 m_top20">
							Convergence:
						</div>
						<div class="col-sm-9">
							<input type="text" class="form-control m_top10" id="estimationCost2Id" placeholder="Enter Convergence In Lakhs"  name="totalConvergenceAmount" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value);estimatedTotalAmount()">
							<span id="errEstimationCost2Id" class="error_Mgscls" style="display:none;"></span>
						</div>
						<div class="col-sm-3 m_top20">
							Total:
						</div>
						<div class="col-sm-9">
							<input type="text" class="form-control m_top10" id="estimationCostId" placeholder="Enter Total Cost In Lakhs" name="totalAmount" readonly >
							<span id="errEstimationCostId" class="error_Mgscls" style="display:none;"></span>
						</div>
					</div>
					<div class="col-sm-3 m_top10">
						<label>Convergence Expenditure</label>
						<input type="text" class="form-control" name="convergenceExpenditure" id="convergenceExpenditureId" placeholder="Enter Amount In Lakhs" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)">
						<span id="errconvergenceExpenditure" class="error_Mgscls" style="display:none;"></span>
						<label class="m_top20">Convergence Paid Date</label>
						<div class="row">
							<div class="col-sm-12 m_top5">
								<span class="input-group dateRangePickerCls">
									<input type="text" id="dateRangeConvergenceDateId" name="convExpDate" style="width:236px;" class="form-control" />
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
								</span> 
							</div>
						</div>
					</div>
					<div class="col-sm-3 m_top10">
					
						<label>CGF Expenditure</label>
						<input type="text" class="form-control" name="cgfReleasedAmount" id="cgfReleasedId" placeholder="Enter Amount In Lakhs" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)">
						<span id="errCgfReleasedAmount" class="error_Mgscls" style="display:none;"></span>
						<label class="m_top20">CGF Paid Date</label>
						<div class="row">
							<div class="col-sm-12 m_top5">
								<span class="input-group dateRangePickerCls">
									<input type="text" id="dateRangeCGFResDateId" name="cgfReleasedDate" style="width:236px;" class="form-control" />
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
								</span> 
							</div>
						</div>
					</div>
					<div class="col-sm-3 m_top10">
						<label>Admin Sanctioned</label>
						<input type="text" class="form-control" id="adminSanctionId" name="adminSanctionedAmount" placeholder="Enter Amount In Lakhs" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)">
						<span id="errAdminSanctionId" class="error_Mgscls" style="display:none;"></span>
						<label class="m_top20">Admin Sanctioned Date</label>
						<div class="row">
							<div class="col-sm-12 m_top5">
								<span class="input-group dateRangePickerCls">
									<input type="text" id="dateRangeAdminSanctionId" name="adminSanctionedDate" style="width:236px;" class="form-control" />
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
								</span> 
							</div> 
						</div> 
					</div>
				</div>
				 <div class="row">
					<!--<div class="col-sm-3 m_top10">
						<label>Amount Paid to contractor/Agency</label>
						<input type="text" class="form-control" id="amountPaidVendorId" name="releasedAmount" placeholder="Enter Amount In Lakhs" onkeyup="validateAmount(this.value,this.id);checkIsNumber(this.id,this.value)">
					</div>
					<div class="col-sm-3 col-sm-offset-1 m_top10">
						<label>Target Date to Finish</label>
						<div class="row">
							<div class="col-sm-12 m_top5">
								<span class="input-group dateRangePickerCls">
									<input type="text" id="dateRangeTargetDateToFinishId" name="tagetDate" style="width:236px;" class="form-control" />
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-calendar"></i>
									</span>
								</span> 
							</div> 
						</div> 
					</div> -->
					<!--<div class="col-sm-2 m_top10">
						<label>Add Files</label>
						<input type="file" id="uploadDocumentId" class="errClearSelCls" attr_name="fileList" skip_attr="skip" value="" name="fileList" multiple="multiple" />
					</div>-->
					<div class="col-sm-2 m_top30 text-center">
						<input type="button" value="SUBMIT WORK" class="btn btn-color m_top10 text-center" id="saveWorkId" onclick="submitWork()"/>
					</div>
				</div>
				<div class="row" style="padding-bottom:10px;">
					<!-- <div class="col-sm-2 col-sm-offset-3 m_top10">
						<input type="button" value="SUBMIT WORK" class="btn btn-color" id="saveWorkId" onclick="submitWork()"/>
					</div> -->
					<div id="successSpinnerDivId" style="display:none;">
						<div class="row">
							<div class="col-sm-1 m_top10">
								<div class="d2d-loader"><div class="loader"></div>
									<img src="Assests/images/spinner.gif"  style="width:42px;"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-6 col-sm-offset-2">
						<h4 id="otpSuccssMgsId" class="text-center font_weight" style="color:green;"></h4>
					</div>
				</div>
				
			</form>
		</div>
		</div>
		<div class="dashBoardCls">
			<div class="pad_10" style="box-shadow:0px 1px 4px rgba(0, 0, 0, 0.3)">
				<div class="row">
					<div class="col-sm-2 m_top10">
						<div class="pad_5 text-center white_color" style="background-color: #18679e;">
							<p class="m_top10 f_15 ">Total Works</p>
							<h3 class="font_weight m_top_bottom" id="totalWorksId"></h3>
						</div>
					</div>
					<div class="col-sm-4 m_top10">
						<div class="white_color" style="background-color: #bf657f;">
							<div class="row">
								<div class="col-sm-1 col-xs-1">
									<div class="vertical-text">
										<p class="f_10">ESTIMATED COST</p>
									</div>									
								</div>
								<div class="col-sm-11 col-xs-10">
									<div class="pad_5 ">
										<div class="row">
											<div class="col-sm-4 col-xs-4">
												<div class="text-center">
													<p class="m_top10 f_15 ">Total</p>
													<h5 class="f_22 m_top_bottom m_top10" id="totalCostId"></h5>
												</div>
											</div>
											<div class="col-sm-4 col-xs-4">
												<div class=" br_left text-center">
													<p class="m_top10 f_15 ">C.G.F</p>
													<h5 class="f_22 m_top_bottom m_top10" id="cgfCostId"></h5>
												</div>
											</div>
											<div class="col-sm-4 col-xs-4">
												<div class=" br_left text-center">
													<p class="m_top10 f_15 ">Convergence</p>
													<h5 class="f_22 m_top_bottom m_top10" id="convergenceCostId"></h5>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-2 m_top10">
						<div class="pad_5 text-center white_color" style="background-color: #617f8a;">
							<p class="m_top10 f_15 ">CONV. Expenditure</p>
							<h5 class="f_22 m_top_bottom m_top15" id="convReleasedId"></h5>
						</div>
					</div>
					<div class="col-sm-2 m_top10">
						<div class="pad_5 text-center white_color" style="background-color: #617f8a;">
							<p class="m_top10 f_15 ">C.G.F Expenditure</p>
							<h5 class="f_22 m_top_bottom m_top15" id="cgfAmountReleasedId"></h5>
						</div>
					</div>
					<!--<div class="col-sm-2 m_top10">
						<div class="pad_5 white_color text-center" style="background-color: #e80c7a;">
							<p class="m_top10 f_15 ">Admin Sanctioned Works</p>
							<h5 class="f_22 m_top_bottom m_top15" id="adminSanctionedWorksId"></h5>
						</div>
					</div>-->
					<div class="col-sm-2 m_top10">
						<div class="pad_5 text-center white_color" style="background-color: #54549a;">
							<p class="m_top10 f_15 ">Admin Sanctioned Fund</p>
							<h5 class="f_22 m_top_bottom m_top15" id ="adminSanctionedFundId"></h5>
						</div>
					</div>
				</div>			
			</div>
			<div class="pad_10 m_top10" style="box-shadow:0px 1px 4px rgba(0, 0, 0, 0.3)">
				<div class="row">
					<div class="col-sm-7">
						<div class="row">
							<div class="col-sm-4 m_top10">
								<div class="pad_10" style="border:2px solid #ff9800;">
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Admin Sanctioned Works</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="admSancId"></span>
												<span class="f_10 good_color m_left_5" id="admSancPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10 f_15 text-center" id="adminSancAmtId"></h4>
										</div>
									</div>
									<hr class="hidden-xs hidden-sm" style="border-top-color:#ff9800 !important; "/>
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Not Admin Sanctioned Works</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="notAdmSancId"></span>
												<span class="f_10 good_color m_left_5" id="notAdmSancPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top_bottom f_15 text-center" id="notAdminSancAmtId"></h4>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4 m_top10">
								<div class="pad_10" style="border:2px solid #2ca7b5;">
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Technical Sanctioned Works</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="techSancId"></span>
												<span class="f_10 good_color m_left_5" id="techSancPercId"></span>
											</h4>					
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10 f_15 text-center" id="techSancAmtId"></h4>
										</div>
									</div>
									<hr class="hidden-xs hidden-sm" style="border-top-color:#2ca7b5 !important; "/>
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Not Tech. Sanctioned Works</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="notTechSancId"></span>
												<span class="f_10 good_color m_left_5" id="notTechSancPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top_bottom f_15 text-center" id="notTechSancAmtId"></h4>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4 m_top10">
								<div class="pad_10" style="border:2px solid #ff6d60;">
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Entrusted Works</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="entrustedId"></span>
												<span class="f_11 good_color m_left_5" id="entrustedPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10 f_15 text-center" id="entrustedAmtId"></h4>
										</div>
									</div>
									<hr class="hidden-xs hidden-sm" style="border-top-color:#ff6d60 !important; "/>
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Not Entrusted Works</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="notEntrustedId"></span>
												<span class="f_11 good_color m_left_5" id="notEntrustedPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top_bottom f_15 text-center" id="notEntrustedAmtId"></h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-5">
						<div class="row">
							<div class="col-sm-6 m_top10">
								<div class="pad_10" style="border:2px solid #a5db61;">
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Grounded</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="groundedId"></span>
												<span class="f_11 good_color m_left_5" id="groundedPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10 f_15 text-center" id="groundedAmtId"></h4>
										</div>
									</div>
									<hr class="hidden-xs hidden-sm" style="border-top-color:#a5db61 !important; "/>
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Not Grounded</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="notGroundedId"></span>
												<span class="f_11 good_color m_left_5" id="notGroundedPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top_bottom f_15 text-center" id="notGroundedAmtId"></h4>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-6 m_top10">
								<div class="pad_10" style="border:2px solid #44bcf0;">
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Completed</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="completedId"></span>
												<span class="f_11 good_color m_left_5" id="completedPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10 f_15 text-center" id="completedAmtId"></h4>
										</div>
									</div>
									<hr class="hidden-xs hidden-sm" style="border-top-color:#44bcf0 !important; "/>
									<div class="row">
										<div class="col-sm-12">
										<h5 class="text-center">Under Progress</h5>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top10">
												<span class="f_15" id="notCompletedId"></span>
												<span class="f_11 good_color m_left_5" id="notCompletedPercId"></span>
											</h4>
										</div>
										<div class="col-sm-6">
											<h4 class="font_weight m_top_bottom f_15 text-center" id="notCompletedAmtId"></h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pad_20 m_top10" style="box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);">
				<div class="row m_top10">
					<div class="col-sm-9">
						<ul class="list-inline switch-btn workWiseDetailsCls" role="tabCummulative">
							<li class="active" attr_type="works" style="font-size:12px !important;">Works Wise</li>
							<li attr_type="component" style="font-size:12px !important;">Component Wise</li>
							<li  attr_type="department" style="font-size:12px !important;">Department Wise</li>							
						</ul>
					</div>	
					<div class="col-sm-3 pull-right">
						<h5 class="font_weight pull-right"><span class="pull-right">Note: Amount In Lakhs.<span>&nbsp;&nbsp;
						<button class="btn btn-sm btn-lg btn-primary pull-right worksDeleteCls"  style="display:none;margin-top: -7px;">Delete &nbsp;<i class="fa fa-trash" style="cursor:pointer;color: #fff !important;"></i>
						</button></h5>
						
					</div>
				</div>
				<div class="row m_top10">
					<div class="col-sm-12">
						<div id="workDetailsId"></div>
					</div>
				</div>				
			</div>
		</div>
	</div>
</div>
<div class="modal fade" tabindex="-1" id="workUpdationModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:95%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="headingId">Work Update Details</h4>  
			</div>
			<div class="modal-body">
				<div id="workWiseUpdationDivId"></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" tabindex="-1" id="workDeleteModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:50%;">
		<div class="modal-content">
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<h4 id="messageId">Are you sure you want to delete this?</h4>
					</div>
					<div class="col-sm-6 m_top5 pull-right">						
						<button type="button" class="btn btn-default m_left10 pull-right" data-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-default pull-right deleteConformCls" attr_workId="" attr_clusterId="">OK</button>
					</div>
				</div>
			</div>			
		</div>
	</div>
</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<!-- for file uploader  -->              
<script type="text/javascript" src="Assests/Plugins/dragAndDropPhoto/js/jquery.filer.min.js"></script>
<script type="text/javascript" src="Assests/Plugins/dragAndDropPhoto/js/multipleFileuploadNewDocuments.js?v=1.0.5"></script>
<!-- for file uploader -->
<script src="Assests/js/rurbanWorksDashBoard.js" type="text/javascript"></script>
<script type="text/javascript">
  var locationScopeId = '${sessionScope.User.accessLvelId}';
  var userID = '${sessionScope.User.userId}';
  var locationScopeValue = '${sessionScope.User.accessLevelValue}';
  var clustrId='${sessionScope.User.clusterId}';
   var clustrName='${sessionScope.User.userName}';
   $('#clusterNameID').html(clustrName+"&nbsp; Cluster Details");
</script>
</body>
</html>