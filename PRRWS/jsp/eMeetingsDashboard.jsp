<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Panchayat Raj eMeetings</title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/Plugins/DateTime/bootstrap-datetimepicker-build.less" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/exportButtons.css" type="text/css" rel="stylesheet"/>
<link rel="stylesheet" type="text/css" href="Assests/Plugins/pdfexpand_prrws/source/jquery.fancybox.css" media="screen" />
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
					<h4 class="text-capital">Panchayat Raj</h4>
					<p>e-Meetings - DashBoard</p>
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
<section class="" style="padding: 10px;background-color: #DFDFE0;">
		<div class="container-fluid">
			<div class="row">
				<!--<div class="col-sm-2 m_top5">
					<h4 class="arrowIconChanged"><i class="glyphicon glyphicon-menu-hamburger" id="selectedName1" style="font-size:13px;cursor:pointer;"></i>&nbsp;&nbsp;<span id="selectedName" style="text-transform: uppercase;cursor:pointer;" attr_distId="" attr_levelid="2" attr_id="-1" title="Location Level">Andhra Pradesh </span></h4>
					<div class="multi-level-selection-menu arrow_box_top"></div>
				</div>-->
				<div class="col-sm-3  pull-right">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="glyphicon glyphicon-calendar"></i>
						</span>
						<input type="text" class="form-control" id="dateRangePicker" style="width: 200px;"/>
					</div>
				</div>
			</div>
		</div>
	</section>
<div class="container-fluid" style="padding-left: 0px;padding-right: 0px;">
	<div class="white-block" style="padding: 30px;">
		<div class="row">
			<div class="col-sm-12">
				<div class="media">
					<div class="media-left">
						<img src="Assests/images/Group 663.png" />
					</div>
					<div class="media-body">
						<h3 class="m_top10">Panchayati Raj - e Meetings</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="row m_top10">
			<div class="col-sm-12">
				<div class="yellow-bdr-div">
					<div id="emeetingsOverviewDivId"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<h4 class="m_top10">Panchayaties vs Meetings</h4>
			</div>
		</div>
		<div class="row m_top10">
			<div class="col-sm-12">
				<div class="yellow-bdr-div">
					<div id="pantVsMetingOvervwDivId"></div>
				</div>
			</div>
		</div>
		<div class="row m_top10">
			<div class="col-sm-12">
				<div id="levelWiseEmeetingsId"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="conductedMeetingModalDivId" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document" style="width:85%;margin:auto">
			<div class="modal-content">
			  <div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<button type="button" class="close" style="color: red;opacity: 0.8;font-size: 30px;" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h5 class="modal-title font_weight" id="conductedMeetingHeadingId" style="font-size: 16px;"></h5> 
					</div>
				</div>
				<div class="bg_mee_pop m_top10">
					<div class="row">
						<div class="col-sm-2 districtCls">
							<label>District</label>
							<select class="form-control chosen-select" id="districtId">
							</select>
						</div>
						<div class="col-sm-2 constituencyCls">
							<label>Constituency</label>
							<select class="form-control chosen-select" id="constituencyId">
							</select>
						</div>
						<div class="col-sm-2 mandalCls" >
							<label>Mandal</label>
							<select class="form-control chosen-select" id="mandalId">
							</select>
						</div>
						<div class="col-sm-2">
							<button class="btn btn-primary btn-sm font_weight getDetailsCls" style="margin-top: 26px;">GET DETAILS</button>
						</div>
					</div>
				</div>
				<div id="conductedMeetingDivId"></div>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			  </div>
		  </div>
	</div>
</div>
<div class="modal fade" id="meetingTypeModalDivId" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document" style="width:85%;margin:auto">
			<div class="modal-content">
			  <div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<button type="button" class="close modalCloseCls" style="color: red;opacity: 0.8;font-size: 30px;" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h5 class="modal-title font_weight" id="meetingTypeHeadingId" style="font-size: 16px;"></h5> 
					</div>
				</div>
				
				<div id="meetingDetailsDivId"></div>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-default modalCloseCls" data-dismiss="modal">Close</button>
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
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/Plugins/pdfexpand_prrws/source/jquery.fancybox.js"></script>
<script type="text/javascript" src="Assests/js/locationHierarchy.js"></script>
<script src="Assests/eMeetings/eMeetingsDashboard.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>