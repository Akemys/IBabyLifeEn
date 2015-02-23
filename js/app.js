// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngIntercom'])


.run(function($ionicPlatform, $rootScope, $state, userService) {
	$ionicPlatform.ready(function() {
	
		//localizáció
		
		
		$rootScope.loc = {
			'szlogen' : 'An application that let nothing sink into oblivion…',
			'belepes' : 'login',
			'ibabylifeloginpopupText' : 'Do you have already an IBabyLife account?',
			'ibabyliferegpopupText' : 'You  registered an IBabyLife account successfully. You could log in with your new account on the next site. The application will use this account in the future.',
			'ibabylifeloginsucces' : 'You have logged in successfully. The application will use this user account in the future.',
			'igen' : 'Yes',
			'nem' : 'No',
			'vissza' : 'Back',
			'tovabb' : 'Next',
			'loginFailText' : 'Please check your internet connection and try to log in again.',
			'connectFailText' : 'Please connect to the internet to use this function.',
			'loginFailTitle' : 'No internet connection.',
			'exitTitle' : 'Quit?',
			'exitText' : 'Are you sure you want to quit?',
			'ismertetopopupText' : 'Do you want to read about the application?',
			'ismertetopopupTitle' : 'User Manual',
			'' : '',
			'' : '',
			'' : '',
			'' : '', 
			'' : '',
			'' : '',
			'' : ''
		};
			$rootScope.loc.ertekelesKuldvePopupText = 'Thank you for supporting our job with your rate!';
			$rootScope.loc.ertekelesKuldvePopupTitle ='Your rate was sent successfully.';
			$rootScope.loc.ertekelesKervePopupTitle ='Rate iBabyLife';
			
			$rootScope.loc.ertekelesLatvany = 'View';
			$rootScope.loc.ertekelesHasznal = 'Applicability';
			$rootScope.loc.ertekelesHasznos= 'Utility';
		


		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});

})


.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'temps/home.html',
      controller: 'homeCtrl'
    })
	.state('filter', {
      url: '/filter',
      templateUrl: 'temps/filter.html',
      controller: 'filterCtrl'
    })
    .state('ismerteto', {
      url: '/ismerteto',
      templateUrl: 'temps/ismerteto.html',
      controller: 'ismertetoCtrl'
    })
	.state('upload', {
      url: '/upload',
      templateUrl: 'temps/upload.html',
      controller: 'uploadCtrl'
    })
    .state('milestone', {
      url: '/milestone',
      templateUrl: 'temps/milestone.html',
      controller: 'milestoneCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'temps/signin.html',
      controller: 'signinCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'temps/signup.html',
      controller: 'signupCtrl'
    })
    .state('timeline', {
      url: '/timeline',
      templateUrl: 'temps/timeline.html',
      controller: 'timelineCtrl'
    })
     .state('newAlbum', {
      url: '/newAlbum',
      templateUrl: 'temps/newAlbum.html',
      controller: 'newAlbumCtrl'
    })
    .state('albumline', {
      url: '/albumline',
      templateUrl: 'temps/albumline.html',
      controller: 'albumlineCtrl'
    })
    .state('albumEvent', {
      url: '/albumEvent',
      templateUrl: 'temps/albumEvent.html',
      controller: 'albumEventCtrl'
    })
    .state('fotoalbum', {
      url: '/fotoalbum',
      templateUrl: 'temps/fotoalbum.html',
      controller: 'fotoalbumCtrl'
    })
	.state('login', {
		url : '/login',
		templateUrl : 'temps/login.html',
		controller : 'loginCtrl',
		data : {
			authenticate : false
		}
	}); 

    
  // Send to login if the URL was not found
  $urlRouterProvider.otherwise('/login');
})

