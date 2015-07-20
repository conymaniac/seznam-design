module.exports = function ( grunt ) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
          exp: {
            src:'web/less/style.less',
            dest:'exp/css/style.css'
          }
        },
        browserify: {
          exp: {
            src: 'web/scripts/exp.js',
            dest: 'exp/js/js-app.js'
          }
        },
        copy: {
            exp: {
                files:[
                    {
                        src: 'web/index-template.html',
                        dest: 'exp/index.html',
                    },
                    {
                        expand: true,
                        cwd: 'web/img',
                        src: '**',
                        dest: 'exp/img'
                    },
                    {
                        expand: true,
                        cwd: 'web/fonts',
                        src: '**',
                        dest: 'exp/fonts'
                    }
                ]
            }
        },
        clean: {
            exp: ['exp/js/js-app.js', 'tmp']
        },
        jshint: {
            options: {
              jshintrc:true
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        watch: {

            jsexp: {
                files: ['web/scripts/**/*.js'],
                tasks: ['exp']
            },
            stylesexp: {
                files: ['web/less/**/*.less'],
                tasks: ['less:exp'],
                options: {
                    spawn: false
                }
            },
            imagesexp: {
                files: ['web/img/**'],
                tasks: ['exp'],
                options: {
                    spawn: false
                }
            }
        },
        concurrent: {
            exp: {
                tasks: ['watch:htmlexp', 'watch:jsexp', 'watch:stylesexp', 'watch:imagesexp'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // defaultne se provadi vsechny buildy
    grunt.registerTask('default', ['exp']);

    // pouze pro build jednoduchý
    grunt.registerTask('exp', ['less:exp', 'browserify:exp', 'copy:exp', 'clean:exp']);

};
