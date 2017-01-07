define(function(require, exports, module){

  // Try to fake it out
  "//   ";require("./amd-module");

  //require("./something-not-real");

  if(/\//.test("/")) require("./amd-module-6");

  /**
   * require("./something-not-real");
   */

  /** require("./something-not-real"); */

  return {
    amd: true
  };

});
