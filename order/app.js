const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const port = 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

let db = new sqlite3.Database('./data/order.sqlite3', (err) => {
	if(err){
		console.error(err.message);
	}

	console.log('Connected to order database');
});


app.get('/order/', (req, res) => {
	const sql = 'SELECT * FROM [order];';
	db.all(sql, (err, ret) =>{
		if(err){
			console.log(err);
		}
		res.json(ret);
	});
});

app.post('/order/', (req, res) => {
	let order = [req.body.items, req.body.total_price];
	const sql = `INSERT INTO [order](items, total_price) VALUES(?, ?);`;

	db.run(sql, order, (err) => {
		if(err){
			return console.log(err.message);
		}
		console.log("Order success");
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

