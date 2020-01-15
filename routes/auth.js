const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Некорректный Email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });

      await user.save();

      res.status(201).json({ message: ' Пользователь создан' });

    } catch (e) {
      res.status(500).json('Что то пошло не так... Но это не точно');
    }
  },
);

router.post(
  '/authorize',
  auth,
  (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (req.user) {
      return res.json({
        token,
        userId: req.user.userId,
      })
    }
    res.status(500).json('Что то пошло не так... Но это не точно');
  },
);

router.post(
  '/login',
  [
    check('email', 'Некорректный Email').normalizeEmail().isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(500).json({ message: 'Неверный логин или пароль' });
      }
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' },
      );

      res.json({
        token,
        userId: user.id,
      });
    } catch (e) {
      res.status(500).json('Что то пошло не так... Но это не точно');
    }
  },
);

module.exports = router;
