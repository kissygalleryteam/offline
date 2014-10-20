var gulp = require('gulp');

var kmc = require('gulp-kmc');



var src = "./kissy5.0_code",
  dest = "./build";



kmc.config({
  // depFilePath: dest + 'mods-dep.js', //全局依赖文件关系，此处配置后下面的各个模块将不会再生成
  packages: [{
    name: 'kg',
    combine: true,
    base: src,
    ignorePackageNameInUri:true
  }]
});

gulp.task('kmc', function() {
  gulp.src(src + "/**/*.js")
  //转换cmd模块为kissy模块
  .pipe(kmc.convert({
    seajs: true,
    minify: true, //是否压缩
    //ext:"-min.js",//转换后文件扩展名，如果minify 为true则是压缩文件扩展名,同时也支持下面这种配置
    //ext: {
    //  src: "-debug.js", //kissy1.5后添加debug参数会默认加载-debug.js
    //  min: ".js"
    //},
    exclude: ['tasks'], //忽略该目录
    ignoreFiles: ['.combo.js', '-min.js'], //忽略该类文件
  }))
  //合并文件
  .pipe(kmc.combo({
    seajs: true,
    minify: true,
    // ext: "-min.js",
    files: [{
      src: src + '/index.js',
      dest: dest + '/index.js'
    }]
  }))
    .pipe(gulp.dest(dest));
})
gulp.task('default', ['kmc']);