angular.module('starter.controllers', ['starter.services','ngStorage'])

.controller('LoginCtrl', function($rootScope, $localStorage, $scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.a = {};
  $rootScope.accountname=$localStorage.savedusername;
  var  cekaccount = function() {
    if($localStorage.savedusername == undefined && $localStorage.savedpassword  == undefined)
    {
      $scope.statusaccount=false;
    }
    else
    {
      $scope.statusaccount=true;
    }
  }
  cekaccount();
  $scope.signup = function()
  {
    // A confirm dialog
      var confirmPopup = $ionicPopup.confirm({
        title: 'Create New Account',
        template: 'All the saved setting will be lost. Are you sure you want to create a new account?',
        cssClass:'mypouplogin'
      });

      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
          $localStorage.$reset();
          $scope.statusaccount=false;
        } else {
          console.log('You are not sure');
        }
      });
  }

  $scope.save = function() {
    $localStorage.savedusername = $scope.a.username;
    $localStorage.savedpassword = $scope.a.password;
    $rootScope.accountname=$localStorage.savedusername;
    $scope.a.username = "";
    $scope.a.password = "";
    var alertPopup = $ionicPopup.alert({
        title: 'Registration Success!',
        template:'Please login '+ $localStorage.savedusername,
        cssClass:'mypouplogin'
    });
    $scope.statusaccount=true;
  }

  $scope.login = function() {
      LoginService.loginUser($localStorage.savedusername, $localStorage.savedpassword , $scope.data.username, $scope.data.password)
      .success(function(data) {
        $rootScope.accountname=$localStorage.savedusername;
        $scope.data.username = "";
        $scope.data.password = "";
        $state.go('app.home');
      })
      .error(function(data) {
        $scope.data.username = "";
        $scope.data.password = "";
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!',
          cssClass:'mypoup'
        });
      });
  }
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout,  $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Open the login modal
  $scope.logout = function() {
     $state.go('login');
  };

})

.controller('HomeCtrl', function($scope, $cordovaNetwork, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification, $localStorage)
{
  $rootScope.tampilkanSisawaktu=false;
  $rootScope.curr_hour=4;
  $rootScope.curr_minute=0;
  $rootScope.curr_second=0;
  $rootScope.progressval=14400;
  $scope.networkType = null;
  $scope.connectionType = null;

  document.addEventListener("deviceready", function () {
    $scope.networkType = $cordovaNetwork.getNetwork();
    if ($cordovaNetwork.isOnline()) {
      $scope.connectionType = 'Online';
    }
    else if ($cordovaNetwork.isOffline()) {
      $scope.connectionType = 'Offline';
      $ionicPlatform.ready(function () {
       $cordovaLocalNotification.schedule({
               id: 1,
               title: 'WARNING!',
               text: 'Network not available. Please Turn on mobile data or wifi network!',
             }).then(function (result) {
               console.log('Notification 1 triggered');
             });
       });
    }
    else {
      $scope.errorMsg = 'Error getting isOffline / isOnline methods';
    }
  }, false);

  $scope.logout = function(){
    $state.go('login');
  }
  /////////////////////////////////////////////////////
  //-----------Cek Status Kendali Cerdas--------------
  ////////////////////////////////////////////////////
  function ceklaststate_kendalicerdas(){
    if($localStorage.StateDevice1Scheduler==true){
      document.getElementById('scheduler_device1').innerHTML="ON";
      document.getElementById('scheduler_device1').style="background:teal";
      if($localStorage.Device1setTimeStart!=undefined && $localStorage.Device1setTimeStop!=undefined){
        document.getElementById('scheduler_device1_timestart').innerHTML=$localStorage.Device1setTimeStart;
        document.getElementById('scheduler_device1_timestop').innerHTML=$localStorage.Device1setTimeStop;
      }
    }
    else{
      document.getElementById('scheduler_device1').innerHTML="OFF";
      document.getElementById('scheduler_device1_timestart').innerHTML="-";
      document.getElementById('scheduler_device1_timestop').innerHTML="-";
    }
    if($localStorage.StateDevice2Scheduler==true){
      document.getElementById('scheduler_device2').innerHTML="ON";
      document.getElementById('scheduler_device2').style="background:teal";
      if($localStorage.Device2setTimeStart!=undefined && $localStorage.Device2setTimeStop!=undefined){
        document.getElementById('scheduler_device2_timestart').innerHTML=$localStorage.Device2setTimeStart;
        document.getElementById('scheduler_device2_timestop').innerHTML=$localStorage.Device2setTimeStop;
      }
    }
    else{
      document.getElementById('scheduler_device2').innerHTML="OFF";
      document.getElementById('scheduler_device2_timestart').innerHTML="-";
      document.getElementById('scheduler_device2_timestop').innerHTML="-";
    }
    if($localStorage.StateDevice1AutoTemp==true){
      document.getElementById('temperaturetrigger_device1').innerHTML="ON";
      document.getElementById('temperaturetrigger_device1').style="background:teal";
      if($localStorage.Device1setsuhualarm!=undefined){
        document.getElementById('temperaturetrigger_device1_setsuhu').innerHTML=$localStorage.Device1setsuhualarm+"&deg;C";
      }
    }
    else{
      document.getElementById('temperaturetrigger_device1').innerHTML="OFF";
      document.getElementById('temperaturetrigger_device1_setsuhu').innerHTML="-";
    }
    if($localStorage.StateDevice2AutoTemp==true){
      document.getElementById('temperaturetrigger_device2').innerHTML="ON";
      document.getElementById('temperaturetrigger_device2').style="background:teal";
      if($localStorage.Device2setsuhualarm!=undefined){
        document.getElementById('temperaturetrigger_device2_setsuhu').innerHTML=$localStorage.Device2setsuhualarm+"&deg;C";
      }
    }
    else{
      document.getElementById('temperaturetrigger_device2').innerHTML="OFF";
      document.getElementById('temperaturetrigger_device2_setsuhu').innerHTML="-";
    }
    //
    if($localStorage.StateDevice1AutoDoor==true){
      document.getElementById('Doortrigger_device1').innerHTML="ON";
      document.getElementById('Doortrigger_device1').style="background:teal";
    }
    else{
      document.getElementById('Doortrigger_device1').innerHTML="OFF";
    }
    if($localStorage.StateDevice2AutoDoor==true){
      document.getElementById('Doortrigger_device2').innerHTML="ON";
      document.getElementById('Doortrigger_device2').style="background:teal";
    }
    else{
      document.getElementById('Doortrigger_device2').innerHTML="OFF";
    }
    //
    if($localStorage.StateKeamananDoor==true){
      document.getElementById('doorsistemkeamanan').innerHTML="ON";
      document.getElementById('doorsistemkeamanan').style="background:teal";
    }
    else{
      document.getElementById('doorsistemkeamanan').innerHTML="OFF";
    }
    if($localStorage.StateKeamananMotion==true){
      document.getElementById('motionsistemkeamanan').innerHTML="ON";
      document.getElementById('doorsistemkeamanan').style="background:teal";
    }
    else{
      document.getElementById('motionsistemkeamanan').innerHTML="OFF";
    }
  }
  ceklaststate_kendalicerdas();
})

.controller('InformationCtrl', function($scope) {
})

