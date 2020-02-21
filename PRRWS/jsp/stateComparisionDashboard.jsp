<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>State Comparison Dashboard</title>
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
	.chosen-container{
		width:150px !important;
		border: 1px solid #ccc;
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
					<p><span class="headerTypeCls"></span>Comparison Dashboard</p>
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
<section class="" style="padding: 10px;background-color: #E6E6E6;">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<ul class="list-inline">
					<li>
						<ul class="list-inline switch-btn-New comparisionCls">
							<li class="active" attr_type="state">States Comparison</li>
							<li attr_type="district">Districts Comparison</li>
						</ul>
					</li>
					<li style="display:none;" class="districtCls">
						<label>District : </label>
						<select class="form-control chosen-select" id="districtId">
							<option value="0">Select District</option>
						</select>
					</li>
					<li class="pull-right">
						<label style="margin-top: 7px;margin-right: 30px;">Last Updated Time : <span id="lastUpdatedTimeId"></span></label>
					</li>
					<li class="pull-right">
						<label>Financial Year : </label>
						<select class="form-control chosen-select" id="finicalYearId">
							<option value="0">Select Financial Year</option>
						</select>
					</li>
				</ul>
			</div>
			
			
		</div>
	</div>
</section>	
<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">
	<div class="white-block" style="padding:15px;">
		<div class="row">	
			<div class="col-sm-12">
				<h4 class="font_weight" id="financialNameId"></h4>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-3 m_top10">
				<div class="panel panel-default block_shadow">
				  <div class="panel-body">
					<h5 class="font_weight text-capital f_13">Overview Ranking - <span class="levelTypeCls"></span></h5>
					<div class="row">
						<div id="rankingOverview"></div>
					</div>
				  </div>
				</div>
			</div>
			<div class="col-sm-9 m_top10">
				<div class="panel panel-default block_shadow">
				  <div class="panel-body">
					<h5 class="font_weight text-capital f_13">Overview Components - <span class="levelTypeCls"></span></h5>
					<div class="row">
						<div id="componentsOverview"></div>
					</div>
				  </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 m_top10">
				<div class="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading1">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion1" href="#collapse1" aria-expanded="true" aria-controls="collapse1">
							<h4 class="panel-title text-capital">All <span class="comparisionHeadingCls"></span> Comparison Details</h4>
							</a>
						</div>
						<div id="collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading1">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<div id="allStatesComparisonDetails"></div>
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
				<div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading2">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion2" href="#collapse2" aria-expanded="true" aria-controls="collapse2">
							<h4 class="panel-title text-capital">Top Rank <span class="comparisionHeadingCls"></span></h4>
							</a>
						</div>
						<div id="collapse2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading2">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<ul class="list-inline rankCss">
											<li class="pad_5 m_top_bottom_5 border_yash">Top 5 Rank <span class="comparisionHeadingCls"></span> <input  class="pull-right m_left_10 state top5Cls" id="rankCheckedId" type="checkbox" name="sates1"  value="5" checked></li>
											<li class="pad_5 m_top_bottom_5 border_yash">Top 10 Rank <span class="comparisionHeadingCls"></span> <input class="pull-right m_left_10 state rankCls" type="checkbox" name="sates2"  value="10"></li>
											<li class="pad_5 m_top_bottom_5 border_yash showHideBasedOnCompCls">Top 15 Rank <span class="comparisionHeadingCls"></span> <input class="pull-right m_left_10 state rankCls" type="checkbox" name="sates3"  value="15"></li>
											<li class="pad_5 m_top_bottom_5 border_yash showHideBasedOnCompCls">Top 20 Rank <span class="comparisionHeadingCls"></span> <input class="pull-right m_left_10 state rankCls" type="checkbox" name="sates4"  value="20"></li>
											<li class="pad_5 m_top_bottom_5 border_yash">ALL Ranks <input class="pull-right m_left_10 state rankCls" type="checkbox" name="sates5"  value="999"></li>
										</ul>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<div id="allStatesComparison"></div>
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
				<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					<div class="panel panel-default panel-brown">
						<div class="panel-heading" role="tab" id="heading">
							<a role="button" class="panelCollapseIcon"  data-toggle="collapse" data-parent="#accordion" href="#collapse" aria-expanded="true" aria-controls="collapse">
							<h4 class="panel-title text-capital"><span class="levelTypeCls"></span> vs Financial Year Ranking</h4>
							</a>
						</div>
						<div id="collapse" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading">
							<div class="panel-body">
								<div class="row">
									<div class="col-sm-12">
										<div id="apVsFinancialYearRanking"></div>
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
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mousewheel.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/DateTime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/stateComparisonDashboard/stateComparisonDashboard.js"></script>
</body>
</html>