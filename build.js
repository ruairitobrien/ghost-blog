#!/usr/bin/env node
var fs = require('fs');
var archiver = require('archiver');

var buildFile = __dirname + '/ghost-blog.zip';
try {
    fs.unlinkSync(buildFile);
} catch(err) {
    // Do nothing
}

var output = fs.createWriteStream(buildFile);
var archive = archiver('zip', {
    zlib: { level: 9 }
});

// listen for all archive data to be written
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
      console.warning(err);
  } else {      
      throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.directory('partials/', 'partials');
archive.directory('assets/', 'assets');
archive.glob('*.hbs');
archive.glob('./package.json');

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();