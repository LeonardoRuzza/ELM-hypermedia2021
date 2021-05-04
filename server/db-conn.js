const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize('postgres://postgres:Sql1080@localhost:5432/test') //////////////////
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

/*********** Tables */ function defineDatabaseStructure() {
  const News = db.define(
    'news',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      introduction: DataTypes.TEXT,
      image: DataTypes.STRING,
      isLatest: DataTypes.BOOLEAN,
    },
    {
      underscored: true,
    }
  )
  const Reviews = db.define(
    'reviews',
    {
      author: DataTypes.STRING,
      role: DataTypes.STRING,
      content: DataTypes.TEXT,
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
      employeeId: {
        type: DataTypes.INTEGER,
        references: {
          model: Employee,
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: 'id',
        },
      },
    },
    {
      underscored: true,
    }
  )

  db._tables = {
    News,
    Reviews,
    Area,
    Employee,
    Product,
    Develop,
  } ////////////////// // A.belongsTo(B) // Foreign key is placed in source model: A // A.hasOne(B) // Foreign key is placed in target model: B

  /*********** Relationship */ // A.hasMany(B)

  // Creating the 1 -> N association (WorkIn) between Area and Employee
  Area.hasMany(Employee, {
    as: 'WorkIn',
    foreignKey: 'area_of_work_id',
    constraints: false,
  }) // ForeignKey = AreaOfWorkID is in the Employee table
  Employee.belongsTo(Area, {
    as: 'WorkIn',
    foreignKey: 'area_of_work_id',
    constraints: false,
  })

  // Creating the 1 -> 1 association (IsResponsible) between Area and Employee
  Area.belongsTo(Employee, {
    as: 'IsResponsible',
    foreignKey: 'responsible_id',
    constraints: false,
  }) // ForeignKey = ResponsibleID, is in the Area table
  //Employee.hasOne(Area, {constraints: false})

  // Creating the 1 -> N association (BelongsTo) between Area and Product
  Area.hasMany(Product, {
    as: 'BelongsTo',
    foreignKey: 'area_of_belonging_id',
    constraints: false,
  }) // ForeignKey = AreaOfBelongingID, is in the Product table
  Product.belongsTo(Area, {
    as: 'BelongsTo',
    foreignKey: 'area_of_belonging_id',
    constraints: false,
  })

  // Creating the 1 -> N association (Manage) between Employee and Product
  Employee.hasMany(Product, {
    as: 'Manage',
    foreignKey: 'manager_id',
    constraints: false,
  }) // ForeignKey = ManagerID, is in the Product table
  Product.belongsTo(Employee, {
    as: 'Manage',
    foreignKey: 'manager_id',
    constraints: false,
  })

  // Creating the N -> N association (Develop) between Employee and Product, using a bridge table (Develop) with 2 keys: employee_id and product_id
  Employee.belongsToMany(Product, { as: 'Develop', through: 'develop' })
  Product.belongsToMany(Employee, { as: 'IsDeveloped', through: 'develop' })
}

/**
 * Function to create and insert data in the database
 */
