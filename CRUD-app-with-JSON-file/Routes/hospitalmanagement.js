const express = require("express")
const hospitalRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/hospital.json' 

// util functions 

const saveHospitalData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getHospitalData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


// reading the data
hospitalRoutes.get('/hospitalmanagement', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  hospitalRoutes.post('/hospitalmanagement/addhospital', (req, res) => {
   
    var existHospitals = getHospitalData()
    const newHospitalId = Math.floor(100000 + Math.random() * 900000)
   
    existHospitals[newHospitalId] = req.body
     
    console.log(existHospitals);

    saveHospitalData(existHospitals);
    res.send({success: true, msg: 'hospital data added successfully'})
})

// Read - get all hospital from the json file
hospitalRoutes.get('/hospitalmanagement/list', (req, res) => {
  const hospitals = getHospitalData()
  res.send(hospitals)
})

// Update - using Put method
hospitalRoutes.put('/hospitalmanagement/:id', (req, res) => {
   var existHospitals = getHospitalData()
   fs.readFile(dataPath, 'utf8', (err, data) => {
    const hospitalId = req.params['id'];
    existHospitals[hospitalId] = req.body;

    saveHospitalData(existHospitals);
    res.send(`hospitals with id ${hospitalId} has been updated`)
  }, true);
});

//delete - using delete method
hospitalRoutes.delete('/hospitalmanagement/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existHospitals = getHospitalData()

    const userId = req.params['id'];

    delete existHospitals[userId];  
    saveHospitalData(existHospitals);
    res.send(`hospitals with id ${userId} has been deleted`)
  }, true);
})
module.exports = hospitalRoutes