.factory('userService', ['$rootScope','$ionicPopup', '$state', function($rootScope,$ionicPopup, $state) {
			



  // Hello.js Functions
   
	hello.init({
		google : '128251550279-homlrbethbbcm1bpjjvnmei96mrsr2bc.apps.googleusercontent.com',
		facebook : '761716387233976',
		twitter : 'S0Q3RMX6jXu674kpyKg2dtk48'
	}, {
		//
		// Define the OAuth2 return URL
		// This can be anything you like, providing its the callback which you have registered with the providers for OAuth2
		// It could even be localhost, e.g. http://localhost/somepath as phonegap is not run from a domain so SameOrigin breaks, instead we take advantage of being able to read the popups URL in PhoneGap
		scope : "email",
		redirect_uri : 'http://adodson.com/hello.js/redirect.html'
	}); 


  var service = {
    isLoggedIn: function() {
      return $rootScope.userStatus;
    },
    loginFacebook: function() {
      if(checkConnection()){
      	
				hello('facebook').login(function() {
					hello('facebook').api('/me').success(function(json) {
						console.log(json);
						$rootScope.user = json;
						$rootScope.$apply($rootScope.user);
						$rootScope.userStatus = true;
						$rootScope.network = 'facebook';
						window.localStorage.setItem("username", $rootScope.user.name);
						window.localStorage.setItem("email", $rootScope.user.email);
						$state.go('home');
					});
				});

      }else{
      	  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.loginFailText,
			    title: $rootScope.loc.loginFailTitle,
			    buttons: [
			      {
			        text: '<b>Ok</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }
      
      
    },
    logoutFacebook: function() {
      hello('facebook').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;

         $state.go('login');
      });
    },
    loginGoogle: function() {
      if(checkConnection()){
	      hello('google').login( function() {
	        hello( 'google' ).api( '/me' ).success(function(json) {
	          console.log(json);
	          $rootScope.user = json;
	          $rootScope.$apply($rootScope.user);
	          $rootScope.userStatus = true;
	          $rootScope.network = 'google';
	          window.localStorage.setItem("username", $rootScope.user.name );
			  window.localStorage.setItem("email",  $rootScope.user.email);	    
	          $state.go('home');
	        });
	      });
      }else{
      	  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.loginFailText,
			    title: $rootScope.loc.loginFailTitle,
			    buttons: [
			      {
			        text: '<b>Ok</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }     
    },
    logoutGoogle: function() {
      hello('google').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;
        
         $state.go('login');
      });
    },
    loginTwitter: function() {
      if(checkConnection()){
	      hello('twitter').login(function() {
	        hello( 'twitter' ).api( '/me' ).success(function(json) {
	          console.log(json);
	          $rootScope.user = json;
	          $rootScope.user.email = $rootScope.user.screen_name+'@ibabylife.com';
	          $rootScope.$apply($rootScope.user);
	          $rootScope.userStatus = true;
	          $rootScope.network = 'twitter';
			  window.localStorage.setItem("username", $rootScope.user.name );
			  window.localStorage.setItem("email", $rootScope.user.email);	    
	          $state.go('home');
	        });
	      });
      }else{
      	  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.loginFailText,
			    title: $rootScope.loc.loginFailTitle,
			    buttons: [
			      {
			        text: '<b>Ok</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			        }
			      },
			    ]
			  });
      }     
    },
    logoutTwitter: function() {
      hello('twitter').logout( function() {
        $rootScope.userStatus = false;
        $rootScope.user = null;
        $rootScope.network = false;
        $state.go('login');
      });
    }
  };

  return service;
}]).controller('homeCtrl',function($scope, $rootScope,$intercom, $timeout,$ionicModal, $ionicSlideBoxDelegate, $state,$ionicPopup,$ionicPlatform,$ionicSideMenuDelegate,$ionicLoading,$http, userService) {
    
    
    $scope.data = {};  
    
    /* tesztelés user
    $rootScope.user = {};
    $rootScope.user.email = 'kissbela@gmail.com';
  	$rootScope.user.name = 'Kiss Béla';
	*/
	
	
    
  

	Object.size = function(obj) {
		var size = 0,
		    key;
		for (key in obj) {
			if (obj.hasOwnProperty(key))
				size++;
		}
		return size;
	}; 

	$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/banner.php').success(function(data, status, headers, config) {

		$scope.banners = {};
		$scope.banners = data;		
	
		$scope.aktBanner = $scope.banners['banner'+Math.floor(Math.random()*(Object.size($scope.banners)-1))];	
		
		 
	}).error(function(data, status, headers, config) {
		
	});

   

   	$ionicPlatform.registerBackButtonAction(function () {
   		var myPopup = $ionicPopup.show({		   
		    title: $rootScope.loc.exitTitle,
		    subTitle: $rootScope.loc.exitText,
		    scope: $scope,
		    buttons: [
		      { text: $rootScope.loc.nem, },
		      {
		        text: $rootScope.loc.igen,
		        type: 'button-pink',
		        onTap: function(e) {
		          navigator.app.exitApp();		          
		        }
		      },
		    ]
		  });	 
	}, 100);
   
   $scope.exit = function(){
	   var myPopup = $ionicPopup.show({		   
			    title: $rootScope.loc.exitTitle,
			    subTitle: $rootScope.loc.exitText,
			    scope: $scope,
			    buttons: [
			      { text: $rootScope.loc.nem, },
			      {
			        text: $rootScope.loc.igen,
			        type: 'button-pink',
			        onTap: function(e) {
			          navigator.app.exitApp();		          
			        }
			      },
			    ]
			});	 
   };

	// intercom feedback cucc	


	
	$scope.milestones = function() {
		if ($scope.albums.length == 0) {
			var myPopup = $ionicPopup.show({
				title : 'New album',
				template : 'You did not created a photo album for your child yet. You could find this function in the main menu.',
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-pink',
					onTap : function(e) {
						$ionicSideMenuDelegate.toggleRight();
					}
				}]
			});

		} else {
			$state.go('milestone');
		}
	}; 





	if (localStorage.getItem("saveImages") === null) {
		window.localStorage.setItem("saveImages", 1 );
		$scope.saveImages = true;
	}else{
		if(localStorage.getItem("saveImages")==1){
			$scope.saveImages = true;
		}else{
			$scope.saveImages = false;
		}		
	}
	
	
			
		if (localStorage.getItem("ujvagyok") === null) {
			window.localStorage.setItem("ujvagyok", 1);
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.ismertetopopupText,
				title : $rootScope.loc.ismertetopopupTitle,
				buttons : [{
					text : $rootScope.loc.igen,
					type : 'button-pink',

					onTap : function(e) {

						$scope.ismerteto();

					}
				}, {
					text : $rootScope.loc.nem,
					type : 'button-light'
				}]
			});

		};


		

		





	
	

	
	
	
	//tutorial model vége	
	
	
	
	
	$scope.saveImageHandler = function(saveImages){
		
		if (saveImages) {
			window.localStorage.setItem("saveImages", 1);
		} else {
			window.localStorage.setItem("saveImages", 0);
		}

	};


	gaPlugin = window.plugins.gaPlugin;
	gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-56764945-1", 10);

	function nativePluginResultHandler(result) {
		//alert('nativePluginResultHandler - '+result);
		console.log('nativePluginResultHandler: ' + result);
	}

	function nativePluginErrorHandler(error) {
		//alert('nativePluginErrorHandler - '+error);
		console.log('nativePluginErrorHandler: ' + error);
	}


	cordova.plugins.notification.badge.configure({ title: '%d not uploaded event' });
	cordova.plugins.notification.badge.configure({ smallIcon: 'icon' });	

	$scope.ismerteto = function(){
		$state.go('ismerteto');
	};
	
	$scope.logout = function() {
		var myPopup = $ionicPopup.show({
			title : 'Log out',
			subTitle : 'Are you sure that do you want to log out?',
			scope : $scope,
			buttons : [{
				text : 'No'
			}, {
				text : '<b>Yes</b>',
				type : 'button-pink',
				onTap : function(e) {

					window.cookies.clear(function() {					    
					});
					window.localStorage.clear();
					$rootScope.userStatus = false;
					$rootScope.user = null;
					$rootScope.network = false;
					$state.go('login');
				
				}
			}]
		});

	}; 


	
	dao.getOfflineEvent(function(events) {
		$rootScope.offlineEvents = events;	
		
		
		
		if ($rootScope.offlineEvents.length == 0) {

			cordova.plugins.notification.badge.clear();
		} else {

			cordova.plugins.notification.badge.set($rootScope.offlineEvents.length);
		}

	});	
	
	
	$scope.getNumber = function(num) {
		return new Array(num);
	};
	
	$scope.setLatvany = function(num) {
		$scope.latvany = num+1;		
	};
	$scope.setHasznalhatosag = function(num) {
		$scope.hasznalhatosag = num+1;		
	};
	
	$scope.setHasznossag= function(num) {
		$scope.hasznossag = num+1;		
	};
	
	$scope.whatClassIsIt = function(mit,mivel) {
		if (mit == mivel)
			return "type2";		
		else
			return "type3";
	};

	
	$scope.rateApp = function() {
		if (checkConnection()) {
			$scope.latvany = 5;
			$scope.hasznalhatosag = 5;
			$scope.hasznossag = 5;
			
			
			
			var myPopup = $ionicPopup.show({
				
				title : $rootScope.loc.ertekelesKervePopupTitle,
				template : '<div>Please support our job with your rate! Rate for the following aspects from 1 to 5 and click on the "Send" button after you finished it.</div> </br>'+
						   '<table><tr><td>{{loc.ertekelesLatvany}} : </td><td><div ng-click="setLatvany($index)"  ng-repeat="i in getNumber(5) track by $index" ng-class="whatClassIsIt(latvany,$index+1)" class="circleBase">{{$index+1}}</td> </tr>' +
						   '<tr><td>{{loc.ertekelesHasznal}} : </td><td><div ng-click="setHasznalhatosag($index)"  ng-repeat="i in getNumber(5) track by $index" ng-class="whatClassIsIt(hasznalhatosag,$index+1)" class="circleBase">{{$index+1}}</td> </tr>' +
						   '<tr><td>{{loc.ertekelesHasznos}} : </td><td><div ng-click="setHasznossag($index)"  ng-repeat="i in getNumber(5) track by $index" ng-class="whatClassIsIt(hasznossag,$index+1)" class="circleBase">{{$index+1}}</td></tr></table>',
				scope : $scope,
				buttons : [{
					text : '<b>Send</b>',
					type : 'button-pink',
					onTap : function(e) {

						$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/apprate.php', {
							latvany : $scope.latvany,
							hasznalhatosag : $scope.hasznalhatosag,
							hasznossag : $scope.hasznossag,
							user : $rootScope.user.email,
							username : $rootScope.user.name
						
						}).success(function(data, status, headers, config) {
							var myPopup = $ionicPopup.show({
								title : $rootScope.loc.ertekelesKuldvePopupTitle,
								template : $rootScope.loc.ertekelesKuldvePopupText,
								buttons : [{
									text : '<b>Ok</b>',
									type : 'button-pink'
								}]
							});
						});

					}
				}, {
					text : '<b>Cancel</b>',
					type : 'button-light',
				}]
			});

		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}

	};


	
	
	
	
	$scope.shareApp = function() {
		if (checkConnection()) {
			window.plugins.socialsharing.share(null, null, null, 'https://play.google.com/store/apps/details?id=com.fwstudio.iBabyLife');
			
		

		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}

	};




	$scope.shareWeb = function() {

		if (checkConnection()) {
			var appInBrowser = window.open('https://www.facebook.com/sharer/sharer.php?u=http://www.ibabylife.com/', '_blank', 'location=yes,enableViewportScale=yes');

			appInBrowser.addEventListener('loadstart', function(event) {
				facebookLoc(event.url, appInBrowser);
			});

		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}

	}; 

	
	function facebookLoc(loc, appInBrowser) {
		if (loc.indexOf("story.php") > -1) {
			appInBrowser.close();

			var myPopup = $ionicPopup.show({
				title : 'Shared successfully.',
				template : 'Thank you for sharing the site of iBabyLife!',
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-pink'
				}]
			});

		}
	};


	//dao.dropTables();
	// albumszinkronizálás


	$rootScope.honap = function(datum) {
		var honapok = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];	
		var ev,honap,nap,ora,perc,masodperc;
		var date = new Date(datum);
		
		ev = date.getFullYear() ;
		honap = honapok[date.getMonth()] ;
		nap = date.getDate()  ;
		ora = date.getHours() ;
		
		perc = date.getMinutes() ;		
		if(perc<10) perc = '0'+perc;
		
				
		masodperc = date.getSeconds() ;
		
		
		return nap+" "+honap+" "+ev+" "+ora+":"+perc+" ";
		
	}; 

	dao.findAllAlbum(function(y) {
		$scope.familyalbums = [];
		$scope.minealbums = [];
		
		
		
		$scope.albums = y;
		$scope.albums.forEach(function(album) {			
			if(album.albumOwner!=$rootScope.user.email){				
				$scope.familyalbums.push(album);						
			}else{				
				$scope.minealbums.push(album);
			}
		}); 		
		$scope.$apply();
		
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/myAlbums.php', {
			albumowner : $rootScope.user.email
		}).success(function(data, status, headers, config) {	
			
			
			var myalbums = data;
		
						
			if (( typeof myalbums === 'object')) {
				console.log(myalbums);
			
				for (myalbum in myalbums) {					
					var e = myalbums[myalbum];
					var result = $.grep($scope.albums, function(e) {
						return e.albumName+e.albumOwner == myalbums[myalbum].albumName+myalbums[myalbum].albumOwner;
					});
					
					if (result.length == 0) {
						console.log('új album '+e.albumName);
						dao.newAlbum(myalbums[myalbum], function() {
						});
						$scope.albums.push(myalbums[myalbum]);						
					} else if (result.length == 1) {
						console.log('van ien album már '+e.albumName);
					}

				}
			}else{
				//alert(myalbums);
			};
	
	
			
			
			dao.findAllAlbum(function(y) {
				$scope.familyalbums = [];
				$scope.minealbums = [];
				$scope.albums = y;
				$scope.albums.forEach(function(album) {
					if (album.albumOwner != $rootScope.user.email) {
						$scope.familyalbums.push(album);
					} else {
						$scope.minealbums.push(album);
					}

				});
				$scope.$apply();
			});




			
		}).error(function(data, status, headers, config) {			
			dao.findAllAlbum(function(albums) {
				$scope.albums = albums;
				$scope.$apply();
				
			});
		});
	}); 





	$scope.feedback = function(){
		if(checkConnection()){
			 var myPopup = $ionicPopup.show({			    
			    title: 'Help our work!',
			    template: '<div>Please send your opinion about the application to us. If you missing something let us know. Thank you for your cooperation!</div>'+
			       		  '​<textarea ng-model="data.feedback"  rows="5" cols="70"></textarea>',
			    scope: $scope,
			    buttons: [
			      { text: 'Cancel' },
			      {
			        text: '<b>Send</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			          if (!$scope.data.feedback) {
			            //don't allow the user to close unless he enters wifi password
			            e.preventDefault();
			          } else {
			          	  $scope.feedbackData = {};
			          	  $scope.feedbackData.message = $scope.data.feedback;
			          	  $scope.feedbackData.deviceModel = device.model;
			          	  $scope.feedbackData.devicePlatform = device.platform;
			          	  $scope.feedbackData.deviceVersion = device.version;
			          	  $scope.feedbackData.email = $rootScope.user.email;
			          	  $scope.feedbackData.name = $rootScope.user.name;
			          	  
			          	  
			          	  
				          $http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/feedback.php', $scope.feedbackData).success(function(data, status, headers, config) {			
									
								var myPopup = $ionicPopup.show({
								title : 'Thank you!',
									template : 'Thank you for supporting our job with your message!',
									buttons : [{
										text : '<b>Ok</b>',
										type : 'button-pink'
									}]
								});
					
							}).error(function(data, status, headers, config) {							
								
							});
	
			               
			          }
			        }
			      },
			    ]
			  });
	
		}else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}

	};
	
	$scope.albumline = function(albumid,albumname,albumowner){
		
		if (checkConnection()) {
		
			$rootScope.albumid = albumid;
			$rootScope.albumname = albumname;
			$rootScope.albumowner = albumowner;
			$state.go('albumline');
			
		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}
		

	};
	
	$scope.newalbum = function() {		 
		$state.go('newAlbum');
	};
	
	
	
	$scope.fotoalbum = function() {
		if (checkConnection()) {
		
			if ($scope.albums.length == 0) {
				var myPopup = $ionicPopup.show({
					title : 'New Album',
					template : 'You did not created a photo album for your child yet. You could find this function in the main menu.',
					buttons : [{
						text : '<b>Ok</b>',
						type : 'button-pink',
						onTap : function(e) {
							$ionicSideMenuDelegate.toggleRight();
						}
					}]
				});
	
			}else if($scope.albums.length == 1){
				$rootScope.fotoalbum = $scoptoe.albums[0];	
				$state.go('fotoalbum');
			}else {
				 $scope.data.fotoalbum = $scope.albums[0];
				 var myPopup = $ionicPopup.show({
				    template: 'Choose one of your albums to create a photo album of it. <label class="item item-input item-select"><div class="input-label">	Album :  </div> <select ng-model="data.fotoalbum" ng-options="album.albumName for album in albums"></select></label>',
				    title: 'Create a new photo album',
				    scope: $scope,
				    buttons: [
				      { text: 'Cancel' },
				      {
				        text: '<b>Tovább</b>',
				        type: 'button-pink',
				        onTap: function(e) {
				          if (!$scope.data.fotoalbum) {
				            //don't allow the user to close unless he enters wifi password
				            e.preventDefault();
				          } else {
				        	$rootScope.fotoalbum = $scope.data.fotoalbum;
				          	$state.go('fotoalbum');
				          }
				        }
				      },
				    ]
				  });
				
			}
			
		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}
	
	
		
	}; 
	
	

	

	$scope.timeline = function() {
		
	}; 

	
	$scope.logoutGuest=function(){
		$state.go('login');
	};	 

	

    $scope.takePic = function() {	
		if ($scope.albums.length == 0) {
			var myPopup = $ionicPopup.show({
				title : 'New Album',
				template : 'You did not created a photo album for your child yet. You could find this function in the main menu.',
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-pink',
					onTap : function(e) {
						$ionicSideMenuDelegate.toggleRight();
					}
				}]
			});

		} else {
			var options = {
				destinationType : Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true,
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				quality: 100,
				targetWidth: 1440,
  				targetHeight: 1440,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(onSuccess, onFail, options);
		}

     
       
    };
    


	

	
	var onSuccess = function(imageUri) {

		
		$rootScope.kepAdat = imageUri;
		$rootScope.images = [];
		$state.go('filter');

	};


    
    
    function onFail(message) {
      
    }   
    
    
    function currentDate() {
		var currentDate = new Date;
		var Day = currentDate.getDate();
		if (Day < 10) {
			Day = '0' + Day;
		}//end if
		var Month = currentDate.getMonth() + 1;
		if (Month < 10) {
			Month = '0' + Month;
		}//end if
		var Year = currentDate.getFullYear();
		var fullDate = Year + '-' + Month + '-' + Day;
		return fullDate;
	}//end current date function
    
	
	
	$scope.menuRight = function() {
		$ionicSideMenuDelegate.toggleRight();		
	}; 
	$scope.menuLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();		
	}; 


	
	
		
	var requests = []; // hold ajax request
	var ftrans = []; // hold filetransfer request

   
	$scope.uploadEvent = function(eventID, tombID) {		
		if (checkConnection()) {
			/*
			$ionicLoading.show({
				template : '<i class="icon ion-looping"></i> Feltöltés...'
			});
			*/
			
			
			$rootScope.offlineEvents[tombID].loading = 1;
			
			
			
			dao.eventById(eventID, function(event) {
				$scope.eventData = event[0];

				console.log($scope.eventData);

				
				dao.findAlbumByID($scope.eventData.albumId, function(album) {
					$scope.album = album;

					if ($scope.album[0].albumOwner == $rootScope.user.email) {
						$scope.eventData.albumOwner = $rootScope.user.email;
					} else {
						$scope.eventData.albumOwner = $scope.album[0].albumOwner;
					}

					$scope.eventData.feltoltve = 1;
					$scope.eventData.albumName = $scope.album[0].albumName;
					$scope.eventData.albumDate = $scope.album[0].albumDate;
					$scope.eventData.albumSex = $scope.album[0].albumSex;
					$scope.eventData.saveImages = localStorage.getItem("saveImages");
					
					
						
						requests.push($http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newEsemeny.php', $scope.eventData));
					
											
						requests[requests.length - 1].success(function(data, status, headers, config) {
							
							
							 dao.eventFeltolt(eventID);
							 $scope.offlineEvents.splice(tombID, 1);	

							 
							
					
						if ($rootScope.offlineEvents.length == 0) {
							$ionicSideMenuDelegate.toggleLeft();
							cordova.plugins.notification.badge.clear();
						} else {
							cordova.plugins.notification.badge.set($rootScope.offlineEvents.length);
						}

							  
							
							
						
							if (( typeof data === 'object')) {								
								
								ftrans.push(new FileTransfer());

								for (var i in data) {
									var url = data[i];									
									

									var imgName = url.replace("files/", "");

									ftrans[ftrans.length - 1].download('http://mobileapps.fekiwebstudio.hu/ibabylife/' + url, 'cdvfile://localhost/persistent/Pictures/iBabyLife/' + imgName, function(entry) {
									}, function(error) {
										alert(error);
									});
								}

							};

						}); 

						
						
					

				}); 

					

			});
		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}


	}; 


})

