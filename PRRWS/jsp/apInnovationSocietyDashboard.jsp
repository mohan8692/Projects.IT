<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ApInnovation Society Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
	.tableStyleCls  th{
		background-color:#e2e9e0 !important;
	}
	.tableStyleCls  td{
		background-color:#fff !important;
	}
	.itBlueCol{
		color:#01209F;
	}
	.indRupStyCls{
		color: #E4B860;
		font-size: 18px;
		background-color: #fff;
		border: 1px solid #E4B860;
	}
	.maroonBlc{
		background-color:#EDD1D1;
		border-radius:2px;
	}
	.purGreyBlc{
		background-color:#DEDEDE;
		border-radius:4px;
	}
	.ulTabStyleCls li.active > a{
		background-color: #305F33 !important;
		color: #fff !important;
		font-size: 13px !important;
	}
	.ulTabStyleCls a{
		background-color: #fff !important;
		border: 1px solid #E2E2E2 !important;
		border-radius: 0px !important;
		border-left: none !important;
		color: #333 !important;
		font-weight: bold !important;
		margin: 0px !important;
	}
	.table_bg_white th,
	.table_bg_white td{
		background-color: #fff !important;
		vertical-align: middle !important;
		text-transform: none !important;
		text-align: center !important;
		font-size: 13px !important;
		font-weight: bold !important;
	}
	.tableGreyCol th{
		background-color:#EBEBEB !important;
	}
	.tablePureGreyCol th{
		background-color:#C9CDD5  !important;
	}
	.startupProfileCls,.startupProfStagesCls,.districtClickCls,.activitiesCls,.startUpCompInfoCls,.bootCampPartiCls{
		cursor: pointer;
		text-decoration: underline;
	}
	.sectioncs {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16) !important;
    background-color: #ffffff !important;
    border: solid 1px #dcdcdc !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
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
					<h4 class="text-capital">Panchayat Raj, RD & RWS</h4>
					<p>ApInnovation Society DASHBOARD</p>
				</div>
				<!-- <div class="col-sm-1 col-xs-12">
					<img src="Assests/images/lokesh.png" style="height:30px; margin: 20px 0 0 20px;"/>
				</div> -->
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
<section style="background-color:#fff !important;">
	<div class="container-fluid">
	<div class="p_60_20">
		<div class="row">
			<div class="col-sm-12">				
				<div class="pad_15 border_yash" style="background-color:#F5F5F5;">
					<div class="tableResponce">
						<div class="li_blocks">
							<ul class="list-inline blocksCls">
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2294.png"  />
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Startups</h5>
												<h4 class="text-success font_weight spinnerCls m_top20" id="startupsId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2590.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Accelerators</h5>
												<h4 class="text-success font_weight spinnerCls m_top20" id="acceleratorsId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2592.png" />
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Incubators</h5>
												<h4 class="text-success font_weight spinnerCls m_top20" id="incubatorsId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2594.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small" >Enablers</h5>
												<h4 class="text-success font_weight spinnerCls m_top20" id="enablersId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2626.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Mentors</h5>
												<h4 class="text-success font_weight spinnerCls m_top20" id="mentorsId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2598.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Activities Completed</h5>
												<h4 class="text-success font_weight spinnerCls m_top10" id="activitiesId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2598.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Activities Upcoming</h5>
												<h4 class="text-success font_weight spinnerCls m_top10" id="activitiesUpComingId"></h4>
											</div>											
										</div>
									</div>
								</li>
							</ul>
							<ul class="list-inline blocksCls" style="top:5px !important;">
								<li>
									<div class="custom-div m_top10">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2604.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">VC & Angel Investors</h5>
												<h4 class="text-success font_weight spinnerCls m_top10" id="vCAngInvestId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2606.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Industry Collaborations</h5>
												<h4 class="text-success font_weight spinnerCls m_top10" id="industCollId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2608.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Atal Tinkering Labs</h5>
												<h4 class="text-success font_weight spinnerCls m_top10" id="atalTinkerLabsId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2610.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">EDC</h5>
												<h4 class="text-success font_weight spinnerCls m_top30" id="edcId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2612.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Employment Generation</h5>
												<h4 class="text-success font_weight spinnerCls m_top10" id="empGenId"></h4>
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 2600.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Revenue Generation</h5>
												<h4 class="text-success font_weight spinnerCls m_top10" id="revGenId"style="font-size: larger;"></h4>
											</div>											
										</div>
									</div>
								</li>								
								<li>
									<div class="custom-div">
										<div class="media">
											<div class="media-left">
												<img class= "inno_img" src="Assests/APInnovation/Group 3429.png"/>
											</div>
											<div class="media-body text-center">
												<h5 class="font_weight" style="font-size:small">Leads</h5>
												<h4 class="text-success font_weight spinnerCls m_top30" id="leadId"></h4>
											</div>											
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-group m_top10" id="accordionApInnovationStratUps" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-black m_top20">
				<div class="panel-heading" role="tab">		
					<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordionApInnovationStratUps" href="#collapseApInnovationStratUps" aria-expanded="true" aria-controls="collapseApInnovation">		
						<h4 class="panel-title text-capital">Startups Profile</h4>						
					</a>
				</div>
				<div id="collapseApInnovationStratUps" class="panel-collapse collapse in" role="tabpanel">	
					<div class="panel-body">
						<div class="row">						
							<div class="col-sm-12">
								<div id="startUpsProfileTabId"></div>							
							</div>
						</div>
						<div class="row m_top10">
							<div class="col-sm-9 m_top10">
								<div class="custom-div">
									<div class="row">
										<div class="col-sm-4 m_top10">
											<div class="row">
												<div class="col-sm-8">
													<div class="media font_weight">
														<div class="media-left">
															<i class="fa fa-rupee icon-name indRupStyCls"></i>
														</div>
														<div class="media-body">
															<h5 class="media-heading m_top10 font_weight">Revenue Generated</h5>
														</div>
													</div>
												</div>
												<div class="col-sm-4 m_top10">
													<h5 class="font_weight startupBlcSpinner" id="revGenBlcId"></h5>
												</div>
											</div>
										</div>
										<div class="col-sm-4 m_top5">
											<div class="pad_15 maroonBlc">
												<div class="row ">
													<div class="col-sm-8">
														<h5 class="font_weight">Incubators Startups</h5>
													</div>
													<div class="col-sm-4 ">
														<h5 class="font_weight startupBlcSpinner" id="incStartupsId"></h5>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 m_top5">
											<div class="pad_15 purGreyBlc ">
												<div class="row ">
													<div class="col-sm-8">
														<h5 class="font_weight">Accelerators Startups</h5>
													</div>
													<div class="col-sm-4 ">
														<h5 class="font_weight startupBlcSpinner" id="accStartupsId"></h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-3 m_top10">
								<div class="custom-div" style="padding: 20px;">
									<div class="row ">
										<div class="col-sm-8">
											<div class="media font_weight"><div class="media-left">
											<i class="fa fa-rupee icon-name indRupStyCls"></i></div>
											<div class="media-body">
												<h5 class="media-heading m_top10 font_weight">Fund Raised</h5>
											</div></div>
										</div>
										<div class="col-sm-4 ">
											<h5 class="font_weight startupBlcSpinner m_top10" id="funRaisedId"></h5>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<div id="stageTableBlcId"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-12">
								<div id="sectTableBlcId"></div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>	
		<div class="panel-group m_top10" id="accordionApInnovationStartUpComplete" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-black">
				<div class="panel-heading" role="tab">		
					<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationStartUpComplete" href="#collapseApInnovationStartUp" aria-expanded="true" aria-controls="collapseApInnovationStartUp">		
						<h4 class="panel-title text-capital">startups complete  information</h4>						
					</a>
				</div>
				<div id="collapseApInnovationStartUp" class="panel-collapse collapse" role="tabpanel">	
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-12">
								<ul class="nav nav-tabs ulTabStyleCls alltypeClsClc" role="tablist">
									<li role="presentation" class="active"><a href="#startups" att_tab_id="startupsTabId" attr_type="Startup" aria-controls="startups" role="tab" data-toggle="tab">Startups</a></li>
									<li role="presentation"><a href="#incubator" att_tab_id="incubatorTabId" attr_type="Incubators" aria-controls="incubator" role="tab" data-toggle="tab">Incubator/Accelerators</a></li>
									<li role="presentation"><a href="#enablers" att_tab_id="enablersTabId" attr_type="Enablers" aria-controls="enablers" role="tab" data-toggle="tab">Enablers</a></li>
									<li role="presentation"><a href="#mentors" att_tab_id="mentorsTabId" attr_type="Mentors" aria-controls="mentors" role="tab" data-toggle="tab">Mentors</a></li>
									<li role="presentation"><a href="#edc" att_tab_id="edcTabId" attr_type="EDC" aria-controls="edc" role="tab" data-toggle="tab">EDC</a></li>
									<li role="presentation"><a href="#atal" att_tab_id="atalTabId"  attr_type="AtalTinkeringLabs" aria-controls="atal" role="tab" data-toggle="tab">Atal Tinkering Labs</a></li>
									<li role="presentation"><a href="#vc" att_tab_id="vcTabId" attr_type="AngelInvestors" aria-controls="vC" role="tab" data-toggle="tab">VC& Angel Investors</a></li>
									<li role="presentation"><a href="#iC" att_tab_id="iCTabId" attr_type="IndustryCollaborations" aria-controls="vC" role="tab" data-toggle="tab">Industry Collaborations</a></li>
									<li role="presentation"><a href="#lt" att_tab_id="leadsTabId" attr_type="Leads" aria-controls="lt" role="tab" data-toggle="tab">Leads</a></li>
								</ul>
								<div class="tab-content">
									<div role="tabpanel" class="tab-pane active" id="startups">
										<div id="startupsTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="incubator">
										<div id="incubatorTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="enablers">
										<div id="enablersTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="mentors">
										<div id="mentorsTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="edc">
										<div id="edcTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="atal">
										<div id="atalTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="vc">
										<div id="vcTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="iC">
										<div id="iCTabId"></div>
									</div>
									<div role="tabpanel" class="tab-pane " id="lt">
										<div id="leadsTabId"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-group m_top10" id="accordionApInnovationActivity" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-black">
				<div class="panel-heading" role="tab">		
					<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationActivity" href="#collapseApInnovationActivity" aria-expanded="true" aria-controls="collapseApInnovationActivity">		
						<h4 class="panel-title text-capital">Activity Profile</h4>						
					</a>
				</div>
				<div id="collapseApInnovationActivity" class="panel-collapse collapse" role="tabpanel">	
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-12">
								<div class=" ">									
									<div class="row">
										<div class="col-sm-12">
											<div id="activityProfTabId"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-group m_top10" id="accordionApInnovationTargetAchievements" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-black">
				<div class="panel-heading" role="tab">		
					<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationTargetAchievements" href="#collapseApInnovationTargetAchievements" aria-expanded="true" aria-controls="collapseApInnovationTargetAchievements">		
						<h4 class="panel-title text-capital">Targets vs Achivements</h4>						
					</a>
				</div>
				<div id="collapseApInnovationTargetAchievements" class="panel-collapse collapse" role="tabpanel">	
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-12">
								<div class="">									
									<div class="row m_top10">
										<div class="col-sm-12">
											<div id="targVsAchTabId"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-group m_top10" id="accordionApInnovationDistrictWise" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-black">
				<div class="panel-heading" role="tab">		
					<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationDistrictWise" href="#collapseApInnovationDistrictWise" aria-expanded="true" aria-controls="collapseApInnovationDistrictWise">		
						<h4 class="panel-title text-capital">District Wise Details</h4>						
					</a>
				</div>
				<div id="collapseApInnovationDistrictWise" class="panel-collapse collapse" role="tabpanel">	
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-12">
								<div id="districtWiseDetTabId"></div>
							</div>
						</div>
					</div>
				</div>
			</div>			
		</div>
		<div class="panel-group m_top10" id="accordionApInnovationBoothCamp" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-black">
				<div class="panel-heading" role="tab">		
					<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationBoothCamp" href="#collapseApInnovationBoothCamp" aria-expanded="true" aria-controls="collapseApInnovationBoothCamp">		
						<h4 class="panel-title text-capital">bootCamp Details</h4>						
					</a>
				</div>
				<div id="collapseApInnovationBoothCamp" class="panel-collapse collapse" role="tabpanel">	
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-12">
								<div id="bootCampDetailsDivId"></div>
							</div>
						</div>
					</div>
				</div>
			</div>			
		</div>
		<div class="panel-group m_top10" id="accordionApInnovationHackathons" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default panel-black">
				<div class="panel-heading" role="tab">		
					<a role="button" class="panelCollapseIcon collapsed"  data-toggle="collapse" data-parent="#accordionApInnovationHackathons" href="#collapseApInnovationHackathons" aria-expanded="true" aria-controls="collapseApInnovationHackathons">		
						<h4 class="panel-title text-capital">Hackathons</h4>						
					</a>
				</div>
				<div id="collapseApInnovationHackathons" class="panel-collapse collapse" role="tabpanel">	
					<section class="sectioncs">
						<div class="block displayNone">	
							<div class="container-fluid">
								<div class="row">
									<div class="col-sm-3 pull-right">
										<div class="input-group">
											<span class="input-group-addon">
												<i class="glyphicon glyphicon-calendar"></i>
											</span>
											<input class="form-control" id="dateRangePicker" style="width:200px;" type="text">
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-12">
								<div id="trainingDetailsDivId"></div>
							</div>
						</div>
						<div class="row m_top30">
							<div class="col-sm-12 m_top20">
								<div id="trainHackathonDetailsDivId" ></div>
							</div>
						</div>
						
					</div>
				</div>
	</div>
	</div>
