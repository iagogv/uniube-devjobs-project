const { Router } = require('express');
const router = Router();

router.get('/:cep', async (req, res) => {
  const cep = req.params.cep.replace(/\D/g, '');

  if (cep.length !== 8) {
    return res.status(400).json({ erro: 'CEP deve ter 8 dígitos' });
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      return res.status(404).json({ erro: 'CEP não encontrado' });
    }

    res.json({
      cep: data.cep,
      cidade: data.localidade,
      estado: data.uf,
      bairro: data.bairro,
      logradouro: data.logradouro
    });
  } catch {
    res.status(502).json({ erro: 'Falha ao consultar ViaCEP' });
  }
});

module.exports = router;