.controller('filterCtrl', ['$scope','$rootScope','$ionicPopup','$ionicPlatform','$timeout', '$state','$ionicLoading', 'userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform ,$timeout, $state,$ionicLoading, userService) {
	
	$scope.filter = '';
	
	$scope.back = function() {
		$state.go('home');
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('home');
	}, 100);
	
	document.getElementById('originalPhoto').src = "data:image/jpeg;base64,"+$rootScope.kepAdat;
	var bigPhoto = "data:image/jpeg;base64,"+$rootScope.kepAdat;
	
/*
	var c = document.createElement("canvas");
	c.width = 300;
	c.height = 300;
	
	
	var cxt = c.getContext("2d");
	var img = new Image();
	img.src = "data:image/jpeg;base64,"+$rootScope.kepAdat;
	img.onload = function() {
		cxt.drawImage(img, 0, 0,300,300);		
		var dataURL = c.toDataURL();	
		document.getElementById('originalPhoto').src = dataURL ;    
    	var originalPhoto = document.getElementById('originalPhoto');
	}; 
*/

	document.getElementById('filterButtons').addEventListener('click', szures, false);

	
	function szures(e){
		$ionicLoading.show({
				template : '<i class="icon ion-looping"></i> Filtering...'
		});
		$timeout(function() {
	       prepFilterEffect(e);		
   		}, 250);
		
	}

	function prepFilterEffect(e) {		
	
		
		var filterButton = getFilterButton(e.target);
		if (!filterButton)
			return;
		

		ApplyEffects[filterButton.id](originalPhoto, 'wepb');
				
		if(document.getElementById('originalPhoto').style.display == 'block'){
			$ionicLoading.hide();	
		
			var myPopup = $ionicPopup.show({
				template : 'There was some problem with the filter. Please choose an other one and try it again!',
				title : 'Filtering failed',
				buttons : [{
					text : '<b>Again</b>',
					type : 'button-pink',
					onTap : function() {
						szures(e);
					}
				}, {
					text : '<b>Other</b>',
					type : 'button-light'
				}]
			}); 
	
			
		}else{
			$ionicLoading.hide();
		};			
		
		
		
		$scope.filter= filterButton.id;
		
		
	

	}
	

	
	

	function getFilterButton(target) {
		var button;
		if (target.classList.contains('filter')) {
			button = target;
		} else if (target.parentNode.classList.contains('filter')) {
			button = target.parentNode;
		}
		
		return button;
	}

	
	
	


	$scope.cont = function(){
	
		
		/*
		if(document.getElementById('filteredPhoto') !== null){
			$rootScope.finalKep = document.getElementById('filteredPhoto').src;	
		}else{
			$rootScope.finalKep = document.getElementById('originalPhoto').src;		
		}
		*/		
		
	
		if ($scope.filter != '') {			
			$rootScope.finalKep = document.getElementById('filteredPhoto').src;
			$rootScope.images.push($rootScope.finalKep);
			$state.go('upload');
			
		} else {			
			$rootScope.finalKep = bigPhoto;
			$rootScope.images.push($rootScope.finalKep);
			$state.go('upload');
		}


		
		
	};
	
	
	
	
	
	
	
	 
	
	
	
    
}]) 


