module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'css/*'
                ],
                dest: 'dist/minesweeper.min.css'
            },
            js: {
                src: [
                    'js/lib/jquery-1.11.1.min.js',
                    'js/lib/taphold.js',
                    'js/lib/FastClick.js',
                    'js/lib/bootstrap.min.js',
                    'js/lib/underscore.js',
                    'js/lib/jquery.bpopup.min.js',
                    'js/lib/jquery.plugin.min.js',
                    'js/lib/jquery.countdown.min.js',
                    'js/app/Properties.js',
                    'js/app/Dashboard.js',
                    'js/app/SquareBox.js',
                    'js/app/Canvas.js',
                    'js/app/app.js'
                ],
                dest: 'dist/minesweeper.min.js'
            }
        },
        cssmin: {
            css: {
                src: 'dist/minesweeper.min.css',
                dest: 'dist/minesweeper.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/minesweeper.min.js': ['dist/minesweeper.min.js']
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};