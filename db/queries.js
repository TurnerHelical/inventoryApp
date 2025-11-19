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
    const query = `
        UPDATE appletree
        SET name = $1,
            nickname = $2,
            country_of_origin = $3,
            image_link = $4,
            notes = $5,
            color = $6,
            avg_price = $7
        WHERE id = $8
    `;
    const values = [
        data.name,
        data.nickname,
        data.origin,
        data.image_link,
        data.notes,
        data.color,
        data.avgPrice,
        data.id,
    ];
    await pool.query(query, values);
};

async function newApple(data) {
    const query = `
        INSERT INTO appletree (name, nickname, country_of_origin, image_link, notes, color, avg_price)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`;
         
    const values = [data.name, data.nickname, data.origin, data.image_link, data.notes, data.color, data.avgPrice];

    await pool.query(query, values);
};

async function deleteApple(id) {
    await pool.query(`DELETE FROM appletree WHERE id = $1`,[id]);
};

module.exports = { getAllApples, getAppleById, updateApple, newApple, deleteApple };
