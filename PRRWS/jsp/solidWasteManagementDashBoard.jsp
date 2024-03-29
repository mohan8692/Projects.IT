<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Solid Waste Management Dashboard</title>
<link href="Assests/css/bootstrap.css" rel="stylesheet" type="text/css"/>
<link href="Assests/css/custom.less" rel="stylesheet" type="text/less"/>
<link href="Assests/css/responsive.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/DataTable/dataTable.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Date/daterangepicker.css" type="text/css" rel="stylesheet"/>
<link href="Assests/Plugins/Scroller/jquery.mCustomScrollbar.css" type="text/less" rel="stylesheet"/>
<link href="Assests/Plugins/Chosen/chosen.css" type="text/css" rel="stylesheet"/>
<link href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css" type="text/css" rel="stylesheet">
<script src="https://use.fontawesome.com/07d3416f74.js"></script>
<script src="Assests/Plugins/Less/less.js"></script>
 <link rel="stylesheet" type="text/css" href="Assests/SimplePagination/simplePagination.css"/>
	<style>
		@media(min-width: 768px) and (max-width: 991px){
			.swm_blocks h4{
				font-size: 15px !important;
				
			}
			.swm_blocks h5{
				font-size:12px;
			}
			
			.tot_vehicles{
				font-size: 10px !important;
			}
			#gpId{
				font-size: 12px;
			}
			.gpImg{
				width: 50px;
				height: 25px;
			}
			.gp_block{
				padding: 0px;
			}
			#swmModal .swm_collection img{
				width: 23px;
			}
			.well_block p{
				font-size: 12px !important;
			}
			.headingcls span{
				font-size: 13px !important;
			}
			
		}
		@media(min-width: 1200px) and (max-width: 1360px){
			.well_block{
				text-align: center !important;
				
			}
		}
		#swgInfTable tr td,.regVehicles td{
			border-top: 0px !important;
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
					<p>SOLID WASTE MANAGEMENT - AP</p>
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
	
	<section>
		<div class="" style="margin:0px;">
				<div class="row" style="background-color:#fff;padding:5px;width:100%;padding:5px;">
					<div class="col-sm-12">
						<div class="col-sm-3 pull-right">
							<div class="input-group pull-right">
								<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i>
								</span>
								<input class="form-control" type="text" id="singleDateRangePicker"/>
							</div>
						</div>
					</div>
				</div>
			</div>
	</section>
