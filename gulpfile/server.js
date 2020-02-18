import gulp from 'gulp'

gulp.task('server', (done) => {
  const browserSync = require('browser-sync')

  browserSync.init({
    // All options: https://browsersync.io/docs/options
    injectChanges: true, // Inject CSS without reloading the page
    server: './dist/', // Directory for starting the server
    port: '3000', // Default port for server
    online: false, // Browser-sync will not attempt to determine network status - assumes you're OFFLINE
    open: false, // Don't open new window after starting server
    ui: {
      port: '3001'// Default port for server of Browser-sync UI
    }
  })

  done()
})
