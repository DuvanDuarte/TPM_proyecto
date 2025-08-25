const express = require("express")
const app = express()
const routes = require('./api/endPoints')
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
}))

app.use('/', routes);

const port = 5000
app.listen(port, () => {
    console.log('Server started on port', port);
})

app.use(express.json());