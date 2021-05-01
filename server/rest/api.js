import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())


async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()

  // Let's extract all the Database tables we need to perform queries inside the endpoints
  const { News, Area, Employee, Product, Develop} = db._tables;

/**
 * Apis to make query on the DB
 */

/********  News *********/
app.get('/news/latest_news', async (req, res) => {
  const latest_news = await News.findAll({
    where: {
      isLatest: true
    },
    order: [
      ['id', 'ASC']
    ]
  })
  return res.json(latest_news)
})

app.get('/news/all_news', async (req, res) => {
  const all_news = await News.findAll({
    order: [
      ['id', 'ASC']
    ]
  })
  return res.json(all_news)
})

app.get('/news/:id', async (req, res) => {
  const { id } = req.params
  const news = await News.findOne({
    where: { id: id },
  })
  return res.json(news)
})



/********  Areas *********/
  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    return res.json(areas)
  })

  app.get('/areas/:id', async (req, res) => {
    const { id } = req.params

    var area = await Area.findOne({
      where: { id: id },
      include: [{
          model: Employee,
          as: 'IsResponsible'
        }]
    })
    return res.json(area)
  })
  // Get Top product
  app.get('/areas/:id/TopProduct', async (req, res) => {
    const { id } = req.params
    const TopProduct = await Product.findOne({
      where: { 
        area_of_belonging_id: id,
        isTop: true
      },
    })
    return res.json(TopProduct)
  })
 // Get all products of a certain area
  app.get('/areas/:id/AllProducts', async (req, res) => {
    const { id } = req.params
    const AllProducts = await Product.findAll({
      where: { 
        area_of_belonging_id: id,
        isTop: false
      },
    })
    return res.json(AllProducts)
  })
  // Get working team of a certain area
  app.get('/areas/:id/WorkingTeam', async (req, res) => {
    const { id } = req.params
    const WorkingTeam = await Employee.findAll({
      where: { 
        area_of_work_id: id,
      },
    })
    return res.json(WorkingTeam)
  })


 /********  Employees *********/ 
  app.get('/employees', async (req, res) => {
    const employees = await Employee.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    return res.json(employees)
  })

  app.get('/employees/:id', async (req, res) => {
    const { id } = req.params
    const employee = await Employee.findOne({
      where: { id: id },
      include: [{
        model: Area,
        as: 'WorkIn'
      }]
    })
    return res.json(employee)
  })

  // Get managed products
  app.get('/employees/:id/ManagedProducts', async (req, res) => {
    const { id } = req.params
    const ManagedProducts = await Product.findAll({
      where: {manager_id: id}
    })
    return res.json(ManagedProducts)
  })

 // Get developed products
  app.get('/employees/:id/DevelopedProducts', async (req, res) => {
    const { id } = req.params
    const { QueryTypes } = require('sequelize');
    const DevelopedProducts = await db.query(
      "SELECT P.id, P.name, P.description, P.is_top, P.image, P.area_of_belonging_id, P.manager_id FROM develops as D, products as P WHERE D.employee_id = ? AND P.id = D.product_id ", 
      { 
        replacements: [id],
        type: QueryTypes.SELECT 
      }
    );

    return res.json(DevelopedProducts)
  })


  /********  Products *********/
  app.get('/products', async (req, res) => {
    const products = await Product.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    return res.json(products)
  })

  app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id: id },
      include: [
        {
          model: Area,
          as: 'BelongsTo'
        },
        {
          model: Employee,
          as: 'Manage'
        }
      ]
    })
    return res.json(product)
  })

  // Get developing team of a product
  app.get('/products/:id/DevelopingTeam', async (req, res) => {
    const { id } = req.params
    const { QueryTypes } = require('sequelize');
    const DevelopingTeam = await db.query(
      "SELECT E.id, E.name, E.surname, E.role, E.email, E.image, E.area_of_work_id FROM develops as D, employees as E WHERE D.product_id = ? AND D.employee_id = E.id ", 
      { 
        replacements: [id],
        type: QueryTypes.SELECT 
      }
    );

    return res.json(DevelopingTeam)
  })
}

init()

export default app
