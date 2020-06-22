const del = require('del');

const fileMap = {
  '.scss': '.wxss'
}

module.exports = {
  DEST_PATH: 'dist',
  DEST_PAGE_PATH: 'dist/pages',
  showError: error => {
    console.log(error.toString());
    this.emit('end');
  },

  // src下文件删除对应删除dist目录下的文件
  delFile: path => del(path.replace('src', 'dist').replace(/(\.[a-z\d]+)$/, $1 => fileMap[$1] || $1))
}
