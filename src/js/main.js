// Your JavaScript goes here
// @author Alex Devero <deveroalex@gmail.com>
//

'use strict';

(() => {
  const app = {
    appAnchors: {
      // Variables for switches
    },
    appControllers: {
      // App controllers
    },
    appSwitches: () => {
      // Conditions for switches
      if (true) {
        // app.appControllers.controller();
      }
    },
    init: () => {
      // Remove 'no-js' class as a test of available JavaScript
      if (document.querySelectorAll('.no-js').length > 0) {
        document.querySelectorAll('.no-js')[0].classList.remove('no-js');
      }

      // Initiate appSwitches function
      app.appSwitches();
    }
  };

  // Initiate 'init' funcion
  app.init();
})();
