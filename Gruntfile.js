module.exports = function (grunt) {
	// load all grunt tasks without explicitly referecing them
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	var path = require('path');
	var globalCfg = {
		src: {
			tsFiles: ['{app,app_engine,models,test}/**/*.ts', 'reference.ts'],
			generatedJSFiles: ['{app,app_engine,models,test}/**/*.{js,js.map}', 'reference.{js,js.map}'],
			staticMiscFiles: ['index.html', 'app/**/*.{html,json}', 'app/img/**'],
			staticFontFiles: ['bower_components/bootstrap/dist/fonts/**']
		},
		distDir: 'dist/'
	};
	
	//less config function for usemin
	var lessCreateConfig = function (context, block) {
		var cfg = { files: [] },
			//the destination file is the one referenced in the html and it's to be placed in the context.outDir folder 
			outfile = path.join(context.outDir, block.dest),
			filesDef = {};

		filesDef.dest = outfile;
		filesDef.src = [];
		//we have to process each 'less' file referenced in the html, and they are in the 'inDir' folder 
		context.inFiles.forEach(function (inFile) {
			filesDef.src.push(path.join(context.inDir, inFile));
		});

		cfg.files.push(filesDef);
		context.outFiles = [block.dest];
		return cfg;
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		globalCfg: globalCfg,
		ts: {
			default: {
				src: '<%= globalCfg.src.tsFiles %>',
				options: {
					target: 'es5',
					module: 'commonjs',
					noEmitOnError: true,
					fast: 'never'
				}
			}
		},
		tslint: {
			options: {
				configuration: grunt.file.readJSON("tslint.json")
			},
			files: {
				src: '<%= globalCfg.src.tsFiles %>'
			}
		},
		copy: {
			main: {
				files: [
					{ expand: true, src: '<%= globalCfg.src.staticMiscFiles %>', dest: '<%= globalCfg.distDir %>', filter: 'isFile' },
					{ expand: true, src: '<%= globalCfg.src.staticFontFiles %>', dest: '<%= globalCfg.distDir %>/fonts/', flatten: true, filter: 'isFile' }
				],
			},
		},
		useminPrepare: {
			//html file that usemin is going to analyse to find the files to process
			html: 'app/index.html',
			options: {
				//destination folder that usemin is going to use to output the processed files (for .js and .css for example)
				dest: '<%= globalCfg.distDir %>/app/',
				//this custom flow allows usemin to support less
				flow: {
					steps: {
						'js': ['concat', 'uglify'],
						'css': ['concat', 'cssmin'],
						'less': [{
							name: 'less',
							createConfig: lessCreateConfig
						}]
					},
					post: {}
				},
			}
		},
		less: {
			options: {
				plugins: [
					//plugin that automatically prefixes the css rules with vendor prefixes when needed 
					new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] }),
					//plugin that minifies the css
					new (require('less-plugin-clean-css'))()
				]
			}
		},
		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			},
			images: { src: '<%= globalCfg.distDir %>/app/img/**/*' },
			js: { src: '<%= globalCfg.distDir %>/app/js/**/*' },
			css: { src: '<%= globalCfg.distDir %>/app/css/**/*' }
		},
		usemin: {
			//html file within which usemin is going to replace the resource references  
			html: ['<%= globalCfg.distDir %>/app/**/*.html'],
			css: ['<%= globalCfg.distDir %>/app/css/*.css'],
			js: ['<%= globalCfg.distDir %>/app/js/*.js'],
			options: {
				//we add the css folder as an "assetDir" so that the ressources referenced in it can be resolved
				assetsDirs: [
					'<%= globalCfg.distDir %>/app',
					'<%= globalCfg.distDir %>/app/css'
				],
				blockReplacements: {
					less: function (block) {
						return '<link rel="stylesheet" href="' + block.dest + '">';
					}
				}
			}
		},
		karma: {
			//continuous integration mode: run tests once in PhantomJS browser.
			continuous: {
				configFile: 'karma.conf.js',
				singleRun: true,
				browsers: ['PhantomJS']
			}
		},
		clean: {
			public: [
				'<%= globalCfg.src.generatedJSFiles %>',
				'<%= globalCfg.distDir %>/**'
			]
		},
		connect: {
			dev: {
				options: {
					port: 5000,
					base: '<%= globalCfg.distDir %>',
					open: true,
					debug: true,
					keepalive: true
				}
			},
			flynn: {
				options: {
					port: process.env.PORT || 5000,
					base: '<%= globalCfg.distDir %>',
					keepalive: true
				}
			}
		}
	});

	grunt.registerTask('compile', [
		'clean',
		'tslint',
		'ts',
	]);

	grunt.registerTask('test', [
		'compile',
		'karma:continuous',
	]);
	grunt.registerTask('build', [
		'compile',
		'copy',
		'useminPrepare',
		'less:generated',
		'concat:generated',
		'cssmin:generated',
		'uglify:generated',
		'filerev',
		'usemin'
	]);
	grunt.registerTask('web', ['connect:dev']);
};
