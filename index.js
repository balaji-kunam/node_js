const express = require('express');
const db = require('./db');
const demo = require('./mode');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
//post method
app.post('/putdata', async (req, res) => {
    const data = req.body;
    console.log(data)
  
    try {
      const newDemo = new demo(data);
      console.log(newDemo)
      const response=await newDemo.save();
      console.log(response)
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ error: 'Failed to save data' });
    }
  });
 //get method
  app.get('/getalldata', async(req, res) => {
     
    
    try {
     const getalldata= await demo.find()
     res.status(200).send(getalldata);
     
    } catch (err) {
      res.status(500).send({ error: 'Failed to save data' });
    }
  })
  //get by city
  app.get('/getalldat/:town', async (req, res) => {
    try {
      const getcity = req.params.town;
      console.log(getcity);
  
      const validCities = ['ongole', 'vijayawada', 'guntur', 'tenali', 'chirala'];
  
      if (validCities.includes(getcity)) {
        const getalldata1 = await demo.find({ city: getcity });
        console.log(getalldata1);
        res.status(200).send(getalldata1);
      } else {
        res.status(404).send({ error: 'Invalid city name' });
      }
    } catch (err) {
      res.status(500).send({ error: 'Failed to retrieve data' });
    }
  });
  
  //update method
  app.put('/put/:id', async (req, res) => {
    console.log("PUT is calling");
    
    try {
      const getid = req.params.id;
      console.log(getid);
      
      const getbalu = req.body;
      console.log(getbalu);
      
      // Using async/await to wait for the update operation to complete
      const putone = await demo.findByIdAndUpdate(getid, getbalu, { new: true });
      console.log(putone);
      
      if (putone) {
        res.status(200).send(putone);
      } else {
        res.status(404).send({ error: 'Document not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to update data' });
    }
  });
  //delete method
  app.delete('/deleteone/:id',async(req,res)=>{
    try {
      const deleteid=req.params.id;
      const delet = await demo.findByIdAndDelete(deleteid);
      res.status(200).send(delet);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to update data' });
    }
   

  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
