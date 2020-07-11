const Patient = require('./patientModel.js');
const kodeWilayah = require ('../validasi/validasiKodeWilayah.js');
const kodeNegara = require('../validasi/validasiKodeNegara.js');
const dataWilayah = require('../validasi/kodeWilayah.js');
const dataNegara = require('../validasi/kodeNegara.js')
const mongoose = require ('mongoose');

// POST Method, Create and Save a New Patient's Data
exports.new = function (req, res) {
    const patient = new Patient();
    patient.identifier.value = req.body.identifier.value;
    patient.name = req.body.name;
    patient.telecome = req.body.telecome;
    patient.gender = req.body.gender;
    patient.birthDate = req.body.birthDate;
    patient.address.alamat = req.body.address.alamat;
    patient.address.kelurahan = kodeWilayah.isItemInArray(dataWilayah.array, req.body.address.kelurahan);
    patient.address.kecamatan = kodeWilayah.isItemInArray(dataWilayah.array, req.body.address.kecamatan);
    patient.address.kabupaten= kodeWilayah.isItemInArray(dataWilayah.array, req.body.address.kabupaten);
    patient.address.provinsi = kodeWilayah.isItemInArray(dataWilayah.array, req.body.address.provinsi);
    patient.address.kodePos = req.body.address.kodePos;
    patient.martialStatus = req.body.martialStatus;
    patient.contact = req.body.contact;
    patient.contact.address.alamat = req.body.contact.address.alamat;
    patient.contact.address.kelurahan = kodeWilayah.isItemInArray(dataWilayah.array, req.body.contact.address.kelurahan);
    patient.contact.address.kecamatan = kodeWilayah.isItemInArray(dataWilayah.array, req.body.contact.address.kecamatan);
    patient.contact.address.kabupaten= kodeWilayah.isItemInArray(dataWilayah.array, req.body.contact.address.kabupaten);
    patient.contact.address.provinsi = kodeWilayah.isItemInArray(dataWilayah.array, req.body.contact.address.provinsi);
    patient.contact.address.kodePos = req.body.contact.address.kodePos;
    patient.generalPractitioner = req.body.generalPractitioner;
    patient.managingOrganization = req.body.managingOrganization;
    patient._id = mongoose.Types.ObjectId();


    // Save and validate
    patient.save()
    .then(patient=> {
        return res.status(200).json({
        message :'Data Berhasil Disimpan',
        data : patient,
        request : {
            type : 'POST DATA',
            url : 'http://localhost:4000/restapi/patients/'+ patient.identifier.value
            }
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });
    
};


// GET Method, Find Data by Id
exports.view = function (req, res) {
if(!req.query.identifier){
    Patient.find()
    .then(patients => {
        const respon = {
            count : patients.length,
            data : patients 
        };
        return res.status(200).json(respon);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error :err});
    });
}
else {
    Patient.findOne({'identifier.value':req.query.identifier})  
    .then(patient=> {
        if(!patient) {
                return res.status(404).json({
                message: "Petient dengan id '" + req.query.identifier + "' tidak ditemukan"
            });
        }
        return res.status(200).json({
                    data : patient,
                    request : {
                        type : 'GET SPECIFIC DATA',
                        url : 'http://localhost:4000/restapi/patients/'+ req.query.identifier
                        }
            });
        
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error :err});
    });
    };
}
// DELETE Method, delete data by Id
exports.delete = function (req, res) {
    // Patient.findByIdAndDelete(req.params.patient_id)
    Patient.findOneAndDelete({'identifier.value':req.query.identifier})
    .then(patient => {
        if(!patient) {
                return res.status(404).send({
                message: "Pasien dengan id '" + req.query.identifier + "' tidak ditemukan"
            });
        };
    return res.status(200).json({
        message: "Data pasien telah berhasil dihapus!",
        data : patient,
        request : {
            type : 'POST untuk menyimpan kembali',
            url : 'http://localhost:4000/restapi/patients/'
        }
        });
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error :err});
    });
   };

//UPDATE METHOD
exports.update = function (req,res) {
    const id = req.query.identifier;
    const updatePatient ={};
    for (const ops of req.body){
        updatePatient[ops.propName] = ops.value;
    }
	// const body = _.pick(req.body, ['nama','email','gender','usia']);
    Patient.update({'identifier.value':id},{$set:updatePatient})
    .then(patient=>{
        if(patient.n===0) {
            return res.status(404).send({
            message: "Pasien tidak ditemukan"
        });
        };
        return res.status(200).json({
            message : 'Update data berhasil',
            data : patient,
            updated : updatePatient,
            request : {
                type : 'GET data untuk menampilkan',
                url : 'http://localhost:4000/restapi/patients/'+ req.query.identifier
            }
        });
    })
    .catch (err => {
        res.status(500).json ({error :err})
    });
};