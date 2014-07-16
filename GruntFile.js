/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    //Watch Files
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['components/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['css/**/*.css', 'components/**/*.css'],
        options: {
          spawn: false
        }
      },
      html:{
        files: ['**/*.html'],
        options: {
            spawn: false
        }
      }
    },

    // JS Concat
    concat: {
      dist: {
        src: ['components/main.js','components/**/*.js'],
        dest: 'app.js',
      },
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['concat']);

};
