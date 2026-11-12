const { Router } = require('express');
const router = Router();

const db = require('../database/db');
const auth = require('../middleware/auth.middleware');

router.get('/', (req, res) => {
  const vagas = db.prepare(`
    SELECT v.*, e.nome AS empresa_nome
    FROM vagas v
    JOIN empresas e ON e.id = v.empresa_id
    ORDER BY v.created_at DESC
  `).all();

  res.json(vagas);
});

router.post('/', auth, (req, res) => {
  // 1. Pega o ID da empresa logada direto do token JWT
  const empresa_id = req.empresa.id; 
  
  // 2. Não extrai mais o empresa_id do body
  const { titulo, tipo, tecnologias, salario, cep, cidade, estado, descricao } = req.body;

  // 3. Valida apenas os campos do body
  if (!titulo || !tipo) {
    return res.status(400).json({ erro: 'Campos obrigatórios: titulo, tipo' });
  }

  const result = db.prepare(`
    INSERT INTO vagas (titulo, empresa_id, tipo, tecnologias, salario, cep, cidade, estado, descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(titulo, empresa_id, tipo, tecnologias || '', salario || '', cep || '', cidade || '', estado || '', descricao || '');

  const vaga = db.prepare('SELECT * FROM vagas WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(vaga);
});


router.get('/:id', (req, res) => {
  const vaga = db.prepare(`
    SELECT v.*, e.nome AS empresa_nome
    FROM vagas v
    JOIN empresas e ON e.id = v.empresa_id
    WHERE v.id = ?
  `).get(req.params.id);

  if (!vaga) {
    return res.status(404).json({ erro: 'Vaga não encontrada' });
  }

  res.json(vaga);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const existente = db.prepare('SELECT id FROM vagas WHERE id = ?').get(id);

  if (!existente) {
    return res.status(404).json({ erro: 'Vaga não encontrada' });
  }

  const { titulo, tipo, tecnologias, salario, cep, cidade, estado, descricao } = req.body;

  db.prepare(`
    UPDATE vagas SET
      titulo = COALESCE(?, titulo),
      tipo = COALESCE(?, tipo),
      tecnologias = COALESCE(?, tecnologias),
      salario = COALESCE(?, salario),
      cep = COALESCE(?, cep),
      cidade = COALESCE(?, cidade),
      estado = COALESCE(?, estado),
      descricao = COALESCE(?, descricao)
    WHERE id = ?
  `).run(titulo, tipo, tecnologias, salario, cep, cidade, estado, descricao, id);

  const atualizada = db.prepare('SELECT * FROM vagas WHERE id = ?').get(id);
  res.json(atualizada);
});

router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  const empresa_id = req.empresa.id; // ID da empresa logada

  // Verifica tanto o ID da vaga quanto o ID da empresa dona da vaga
  const result = db.prepare('DELETE FROM vagas WHERE id = ? AND empresa_id = ?').run(id, empresa_id);

  if (result.changes === 0) {
    return res.status(404).json({ erro: 'Vaga não encontrada ou você não tem permissão para excluí-la' });
  }

  res.status(204).send();
});

module.exports = router;