const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const router = Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const empresa = db.prepare('SELECT * FROM empresas WHERE email = ?').get(email);

  if (!empresa || !bcrypt.compareSync(senha, empresa.senha_hash)) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' });
  }

  const token = jwt.sign(
    { id: empresa.id, nome: empresa.nome, email: empresa.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, empresa: { id: empresa.id, nome: empresa.nome, email: empresa.email } });
});

module.exports = router;