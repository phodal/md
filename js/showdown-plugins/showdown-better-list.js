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
        // 为 ul 添加样式 - 简化样式，与微信格式一致
        source = source.replace(/<ul>/gi, function () {
          return '<ul class="list-paddingleft-1">';
        });

        // 为 ol 添加样式
        source = source.replace(/<ol>/gi, function () {
          return '<ol class="list-paddingleft-1">';
        });

        // 处理 li 标签
        source = source.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, function (match, content) {
          // 移除包裹内容的 section 标签，但保留内容
          content = content.replace(/<section[^>]*>([\s\S]*?)<\/section>/gi, function(m, inner) {
            if (!inner.trim() || inner.trim().match(/^(<br[^>]*>|<span[^>]*><br[^>]*><\/span>|\s)*$/i)) {
              return '';
            }
            return inner;
          });

          // 移除包裹内容的 p 标签，但保留内容
          content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, function(m, inner) {
            return inner;
          });

          // 清理多余的空白和换行
          content = content.trim();

          // 处理 **标题**：内容 这种格式，转换为微信编辑器期望的格式
          content = content.replace(/<strong>([^<]+)<\/strong>(：|:)([\s\S]*)/gi, function(m, title, colon, rest) {
            return '<strong>' +
              '<span leaf="">' +
              '<span textstyle="" style="font-weight: bold">' + title + '</span>' +
              colon + rest +
              '</span>' +
              '</strong>';
          });

          // 如果没有匹配上面的格式，为普通的 strong 标签添加样式
          content = content.replace(/<strong>([^<]+)<\/strong>/gi, function(m, inner) {
            return '<strong>' +
              '<span leaf="">' +
              '<span textstyle="" style="font-weight: bold">' + inner + '</span>' +
              '</span>' +
              '</strong>';
          });

          // 为 em 标签添加样式
          content = content.replace(/<em>/gi, '<em style="box-sizing: inherit;">');

          // 返回简洁的 li 标签，无多余样式
          return '<li>' + content + '</li>';
        });

        return source;
      }
    }];
  });
}));

