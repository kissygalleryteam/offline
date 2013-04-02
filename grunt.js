var fs = require('fs');


/*global module:false*/
module.exports = function(grunt) {


	var pkg = grunt.file.readJSON('package.json'),
		//版本号
		version = pkg.version || 1.0,
		//需要检测的文件列表，在package.json文件里配置
		list = pkg.list;

	var Direction = {
		existFiles: function() {
			var isOk = true,
				self = this;
			fileList = list.split(',');
			fileList.forEach(function(value) {
				var fileName = self._sub(value,{version:version}).trim();
				var hasFile = fs.existsSync(fileName);
				if (hasFile) {
					grunt.log.ok('Has File : ' + fileName);
				} else {
					isOk = false;
					grunt.log.error('No File : ' + fileName);
				}
			});
			return isOk;
		},
		/**
		 * 类似于KISSY.substitute		
		 */
		_sub:function(str,obj){
			return str.replace(/{(.*?)}/igm,
			function($, $1) {
				return obj[$1] ? obj[$1] : $;
			});
		}
	};

	//目录检测模块
	grunt.registerTask('detect', 'KISSY-gallery', function() {
		var isOk = Direction.existFiles();
		if (isOk) {
			grunt.log.writeln().success("Files are ok");
			return true;
		} else {
			grunt.log.writeln().fail('Please Check Files');
			return false;
		}
	});
	grunt.registerTask('default', ['detect']);
};