module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-svginjector");

  grunt.initConfig({

    svgstore: {
      options: {
        // This will prefix each ID
        prefix: 'icon-',
        cleanup: ["fill"],
        //=includedemo: true,
        /*
          Write a custom function to strip the first part of the file that Adobe Illustrator generates when exporting the artboards to SVG
        */
        convertNameToId: function(name) {
          return name.replace(/^\w+\-/, '');
        }
      },
      icons: {
        files: {
          "components/icon/src/icons.svg": ["components/icon/svgs/*.svg"]
        }
      }
    },

    svginjector: {
      icons: {
        files: {
          "components/icon/src/icons.js": ["components/icon/src/icons.svg"]
        },
        options: {
          container: "icon-container"
        }
      }
    }

  });

  grunt.registerTask("icons", ["svgstore:icons", "svginjector:icons"]);

}