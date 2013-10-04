/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    copy: {
      dist: {
        files: [
          {expand: true, flatten: true, src:['libs/angular/build/*.js'], dest: 'www/js/angular/', },
          {src:'libs/angular-local-storage/angular-local-storage.js', dest: 'www/js/angular-local-storage/angular-local-storage.js', filter: 'isFile'},
        ],
      }
    },
    ngtemplates: {
      app: {
        src: 'views/**/*.html',
        dest: 'www/js/templates.js',
        options: {
          module: 'Grocery',
          htmlmin: {
            collapseBooleanAttributes:      false,
            collapseWhitespace:             true,
            removeAttributeQuotes:          false,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          false,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     false,
            removeStyleLinkTypeAttributes:  false
          }
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['app/**/*.js', '<%= ngtemplates.app.dest %>'],
        dest: 'www/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: false,
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'www/js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    template: {
      dist: {
        options: {
          data: {
            prod_scripts: [{dest:'<%=uglify.dist.dest.replace("www/","") %>'}],
            qa_scripts: [{dest:'<%=concat.dist.dest.replace("www/","")%>'}],
            dev_scripts: grunt.file.expandMapping('app/**/*.js', '..', { filter: 'isFile', }),
          },
        },
        files: {
          'www/index.html' : ['app/index.html.tpl'],
          'www/index-qa.html': ['app/index-qa.html.tpl'],
          'www/index-dev.html': ['app/index-dev.html.tpl'],
          'www/cache.manifest': ['app/cache.manifest.tpl'],
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test',]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['compass', 'copy', 'ngtemplates', 'concat', 'jshint', 'uglify', 'template']);

};
