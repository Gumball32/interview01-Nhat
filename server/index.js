const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

const accountSid = 'AC349f9d3bf25598d5cb1bad3c1b23516e';
const authToken = '92f760de178998ba2e4b2025eda5c0ba'; 
const client = new twilio(accountSid, authToken);

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('DEMO PROJECT')
})

app.get('/send-phone', (req, res) => {

    const { phonenumber, accessCode } = req.query;

    client.messages.create({
        body: accessCode,
        to: '+' + phonenumber,
        from: '+17076570816'
    }).then((message) => console.log(message.body))
})

app.listen(4000, () => console.log("Running on Port 4000"))