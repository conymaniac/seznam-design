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
    grunt.loadNpmTasks('grunt-scp');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
          demo: {
            src:'web/less/style.less',
            dest:'demo/css/style.css'
          }
        },
        browserify: {
          demo: {
            src: 'web/scripts/grid.js',
            dest: 'demo/js/js-app.js'
          }
        },
        copy: {
            demo: {
                files:[
                    {
                        src: 'web/index-template.html',
                        dest: 'demo/index.html',
                    },
                    {
                        expand: true,
                        cwd: 'web/img',
                        src: ["*.*", "**/*.*"],
                        dest: 'demo/img'
                    },
                    {
                        expand: true,
                        cwd: 'web/fonts',
                        src: ["*.*", "**/*.*"],
                        dest: 'demo/fonts'
                    }
                ]
            },
            remote: {
                files:[
                    {
                        src: 'web/index-remote.html',
                        dest: 'demo/index.html',
                    },
                    {
                        expand: true,
                        cwd: 'web/img',
                        src: ["*.*", "**/*.*"],
                        dest: 'demo/img'
                    },
                    {
                        expand: true,
                        cwd: 'web/fonts',
                        src: ["*.*", "**/*.*"],
                        dest: 'demo/fonts'
                    }
                ]
            }
        },
        scp: {
            options: {
                host: 'mrd.dev',
                username: 'root',
                password: 'live',
                agent: '/usr/bin/ssh-agent'
            },
            your_target: {
                files: [
                    {
                        cwd: 'demo',
                        src: 'index.html',
                        filter: 'isFile',
                        // path on the server
                        dest: '/www/firmy/demo/templ'
                    },
                    {
                        cwd: 'demo/js',
                        src: '**',
                        filter: 'isFile',
                        // path on the server
                        dest: '/www/firmy/demo/static/js'
                    },
                    {
                        cwd: 'demo/css',
                        src: '**',
                        filter: 'isFile',
                        // path on the server
                        dest: '/www/firmy/demo/static/css'
                    }
                    // dořešit kopírování font i img
                ]
            },
        },
        watch: {
            index: {
                files: ['web/index-template.html'],
                tasks: ['demo']
            },
            js: {
                files: ['web/scripts/**/*.js'],
                tasks: ['demo']
            },
            style: {
                files: ['web/less/**/*.less'],
                tasks: ['less:demo'],
                options: {
                    spawn: false
                }
            },
            image: {
                files: ['web/img/**'],
                tasks: ['demo'],
                options: {
                    spawn: false
                }
            }
        },
        concurrent: {
            demo: {
                tasks: ['watch:index', 'watch:html', 'watch:js', 'watch:styles', 'watch:images'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // defaultne se provadi vsechny buildy
    grunt.registerTask('default', ['demo']);

    // vybuildíme skoro jako při relase, jen bez uglify pro rychlost a překopírujeme na mrd
    grunt.registerTask('remote', ['demo-remote', 'scp', 'demo']);

    // pouze pro build jednoduchý
    grunt.registerTask('demo-remote', ['less:demo', 'browserify:demo', 'copy:remote']);

    // pouze pro build jednoduchý
    grunt.registerTask('demo', ['less:demo', 'browserify:demo', 'copy:demo']);

};
