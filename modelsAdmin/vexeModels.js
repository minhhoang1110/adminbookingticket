'user strict';
var sql = require('./db.js');

//Task object constructor
var VeXe = function(vexe){
    console.log(vexe);
    this.MaVeXe = vexe.MaVeXe;
    this.MaCX = vexe.MaCX;
    this.SoGhe = vexe.SoGhe;
};
VeXe.getAllVeXe = function getAllVeXe(result) {
    sql.query("Select * from vexe", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
         //   console.log('Ben Xe : ', res);

            result(null, res);
        }
    });
};
module.exports= VeXe;