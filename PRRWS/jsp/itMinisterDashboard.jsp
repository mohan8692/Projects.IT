<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title> Designated Technology Park </title>
<link href="Assests/less/bootstrap.less" rel="stylesheet" type="text/less">
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<script src="Assests/Plugins/Less/less.js"></script>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"/>
<!--<link href="Assests/Plugins/RangeSlider/ion.rangeSlider.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/RangeSlider/ion.rangeSlider.skinHTML5.css" type="text/css" rel="stylesheet"/>-->
<link rel="stylesheet" type="text/css" href="Assests/Plugins/pdfexpand_prrws/source/jquery.fancybox.css" media="screen" />
<link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<script src="https://use.fontawesome.com/e94c241642.js"></script>
<style type="text/css">
    .panelCollapseIconChange::before {
        margin:0px !important;
    }
    .buildDetClkCls {
        cursor:pointer;
    }
    .propertyTableCls td, .propertyTableCls th {
        padding:4px !important;
    }
</style>
</head>

<header style="box-shadow:none !important;">
    <nav style="background-color: #334D62 !important;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-1 col-xs-3 pad_left0">
                    <img src="Assests/images/DTP-Logo.png" class="" style="border-right:3px solid #fff;padding: 10px;"/>
                </div>
                <div class="col-sm-10 m_top10 col-xs-9">
                    <h4 class="text-capital" style="color: #fff;font-weight: bold;font-size:26px;margin-top:0px;margin-left:10px;">DTP</h4>
                    <h5 class="text-capital m_top5" style="color: #fff;font-weight: bold;margin-left:10px;">Designated Technology Park</h5>
                </div>
            </div>
        </div>
    </nav>
