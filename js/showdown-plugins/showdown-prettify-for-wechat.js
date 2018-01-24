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
  showdown.extension('prettify', function () {
    return [{
      type:   'output',
      filter: function (source) {
        return source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (match, pre, codeClass) {
          if (pre) {
            return '<pre class="prettyprint linenums" style="font-size: 10px;line-height: 12px"><code' + codeClass + ' style="font-size: 10px;line-height: 12px">';
          } else {
            return ' <code class="prettyprint code-in-text"  style="font-size: 12px;line-height: 18px">';
          }
        });
      }
    }];
  });
}));

