const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    meta : {
        lastUpdate : {
            type : Date,
            default : Date.now
        }
    },
    resourceType : {
        type : String,
        default : "Patient",
    },
    identifier : {
        type : {
            type : String,
            default : "Medical Record"
        },
        value : {
            type : String,
            unique : true,
            minlength : 6,
            maxlength : 8,
            required : [true, "Nomor Rekam Medis Tidak Boleh Kosong"],
        },
    },
    name : { 
        given : {
            type : String,
            maxlength : 80,
            required:  [true, "Nama Pasien Tidak Boleh Kosong"]
        }
    },
    telecom : { 
        value : {type : String},
        use : {type : String}
    },
    gender : {
        type : mongoose.Schema.Types.Mixed,
        required : true,
        enum : {
            values:  ["Tidak/Belum Sekolah", "TK/Belum Tamat SD/Sederajat", "SD/Sederajat", "SLTP/Sederajat", "SLTA/Sederakat", "Diploma I/II/III", "Diploma IV/Strata I", "Strata II/Strata III"],
            message: "Isi Pendidikan Terakhir dengan Benar"
          }
    },
    birthDate : {
        type : Date,
        required : true
    },
    address : {
        alamat : {
            type : String,
            required : true
        },
        kelurahan : {
            type : mongoose.Schema.Types.Mixed,
        },
        kecamatan : {
            type : mongoose.Schema.Types.Mixed,
        },
        kabupaten : {
            type : mongoose.Schema.Types.Mixed,
        },
        provinsi : {
            type : mongoose.Schema.Types.Mixed,
        },
        kodePos : {
            type : String,
        },
    },
    martialStatus : {
        type : String,
        required : true,
        enum : {
            values : ["Belum Kawin","Kawin","Cerai Hidup","Cerai Mati"],
            message : "Isi Status Pernikahan dengan Benar"
        }
    },
    contact : {
        relationship : {
            type : String,
            // required : true
        },
        name : { 
            given : {
                type : String,
                maxlength : 80,
                required:  [true, "Nama Pasien Tidak Boleh Kosong"]
            }
        },
        telecom : {
            value : {
                type : String,
                required : true
            },
            use : {type : String}
            },
        address : {
            alamat : {
                type : String,
                required : true
            },
            kelurahan : {
                type : mongoose.Schema.Types.Mixed,
            },
            kecamatan : {
                type : mongoose.Schema.Types.Mixed,
            },
            kabupaten : {
                type : mongoose.Schema.Types.Mixed,
            },
            provinsi : {
                type : mongoose.Schema.Types.Mixed,
            },
            kodePos : {
                type : String,
            },
        },
    },
    generalPractitioner : {
        type : String,
        required : true
    },
    managingOrganization : {
        type : String,
        required : true
    },
})



module.exports = mongoose.model('Registrasi', patientSchema);