</header>
<body>
    <div class="container-fluid m_top10">
        <div class="white-block" style="padding:15px;border-radius:5px;">
			<div class="row">
                <div class="col-sm-12">
                    <h4 class="font_weight text-capital font_16">Location - Properties Snapshot</h4>
                     <div class="m_top20 pad_border" id="districtWisePropartyDivId">
                     </div>
                </div>
            </div>
            <div class="pad_border m_top10">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="font_weight text-capital font_16">Complete - Properties Snapshot</h4>
                    </div>
                    <div class="col-sm-12 m_top10">
                        <div id="statusPropertiesDetailsDivId"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-7 pad_rt pad_rgt4">
                        <div class="panel panel-default mb_0">
                            <div class="panel-heading panelHeadStl">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <h4>Total Properties</h4>
                                            </div>
                                            <div class="col-sm-6">
                                                <h3 id="totPropertiesCntId"></h3>
                                                <h5 style="color:#aea3a3" id="totPropertiessqftCntId"></h5>
                                            </div>
                                        </div>      
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <h4>Government Approved</h4>
                                            </div>
                                            <div class="col-sm-6">
                                                <h3 id="goveApprovedCntId"></h3>
                                                <h5 style="color:#aea3a3" id="goveApprovedsqftCntId"></h5>
                                            </div>
                                        </div>      
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body" style="background-color:#E0E0E0;">
                                <div class="row">
                                    <div style="padding:0px 15px;">
                                        <h6 class="text_lt_blue font_weight">Property Status Overview</h6>
                                        <div class="m_top10" id="dtpStatusPropertiesDivId"></div>
                                    </div>
                                    <!--<div id="submitedPropertiesDivId"></div>
                                    <div id="governmentPropertiesDivId"></div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5 pad_left4 pad_lt">
                        <div class="panel panel-default mb_0">
                            <div class="panel-heading panelHeadStl">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <h4>Occupied Space</h4>
                                            </div>
                                            <div class="col-sm-5">
                                                <h3 id="occupiedSpaceCntId"></h3>
                                                <h5 style="color:#aea3a3" id="occupiedSpaceCntstId"></h5>
                                            </div>
                                        </div>      
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <h4>Available Space</h4>
                                            </div>
                                            <div class="col-sm-5">
                                                <h3 id="availableSpcCntId"></h3>
                                                <h5 style="color:#aea3a3" id="availableSpcCntstId"></h5>
                                            </div>
                                        </div>      
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body" style="background-color:#E0E0E0;">
                                <div class="row">
                                    <div class="col-sm-7 m_top5">
                                        <h6 class="text_lt_blue font_weight">Properties Occupancy overview</h6>
                                            <div id="propertyCompanyOverViewBlockId"></div>
                                    </div>      
                                    <div class="col-sm-5 m_top5">
                                        <h6 class="text_lt_blue font_weight">IT Company - Operational Readiness</h6>           
                                        <div class="white_block_border m_top10 pad_10">
                                            <h5 class="font_weight">Started</h5>
                                            <h4 class="font_weight m_top10 font_16" id="occupiedCompId"></h4>
                                            <hr style="margin:25px 0px; border-top:1px solid #ddd;">
                                            <h5 class="font_weight">Not Started</h5>
                                            <h4 class="font_weight m_top10 font_16" id="notOccupiedCompId"></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			<div class="row m_top20">
                <div class="col-sm-12">
                    <h4 class="font_weight text-capital font_16">Complete Application - Status Overview</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 m_top10">              
                    <div id="developerPropertyOverviewDetailsId"></div>
                </div>
                <div class="col-sm-6 m_top10">              
                    <div id="itCompanyPropertyOverviewDetailsId"></div>
                </div>
            </div>
            <div class="panel-group m_top20" id="PendingAccordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default panel-white" style="border:1px solid #ccc;">
                    <div class="panel-heading" role="tab" id="PendingHeadingOne" style="box-shadow:0 0 2px 2px rgba(0,0,0,0.2);">
                        <a class="panelCollapseIconChange collapsed"role="button" data-toggle="collapse" data-parent="#PendingAccordion" href="#PendingcollapseOne" aria-expanded="false" aria-controls="PendingcollapseOne" style="color:#333;">
                            <h4 class="font_weight text-capital font_16">Approval Process Flow</h4>
                        </a>
                    </div>
                    <div id="PendingcollapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="PendingHeadingOne">
                        <div class="panel-body">
							<div id="pendingLevelPropertiesDetailsId"></div>
                            <div id ="pendingTimeLineOverviewId"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!--<div class="row">
                <div class="col-sm-12">
                    <h4 class="m_top20 font_weight">Pending Timeline Overview</h4>
                    <div id ="pendingTimeLineOverviewId"></div>
                </div>
            </div>-->
            <div class="row m_top10">
                <div class="col-sm-12 ">
                    <!--<div class="row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-6"> 
                                     <div id="SubmitedPropertiesDivId"></div>
                                </div>
                                <div class="col-sm-6">
                                     <div id="GovernmentPropertiesDivId"></div>
                                </div>
                            </div>
                        </div>  
                        <div class="col-sm-6">
                            <div id="PropertiesOccupancyDivId"></div>
                        </div>
                    </div>-->
                    <h4 class="font_weight text-capital font_16">Table Overview</h4>
					<div class="pad_border m_top10">
						<div class="li_blocks" style="border-spacing:10px 0px;">
							<ul class="blocksCls">
								<li class="displayBlock">
									<label class="text-capital">Enterprise Type</label> 
									<select class="form-control select-chosen" id="userTypeId"> 
										<option value="1">Space Developer</option>
										<option value="2">IT Company </option>                              
									</select>
								</li>
								<li class="displayBlock">
									<label>DISTRICT</label> 
									<select class="form-control select-chosen" id="districtSelId"> 
										<option value="0">All</option> 
									</select>
								</li>
								<li class="displayBlock">
									<label>CITY</label> 
									<select class="form-control select-chosen" id="citySelId"> 
										<option value="0">All</option> 
									</select>
								</li>
								<li class="displayBlock">
									<label>COMPANY</label> 
									<select class="form-control select-chosen" id="companySelId"> 
										<option value="0">All</option> 
									</select> 
								</li>
								<li class="displayBlock">
									<label>PENDING LEVEL</label> 
									<select class="form-control select-chosen" id="pendingLevelSelId"> 
										<option value="0">All</option> 
									</select> 
								</li>
								<li class="displayBlock">
									<label>OCCUPANCY</label> 
									<select class="form-control select-chosen" id="occupancySelId"> 
										<option value="All">All</option> 
									</select> 
								</li>
								<li class="displayBlock">
									<button class="btn btn-success buildingOnChangeCls m_top50">Submit</button> 
								</li>
								<li class="displayBlock">
									<span class="tooltipTitle" id="spaceAvailabilityDivId" data-toggle="tooltip" title="CHECK AVAILABLE SPACE" style="cursor:pointer; position:relative; top:25px;"><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i></span>
								</li>
							</ul>
						</div>
						<!--<div class="row m_top10"> 
							<div class="col-sm-2"> 
								<label class="text-capital">Enterprise Type</label> 
								<select class="form-control select-chosen" id="userTypeId"> 
									<option value="1">Space Developer</option>
									<option value="2">IT Company </option>                              
								</select> 
							</div> 
							<div class="col-sm-2"> 
								<label>DISTRICT</label> 
								<select class="form-control select-chosen" id="districtSelId"> 
									<option value="0">All</option> 
								</select> 
							</div> 
							<div class="col-sm-2"> 
								<label>CITY</label> 
								<select class="form-control select-chosen" id="citySelId"> 
									<option value="0">All</option> 
								</select> 
							</div> 
							<div class="col-sm-2"> 
								<label>COMPANY</label> 
								<select class="form-control select-chosen" id="companySelId"> 
									<option value="0">All</option> 
								</select> 
							</div> 
							<div class="col-sm-2">
								<a class="tooltipTitle" title="PENDING LEVEL">
									<label class="ellipsis" style="color:#333;">PENDING LEVEL</label>
								</a>
								<select class="form-control select-chosen" id="pendingLevelSelId"> 
									<option value="0">All</option> 
								</select> 
							</div> 
							<div class="col-sm-2 occupancyCls"> 
								<label>OCCUPANCY</label> 
								<select class="form-control select-chosen" id="occupancySelId"> 
									<option value="All">All</option> 
								</select> 
							</div>
						</div>
						<div class="row">
							<div class="col-sm-1 pull-right"> 
								<button class=" m_top25 btn btn-success buildingOnChangeCls">Submit</button>
							</div>
						</div>--> 
						<!--<div class="row m_top10">
							<div class="col-sm-11">
								<div class="col-sm-7">
									<div class="row">
										<div class="col-sm-6">
											<div class="borderBlock pad_5">
												<h6 class="font_weight">IT USABLE PRICE</h6>
												<div class="m_top5 range-slider color-1 slider-container">
													<input type="text" class="js-range-slider" value="" id="itUsblPrcId" />
												</div>
											</div>
										</div>
										<div class="col-sm-6">
											<div class="borderBlock pad_5">
												<h6 class="font_weight">COMMON AREA PRICE</h6>
												<div class="m_top5 range-slider color-1 slider-container">
													<input type="text" class="js-range-slider" value="" id="commanArePrcId"/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-5">
									<div class="borderBlock pad_10">
										<h6 class="font_weight">BUILDING TYPE</h6>
										<div class="m_top20">
											<label class="containerChk checkbox-inline">Cold Shell
											  <input type="checkbox" checked="checked" attr_value=3>
											  <span class="checkmark"></span>
											</label>
											<label class="containerChk checkbox-inline">Plug & Play
											  <input type="checkbox" checked="checked" attr_value=1>
											  <span class="checkmark"></span>
											</label>
											<label class="containerChk checkbox-inline">Semi Plug & Play
											  <input type="checkbox" checked="checked" attr_value=2>
											  <span class="checkmark"></span>
											</label>
										</div>
									</div>
								</div>
							</div>
							 <div class="col-sm-1"> 
								<button class=" m_top25 btn btn-success buildingOnChangeCls">Submit</button>
							</div>
						 </div>-->
						<div id="locationWiseDetailsDivId"></div>
					</div>
                </div>
            </div>
        </div>  
    </div>
    <!-- Properties modal -->
    <div class="modal fade" id="propertyDetailsModalId" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="width:90%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="headingTitle"></h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-10  col-sm-offset-1 ">
                            <div id="pendingSummeryDivId"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div id="propertyDetailsDivId"></div>
                        </div>
                    </div>
                    
                </div>
                 <div class="modal-footer">     
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
            </div>
        </div>
    </div>

    <!--DTP Modal-->
    <div class="modal fade" id="DTPModalId" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="width:98%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close modal_cls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="headingTitle1"></h4>
                </div>
                <div class="modal-body">
                    <div class="panel panel-default" style="position:relative; margin-bottom:0px;">
                        <div class="panel-body">
                            <div id="mainBuildingImageId"></div>
                            <div class="overlay1">
                                <h2 class="color_blue font_weight addColorCss" id="buildingImageId" style="color:#fff;"></h2>
                                <h4 class="font_weight color_blue m_top10 addColorCss" id="buildingImageAddressId" style="color:#fff;"></h4>
                            </div>
                        </div>
                    </div>
                    <div class="bgcolor m_top10">
                        <div class="row">
                            <div class="col-sm-12">
                                <div id="builderWiseStatusDetailsDivId"></div>
                            </div>
                        </div>
                        <div class="row m_top20">
                        <div class="col-sm-12 ">
                            <div id="requisationDetailsDivId"></div> 
                        </div>
                    </div>
                    </div>  
                </div>
                <div class="modal-footer">     
                    <button type="button" class="btn btn-default modal_cls" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="docsModalDivId" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" style="width:70%;margin:auto">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close modalCloseCls closeSecondModal closeShowPdfCls" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title text-capital" id="viewDocumentHeading" style="font-weight: bold"></h4> 
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div id="docsViewModalId"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default modalCloseCls closeSecondModal closeShowPdfCls" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="spaceAvailabilityModelDetailsId"  role="dialog">
        <div class="modal-dialog" role="document" style="width:95%;">
            <div class="modal-content">
                 <div class="modal-header">
                     <button type="button" class="close" data-dismiss="modal">&times;</button>
                     <div class="row">
                        <div class="col-sm-4">
                            <h4 class="modal-title text-capital m_top10" style="font-weight: bold">Space Availability Details</h4> 
                        </div>
                        <div class="col-sm-6">
                            <div id="buildingCountsId"></div>
                        </div>
                        <div class="col-sm-1 pull-right">
                            <div class="row">
                                <ul class="list-inline">
                                    <li><span style="padding:0px 10px; background-color:#006FFF;"></span> &nbsp;Total</li>
                                    <li><span style="padding:0px 10px; background-color:#00945C;"></span> &nbsp;Available</li>
                                </ul>   
                            </div>
                        </div>
                    </div>      
                 </div>
                 <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="spaceAvailabilityId"></div>
                        </div>  
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div id="propertyDetailsModalDivId" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width:90%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="headingId"></h4>
                </div>
                <div class="modal-body">
                    <div id="subTableModalDivId"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
            
<script src="Assests/js/jquery-3.2.1.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js" type="text/javascript"></script>
<script type="text/javascript" src="Assests/Plugins/pdfexpand_prrws/source/jquery.fancybox.js"></script>
<!--<script src="Assests/Plugins/RangeSlider/ion.rangeSlider.js" type="text/javascript"></script>-->
<script src ="Assests/itMinisterDashboard/itMinisterDashboard.js" type = "text/javascript" ></script>
</body>
<script type="text/javascript">
/* var $range = $(".js-range-slider");
$range.ionRangeSlider({
    type: "double",
    min: 0,
    max: 250,
    from: 0,
    prefix: "Rs",
    values_separator:"->"
}); */
/* $(document).on("click",".buildingOnChangeCls",function (e) {
    e.preventDefault();
    var slider = $("#itUsblPrcId").data("ionRangeSlider");      
    var from = slider.result.from
    var to = slider.result.to
    alert("Result: from: " + from + " to: " + to);
}); */
</script>
</html>