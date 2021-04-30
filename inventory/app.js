const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3');

const port = 4000;

app.use(cors({
	origin: 'http://localhost:3000'
}));

let db = new sqlite3.Database('./data/inventory.sqlite3', (err) => {
	if(err){
		console.error(err.message);
	}

	console.log('Connected to inventory database');
});

app.get('/inventory/', (req, res) => {
	const sql = 'SELECT * FROM inventory;';
	db.all(sql, (err, ret) =>{
		if(err){
			console.log(err);
		}
		res.json(ret);
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});