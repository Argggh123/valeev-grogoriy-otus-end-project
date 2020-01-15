const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');
const Memes = require('../models/Memes');

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, exec) => {
    exec(null, `./uploads/`);
  },
  filename: (req, file, exec) => {
    exec(null, new Date().toISOString() + file.originalname);
  },
  fileFilter: (req, file, exec) => {
    if (file.mimeType !== 'image/jpeg' || file.mimeType !== 'image/png' || file.mimeType !== 'image/gif' || file.mimeType !== 'video/mp4' || file.mimeType !== 'video/webm') {
      exec(new Error('Не поддерживаемый тип файла'));
    }
  },
});
const upload = multer({ storage });

router.get('/all', async (req, res) => {
  try {
    const memesArr = await Memes.find({});

    res.json({ memesArr });
  } catch (e) {
    res.status(500).json('Что то пошло не так... Но это не точно');
  }
});

router.post('/create', auth, upload.single('memesImage'), async (req, res) => {
  try {
    let urlType = 'file';
    let mem;
    console.log(req.body);
    if (!req.file) {
      urlType = 'url';
      mem = new Memes({
        memesName: req.body.memesName,
        urlType,
        owner: req.user.userId,
        memesImage: req.memesImage,
        tags: req.body.tags || '',
      });
      await mem.save();

      return res.status(201).json({ mem });
    }

    mem = new Memes({
      memesName: req.body.memesName,
      memesImage: req.file.path,
      owner: req.user.userId,
      urlType,
      mimeType: req.file.mimeType,
      tags: req.body.tags || '',
    });
    await mem.save();

    res.status(201).json({ mem });
  } catch (e) {
    res.status(500).json('Что то пошло не так... Но это не точно');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const memes = await Memes.find({ owner: req.user.userId });
    res.json(memes);
  } catch (e) {
    res.status(500).json('Что то пошло не так... Но это не точно');
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const mem = await Memes.findById(req.params.id); // ???
    res.json(mem);
  } catch (e) {
    res.status(500).json('Что то пошло не так... Но это не точно');
  }
});

module.exports = router;
