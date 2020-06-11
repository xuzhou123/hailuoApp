const gulp = require('gulp');
var ftp = require('vinyl-ftp');

// 上传到debug
const ftpDebug = () => {
  var conn = ftp.create({
    host: '47.114.91.63',
    user: 'hailuoh5',
    password: 'hailuoh5',
    parallel: 10
  });
  var globs = [
    './dist/**'
  ];
  return gulp.src(globs, { base: './dist/*', buffer: false })
    .pipe(conn.newer('/view1')) // only upload newer files
    .pipe(conn.dest('/view1'));
};

// 上线
gulp.task('default', gulp.series(
  ftpDebug
));