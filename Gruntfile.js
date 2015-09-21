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
                src:'web/less/szd.base.less',
                dest:'build/base/css/szd.css'
            },
            extended: {
                options: {
                    cleancss: true
                },
                src:'web/less/szd.extended.less',
                dest:'build/extended/css/szd.css'
            },
            demoBase: {
                options: {
                    cleancss: true
                },
                src:'demo/less/demo.base.less',
                dest:'build/demo/css/demo.css'
            },
            demoExtended: {
                options: {
                    cleancss: true
                },
                src:'demo/less/demo.extended.less',
                dest:'build/demo/css/demo.css'
            }
        },
        browserify: {
            base: {
                src: 'web/scripts/grid.js',
                dest: 'build/base/js/szd.js'
            },
            extended: {
                src: 'web/scripts/grid.js',
                dest: 'build/extended/js/szd.js'
            },
            demo: {
                src: 'web/scripts/grid.js',
                dest: 'build/demo/js/szd.js'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
                roundingPrecision: -1,
                shorthandCompacting: false,
                advanced: true,
            },
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
                    'build/base/js/szd.min.js': ['build/base/js/szd.js']
                }
            },
            extended: {
                files: {
                    'build/extended/js/szd.min.js': ['build/extended/js/szd.js']
                }
            },
            demo: {
                files: {
                    'build/demo/js/szd.min.js': ['build/demo/js/szd.js']
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
                        src: ['*.*', '**/*.*'],
                        dest: 'build/extended/fonts/'
                    }
                ]
            },
            demoBase: {
                files:[
                    {
                        src: 'demo/index-base.html',
                        dest: 'build/demo/index.html',
                    },
                    {
                        expand: true,
                        cwd: 'web/fonts/icn-ctrl',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo/fonts/icn-ctrl'
                    },
                    {
                        expand: true,
                        cwd: 'demo/fonts',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo/fonts/demo'
                    },
                    {
                        expand: true,
                        cwd: 'build/demo',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo-base'
                    }
                ]
            },
            demoExtended: {
                files:[
                    {
                        src: 'demo/index-extended.html',
                        dest: 'build/demo/index.html',
                    },
                    {
                        expand: true,
                        cwd: 'web/img',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo-extended/img'
                    },
                    {
                        expand: true,
                        cwd: 'demo/img',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo/img/demo'
                    },
                    {
                        expand: true,
                        cwd: 'web/fonts',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo/fonts'
                    },
                    {
                        expand: true,
                        cwd: 'demo/fonts',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo/fonts/demo'
                    },
                    {
                        expand: true,
                        cwd: 'build/demo',
                        src: ['*.*', '**/*.*'],
                        dest: 'build/demo-extended'
                    }
                ]
            }
        },
        clean: {
            base: ['build/base/js/szd.js', 'build/base/css/szd.css'],
            extended: ['build/extended/js/szd.js', 'build/extended/css/szd.css'],
            demo: ['build/demo/js/szd.js', 'build/demo/css/demo.css']
        },
        watch: {
            htmlBase: {
                files: ['demo/index-base.html'],
                tasks: ['demo-base']
            },
            htmlExtended: {
                files: ['demo/index-extended.html'],
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
    grunt.registerTask('base', ['less:base', 'cssmin:base', 'browserify:base',  'uglify:base', 'copy:base', 'clean:base']);

    // build se rozšiřujícími styly
    grunt.registerTask('extended', ['less:extended', 'cssmin:extended', 'browserify:extended',  'uglify:extended', 'copy:extended', 'clean:extended']);

    // build pro demo
    grunt.registerTask('demo-base', ['less:demoBase', 'cssmin:demo', 'browserify:demo', 'uglify:demo', 'copy:demoBase', 'clean:demo']);

    // build pro remote
    grunt.registerTask('demo-extended', ['less:demoExtended', 'cssmin:demo', 'browserify:demo',  'uglify:demo', 'copy:demoExtended', 'clean:demo']);

    // speciální task pro sledování
    grunt.registerTask('watch-base', ['concurrent:base']);
    grunt.registerTask('watch-extended', ['concurrent:extended']);
};
