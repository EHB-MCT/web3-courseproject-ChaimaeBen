const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const app = express();
var cors = require('cors');

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
 
        console.log(fileStr);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('listening on '+ port);
});
// create a GET route
app.get('/', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //L