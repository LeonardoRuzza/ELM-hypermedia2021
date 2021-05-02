const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize(
  'postgres://postgres:fuckpg98@localhost:5432/test'
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
      isLatest: DataTypes.BOOLEAN
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
        shortDesc: DataTypes.TEXT,
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
  Employee.belongsTo(Area, {as: 'WorkIn', foreignKey: 'area_of_work_id',constraints: false})

  // Creating the 1 -> 1 association (IsResponsible) between Area and Employee
  Area.belongsTo(Employee, {as: 'IsResponsible', foreignKey: 'responsible_id', constraints: false}) // ForeignKey = ResponsibleID, is in the Area table
  //Employee.hasOne(Area, {constraints: false})



  // Creating the 1 -> N association (BelongsTo) between Area and Product
  Area.hasMany(Product, {as: 'BelongsTo', foreignKey: 'area_of_belonging_id', constraints: false}) // ForeignKey = AreaOfBelongingID, is in the Product table
  Product.belongsTo(Area, {as: 'BelongsTo', foreignKey: 'area_of_belonging_id', constraints: false})



  // Creating the 1 -> N association (Manage) between Employee and Product
  Employee.hasMany(Product, {as: 'Manage', foreignKey: 'manager_id', constraints: false}) // ForeignKey = ManagerID, is in the Product table
  Product.belongsTo(Employee, {as: 'Manage', foreignKey: 'manager_id', constraints: false})

  // Creating the N -> N association (Develop) between Employee and Product, using a bridge table (Develop) with 2 keys: employee_id and product_id
  Employee.belongsToMany(Product, { as: 'Develop', through: 'develop'});
  Product.belongsToMany(Employee, { as: 'IsDeveloped', through: 'develop'});
}


/**
 * Function to create and insert data in the database
 */
async function insertData(){
  const { News, Area, Employee, Product,Develop} = db._tables;

  /******** 15 News *********/
  const firstNews = await News.create({
    title: 'Machine Learning',
    content: 'ML content',
    introduction: 'ML introduction',
    image: 'https://www.meme-arsenal.com/memes/925f3e6e213ebe0bc196d379a7281ee8.jpg',
    isLatest: true
  })


  /******** 4 Areas *********/
  const Area1_PerformanceEngineering = await Area.create({
    name: 'Performance Engineering',
    description: 'Area1 description',
    shortDesc: 'Area1 short description',
    image: '...'
  })
  const Area2_Analytics = await Area.create({
    name: 'Analytics',
    description: 'Area2 description',
    shortDesc: 'Area2 short description',
    image: '...'
  })
  const Area3_Security = await Area.create({
    name: 'Security',
    description: 'Area3 description',
    shortDesc: 'Area3 short description',
    image: '...'
  })
  const Area4_IoT = await Area.create({
    name: 'Internet of Things',
    description: 'Area4 description',
    shortDesc: 'Area4 short description',
    image: '...'
  })
  const Area5_Ml = await Area.create({
    name: 'Machine Learning',
    description: 'Area5 description',
    shortDesc: 'Area5 short description',
    image:'...'
  })

  /******** 20 Employees *********/
  const firstEmployee = await Employee.create({
    name: 'Employee1 name',
    surname: 'Employee1 surname',
    role: 'Employee1 role',
    email: 'Employee1 mail',
    image: '...'
  })

  const secondEmployee = await Employee.create({
    name: 'Employee2 name',
    surname: 'Employee2 surname',
    role: 'Employee2 role',
    email: 'Employee2 mail',
    image: '...'
  })

  /******** 30 Products *********/
  const firstProduct = await Product.create({
    name: 'Product1',
    description: 'Product1 description',
    isTop: true,
    image: '...',
  })

  const secondProduct = await Product.create({
    name: 'Product2',
    description: 'Product2 description',
    isTop: false,
    image: '...',
  })



  await Area1_PerformanceEngineering.addWorkIn(firstEmployee) // Employee work in area
  await Area2_Analytics.addWorkIn(secondEmployee)
  await Area1_PerformanceEngineering.setIsResponsible(firstEmployee) // Add Responsible to the area
  await Area2_Analytics.setIsResponsible(secondEmployee)
  
  await Area2_Analytics.addBelongsTo(firstProduct) // Add product to the area
  await Area2_Analytics.addBelongsTo(secondProduct) 

  await firstEmployee.addManage(firstProduct) // Add product to the managed ones by employee
  await firstEmployee.addManage(secondProduct) 

  await firstEmployee.addDevelop(firstProduct) // Add product to the developed ones by employee
  await firstEmployee.addDevelop(secondProduct) 

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
