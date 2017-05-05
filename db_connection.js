function main_db() {
    var mysql = require("mysql");

    var connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"diary_app"
    });

    connection.connect((err) => {
        if(err) {alert(err.stack);
            return console.log(err.stack);
        }  
        log.info("succesfull connection to db");
    });
    
    
    connection.query("SELECT * FROM user WHERE id_user = 1", function(err, rows){
      if(err) alert(err.stack);
      alert("query result: \n" + rows);
    });

    connection.end(() => {
        alert("connection closed succesfull");
    });
}

main_db();