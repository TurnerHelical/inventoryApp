const pool = require('./pool.js');

async function getAllApples() {
    const {rows} = await pool.query('SELECT * FROM appletree ORDER BY id ASC');
    return rows
};

async function getAppleById(id) {
    const {rows} = await pool.query('SELECT * FROM appletree WHERE id = $1',[id]);
    return rows
};

async function updateApple(data) {
    await pool.query(`
        UPDATE appletree
        SET name = $1, nickname = $2, country_of_origin = $3, quantity = $4, image_link = $5, notes = $6 color = $7, avg_price = $8
        WHERE id = $9
        `,[data.name, data.nickname, data.country, data.quantity, data.image_link, data.notes, data.color, data.avgPrice, data.id]);
};

async function newApple(data) {
    await pool.query(`
        INSERT INTO appletree (name, nickname, country_of_origin, quantity, image_link, notes, color, avg_price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[data.name, data.nickname, data.country, data.quantity, data.image_link, data.notes, data.color, data.avgPrice]);
};

async function deleteApple(id) {
    await pool.query(`DELETE FROM appletree WHERE id = $1`,[id]);
};

module.exports = { getAllApples, getAppleById, updateApple, newApple, deleteApple };