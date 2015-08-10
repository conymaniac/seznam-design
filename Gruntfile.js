module.exports = function ( grunt ) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            base: {
                options: {
                    cleancss: true
                },
                src:'web/less/style.base.less',
                dest:'build/base/css/style.css'
            },
            extended: {
                options: {
                    cleancss: true
                },
                src:'web/less/style.extended.less',
                dest:'build/extended/css/style.css'
            },
            demoBase: {
                options: {
                    cleancss: true
                },
                src:'web/less/style.demo.base.less',
                dest:'build/demo/css/style.css'
            },
            demoExtended: {
                options: {
                    cleancss: true
                },
                src:'web/less/style.demo.extended.less',
                dest:'build/demo/css/style.css'
            }
        },
        browserify: {
            base: {
                src: 'web/scripts/grid.js',
                dest: 'build/base/js/grid.js'
            },
            extended: {
                src: 'web/scripts/grid.js',
                dest: 'build/extended/js/grid.js'
            },
            demo: {
                src: 'web/scripts/grid.js',
                dest: 'build/demo/js/grid.js'
            }
        },
        cssmin: {
            base: {
                files: [{
                    expand: true,
                    cwd: 'build/base/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/base/css',
                    ext: '.min.css'
                }]
            },
            extended: {
                files: [{
                    expand: true,
                    cwd: 'build/extended/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/extended/css',
                    ext: '.min.css'
                }]
            },
            demo: {
                files: [{
                    expand: true,
                    cwd: 'build/demo/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/demo/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            base: {
                files: {
                    'build/base/js/grid.min.js': ['build/base/js/grid.js']
                }
            },
            extended: {
                files: {
                    'build/extended/js/grid.min.js': ['build/extended/js/grid.js']
                }
            },
            demo: {
                files: {
                    'build/demo/js/grid.min.js': ['build/demo/js/grid.js']
                }
            }
        },
        copy: {
            base: {
                files:[
                    {
                        expand: true,
                        cwd: 'web/fonts/icn-ctrl',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/base/fonts/icn-ctrl'
                    }
                ]
            },
            extended: {
                files:[
                    {
                        expand: true,
                        cwd: 'web/fonts/',
                        src: ['*.*', '**/*.*', '!demo/*.*'],
                        dest: 'build/extended/fonts/'
                    }
                ]
            },
            demoBase: {
                files:[
                    {
                        src: 'web/index-base.html',
                        dest: 'build/demo/index.html',
                    },
                    {
                        expand: true,
                        cwd: 'web/fonts/icn-ctrl',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/base/fonts/icn-ctrl'
                    }
                ]
            },
            demoExtended: {
                files:[
                    {
                        src: 'web/index-extended.html',
                        dest: 'build/demo/index.html',
                    },
                    {
                        expand: true,
                        cwd: 'web/img',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo/img'
                    },
                    {
                        expand: true,
                        cwd: 'web/fonts',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo/fonts'
                    }
                ]
            }
        },
        clean: {
            base: ['build/base/js/grid.js', 'build/base/css/style.css'],
            extended: ['build/extended/js/grid.js', 'build/extended/css/style.css', 'build/extended/fonts/**/*'],
            demo: ['build/demo/js/grid.js', 'build/demo/css/style.css']
        },
        watch: {
            htmlBase: {
                files: ['web/index-base.html'],
                tasks: ['demo-base']
            },
            htmlExtended: {
                files: ['web/index-extended.html'],
                tasks: ['demo-extended']
            },
            jsBase: {
                files: ['web/scripts/**/*.js'],
                tasks: ['demo-base']
            },
            jsExtended: {
                files: ['web/scripts/**/*.js'],
                tasks: ['demo-extended']
            },
            styleBase: {
                files: ['web/less/**/*.less'],
                tasks: ['less:demoBase'],
                options: {
                    spawn: false
                }
            },
            styleExtended: {
                files: ['web/less/**/*.less'],
                tasks: ['less:demoExtended'],
                options: {
                    spawn: false
                }
            },
            imageBase: {
                files: ['web/img/**'],
                tasks: ['demo-base'],
                options: {
                    spawn: false
                }
            },
            imageExtended: {
                files: ['web/img/**'],
                tasks: ['demo-extended'],
                options: {
                    spawn: false
                }
            }
        },
        concurrent: {
            base: {
                tasks: ['watch:htmlBase', 'watch:jsBase', 'watch:styleBase', 'watch:imageBase'],
                options: {
                    logConcurrentOutput: true
                }
            },
            extended: {
                tasks: ['watch:htmlExtended', 'watch:jsExtended', 'watch:styleExtended', 'watch:imageExtended'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // defaultne se provadi všechny buildy
    grunt.registerTask('default', ['base', 'extended', 'demo']);

    // build se základními styly
    grunt.registerTask('base', ['less:base', 'cssmin:base', 'browserify:base',  'uglify:base', 'clean:base', 'copy:base']);

    // build se rozšiřujícími styly
    grunt.registerTask('extended', ['less:extended', 'cssmin:extended', 'browserify:extended',  'uglify:extended', 'clean:extended', 'copy:extended']);

    // build pro demo
    grunt.registerTask('demo-base', ['less:demoBase', 'cssmin:demo', 'browserify:demo', 'uglify:demo', 'clean:demo', 'copy:demoBase']);

    // build pro remote
    grunt.registerTask('demo-extended', ['less:demoExtended', 'cssmin:demo', 'browserify:demo',  'uglify:demo', 'clean:demo', 'copy:demoExtended']);

    // speciální task pro sledování
    grunt.registerTask('watch-base', ['concurrent:base']);
    grunt.registerTask('watch-extended', ['concurrent:extended']);
};
