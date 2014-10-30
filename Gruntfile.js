module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-svginjector");
  grunt.loadNpmTasks("grunt-svgmin");

  grunt.initConfig({

    svgstore: {
      options: {
        // This will prefix each ID
        prefix: 'icon-',
        cleanup: ["fill"],
        /*
          Write a custom function to strip the first part of the file that Adobe Illustrator generates when exporting the artboards to SVG
        */
        convertNameToId: function(name) {
          return name.replace(/^\w+\-/, '');
        }
      },
      icons: {
        files: {
          "components/icon/src/icons.svg": "components/icon/svgs/*.svg"
        }
      }
    },

    svgmin: {
      options: {
        plugins: [
          { removeUselessStrokeAndFill: false },
          { removeTitle: true },
          { cleanupIDs: false },
          { removeDesc: true }
        ]
      },
      icons: {
        files: {
          "components/icon/src/icons-min.svg": "components/icon/src/icons.svg"
        }
      }
    },

    svginjector: {
      icons: {
        files: {
          "components/icon/src/icons.js": "components/icon/src/icons-min.svg"
        },
        options: {
          container: "icon-container"
        }
      }
    }

  });

  grunt.registerTask("icons",
    ["svgstore:icons", "svgmin:icons", "svginjector:icons"]);

}