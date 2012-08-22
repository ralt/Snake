/**
 * Script taken here:
 * https://github.com/Raynos/fyp/blob/master/src/build.js
 */
var path = require("path"),
    child_process = require("child_process"),
    fs = require("fs"),
    clientModules = path.join(__dirname, "js")

function readFiles(dir) {
    fs.readdir(dir, function (err, files) {
        //console.log("reading files", files)
        files.forEach(function (file) {
            file = path.join(dir, file)
            fs.stat(file, function (err, stat) {
                if (err) {
                    console.log(err)
                }
                if (stat.isDirectory()) {
                    readFiles(file)
                } else if (stat.isFile()) {
                    fs.watchFile(file, build)
                }
            })
        })
    })
}

function build() {
    console.log("building")
    child_process.exec("browserify -e js/main.js -o bundle.js")
}

readFiles(clientModules)
build()
