// Your JavaScript goes here
// @author Alex Devero <deveroalex@gmail.com>
//

(function () {
  'use strict';

  var app = {
    appSettings: {
      // Variables for switches
    },
    appControllers: {
      // App controllers
    },
    appSwitches: function() {
      // Conditions for switches
      if () {}
    },
    init: function() {
      // Remove 'no-js' class as a test of available JavaScript
      if (document.querySelectorAll('.no-js').length > 0) {
        document.querySelectorAll('.no-js')[0].classList.remove('no-js');
      }

      // Assign appControllers to 'window' object
      window.appController = app.appControllers;

      // Initiate appSwitches function
      app.appSwitches();
    }
  };

  // Initiate 'init' funcion
  app.init();
})();
