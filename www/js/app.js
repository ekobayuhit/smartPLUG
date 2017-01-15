// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.kendaliotomatis', {
    url: '/kendaliotomatis',
    views: {
      'menuContent': {
        templateUrl: 'templates/kendaliotomatis.html',
        controller: 'KendaliOtomatisCtrl'
      }
    }
  })

  .state('app.sistemkeamanan', {
    url: '/sistemkeamanan',
    views: {
      'menuContent': {
        templateUrl: 'templates/sistemkeamanan.html',
        controller: 'SistemKeamananCtrl'
      }
    }
  })
  .state('app.autotemp', {
    url: '/autotemp',
    views: {
      'menuContent': {
        templateUrl: 'templates/autotemp.html',
        controller: 'AutoTempCtrl'
      }
    }
  })
  .state('app.scheduler', {
    url: '/scheduler',
    views: {
      'menuContent': {
        templateUrl: 'templates/scheduler.html',
        controller: 'SchedulerCtrl'
      }
    }
  })
  .state('app.autodoor', {
    url: '/autodoor',
    views: {
      'menuContent': {
        templateUrl: 'templates/autodoor.html',
        controller: 'AutoDoorCtrl'
      }
    }
  })

  .state('app.status', {
      url: '/status',
      views: {
        'menuContent': {
          templateUrl: 'templates/status.html',
          controller: 'StatusCtrl'
        }
      }
    })

    .state('app.bulbsetting', {
      url: '/bulbsetting',
      views: {
        'menuContent': {
          templateUrl: 'templates/bulbsetting.html',
          controller: 'BulbSettingCtrl'
        }
      }
    })

    .state('app.fansetting', {
      url: '/fansetting',
      views: {
        'menuContent': {
          templateUrl: 'templates/fansetting.html',
          controller: 'FanSettingCtrl'
        }
      }
    })

    .state('app.Relay1setting', {
      url: '/relay1setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/relaybulb.html',
          controller: 'Relay1Ctrl'
        }
      }
    })

    .state('app.Relay2setting', {
      url: '/relay2setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/relayfan.html',
          controller: 'Relay2Ctrl'
        }
      }
    })
    .state('app.motion', {
      url: '/motion',
      views: {
        'menuContent': {
          templateUrl: 'templates/motion.html',
          controller: 'MotionCtrl'
        }
      }
    })
    .state('app.window', {
      url: '/window',
      views: {
        'menuContent': {
          templateUrl: 'templates/windowalarm.html',
          controller: 'WindowCtrl'
        }
      }
    })
    .state('app.temperature', {
      url: '/temperature',
      views: {
        'menuContent': {
          templateUrl: 'templates/temperature.html',
          controller: 'TemperatureCtrl'
        }
      }
    })

    .state('app.information', {
      url: '/information',
      views: {
        'menuContent': {
          templateUrl: 'templates/information.html',
          controller: 'InformationCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
