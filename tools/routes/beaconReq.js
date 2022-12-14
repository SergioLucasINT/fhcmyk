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
    table: '`areas`',
    insert_columns: '`Name`, `Width`, `Length`'
};

router.get('/', (req, res) => {
    
  var db = new sqlite3.Database(DBPATH);

  db.all(functions.readNode(query_data['table'], '*'), [],  (err, users ) => {
		if (err) {
		    throw err;
		}
		console.log(users);
        res.render('pages/beaconedit1', {users: users});
	});
 db.close();

});

router.get('/step2', (req, res) => {
    
    var db = new sqlite3.Database(DBPATH);
  
    db.all(functions.readNode(query_data['table'], '*'), [],  (err, users ) => {
          if (err) {
              throw err;
          }
          console.log(users);
          res.render('pages/beaconedit2', {users: users});
      });
   db.close();
  
});

router.get('/step3', (req, res) => {
    
    var db = new sqlite3.Database(DBPATH);
  
    db.all(functions.readNode(query_data['table'], '*'), [],  (err, users ) => {
          if (err) {
              throw err;
          }
          console.log(users);
          res.render('pages/beaconedit3', {users: users});
      });
   db.close();
  
});

router.get('/step4', (req, res) => {
    
    var db = new sqlite3.Database(DBPATH);
  
    db.all(functions.readNode(query_data['table'], '*'), [],  (err, users ) => {
          if (err) {
              throw err;
          }
          console.log(users);
          res.render('pages/beaconedit4', {users: users});
      });
   db.close();
  
});

router.get('/step5', (req, res) => {
    
  var db = new sqlite3.Database(DBPATH);

  db.all(functions.readNode(query_data['table'], '*'), [],  (err, users ) => {
        if (err) {
            throw err;
        }
        console.log(users);
        res.render('pages/beaconedit5', {users: users});
    });
 db.close();

});


router.post('/submit', (req, res) => {
    var db = new sqlite3.Database(DBPATH);
}); 


module.exports = router;