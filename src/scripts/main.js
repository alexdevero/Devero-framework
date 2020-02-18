// Your JavaScript goes here
import { example } from './components/_example.js'

(() => {
  const app = {
    appAnchors: {},
    appControllers: {
      // FadeIn controller
      fadeInCustom: (element) => {
        let elementOpacity = 0.1 // initial opacity

        element.style.display = 'block'

        let timer = setInterval(() => {
          if (elementOpacity >= 1){
            clearInterval(timer)
          }

          element.style.opacity = elementOpacity

          element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ')'

          elementOpacity += elementOpacity * 0.1
        }, 15)
      },
      // Form label controller
      formController: () => {
        (() => {
          // removeIf(production)
          console.log('Form controller running') // eslint-disable-line no-console
          // endRemoveIf(production)
          let formElements = document.querySelectorAll('form input, form textarea')

          for (let i = 0, j = formElements.length; i<j; i++) {
            formElements[i].addEventListener('blur', function() {
              if (this.value !== '') {
                this.style.background = '#fff'
              }
            })
          }
        })()
      }
    },
    appSwitches: () => {
      /* if (this.appSettings.contactForm.length > 0) {
        window.appController.formController()
      } */

      /* if (this.appSettings.lazyImages.length > 0) {
        window.appController.lazyImagesController()
      } */
    },
    init: () => {
      // removeIf(production)
      console.log('App is running.') // eslint-disable-line no-console
      // endRemoveIf(production)
      // Test if JavaScript is working
      document.querySelectorAll('.no-js')[0].classList.remove('no-js')

      // Assign appControllers to window object
      window.appController = app.appControllers

      // Initiate appSwitches
      app.appSwitches()

      example()
    }
  }

  // Initiate init function
  app.init()
})()
