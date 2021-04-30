const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize(
  'postgres://postgres:Sql1080@localhost:5432/test'
)  
// Production
/*  const pg = require('pg')
pg.defaults.ssl = true
const db = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
}) */


/**
 * Function to define the structure of the database
 */

/*********** Tables *///////////////////
function defineDatabaseStructure() {
  const News = db.define(
    'news',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      introduction: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )
  const Area = db.define(
      'area',
      {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
      },
      {
        underscored: true,
      }
  )
  const Employee = db.define(
    'employee',
    {
      name: DataTypes.STRING,
      surname: DataTypes.TEXT,
      role: DataTypes.TEXT,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )
  const Product = db.define(
    'product',
    {
       name: DataTypes.STRING,
       description: DataTypes.TEXT,
       isTop: DataTypes.BOOLEAN,
       image: DataTypes.STRING,
    },
    {
        underscored: true,
    }
  )
  const Develop = db.define(
    'develop',
    {
      employeeId:{
        type: DataTypes.INTEGER,
        references: {
          model: Employee,
          key: 'id'
        }
      },
      productId:{
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: 'id'
        }

      }

    },
    {
      underscored: true,
    }
  )

  db._tables = {
    News,
    Area,
    Employee,
    Product,
    Develop
  }

/*********** Relationship *///////////////////

  // A.belongsTo(B) // Foreign key is placed in source model: A

  // A.hasOne(B) // Foreign key is placed in target model: B
  // A.hasMany(B) 


  // Creating the 1 -> N association (WorkIn) between Area and Employee
  Area.hasMany(Employee, { as: 'WorkIn', foreignKey: 'area_of_work_id', constraints: false }) // ForeignKey = AreaOfWorkID is in the Employee table
  //Employee.belongsTo(Area, {constraints: false})

  // Creating the 1 -> 1 association (IsResponsible) between Area and Employee
  Area.belongsTo(Employee, {as: 'IsResponsible', foreignKey: 'responsible_id', constraints: false}) // ForeignKey = ResponsibleID, is in the Area table
  //Employee.hasOne(Area, {constraints: false})



  // Creating the 1 -> N association (BelongsTo) between Area and Product
  Area.hasMany(Product, {as: 'BelongsTo', foreignKey: 'area_of_belonging_id'}) // ForeignKey = AreaOfBelongingID, is in the Product table
  //Product.belongsTo(Area)



  // Creating the 1 -> N association (Manage) between Employee and Product
  Employee.hasMany(Product, {as: 'Manage', foreignKey: 'manager_id'}) // ForeignKey = ManagerID, is in the Product table
  //Product.belongsTo(Employee)

  // Creating the N -> N association (Develop) between Employee and Product, using a bridge table (Develop) with 2 keys: employee_id and product_id
  Employee.belongsToMany(Product, { as: 'Develop', through: 'develop'});
  Product.belongsToMany(Employee, { as: 'IsDeveloped', through: 'develop'});
}


/**
 * Function to insert data in the database
 */
async function insertData(){
  const { News, Area, Employee, Product,Develop} = db._tables;

  const firstNews = await News.create({
    title: 'Machine Learning',
    content: 'ML content',
    introduction: 'ML introduction',
    image: 'https://www.meme-arsenal.com/memes/925f3e6e213ebe0bc196d379a7281ee8.jpg'
  })

  const firstArea = await Area.create({
    name: 'Area1',
    description: 'Area1 description',
    image: '...'
  })

  const firstEmployee = await Employee.create({
    name: 'Employee1 name',
    surname: 'Employee1 surname',
    role: 'Employee1 role',
    email: 'Employee1 mail',
    image: '...'
  })

  const firstProduct = await Product.create({
    name: 'Product1',
    description: 'Product1 description',
    isTop: true,
    image: '...',

  })

  await firstArea.addWorkIn(firstEmployee) // Employee work in area
  await firstArea.setIsResponsible(firstEmployee) // Add Responsible to the area
  
  await firstArea.addBelongsTo(firstProduct) // Add product to the area

  await firstEmployee.addManage(firstProduct) // Add product to the managed ones by employee

  await firstEmployee.addDevelop(firstProduct) // Add product to the developed ones by employee
}











/**
 * Function to initialize the database. This is exported and called in the main api.js file
 */
 async function initializeDatabase() {
  // Call the function for the database structure definition
  defineDatabaseStructure()
  // Synchronize Sequelize with the actual database
  await db.sync({ force: true })
  // Call the function to insert some fake data
  await insertData()
  return db
}

export default initializeDatabase
