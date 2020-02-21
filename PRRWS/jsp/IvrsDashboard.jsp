<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>IVRS Dashboard</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style>
section{
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16) !important;
	background-color: #f2f2f2;
	border: solid 1px #dbd6d6;
	padding-top: 10px;
	padding-bottom: 10px;	
}
.closeIVRS{
	color: #f90e0e !important;
	opacity:1 !important;
}
.dot {
  height: 12px;
  width: 12px;
  background-color: #06ff00;
  border: 1px solid #eb933c;
  border-radius: 50%;
  display: inline-block;
  line-height: 30px;
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
					<h4 class="text-capital">Panchayat Raj,RD&News</h4>
					<p>Service Satisfaction IVRS</p>
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
<section>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-xs-12 m_top10 pull-right">
				<div class="input-group inline-block">
					<span class="input-group-addon">
						<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
					</span>
					<input class="form-control" id="dateRangePickerIVRS" type="text" style="width:190px;cursor:pointer;">
				</div>
			</div>
			<div class="col-sm-2 col-xs-12 m_top10 pull-right">
				<select class="form-control chosen-select" id="deptsIVRSId">					
				</select>
			</div>
		</div>
	</div>
</section>	
<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">
	<div class="ivrsDivCls" style="background-color:#fafafa;">
		<div class="row">
			<div class="col-sm-12">					
				<div class="white-block pad_15 m_top10" style="box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);">					
					<div id="ivrsOverViewDivId"></div>
				</div>
				
				<div class="row m_top10">
					<div class="col-sm-12">
						<div class="panel-group" id="accordiondeptWise" role="tablist" aria-multiselectable="true">
							<div class="panel panel-default panel-black">
								<div class="panel-heading" role="tab" id="headingOnedeptWise">
									<a class="panelCollapseIcon ivrs2 panel-title" role="button" data-toggle="collapse" data-parent="#accordiondeptWise" href="#collapseOnedeptWise" aria-expanded="false" aria-controls="collapseOnedeptWise" style="text-decoration:none !important;">
										<h4 class="text-capital font_weight f_16">Department Wise details </h4>
									</a>
								</div>
								<div id="collapseOnedeptWise" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOnedeptWise">
									<div class="panel-body">
										<div class="row">
											<div class="col-sm-6 pull-right">												
												<div class="col-sm-6 pull-right">
													<ul class="list-inline pull-right getDeptWiseCls switch-btn-New">
														<li class="active" attr_type="consolidated">Consolidated</li>
														<li attr_type="monthWise">Month Wise</li>
													</ul>
												</div>
												<div class="col-sm-6 pull-right">	
													<div id="deptFilterCls" class="pull-right" style="display:none;">
														<label class="f_15" style="margin-right: 10px;"><input id="deptPercId"type="radio" name="deptFilter" value="percentage" checked>&nbsp;&nbsp;Percentage</label>
														<label class="f_15"><input type="radio" name="deptFilter" value="count">&nbsp;&nbsp;Count</label>
													</div>
												</div>
											</div>
										</div>
										<div id="ivrsdeptWiseDetailsDivId"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row m_top10">
					<div class="col-sm-12">
						<div class="panel-group" id="accordionschemeWise" role="tablist" aria-multiselectable="true">
							<div class="panel panel-default panel-black">
								<div class="panel-heading" role="tab" id="headingOneschemeWise">
									<a class="panelCollapseIcon ivrs2 panel-title collapsed" role="button" data-toggle="collapse" data-parent="#accordionschemeWise" href="#collapseOneschemeWise" aria-expanded="false" aria-controls="collapseOneschemeWise" style="text-decoration:none !important;">
										<h4 class="text-capital font_weight f_16">Schemes Wise details </h4>
									</a>
								</div>
								<div id="collapseOneschemeWise" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOneschemeWise">
									<div class="panel-body">
										<div class="row">
										<div class="col-sm-6 pull-right">
											<div class="col-sm-6 pull-right">
												<ul class="list-inline pull-right getSchemeWiseCls switch-btn-New">
													<li class="active" attr_type="consolidated">Consolidated</li>
													<li attr_type="monthWise">Month Wise</li>
												</ul>
											</div>
											<div class="col-sm-6 pull-right">
												<div id="schemeFilterCls" class="pull-right" style="display:none;">
													<label class="f_15" style="margin-right: 10px;"><input id="schemePercId" type="radio" name="schemeFilter" value="percentage" checked>&nbsp;&nbsp;Percentage</label>
													<label class="f_15"><input type="radio" name="schemeFilter" value="count">&nbsp;&nbsp;Count</label>
												</div>
											</div>
										</div>
										</div>
										<div id="ivrsschemeWiseDetailsDivId"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div id="ivrsQuestionsDivId"></div>
				
				<div class="white-block pad_15  m_top25" style="box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);">					
					<div class="row">
						<div class="col-sm-12">	
							<div class="pad_border m_top10" style="background-color: #fff0fd !important;">
								<div class="row">
									<div class="col-sm-2">
										<label>Department</label>
										<select class="form-control chosen-select" id="deptLocId">											
										</select>
									</div>
									<div class="col-sm-2">
										<label>Service</label>
										<select class="form-control chosen-select" id="serviceDivId">											
										</select>
									</div>
									<div class="col-sm-3">
										<label>Questions</label>
										<select class="form-control chosen-select" id="questionsDivId">											
										</select>
									</div>
									<div class="col-sm-1">
										<button type="button" class="btn btn-primary m_top25" id="locationWiseSubmit">Submit</button>
									</div>
								</div>
							</div>
							<div class="white-block pad_15  m_top25" style="box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);">
								<div class="row">
									<div class="col-sm-4">
										<h4 class="font_weight text-capital f_16">Satisfaction Trending </h4>
									</div>
									<!--<div class="col-sm-7">
										<div id="deptsGraph" class="pull-right"></div>
									</div>-->
									<div class="col-sm-2 pull-right" style="width:120px;">
										<select class = "form-control chosen-select" id="yeardDivId">
											<option value="2018" selected>2018</option>								
											<option value="2017">2017</option>								
										</select>
									</div>
									<div class="col-sm-12">
										<div id="satisfactionTrendingChartDivId" style="height:300px;"></div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-4 m_top10">
									<h4 class="font_weight text-capital f_16">Location Wise Details</h4>
								</div>								
								<div class="col-sm-8 pull-right">									
									<div class="col-sm-4 m_top10 pull-right">
										<ul class="list-inline pull-right getMonthAndConsoliadtedCls switch-btn-New">
											<li class="active" attr_type="consolidated">Consolidated</li>
											<li attr_type="monthWise">Month Wise</li>
										</ul>
									</div>
									<div class="col-sm-8 m_top10 pull-right">
										<div id="locFilterCls" class="pull-right" style="display:none;">
											<label class="f_15" style="margin-right: 10px;"><input id="locPercId" type="radio" name="locFilter" value="percentage" checked>&nbsp;&nbsp;Percentage</label>
											<label class="f_15"><input type="radio" name="locFilter" value="count">&nbsp;&nbsp;Count</label>
										</div>
									</div>
								</div>
							</div>
							
							<div id="IVRSLocationWiseDetailsDivId" class="m_top10"></div>
						</div>
					</div>		
				</div>
				
			</div>
		</div>
	</div>
</div>
<!-- modal -->
<div class="modal fade" tabindex="-1" id="ivrsQuestionModalId" role="dialog" style="z-index:99999;">
	<div class="modal-dialog" style="width:85%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close closeIVRS" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title text-capital" id="ivrsModalHeadingId"></h4>  
			</div>
			<div class="modal-body">
				<div id="IVRSQuestionsModalId"></div>
				<div id="IVRSQuesDetailsModalId"></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default closeShowPdfCls" data-dismiss="modal">Close</button>
			</div>	
		</div>
	</div>
</div>
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Highcharts/highcharts.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/IvrsDashboard/IvrsDashboard.js"></script>
<script type="text/javascript">
	var globalDeptId = 0;	
	globalDeptId = "${param.deptId}";
	
</script>
</body>

</html>