async function insertData() {
  const { News, Reviews, Area, Employee, Product, Develop } = db._tables

  /******** 15 News *********/
  const firstNews = await News.create({
    title:
      'ELM is Recognized by Dynatrace as Intelligent Observability Competency Partner',
    content:
      'The Intelligent Observability Competency badge recognizes those, among partners, that have demonstrated a proven track record of contribution to enterprise digital transformation using the Dynatrace Software Intelligence Platform. ELM received this award as a sign of recognition of our commitment and as a measure of the level of expertise we earned in the market, helping customers extract maximum value from their Dynatrace investment. ELM, a Dynatrace Advanced Partner, is the first in Southern Europe to receive the Intelligent Observability Competency badge. The status recognizes ELM’s leadership and proficiency in implementing Intelligent Observability solutions based on Dynatrace, the 11-times-in-a-row leader in the Gartner Magic Quadrant for APM. In looking forward to what comes next, the ELM Performance Engineering team thanks Dynatrace for this acknowledgment, as further demonstration of the two companies’ successful and productive relationship.',
    introduction:
      'We are glad to announce that ELM, the international technology consulting and software group specialized in performance engineering, security, analytics and IoT, has been awarded with the Intelligent Observability Competency Partner status, as part of the newly created Dynatrace Cloud Partner Competency Program.',
    image: '...',
    isLatest: true,
  })
  const secondNews = await News.create({
    title:
      'Akamas and ALTERSIS Performance Announce New Partnership to Accelerate EMEA Adoption of AI-Driven Performance Optimization Solution',
    content:
      'Milan, Italy and Basel, Switzerland – April 27, 2021 – Today, Akamas, maker of the first AI-powered performance optimization solution for enterprise IT stacks, and ALTERSIS Performance, a leading provider and pioneer of IT performance engineering and consulting services, announced a strategic commercial partnership. ALTERSIS Performance offers IT performance consulting services in the areas of APM, performance testing and quality assurance for a range of corporate customers in key European markets such as Germany, Switzerland, and France. For more than 18 years, ALTERSIS Performance has been assisting customers in designing and implementing performance and APM engineering solutions in test, production and development while leveraging innovative and value-add technologies. Launched in 2019, Akamas has quickly established itself as a leading AI-powered performance optimization solution. Akamas fundamentally changes how IT users approach the tradeoffs between application performance and costs. Thanks to its technology-agnostic, full-stack approach and its AI’s ability to rapidly converge to optimal IT configurations, Akamas helps organizations meet performance goals at a speed that no manual tuning can achieve. As part of the partnership, ALTERSIS Performance will promote the Akamas solutions to its customers and support them with its implementation and operation. At the same time, ALTERSIS Performance and Akamas will work together to further develop the Akamas technology to address a growing range of businesses and use cases. “We are very pleased to announce the partnership with ALTERSIS Performance. We know how much their experience in performance tuning and optimization is appreciated by leading European customers. Channel partnerships are a key pillar of our go-to-market strategy and we have great confidence in ALTERSIS Performance”, said Lorena Marturana, Sales Channel Manager at Akamas. Andreas Leibundgut, Business Unit Director of ALTERSIS Performance Switzerland commented: “Our concept of re-inventing performance engineering for the digital age relies among other things on innovative AI-driven technologies to enable the integration of fully automated continuous performance engineering pipelines into continuous delivery and DevOps tooling chains. We strongly believe that Akamas solutions will be vital, both for our mature performance engineering customers and for those adopting DevOps.”',
    introduction:
      'Akamas, maker of the first AI-powered performance optimization solution for enterprise IT stacks, and ALTERSIS Performance, a leading provider and pioneer of IT performance engineering and consulting services, announce a strategic commercial partnership.',
    image: '...',
    isLatest: true,
  })

  /******** Reviews *********/
  const firstReview = await Reviews.create({
    author: 'Pablo Antolin',
    role: 'PayTv LATAM Product Manager - Telefònica',
    content:
      'Telefònica is changinh the way users interact with our video products, following the principle of always placing them at the center of the experience. With the ELM solution, we can offer viewers personalized and simplified experiences.',
  })

  /******** 4 Areas *********/
  const Area1_PerformanceEngineering = await Area.create({
    name: 'Performance Engineering',
    description: 'Area1 description',
    shortDesc: 'Making IT more reliable, responsive and resilient.',
    image: '...',
  })
  const Area2_Analytics = await Area.create({
    name: 'Analytics',
    description: 'Area2 description',
    shortDesc: 'Understanding data. Generating insights. Augmenting decisions.',
    image: '...',
  })
  const Area3_Security = await Area.create({
    name: 'Security',
    description: 'Area3 description',
    shortDesc: 'Partnering with customers to manage digital risk.',
    image: '...',
  })
  const Area4_IoT = await Area.create({
    name: 'Internet of Things',
    description: 'Area4 description',
    shortDesc: 'Full-stack IoT solutions. New business insights.',
    image: '...',
  })
  const Area5_Ml = await Area.create({
    name: 'Machine Learning',
    description: 'Area5 description',
    shortDesc:
      'Automates analytical model building and gives computers the ability to learn.',
    image: '...',
  })

  /******** 20 Employees *********/
  const firstEmployee = await Employee.create({
    name: 'Employee1 name',
    surname: 'Employee1 surname',
    role: 'Employee1 role',
    email: 'Employee1 mail',
    image: '...',
  })

  const secondEmployee = await Employee.create({
    name: 'Employee2 name',
    surname: 'Employee2 surname',
    role: 'Employee2 role',
    email: 'Employee2 mail',
    image: '...',
  })

  /******** 30 Products *********/
  const firstProduct = await Product.create({
    name: 'Real-Time Data Platform',
    description: 'Our real-time big data platform ingests data from IoT data sources, engineering them from raw, unstructured, unformatted data to a set of clean, coherent, real-time data. Using a variety of data science tools, we visualize and transform data in a new actionable framework, covering the entire analytics life cycle for the customer: a key asset to deliver full control of the process of extracting value from big data.',
    isTop: true,
    image: 'product_1.png',
  })

  const secondProduct = await Product.create({
    name: 'Prediction & Scenario Analysis',
    description: 'We analyze datasets through classification, clustering, and pattern recognition techniques to move from a historical static description of the past to a forward-looking actionable projection in the future. We implement this solution in predictive maintenance, incident analysis, early-warning, customer satisfaction, churn prediction, production planning, risk assessment, attribution modeling and more.',
    isTop: false,
    image: 'product_2.png',
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
