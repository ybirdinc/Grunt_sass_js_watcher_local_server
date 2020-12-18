module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserSync: {
      bsFiles: {
        src: [
          '*.*',
          './**/*.*'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./",
          directory: true
        }
        //,browser: "google chrome"
      }
    },
    uglify: {
      options: {
        mangle: true //sıkıştırma işleminde bizim verdiğimiz edğişken isimlerine dokunmaması için
      },
      build: {
        files: [{
          expand: true,
          src: ['js/**/*.js', '!js/**/*.min.js'],
          dest: '.',
          rename: function (dest, src) {
            // To keep the source js files and make new files as `*.min.js`:
            return dest + '/' + src.replace('.js', '.min.js');
            // Or to override to src:
            //return src;
          }
        }]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.scss', '!sass_classes.scss'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: ['js/**/*.js', '!js/**/*.min.js'],
        tasks: ['uglify']
      },
      styles: {
        files: ['css/**/*.scss'],
        tasks: ['sass']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.

  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'uglify', 'sass', 'watch']);

};