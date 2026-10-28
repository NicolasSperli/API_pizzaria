//src/services/produtoService.js
import db from '../db/db.js';
import bcrypt from 'bcrypt';
 
export const findAll = async (idPedido, formaPagamento, statusPedido, cpf,) => {
  let sql = 'SELECT * FROM pedido';
  const conditions = [];
  const values = [];
 
  if (formaPagamento) {
    conditions.push('valor = ?');
    values.push(formaPagamento);
  }
 
  if (statusPedido) {
    conditions.push('valor = ?');
    values.push(statusPedido);
  
  }
 
  if (idPedido) {
    conditions.push('idPedido = ?');
    values.push(idPedido);
  }
 
  if (cpf) {
    conditions.push('tipo = ?');
    values.push(cpf);
  }
 
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
 
  const [rows] = await db.query(sql, values);
  return rows;
 
};
 
export const create = async (newPedido) => {
 
  await db.query('INSERT INTO pedido SET ?', newPedido);
 
  return newPedido;
};
 
export const update = async (idPedido, newPedido) => {
 
  const [result] = await db.query('UPDATE pedido SET ? WHERE idPedido = ?', [newPedido, idPedido]);
  return result.affectedRows > 0;
};
 
export const remove = async (idPedido) => {
  const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
  return result.affectedRows > 0;
};