.controller('milestoneCtrl', ['$scope','$rootScope','$ionicPopup','$ionicPlatform','$timeout', '$state','$ionicLoading', 'userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform ,$timeout, $state,$ionicLoading, userService) {
	
	$scope.back = function() {
		$state.go('home');
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('home');
	}, 100);
	
	
	
	
    
}])

.controller('ismertetoCtrl', ['$scope','$rootScope','$ionicSlideBoxDelegate','$ionicPopup','$ionicPlatform','$timeout', '$state','$ionicLoading', 'userService',
					  function($scope, $rootScope,  $ionicSlideBoxDelegate ,$ionicPopup,$ionicPlatform ,$timeout, $state,$ionicLoading, userService) {
		
	
	$scope.back = function() {
		$state.go('home');
	};
	$ionicPlatform.registerBackButtonAction(function() {
		$state.go('home');
	}, 100);

	// Call this functions if you need to manually control the slides
	
  
  	
	

	$scope.aImages = [{
		'src' : 'tutorial/kep1.png',
		'msg' : 'You can reach the main settings if you click on the gear wheel icon in the top right corner.'
	}, {
		'src' : 'tutorial/kep1_1_1.png',
		'msg' : 'The icon in the top left corner shows you if you have events what you failed to upload.'
	}, {
		'src' : 'tutorial/kep1_1_2.png',
		'msg' : 'You can easily upload the event with a single button press.'
	}, {
		'src' : 'tutorial/kep1_1.png',
		'msg' : 'You can take a picture about your baby with pressing the button of the camera immediately.'
	}, {
		'src' : 'tutorial/kep1_2.png',
		'msg' : 'By pressing the "help" button you could share your experience  related to the appcilation with us.'
	}, {
		'src' : 'tutorial/kep1_3.png',
		'msg' : 'You can find the albums youve created under the "My albums" title.'
	}, {
		'src' : 'tutorial/kep1_4.png',
		'msg' : 'You can find the albums by others who shared them with you  under the "Family albums" title. If you click on an album you could see all pictures  it contains.'
	}, {
		'src' : 'tutorial/kep2.png',
		'msg' : 'You can find your name and e-mail address in the 1st point. You could identify yourself with them in the application.'
	}, {
		'src' : 'tutorial/kep3.png',
		'msg' : 'You can create a new album for your baby in the 2nd point.'
	}, {
		'src' : 'tutorial/kep4.png',
		'msg' : 'You can create a photo album by using your already existing albums pictures with few button presses in the 3rd point.'
	}, {
		'src' : 'tutorial/kep7.png',
		'msg' : 'You can reate the IBabyLife application on the 4th point.'
	}, {
		'src' : 'tutorial/kep8.png',
		'msg' : 'You can send the application per e-mail to one of your friends in the 5th point.'
	}, {
		'src' : 'tutorial/kep9.png',
		'msg' : 'You can share the offical site of IBabyLife in the 6th point.'
	}, {
		'src' : 'tutorial/kep5.png',
		'msg' : 'You can recall the already running help window in the 7th point.'
	}, {
		'src' : 'tutorial/kep6.png',
		'msg' : 'You can set if you want to save the pictures to your device in the 8th point.'
	}];
	
	$scope.slideIndex = 0; 
	
	$scope.next = function() {
		
		$scope.slideIndex++; 
		$scope.slide = $scope.aImages[$scope.slideIndex];
		
		
	};

	$scope.previous = function() {
		$scope.slideIndex--; 
		$scope.slide = $scope.aImages[$scope.slideIndex];
		
		 
	};	
	
	$scope.slide = $scope.aImages[0];
	

    
}])
.controller('albumlineCtrl', ['$scope', '$rootScope','$ionicLoading','$ionicActionSheet','$ionicScrollDelegate', '$ionicPopup','$ionicPlatform','$ionicScrollDelegate', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope,$ionicLoading,$ionicActionSheet,$ionicScrollDelegate, $ionicPopup,$ionicPlatform,$ionicScrollDelegate, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.data = {};  
	$scope.home = function() {
		$rootScope.scrollto = 0;
		$state.go('home');
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	
		$rootScope.scrollto = 0; 
	    $state.go('home');
	}, 100);


	

	$scope.scrollToItem = function(itemIndex) {		
			
		var scrollHeight = 0;
		for (var i = 0; i < itemIndex; i++) {
			scrollHeight += 450;
		}
		
		$ionicScrollDelegate.scrollTo(0, scrollHeight);
	}; 



	$scope.eventOpen = function(event,index) {

		$ionicActionSheet.show({
			buttons : [{
				text : 'See it'
			},{
				text : 'Share on Facebook'
			}],				
			cancelText : 'Cancel',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
				
				if (index == 0) {
					$rootScope.scrollto = index;
					$rootScope.openEvent = event;
					$state.go('albumEvent');
				};								
				
				if (index == 1) {
				
					$ionicLoading.show({
						template : '<i class="icon ion-looping"></i> Loading pictures…...'
					});


					var kepek = [];
					event.kepek.forEach(function(entry) {
						kepek.push('http://mobileapps.fekiwebstudio.hu/ibabylife/' + entry);
					});					
				
					window.plugins.socialsharing.shareViaFacebook(null, kepek, null, function() {
						$ionicLoading.hide();					

					}, function(errormsg) {
						$ionicLoading.hide();
					}); 

				};



				return true;
			}
		}); 

	
		
	};
	
	$scope.newEvent = function() {		
		var options = {
				destinationType : Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true,	
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				quality: 100,
				targetWidth: 1440,
  				targetHeight: 1440,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(onSuccess, onFail, options);
		

     
     
	}; 
	

	$scope.share = function() {
			 var myPopup = $ionicPopup.show({
		    title: 'Share',
		    template: 'Please write here the e-mail addresses of your friends who you want to share this album with. After than your friends could create events too. <input type="text" ng-model="data.shareemail">',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancel' },
		      {
		        text: '<b>Share</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          if (!$scope.data.shareemail) {
		            //don't allow the user to close unless he enters wifi password
		            e.preventDefault();
		          } else {     	
		          	  $scope.shareData = {};
		          	  $scope.shareData.shareemail = $scope.data.shareemail;
		          	  $scope.shareData.meghivo = $rootScope.user.name;	   
				      $scope.shareData.albumOwner = $scope.album[0].albumOwner;
				      $scope.shareData.albumName = $scope.album[0].albumName;
				      $scope.shareData.albumDate = $scope.album[0].albumDate;
				      $scope.shareData.albumSex = $scope.album[0].albumSex;
				      
					  
		          	  	          	  
			          $http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/shareen.php', $scope.shareData).success(function(data, status, headers, config) {			
		
							var myPopup = $ionicPopup.show({
								title: 'Shared successfully.',
								template : 'We will send a notification to the granted e-mail address. Your friend has nothing else to do just register in the IBabyLife application with its e-mail address.',
								buttons : [{
									text : '<b>Ok</b>',
									type : 'button-pink'									
								}]
							});
							
						}).error(function(data, status, headers, config) {
							alert('Nincs kapcsolat a szerverrel');	
						});
		               
		          }
		        }
		      },
		    ]
		  });

	};

	
	
 	var onSuccess = function(imageData) {
 		$rootScope.albumID = $scope.albumData.albumid;
 		$rootScope.kepAdat = imageData;
		$rootScope.images = [];
		$state.go('filter');
 	
		 
		
		
    };
    
    
    function onFail(message) {
     
    }   

	$scope.mikorTortent = function(eventDate) {
		var date1 = new Date($scope.album[0].albumDate);
		var date2 = new Date(eventDate);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (diffDays >= 365) {
			return parseInt(diffDays / 365) + ' years ';

		} else if (diffDays < 365 && diffDays > 30) {
			return parseInt(diffDays / 30) + ' months ';
		} else {
			return diffDays + ' days';
		}
	};




	$scope.albumData = {};
	$scope.albumData.albumowner = $rootScope.albumowner;
	$scope.albumData.albumid = $rootScope.albumid;
	$scope.albumData.albumname = $rootScope.albumname;
	
	
	$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/albumEvents.php', $scope.albumData).success(function(data, status, headers, config) {	
		
		if (data.length >=1) {
			dao.findAlbumByID($rootScope.albumid, function(album) {
				$scope.album = album;
				$scope.events = data;

				$.each($scope.events, function(key, value) {
					$scope.events[key].kepek = [];
					if ($scope.events[key].eventImg1 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg1);
					if ($scope.events[key].eventImg2 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg2);
					if ($scope.events[key].eventImg3 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg3);
					if ($scope.events[key].eventImg4 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg4);
					if ($scope.events[key].eventImg5 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg5);
					if ($scope.events[key].eventImg6 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg6);
					if ($scope.events[key].eventImg7 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg7);
					if ($scope.events[key].eventImg8 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg8);
					if ($scope.events[key].eventImg9 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg9);
					if ($scope.events[key].eventImg10 != 'undefined')
						$scope.events[key].kepek.push($scope.events[key].eventImg10);

					

				});
			
				
				
				var date1 = new Date($scope.album[0].albumDate);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if (diffDays >= 365) {
					$scope.kor = parseInt(diffDays / 365) + ' years ';
				} else if (diffDays < 365 && diffDays > 30) {
					$scope.kor = parseInt(diffDays / 30) + ' months ';
				} else {
					$scope.kor = diffDays + ' days';
				}
				$scope.$apply();

				

				if ($rootScope.scrollto > 0) {
					$scope.scrollToItem($rootScope.scrollto);
				}

			});
		} else {
			
			dao.findAlbumByID($rootScope.albumid, function(album) {
				$scope.album = album;
				var date1 = new Date($scope.album[0].albumDate);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if (diffDays >= 365) {
					$scope.kor = parseInt(diffDays / 365) + ' years ';
				} else if (diffDays < 365 && diffDays > 30) {
					$scope.kor = parseInt(diffDays / 30) + ' months ';
				} else {
					$scope.kor = diffDays + ' days';
				}
				$scope.$apply();

			});
		}

	
		

	}).error(function(data, status, headers, config) {
		alert('Nincs kapcsolat a szerverrel');
	});

	
	


}])

