/* 
 * @Author: Marte
 * @Date:   2016-10-27 16:15:29
 * @Last Modified by:   Marte
 * @Last Modified time: 2016-10-28 16:20:13
 */
var gulp = require('gulp');
fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util');
/*imagemin = require('gulp-imagemin'),
 pngquant = require('imagemin-pngquant'),*/
cache = require('gulp-cache'),
    os = require('os'),
    fs = require('fs');
gulpopen = require('gulp-open'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');
/* browserSync = require('browser-sync');
 reload = browserSync.reload; */
var host = {
    path: './dist',
    port:8092,
    index:'index.html'
}
/*gulp.task('uglify',function(){
    gulp.src('src/js/!*.js')
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('dist/js'))
})*/
/*gulp.task('default',function(){
    gulp.watch('src/js/!*.js',['uglify'])
})*/
//定义任务1.导入页面公共模板
/*gulp.task('fileinclude',function(done){
    gulp.src('src/view/!*.html')
        .pipe(fileinclude({
            prefix:'@@',
            basepath:'@file'
        }))
        .pipe(gulp.dest('dist/view'))
        .on('end',done)
})*/
//2.清除dist目录
/*gulp.task('clean',function(done){
    gulp.src(['dist'])
        .pipe(clean())
        .on('end',done)
})*/
//3.合并压缩css(可以使用sass,less)
gulp.task('cssmin',function(done){
    gulp.src(['view/public/css/*.scss'])
        .pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1',"Firefox >= 20", 'ios >=6', 'Android >= 4.0']}))
         // .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('view/public/css/'))
        .on('end',done)
})
//4.拷贝图片(需要对图片进一步处理)
//压缩图片
/*gulp.task("imagemin",function(done){
    gulp.src("src/images/!*.{png,jpg,gif,ico}")
    /!*.pipe(cache(imagemin({
     optimizationLevel: 5,           //类型：Number  默认：3  取值范围：0-7（优化等级）
     progressive: true,              //类型：Boolean 默认：false 无损压缩jpg图片
     interlaced: true,               //类型：Boolean 默认：false 隔行扫描gif进行渲染
     multipass: true,                //类型：Boolean 默认：false 多次优化svg直到完全优化
     svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
     use: [pngquant()]               //使用pngquant深度压缩png图片的imagemin插件
     })))*!/
        .pipe(gulp.dest("dist/images"))
        .on('end',done)
});*/
//

//5.运行web服务器
gulp.task('connect',function(){
    console.log('正在连接中......')
    connect.server({
        root:host.path,
        port:host.port,
        livereload:true
    })
})
var browser = os.platform() === 'linux' ?'google-chrome':(
    os.platform() === 'darwin' ?'google-chrome':(
        os.platform() === 'win32'?'chrome':'chrome')
)
//6.自动打开页面
/*gulp.task('open',function(done){
    gulp.src('')
        .pipe(gulpopen({
            app:browser,
            uri:'http://localhost:8092/view/'+host.index
        }))
        .on('end',done)
})*/
//6.任务组装
gulp.task('dev', [/*'fileinclude',*/ 'cssmin'/*, 'uglify', 'imagemin'*/, 'connect', 'watch'/*, 'open'*/])
//7.看守文档变化
gulp.task('watch',function(done){
    gulp.watch('view/public/css/**/*', [/*'fileinclude',*/ 'cssmin'/*, 'uglify'*/])
})
