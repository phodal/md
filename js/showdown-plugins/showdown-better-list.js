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
        // 样式定义
        var ulStyle = 'list-style: circle; padding-left: 1em; margin-left: 0; color: #384452;';
        var olStyle = 'list-style: decimal; padding-left: 1em; margin-left: 0; color: #384452;';
        var liStyle = 'display: block; margin: 0.2em 8px; color: #384452;';
        var strongStyle = 'color: #1abc9c; font-weight: bold; font-size: inherit;';

        // 处理 li 内容的函数
        function processLiContent(content, bullet) {
          // 移除已有的 section、p、span leaf 标签，只保留内容
          content = content.replace(/<section[^>]*>([\s\S]*?)<\/section>/gi, '$1');
          content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1');
          content = content.replace(/<span leaf[^>]*>([\s\S]*?)<\/span>/gi, '$1');
          content = content.trim();

          // 处理 **标题**：内容 这种格式
          var processed = content.replace(/<strong>([^<]+)<\/strong>(：|:)([\s\S]*)/gi, function(m, title, colon, rest) {
            return '<span leaf="">' + bullet + '</span>' +
              '<strong class="strong" style="' + strongStyle + '"><span leaf="">' + title + '</span></strong>' +
              '<span leaf="">' + colon + rest.trim() + '</span>';
          });

          // 如果没有匹配 **标题**：内容 格式，处理普通内容
          if (processed === content) {
            content = content.replace(/<strong>([^<]+)<\/strong>/gi, function(m, inner) {
              return '<strong class="strong" style="' + strongStyle + '"><span leaf="">' + inner + '</span></strong>';
            });
            processed = '<span leaf="">' + bullet + '</span><span leaf="">' + content + '</span>';
          }

          return '<section>' + processed + '</section>';
        }

        // 处理 ul 块（包括内部的 li）
        source = source.replace(/<ul>([\s\S]*?)<\/ul>/gi, function(match, inner) {
          // 处理 ul 内的所有 li，使用 • 符号
          var processedInner = inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, function(m, content) {
            var finalContent = processLiContent(content, '•&nbsp;');
            return '<li style="' + liStyle + '">' + finalContent + '</li>';
          });
          return '<ul style="' + ulStyle + '" class="list-paddingleft-1">' + processedInner + '</ul>';
        });

        // 处理 ol 块（包括内部的 li）
        source = source.replace(/<ol>([\s\S]*?)<\/ol>/gi, function(match, inner) {
          var counter = 0;
          // 处理 ol 内的所有 li，使用数字
          var processedInner = inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, function(m, content) {
            counter++;
            var finalContent = processLiContent(content, counter + '.&nbsp;');
            return '<li style="' + liStyle + '">' + finalContent + '</li>';
          });
          return '<ol style="' + olStyle + '" class="list-paddingleft-2">' + processedInner + '</ol>';
        });

        return source;
      }
    }];
  });
}));

