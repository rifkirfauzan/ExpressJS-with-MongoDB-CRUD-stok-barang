
const mongoose = require("mongoose");



const stokScheme = new mongoose.Schema({
    nama_barang:{
        //Buat sebuah type dari field nama yang berada di sebuah tabel karyawan
        type:String,
        required:true,
    },
    jenis_barang:{
        type:String,
        required:true,
    },
    harga_satuan:{
        type:Number,
        required:true, 
    },
    jumlah_barang:{
        type:Number,
        required:true, 
    }
})


module.exports = mongoose.model("Stok", stokScheme);

