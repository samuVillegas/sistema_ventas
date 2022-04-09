const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const path = require("path")
console.log(path.join(__dirname,"static"))



//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname,'static')))
//Routes
app.get('', (req,res)=>{
  res.sendFile(path.join(__dirname,"static/index.html"))
})
app.use('/api/', require('./routes/productos'))
app.use('/api/', require('./routes/sedes'))

app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});