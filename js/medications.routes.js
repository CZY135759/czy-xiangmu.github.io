// medications.routes.js
const express = require('express');
const router = express.Router();
const db = require('../js/db');
// 获取所有药物
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM medications');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 获取低库存药物计数
router.get('/low-stock', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as count FROM medications WHERE stock_quantity < 10');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 添加新药物
router.post('/', async (req, res) => {
    const { name, type, dosage, stock_quantity, unit, supplier, last_restocked, expiry_date, price, notes } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO medications (name, type, dosage, stock_quantity, unit, supplier, last_restocked, expiry_date, price, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, type, dosage, stock_quantity, unit, supplier, last_restocked, expiry_date, price, notes]
        );
        res.status(201).json({ medication_id: result.insertId });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 更新药物信息
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, type, dosage, stock_quantity, unit, supplier, last_restocked, expiry_date, price, notes } = req.body;
    
    try {
        await db.query(
            'UPDATE medications SET name=?, type=?, dosage=?, stock_quantity=?, unit=?, supplier=?, last_restocked=?, expiry_date=?, price=?, notes=? WHERE medication_id=?',
            [name, type, dosage, stock_quantity, unit, supplier, last_restocked, expiry_date, price, notes, id]
        );
        res.json({ message: '药物信息更新成功' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 删除药物
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        await db.query('DELETE FROM medications WHERE medication_id = ?', [id]);
        res.json({ message: '药物记录已删除' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;