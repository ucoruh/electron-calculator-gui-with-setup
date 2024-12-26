const sharp = require('sharp');

// 256x256 boyutunda PNG oluştur
sharp({
    create: {
        width: 256,
        height: 256,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
    }
})
.png()
.toFile('icon.png')
.then(() => {
    // PNG'yi ICO'ya dönüştür
    const toIco = require('to-ico');
    const fs = require('fs');
    
    fs.readFile('icon.png', (err, buf) => {
        if (err) throw err;
        
        toIco([buf], {
            resize: true,
            sizes: [256]
        })
        .then(buf => {
            fs.writeFileSync('icon.ico', buf);
            console.log('256x256 boyutunda icon.ico dosyası oluşturuldu!');
            
            // Geçici PNG dosyasını sil
            fs.unlinkSync('icon.png');
        })
        .catch(err => console.error('ICO dönüşümünde hata:', err));
    });
})
.catch(err => console.error('PNG oluşturmada hata:', err)); 