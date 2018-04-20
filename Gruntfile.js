module.exports = function(grunt) {
	grunt.initConfig({
		
		uglify: {
			build: {
				src: 'src/theme/js/script.js',
				dest: 'src/theme/js/script.min.js'
			}
		},

		cssmin: {
			build: {
				src: 'src/theme/css/style.css',
				dest: 'src/theme/css/style.min.css'
			}
		},
		
		htmlmin: {
			options: {
				removeComments: true,
		        collapseWhitespace: true
			},
			build: {
				src: 'src/theme/index.html',
				dest: 'src/theme/index.min.html'
			}
		}
	
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	
	grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
};