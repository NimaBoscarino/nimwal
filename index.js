var request = require('request')
const download = require('image-downloader')
var exec = require('child_process').exec
var fs = require('fs')

var {applicationId, secret} = require('./config.json')
var API = "https://api.unsplash.com"
var ID = "?client_id=" + applicationId
var query = "&orientation=landscape"

request.get(API + '/photos/random' + ID + query, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    var info = JSON.parse(body)

    console.log(info.urls.raw)
    console.log(info.id)

    var options = {
      url: info.urls.raw,
      dest: `/Users/nima/Pictures/Wallpapers/${info.id}.jpg`
    }

    async function downloadIMG() {
      try {
        const { filename, image } = await download.image(options)
        console.log(filename) // => /path/to/dest/image.jpg
        exec(`/./Users/nima/GitHub/wal/wal -i /Users/nima/Pictures/Wallpapers/${info.id}.jpg -o /Users/nima/GitHub/wal/contrib/wal2iterm/wal2iterm -x`, function(error, stdout, stderr) {
          exec(`open ~/.cache/wal/itermcolors/${info.id}.jpg.itermcolors && \\033]50;SetProfile=$1\\a ${info.id}.jpg`, function(error, stdout, stderr) {
            // command output is in stdout
          });
        });        
      } catch (e) {
        throw e
      }
    }

    downloadIMG()
    

  }
})
