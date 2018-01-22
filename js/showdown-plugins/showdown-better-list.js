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
  showdown.extension('betterlist', function () {
    return [{
      type:   'output',
      filter: function (source) {
        source = source.replace(/<li>(.*)<\/li>/gi, function (match, pre) {
          if(pre){
            return '<li><p>' + pre + '</p></li>';
          }
        });

        return source;
      }
    }];
  });
}));

