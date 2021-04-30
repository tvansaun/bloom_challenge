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

app.post('/inventory/update', (req, res) => {
	console.log(req.body);
	//Yes, I've been spelling "quantity" wrong this whole time
	for(let i = 0; i < Object.keys(req.body).length; i++){
		const sql = 'UPDATE inventory SET quanity = quanity - 1 WHERE id=?';
		db.run(sql, req.body.id[0], (err) => {
			if(err){
				return console.log(err.message);
			}
			console.log("Inventory item updated");
		});
	}

});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});