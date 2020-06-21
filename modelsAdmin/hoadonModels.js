'user strict';
var sql = require('./db.js');

//Task object constructor
var HoaDon = function(hoadon){
    console.log(hoadon);
    this.MaVeXe = hoadon.MaVeXe;
    this.Email = hoadon.Email;
	this.NgayDat = hoadon.NgayDat;
};
HoaDon.getAllHoaDon = function getAllHoaDon(result) {
    sql.query("Select * from hoadon", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           // console.log('Ben Xe : ', res);

            result(null, res);
        }
    });
};
module.exports= HoaDon;