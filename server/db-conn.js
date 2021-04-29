const { Sequelize, DataTypes } = require('sequelize')

// Development
// const db = new Sequelize(
//   'postgres://postgres:prova123@localhost:5432/test-database'
// )
// Production
const pg = require('pg')
pg.defaults.ssl = true
const db = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
})


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


/*********** Relationship *///////////////////

  // Creating the 1 -> N association(WorkIn) between Area and Employee
  Area.hasMany(Employee, { foreignKey: 'area_id' }) // ForeignKey = AreaOfWorkID is in the Employee table
  db._tables = {
    Area,
    Employee
  }

  // Creating the 1 -> 1 association(IsResponsible) between Area and Employee
  Area.belongsTo(Employee, {foreignKey: 'employee_id'}) // ForeignKey = ResponsibleID, is in the Area table
  db._tables = {
    Area,
    Employee
  }

  // Creating the 1 -> N association(BelongsTo) between Area and Product
  Area.hasMany(Product, {foreignKey: 'area_id'}) // ForeignKey = AreaOfBelongingID, is in the Product table
  db._tables = {
    Area,
    Product
  }

  // Creating the 1 -> N association(Manage) between Employee and Product
  Employee.hasMany(Product, {foreignKey: 'employee_id'}) // ForeignKey = ManagerID, is in the Product table
  db._tables = {
    Employee,
    Product
  }

  // Creating the N -> N association(Develop) between Employee and Product

}

/**
 * Function to insert some fake info in the database
 */


export default initializeDatabase
