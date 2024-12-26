const https = require('https');
const fs = require('fs');

// Klasörü oluştur
if (!fs.existsSync('./assets')){
    fs.mkdirSync('./assets');
}

// Daha büyük boyutlu bir ikon indir
const file = fs.createWriteStream("assets/icon.ico");
https.get("https://github.com/electron/electron/raw/main/shell/browser/resources/win/electron.ico", function(response) {
   response.pipe(file);
   file.on('finish', function() {
     console.log('İkon başarıyla indirildi!');
   });
}); 