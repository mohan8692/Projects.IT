<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>e-pragati DashBoard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
	body {
		background-color:#F0F4F6;
	}
	.border_borRad {
		border:1px solid #FAB012; 
		border-radius:3px;
	}
	.modulesOverviewClkCls {
		cursor:pointer;
	}
	.blocksCls li {
		margin-top:5px;
		text-align:left !important;
	}
	.frameClkCls {
		cursor:pointer;
	}
	.chosen-container{
		margin-top: 10px;
	}
</style>
</head>
<body>
<header>
	<nav style="background-color:#F1F1F1;">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-1 col-xs-3 pad_left0">
					<img src="Assests/images/aplogo.png" class="logo"/>
				</div>
				<div class="col-sm-10 m_top10 col-xs-9">
					<div class="media">
						<div class="media-left" style="width:20%;">
							<h4 class="text-capital color_black font_14 m_top5">Panchayat Raj, RD & RWS</h4>
							<p class="text-success">e-Pragati</p>
						</div>
						<div class="media-body">
							<img src="Assests/images/e-Pragati-logo.png" class="media-object">
					  </div>
					</div>
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
	<div class="container-fluid">
		<!--<div class="row m_top10">
			<div class="col-sm-3 pull-right m_top5">
				<span class="input-group">
					<input type="text" id="dateRangeForTrainingId" style="width:200px" class="form-control pull-right" />
					<span class="input-group-addon">
						<i class="glyphicon glyphicon-calendar"></i>
					</span>
				</span>
			</div>
		</div>-->
		<div class="white_block m_top30" style="box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3); border-radius:3px;">
			<h4 class="font_weight font_16">OVERVIEW</h4>
			<div id="overviewId"></div>
			<div class="showHideCls" id="showHideId0" style="display:block;">
				<hr class="borderStl">
				<div class="deptCls" style="padding-top:0px;">
					<div class="row">
						<div class="col-sm-12">
							<h5 class="btn font_weight text_danger pull-right resetClkCls" attr_type="moduleReset">Reset</h5>
						</div>
					</div>		
					<div class="row">
						<div class="col-sm-4">
							<div class="pad_5 borderBorRadDept m_top5">
								<div  class="pad_10" style="border-left:10px solid #acacac;">
									<h5 class="font_weight font_16">Total Departments</h5>
									<h2 class="font_weight m_top10" id="departmentId"></h2>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="pad_5 borderBorRadDept m_top5">
								<div  class="pad_10" style="border-left:10px solid #acacac;">
									<h5 class="font_weight font_16">Total Service</h5>
									<h2 class="font_weight m_top10" id="serviceId"></h2>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="pad_5 borderBorRadDept m_top5">
								<div  class="pad_10" style="border-left:10px solid #acacac;">
									<h5 class="font_weight font_16">Total Module</h5>
									<h2 class="font_weight m_top10" id="moduleId"></h2>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<h4 class="font_weight font_16">STATUS, SYSTEM, CATEGORY OVERVIEW</h4>
					<hr style="border-top:1px solid #aeaaaa;">
					<h4 class="font_weight font_16">MODULES OVERVIEW</h4>
					<div class="row m_top10">
						<div class="col-sm-4 moduleActive">
							<div class="borderBorRadModule moduleAct deptAct m_top5 active modulesOverviewClkCls" attr_dept_type="" attr_block_type="moduleBlock">
								<div class="pad_10_20">
									<h5 class="font_weight font_16">Total Modules</h5>
									<h2 class="font_weight mt_25" id="totalModulesId"></h2>
								</div>
							</div>
						</div>
						<div class="col-sm-4 moduleActive">
							<div class="borderBorRadModule deptAct m_top5 modulesOverviewClkCls" attr_dept_type="Y" attr_block_type="moduleBlock">
								<div class="pad_10_20">
									<h5 class="font_weight font_16">Dept. Approved</h5>
									<div class="media">
										<div class="media-left">
											<p class="fontIconCls"><i class="fa fa-check-circle mar_font" aria-hidden="true" style="color:#8CCFB9"></i></p>
										</div>
										<div class="media-body" style="width:100%;">
											<h2 class="font_weight m_top10" id="deptApprovedId"></h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-4 moduleActive">
							<div class="borderBorRadModule deptAct m_top5 modulesOverviewClkCls" attr_dept_type="N" attr_block_type="moduleBlock">
								<div class="pad_10_20">
									<h5 class="font_weight font_16">Dept. Not Approved</h5>
									<div class="media">
										<div class="media-left">
											<p class="fontIconCls"><i class="fa fa-times-circle mar_font" aria-hidden="true" style="color:#e54a6a"></i></p>
										</div>
										<div class="media-body" style="width:100%;">
											<h2 class="font_weight m_top10" id="deptNotApprovedId"></h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<h4 class="font_weight font_16">STATUS WISE</h4>
					<div class="row">
						<div class="col-sm-4">
							<div id="stateWiseDonutGraphId" style="height:200px;"></div>
						</div>
						<div class="col-sm-8">
							<!--<div id="statusWiseBlockId"></div>-->
							<div class="row">
								<div class="col-sm-4 m_top10">
									<div class="pad_15 default_white border_radius_5" style="border:1px solid #fa9426;">
										<h5 class="font_weight">UAT</h5>
										<h2 class="m_top10 font_weight" id="countUAT"></h2>
									</div>
								</div>
								<div class="col-sm-4 m_top10">
									<div class="pad_15 default_white border_radius_5" style="border:1px solid #e75351;">
										<h5 class="font_weight">Development</h5>
										<h2 class="m_top10 font_weight" id="countDevelopment"></h2>
									</div>
								</div>
								<div class="col-sm-4 m_top10">
									<div class="pad_15 default_white border_radius_5" style="border:1px solid #fdc334;">
										<h5 class="font_weight">Requirement</h5>
										<h2 class="m_top10 font_weight" id="countRequirement"></h2>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-4 m_top10">
									<div class="pad_15 default_white border_radius_5" style="border:1px solid #a856aa;">
									<h5 class="font_weight">Testing</h5>
										<h2 class="m_top10 font_weight" id="countTesting"></h2>
									</div>
								</div>
								<div class="col-sm-4 m_top10">
									<div class="pad_15 default_white border_radius_5" style="border:1px solid #25aee4;">
									<h5 class="font_weight">Production</h5>
										<h2 class="m_top10 font_weight" id="countProduction"></h2>
									</div>
								</div>
								<div class="col-sm-4 m_top10">
									<div class="pad_15 default_white border_radius_5" style="border:1px solid #00b506;">
										<h5 class="font_weight">QA Live</h5>
										<h2 class="m_top10 font_weight" id="countQALive"></h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<h4 class="font_weight font_16">EXISTING SYSTEM</h4>
					<div class="row m_top10">
						<div class="col-sm-4 m_top5">
							<div class="brdR_3 default_white pad_15 existAct modulesOverviewClkCls deptTypeCls"  attr_exist_type="Manual" attr_block_type="existingBlock" style="border: solid 1px #ffb300;">
								<h5 class="font_weight">Manual</h5>
								<div class="row m_top10">
									<div class="col-sm-4">
										<h1 class="font_weight" id="ManualCountId"></h1>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Approved</h6>
										<h4 class="m_top5 text-success font_weight" id="ManualApprovedId"></h4>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Not Approved</h6>
										<h4 class="m_top5 text_danger font_weight" id="ManualNotApprovedId"></h4>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-4 m_top5">
							<div class="brdR_3 default_white pad_15 existAct modulesOverviewClkCls deptTypeCls"  attr_exist_type="Legacy/Brown Filed" attr_block_type="existingBlock" style="border: solid 1px #00c728;">
								<h5 class="font_weight">Legacy/Brown Field</h5>
								<div class="row m_top10">
									<div class="col-sm-4">
										<h1 class="font_weight" id="LegacyBrownFiledCountId"></h1>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Approved</h6>
										<h4 class="m_top5 text-success font_weight" id="LegacyBrownFiledApprovedId"></h4>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Not Approved</h6>
										<h4 class="m_top5 text_danger font_weight" id="LegacyBrownFiledNotApprovedId"></h4>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-4 m_top5">
							<div class="brdR_3 default_white pad_15 existAct modulesOverviewClkCls deptTypeCls"  attr_exist_type="Green Filed" attr_block_type="existingBlock" style="border: solid 1px #0099ff;">
								<h5 class="font_weight">Green Field</h5>
								<div class="row m_top10">
									<div class="col-sm-4">
										<h1 class="font_weight" id="GreenFiledCountId"></h1>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Approved</h6>
										<h4 class="m_top5 text-success font_weight" id="GreenFiledApprovedId"></h4>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Not Approved</h6>
										<h4 class="m_top5 text_danger font_weight" id="GreenFiledNotApprovedId"></h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<h4 class="font_weight font_16">CATEGORY</h4>
					<div class="row m_top10">
						<div class="col-sm-4 m_top5">
							<div class="brdR_3 default_white pad_15 catAct modulesOverviewClkCls catTypeCls" attr_category_type="G2B" attr_block_type="categoryBlock" style="border: solid 1px #039aff;">
								<h5 class="font_weight">Government to Business</h5>
								<div class="row m_top10">
									<div class="col-sm-4">
										<h1 class="font_weight" id="G2BCountId"></h1>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Approved</h6>
										<h4 class="m_top5 text-success font_weight" id="G2BApprovedId"></h4>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Not Approved</h6>
										<h4 class="m_top5 text_danger font_weight" id="G2BNotApprovedId"></h4>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-4 m_top5">
							<div class="brdR_3 default_white pad_15 catAct modulesOverviewClkCls catTypeCls" attr_category_type="G2C" attr_block_type="categoryBlock" style="border: solid 1px #e807ca;">
								<h5 class="font_weight">Government to Customer</h5>
								<div class="row m_top10">
									<div class="col-sm-4">
										<h1 class="font_weight" id="G2CCountId"></h1>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Approved</h6>
										<h4 class="m_top5 text-success font_weight" id="G2CApprovedId"></h4>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Not Approved</h6>
										<h4 class="m_top5 text_danger font_weight" id="G2CNotApprovedId"></h4>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-4 m_top5">
							<div class="brdR_3 default_white pad_15 catAct modulesOverviewClkCls catTypeCls" attr_category_type="G2G" attr_block_type="categoryBlock" style="border: solid 1px #000000;">
								<h5 class="font_weight" >Government to Government</h5>
								<div class="row m_top10">
									<div class="col-sm-4">
										<h1 class="font_weight" id="G2GCountId"></h1>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Approved</h6>
										<h4 class="m_top5 text-success font_weight" id="G2GApprovedId"></h4>
									</div>
									<div class="col-sm-4">
										<h6 class="f_10 font_800">Dept. Not Approved</h6>
										<h4 class="m_top5 text_danger font_weight" id="G2GNotApprovedId"></h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="showHideCls" style="display:none" id="showHideId1">
				<hr class="borderStl">
				<div class="deptCls" style="padding-top:0px;">
					<h5 class="btn font_weight text_danger pull-right resetClkCls" attr_type="frameReset">Reset</h5>
					<div id="frameworkId"></div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<div id="architectureId"></div>
				</div>
			</div>
			<div class="showHideCls" style="display:none" id="showHideId2">
				<hr class="borderStl">
				<div class="deptCls">
					<!--<h5 class="btn font_weight text_danger pull-right resetClkCls" attr_type="coreReset">Reset</h5>-->
					<div id="coreDashboardId"></div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<h4 class="font_weight font_16">CORE DASHBOARD PRIORITY</h4>
					<div class="row m_top10">
						<div class="col-sm-4">
							<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">
								<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">P1 <span class="pull-right mTop8" style="font-size:30px;" id="p1Id"></span></h5>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">
								<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">P2 <span class="pull-right mTop8" style="font-size:30px;" id="p2Id"></span></h5>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">
								<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">New <span class="pull-right mTop8" style="font-size:30px;" id="newId"></span></h5>
							</div>
						</div>
					</div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<div class="row">
						<div class="col-sm-6" style="border-right: dotted;">
							<h4 class="font_weight font_16">Dept. Interaction</h4>
							<div class="row m_top10">
								<div class="col-sm-6">
									<div class="pad_10 brdR_3" style="border: solid 2px #b4d7ff;">
										<div class="row">
											<div class="col-sm-6">
												<div class="media">
													<div class="media-left">
														<p class="fontIconCls"><i class="fa fa-check-circle mar_font" aria-hidden="true" style="color:#8CCFB9"></i></p>
													</div>
													<div class="media-body" style="width:100%;">
														<h5 class="font_weight font_16 m_top10">Yes</h5>
													</div>
												</div>
											</div>
											<div class="col-sm-6">
												<h2 class="font_weight pull-right" id="deptYesId"></h2>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="pad_10 brdR_3" style="border: solid 2px #b4d7ff;">
										<div class="row">
											<div class="col-sm-6">
												<div class="media">
													<div class="media-left">
														<p class="fontIconCls"><i class="fa fa-times-circle mar_font" aria-hidden="true" style="color:#e54a6a"></i></p>
													</div>
													<div class="media-body" style="width:100%;">
														<h5 class="font_weight font_16 m_top10">No</h5>
													</div>
												</div>
											</div>
											<div class="col-sm-6">
												<h2 class="font_weight pull-right" id="deptNoId"></h2>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<h4 class="font_weight font_16">Core Dashboard Progress</h4>
							<div class="row m_top10">
								<div class="col-sm-6">
									<div class="pad_10 brdR_3" style="border: solid 2px #b4d7ff;">
										<div class="row">
											<div class="col-sm-6">
												<div class="media">
													<div class="media-left">
														<p class="fontIconCls"><i class="fa fa-check-circle mar_font" aria-hidden="true" style="color:#8CCFB9"></i></p>
													</div>
													<div class="media-body" style="width:100%;">
														<h5 class="font_weight font_16 m_top10">WIP</h5>
													</div>
												</div>
											</div>
											<div class="col-sm-6">
												<h2 class="font_weight pull-right" id="deptWipId"></h2>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="pad_10 brdR_3" style="border: solid 2px #b4d7ff;">
										<div class="row">
											<div class="col-sm-6">
												<div class="media">
													<div class="media-left">
														<p class="fontIconCls"><i class="fa fa-times-circle mar_font" aria-hidden="true" style="color:#e54a6a"></i></p>
													</div>
													<div class="media-body" style="width:100%;">
														<h5 class="font_weight font_16 m_top10">Not WIP</h5>
													</div>
												</div>
											</div>
											<div class="col-sm-6">
												<h2 class="font_weight pull-right" id="deptNoWipId"></h2>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>		
					</div>
				</div>
			</div>
			<div class="showHideCls" style="display:none" id="showHideId3">
				<hr class="borderStl">
				<div class="deptCls">
					<!--<h5 class="btn font_weight text_danger pull-right resetClkCls" attr_type="dataReset">Reset</h5>-->
					<div id="dataAnalyticsId">
						<!--<div class="row m_top10">
							<div class="col-sm-6">
								<div class="pad_5 brdR_3 default_white" style="border: solid 2px #b4d7ff;">
									<h5 class="pad_15 font_weight font_16 dataCls active" attr_type="department" style="border-left:10px solid #B4D7FF;">Department <span class="pull-right mTop8" id="dataAnalaticDeptCountId" style="font-size:30px;"></span></h5>
								</div>
							</div>
							<div class="col-sm-6">
								<div class="pad_5 brdR_3 default_white" style="border: solid 2px #b4d7ff;">
									<h5 class="pad_15 font_weight font_16 dataCls" attr_type="subDepartment" style="border-left:10px solid #B4D7FF;">Sub Department <span class="pull-right mTop8" id="dataAnalaticSubDeptCountId" style="font-size:30px;"></span></h5>
								</div>
							</div>
						</div>-->
					</div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<!--<div id="statusId"></div>-->
					<div class="row">
						<div class="col-sm-12">
							<h4 class="font_weight font_16">STATUS</h4>
							<div class="row m_top10">
								<div class="row m_top10">
									<div class="col-sm-3">
										<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">
											<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">Yet to Initiate<span class="pull-right mTop8" style="font-size:30px;" id="deptyetToInitiate"></span></h5>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">
											<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">Dept. Interaction <span class="pull-right mTop8" style="font-size:30px;" id="deptInteraction"></span></h5>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">
											<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">POC Completed <span class="pull-right mTop8" style="font-size:30px;" id="pocComp"></span></h5>
										</div>
									</div>
									<div class="col-sm-3">
										<div class="pad_5 brdR_3" style="border: solid 2px #b4d7ff;">
											<h5 class="pad_15 font_weight font_16" style="border-left:10px solid #acacac;">Data Requested <span class="pull-right mTop8" style="font-size:30px;" id="dataReq"></span></h5>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
			<div class="showHideCls" style="display:none" id="showHideId4">
				<hr class="borderStl">
				<div class="deptCls">
					<!--<h5 class="btn font_weight text_danger pull-right resetClkCls" attr_type="localReset">Reset</h5>-->
					<div id="localDeptBlockId"></div>
				</div>
				<hr class="borderStl">
				<div class="deptCls">
					<div id="websitesStatusId"></div>
				</div>
			</div>	
		</div>
		<div id="overviewCollpseDivId"></div>
	</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/js/jquery.animateNumber.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>	
<script src="Assests/Epragathi/epragathiDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>	

</body>
</html>