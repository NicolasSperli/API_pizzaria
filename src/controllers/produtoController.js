import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';
 
 
export const produtoCreateSchema = Joi.object({
  nomeProduto: Joi.string().required().max(25),
  descricao: Joi.string().required().max(100),
  tipo: Joi.string().required().max(15),
  valor: Joi.string().required().max(15),
  imagem: Joi.string().allow(" "),
});
 
export const produtoUpdateSchema = Joi.object({
  nomeProduto: Joi.string().allow(" ").max(25),
  descricao: Joi.string().allow(" ").max(100),
  tipo: Joi.string().allow(" ").max(15),
  valor: Joi.string().allow(" ").max(15),
  imagem: Joi.string().allow(" "),
}).min(1);
 
export const listarProdutos = async (req, res) => {
    try {
      const {valorMinimo, valorMaximo, nomeProduto, idProduto, tipo} = req.query;
      const produto = await produtoService.findAll(valorMinimo, valorMaximo, nomeProduto, idProduto, tipo);
      res.json(produto);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
 
export const adicionarProduto = async (req, res) => {
  try {
    const novoProduto = await produtoService.create(req.body);
    res.status(201).json({ message: 'Produto adicionado com sucesso', data: novoProduto });
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'idProduto já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
};
 
export const atualizarProduto = async (req, res) => {
  try {
    const { idProduto } = req.params;
    const updated = await produtoService.update(idProduto, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};
 
export const deletarProduto = async (req, res) => {
  try {
    const { idProduto } = req.params;
    const deleted = await produtoService.remove(idProduto);
    if (!deleted) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};