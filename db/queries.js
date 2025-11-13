const pool = require('./pool.js');

async function getAllApples() {
    const {rows} = await pool.query('SELECT * FROM appletree');
    return rows
};

async function getAppleById(id) {
    const {rows} = await pool.query(`SELECT * FROM appletree WHERE id = ${id}`);
    return rows
};

async function updateApple(data) {
    await pool.query(`
        UPDATE appletree
        SET name = $1, nickname = $2, country_of_origin = $3, quantity = $4, best_month = $5, image_link = $6, color = $7, price = $8
        WHERE id = $9
        `,[data.name, data.nickname, data.country, data.quantity, data.best_month, data.image_link, data.color, data.price, data.id]);
};

async function newApple(data) {
    await pool.query(`
        INSERT INTO appletree (name, nickname, country_of_origin, quantity, best_month, color, price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[data.name, data.nickname, data.country, data.quantity, data.best_month, data.image_link, data.color, data.price]);
};

async function deleteApple(id) {
    await pool.query(`DELETE FROM appletree WHERE id = $1`,[id]);
};

module.exports = { getAllApples, getAppleById, updateApple, newApple, deleteApple };