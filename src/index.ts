import cors from 'cors'
import express from 'express';
import multer from 'multer';

import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Multer config
const upload = multer({ dest: "uploads/" });

// Serve static assets
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single("upfile"), (req, res) => {
    const file = req.file

    if (!file) {
        return res.json({error: "No file provided"})
    }

    const response = {
        name: file.originalname,
        type: file.mimetype,
        size: file.size
    }

    return res.json(response)
})


app.listen(port, function () {
    console.log(
        '\x1b[36m %s\x1b[0m',
        `Your app is listening on port ${port}`
    );
});
