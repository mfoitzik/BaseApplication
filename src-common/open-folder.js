const { dialog } = require('electron')
var fs = require('fs')

function folderPath() {
    return new Promise(function( resolve, reject ) {
        var folderPath = "";
        dialog.showOpenDialog({
            //properties: ['openFile']
            properties: ['openDirectory']
          }).then(result => {
            var mike = false
            console.log('MIKEBOOL: ' + mike)
            console.log('CANCELLED RESULT:' + result.canceled)
            if (result.canceled === false) {
              console.log('I AM NOT CANCELLED')
            }
            if (result.canceled === true) {
              console.log('I AM CANCELLED')
            }
            if (!result.cancelled) {
              console.log('I AM GOING TO READ FILE PATH')
              console.log('path: ' + result.filePaths[0])
              fs.readdir(result.filePaths[0], function (err, files) {
                if (err)
                   throw err;
                for (var index in files) {
                   console.log(files[index]);
                }
                });
              resolve(result.filePaths[0])
            //   fs.readFile(result.filePaths[0], 'utf-8', function (err, data) {
            //     if (err) {
            //       alert('An error ocurred reading the file :' + err.message)
            //       return
            //     }
            //     // Change how to handle the file content
            //     self.textidentifier = data
            //     console.log('The file content is : ' + data)
            //  })
            }
            // console.log(result.filePaths)
          }).catch(err => {
            reject(err)
          })
    })
} 

//module.exports = { folderPath }
export { folderPath }