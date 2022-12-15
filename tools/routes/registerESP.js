const express = require('express'); 
const app = express();
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const bodyParser = require('body-parser');

let MACAddress = [];

let beacondata = {};

const DBPATH = 'dbUser.db';

// Functions
const functions = require('../functions/crud');

var query_data = {
    table: '`beacons`',
    create_columns: '`Reg_Area`, `Name`, `Mac_Add`'
};

app.use(express.json()); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

router.post('/beacon', (req, res) => {
    texto = req.body;
    console.log(texto);
    console.log("Recebi um dado");
    res.send(texto);
    
    var db = new sqlite3.Database(DBPATH);
  
    db.all(functions.readNode(query_data['table'], '*'), [],  async (err, beacons ) => {

            if (err) {
                throw err;
            }
            console.log("Aqui");
            console.log(beacons);
            for (i in beacons) {
                MACAddress.push(beacons[i].MACAddress);
            };
          
            if (texto.MACAddress in MACAddress) {
                console.log("MACAddress já existe");
            } else {
                console.log("MACAddress não existe");
                db.run(functions.createNode(query_data['table'], query_data['create_columns'], 0  + ", '" + texto.name + "', '" + texto.MACAddress + "'"));
                console.log("MACAddress adicionado");
            }
            });
            
            console.log(MACAddress);

    db.close();
});

router.get('/beacon', (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi a requisição de dados");
  json = JSON.stringify(dados);
  res.send(json);
});


module.exports = router;