.controller('BulbSettingCtrl', function($scope, $rootScope, $localStorage, $ionicPopup)
{
  var ceksaved = function() {
    if ($localStorage.BulbApiKeyState!=undefined && $localStorage.BulbChannelIDState!=undefined && $localStorage.BulbFieldState!=undefined && $localStorage.BulbApiKeyCurrent!=undefined && $localStorage.BulbChannelIDCurrent!=undefined && $localStorage.BulbFieldCurrent!=undefined) {
      document.getElementById('BulbApiKeyState').innerHTML = $localStorage.BulbApiKeyState;
      document.getElementById('BulbChannelIDState').innerHTML = $localStorage.BulbChannelIDState;
      document.getElementById('BulbFieldState').innerHTML = $localStorage.BulbFieldState;
      document.getElementById('BulbApiKeyCurrent').innerHTML = $localStorage.BulbApiKeyCurrent;
      document.getElementById('BulbChannelIDCurrent').innerHTML = $localStorage.BulbChannelIDCurrent;
      document.getElementById('BulbFieldCurrent').innerHTML = $localStorage.BulbFieldCurrent;
      $scope.SavedBulb=true;
    }
    else{
      $scope.SavedBulb=false;
    }
  }
  ceksaved();
  $scope.Bulb={};
    $scope.SaveBulb = function () {
      if ($scope.Bulb.ApiKeyState!=undefined && $scope.Bulb.ChannelIDState!=undefined && $scope.Bulb.FieldState!=undefined && $scope.Bulb.ApiKeyCurrent!=undefined && $scope.Bulb.ChannelIDCurrent!=undefined && $scope.Bulb.FieldCurrent!=undefined)
      {
        $localStorage.BulbApiKeyState = $scope.Bulb.ApiKeyState;
        $localStorage.BulbChannelIDState = $scope.Bulb.ChannelIDState;
        $localStorage.BulbFieldState  = $scope.Bulb.FieldState;
        $localStorage.BulbApiKeyCurrent = $scope.Bulb.ApiKeyCurrent;
        $localStorage.BulbChannelIDCurrent  = $scope.Bulb.ChannelIDCurrent;
        $localStorage.BulbFieldCurrent  = $scope.Bulb.FieldCurrent;
        document.getElementById('BulbApiKeyState').innerHTML = $localStorage.BulbApiKeyCurrent;
        document.getElementById('BulbChannelIDState').innerHTML = $localStorage.BulbChannelIDState;
        document.getElementById('BulbFieldState').innerHTML = $localStorage.BulbFieldState;
        document.getElementById('BulbApiKeyCurrent').innerHTML = $localStorage.BulbApiKeyCurrent;
        document.getElementById('BulbChannelIDCurrent').innerHTML = $localStorage.BulbChannelIDCurrent;
        document.getElementById('BulbFieldCurrent').innerHTML = $localStorage.BulbFieldCurrent;
        $scope.Bulb={};
        $scope.SavedBulb=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeBulb = function () {
      $localStorage.BulbApiKeyState = undefined;
      $localStorage.BulbChannelIDState = undefined;
      $localStorage.BulbFieldState  = undefined;
      $localStorage.BulbApiKeyCurrent = undefined;
      $localStorage.BulbChannelIDCurrent  = undefined;
      $localStorage.BulbFieldCurrent  = undefined;
      $scope.SavedBulb = false;
    };
})

.controller('Relay1Ctrl', function($scope, $rootScope, $localStorage, $ionicPopup)
{
  var ceksaved = function() {
    if ($localStorage.ApiKeyRelay1!=undefined && $localStorage.FieldRelay1!=undefined){
      document.getElementById('ApiKeyRelay1').innerHTML = $localStorage.ApiKeyRelay1;
      document.getElementById('FieldRelay1').innerHTML = $localStorage.FieldRelay1;
      $scope.SavedRelay1=true;
    }
    else{
      $scope.SavedRelay1=false;
    }
  }
  ceksaved();
  $scope.Relay1={};
    $scope.SaveRelay1 = function () {
      if ($scope.Relay1.ApiKey!=undefined && $scope.Relay1.Field!=undefined) {
        $localStorage.ApiKeyRelay1 = $scope.Relay1.ApiKey;
        $localStorage.FieldRelay1  = $scope.Relay1.Field;
        document.getElementById('ApiKeyRelay1').innerHTML = $localStorage.ApiKeyRelay1;
        document.getElementById('FieldRelay1').innerHTML = $localStorage.FieldRelay1;
        $scope.Relay1={};
        $scope.SavedRelay1=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeRelay1 = function () {
      $localStorage.ApiKeyRelay1=undefined;
      $localStorage.FieldRelay1=undefined;
      $scope.SavedRelay1 = false;
    };
})

.controller('FanSettingCtrl', function($scope, $rootScope, $localStorage, $ionicPopup)
{
  var ceksaved = function() {
    if ($localStorage.FanApiKeyState!=undefined && $localStorage.FanChannelIDState!=undefined && $localStorage.FanFieldState!=undefined && $localStorage.FanApiKeyCurrent!=undefined && $localStorage.FanChannelIDCurrent!=undefined && $localStorage.FanFieldCurrent!=undefined) {
      document.getElementById('FanApiKeyState').innerHTML = $localStorage.FanApiKeyState;
      document.getElementById('FanChannelIDState').innerHTML = $localStorage.FanChannelIDState;
      document.getElementById('FanFieldState').innerHTML = $localStorage.FanFieldState;
      document.getElementById('FanApiKeyCurrent').innerHTML = $localStorage.FanApiKeyCurrent;
      document.getElementById('FanChannelIDCurrent').innerHTML = $localStorage.FanChannelIDCurrent;
      document.getElementById('FanFieldCurrent').innerHTML = $localStorage.FanFieldCurrent;
      $scope.SavedFan=true;
    }
    else{
      $scope.SavedFan=false;
    }
  }
  ceksaved();
  $scope.Fan={};
    $scope.SaveFan = function () {
      if ($scope.Fan.ApiKeyState!=undefined && $scope.Fan.ChannelIDState!=undefined && $scope.Fan.FieldState!=undefined && $scope.Fan.ApiKeyCurrent!=undefined && $scope.Fan.ChannelIDCurrent!=undefined && $scope.Fan.FieldCurrent!=undefined) {
        $localStorage.FanApiKeyState = $scope.Fan.ApiKeyState;
        $localStorage.FanChannelIDState = $scope.Fan.ChannelIDState;
        $localStorage.FanFieldState  = $scope.Fan.FieldState;
        $localStorage.FanApiKeyCurrent = $scope.Fan.ApiKeyCurrent;
        $localStorage.FanChannelIDCurrent  = $scope.Fan.ChannelIDCurrent;
        $localStorage.FanFieldCurrent  = $scope.Fan.FieldCurrent;
        document.getElementById('FanApiKeyState').innerHTML = $localStorage.FanApiKeyState;
        document.getElementById('FanChannelIDState').innerHTML = $localStorage.FanChannelIDState;
        document.getElementById('FanFieldState').innerHTML = $localStorage.FanFieldState;
        document.getElementById('FanApiKeyCurrent').innerHTML = $localStorage.FanApiKeyCurrent;
        document.getElementById('FanChannelIDCurrent').innerHTML = $localStorage.FanChannelIDCurrent;
        document.getElementById('FanFieldCurrent').innerHTML = $localStorage.FanFieldCurrent;
        $scope.Fan={};
        $scope.SavedFan=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeFan = function () {
      $localStorage.FanApiKeyState = undefined;
      $localStorage.FanChannelIDState = undefined;
      $localStorage.FanFieldState  = undefined;
      $localStorage.FanApiKeyCurrent = undefined;
      $localStorage.FanChannelIDCurrent  = undefined;
      $localStorage.FanFieldCurrent  = undefined;
      $scope.SavedFan = false;
    };
})

.controller('Relay2Ctrl', function($scope, $rootScope, $localStorage, $ionicPopup)
{
  var ceksaved = function() {
    if ($localStorage.ApiKeyRelay2!=undefined && $localStorage.FieldRelay2!=undefined){
      document.getElementById('ApiKeyRelay2').innerHTML = $localStorage.ApiKeyRelay2;
      document.getElementById('FieldRelay2').innerHTML = $localStorage.FieldRelay2;
      $scope.SavedRelay2=true;
    }
    else{
      $scope.SavedRelay2=false;
    }
  }
  ceksaved();
  $scope.Relay2={};
    $scope.SaveRelay2 = function () {
      if ($scope.Relay2.ApiKey!=undefined && $scope.Relay2.Field!=undefined) {
        $localStorage.ApiKeyRelay2 = $scope.Relay2.ApiKey;
        $localStorage.FieldRelay2  = $scope.Relay2.Field;
        document.getElementById('ApiKeyRelay1').innerHTML = $localStorage.ApiKeyRelay2;
        document.getElementById('FieldRelay1').innerHTML = $localStorage.FieldRelay2;
        $scope.Relay2={};
        $scope.SavedRelay2=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeRelay2 = function () {
      $localStorage.ApiKeyRelay2=undefined;
      $localStorage.FieldRelay2=undefined;
      $scope.SavedRelay2 = false;
    };
})


.controller('MotionCtrl', function($scope, $rootScope, $localStorage, $ionicPopup)
{
  var ceksaved = function() {
    if ($localStorage.MotionApiKey!=undefined && $localStorage.MotionChannelID!=undefined && $localStorage.MotionField!=undefined){
      document.getElementById('MotionApiKey').innerHTML = $localStorage.MotionApiKey;
      document.getElementById('MotionChannelID').innerHTML = $localStorage.MotionChannelID;
      document.getElementById('MotionField').innerHTML =  $localStorage.MotionField;
      $scope.SavedMotion=true;
    }
    else{
      $scope.SavedMotion=false;
    }
  }
  ceksaved();
  $scope.Motion={};
    $scope.SaveMotion = function () {
      if ($scope.Motion.ApiKey!=undefined && $scope.Motion.ChannelID!=undefined && $scope.Motion.Field!=undefined) {
        $localStorage.MotionApiKey = $scope.Motion.ApiKey;
        $localStorage.MotionChannelID  = $scope.Motion.ChannelID;
        $localStorage.MotionField  = $scope.Motion.Field;
        document.getElementById('MotionApiKey').innerHTML = $localStorage.MotionApiKey;
        document.getElementById('MotionChannelID').innerHTML = $localStorage.MotionChannelID;
        document.getElementById('MotionField').innerHTML = $localStorage.MotionField;
        $scope.Motion={};
        $scope.SavedMotion=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeMotion = function () {
      $localStorage.MotionApiKey = undefined;
      $localStorage.MotionChannelID  = undefined;
      $localStorage.MotionField  = undefined;
      $scope.SavedMotion = false;
    };
})

.controller('WindowCtrl', function($scope, $rootScope, $localStorage, $ionicPopup)
{
  var ceksaved = function() {
    if ($localStorage.WindowApiKey!=undefined && $localStorage.WindowChannelID!=undefined && $localStorage.WindowField!=undefined){
      document.getElementById('WindowApiKey').innerHTML = $localStorage.WindowApiKey;
      document.getElementById('WindowChannelID').innerHTML = $localStorage.WindowChannelID;
      document.getElementById('WindowField').innerHTML =  $localStorage.WindowField;
      $scope.SavedWindow=true;
    }
    else{
      $scope.SavedWindow=false;
    }
  }
  ceksaved();
  $scope.Window={};
    $scope.SaveWindow = function () {
      if ($scope.Window.ApiKey!=undefined && $scope.Window.ChannelID!=undefined && $scope.Window.Field!=undefined) {
        $localStorage.WindowApiKey = $scope.Window.ApiKey;
        $localStorage.WindowChannelID  = $scope.Window.ChannelID;
        $localStorage.WindowField  = $scope.Window.Field;
        document.getElementById('WindowApiKey').innerHTML = $localStorage.WindowApiKey;
        document.getElementById('WindowChannelID').innerHTML = $localStorage.WindowChannelID;
        document.getElementById('WindowField').innerHTML = $localStorage.WindowField;
        $scope.Window={};
        $scope.SavedWindow=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeWindow = function () {
      $localStorage.WindowApiKey = undefined;
      $localStorage.WindowChannelID  = undefined;
      $localStorage.WindowField  = undefined;
      $scope.SavedWindow = false;
    };
})

.controller('TemperatureCtrl', function($scope, $rootScope, $localStorage, $ionicPopup)
{
  var ceksaved = function() {
    if ($localStorage.TemperatureApiKey!=undefined && $localStorage.TemperatureChannelID!=undefined && $localStorage.TemperatureField!=undefined){
      document.getElementById('TemperatureApiKey').innerHTML = $localStorage.TemperatureApiKey;
      document.getElementById('TemperatureChannelID').innerHTML = $localStorage.TemperatureChannelID;
      document.getElementById('TemperatureField').innerHTML = $localStorage.TemperatureField;
      $scope.SavedTemperature=true;
    }
    else{
      $scope.SavedTemperature=false;
    }
  }
  ceksaved();
  $scope.Temperature={};
    $scope.SaveTemperature = function () {
      if ($scope.Temperature.ApiKey!=undefined && $scope.Temperature.ChannelID!=undefined && $scope.Temperature.Field!=undefined) {
        $localStorage.TemperatureApiKey = $scope.Temperature.ApiKey;
        $localStorage.TemperatureChannelID  = $scope.Temperature.ChannelID;
        $localStorage.TemperatureField  = $scope.Temperature.Field;
        document.getElementById('TemperatureApiKey').innerHTML = $localStorage.TemperatureApiKey ;
        document.getElementById('TemperatureChannelID').innerHTML = $localStorage.TemperatureChannelID;
        document.getElementById('TemperatureField').innerHTML = $localStorage.TemperatureField;
        $scope.Temperature={};
        $scope.SavedTemperature=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeTemperature = function () {
      $localStorage.TemperatureApiKey = undefined;
      $localStorage.TemperatureChannelID  = undefined;
      $localStorage.TemperatureField  = undefined;
      $scope.SavedTemperature = false;
    };
})

.controller('SettingCtrl', function($scope, $rootScope, $state, $localStorage, $ionicPopup)
{
  var ceksaved = function(){
    if ($localStorage.wsBroker!=undefined && $localStorage.wsPort!=undefined){
      document.getElementById('Broker').innerHTML = $localStorage.wsBroker;
      document.getElementById('Port').innerHTML = $localStorage.wsPort;
      $rootScope.wsBroker =  $localStorage.wsBroker;
      $rootScope.wsPort = $localStorage.wsPort;
      $scope.SavedWS = true;
    }
    else{
      $scope.SavedWS = false;
    }
  }
  ceksaved();
  $scope.wsBroker={};
  $scope.SaveBroker = function () {
    if ($scope.wsBroker.address!=undefined && $scope.wsBroker.Port!=undefined) {
      $localStorage.wsBroker =$scope.wsBroker.address;
      $localStorage.wsPort =$scope.wsBroker.Port;
      document.getElementById('Broker').innerHTML = $localStorage.wsBroker;
      document.getElementById('Port').innerHTML = $localStorage.wsPort;
      wsBroker={};
      $scope.SavedWS = true;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill all the input, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  };
  $scope.removeBroker = function () {
    $localStorage.wsBroker=undefined;
    $localStorage.wsPort=undefined;
    $scope.SavedWS = false;
  };
})

.controller('StatusCtrl', function($state, $scope, $interval, $ionicPopup, $cordovaVibration, $rootScope, $timeout, $localStorage, $ionicPlatform, $cordovaLocalNotification) {
//------------------------------------------------
  function getStateBulb() {
    if ($localStorage.BulbApiKeyState!=undefined && $localStorage.BulbChannelIDState!=undefined && $localStorage.BulbFieldState!=undefined)
    {
      $.get("https://thingspeak.com/channels/"+$localStorage.BulbChannelIDState+"/fields/"+$localStorage.BulbFieldState+"/last.txt?api_key="+$localStorage.BulbApiKeyState, function(d){
        $localStorage.Statebulb = d;
          if (d==true){
            document.getElementById('StateBulb').innerHTML= "ON";
          }
          else {
            document.getElementById('StateBulb').innerHTML= "OFF";
          }
      })
      $.get("https://thingspeak.com/channels/"+$localStorage.BulbChannelIDState+"/fields/"+$localStorage.BulbFieldState+"/last.json?api_key="+$localStorage.BulbApiKeyState, function(d){
        $scope.StatebulbDate = d.created_at;
        document.getElementById('StateBulbDate').innerHTML= $scope.StatebulbDate;
      })
    }
  }

  function getCurrentBulb() {
    if ($localStorage.BulbApiKeyCurrent!=undefined && $localStorage.BulbChannelIDCurrent!=undefined && $localStorage.BulbFieldCurrent!=undefined)
    {
      $.get("https://thingspeak.com/channels/"+$localStorage.BulbChannelIDCurrent+"/fields/"+$localStorage.BulbFieldCurrent+"/last.txt?api_key="+$localStorage.BulbApiKeyCurrent, function(d){
        $scope.Currentbulb = d;
          if (d==true){
            document.getElementById('Current1').innerHTML= $scope.Currentbulb +" A";
          }
          else {
            document.getElementById('Current1').innerHTML= $scope.Currentbulb +" A";
          }
      })
      $.get("https://thingspeak.com/channels/"+$localStorage.BulbChannelIDCurrent+"/fields/"+$localStorage.BulbFieldCurrent+"/last.json?api_key="+$localStorage.BulbApiKeyCurrent, function(d){
        $scope.CurrentbulbDate = d.created_at;
        document.getElementById('Current1Date').innerHTML= $scope.CurrentbulbDate;
      })
    }
  }
  //------------------------------------------------
  function getStateFan() {
    if ($localStorage.FanApiKeyState!=undefined && $localStorage.FanChannelIDState!=undefined && $localStorage.FanFieldState!=undefined)
    {
      $.get("https://thingspeak.com/channels/"+$localStorage.FanChannelIDState+"/fields/"+$localStorage.FanFieldState+"/last.txt?api_key="+$localStorage.FanApiKeyState, function(d){
        $localStorage.Statefan = d;
          if (d==true){
            document.getElementById('StateFan').innerHTML= "ON";
          }
          else {
            document.getElementById('StateFan').innerHTML= "OFF";
          }
      })
      $.get("https://thingspeak.com/channels/"+$localStorage.FanChannelIDState+"/fields/"+$localStorage.FanFieldState+"/last.json?api_key="+$localStorage.FanApiKeyState, function(d){
        $scope.StatefanDate = d.created_at;
        document.getElementById('StateFanDate').innerHTML= $scope.StatefanDate;
      })
    }
  }

  function getCurrentFan() {
    if ($localStorage.FanApiKeyCurrent!=undefined && $localStorage.FanChannelIDCurrent!=undefined && $localStorage.FanFieldCurrent!=undefined)
    {
      $.get("https://thingspeak.com/channels/"+$localStorage.FanChannelIDCurrent+"/fields/"+$localStorage.FanFieldCurrent+"/last.txt?api_key="+$localStorage.FanApiKeyCurrent, function(d){
        $scope.Currentfan = d;
          if (d==true){
            document.getElementById('Current2').innerHTML= $scope.Currentfan+" A";
          }
          else {
            document.getElementById('Current2').innerHTML= $scope.Currentfan+" A";
          }
      })
      $.get("https://thingspeak.com/channels/"+$localStorage.FanChannelIDCurrent+"/fields/"+$localStorage.FanFieldCurrent+"/last.json?api_key="+$localStorage.FanApiKeyCurrent, function(d){
        $scope.CurrentfanDate = d.created_at;
        document.getElementById('Current2Date').innerHTML= $scope.CurrentfanDate;
      })
    }
  }
//------------------------------------------------
function getMotion() {
  if ($localStorage.MotionApiKey!=undefined && $localStorage.MotionChannelID!=undefined && $localStorage.MotionField!=undefined)
  {
    $.get("https://thingspeak.com/channels/"+$localStorage.MotionChannelID+"/fields/"+$localStorage.MotionField+"/last.txt?api_key="+$localStorage.MotionApiKey, function(d){
        $scope.captureMotion=d;
        if (d==true){
          document.getElementById('gerak').innerHTML= "Detected";
        }
        else {
          document.getElementById('gerak').innerHTML= "Not Detected";
        }
    })
    $.get("https://thingspeak.com/channels/"+$localStorage.MotionChannelID+"/fields/"+$localStorage.MotionField+"/last.json?api_key="+$localStorage.MotionApiKey, function(d){
        $scope.MotionDate = d.created_at;
        document.getElementById('gerakDate').innerHTML= $scope.MotionDate;
    })
  }
}
function getWindow() {
  if ($localStorage.WindowApiKey!=undefined && $localStorage.WindowChannelID!=undefined && $localStorage.WindowField!=undefined)
  {
    $.get("https://thingspeak.com/channels/"+$localStorage.WindowChannelID+"/fields/"+$localStorage.WindowField+"/last.txt?api_key="+$localStorage.WindowApiKey, function(d){
        $scope.captureDoor=d;
        if (d==true){
          document.getElementById('windowstate').innerHTML= "Open";
        }
        else {
          document.getElementById('windowstate').innerHTML= "Closed";
        }
    })
    $.get("https://thingspeak.com/channels/"+$localStorage.WindowChannelID+"/fields/"+$localStorage.WindowField+"/last.json?api_key="+$localStorage.WindowApiKey, function(d){
        $scope.WindowAlarmDate = d.created_at;
        document.getElementById('windowstateDate').innerHTML= $scope.WindowAlarmDate;
    })
  }
}
function getTemperature() {
  if ($localStorage.TemperatureApiKey!=undefined && $localStorage.TemperatureChannelID!=undefined && $localStorage.TemperatureField!=undefined)
  {
    $.get("https://thingspeak.com/channels/"+$localStorage.TemperatureChannelID+"/fields/"+$localStorage.TemperatureField+"/last.txt?api_key="+$localStorage.TemperatureApiKey, function(d){
      $scope.Temperature = d;
      if (d==true)
      {
        document.getElementById('suhu').innerHTML= $scope.Temperature+" &deg;C";
      }
      else {
        document.getElementById('suhu').innerHTML= $scope.Temperature+" &deg;C";
      }
    })
    $.get("https://thingspeak.com/channels/"+$localStorage.TemperatureChannelID+"/fields/"+$localStorage.TemperatureField+"/last.json?api_key="+$localStorage.TemperatureApiKey, function(d){
      $scope.TemperatureDate = d.created_at;
      document.getElementById('suhuDate').innerHTML= $scope.TemperatureDate;
    })
  }
}
//------------------------------------------------
function updatestatus()
{
  if ($localStorage.ConnectState==true){
    getStateBulb();
    getCurrentBulb();
    getStateFan();
    getCurrentFan();
    getMotion();
    getTemperature();
    getWindow();
    //cek kendali Cerdas
    //ceksistemkeamanandoor();
    //ceksistemkeamananmotion();
    //cekMotionAlarmDevice1();
    //cekMotionAlarmDevice2();
    //cekTemperatureAlarmDevice1();
    //cekTemperatureAlarmDevice2();
    //cekSchedulerStatusDevice1();
    //cekSchedulerStatusDevice2();
  }
  else {
    document.getElementById('StateBulb').innerHTML= "-";
    document.getElementById('StateBulbDate').innerHTML= "-";
    document.getElementById('Current1').innerHTML="- A";
    document.getElementById('Current1Date').innerHTML= "-";
    document.getElementById('StateFan').innerHTML= "-";
    document.getElementById('StateFanDate').innerHTML= "-";
    document.getElementById('Current2').innerHTML="- A";
    document.getElementById('Current2Date').innerHTML= "-";
    document.getElementById('gerak').innerHTML= "-";
    document.getElementById('gerakDate').innerHTML= "-";
    document.getElementById('windowstate').innerHTML= "-";
    document.getElementById('windowstateDate').innerHTML= "-";
    document.getElementById('suhu').innerHTML="- &deg;C";
    document.getElementById('suhuDate').innerHTML= "-";
  }
}
setInterval(updatestatus,1000);
//------------------------------------------------
//------------Kendali Cerdas----------------------
//------------------------------------------------
function ceksistemkeamanandoor(){
  if($localStorage.StateKeamananDoor==true){
    if($scope.captureDoor==true){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 1,
         title: 'WARNING!',
         text: 'Door is detected open by window/door sensor!',
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
    }
  }
}
function ceksistemkeamananmotion(){
  if($localStorage.StateKeamananMotion==true){
    if($scope.captureMotion==true){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 2,
         title: 'WARNING!',
         text: 'Motion is detected by motion sensor!',
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
    }
  }
}
function cekTemperatureAlarmDevice1(){
  if($localStorage.StateDevice1AutoTemp==true){
    if($scope.Temperature >= $localStorage.Device1setsuhualarm){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 3,
         title: 'WARNING!',
         text: 'Temperature is over '+ $localStorage.Device1setsuhualarm +' &deg;C. Device 1 is ON!',
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
    }
  }
}
function cekTemperatureAlarmDevice2(){
  if($localStorage.StateDevice2AutoTemp==true){
    if($scope.Temperature >= $localStorage.Device2setsuhualarm){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 4,
         title: 'WARNING!',
         text: 'Temperature is over '+ $localStorage.Device2setsuhualarm +' &deg;C. Device 2 is ON!',
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
    }
  }
}
function cekMotionAlarmDevice1(){
  if($localStorage.StateDevice1AutoMotion==true){
    if($scope.captureMotion == true){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 5,
         title: 'WARNING!',
         text: 'Motion Detected. Device 1 is ON!',
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
    }
  }
}
function cekMotionAlarmDevice2(){
  if($localStorage.StateDevice2AutoMotion==true){
    if($scope.captureMotion == true){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 6,
         title: 'WARNING!',
         text: 'Motion Detected. Device 2 is ON!',
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
    }
  }
}
function cekSchedulerStatusDevice1(){
  if($localStorage.StateDevice1Scheduler==true){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 6,
         title: 'WARNING!',
         text: 'Scheduler for device 1 is active!. Time Start = ' +$localStorage.Device1setTimeStart+" Time Stop = "+$localStorage.Device1setTimeStop,
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
  }
}
function cekSchedulerStatusDevice2(){
  if($localStorage.StateDevice2Scheduler==true){
      $ionicPlatform.ready(function () {
        $cordovaLocalNotification.schedule({
         id: 6,
         title: 'WARNING!',
         text: 'Scheduler for device 2 is active!. Time Start = ' +$localStorage.Device2setTimeStart+" Time Stop = "+$localStorage.Device2setTimeStop,
        }).then(function (result) {
         console.log('Notification 1 triggered');
        });
      });
  }
}
///-----------------------------------------------
function ceklaststatebulb() {
  if ($localStorage.Statebulb==true)
  {
    $scope.bulb = true;
  }
  else {
    $scope.bulb = false;
  }
}
ceklaststatebulb();

$scope.ONBulb = function () {
  if($localStorage.ApiKeyRelay1 != undefined && $localStorage.FieldRelay1 !=undefined)
  {
    $.get("https://api.thingspeak.com/update?api_key="+$localStorage.ApiKeyRelay1+"&field"+$localStorage.FieldRelay1+"=1", function(d){
      if(d!=0){
        document.getElementById('statuscode').innerHTML="Succeed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'SUCCEED!',
            template: 'Success to power on device 1',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else{
        document.getElementById('statuscode').innerHTML="Failed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'FAILED!',
            template: 'Wait for 15 seconds then try again',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    })
  }
  $scope.bulb = true;
}
$scope.OFFBulb = function () {
  if($localStorage.ApiKeyRelay1 != undefined && $localStorage.FieldRelay1 !=undefined)
  {
    $.get("https://api.thingspeak.com/update?api_key="+$localStorage.ApiKeyRelay1+"&field"+$localStorage.FieldRelay1+"=0", function(d){
      if(d!=0){
        document.getElementById('statuscode').innerHTML="Succeed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'SUCCEED!',
            template: 'Success to shut down device 1',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else{
        document.getElementById('statuscode').innerHTML="Failed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'FAILED!',
            template: 'Wait for 15 seconds then try again',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    })
  }
  $scope.bulb = false;
}
//------------------------------------------------
function ceklaststatefan() {
  if ($localStorage.Statefan==true)
  {
    $scope.fan = true;
  }
  else {
    $scope.fan = false;
  }
}
ceklaststatefan() ;
$scope.ONFan = function () {
  if($localStorage.ApiKeyRelay2 != undefined && $localStorage.FieldRelay2!=undefined)
  {
    $.get("https://api.thingspeak.com/update?api_key="+$localStorage.ApiKeyRelay2+"&field"+$localStorage.FieldRelay2+"=1", function(d){
      if(d!=0){
        document.getElementById('statuscode2').innerHTML="Succeed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'SUCCEED!',
            template: 'Success to power on device 2',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else{
        document.getElementById('statuscode2').innerHTML="Failed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'FAILED!',
            template: 'Wait for 15 seconds then try again',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    })
  }
  $scope.fan = true;
}
$scope.OFFFan = function () {
  if($localStorage.ApiKeyRelay2 != undefined && $localStorage.FieldRelay2!=undefined)
  {
    $.get("https://api.thingspeak.com/update?api_key="+$localStorage.ApiKeyRelay2+"&field"+$localStorage.FieldRelay2+"=0", function(d){
      if(d!=0){
        document.getElementById('statuscode2').innerHTML="Succeed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'SUCCEED',
            template: 'Success to shut down device 2',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else{
        document.getElementById('statuscode2').innerHTML="Failed";
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'FAILED!',
            template: 'Wait for 15 seconds then try again',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    })
  }
  $scope.fan = false;
}
//------------------------------------------------
function cekkoneksi(){
  if ($localStorage.ConnectState==undefined) {
    $localStorage.ConnectState=false;
    document.getElementById('status_koneksi').innerHTML= "Not Connected";
  }
  else {
    document.getElementById('status_koneksi').innerHTML= "Connected";
  }
}
cekkoneksi();
$scope.Connect = function () {
  $localStorage.ConnectState = true;
  document.getElementById('status_koneksi').innerHTML= "Connected";
}
$scope.Disconnect = function (){
  $localStorage.ConnectState = false;
  document.getElementById('status_koneksi').innerHTML= "Connection Lost";
}
//------------------------------------------------
//
$scope.goBulbSetting = function(){
  $state.go('app.bulbsetting');
}
$scope.goFanSetting = function(){
  $state.go('app.fansetting');
}

$scope.goSettingRelay1 = function(){
  $state.go('app.Relay1setting');
}

$scope.goSettingRelay2 = function(){
  $state.go('app.Relay2setting');
}

$scope.goMotion = function(){
  $state.go('app.motion');
}

$scope.goWindow= function(){
  $state.go('app.window');
}

$scope.goTemperature = function(){
  $state.go('app.temperature');
}

//------------------------------------------------
//
///
function showTime() {
  var a_p = "";
  var today = new Date();
  var curr_hour = today.getHours();
  var curr_minute = today.getMinutes();
  var curr_second = today.getSeconds();
  if (curr_hour < 12) {
      a_p = "AM";
  } else {
      a_p = "PM";
  }
  if (curr_hour == 0) {
      curr_hour = 12;
  }
  if (curr_hour > 12) {
      curr_hour = curr_hour - 12;
  }
  curr_hour = checkTime(curr_hour);
  curr_minute = checkTime(curr_minute);
  curr_second = checkTime(curr_second);
  document.getElementById('clock').innerHTML=curr_hour + ":" + curr_minute + ":" + curr_second + " " + a_p;
}

function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}
setInterval(showTime, 500);
var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var thisDay = date.getDay(),
  thisDay = myDays[thisDay];
var yy = date.getYear();
var year = (yy < 1000) ? yy + 1900 : yy;
document.getElementById('hari').innerHTML=thisDay + ', ' + day + ' ' + months[month] + ' ' + year;
//
//

})

.controller('KendaliOtomatisCtrl', function($scope, $rootScope, $state, $localStorage, $ionicPopup) {

  function ceklaststate(){
    if($localStorage.StateDevice1Scheduler==true || $localStorage.StateDevice2Scheduler==true){
      $localStorage.StateScheduler=true;
      cekstateScheduler();
    }
    else{
      $localStorage.StateScheduler=false;
    }
    $scope.Device1StateScheduler=$localStorage.ButtonDevice1Scheduler;
    $scope.Device2StateScheduler=$localStorage.ButtonDevice2Scheduler;
    if($localStorage.StateDevice1AutoTemp==true || $localStorage.StateDevice2AutoTemp==true){
      $localStorage.StateAutoTemp=true;
      cekstateTempAlarm();
    }
    else{
      $localStorage.StateAutoTemp=false;
    }
    $scope.Device1StateAutoTemp=$localStorage.ButtonDevice1AutoTemp;
    $scope.Device2StateAutoTemp=$localStorage.ButtonDevice2AutoTemp;
    //
    if($localStorage.StateDevice1AutoDoor==true || $localStorage.StateDevice2AutoDoor==true){
      $localStorage.StateAutoDoor=true;
      cekstateDoorAlarm();
    }
    else{
      $localStorage.StateAutoDoor=false;
    }
    $scope.Device1StateAutoDoor=$localStorage.ButtonDevice1AutoDoor;
    $scope.Device2StateAutoDoor=$localStorage.ButtonDevice2AutoDoor;
    //
    if($localStorage.StateKeamananDoor==true || $localStorage.StateKeamananMotion==true){
        $localStorage.SistemKeamanan=true;
        cekstatesistemkeamanan();
    }
    else{
        $localStorage.SistemKeamanan=false;
    }
    $scope.AutoKeamananDoor=$localStorage.AutoKeamananDoor;
    $scope.AutoKeamananMotion=$localStorage.AutoKeamananMotion;
    $scope.skenario = {
        sistemkeamanan : $localStorage.SistemKeamanan,
        doortrigger  : $localStorage.StateAutoDoor,
        suhu : $localStorage.StateAutoTemp,
        scheduler : $localStorage.StateScheduler
    }
  }
  ceklaststate();
  function cekstatesistemkeamanan(){
    if($localStorage.StateKeamananDoor==true && $localStorage.StateKeamananMotion==false)
    {
      $scope.sistemkeamanan = {windowalarm : true, motionalarm : false}
    }
    else if($localStorage.StateKeamananDoor==false && $localStorage.StateKeamananMotion==true)
    {
      $scope.sistemkeamanan = {windowalarm : false, motionalarm : true}
    }
    else if($localStorage.StateKeamananDoor==true && $localStorage.StateKeamananMotion==true)
    {
      $scope.sistemkeamanan = {windowalarm : true, motionalarm : true}
    }
    else
    {
      $scope.sistemkeamanan = {windowalarm : false, motionalarm : false}
    }
  }
  //
  function cekstateTempAlarm(){
    if($localStorage.StateDevice1AutoTemp==true && $localStorage.StateDevice2AutoTemp==true)
    {
      $scope.suhu = {
        device1 : true,
        device2 :true
      }
    }
    else if($localStorage.StateDevice1AutoTemp==true && $localStorage.StateDevice2AutoTemp==false)
    {
      $scope.suhu = {
        device1 : true,
        device2 :false
      }
    }
    else if($localStorage.StateDevice1AutoTemp==false && $localStorage.StateDevice2AutoTemp==true)
    {
      $scope.suhu = {
        device1 : false,
        device2 :true
      }
    }
    else{
      $scope.suhu = {
        device1 : false,
        device2 :false
      }
    }
  }
  //
  function cekstateDoorAlarm(){
    if($localStorage.StateDevice1AutoDoor==true && $localStorage.StateDevice2AutoDoor==true)
    {
      $scope.doortrigger = {
        device1 : true,
        device2 :true
      }
    }
    else if($localStorage.StateDevice1AutoDoor==true && $localStorage.StateDevice2AutoDoor==false)
    {
      $scope.doortrigger = {
        device1 : true,
        device2 :false
      }
    }
    else if($localStorage.StateDevice1AutoDoor==false && $localStorage.StateDevice2AutoDoor==true)
    {
      $scope.doortrigger = {
        device1 : false,
        device2 :true
      }
    }
    else{
      $scope.gerak = {
        device1 : false,
        device2 :false
      }
    }
  }
  //
  function cekstateScheduler(){
    if($localStorage.StateDevice1Scheduler==true && $localStorage.StateDevice2Scheduler==true)
    {
      $scope.scheduler = {
        device1 : true,
        device2 :true
      }
    }
    else if($localStorage.StateDevice1Scheduler==true && $localStorage.StateDevice2Scheduler==false)
    {
      $scope.scheduler = {
        device1 : true,
        device2 :false
      }
    }
    else if($localStorage.StateDevice1Scheduler==false && $localStorage.StateDevice2Scheduler==true)
    {
      $scope.scheduler = {
        device1 : false,
        device2 :true
      }
    }
    else{
      $scope.scheduler = {
        device1 : false,
        device2 :false
      }
    }
  }
  //
  //-------------------------------------
  //--------For setting API Key---------
  //-------------------------------------
  $scope.goSistemKeamanan = function(){
    $state.go('app.sistemkeamanan');
  }
  $scope.goSuhu = function(){
    $state.go('app.autotemp');
  }
  $scope.goGerak = function(){
    $state.go('app.autodoor');
  }
  $scope.goScheduler = function(){
    $state.go('app.scheduler');
  }
  //-------------------------------------
  $scope.AktifAutoKeamananDoor = function(){
    if($localStorage.KeamananApiKeyDoor!=undefined && $localStorage.KeamananFieldDoor!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.KeamananApiKeyDoor+"&field"+$localStorage.KeamananFieldDoor+"=1", function(d){
        if(d!=0){
          $localStorage.StateKeamananDoor=true;
          $localStorage.AutoKeamananDoor=true;
          document.getElementById('doorsistemkeamanan').innerHTML="ON";
          document.getElementById('doorsistemkeamanan').style="background:teal";
          document.getElementById('statuscodekeamananDoor').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Window/ Door Security System activated',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodekeamananDoor').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.AutoKeamananDoor=true;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownAutoKeamananDoor = function(){
    if($localStorage.KeamananApiKeyDoor!=undefined && $localStorage.KeamananFieldDoor!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.KeamananApiKeyDoor+"&field"+$localStorage.KeamananFieldDoor+"=0", function(d){
        if(d!=0){
          $localStorage.StateKeamananDoor=false;
          $localStorage.AutoKeamananDoor=false;
          document.getElementById('doorsistemkeamanan').innerHTML="OFF";
          document.getElementById('doorsistemkeamanan').style="background:white";
          document.getElementById('statuscodekeamananDoor').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut down Window/ Door Security System',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodekeamananDoor').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.AutoKeamananDoor=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  //---
  $scope.AktifAutoKeamananMotion= function(){
    if($localStorage.KeamananApiKeyMotion!=undefined && $localStorage.KeamananFieldMotion!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.KeamananApiKeyMotion+"&field"+$localStorage.KeamananFieldMotion+"=1", function(d){
        if(d!=0){
          $localStorage.StateKeamananMotion=true;
          $localStorage.AutoKeamananMotion=true;
          document.getElementById('motionsistemkeamanan').innerHTML="ON";
          document.getElementById('motionsistemkeamanan').style="background:teal";
          document.getElementById('statuscodekeamananMotion').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Motion Security System activated',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodekeamananMotion').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.AutoKeamananMotion=true;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownAutoKeamananMotion = function(){
    if($localStorage.KeamananApiKeyMotion!=undefined && $localStorage.KeamananFieldMotion!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.KeamananApiKeyMotion+"&field"+$localStorage.KeamananFieldMotion+"=0", function(d){
        if(d!=0){
          $localStorage.StateKeamananMotion=false;
          $localStorage.AutoKeamananMotion=false;
          document.getElementById('motionsistemkeamanan').innerHTML="OFF";
          document.getElementById('motionsistemkeamanan').style="background:white";
          document.getElementById('statuscodekeamananMotion').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut down Motion Security System',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodekeamananMotion').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.AutoKeamananMotion=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  //--
  //---
  function ceklastTempValue(){
    if($localStorage.Device1setsuhualarm!=undefined){
      $scope.a = {
        setsuhualarm :  $localStorage.Device1setsuhualarm
      };
    }
    else{
      $scope.a = {};
    }
    if($localStorage.Device2setsuhualarm!=undefined){
      $scope.b = {
        setsuhualarm :  $localStorage.Device2setsuhualarm
      };
    }
    else{
      $scope.b = {};
    }
  }
  ceklastTempValue();
  $scope.AktifDevice1TempAlarm= function(){
    if($localStorage.Device1ApiKeyAutoTemp!=undefined && $localStorage.Device1FieldAutoTemp!=undefined && $localStorage.Device1ApiKeySetPointAutoTemp && $localStorage.Device1FieldSetPointAutoTemp)
    {
      if($scope.a.setsuhualarm==undefined){
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill the setpoint temperature, please!',
            cssClass:'mypoup'
          });
          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else {
        $localStorage.Device1setsuhualarm=$scope.a.setsuhualarm;
        if($localStorage.Device1ApiKeyAutoTemp==$localStorage.Device1ApiKeySetPointAutoTemp){
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeyAutoTemp+"&field"+$localStorage.Device1FieldAutoTemp+"=1"+"&field"+$localStorage.Device1FieldSetPointAutoTemp+"="+$localStorage.Device1setsuhualarm, function(d){
            if(d!=0){
              $localStorage.StateDevice1AutoTemp=true;
              $localStorage.ButtonDevice1AutoTemp=true;
              document.getElementById('temperaturetrigger_device1').innerHTML="ON";
              document.getElementById('temperaturetrigger_device1').style="background:teal";
              document.getElementById('temperaturetrigger_device1_setsuhu').innerHTML=$localStorage.Device1setsuhualarm+"&deg;C";
              document.getElementById('statuscodealarmtempdevice1').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Temperature Trigger for Device 1 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodealarmtempdevice1').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $scope.Device1StateAutoTemp=true;
        }
        else{
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeyAutoTemp+"&field"+$localStorage.Device1FieldAutoTemp+"=1", function(d){
            if(d!=0){
              $localStorage.StateDevice1AutoTemp=true;
              document.getElementById('statuscodealarmtempdevice1').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Temperature Trigger for Device 1 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodealarmtempdevice1').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeySetPointAutoTemp+"&field"+$localStorage.Device1FieldSetPointAutoTemp+"="+$localStorage.Device1setsuhualarm, function(d){
            if(d!=0){
              $localStorage.StateDevice1AutoTemp=true;
              $localStorage.ButtonDevice1AutoTemp=true;
              document.getElementById('temperaturetrigger_device1').innerHTML="ON";
              document.getElementById('temperaturetrigger_device1').style="background:teal";
              document.getElementById('temperaturetrigger_device1_setsuhu').innerHTML=$localStorage.Device1setsuhualarm+"&deg;C";
              document.getElementById('statuscodealarmtempdevice1').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Temperature Trigger for Device 1 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodealarmtempdevice1').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $scope.Device1StateAutoTemp=true;
        }
      }
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownDevice1TempAlarm = function(){
    if($localStorage.Device1ApiKeyAutoTemp!=undefined && $localStorage.Device1FieldAutoTemp!=undefined && $localStorage.Device1ApiKeySetPointAutoTemp && $localStorage.Device1FieldSetPointAutoTemp)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeyAutoTemp+"&field"+$localStorage.Device1FieldAutoTemp+"=0", function(d){
        if(d!=0){
          $localStorage.StateDevice1AutoTemp=false;
          $localStorage.ButtonDevice1AutoTemp=false;
          $localStorage.Device1setsuhualarm=undefined;
          document.getElementById('temperaturetrigger_device1').innerHTML="OFF";
          document.getElementById('temperaturetrigger_device1').style="background:white";
          document.getElementById('temperaturetrigger_device1_setsuhu').innerHTML="-";
          document.getElementById('statuscodealarmtempdevice1').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut Down Temperature Trigger for Device 1',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodealarmtempdevice1').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device1StateAutoTemp=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  //---
  $scope.AktifDevice2TempAlarm= function(){
    if($localStorage.Device2ApiKeyAutoTemp!=undefined && $localStorage.Device2FieldAutoTemp!=undefined && $localStorage.Device2ApiKeySetPointAutoTemp && $localStorage.Device2FieldSetPointAutoTemp)
    {
      if($scope.b.setsuhualarm==undefined){
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill the setpoint temperature, please!',
            cssClass:'mypoup'
          });
          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else {
        $localStorage.Device2setsuhualarm=$scope.b.setsuhualarm;
        if($localStorage.Device2ApiKeyAutoTemp==$localStorage.Device2ApiKeySetPointAutoTemp){
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeyAutoTemp+"&field"+$localStorage.Device2FieldAutoTemp+"=1"+"&field"+$localStorage.Device2FieldSetPointAutoTemp+"="+$localStorage.Device2setsuhualarm, function(d){
            if(d!=0){
              $localStorage.StateDevice2AutoTemp=true;
              $localStorage.ButtonDevice2AutoTemp=true;
              document.getElementById('temperaturetrigger_device2').innerHTML="ON";
              document.getElementById('temperaturetrigger_device2').style="background:teal";
              document.getElementById('temperaturetrigger_device2_setsuhu').innerHTML=$localStorage.Device2setsuhualarm+"&deg;C";
              document.getElementById('statuscodealarmtempdevice2').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Temperature Trigger for Device 2 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodealarmtempdevice2').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $scope.Device2StateAutoTemp=true;
        }
        else{
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeyAutoTemp+"&field"+$localStorage.Device2FieldAutoTemp+"=1", function(d){
            if(d!=0){
              $localStorage.StateDevice2AutoTemp=true;
              document.getElementById('statuscodealarmtempdevice2').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Temperature Trigger for Device 2 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodealarmtempdevice2').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeySetPointAutoTemp+"&field"+$localStorage.Device2FieldSetPointAutoTemp+"="+$localStorage.Device2setsuhualarm, function(d){
            if(d!=0){
              $localStorage.StateDevice2AutoTemp=true;
              $localStorage.ButtonDevice2AutoTemp=true;
              document.getElementById('temperaturetrigger_device2').innerHTML="ON";
              document.getElementById('temperaturetrigger_device2').style="background:teal";
              document.getElementById('temperaturetrigger_device2_setsuhu').innerHTML=$localStorage.Device2setsuhualarm+"&deg;C";
              document.getElementById('statuscodealarmtempdevice2').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Temperature Trigger for Device 2 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodealarmtempdevice2').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $scope.Device2StateAutoTemp=true;
        }
      }
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownDevice2TempAlarm = function(){
    if($localStorage.Device2ApiKeyAutoTemp!=undefined && $localStorage.Device2FieldAutoTemp!=undefined && $localStorage.Device2ApiKeySetPointAutoTemp && $localStorage.Device2FieldSetPointAutoTemp)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeyAutoTemp+"&field"+$localStorage.Device2FieldAutoTemp+"=0", function(d){
        if(d!=0){
          $localStorage.StateDevice2AutoTemp=false;
          $localStorage.ButtonDevice2AutoTemp=false;
          $localStorage.Device2setsuhualarm=undefined;
          document.getElementById('temperaturetrigger_device2').innerHTML="OFF";
          document.getElementById('temperaturetrigger_device2').style="background:white";
          document.getElementById('temperaturetrigger_device2_setsuhu').innerHTML="-";
          document.getElementById('statuscodealarmtempdevice2').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut Down Temperature Trigger for Device 2',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodealarmtempdevice2').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device2StateAutoTemp=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  //--
  ///
  ///
  $scope.AktifDevice1DoorAlarm= function(){
    if($localStorage.Device1ApiKeyAutoDoor!=undefined && $localStorage.Device1FieldAutoDoor!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeyAutoDoor+"&field"+$localStorage.Device1FieldAutoDoor+"=1", function(d){
        if(d!=0){
          $localStorage.StateDevice1AutoDoor=true;
          $localStorage.ButtonDevice1AutoDoor=true;
          document.getElementById('Doortrigger_device1').innerHTML="ON";
          document.getElementById('Doortrigger_device1').style="background:teal";
          document.getElementById('statuscodealarmDoordevice1').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Window/ Door Trigger for Device 1 activated',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodealarmDoordevice1').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device1StateAutoDoor=true;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownDevice1DoorAlarm = function(){
    if($localStorage.Device1ApiKeyAutoDoor!=undefined && $localStorage.Device1FieldAutoDoor!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeyAutoDoor+"&field"+$localStorage.Device1FieldAutoDoor+"=0", function(d){
        if(d!=0){
          $localStorage.StateDevice1AutoDoor=false;
          $localStorage.ButtonDevice1AutoDoor=false;
          document.getElementById('Doortrigger_device1').innerHTML="OFF";
          document.getElementById('Doortrigger_device1').style="background:white";
          document.getElementById('statuscodealarmDoordevice1').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut Down Window/ Door Trigger for Device 1',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodealarmDoordevice1').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device1StateAutoDoor=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  //---
  $scope.AktifDevice2DoorAlarm= function(){
    if($localStorage.Device2ApiKeyAutoDoor!=undefined && $localStorage.Device2FieldAutoDoor!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeyAutoDoor+"&field"+$localStorage.Device2FieldAutoDoor+"=1", function(d){
        if(d!=0){
          $localStorage.StateDevice2AutoDoor=true;
          $localStorage.ButtonDevice2AutoDoor=true;
          document.getElementById('Doortrigger_device2').innerHTML="ON";
          document.getElementById('Doortrigger_device2').style="background:teal";
          document.getElementById('statuscodealarmDoordevice2').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Window/ Door Trigger for Device 2 activated',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodealarmDoordevice2').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device2StateAutoDoor=true;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownDevice2DoorAlarm = function(){
    if($localStorage.Device2ApiKeyAutoDoor!=undefined && $localStorage.Device2FieldAutoDoor!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeyAutoDoor+"&field"+$localStorage.Device2FieldAutoDoor+"=0", function(d){
        if(d!=0){
          $localStorage.StateDevice2AutoDoor=false;
          $localStorage.ButtonDevice2AutoDoor=false;
          document.getElementById('Doortrigger_device2').innerHTML="OFF";
          document.getElementById('Doortrigger_device2').style="background:white";
          document.getElementById('statuscodealarmDoordevice2').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut Down Window/ Door Trigger for Device 2',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodealarmDoordevice2').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device2StateAutoDoor=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  //---
  function ceklastSchedulerValue(){
    if($localStorage.Device1setTimeStart!=undefined && $localStorage.Device1setTimeStop!=undefined){
      $scope.c = {
        device1setTimeStart :  $localStorage.Device1setTimeStart,
        device1setTimeStop :  $localStorage.Device1setTimeStop
      };
    }
    else{
      $scope.c = {};
    }
    if($localStorage.Device2setTimeStart!=undefined && $localStorage.Device2setTimeStop!=undefined){
      $scope.d = {
        device2setTimeStart :  $localStorage.Device2setTimeStart,
        device2setTimeStop :  $localStorage.Device2setTimeStop
      };
    }
    else{
      $scope.d = {};
    }
  }
  ceklastSchedulerValue();
  $scope.AktifDevice1Scheduler= function(){
    if ($localStorage.Device1ApiKeySchedulerIntruksi!=undefined && $localStorage.Device1FieldSchedulerIntruksi!=undefined && $localStorage.Device1ApiKeySchedulerTimeStart!=undefined && $localStorage.Device1FieldSchedulerTimeStart!=undefined && $localStorage.Device1ApiKeySchedulerTimeStop!=undefined && $localStorage.Device1FieldSchedulerTimeStop!=undefined)
    {
      if($scope.c.device1setTimeStart==undefined && $scope.c.device1setTimeStop==undefined)
      {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill Setting Time Start and Time Stop, please!',
            cssClass:'mypoup'
          });
          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else {
        $localStorage.Device1setTimeStart=$scope.c.device1setTimeStart;
        $localStorage.Device1setTimeStop=$scope.c.device1setTimeStop;
        if($localStorage.Device1ApiKeySchedulerIntruksi==$localStorage.Device1ApiKeySchedulerTimeStart && $localStorage.Device1ApiKeySchedulerIntruksi==$localStorage.Device1ApiKeySchedulerTimeStop){
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeySchedulerIntruksi+"&field"+$localStorage.Device1FieldSchedulerIntruksi+"=1"+"&field"+$localStorage.Device1FieldSchedulerTimeStart+"="+$localStorage.Device1setTimeStart+"&field"+$localStorage.Device1FieldSchedulerTimeStop+"="+$localStorage.Device1setTimeStop, function(d){
            if(d!=0){
              $localStorage.StateDevice1Scheduler=true;
              $localStorage.ButtonDevice1Scheduler=true;
              document.getElementById('scheduler_device1').innerHTML="ON";
              document.getElementById('scheduler_device1').style="background:teal";
              document.getElementById('scheduler_device1_timestart').innerHTML=$localStorage.Device1setTimeStart;
              document.getElementById('scheduler_device1_timestop').innerHTML=$localStorage.Device1setTimeStop;
              document.getElementById('statuscodeschedulerdevice1').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Scheduler for Device 1 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodeschedulerdevice1').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $scope.Device1StateScheduler=true;
        }
        else{
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'WARNING!',
              template: 'Intruksi scheduler, time start, dan time stop harus dalam satu channel!',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      }
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownDevice1Scheduler = function(){
    if ($localStorage.Device1ApiKeySchedulerIntruksi!=undefined && $localStorage.Device1FieldSchedulerIntruksi!=undefined && $localStorage.Device1ApiKeySchedulerTimeStart!=undefined && $localStorage.Device1FieldSchedulerTimeStart!=undefined && $localStorage.Device1ApiKeySchedulerTimeStop!=undefined && $localStorage.Device1FieldSchedulerTimeStop!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device1ApiKeySchedulerIntruksi+"&field"+$localStorage.Device1FieldSchedulerIntruksi+"=0", function(d){
        if(d!=0){
          $localStorage.StateDevice1Scheduler=false;
          $localStorage.ButtonDevice1Scheduler=false;
          $localStorage.Device1setTimeStart=undefined;
          $localStorage.Device1setTimeStop=undefined;
          document.getElementById('scheduler_device1').innerHTML="OFF";
          document.getElementById('scheduler_device1').style="background:white";
          document.getElementById('scheduler_device1_timestart').innerHTML="-";
          document.getElementById('scheduler_device1_timestop').innerHTML="-";
          document.getElementById('statuscodeschedulerdevice1').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut Down Scheduler for Device 1',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodeschedulerdevice1').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device1StateScheduler=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  //
  $scope.AktifDevice2Scheduler= function(){
    if ($localStorage.Device2ApiKeySchedulerIntruksi!=undefined && $localStorage.Device2FieldSchedulerIntruksi!=undefined && $localStorage.Device2ApiKeySchedulerTimeStart!=undefined && $localStorage.Device2FieldSchedulerTimeStart!=undefined && $localStorage.Device2ApiKeySchedulerTimeStop!=undefined && $localStorage.Device2FieldSchedulerTimeStop!=undefined)
    {
      if($scope.d.device2setTimeStart==undefined && $scope.d.device2setTimeStop==undefined)
      {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill Setting Time Start and Time Stop, please!',
            cssClass:'mypoup'
          });
          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
      else {
        $localStorage.Device2setTimeStart=$scope.d.device2setTimeStart;
        $localStorage.Device2setTimeStop=$scope.d.device2setTimeStop;
        if($localStorage.Device2ApiKeySchedulerIntruksi==$localStorage.Device2ApiKeySchedulerTimeStart && $localStorage.Device2ApiKeySchedulerIntruksi==$localStorage.Device2ApiKeySchedulerTimeStop){
          $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeySchedulerIntruksi+"&field"+$localStorage.Device2FieldSchedulerIntruksi+"=1"+"&field"+$localStorage.Device2FieldSchedulerTimeStart+"="+$localStorage.Device2setTimeStart+"&field"+$localStorage.Device2FieldSchedulerTimeStop+"="+$localStorage.Device2setTimeStop, function(d){
            if(d!=0){
              $localStorage.StateDevice2Scheduler=true;
              $localStorage.ButtonDevice2Scheduler=true;
              document.getElementById('scheduler_device2').innerHTML="ON";
              document.getElementById('scheduler_device2').style="background:teal";
              document.getElementById('scheduler_device2_timestart').innerHTML=$localStorage.Device2setTimeStart;
              document.getElementById('scheduler_device2_timestop').innerHTML=$localStorage.Device2setTimeStop;
              document.getElementById('statuscodeschedulerdevice2').innerHTML="Succeed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'SUCCEED!',
                  template: 'Scheduler for Device 2 activated',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
            else{
              document.getElementById('statuscodeschedulerdevice2').innerHTML="Failed";
              // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                  title: 'FAILED!',
                  template: 'Wait for 15 seconds then try again',
                  cssClass:'mypoup'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    console.log('You are sure');
                  } else {
                    console.log('You are not sure');
                  }
                });
            }
          })
          $scope.Device2StateScheduler=true;
        }
        else{
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'WARNING!',
              template: 'Intruksi scheduler, time start, dan time stop harus dalam satu channel!',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      }
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });

        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
  $scope.ShutDownDevice2Scheduler = function(){
    if ($localStorage.Device2ApiKeySchedulerIntruksi!=undefined && $localStorage.Device2FieldSchedulerIntruksi!=undefined && $localStorage.Device2ApiKeySchedulerTimeStart!=undefined && $localStorage.Device2FieldSchedulerTimeStart!=undefined && $localStorage.Device2ApiKeySchedulerTimeStop!=undefined && $localStorage.Device2FieldSchedulerTimeStop!=undefined)
    {
      $.get("https://api.thingspeak.com/update?api_key="+$localStorage.Device2ApiKeySchedulerIntruksi+"&field"+$localStorage.Device2FieldSchedulerIntruksi+"=0", function(d){
        if(d!=0){
          $localStorage.StateDevice2Scheduler=false;
          $localStorage.ButtonDevice2Scheduler=false;
          $localStorage.Device2setTimeStart=undefined;
          $localStorage.Device2setTimeStop=undefined;
          document.getElementById('scheduler_device2').innerHTML="OFF";
          document.getElementById('scheduler_device2').style="background:white";
          document.getElementById('scheduler_device2_timestart').innerHTML="-";
          document.getElementById('scheduler_device2_timestop').innerHTML="-";
          document.getElementById('statuscodeschedulerdevice2').innerHTML="Succeed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'SUCCEED!',
              template: 'Shut Down Scheduler for Device 2',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
        else{
          document.getElementById('statuscodeschedulerdevice2').innerHTML="Failed";
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'FAILED!',
              template: 'Wait for 15 seconds then try again',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      })
      $scope.Device2StateScheduler=false;
    }
    else {
      // A confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'WARNING!',
          template: 'Fill the setting Api Key, please!',
          cssClass:'mypoup'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
    }
  }
 })

.controller('AutoTempCtrl', function($scope, $rootScope, $localStorage, $ionicPopup) {
  var ceksaved = function() {
      if ($localStorage.Device1ApiKeyAutoTemp!=undefined && $localStorage.Device1FieldAutoTemp!=undefined && $localStorage.Device1ApiKeySetPointAutoTemp!=undefined && $localStorage.Device1FieldSetPointAutoTemp!=undefined && $localStorage.Device2ApiKeyAutoTemp!=undefined && $localStorage.Device2FieldAutoTemp!=undefined && $localStorage.Device2ApiKeySetPointAutoTemp!=undefined && $localStorage.Device2FieldSetPointAutoTemp!=undefined){
        document.getElementById('Device1ApiKeyAutoTemp').innerHTML = $localStorage.Device1ApiKeyAutoTemp;
        document.getElementById('Device1FieldAutoTemp').innerHTML = $localStorage.Device1FieldAutoTemp;
        document.getElementById('Device1ApiKeySetPointAutoTemp').innerHTML = $localStorage.Device1ApiKeySetPointAutoTemp;
        document.getElementById('Device1FieldSetPointAutoTemp').innerHTML = $localStorage.Device1FieldSetPointAutoTemp;
        document.getElementById('Device2ApiKeyAutoTemp').innerHTML = $localStorage.Device2ApiKeyAutoTemp;
        document.getElementById('Device2FieldAutoTemp').innerHTML = $localStorage.Device2FieldAutoTemp;
        document.getElementById('Device2ApiKeySetPointAutoTemp').innerHTML = $localStorage.Device2ApiKeySetPointAutoTemp;
        document.getElementById('Device2FieldSetPointAutoTemp').innerHTML = $localStorage.Device2FieldSetPointAutoTemp;
        $scope.SavedAutoTemp=true;
      }
      else{
        $scope.SavedAutoTemp=false;
      }
    }
    ceksaved();
    $scope.AutoTemp={};
      $scope.SaveAutoTemp = function () {
        if ($scope.AutoTemp.Device1ApiKey!=undefined && $scope.AutoTemp.Device1Field!=undefined && $scope.AutoTemp.Device2ApiKey!=undefined && $scope.AutoTemp.Device2Field!=undefined && $scope.AutoTemp.Device1SetPointApiKey!=undefined && $scope.AutoTemp.Device1SetPointField!=undefined && $scope.AutoTemp.Device2SetPointApiKey!=undefined && $scope.AutoTemp.Device2SetPointField!=undefined) {
          $localStorage.Device1ApiKeyAutoTemp = $scope.AutoTemp.Device1ApiKey;
          $localStorage.Device1FieldAutoTemp = $scope.AutoTemp.Device1Field;
          $localStorage.Device2ApiKeyAutoTemp = $scope.AutoTemp.Device2ApiKey;
          $localStorage.Device2FieldAutoTemp = $scope.AutoTemp.Device2Field;
          $localStorage.Device1ApiKeySetPointAutoTemp = $scope.AutoTemp.Device1SetPointApiKey;
          $localStorage.Device1FieldSetPointAutoTemp = $scope.AutoTemp.Device1SetPointField;
          $localStorage.Device2ApiKeySetPointAutoTemp = $scope.AutoTemp.Device2SetPointApiKey;
          $localStorage.Device2FieldSetPointAutoTemp = $scope.AutoTemp.Device2SetPointField;
          document.getElementById('Device1ApiKeyAutoTemp').innerHTML = $localStorage.Device1ApiKeyAutoTemp;
          document.getElementById('Device1FieldAutoTemp').innerHTML = $localStorage.Device1FieldAutoTemp;
          document.getElementById('Device1ApiKeySetPointAutoTemp').innerHTML = $localStorage.Device1ApiKeySetPointAutoTemp;
          document.getElementById('Device1FieldSetPointAutoTemp').innerHTML = $localStorage.Device1FieldSetPointAutoTemp;
          document.getElementById('Device2ApiKeyAutoTemp').innerHTML = $localStorage.Device2ApiKeyAutoTemp;
          document.getElementById('Device2FieldAutoTemp').innerHTML = $localStorage.Device2FieldAutoTemp;
          document.getElementById('Device2ApiKeySetPointAutoTemp').innerHTML = $localStorage.Device2ApiKeySetPointAutoTemp;
          document.getElementById('Device2FieldSetPointAutoTemp').innerHTML = $localStorage.Device2FieldSetPointAutoTemp;
          $scope.AutoTemp={};
          $scope.SavedAutoTemp=true;
        }
        else {
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'WARNING!',
              template: 'Fill all the input, please!',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      };
      $scope.removeAutoTemp = function () {
        $localStorage.Device1ApiKeyAutoTemp=undefined;
        $localStorage.Device1FieldAutoTemp=undefined;
        $localStorage.Device2ApiKeyAutoTemp=undefined;
        $localStorage.Device2FieldAutoTemp=undefined;
        $localStorage.Device1ApiKeySetPointAutoTemp=undefined;
        $localStorage.Device1FieldSetPointAutoTemp=undefined;
        $localStorage.Device2ApiKeySetPointAutoTemp=undefined;
        $localStorage.Device2FieldSetPointAutoTemp=undefined;
        $scope.SavedAutoTemp = false;
      };
})
.controller('AutoDoorCtrl', function($scope, $rootScope, $localStorage, $ionicPopup) {
  var ceksaved = function() {
      if ($localStorage.Device1ApiKeyAutoDoor!=undefined && $localStorage.Device1FieldAutoDoor!=undefined && $localStorage.Device2ApiKeyAutoDoor!=undefined && $localStorage.Device2FieldAutoDoor!=undefined){
        document.getElementById('Device1ApiKeyAutoDoor').innerHTML = $localStorage.Device1ApiKeyAutoDoor;
        document.getElementById('Device1FieldAutoDoor').innerHTML = $localStorage.Device1FieldAutoDoor;
        document.getElementById('Device2ApiKeyAutoDoor').innerHTML = $localStorage.Device2ApiKeyAutoDoor;
        document.getElementById('Device2FieldAutoDoor').innerHTML = $localStorage.Device2FieldAutoDoor;
        $scope.SavedAutoDoor=true;
      }
      else{
        $scope.SavedAutoDoor=false;
      }
    }
    ceksaved();
    $scope.AutoDoor={};
      $scope.SaveAutoDoor = function () {
        if ($scope.AutoDoor.Device1ApiKey!=undefined && $scope.AutoDoor.Device1Field!=undefined && $scope.AutoDoor.Device2ApiKey!=undefined && $scope.AutoDoor.Device2Field!=undefined ) {
          $localStorage.Device1ApiKeyAutoDoor = $scope.AutoDoor.Device1ApiKey;
          $localStorage.Device1FieldAutoDoor = $scope.AutoDoor.Device1Field;
          $localStorage.Device2ApiKeyAutoDoor = $scope.AutoDoor.Device2ApiKey;
          $localStorage.Device2FieldAutoDoor = $scope.AutoDoor.Device2Field;
          document.getElementById('Device1ApiKeyAutoDoor').innerHTML = $localStorage.Device1ApiKeyAutoDoor;
          document.getElementById('Device1FieldAutoDoor').innerHTML = $localStorage.Device1FieldAutoDoor;
          document.getElementById('Device2ApiKeyAutoDoor').innerHTML = $localStorage.Device2ApiKeyAutoDoor;
          document.getElementById('Device2FieldAutoDoor').innerHTML = $localStorage.Device2FieldAutoDoor;
          $scope.AutoDoor={};
          $scope.SavedAutoDoor=true;
        }
        else {
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'WARNING!',
              template: 'Fill all the input, please!',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
        }
      };
      $scope.removeAutoDoor = function () {
        $localStorage.Device1ApiKeyAutoDoor=undefined;
        $localStorage.Device1FieldAutoDoor=undefined;
        $localStorage.Device2ApiKeyAutoDoor=undefined;
        $localStorage.Device2FieldAutoDoor=undefined;
        $scope.SavedAutoDoor = false;
      };
  })

.controller('SistemKeamananCtrl', function($scope, $rootScope, $localStorage, $ionicPopup) {
  var ceksaved = function() {
    if ($localStorage.KeamananApiKeyMotion!=undefined && $localStorage.KeamananFieldMotion!=undefined && $localStorage.KeamananApiKeyDoor!=undefined && $localStorage.KeamananFieldDoor!=undefined) {
      document.getElementById('KeamananApiKeyMotion').innerHTML = $localStorage.KeamananApiKeyMotion;
      document.getElementById('KeamananFieldMotion').innerHTML = $localStorage.KeamananFieldMotion;
      document.getElementById('KeamananApiKeyDoor').innerHTML = $localStorage.KeamananApiKeyDoor;
      document.getElementById('KeamananFieldDoor').innerHTML = $localStorage.KeamananFieldDoor;
      $scope.SavedKeamanan=true;
    }
    else{
      $scope.SavedKeamanan=false;
    }
  }
  ceksaved();
  $scope.Keamanan={};
    $scope.SaveKeamanan = function () {
      if ($scope.Keamanan.ApiKeyMotion!=undefined && $scope.Keamanan.FieldMotion!=undefined && $scope.Keamanan.ApiKeyDoor!=undefined && $scope.Keamanan.FieldDoor!=undefined)
      {
        $localStorage.KeamananApiKeyMotion = $scope.Keamanan.ApiKeyMotion;
        $localStorage.KeamananFieldMotion  = $scope.Keamanan.FieldMotion;
        $localStorage.KeamananApiKeyDoor = $scope.Keamanan.ApiKeyDoor;
        $localStorage.KeamananFieldDoor  = $scope.Keamanan.FieldDoor;
        document.getElementById('KeamananApiKeyMotion').innerHTML = $localStorage.KeamananApiKeyMotion;
        document.getElementById('KeamananFieldMotion').innerHTML = $localStorage.KeamananFieldMotion;
        document.getElementById('KeamananApiKeyDoor').innerHTML = $localStorage.KeamananApiKeyDoor;
        document.getElementById('KeamananFieldDoor').innerHTML = $localStorage.KeamananFieldDoor;
        $scope.Keamanan={};
        $scope.SavedKeamanan=true;
      }
      else {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'WARNING!',
            template: 'Fill all the input, please!',
            cssClass:'mypoup'
          });

          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
      }
    };
    $scope.removeKeamanan = function () {
      $localStorage.KeamananApiKeyMotion = undefined;
      $localStorage.KeamananFieldMotion  = undefined;
      $localStorage.KeamananApiKeyDoor = undefined;
      $localStorage.KeamananFieldDoor  = undefined;
      $scope.SavedKeamanan = false;
    };
})

.controller('SchedulerCtrl', function($scope, $rootScope, $localStorage, $ionicPopup) {
  var ceksaved = function() {
      if ($localStorage.Device1ApiKeySchedulerIntruksi!=undefined && $localStorage.Device1FieldSchedulerIntruksi!=undefined && $localStorage.Device1ApiKeySchedulerTimeStart!=undefined && $localStorage.Device1FieldSchedulerTimeStart!=undefined && $localStorage.Device1ApiKeySchedulerTimeStop!=undefined && $localStorage.Device1FieldSchedulerTimeStop!=undefined)
      {
        if($localStorage.Device1ApiKeySchedulerIntruksi!=undefined && $localStorage.Device2FieldSchedulerIntruksi!=undefined && $localStorage.Device2ApiKeySchedulerTimeStart!=undefined && $localStorage.Device2FieldSchedulerTimeStart!=undefined && $localStorage.Device2ApiKeySchedulerTimeStop!=undefined && $localStorage.Device2FieldSchedulerTimeStop!=undefined)
        {
          document.getElementById('Device1ApiKeyIntruksiScheduler').innerHTML = $localStorage.Device1ApiKeySchedulerIntruksi;
          document.getElementById('Device1FieldIntruksiScheduler').innerHTML = $localStorage.Device1FieldSchedulerIntruksi;
          document.getElementById('Device1ApiKeyTimeStartScheduler').innerHTML = $localStorage.Device1ApiKeySchedulerTimeStart;
          document.getElementById('Device1FieldTimeStartScheduler').innerHTML = $localStorage.Device1FieldSchedulerTimeStart;
          document.getElementById('Device1ApiKeyTimeStopScheduler').innerHTML = $localStorage.Device1ApiKeySchedulerTimeStop;
          document.getElementById('Device1FieldTimeStopScheduler').innerHTML = $localStorage.Device1FieldSchedulerTimeStop;
          document.getElementById('Device2ApiKeyIntruksiScheduler').innerHTML = $localStorage.Device2ApiKeySchedulerIntruksi;
          document.getElementById('Device2FieldIntruksiScheduler').innerHTML = $localStorage.Device2FieldSchedulerIntruksi;
          document.getElementById('Device2ApiKeyTimeStartScheduler').innerHTML = $localStorage.Device2ApiKeySchedulerTimeStart;
          document.getElementById('Device2FieldTimeStartScheduler').innerHTML = $localStorage.Device2FieldSchedulerTimeStart;
          document.getElementById('Device2ApiKeyTimeStopScheduler').innerHTML = $localStorage.Device2ApiKeySchedulerTimeStop;
          document.getElementById('Device2FieldTimeStopScheduler').innerHTML = $localStorage.Device2FieldSchedulerTimeStop;
          $scope.SavedScheduler=true;
        }
      }
      else{
        $scope.SavedScheduler=false;
      }
    }
    ceksaved();
    $scope.Scheduler={};
    $scope.SaveScheduler = function() {
      if($scope.Scheduler.Device1ApiKeyIntruksi!=undefined && $scope.Scheduler.Device1FieldIntruksi!=undefined && $scope.Scheduler.Device1ApiKeyTimeStart!=undefined && $scope.Scheduler.Device1FieldTimeStart!=undefined && $scope.Scheduler.Device1ApiKeyTimeStop!=undefined && $scope.Scheduler.Device1FieldTimeStop!=undefined)
      {
        if($scope.Scheduler.Device2ApiKeyIntruksi!=undefined && $scope.Scheduler.Device2FieldIntruksi!=undefined && $scope.Scheduler.Device2ApiKeyTimeStart!=undefined && $scope.Scheduler.Device2FieldTimeStart!=undefined && $scope.Scheduler.Device2ApiKeyTimeStop!=undefined && $scope.Scheduler.Device2FieldTimeStop!=undefined)
        {
          $localStorage.Device1ApiKeySchedulerIntruksi = $scope.Scheduler.Device1ApiKeyIntruksi;
          $localStorage.Device1FieldSchedulerIntruksi = $scope.Scheduler.Device1FieldIntruksi;
          $localStorage.Device1ApiKeySchedulerTimeStart = $scope.Scheduler.Device1ApiKeyTimeStart;
          $localStorage.Device1FieldSchedulerTimeStart = $scope.Scheduler.Device1FieldTimeStart;
          $localStorage.Device1ApiKeySchedulerTimeStop = $scope.Scheduler.Device1ApiKeyTimeStop;
          $localStorage.Device1FieldSchedulerTimeStop = $scope.Scheduler.Device1FieldTimeStop;
          $localStorage.Device2ApiKeySchedulerIntruksi = $scope.Scheduler.Device2ApiKeyIntruksi;
          $localStorage.Device2FieldSchedulerIntruksi = $scope.Scheduler.Device2FieldIntruksi;
          $localStorage.Device2ApiKeySchedulerTimeStart = $scope.Scheduler.Device2ApiKeyTimeStart;
          $localStorage.Device2FieldSchedulerTimeStart = $scope.Scheduler.Device2FieldTimeStart;
          $localStorage.Device2ApiKeySchedulerTimeStop = $scope.Scheduler.Device2ApiKeyTimeStop;
          $localStorage.Device2FieldSchedulerTimeStop = $scope.Scheduler.Device2FieldTimeStop;

          document.getElementById('Device1ApiKeyIntruksiScheduler').innerHTML = $localStorage.Device1ApiKeySchedulerIntruksi;
          document.getElementById('Device1FieldIntruksiScheduler').innerHTML = $localStorage.Device1FieldSchedulerIntruksi;
          document.getElementById('Device1ApiKeyTimeStartScheduler').innerHTML = $localStorage.Device1ApiKeySchedulerTimeStart;
          document.getElementById('Device1FieldTimeStartScheduler').innerHTML = $localStorage.Device1FieldSchedulerTimeStart;
          document.getElementById('Device1ApiKeyTimeStopScheduler').innerHTML = $localStorage.Device1ApiKeySchedulerTimeStop;
          document.getElementById('Device1FieldTimeStopScheduler').innerHTML = $localStorage.Device1FieldSchedulerTimeStop;
          document.getElementById('Device2ApiKeyIntruksiScheduler').innerHTML = $localStorage.Device2ApiKeySchedulerIntruksi;
          document.getElementById('Device2FieldIntruksiScheduler').innerHTML = $localStorage.Device2FieldSchedulerIntruksi;
          document.getElementById('Device2ApiKeyTimeStartScheduler').innerHTML = $localStorage.Device2ApiKeySchedulerTimeStart;
          document.getElementById('Device2FieldTimeStartScheduler').innerHTML = $localStorage.Device2FieldSchedulerTimeStart;
          document.getElementById('Device2ApiKeyTimeStopScheduler').innerHTML = $localStorage.Device2ApiKeySchedulerTimeStop;
          document.getElementById('Device2FieldTimeStopScheduler').innerHTML = $localStorage.Device2FieldSchedulerTimeStop;
          $scope.Scheduler={};
          $scope.SavedScheduler=true;
        }
      }
      else {
          // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
              title: 'WARNING!',
              template: 'Fill all the input, please!',
              cssClass:'mypoup'
            });

            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
              } else {
                console.log('You are not sure');
              }
            });
      }
    };

    $scope.removeScheduler = function(){
      $localStorage.Device1ApiKeySchedulerIntruksi=undefined;
      $localStorage.Device1FieldSchedulerIntruksi=undefined;
      $localStorage.Device1ApiKeySchedulerTimeStart=undefined;
      $localStorage.Device1FieldSchedulerTimeStart=undefined;
      $localStorage.Device1ApiKeySchedulerTimeStop=undefined;
      $localStorage.Device1FieldSchedulerTimeStop=undefined;
      $localStorage.Device2ApiKeySchedulerIntruksi=undefined;
      $localStorage.Device2FieldSchedulerIntruksi=undefined;
      $localStorage.Device2ApiKeySchedulerTimeStart=undefined;
      $localStorage.Device2FieldSchedulerTimeStart=undefined;
      $localStorage.Device2ApiKeySchedulerTimeStop=undefined;
      $localStorage.Device2FieldSchedulerTimeStop=undefined;
      $scope.SavedScheduler = false;
    };
});
