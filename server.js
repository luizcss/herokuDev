const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/cadastro-recadastro/'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/cadastro-recadastro/index.html');
});

app.listen(process.env.PORT || 4100);
