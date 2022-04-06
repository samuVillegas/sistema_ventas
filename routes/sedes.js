const { Router } = require("express");
const router = Router();
const connection = require('../db/db');

router.get('/sedes', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM sedes;');
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/sedes', async (req, res) => {
    try {
        //Forma 1
        const { nombre } = req.body;
        // await connection.query(`
        //     INSERT INTO sedes (nombre,calle,carrera,nomenclatura,barrio,ciudad,descripcion)
        //     VALUES ('${nombre}','${calle}','${carrera}','${nomenclatura}','${barrio}','${ciudad}','${descripcion}');
        // `)

        //Forma 2
        await connection.query(`
            INSERT INTO sedes (${Object.keys(req.body).join()})
            VALUES (?,?,?,?,?,?,?);
        `, Object.values(req.body));

        const [rows] = await connection.query(`SELECT * FROM sedes WHERE nombre='${nombre}';`);
        return res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.patch('/sedes/:id',async (req, res) => {
    try {
        const {id} = req.params;

        const fields = Object.keys(req.body);
        const fieldsQuery = fields.map(field => {
            if(typeof req.body[`${field}`] === 'string'){
                return `${field} = '${req.body[`${field}`]}'`
            }else{
                return `${field} = ${req.body[`${field}`]}`
            }
        })

        const result = await connection.query(`UPDATE sedes SET ${fieldsQuery.join()} WHERE id = ${id}`);
        const [rows] = await connection.query(`SELECT * FROM sedes WHERE id=${id};`);
        return res.status(200).json(rows);
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete('/sedes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await connection.query(`DELETE FROM sedes WHERE id = ${id};`);
        return res.status(200).json('Registro eliminado correctamente');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})




module.exports = router;