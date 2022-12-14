const express = require('express'); 
const app = express();
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const bodyParser = require('body-parser');


const DBPATH = 'dbUser.db';

// Functions
const functions = require('../functions/crud');

app.use(express.json()); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var query_data = {
    table: '`login_auth`',
    insert_columns: '`funcid`, `password`',
    insert_columns2: '`funcid`, `password`, `user_creation_token`',
    refresh_update: '`refresh_token`'
};

router.get('/', (req, res) => {
  var db = new sqlite3.Database(DBPATH);

  db.all(functions.readNode(query_data['table'], '*'), [],  (err, users ) => {
		if (err) {
		    throw err;
		}
		console.log(users);
        res.render('pages/dashboard', {users: users});
	});
 db.close();

});


module.exports = router;