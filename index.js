const express = require('express')
const app = express()
const port = 3000
app.use(express.json())


const Sequelize = require("sequelize");

const sequelize = new Sequelize("Pops", "postgres", "alexey03042001A", {
  dialect: "postgres",
  host: "localhost"
});

const Popsiks = sequelize.define("popsiks", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    
  },
  title: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: false,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  timestamps: false
});

app.post("/create",(req,res)=>
{
  Popsiks.create({

    title:  req.body.title,
    description:  req.body.description
    
  }).then(res=>{
    const user = {id: res.id, title: res.title, description: res.description}
    console.log(user);
  }).catch(err=>console.log(err));
})

app.get("/read",(req,res)=>
{
  Popsiks.findAll({raw:true}).then(pops=>{
    res.status(200).json(
      {
          pops
      })
  }).catch(err=>console.log(err));
})

app.put("/update",(req,res)=>
{
  
  title1 =  req.body.title;
  description1 = req.body.description;

  Popsiks.update({ description: description1 }, {
    where: {
      title: title1
    }
  }).then((res) => {
    console.log(res);
  });
})

app.delete("/delete",(req,res)=>
{
  title1 =  req.body.title;
  Popsiks.destroy({
    where: {
      title: title1
    }
  }).then((res) => {
    console.log(res);
  });
})





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })