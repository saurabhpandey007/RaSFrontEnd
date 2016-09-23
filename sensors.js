var app = angular.module("app", []);
		app.service("sensorservice",function(){
			
			var productList = [];

			  var addProduct = function(newObj) {
			      productList.push(newObj);
			  };

			  

			  return {
			    addProduct: addProduct,
			    getProducts: function(){
				      return productList;
			    }
			  }
			
			
		});
		app.controller("admincont", function($scope, $window, $http,sensorservice)
				{
					
					$scope.view = function()
					{
						
						
						var e1 = document.getElementById("selectBuilding");
						var building = e1.options[e1.selectedIndex].value;
						var index1=e1.selectedIndex;
						
						var e2 = document.getElementById("selectFloor");
						var floor = e2.options[e2.selectedIndex].value;
						
						var index2=e2.selectedIndex;
						
						if(index1==0 && building !="CT1" && index2==0 && floor !="1" )
							{
							alert('please select both the values');
							}
						else if(index1==0 && building =="CT1" && index2==0 && floor !="1")
						{
						alert('please select both the values');
						}
						else if(index1==0 && building !="CT1" && index2==0 && floor =="1")
						{
						alert('please select both the values');
						}
						
						else{
					
						var req = 
							{
								method : 'POST',
								url : 'http://localhost:8888/Room_automation/rest/room/view',
								headers: {
									   'Content-Type': 'Application/json'
									 },
								data : 
									{
										buildg : $scope.room.building,
										floor : $scope.room.floor
									}
							}
						
						var response = $http(req);
						response.success(function(data)
								{
									$scope.rooms = data;
								})
								
						response.error(function(data)
								{
									bootbox.alert("error" , function(result){
										if(result === true)
											$window.location = "viewRooms.html";
									});
								})	
								
						}
					};
					
					
					$scope.viewRoomSensorDetail=function(rid)
					{
						var req =
						{
							method : 'POST',
							url : 'http://localhost:8888/Room_automation/rest/sensordetails/view',
							headers: {
						   		'Content-Type': 'Application/json'
						 	},
							data : {
								roomid : rid
							}
						}
						
						var response = $http(req);
						
						response.success(function(data)
								{
									bootbox.alert("Sensors::"+data, function(result){
										if(result=== true)
											{
												$window.location = "viewRooms.html";
											}
									})
								})
								
						response.error(function(data)
								{
									bootbox.alert("no sensors in room" , function(result){
										if(result === true)
												$window.location = "viewRooms.html";
										});
									});	
						
					};
					
					
					$scope.deletefun = function(id) 
					{
						bootbox.confirm("Do you really want to Delete?", function(result){
							if(result=== true)
								{
									var req =
									{
											method : 'POST',
											url : 'http://localhost:8888/Room_automation/rest/room/delete',
											headers: {
												'Content-Type': 'Application/json'
											},
											data : {
												roomid : id
											}
									};
						
									var response = $http(req);
									response.success(function(data)
											{
												bootbox.alert("deleted Successfully" , function(result){
													if(result === true)
														$window.location = "adminLogin.html";
												});
											});
					
									response.error(function(data)
											{
												bootbox.alert("Error" , function(result){
													if(result === true)
														$window.location = "viewRooms.html";
												});
											})
								}
						})
						{
							
						}
					};	
				});
		
		app.controller('mainsensors',function($scope,sensorservice){
			$scope.product = sensorservice.getProducts;
			console.log($scope.product);
			
		});
		
		app.controller("sensorcont", function($scope, $window, $http)
				{
					$scope.show = function()
					{
						var response = $http.get('http://localhost:8888/Room_automation/rest/sensor/view');
						response.success(function(data)
						{
							$scope.sensors = data;	
						});
						
						response.error(function(data)
						{
							bootbox.alert("Error" , function(result){
								if(result === true)
									$window.location = "viewsensors.html";
							});
						})
					}
					
					$scope.editsensor = function()
					{
						$window.location = "editsensor.html";
					}
				});

		app.controller("editroom" , function($scope, $window, $http)
				{
					$scope.sensor = 
						{
							sensortype : '',
							frequency : ''
						};
					
					$scope.edited = function()
					{
						var req = 
							{
								method : 'POST',
								url : 'http://localhost:8888/Room_automation/rest/sensor/add',
								headers: {
									   'Content-Type': 'Application/json'
									 },
								data : 
									{
										sensortype : $scope.sensor.sensortype,
										frequency : $scope.sensor.frequency
									}
							};
						
						var response = $http(req);
						response.success(function(data)
						{
							bootbox.alert(data , function(result){
								if(result === true)
									$window.location = "adminLogin.html";
							});
						});
						
						response.error(function(data)
						{
							bootbox.alert("Invalid Input" , function(result){
								if(result === true)
									$window.location = "addsensor.html";
							});
						});
						
					}
				})	
