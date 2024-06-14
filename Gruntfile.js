module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-es6-module-transpiler');
 
    grunt.initConfig({
        transpile: {
          main: {
            type: "globals",
            imports: { gameState: "GameState" },
            files: {
              'dist/GameState.js': ['src/components/GameState.js']
            }
          }
        }
      });

    grunt.registerTask('build', ['transpile']);

};