</header>
<main>
	<div class="container">
		<section>
			<div class="row">
				<div class="col-sm-12">
					<div class="row white_block_swm">
						<div id="swmInfraustructure">
							<div class="col-sm-6">
									<div class="row swm_blocks" style="border: 1px solid lightgrey;padding:15px;margin:2px">
									<h4 style="padding:10px" class="headingcls"><img src="Assests/icons/swm/Group 2186.png" style=""><b style="padding-left:10px">SWM-INFRASTRUCTURE OVERVIEW</b></h4>
									<div class="col-sm-12 m_top_bottom p_top_bottom" style="border:1px solid lightgrey">
										<div class="row">
											<div class="col-sm-8">
												<h5><b>RFID TAGGED HOUSES</b></h5>
												<div class="media">
													<div class="media-left">
														<img src="Assests/icons/swm/Group 2188.png">
													</div>
													<div class="media-body">
														<h5><b>RFID TAGGED HOUSES</b></h5>
														<p>Solid Waste / Garbage</p>
													</div>
												</div>
											</div>
											<div class="col-sm-4">
												<div class="well well_block" style="margin-top:10px; margin-bottom:10px !important;">
													<h4 class="text-center"><b id="rfidTaggedHouses"></b></h4>
												</div>
											</div>
										</div>
										
									</div>
									<div class="col-sm-12 p_top_bottom m_top_bottom " style="border:1px solid lightgrey">
										<div class="row">
											<div class="col-sm-8">
												<h5><b>REGISTRED FARMERS</b></h5>
												<div class="media">
													<div class="media-left">
														<img src="Assests/icons/swm/Group 2193.png">
													</div>
													<div class="media-body">
														<h5><b>FARMERS</b></h5>
														<p>Cattle Dung</p>
													</div>
												</div>
											</div>
											<div class="col-sm-4">
												<div class="well well_block" style="margin-top:10px; margin-bottom:10px !important;">
													<h4 class="text-center"><b id="registeredFarmers"></b></h4>
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-12 p_top_bottom  m_top_bottom" style="border:1px solid lightgrey">
										<div class="row">
											<div class="col-sm-12 col-md-8">
												<h5><b>GREEN AMBASSADOR's <br/><span style="font-size:10px">MAN POWER</span></b></h5>
												<table class="table" id="swgInfTable">
													<tr style="padding:10px">
														<td><img src="Assests/icons/swm/Group 2190.png"></td>
														<td>MGNREGS</td>
														<td id="mgnrgsId"></td>
													</tr>
													<tr style="padding:10px">
														<td><img src="Assests/icons/swm/Group 2191.png"></td>
														<td>PR</td>
														<td id="prId"	></td>
													</tr>
													<tr style="padding:10px">
														<td><img src="Assests/icons/swm/Group 2195.png"></td>
														<td>PUBLIC</td>
														<td id="publicId"></td>
													</tr>
												</table>
											</div>
											<div class="col-sm-12 col-md-4">
												<div class="well well_block" style="margin-top:10px; margin-bottom:10px !important;">
													<h5>TOTAL MAN POWER</h5>
													<h4><b id="totalManPower"></b></h4>
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-12 p_top_bottom m_top_bottom" style="border:1px solid lightgrey; padding-bottom:0px !important;">
										<div class="row">
											<div class="col-sm-12 col-md-8 regVehicles">
												<h5><b>REGISTERED VEHICLES</b></h5>
												<table class="table">
													<tr>
														<td><img src="Assests/icons/swm/tractor-front.png"></td>
														<td><img src="Assests/icons/swm/auto-ricksaw.png"></td>
														<td><img src="Assests/icons/swm/tricycle.png"></td>
														<td><img src="Assests/icons/swm/Group 2194.png"></td>
													</tr>
													<tr>
														<td id="tractorId"></td>
														<td id="autoId"></td>
														<td id="trycycleId"></td>
														<td id="evehicleId"></td>
													</tr>
													
												</table>
											</div>
											<div class="col-sm-12 col-md-4">
												<div class="well well_block" style="margin-top:10px; margin-bottom:10px !important;">
													<h5 class="tot_vehicles">TOTAL VEHICLES</h5>
													<h4><b id="totalRegVehicles"></b></h4>
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-12 p_top_bottom m_top_bottom" style="border:1px solid lightgrey">
										<div class="row">
											<!--<h5 style="padding: 5px 15px"><b>BLOCKED GP'S</b></h5>
											<div class="col-sm-4 gp_block">
												<div class="well well_block" style="margin-top:10px; margin-bottom:10px !important;">
													<h5>GP</h5>
													<h4 id="gpId"><b ></b></h4>
												</div>
											</div>
											<div class="col-sm-4" style="padding:20px">
												<img src="Assests/icons/swm/Group 2238.png" class="gpImg">
											</div>
											<div class="col-sm-4 pull-right gp_block">
												<div class="well well_block" style="margin-top:10px; margin-bottom:10px !important;">
													<h5>BLOCKS</h5>
													<h4><b id="blocksId"></b></h4>
												</div>
											</div> -->
											<div class="col-sm-12">
												<h5><b>  RFID TRACKING <br/></b></h5>
												<div class="row text-center">
													<div class="col-md-4">
														<div class="well well_block" style="margin-top:10px; margin-bottom:10px !important;">
															<h6 class="tot_vehicles"><b>ACHIEVED TODAY</b></h6>
															<h4><b id="trackingId" style="color:#FFC0CB;"></b></h4>
														</div>
													</div>
													<div class="col-sm-12 col-md-4">
														<div class="well well_block" style="margin-top:10px">
															<h6 class="tot_vehicles"><b>ACHIEVED INTIME</b></h6>
															<h4><b id="intimeId" style="color:#92DD5A;"></b></h4>
														</div>
													</div>
													<div class="col-sm-12 col-md-4">
														<div class="well well_block" style="margin-top:10px">
															<h6 class="tot_vehicles"><b>ACHIEVED OUTTIME</b></h6>
															<h4><b id="outtimeId" style="color:#1076F1;"></b></h4>
														</div>
													</div>
													
													
											 </div>
												
												<!--<h4 style="padding:15px;color:#fff;background-color:#00A85A">RFID TRACKING<i class="glyphicon glyphicon-ok pull-right" style="color:#00A85A;background-color:#fff;padding:5px;border-radius:14px;margin-top:-5px;margin-left:5px"></i><span class="pull-right">%</span><span id="rfidTracking" class="pull-right"></span></h4>-->
											</div> 
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-6">
								<div  class="row swm_blocks" style="border: 1px solid lightgrey;padding:15px">
								<h4 style="padding:10px" class="headingcls"><img src="Assests/icons/swm/Group 2187.png"><b style="padding-left:10px">SWM-VERMI COMPOST (TROUGH-PIT)</b></h4>
								<div class="col-sm-12 p_top_bottom m_top_bottom" style="border:1px solid lightgrey; margin-bottom:20px !important;">
									<h5 style="display:inline-block;"><b>TOTAL SWM COLLECTION<br/><span style="font-size:10px;float:right">TON'S</span></b></h5>
									<div class="clearfix"></div>
									<div class="col-sm-6 col-md-4 swm_collection">
										<div class="media">
											<div class="media-left">
												<img src="Assests/icons/swm/Group 2188.png">
											</div>
											<div class="media-body">
												<h5><b>HOUSES</b></h5>
												<P>Solid Waste / Garbage</P>
												<h4 class="m_top20"><b id="solidWasteId"></b></h4>
												<span style="font-size:10px">TON's</span>
											</div>
										</div>
									</div>
									<div class="col-sm-6 col-md-4 TOTAL swm_collection">
										<div class="media">
											<div class="media-left">
												<img src="Assests/icons/swm/Group 2193.png">
											</div>
											<div class="media-body">
												<h5><b>FARMERS</b></h5>
												<P>Cattle Dung</P>
												<h4  class="" style="margin-top: 40px"><b id="farmerCattleDung"></b></h4>
												<span style="font-size:10px">TON's</span>
											</div>
										</div>
									</div>
									
									<div class="col-sm-6 col-md-4">
										<div class="well well_block">
											<h4><b id="totSwmId"></b></h4>
											<p>TON'S</p>
										</div>
									</div>
								</div>
								<h5><b>STAGE-I</b></h5>
								<div class="col-sm-12 m_top_bottom p_top_bottom" style="border:1px solid lightgrey; margin-bottom:5px !important;">
									<div class="row">
										<div class="col-sm-8">
											<p class="m_top20"><img src="Assests/icons/swm/Group 2338.png"><b style="padding-left:20px">NADAP - PITS</b></p>
										</div>
										<div class="col-sm-4" style="margin-top:10px">
											<div class="well well_block m_top5">
												<h4><b id="stageOneId"></b></h4>
												<p>TON'S</p>
											</div>
										</div>
										</div>
								</div>
								<h5><b>STAGE-II</b></h5>
								<div class="col-sm-12  m_top_bottom" style="border:1px solid lightgrey; margin-bottom:5px !important;">
									<div class="row">
										<div class="col-sm-8">
											<p class="m_top20"><img src="Assests/icons/swm/Group 2337.png"><b style="padding-left:20px">VERMI - PITS</b></p>
										</div>
										<div class="col-sm-4" style="margin-top:10px">
											<div class="well well_block m_top5">
												<h4><b id="stageTwoId"></b></h4>
												<p>TON'S</p>
											</div>
										</div>
										</div>
								</div>
								<h5><b>STAGE-III</b></h5>
								<div class="col-sm-12  m_top_bottom" style="border:1px solid lightgrey; margin-bottom:5px !important;">
									<div class="row">
										<div class="col-sm-8">
											<p class="m_top20"><img src="Assests/icons/swm/Group 2336.png"><b style="padding-left:20px">VERMI STOCK</b></p>
										</div>
										<div class="col-sm-4" style="margin-top: 10px">
											<div class="well well_block m_top5">
												<h4><b id="stageThreeId"></b></h4>
												<p>TON'S</p>
											</div>
										</div>
										</div>
								</div>
								<h5><b>PACKAGE STOCK DETAILS</b></h5>
								<div class="col-sm-12  m_top_bottom" style="border:1px solid lightgrey; margin-bottom:5px !important;">
									<div class="row">
											<table class="table">
												<tr>
													<th>1 KG<br/><b style="font-size:10px">BAGS</b></th>
													<th>5 KG<br/><b style="font-size:10px">BAGS</b></th>
													<th>10 KG<br/><b style="font-size:10px">BAGS</b></th>
													<th>25 KG <br/><b style="font-size:10px">BAGS</b></th>
													<th>50 KG <br/><b style="font-size:10px">BAGS</b></th>
												</tr>
												<tr>
													<td><b id="onekgCount"></b></td>
													<td><b id="fivekgCount"></b></td>
													<td><b id="tenkgcount"></b></td>
													<td><b id="twentyfivekgCount"></b></td>
													<td><b id="fiftykgCount"></b></td>
												</tr>
											</table>
									</div>
								</div>
							</div>
							
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-sm-12 m_top10">
					<div class="row">
						<div id="levelWiseOverviewId"></div>
					</div>
					
				</div>
				
			</div>
			
			<div class="modal fade" id="swmModal" role="dialog">
    <div class="modal-dialog modal-lg" style="width:90%;margin:auto">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header" style="background-color:#333;color:#fff">
			<h4 id="onclickDistName" style="display:inline-block" class="text-center text-capital"></h4>
          <button type="button" class="close" data-dismiss="modal" style="color:#fff">&times;</button>
          
        </div>
        <div class="modal-body">
			<div class="row">
				<div id="swmModalContent"></div>
				<div  class="col-sm-12 m_top10">
					<div id="gpsCountBlockId"></div>
				</div>
			</div>
          
        </div>
       
      </div>
      
    </div>
  </div>
		</section>
	</div>
</main>
<script src="Assests/js/jquery-1.11.3.js" type="text/javascript"></script>
<script src="Assests/js/bootstrap.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/moment.js" type="text/javascript"></script>
<script src="Assests/Plugins/Date/daterangepicker.js" type="text/javascript"></script>
<script src="Assests/Plugins/Chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTable.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/exportButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/jsZip.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/pdf.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/v5font.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/htmlButtons.js" type="text/javascript"></script>
<script src="Assests/Plugins/DataTable/dataTables.fixedColumns.min.js" type="text/javascript"></script>
<script src="Assests/Plugins/Scroller/jquery.mCustomScrollbar.js"></script>
<script type="text/javascript" src="Assests/js/locationHierarchy.js"></script>
<script src="Assests/solidWasteManagement/solidWasteManagement.js" type="text/javascript"></script>
<script src="Assests/Menu/menu.js" type="text/javascript"></script>
</body>
</html>