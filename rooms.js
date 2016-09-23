$(document).ready(function() {
    $("select#ddl2").hide();
	$("select#ddl3").hide();
	$("select#ddl4").hide();
	$("select#ddl5").hide();
	$("select#ddl6").hide();
});

var app = angular.module("app", []);

app.controller("addroom", function($scope, $window, $http)
		{
			$scope.room =
			{
				roomId : '',
				building : '',
				floor : '',
				noofsensors : '',
				sensors : [{}]
			}
			
			$scope.ok = function()
			{
				var req = {
						method : 'POST',
						url : 'http://localhost:8888/Room_automation/rest/room/add',
						headers: {
							   'Content-Type': 'Application/json'
							 },
						data : {
							roomid : $scope.room.roomId,
							buildg : $scope.room.building,
							floor : $scope.room.floor,
							noOfSensors : $scope.room.noofsensors,
							sensors : $scope.room.sensors
							}
						}
				
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
					bootbox.alert(data , function(result){
						if(result === true)
							$window.location = "addroom.html";
					});
				});	
			}
		});


        
        