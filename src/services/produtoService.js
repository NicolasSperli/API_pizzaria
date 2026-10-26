//src/services/produtoService.js
import db from '../db/db.js';
import bcrypt from 'bcrypt';
 
export const findAll = async (valorMinimo, valorMaximo, nomeProduto, idProduto, tipo) => {
  let sql = 'SELECT * FROM produto';
  const conditions = [];
  const values = [];
 
  if (valorMinimo) {
    conditions.push('valor >= ?');
    values.push(valorMinimo);
  }
 
  if (valorMaximo) {
    conditions.push('valor <= ?');
    values.push(valorMaximo);
  }
 
  if (nomeProduto) {
    conditions.push('LOWER(nomeProduto) LIKE ?');
    values.push(`%${nomeProduto.toLowerCase()}%`);
  }
 
  if (idProduto) {
    conditions.push('idProduto = ?');
    values.push(idProduto);
  }
 
  if (tipo) {
    conditions.push('tipo = ?');
    values.push(tipo);
  }
 
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
 
  const [rows] = await db.query(sql, values);
  return rows;
 
};
 
export const create = async (newProduto) => {
 
  await db.query('INSERT INTO produto SET ?', newProduto);
 
  return newProduto;
};
 
export const update = async (idProduto, newProduto) => {
 
  const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [newProduto, idProduto]);
  return result.affectedRows > 0;
};
 
export const remove = async (idProduto) => {
  const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?', [idProduto]);
  return result.affectedRows > 0;
};