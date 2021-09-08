const Stok = require("../models/Stok");
module.exports = {
    viewStok: async (req,res) => {
        try{
            const stok = await Stok.find();
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { message: alertMessage, status: alertStatus};
            res.render("index", {
                stok,
                alert,
                title: "Aplikasi stok barang",
            });
        }catch (error){
            res.redirect("/stok");
        }
    },
    addStok: async (req, res) => {
        try {
            const { nama_barang, jenis_barang, harga_satuan, jumlah_barang } = req.body;
            await Stok.create({ nama_barang, jenis_barang, harga_satuan, jumlah_barang });
            req.flash("alertMessage", "Data Barang berhasil ditambahkan");
            req.flash("alertStatus", "success");
            res.redirect("/stok"); 
        }catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/stok");
        }
    },
    editStok: async (req, res) => {
        try {
            const { id, nama_barang, jenis_barang, harga_satuan, jumlah_barang } = req.body;
            const stok = await Stok.findOne({ _id: id });
            stok.nama_barang = nama_barang;
            stok.jenis_barang = jenis_barang;
            stok.harga_satuan = harga_satuan;
            stok.jumlah_barang = jumlah_barang;
            await stok.save();
            req.flash("alertMessage", "Data barang berhasil diedit");
            req.flash("alertStatus", "success");
            res.redirect("/stok");
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/stok");
        }
    },
    
    deleteStok: async (req, res) => {
        try {
            const { id } = req.params;
            const stok = await Stok.findOne({ _id: id });
            await stok.remove();
            req.flash("alertMessage", "Data barang berhasil dihapus");
            req.flash("alertStatus", "warning");
            res.redirect("/stok");
        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/stok");
        }
    },
    
    
}