angular
	.module('app')
	.filter('extension', function () {
		return function (filename, show, extension) {
			if (!filename) return;
			let newFilename;

			if (filename && filename.includes(extension)) {
				newFilename = filename;
			} else {
				newFilename = `${filename}.${extension}`;
			}

			return (show) ? newFilename : filename.replace(extension, '');
		}
	});