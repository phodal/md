(function (extension) {
  'use strict';

  if (typeof showdown !== 'undefined') {
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    module.exports = extension(require('showdown'));
  } else {
    throw Error('Could not find showdown library');
  }

}(function (showdown) {
  'use strict';
  showdown.extension('tasklist', function () {
    return [{
      type:   'output',
      filter: function (source) {
        source = source.replace(/<li>\[ \] (.*)<\/li>/gi, function (match, pre) {
          if(pre){
            return '<p class="task-list-list uncheck" style="list-style-type: none;"><img src="http://md.phodal.com/imgs/uncheck.png" width="20" height="20"/><span>' + pre + '</span></p>'  ;
          }
        });

        source = source.replace(/<li>\[x] (.*)<\/li>/gi, function (match, pre) {
          if(pre){
            return '<p class="task-list-list checked" style="list-style-type: none;"><img src="http://md.phodal.com/imgs/checked.png" width="20" height="20"/>' + pre + '</p>'  ;
          }
        });

        return source;
      }
    }];
  });
}));

