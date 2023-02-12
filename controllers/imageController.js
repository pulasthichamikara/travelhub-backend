const imageDownloader = require('image-downloader');
const { admin } = require('../config/firebase/firebase-config');
const bucket = admin.storage().bucket();
const fs = require('fs');
const axios = require('axios');

module.exports = {
  uploadByUrl: async (req, res) => {
    try {
      const { photosUrl } = req.body;
      const fileName = `image-${Date.now()}.jpg`;
      const file = bucket.file(fileName);
      const image = await axios.get(photosUrl, { responseType: 'arraybuffer' });
      await file
        .createWriteStream({
          metadata: {
            contentType: 'image/jpeg',
          },
        })
        .end(image.data);

      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2025',
      });
      if (url) {
        res.json(fileName);
      }
    } catch (err) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  deleteImage: async (req, res) => {
    try {
      const uploadsDir = __dirname + '/../uploads/';
      const { img } = req.body;
      const imagePath = uploadsDir + img;
      /*  fs.unlinkSync(imagePath); */
      res.json({ message: 'Image deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  deleteBulkImages: async (images) => {
    console.log(images);
    try {
      images.forEach(async (img) => {
        const file = bucket.file(img);
        const [exists] = await file.exists();
        if (exists) {
          await file.delete();
        } else {
          console.error(`File "${img}" does not exist.`);
        }
      });
    } catch (err) {
      console.error(err);
    }
  },
};
