// License MIT
// Author: Kriegslustig <npm@ls7.ch>
// GitHub: https://github.com/Kriegslustig/showdown-footnotes.git

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
  var converter = new showdown.Converter();

  showdown.extension('footnote', function () {
    return [{
      type: 'lang',
      filter: function filter(text) {
        return text.replace(/^\[\^([\d\w]+)\]:\s*((\n+(\s{2,4}|\t).+)+)$/mg, function (str, name, rawContent, _, padding) {
          var content = converter.makeHtml(rawContent.replace(new RegExp('^' + padding, 'gm'), ''));
          return '<div class="footnote" id="footnote-' + name + '"><a href="#footnote-' + name + '"><sup>[' + name + ']</sup></a>:' + content + '</div>';
        });
      }
    }, {
      type: 'lang',
      filter: function filter(text) {
        return text.replace(/^\[\^([\d\w]+)\]:( |\n)((.+\n)*.+)$/mg, function (str, name, _, content) {
          return '<small class="footnote" id="footnote-' + name + '"><a href="#footnote-' + name + '"><sup>[' + name + ']</sup></a>: ' + content + '</small>';
        });
      }
    }, {
      type: 'lang',
      filter: function filter(text) {
        return text.replace(/\[\^([\d\w]+)\]/m, function (str, name) {
          return '<a href="#footnote-' + name + '"><sup>[' + name + ']</sup></a>';
        });
      }
    }];
  });
}));

