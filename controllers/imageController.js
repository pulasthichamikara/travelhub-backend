const imageDownloader = require('image-downloader');
const fs = require('fs');

module.exports = {
  uploadByUrl: async (req, res) => {
    try {
      const uploadsDir = __dirname + '/../uploads/';
      const { photosUrl } = req.body;
      const newName = 'image-' + Date.now() + '.jpg';
      const dest = uploadsDir + newName;
      await imageDownloader.image({
        url: photosUrl,
        dest: dest,
      });
      res.json(newName);
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
    try {
      const uploadsDir = __dirname + '/../uploads/';
      console.log('images', images);
      images.forEach((img) => {
        let imagePath = uploadsDir + img;
        fs.unlinkSync(imagePath);
      });
    } catch (err) {}
  },
};