.controller('albumEventCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform','$ionicScrollDelegate', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform,$ionicScrollDelegate, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.data = {};  
	$scope.home = function() {
		window.history.back();
	}; 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    window.history.back();
	}, 100);
	
	$scope.event = $rootScope.openEvent;
	
	
	
	$scope.onlyDate = function(datum){
		var honapok = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];		
		var ev,honap,nap;
		var date = new Date(datum);
		
		ev = date.getFullYear() ;
		honap = honapok[date.getMonth()] ;
		nap = date.getDate()  ;
		
		return ev+". "+honap +" "+ nap;
	};	

	

	$scope.facebookshareEvent = function(url) {
		var appInBrowser = window.open('https://www.facebook.com/sharer/sharer.php?u=http://mobileapps.fekiwebstudio.hu/ibabylife/shareEvent/index.php?shareID=' + url, '_blank', 'location=yes,enableViewportScale=yes');

		appInBrowser.addEventListener('loadstart', function(event) {
			facebookLoc(event.url, appInBrowser);
		});
	}; 


	function facebookLoc(loc, appInBrowser) {
		if (loc.indexOf("story.php") > -1) {
			appInBrowser.close();

			var myPopup = $ionicPopup.show({
				title : 'Shared successfully.',
				template : 'You have successfully shared this event on your facebook timeline.',
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-pink'
				}]
			});

		}
	};


	
	$scope.deleteEvent = function(){
		
			
		var myPopup = $ionicPopup.show({
			title : 'Delete event',
			template : 'Are you sure that do you want to delete this event?',
			buttons : [{
				text : '<b>Yes</b>',
				type : 'button-pink',
				onTap: function(e) {			
					$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/deleteEvent.php?eventID=' + $scope.event.id).success(function(data) {
				
						var myPopup = $ionicPopup.show({
							title : 'The event has benn deleted.',
							template : 'This event was permanently deleted from our system.',
							buttons : [{
								text : '<b>Ok</b>',
								type : 'button-pink',
								onTap : function(e) {
									window.history.back();
								}
							}]
						});

					});
			    }
			},{
				text : '<b>No</b>',
				type : 'button-light'
			}]
		}); 

		
			
	};

}])


