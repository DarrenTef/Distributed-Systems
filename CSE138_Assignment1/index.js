// Credit: https://www.youtube.com/watch?v=-MTSQjw5DrM&ab_channel=Fireship
const express = require('express');
const app = express();
const port = 8090;

app.use(express.json());
app.get('/hello', (req, res) => {
    res.status(200).json({ message: 'world' });
});

app.post('/hello', (req, res) => {
    res.status(405).send('Method Not Allowed');
});

app.get('/hello/:name', (req, res) => {
    res.status(405).send('Method Not Allowed')
})

app.post('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.status(200).json({ message: `Hi, ${name}.` });
});

app.get('/test', (req, res) => {
    res.status(200).send({ message: "test is successful" });
});

app.post('/test', (req, res) => {
    const mesg = req.query.msg
    if (mesg) {
        res.status(200).json({ message: `${mesg}`});
    }
    else {
        res.status(400).send('Bad Request');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

