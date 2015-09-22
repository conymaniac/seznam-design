module.exports = function ( grunt ) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dist: {
                options: {
                    cleancss: true
                },
                files:[{
                        src:'src/less/szd.settings.less',
                        dest:'dist/css/szd.css'
                    }]
            }
        },
        browserify: {
            dist: {
                src: 'src/scripts/grid.js',
                dest: 'dist/js/szd.js'
            }
        },
        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: 0,
                    roundingPrecision: -1,
                    shorthandCompacting: false,
                    advanced: true,
                },
                files: {
                    'dist/css/szd.min.css': ['dist/css/szd.css']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/szd.min.js': ['dist/js/szd.js']
                }
            }
        },
        copy: {
            dist: {
                files:[
                    {
                        expand: true,
                        cwd: 'src/fonts/',
                        src: ['*.*', '**/*.*'],
                        dest: 'dist/fonts/'
                    }
                ]
            }
        },
        clean: {
            dist: ['dist/js/szd.js', 'dist/css/szd.css']
        }
    });

    // build se základními styly
    grunt.registerTask('dist', ['less:dist', 'cssmin:dist', 'browserify:dist',  'uglify:dist', 'copy:dist']);
};
