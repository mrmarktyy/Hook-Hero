module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      sass: {
        files: 'stylesheets/scss/**/*.scss',
        tasks: ['style']
      },
      js: {
        files: 'scripts/m.js',
        tasks: ['script']
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compact',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'stylesheets/scss',
          src: ['*.scss'],
          dest: 'stylesheets/css',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/style.css': 'stylesheets/css/style.css'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/m.js': 'scripts/m.js'
        }
      }
    },

    concat: {
      js: {
        src: ['scripts/jquery.min.js', 'dist/m.js'],
        dest: 'dist/m.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('style', ['sass', 'cssmin']);
  grunt.registerTask('script', ['uglify', 'concat']);
  grunt.registerTask('build', ['style', 'script']);
  grunt.registerTask('default', ['build', 'watch']);

};
