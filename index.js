const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.get('', (req,res)=>{
  res.send('<h1>Bienvenido a la API de sistema de ventas</h1>')
})
app.use('/api/', require('./routes/productos'))
app.use('/api/', require('./routes/sedes'))

app.set("port", process.env.port);
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});