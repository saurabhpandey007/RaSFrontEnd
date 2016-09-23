var app = angular.module("app", []);
		app.factory('appFact',function(){
			var fac = {};
			
			fac.user = {}; 
			
			return fac;
		});
		app.controller("adduser", function($scope, $window, $http) 
			{
				
				$scope.user = 
					{
						fname : '',
						lname : '',
						uname : ''
					}
				
				$scope.add = function()
				{
					var req = {
							method: 'POST',
							url : 'http://localhost:8888/room_autoamtion/project/addUser/'+$scope.user.fname+'/'+$scope.user.lname+'/'+$scope.user.uname,
							headers: {
								   'Content-Type': 'Text/plain'
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
							bootbox.alert("Enter Valid Input" , function(result){
								if(result === true)
									$window.location = "adduser.html";
							});
						});
					
					
				}
			});
		
		app.controller("deleteuser", function($scope, $window, $http)
				{
					$scope.user =
						{
							userId : '',
							userName : ''
						}
					
					$scope.deletefun = function()
					{
						bootbox.confirm("Do you really want to delete?", function(result){
							if(result === true)
								{
									var req =
									{
											method : 'POST',
											url : 'http://localhost:8888/room_autoamtion/project/deleteUser/'+$scope.user.userName+'/'+$scope.user.userId,
											headers: {
												'Content-Type': 'Text/plain'
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
												bootbox.alert("user does not Exists" , function(result){
													if(result === true)
														$window.location = "deleteuser.html";
												});
											})
									}
						})
					}
						
				});
		
		app.controller("edituser" , function($scope, $window, $http,appFact)
				{
					console.log(appFact.user);
					$scope.user = 
						{
							userId : '',
							firstName : '',
							lastName : '',
							userName : '',
							role : ''
						};
					
					$scope.edited = function()
					{
						var req =
							{
								method : 'POST',
								url : 'http://localhost:8888/room_autoamtion/project/updateUser/'+$scope.user.firstName+'/'+$scope.user.lastName+'/'+$scope.user.userName+'/'+$scope.user.userId+'/'+$scope.user.role,
								headers: {
									   'Content-Type': 'Text/plain'
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
									bootbox.alert("user does not Exists" , function(result){
										if(result === true)
											$window.location = "editeduser.html";
									});
								})
					}
				});
		
		app.controller("usercont", function($scope,$window, $http,appFact)
				{
					$scope.show = function()
					{
						var response = $http.get('http://localhost:8888/room_autoamtion/project/showAllUsers');
						response.success(function(data)
						{
							$scope.users = data;
						});	
						
						response.error(function(data)
						{
							bootbox.alert("Something went wrong" , function(result){
								if(result === true)
									$window.location = "showusers.html";
							});
						});	
					}
					
					$scope.editfunc = function(uname,uid) 
					{
						appFact.user=uname;
						$window.location = "editeduser.html";
					};
					
					$scope.deleteuser = function(uname,uid) 
					{
						bootbox.confirm("Do you really want to delete?", function(result){
								if(result === true)
									{
										$scope.uname = uname;
										$scope.uid = uid;
										var req =
										{
												method : 'POST',
												url : 'http://localhost:8888/room_autoamtion/project/deleteUser/'+$scope.uname+'/'+$scope.uid,
												headers: {
													'Content-Type': 'Text/plain'
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
													bootbox.alert("Error" , function(result){
														if(result === true)
															$window.location = "showusers.html";
													});
												});
									}
						})	
					}
				});
						