.controller('newAlbumCtrl', ['$scope', '$rootScope', '$ionicPopup','$ionicPlatform', '$state', '$http', '$ionicModal', '$ionicSlideBoxDelegate', 'userService',
function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state, $http, $ionicModal, $ionicSlideBoxDelegate, userService) {
	$scope.home = function() {
		$('#albumDate').mobiscroll('destroy');
		$state.go('home');		
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $('#albumDate').mobiscroll('destroy');
	    $state.go('home');	    
	    
	}, 100);
	$scope.data= {};
	
	 
    
    $('#albumDate').mobiscroll().datetime({
		theme: 'android-holo-light', 
		display : 'bottom',
		mode : 'scroller',
		dateOrder : 'dd mm yy',
		dateFormat : "dd-mm-yy",		
		maxDate : new Date(),
		lang : 'en'
	});
	
	
	 $scope.newalbum =  function(){
		
		
    	console.log($scope.data);
    	 if (!$scope.data.albumName || !$scope.data.albumSex || $('#albumDate').val()=='' ) {	            
		            var myPopup = $ionicPopup.show({
					    title: 'One of the datas is missing.',
					    buttons: [
					      {
					        text: '<b>again</b>',
					        type: 'button-pink',
					        onTap: function(e) {
					         
					        }
					      },
					    ]
					  });		          				          
		          } else {
		            album = {
			    		albumName : $scope.data.albumName,
			    		albumDate : $('#albumDate').val(),
			    		albumSex  : $scope.data.albumSex,
			    		albumOwner : $rootScope.user.email
			    	};
			    	dao.newAlbum(album,function(){});
			    	var myPopup = $ionicPopup.show({
					    title: 'You have successfully created the album.',
					    buttons: [
					      {
					        text: '<b>Ok</b>',
					        type: 'button-pink',
					        onTap: function(e) {
					           $state.go('home');
					           return;
					        }
					      },
					    ]
					  });			    	
			    	return;
		          }
    
    	
    };
	

}])
.controller('fotoalbumCtrl', ['$scope','$ionicLoading','$ionicActionSheet', '$rootScope', '$ionicPopup','$ionicPlatform', '$state', '$http',  'userService',
function($scope,$ionicLoading,$ionicActionSheet, $rootScope, $ionicPopup,$ionicPlatform, $state, $http,   userService) {
	$scope.home = function() {		
		$('#albumFromDate').mobiscroll('destroy');
		$('#albumToDate').mobiscroll('destroy');		
		$state.go('home');		
	};
	
	
	$ionicPlatform.registerBackButtonAction(function() {
		$('#albumFromDate').mobiscroll('destroy');
		$('#albumToDate').mobiscroll('destroy');
		$state.go('home');
	}, 100); 

	
	$scope.data={};
	
	$scope.fotoalbum= $rootScope.fotoalbum;
	console.log($scope.fotoalbum);	
	$scope.data.albumFromDate = "";
	$scope.data.albumToDate = "";

	
	$scope.albumFromDateChanged = function() {		
		$scope.data.albumFromDate = $('#albumFromDate').val();
		$scope.$apply();
	};
	$scope.albumToDateChanged = function() {		
		$scope.data.albumToDate = $('#albumToDate').val();		
		$scope.$apply();
	};
	
	function linkMegnyitas(url){
		window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
	};
	
	function facebookShare(url){
		var appInBrowser = window.open('https://www.facebook.com/sharer/sharer.php?u='+url, '_blank', 'location=yes,enableViewportScale=yes');
		
		appInBrowser.addEventListener('loadstart', function(event) {
			facebookLoc(event.url, appInBrowser);
		});

	};

	function facebookLoc(loc, appInBrowser) {
		if (loc.indexOf("story.php") > -1) {
			appInBrowser.close();

			var myPopup = $ionicPopup.show({
				title : 'Shared successfully.',
				template : 'You have successfully shared this album on your facebook timeline.',
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-pink'
				}]
			});

		}
	}

	$scope.show = function(db) {

				
		var hideSheet = $ionicActionSheet.show({
			buttons : [{
				text : 'Facebook share'
			},{
				text : 'See it'
			}],
			buttonClicked : function(index) {
				
				if(index==0 && db==20){
					facebookShare($scope.photoAlbum20url);
				}
				if(index==0 && db==50){
					facebookShare($scope.photoAlbum50url);
				}
				if(index==0 && db==80){
					facebookShare($scope.photoAlbum80url);
				}
				
				if(index==1 && db==20){
					linkMegnyitas($scope.photoAlbum20url);
				}
				if(index==1 && db==50){
					linkMegnyitas($scope.photoAlbum50url);
				}
				if(index==1 && db==80){
					linkMegnyitas($scope.photoAlbum80url);
				}
				return true;
			}
		}); 

	}; 

	 



	
	
	$scope.newPhotoAlbum = function(db){
		
		
		$ionicLoading.show({
			template : '<i class="icon ion-looping"></i> Generating a photo album...'
		}); 

		if ($scope.data.albumFromDate != '' && $scope.data.albumToDate != '') {
		
		
			$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newPhotoAlbum.php?imagesSize='+db+'&albumName=' + $scope.fotoalbum.albumName + '&albumOwner=' + $scope.fotoalbum.albumOwner +'&albumOwnerName=' +  $rootScope.user.name + '&fromDate=' + $scope.data.albumFromDate + '&toDate=' + $scope.data.albumToDate + '').success(function(data) {
				$ionicLoading.hide();
				if(data['success'] == false){		
					
					if (data['usedalbum']) {
						
						var myPopup = $ionicPopup.show({
							title : 'It is already done.',
							template : 'You have already created a photo album with these time parameters.',
							buttons : [{
								text : '<b>Ok</b>',
								type : 'button-pink',								
								onTap : function(e) {

									if (db == 20) {
										$scope.photoAlbum20 = true;
										$scope.photoAlbum20url = data['url'];
									} else if (db == 50) {
										$scope.photoAlbum50 = true;
										$scope.photoAlbum50url = data['url'];
									} else {
										$scope.photoAlbum80 = true;
										$scope.photoAlbum80url = data['url'];
									}
									$scope.$apply();
									return;

								}

							}]
						}); 

					} else if (data['wrongdate']) {
						
						
						
						var myPopup = $ionicPopup.show({
							title : 'Wrong data',
							template : 'There is no available event between these two dates.',

							buttons : [{
								text : '<b>Ok</b>',
								type : 'button-pink',
								onTap : function(e) {									
									return;
								}
							}]

						}); 


					}

				
				}else {
					/*
					 var myPopup = $ionicPopup.show({
					 title : 'Fotóalbum elkészült',
					 template : 'A fotóalbuma elkészült, most lehetősége van hogy megnézze és megossza barátaival, családtagjaival !',
					 buttons : [{
					 text : '<b>Ok</b>',
					 type : 'button-pink',
					 onTap : function(e) {

					 return;

					 }
					 }]

					 });
					 */
					if (db == 20) {
						$scope.photoAlbum20 = true;
						$scope.photoAlbum20url = data['url'];
					} else if (db == 50) {
						$scope.photoAlbum50 = true;
						$scope.photoAlbum50url = data['url'];
					} else {
						$scope.photoAlbum80 = true;
						$scope.photoAlbum80url = data['url'];
					}
					$scope.$apply();
				};

				
			});
		} else {
			$ionicLoading.hide();
			var myPopup = $ionicPopup.show({
				title : 'Missing datas.',
				template : 'Please give the start and the end date of the photo album.',
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-pink',
					onTap : function(e) {									
							return;
					}
				}]
			});
		}


	

	
	};


	$('#albumFromDate').mobiscroll().date({
		theme : 'android-holo-light',
		display : 'bottom',
		mode : 'scroller',
		dateOrder : 'dd mm yy',
		dateFormat : "dd-mm-yy",
		minDate : new Date($scope.fotoalbum.albumDate),
		maxDate : new Date(),
		lang : 'en'
	});
	$('#albumFromDate').mobiscroll('setDate', new Date($scope.fotoalbum.albumDate), true);

	$('#albumToDate').mobiscroll().date({
		theme : 'android-holo-light',
		display : 'bottom', 
		mode : 'scroller',
		dateOrder : 'dd mm yy',
		dateFormat : "dd-mm-yy",
		minDate : new Date($scope.fotoalbum.albumDate),
		maxDate : new Date(),
		lang : 'en'
	});
	$('#albumToDate').mobiscroll('setDate', new Date(), true);

    
    
	

}])



.controller('signinCtrl', ['$scope', '$rootScope','$ionicPopup','$ionicPlatform', '$state','$http','userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform, $state,$http, userService) {

	$scope.back=function(){
		$state.go('login');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('login');	  
	}, 100);
	
	$scope.logAjax = function() {
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/loginen.php?' + jQuery("#form-login").serialize()).success(function(data) {
			console.log(data);

			if (!data.success) {
				// if not successful, bind errors to error variables
				$scope.errorLogin = data.errors.login;

			} else {
				var myPopup = $ionicPopup.show({
				    title: 'Successful login',
				    template: $rootScope.loc.ibabylifeloginsucces,
				    buttons: [
				      { text: '<b>Ok</b>',	      
				        type: 'button-pink',
				        onTap: function(e) {
				          window.localStorage.setItem("ibabylifeusername", data.vezeteknev+' '+data.keresztnev);
				          window.localStorage.setItem("ibabylifeemail", data.email);	          
				          
				          
							console.log(data);
							$rootScope.user =  {
								name : data.vezeteknev+' '+data.keresztnev,
								email : data.email
							};
							$rootScope.$apply($rootScope.user);
							
							$state.go('home');

		  				  
				        }
				      }
				    ]
				  });

			}
		});

	};



}])


.controller('signupCtrl', ['$scope', '$rootScope','$ionicPopup','$ionicPlatform', '$state','$http','userService',function($scope, $rootScope,$ionicPopup,$ionicPlatform,$state,$http, userService) {
		
	$scope.back=function(){
		$state.go('login');
	};
	$ionicPlatform.registerBackButtonAction(function () {	 
	    $state.go('login');	  
	}, 100);
	
	$scope.regAjax = function() {
		$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/signupen.php?' + jQuery("#form-signup").serialize()).success(function(data) {
			console.log(data);

			if (!data.success) {
				// if not successful, bind errors to error variables
				$scope.errorVezeteknev = data.errors.vezeteknev;
				$scope.errorKeresztnev= data.errors.keresztnev;
				$scope.errorEmail = data.errors.email;
				$scope.errorJelszo = data.errors.jelszo;

			} else {
				var myPopup = $ionicPopup.show({
				    title: 'Sucessfully registration.',
				    template: $rootScope.loc.ibabyliferegpopupText,
				    buttons: [
				      { text: '<b>Login</b>',	      
				        type: 'button-pink',
				        onTap: function(e) {
		  				  $state.go('signin'); 
				        }
				      }
				    ]
				  });
			}
		});

	};



}])


