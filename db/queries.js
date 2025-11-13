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
        SET name = $1, nickname = $2, country_of_origin = $3, quantity = $4, image_link = $5, color = $6, price = $7
        WHERE id = $8
        `,[data.name, data.nickname, data.country, data.quantity, data.image_link, data.color, data.price, data.id]);
};

async function newApple(data) {
    await pool.query(`
        INSERT INTO appletree (name, nickname, country_of_origin, quantity, color, price)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,[data.name, data.nickname, data.country, data.quantity, data.image_link, data.color, data.price]);
};

async function deleteApple(id) {
    await pool.query(`DELETE FROM appletree WHERE id = $1`,[id]);
};

module.exports = { getAllApples, getAppleById, updateApple, newApple, deleteApple };