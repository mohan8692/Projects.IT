<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Apita Dashboard</title>
<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/SlickSliderNew/slick-theme.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet"/>
<script src="https://use.fontawesome.com/07d3416f74.js"></script>
<script src="Assests/Plugins/Less/less.js"></script>
<style>
	.companiesClkCls {
		cursor:pointer;
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
					<h4 class="text-capital">Panchayat Raj & RD & RWS</h4>
					<p>APITA</p>
				</div>
				<div class="col-sm-1 col-xs-12">
					<i class="glyphicon glyphicon-th menu-cls pull-right"></i>
					<div class="menu-data-cls">
						<div class="arrow_box_top">
							<div id="menu"></div> 
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
	<!--<section class="navbar-section" style="background-color: #E6E6E6;">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-3 pull-right">
					<h5 class="font_weight pull-right">Note: Amount In Lakhs.</h5>
				</div>
			</div>
		</div>
	</section>-->
</header>
<div class="container-fluid m_top10">
	<div class="row">
		<div class="col-sm-3 pull-right m_top5">
			<span class="input-group">
				<input type="text" id="dateRangeForTrainingId" style="width:200px" class="form-control pull-right" />
				<span class="input-group-addon">
					<i class="glyphicon glyphicon-calendar"></i>
				</span>
			</span>
		</div>
	</div>
	<div class="whiteBlockStl m_top10">
		<span class="headClrGray font_weight font_16">Overview</span>
		<div id="trainingDetailsDivId"></div>
		<div class="whiteBlockStl m_top10">
			<div class="row">
				<div class="col-sm-2 m_top5">
					<div class="jobFairStyleCls">
						<h5>JOB FAIR</h5>
					</div>
				</div>
				<div class="col-sm-10 m_top5">
					<ul class="list-inline switch-btn-apita pull-right jobFairClkCls">
						<li class="active" attr_name="all">ALL</li>
						<li attr_name="mega Drive">MEGA</li>
						<li attr_name="individual Drive">INDIVIDUAL</li>
					</ul>
				</div>
			</div>
			<div class="m_top10" id="jobFairId"></div>
		</div>
	</div>
	<div class="whiteBlockStl m_top10">
		<div class="row">
			<div class="col-sm-5 m_top10">
				<span class="headClrTrending font_weight font_16">Trending</span>
			</div>
			<div class="col-sm-3 m_top10">
				<ul class="switch-btn-apita activateCls pull-right border_right">
					<li class="active" attr_monthId="1">Monthly</li>
					<li class="" attr_monthId="2">Quarterly</li>
					<li class="" attr_monthId="3">Half yearly</li>
				</ul>
			</div>
			<div class="col-sm-3 m_top10">
				<ul class="switch-btn-apita yearActivateCls">
					<li class="" attr_yearId="3">Last 5 years</li>
					<li class="" attr_yearId="2">Last 3 years</li>
					<li class="active" attr_yearId="1">This year</li>
				</ul>
			</div>
			<div class="col-sm-1 m_top10">
				<button class="btn btn-success getTrendingDetailsCls btn-sm m_top15 " style="border-radius:0px;">SUBMIT</button>
			</div>
		</div>
		<div id="trendingGraphDivId"></div>		
		
	</div>
	<div class="panel-group m_top10" id="trainingAccordion" role="tablist" aria-multiselectable="true">
		<div class="panel panel-default panel-white">
			<div class="panel-heading padding_15" role="tab" id="trainingHeadingOne" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
				<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#trainingAccordion" href="#trainingCollapseOne" aria-expanded="false" aria-controls="trainingCollapseOne">
					<h5 class="font_weight text-capital">Training overview - Course wise</h5>
				</a>
			</div>
			<div id="trainingCollapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="trainingHeadingOne">
				<div class="panel-body">
					<span class="headClrGray font_weight font_16">All</span>
					<div id="allDetailsId"></div>
					<span class="headClrGray font_weight font_16">Technical</span>
					<div id="technicalId"></div>
					<span class="headClrGray font_weight font_16">Non - Technical</span>
					<div id="nonTechnicalId"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="panel-group" id="trainingCentersAccordion" role="tablist" aria-multiselectable="true">
		<div class="panel panel-default panel-white">
			<div class="panel-heading padding_15" role="tab" id="trainingCentersHeading" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
				<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#trainingCentersAccordion" href="#trainingCentersCollapse" aria-expanded="false" aria-controls="trainingCentersCollapse">
					<h5 class="font_weight text-capital">Hiring & Training Centers overview</h5>
				</a>
			</div>
			<div id="trainingCentersCollapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="trainingCentersHeading">
				<div class="panel-body">
					<div class="row mb_20">
						<div class="col-sm-2 pull-right">
							<select class="form-control chosen-select" id="trainingOverViewDistrictDrpId">
								<option value="0">All Districts</option>
							</select>
						</div>
					</div>
					<ul class="nav nav-tabs worksBlock text-capital" style="border-bottom:none;">
						<li class="active"><a data-toggle="tab" href="#companiesHiring">Top Companies Hiring</a></li>
						<!--<li><a data-toggle="tab" href="#trainingLocations">Training Locations</a></li>-->
					</ul>
					<div class="tab-content m_top10">
						<div id="companiesHiring" class="tab-pane fade in active">
							<div id="companiesHiringTabBlkId"></div>
						</div>
						<!--<div id="trainingLocations" class="tab-pane fade">
							<div class="table-responsive">
								<table class="table table-bordered m_top10 table_custom_SC">
									<thead>
										<tr>
											<th rowspan="3">Rank</th>
											<th rowspan="3">
												<div class="media">
													<div class="media-left">
														<i class="fa fa-building fa-lg m_top5" aria-hidden="true" style="color:#A7DC4A;"></i>
													</div>
													<div class="media-body" style="width:100%;">
														<h4 class="media-heading font_weight m_top5 font_12">Training Center Location</h4>
													</div>
												</div>
											</th>
											<th rowspan="3">
												<div class="media">
													<div class="media-left">
														<img src="Assests/images/Group 2258.png" class="media-object" style="margin-top:3px;">
													</div>
													<div class="media-body" style="width:100%;">
														<h4 class="media-heading font_weight m_top5 font_12">District</h4>
													</div>
												</div>
											</th>
											<th rowspan="3">
												<div class="media">
													<div class="media-left">
														<img src="Assests/images/Group 1251.png" class="media-object">
													</div>
													<div class="media-body" style="width:100%;">
														<h4 class="media-heading font_weight m_top5 font_12">Tainers</h4>
													</div>
												</div>
											</th>
											<th rowspan="3">
												<div class="media">
													<div class="media-left">
														<img src="Assests/images/book.png" class="media-object" style="margin-top:3px;">
													</div>
													<div class="media-body" style="width:100%;">
														<h4 class="media-heading font_weight m_top5 font_12">Courses</h4>
													</div>
												</div>
											</th>
											<th colspan="7">Tained Students</th>
										</tr>
										<tr>
											<th rowspan="2">Total</th>
											<th colspan="2">Engineering</th>
											<th colspan="2">Degree</th>
											<th colspan="2">Others</th>
										</tr>
										<tr>
											<th>count</th>
											<th>%</th>
											<th>count</th>
											<th>%</th>
											<th>count</th>
											<th>%</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><div class="companies_rounded">1</div></td>
											<td>Nellore</td>
											<td>Nellore</td>
											<td><u>3</u></td>
											<td><u>5</u></td>
											<td>1005</td>
											<td>404</td>
											<td>40.16%</td>
											<td>353</td>
											<td>35.13%</td>
											<td>353</td>
											<td>35.13%</td>
										</tr>
										<tr>
											<td><div class="companies_rounded">2</div></td>
											<td>Tirupati</td>
											<td>Chittoor</td>
											<td><u>3</u></td>
											<td><u>5</u></td>
											<td>1005</td>
											<td>404</td>
											<td>40.16%</td>
											<td>353</td>
											<td>35.13%</td>
											<td>353</td>
											<td>35.13%</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>-->
					</div>	
				</div>
			</div>
		</div>
	</div>
	<div class="panel-group" id="allDistricAccordion" role="tablist" aria-multiselectable="true">
		<div class="panel panel-default panel-white">
			<div class="panel-heading padding_15" role="tab" id="allDistrictHeading" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
				<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#allDistricAccordion" href="#allDistrictCollapse" aria-expanded="false" aria-controls="allDistrictCollapse">
					<h5 class="font_weight text-capital">Location Wise</h5>
				</a>
			</div>
			<div id="allDistrictCollapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="allDistrictHeading">
				<div class="panel-body">
					<div class="row mb_20">
						<div class="col-sm-2 pull-right">
							<select class="form-control chosen-select" id="locationWiseDistritSelId">
								<option value="0">All District</option>
							</select>
						</div>
					</div>
					<div id="trainingOverviewDetailsDivId"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="panel-group" id="allCollageAccordion" role="tablist" aria-multiselectable="true">
		<div class="panel panel-default panel-white">
			<div class="panel-heading padding_15" role="tab" id="allCollageHeading" style="box-shadow:0 3px 2px 1px rgba(0,0,0,0.2);">
				<a class="collapsed panelCollapseIconChangePE m_top20 color_black"role="button" data-toggle="collapse" data-parent="#allCollageAccordion" href="#allCollageCollapse" aria-expanded="false" aria-controls="allCollageCollapse">
					<h5 class="font_weight text-capital">College Wise</h5>
				</a>
			</div>
			<div id="allCollageCollapse" class="panel-collapse collapse" role="tabpanel" aria-labelledby="allCollageHeading">
				<div class="panel-body">
					<div class="row mb_20">
						<div class="col-sm-2 pull-right">
							<select class="form-control chosen-select" id="collageWiseDistritSelId">
								<option value="0">All District</option>
							</select>
						</div>
					</div>
					<div id="trainingOverviewCollegeWiseDivId"></div>
				</div>
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
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/SlickSliderNew/slick.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="Assests/js/apitaDashboardNew.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).on("click",".companiesClkCls",function(){
		$('.widthclass').css("width","95%");
		var id = $(this).attr("attr_id");
		var districtId = $(this).attr("attr_location");
		var collegeId = $(this).attr("attr_college_id");
		var specializationId = $(this).attr("attr_specialization");
		var qualificationId = $(this).attr("attr_qualification_id");
		var companyId = $(this).attr("attr_companyId");
		var name = $(this).attr("attr_name");
		var heading = $(this).attr("attr_head_Name");
		var blockName = $(this).attr("attr_block_name");
		$("#companiesModalId").modal("show");
		$("#companiesHeadingId").html(heading+'&nbsp;Details');
		if(blockName == "jobFairBlock"){
			if(name == "COMPANIES") {
				getTopCompaniesHiringDetails("companiesModalDivId",id,"");
			}else if(name == "REGISTERED") {
				getCandidatesOverViewDetails("registered Candidate","companiesModalDivId","",id,"","","")
			}else if(name == "SELECTED") {
				getCandidatesOverViewDetails("selected Candidate","companiesModalDivId","",id,"","","")
			}
		}else if(blockName == "trainingBlock"){
			if(name == "Courses") {
				if($(window).width()<800){
					$('.widthclass').css("width","95%");
				} else {
					$('.widthclass').css("width","50%");
				}
				getCoursesInfo("companiesModalDivId");
			}else if(name == "Trainers") {
				if($(window).width()<800){
					$('.widthclass').css("width","95%");
				} else {
					$('.widthclass').css("width","50%");
				}
				getTrainersInfo("companiesModalDivId");
			}else if(name == "Colleges") {
				getTrainingColleges("companiesModalDivId");
			}else if(name == "Trained Students") {
				getTrainingStudentDetails("companiesModalDivId","","","","","");
			}
		}else if(blockName == "PlacementsBlock"){
			if(name == "Registered Students") {
				getCandidatesOverViewDetails("registered Candidate","companiesModalDivId","","","","","");
			} else if(name == "Placed Students") {
				getCandidatesOverViewDetails("selected Candidate","companiesModalDivId","","","","","");
			}else if(name == "Colleges") {
				if($(window).width()<800){
					$('.widthclass').css("width","95%");
				} else {
					$('.widthclass').css("width","50%");
				}
				getPlacementCollegeDetails("companiesModalDivId");
			}else if(name == "Job Fairs") {
				getJobFairOverViewDetails("all","companiesModalDivId");
			} else  if(name == "Companies") {
				getTopCompaniesHiringDetails("companiesModalDivId","0","");
			}
		}else if(blockName == "topCompanies"){
			if(name == "MALE") {
				getCandidatesOverViewDetails("selected Candidate","companiesModalDivId","","","M",companyId,"");
			}else  if(name == "FEMALE") {
				getCandidatesOverViewDetails("selected Candidate","companiesModalDivId","","","F",companyId,"");
			}
		}else if(blockName == "trainingOverviewAllBlock"){
			if(name == "Courses") {
				if($(window).width()<800){
					$('.widthclass').css("width","95%");
				} else {
					$('.widthclass').css("width","50%");
				}
				getCoursesInfo("companiesModalDivId");
			} else if(name == "totalStudentsTrained") {
				getTrainingStudentDetails("companiesModalDivId","","","","","");
			} else {
				getTrainingStudentDetails("companiesModalDivId",qualificationId,"","","","");
			}
		} else if(blockName == "technicalBlock"){
			if(name == "trainedStudents") {
				getTrainingStudentDetails("companiesModalDivId","",companyId,"","","");
			} else {
				getTrainingStudentDetails("companiesModalDivId",qualificationId,companyId,"","","");
			}
		} else if(blockName == "locationWiseBlock"){
			if(name == "collages") {
				//getTrainingStudentDetails("companiesModalDivId","","",districtId);
			} else if(name == "total") {
				getTrainingStudentDetails("companiesModalDivId","","",districtId,"","");
			} else if(name == "technicalCount" || name == "nonTechnicalCount") {
				getTrainingStudentDetails("companiesModalDivId","","",districtId,specializationId,"");
			} else if(name == "registered") {
				getCandidatesOverViewDetails("registered Candidate","companiesModalDivId",districtId,"","","","");
			} else if(name == "placed") {
				getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtId,"","","","");
			}
		} else if(blockName == "collegeWiseBlock"){
			var districtVal= $("#collageWiseDistritSelId").val();
			if(name == "registered") {
				getCandidatesOverViewDetails("registered Candidate","companiesModalDivId",districtVal,"","","",collegeId);
			} else if(name == "placed") {
				getCandidatesOverViewDetails("selected Candidate","companiesModalDivId",districtVal,"","","",collegeId);
			} else if(name == "total") {
				getTrainingStudentDetails("companiesModalDivId","","",districtVal,"",collegeId);
			} else if(name == "technicalCount" || name == "nonTechnicalCount") {
				getTrainingStudentDetails("companiesModalDivId","","",districtVal,specializationId,collegeId); 
			}
		}
	});	
</script>
</body>
</html>