.controller('uploadCtrl', ['$scope', '$rootScope','$timeout', '$state','$stateParams', '$ionicPopup','$http','$ionicSlideBoxDelegate','$ionicLoading','$ionicPlatform','$ionicActionSheet', 'userService',
function($scope, $rootScope, $timeout, $state,$stateParams, $ionicPopup,$http,$ionicSlideBoxDelegate,$ionicLoading,$ionicPlatform,$ionicActionSheet, userService) {
	$ionicLoading.hide();	
	
	
	$ionicPlatform.registerBackButtonAction(function () {	
		if(!$scope.mentve && !$scope.uploading){
		    var myPopup = $ionicPopup.show({		   
		    title: 'Exit',
		    subTitle: 'Are you sure that do you want to go back to the main menu?',
		    scope: $scope,
		    buttons: [
		      { text: 'No' },
		      {
		        text: '<b>Yes</b>',
		        type: 'button-pink',
		       	onTap: function(e) {
					$rootScope.images = [];
					$rootScope.albumID = false;
					$state.go('home');
				}

		      },
		    ]
		  });
		}else{
			$rootScope.images = [];
			$rootScope.albumID = false;
			$state.go('home');
		} 
		 	  
	}, 100);

	$scope.home = function() {
		 if(!$scope.mentve && !$scope.uploading){
		    var myPopup = $ionicPopup.show({		   
		    title: 'Exit',
		    subTitle: 'Are you sure that do you want to go back to the main menu?',
		    scope: $scope,
		    buttons: [
		      { text: 'No' },
		      {
		        text: '<b>Yes</b>',
		        type: 'button-pink',
		       	onTap: function(e) {
					$rootScope.images = [];
					$rootScope.albumID = false;
					$state.go('home');
				}

		      },
		    ]
		  });
		}else{
			$rootScope.images = [];
			$rootScope.albumID = false;
			$state.go('home');
		} 
		 
	}; 
	
	
	$scope.egyketto = ['first squirming movements', 'turns to light', 'pays attention to a sound', 'lifts its head up', 'turns its head', 'relies on the forearm', 'holding its hands up to the light', 'takes its hands in its mouth'];
	$scope.haromnegy = ['explore its hands and watching the way their move','raises and propped itself on tummy','keeps its palm open',  'catches something with its hand','turn its side','the first roll-over from tummy to back','consciously shake the rattle in its hands','first smile, joy on the face'];
	$scope.othat = ['turn from tummy to bak - from back to tummy','try to cath the objects consciously','it splashes while bathing already','imitate, for example: sticks tongue out', 'give itself a smile in the mirror','crawls on its belly','sits up alone','it is already using the first 3 fingers to catch','put everything in its mouth'];
	$scope.hetnyolc = ['rolls away from its place','starts crawling consciously back and forth','karját nyújtja felénk', 'nibble everything'];
	$scope.kilenctiz = ['stands up alone','crawling forward alone','hangs on, first steps','pointing with index finger','packing things into each other', 'turn from sit to tummy','first side steps  while the baby clings to something','plays with toys while sitting alone'];
	$scope.tizenegyketto = ['walking alone while holding on to furniture','packing plays','throwing toys','gives a kiss', 'walking hand-in-hand','try to scribble on a paper','eating while using the spoon','toddle alone']; 



	$scope.kor = function(date) {

		var date1 = new Date(date);
		var date2 = new Date();
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		x = parseInt(diffDays / 30);

		return x;

	}; 
	

    $scope.takePic = function() {	
	


			var options = {
				destinationType : Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true,
				sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				encodingType : 0,
				quality: 100,
				targetWidth: 1440,
  				targetHeight: 1440,
				correctOrientation : true
			};
			// Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(ujEvent, onFail, options);
		

     
       
    };
    
	
	var ujEvent = function(imageUri) {
		
		$rootScope.kepAdat = imageUri;
		$rootScope.images = [];
		$state.go('filter');

	};

	
	

	
	$scope.facebookshareEvent = function() {
		if (checkConnection()) {
			$ionicLoading.show({
				template : '<i class="icon ion-looping"></i> Loading pictures...'
			});

			var kepek = [];
			$scope.kepek.forEach(function(entry) {
				kepek.push('http://mobileapps.fekiwebstudio.hu/ibabylife/' + entry);
			});

			
			window.plugins.socialsharing.shareViaFacebook(null, kepek, null, function() {
				$ionicLoading.hide();				
			}, function(errormsg) {
				$ionicLoading.hide();
			}); 

		} else {
			var myPopup = $ionicPopup.show({
				template : $rootScope.loc.connectFailText,
				title : $rootScope.loc.loginFailTitle,
				buttons : [{
					text : '<b>Ok</b>',
					type : 'button-light'
				}]
			});
		}
	};

	

	$scope.data = [];
	
	$scope.data.message = $rootScope.message;
	$scope.data.milestone = $rootScope.milestone;

	
	if (!$rootScope.albumID) {
		dao.findAllAlbum(function(albums) {
			$scope.albums = albums;
			
			if (typeof $rootScope.album == 'undefined') {
				$scope.data.album = $scope.albums[0];
			} else {
				$scope.data.album = $scope.albums[$rootScope.album - 1];
			}

			
			$scope.$apply();
		});
	} else {
		dao.findAlbumByID($rootScope.albumID,function(albums){
			$scope.albums = albums;
			$scope.data.album = $scope.albums[0];
			$scope.$apply();
		});
		
		
	}
	



	$scope.images=$rootScope.images;	
	$scope.$apply();

	

	$scope.mentve = false;
	$scope.uploading = false;

	$scope.saveEvent = function() {
		$scope.uploading = true;
		/*
		 $ionicLoading.show({
		 template : '<i class="icon ion-looping"></i> Uploading...'
		 });
		 */

		if (checkConnection()) {
			//offline mentés eleje
				
			
			$scope.data.albumid = $scope.data.album.id;
			$scope.data.eventMessage = $scope.data.message;
			$scope.data.eventMilestone = $scope.data.milestone;
			$scope.data.eventImg1 = $scope.images[0];
			$scope.data.eventImg2 = $scope.images[1];
			$scope.data.eventImg3 = $scope.images[2];
			$scope.data.eventImg4 = $scope.images[3];
			$scope.data.eventImg5 = $scope.images[4];
			$scope.data.eventImg6 = $scope.images[5];
			$scope.data.eventImg7 = $scope.images[6];
			$scope.data.eventImg8 = $scope.images[7];
			$scope.data.eventImg9 = $scope.images[8];
			$scope.data.eventImg10 = $scope.images[9];
			$scope.data.eventDate = currentDate() + " " + currentTime();

			var azEventId;
			dao.newEVent($scope.data,1, function(id) {
				$scope.uploading = true;
				azEventId = id;	
			});

			
			//offline mentés vége
			
		   

			//online mentés eleje
			$scope.eventData = {};
		
			
			
			if ($scope.data.message)
				$scope.eventData.eventMessage = $scope.data.message;
			else
				$scope.eventData.eventMessage = 'undefined';

			if ($scope.data.milestone)
				$scope.eventData.eventMilestone = $scope.data.milestone;
			else
				$scope.eventData.eventMilestone = 'undefined';

			if ($scope.images[0])
				$scope.eventData.eventImg1 = $scope.images[0];
			else
				$scope.eventData.eventImg2 = 'undefined';

			if ($scope.images[1])
				$scope.eventData.eventImg2 = $scope.images[1];
			else
				$scope.eventData.eventImg2 = 'undefined';
			
			if ($scope.images[2])
				$scope.eventData.eventImg3 = $scope.images[2];
			else
				$scope.eventData.eventImg3 = 'undefined';
				
			if ($scope.images[3])
				$scope.eventData.eventImg4 = $scope.images[3];
			else
				$scope.eventData.eventImg4 = 'undefined';
				
			if ($scope.images[4])
				$scope.eventData.eventImg5 = $scope.images[4];
			else
				$scope.eventData.eventImg5 = 'undefined';
				
			if ($scope.images[5])
				$scope.eventData.eventImg6 = $scope.images[5];
			else
				$scope.eventData.eventImg6 = 'undefined';
				
			if ($scope.images[6])
				$scope.eventData.eventImg7 = $scope.images[6];
			else
				$scope.eventData.eventImg7 = 'undefined';
				
			if ($scope.images[7])
				$scope.eventData.eventImg8 = $scope.images[7];
			else
				$scope.eventData.eventImg8 = 'undefined';
				
			if ($scope.images[8])
				$scope.eventData.eventImg9 = $scope.images[8];
			else
				$scope.eventData.eventImg9 = 'undefined';
				
			if ($scope.images[9])
				$scope.eventData.eventImg10 = $scope.images[9];
			else
				$scope.eventData.eventImg10 = 'undefined';

			
			
			$scope.eventData.eventDate = currentDate() + " " + currentTime();
			
		
			dao.findAlbumByID($scope.data.album.id, function(album) {
				$scope.album = album;
				
				
				
				if( $scope.album[0].albumOwner == $rootScope.user.email){
					$scope.eventData.albumOwner = $rootScope.user.email;
				}else{
					$scope.eventData.albumOwner =  $scope.album[0].albumOwner;
				}				
				$scope.eventData.albumId = $scope.data.album.id;
				$scope.eventData.albumName = $scope.album[0].albumName;
				$scope.eventData.albumDate = $scope.album[0].albumDate;
				$scope.eventData.albumSex = $scope.album[0].albumSex;
				$scope.eventData.saveImages = localStorage.getItem("saveImages");
				
			
				$http.post('http://mobileapps.fekiwebstudio.hu/ibabylife/newEsemeny.php', $scope.eventData).success(function(data, status, headers, config) {			
		
				
					$ionicLoading.hide();	
					
					
					$scope.uploading = false;
					$scope.mentve = true;
					
				
					if (checkConnection()) {
						$scope.facebookshare = true;
					}

					
					$rootScope.message = '';
					$rootScope.milestone = '';

					dao.eventFeltolt(azEventId);

					dao.getOfflineEvent(function(events) {
						$rootScope.offlineEvents = events;
						$rootScope.$apply();
					});


					
					
					$scope.shareID = data.shareID;					
					$scope.kepek = data.kepek ;					
				
					
					if (( localStorage.getItem("saveImages") == 1)) {
						var ft = new FileTransfer();

						for (var i in data.kepek) {
							var url = data.kepek[i];

							var imgName = url.replace("files/", "");

							ft.download('http://mobileapps.fekiwebstudio.hu/ibabylife/' + url, 'cdvfile://localhost/persistent/Pictures/iBabyLife/' + imgName, function(entry) {
							}, function(error) {
							});
						}

					};
					
				

					
				
				}).error(function(data, status, headers, config) {
					$ionicLoading.hide();

					var myPopup = $ionicPopup.show({
						template : 'The device cannot connect to the server. This problem could be because of the slow internet connection. The event is saved on the device, so you can try to upload it again from the main menu.',
						title : 'Uploading failed.',
						buttons : [{
							text : '<b>Ok</b>',
							type : 'button-pink',
							onTap : function(e) {
								$scope.mentve = true;								
							}
						}]
					});

				}); 

				

			});
			
			
			//online mentés vége
		} else {
		
			$scope.data.albumid = $scope.data.album.id;
			$scope.data.eventMessage = $scope.data.message;
			$scope.data.eventMilestone = $scope.data.milestone;
			$scope.data.eventImg1 = $scope.images[0];
			$scope.data.eventImg2 = $scope.images[1];
			$scope.data.eventImg3 = $scope.images[2];
			$scope.data.eventImg4 = $scope.images[3];
			$scope.data.eventImg5 = $scope.images[4];
			$scope.data.eventImg6 = $scope.images[5];
			$scope.data.eventImg7 = $scope.images[6];
			$scope.data.eventImg8 = $scope.images[7];
			$scope.data.eventImg9 = $scope.images[8];
			$scope.data.eventImg10 = $scope.images[9];
			$scope.data.eventDate = currentDate() + " " + currentTime();

			
			dao.newEVent($scope.data,0,function() {
				$ionicLoading.hide();
				var myPopup = $ionicPopup.show({
					template : 'This event is saved on your phone. Next time when you will have internet connection you could try to upload it again.',
					title : $rootScope.loc.loginFailTitle,
					buttons : [{
						text : '<b>Ok</b>',
						type : 'button-pink',
						
						onTap : function(e) {

							$scope.uploading = false;
							$scope.mentve = true;
							$rootScope.message = '';
							$rootScope.milestone = '';
						}

					}]
				});

			}); 

		}

		

	};

	
	function currentDate() {
		var currentDate = new Date;
		var Day = currentDate.getDate();
		if (Day < 10) {
			Day = '0' + Day;
		}//end if
		var Month = currentDate.getMonth() + 1;
		if (Month < 10) {
			Month = '0' + Month;
		}//end if
		var Year = currentDate.getFullYear();
		var fullDate = Year + '-' + Month + '-' + Day;
		return fullDate;
	}//end current date function

	function currentTime() {
		var currentTime = new Date;
		var Minutes = currentTime.getMinutes();
		if (Minutes < 10) {
			Minutes = '0' + Minutes;
		}
		var Hour = currentTime.getHours();
		if (Hour < 10) {
			Hour = '0' + Hour;
		}
		var second = currentTime.getSeconds();
		if (second < 10) {
			second = '0' + second;
		}

		var Time = Hour + ':' + Minutes + ':' + second;
		return Time;
	}// end current time function


	$scope.plusz1Image = function() {
	
		$rootScope.album = $scope.data.album.id;
		$rootScope.message = $scope.data.message;
		$rootScope.milestone = $scope.data.milestone;
	
		var options = {
			destinationType : Camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: true, 
			sourceType : 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
			encodingType : 0,
			quality: 100,
			targetWidth: 1440, 
  			targetHeight: 1440,
			correctOrientation : true
		};
		// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(onSuccess, onFail, options);
	};
	var onSuccess = function(imageData) {
	
		$rootScope.kepAdat = imageData;
		$state.go('filter');

	
	/*
		$scope.picData = "data:image/jpeg;base64," + imageData;
		$rootScope.kepAdat = imageData;			
		$rootScope.images.push($scope.picData);	 
	
		$state.transitionTo($state.current, $stateParams, {
			reload : true,
			inherit : false,
			notify : true
		});
    */
		

	};

	function onFail(message) {
		
	}

	
    
  
	$scope.checkImagesSize = function() {
		if ($rootScope.images.length > 1 ) {
			return true;
		}else{
			return false;
		}
	};
  
	$scope.show = function(index) {
		
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({			
			destructiveText : 'Delete ',
			titleText : 'Edit the picture.',
			cancelText : 'Cancel',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
				return true;
			},
			destructiveButtonClicked : function() {	
			
				$rootScope.images.splice(index,1);				

				$state.transitionTo($state.current, $stateParams, {
					reload : true,
					inherit : false,
					notify : true
				}); 


			}
		});
	};


    
}])


