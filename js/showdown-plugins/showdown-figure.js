// Author: Tomás Correia Marques
// GitHub: https://github.com/tomasmcm/figure-extension
//

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
  var fig = '<figure>' + '<img src="%1" alt="%2" title="%4">' + '<figcaption>%3</figcaption>' + '</figure>';
  var imgRegex = /(?:<p>)?<img.*?src="(.+?)".*?alt="(.*?)"(.*?)\/?>(?:<\/p>)?/gi;

  showdown.extension('figure', function () {
    return [
      {
        type: 'output',
        filter: function (text, converter, options) {
          var tag = fig;


          return text.replace(imgRegex, function (match, url, alt, rest) {
            return tag.replace('%1', url).replace('%2', alt).replace('%3', alt).replace('%4', alt);
          });
        }
      }
    ];
  });
}));
