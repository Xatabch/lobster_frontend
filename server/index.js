const path = require('path');
const express = require('express');
const app = express();
const port = 8001;

app.use(express.static('./build/'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build/index.html'));
})

app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`)
});