.controller('loginCtrl', ['$scope','$rootScope','$ionicPopup','$ionicPlatform','$state','$ionicLoading', 'userService', function($scope, $rootScope, $ionicPopup,$ionicPlatform, $state,$ionicLoading, userService) {
	$ionicLoading.show({
		template : 'Login..'
	});	

	
	 	 
	document.addEventListener("deviceready", onDeviceReady, false);
	// device APIs are available
	function onDeviceReady() {
	
	 

		
	
	 
	 
	$ionicPlatform.registerBackButtonAction(function () {	 
	    var myPopup = $ionicPopup.show({		   
		    title: 'Quit',
		    subTitle: 'Are you sure you want to quit?',
		    scope: $scope,
		    buttons: [
		      { text: 'No' },
		      {
		        text: '<b>Yes</b>',
		        type: 'button-pink',
		        onTap: function(e) {
		          navigator.app.exitApp();		          
		        }
		      },
		    ]
		  });	 	  
	}, 100);

	
	var online = function(session) {
		var current_time = (new Date()).getTime() / 1000;		
		return session && session.access_token && session.expires > current_time;
		
	};

	
	var loginIBabyLife = function(){
		if(localStorage.getItem('ibabylifeemail') != null){
			return true;
		}else{
			return false;
		}
	};


	var facebookonline = hello("facebook").getAuthResponse();
	var googleonline = hello("google").getAuthResponse();
	var twitteronline = hello("twitter").getAuthResponse();
	
	
	
	
 
	

		
		
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN] = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI] = 'WiFi connection';
		states[Connection.CELL_2G] = 'Cell 2G connection';
		states[Connection.CELL_3G] = 'Cell 3G connection';
		states[Connection.CELL_4G] = 'Cell 4G connection';
		states[Connection.NONE] = 'No network connection';
		
		if ((online(facebookonline) || online(googleonline) || online(twitteronline) || loginIBabyLife())) {
	
			
			if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
						
							
			
				if (online(facebookonline) || online(googleonline) || online(twitteronline)) {

					$rootScope.user = {
						name : localStorage.getItem('username'),
						email : localStorage.getItem('email')
					};
					$ionicLoading.hide();
					$state.go('home');

				} else if (loginIBabyLife()) {
					$rootScope.user = {
						name : localStorage.getItem('ibabylifeusername'),
						email : localStorage.getItem('ibabylifeemail')
					};
					$rootScope.$apply($rootScope.user);
					$ionicLoading.hide();
					$state.go('home');
				}

				/*
				var myPopup = $ionicPopup.show({
					template : 'Mivel nincs internetkapcsolatod, csak offline módban tudsz tovább lépni. Lesznek olyan funkciók, amik ilyenkor nem használhatóak.',
					title : $rootScope.loc.loginFailTitle,
					buttons : [{
						text : '<b>Ok</b>',
						type : 'button-light',
						onTap : function(e) {
							

						}
					}]
				}); 
*/
				
			} else {
				
				if (online(facebookonline) || online(googleonline) || online(twitteronline)) {

					$rootScope.user = {
						name : localStorage.getItem('username'),
						email : localStorage.getItem('email')
					};
					if(online(facebookonline)){
						 gaPlugin.trackEvent( successHandler, errorHandler, $rootScope.user.name+" "+$rootScope.user.email, "Bejelentkezett : Facebook", new Date() , 1);
					}else if(online(googleonline)){
						 gaPlugin.trackEvent( successHandler, errorHandler, $rootScope.user.name+" "+$rootScope.user.email, "Bejelentkezett : Google", new Date() , 1);
					}
					
					
					$ionicLoading.hide();
					$state.go('home');

				} else if (loginIBabyLife()) {
					$rootScope.user = {
						name : localStorage.getItem('ibabylifeusername'),
						email : localStorage.getItem('ibabylifeemail')
					};
					gaPlugin.trackEvent( successHandler, errorHandler, $rootScope.user.name+" "+$rootScope.user.email, "Bejelentkezett : iBabyLife", new Date() , 1);
					$rootScope.$apply($rootScope.user);
					$ionicLoading.hide();
					$state.go('home');
				}
		
			}
	
		} else {
	
			$ionicLoading.hide();
		}
	
	  $scope.loginFacebook = userService.loginFacebook;
	  $scope.loginGoogle = userService.loginGoogle;
	  $scope.loginTwitter = userService.loginTwitter;
	  
	  $scope.loginIbabyLife = function() {
		 if(checkConnection()){	 
			  var myPopup = $ionicPopup.show({
			    template: $rootScope.loc.ibabylifeloginpopupText,
			    title: 'IBabyLife login',
			    buttons: [
			      { text: '<b>Not yet</b>',	      
			        type: 'button-light',
			        onTap: function(e) {
			          $state.go('signup');
			        }
			      },
			      {
			        text: '<b>Yes</b>',
			        type: 'button-pink',
			        onTap: function(e) {
			          $state.go('signin');
			        }
			      },
			    ]
			  });
		  }else{
	      	  var myPopup = $ionicPopup.show({
				    template: $rootScope.loc.loginFailText,
				    title: $rootScope.loc.loginFailTitle,
				    buttons: [
				      {
				        text: '<b>Ok</b>',
				        type: 'button-pink',
				        onTap: function(e) {
				        }
				      },
				    ]
				  });
	      }
		
		  
	
	  };
  };
}]);