</section>
<!-- modal -->
<div class="modal fade" tabindex="-1" id="APInnovationModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital f_16 font_weight" id="APInnovationModalHeadingId"></h4>  
			</div>
			<div class="modal-body">
				<div id="APInnovationModalDetailsDivId"></div>				
			</div>			
		</div>
	</div>
</div>
<div class="modal fade" tabindex="-1" id="startUpCompInforModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital f_16 font_weight" id="startUpCompInfoModalHeadingId"></h4>  
			</div>
			<div class="modal-body">
				<div id="startUpCompInfoModalDetailsDivId"></div>				
			</div>			
		</div>
	</div>
</div>
<div id="companiesModalId" class="modal fade" role="dialog">
		<div class="modal-dialog widthclass" style="width:95%;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="companiesHeadingId"></h4>
				</div>
				<div class="modal-body">
					<div id="companiesModalDivId"></div> 
					<div class="row"> 
					<div class="col-sm-4">
							<div class="m_top20" id="paginationCountDivId"></div>
						</div>
						<div class="col-sm-8 ">
							<div class="pull-right" id="paginationDivId"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
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
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyD_ELXOA5iHgPThVcenSQjMwkev64EcZbE"></script>
<script src="Assests/js/apInnovationSocietyDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script src="Assests/SimplePagination/simplePagination3.js" type="text/javascript"></script>
</body>
</html>