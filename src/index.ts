import express from 'express';
import cors from 'cors'

import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(
        '\x1b[36m %s\x1b[0m',
        `Your app is listening on port ${port}`
    );
});
