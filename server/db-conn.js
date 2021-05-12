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
  const news1 = await News.create({
    title:
      'ELM is Recognized by Dynatrace as Intelligent Observability Competency Partner',
    content:
      'The Intelligent Observability Competency badge recognizes those, among partners, that have demonstrated a proven track record of contribution to enterprise digital transformation using the Dynatrace Software Intelligence Platform. ELM received this award as a sign of recognition of our commitment and as a measure of the level of expertise we earned in the market, helping customers extract maximum value from their Dynatrace investment. ELM, a Dynatrace Advanced Partner, is the first in Southern Europe to receive the Intelligent Observability Competency badge. The status recognizes ELM’s leadership and proficiency in implementing Intelligent Observability solutions based on Dynatrace, the 11-times-in-a-row leader in the Gartner Magic Quadrant for APM. In looking forward to what comes next, the ELM Performance Engineering team thanks Dynatrace for this acknowledgment, as further demonstration of the two companies’ successful and productive relationship.',
    introduction:
      'We are glad to announce that ELM, the international technology consulting and software group specialized in performance engineering, security, analytics and IoT, has been awarded with the Intelligent Observability Competency Partner status, as part of the newly created Dynatrace Cloud Partner Competency Program.',

    isLatest: true,
  })
  const news2 = await News.create({
    title:
      'Akamas and ALTERSIS Performance Announce New Partnership to Accelerate EMEA Adoption of AI-Driven Performance Optimization Solution',
    content:
      'Milan, Italy and Basel, Switzerland – April 27, 2021 – Today, Akamas, maker of the first AI-powered performance optimization solution for enterprise IT stacks, and ALTERSIS Performance, a leading provider and pioneer of IT performance engineering and consulting services, announced a strategic commercial partnership. ALTERSIS Performance offers IT performance consulting services in the areas of APM, performance testing and quality assurance for a range of corporate customers in key European markets such as Germany, Switzerland, and France. For more than 18 years, ALTERSIS Performance has been assisting customers in designing and implementing performance and APM engineering solutions in test, production and development while leveraging innovative and value-add technologies. Launched in 2019, Akamas has quickly established itself as a leading AI-powered performance optimization solution. Akamas fundamentally changes how IT users approach the tradeoffs between application performance and costs. Thanks to its technology-agnostic, full-stack approach and its AI’s ability to rapidly converge to optimal IT configurations, Akamas helps organizations meet performance goals at a speed that no manual tuning can achieve. As part of the partnership, ALTERSIS Performance will promote the Akamas solutions to its customers and support them with its implementation and operation. At the same time, ALTERSIS Performance and Akamas will work together to further develop the Akamas technology to address a growing range of businesses and use cases. “We are very pleased to announce the partnership with ALTERSIS Performance. We know how much their experience in performance tuning and optimization is appreciated by leading European customers. Channel partnerships are a key pillar of our go-to-market strategy and we have great confidence in ALTERSIS Performance”, said Lorena Marturana, Sales Channel Manager at Akamas. Andreas Leibundgut, Business Unit Director of ALTERSIS Performance Switzerland commented: “Our concept of re-inventing performance engineering for the digital age relies among other things on innovative AI-driven technologies to enable the integration of fully automated continuous performance engineering pipelines into continuous delivery and DevOps tooling chains. We strongly believe that Akamas solutions will be vital, both for our mature performance engineering customers and for those adopting DevOps.”',
    introduction:
      'Akamas, maker of the first AI-powered performance optimization solution for enterprise IT stacks, and ALTERSIS Performance, a leading provider and pioneer of IT performance engineering and consulting services, announce a strategic commercial partnership.',

    isLatest: true,
  })
  const news3 = await News.create({
    title:
      'ELM Day 2021: Submit your event by March 14th',
    content:
      'In a year of social distancing, we realized (even more) the magnitude of the ELM community. Connecting us all, our community has broken down the barriers of physical distances and self-isolation. While the pandemic has made us feel further apart, ELM has brought us a bit closer. For this reason, ELM Day 2021 will be titled ‘Undistancing: Open Makes Us Close’ — a phrase that embodies the power of the open source community to shorten any physical distance through new opportunities to collaborate, innovate, and get (virtually) closer. UNDISTANCING conveys the disruptive power of Arduino users to unite in a time when it’s needed more than ever. OPEN MAKES US CLOSE represents the ability of our community to transform a burden into a chance to connect, collaborate, and create as one. It’s a call to shorten as many distances as possible and to explore new ideas and technologies, together. Arduino Day is open to anyone, either as a local organizer or participant. If you want to organize a festivity of your own, please fill out this online form and submit your proposal by March 14th. Over the next few weeks, make sure to visit the ELM Day website to learn more or locate an event in your area. Moreover, don’t forget to spread the word on social media using the hashtag #ELMD21! We love our community and their safety is our priority. For this reason, we invite the organizers of local ELM Day events to celebrate online. For all events, we recommend following the “Key planning recommendations for Mass Gatherings in the context of the current COVID-19 outbreak” released by the World Health Organization, and check the information released by your government in order to enjoy ELM Day safely!',
    introduction:
      'ELM Day, which will be held on March 27th this year, is the celebration of the ELM community and the achievements of its members. The last several years have seen more than 3,000 community initiatives, organized from project exhibitions to talks and workshops, spanning across hundreds of countries worldwide.',

    isLatest: true,
  })
  const news4 = await News.create({
    title:
      'ELM and Ascend.io Announce New Partnership',
    content:
      'ELM, the leading Italy-based technology consulting and software group specialized in performance engineering, analytics, IoT and cybersecurity solutions, and Ascend.io, the data engineering company and Palo Alto-based maker of the best-of-breed unified platform for self-service, autonomous data pipelines, have announced a strategic commercial partnership. The Ascend Unified Data Engineering Platform empowers data teams to build modern data pipelines 10x faster than current solutions and to automate their maintenance, generating autonomous data pipelines that dynamically adapt to any changes in data, code or environment. ELM is a leading Milan-based technology consulting and software solutions vendor with an established global customer base among some of the most demanding enterprise organizations in the financial services, media, telco, retail, and manufacturing sectors. The ELM Analytics business unit blends data engineering and data science competencies to build high-value, bespoke analytics solutions for the enterprise. Scouting and bringing to market emerging winning technologies is key to Moviri Analytics’ ability to generate unique competitive value for our customers. In late 2020, Ascend announced a significant international expansion of the Ascend Partner Program. The Ascend Partner Program augments the Ascend Unified Data Engineering Platform with solutions and services curated to meet the needs of modern enterprise businesses and to significantly accelerate enterprise digital transformation timelines. As part of the partnership between the two companies, Ascend.io and ELM will work together to develop market-ready solutions that address a growing range of advanced analytics use cases. ELM has joined the Ascend Partner Program as Premier Partner for Europe, with an exclusive channel mandate in the Italian market.  ',
    introduction:
      'ELM and Ascend.io Announce New Partnership to Expand European Commercial Footprint of Ascend’s Unified Data Engineering Platform',

    isLatest: true,
  })
  const news5 = await News.create({
    title:
      'This automated mask closes when others are near',
    content:
      'Chen the DesignMaker decided to test this concept out with a servo-actuated mask, which features a hatch that actuates based on input from three PIR sensors and an Arduino Nano. When the sensors pick up movement, the mask closes; and when they aren’t activated for a period of time, it opens again. Notably, the device doesn’t have any sort of cloth or other sealing materials inside, making it very much a proof-of-concept, not an effective medical device.',
    introduction:
      'In order to stop the spread of COVID-19, many of us are wearing face masks when outside of our homes. While this can be effective, these coverings can be hot, inhibit breathing, and certainly make eating and drinking a bit difficult. What if they could instead be applied only when others are around?',

    isLatest: true,
  })
  const news6 = await News.create({
    title:
      'Cyber Threat Intelligence and Risk Management common ground',
    content:
      'The seminar will be held by one of our security experts, Daniele Ricci, and will focus on real “on-the-field” experience as well as enterprise-grade security knowledge of how security is perceived by companies. “Mind the Intelligence GAP” is a seminar that will try to focus on how Cyber Threat Intelligence and its day-by-day use can influence Risk Management: companies risk-exposure becomes something that changes on-the-fly and affects security perimeter and priorities. The seminar will target a series of approaches, techniques and pertinent use cases linking CTI and Risk Management together, hence overcoming the gap between these different worlds as well as highlighting common ground.',
    introduction:
      'ELM continues its valuable collaboration with “UniMi – Sicurezza dei Sistemi e delle Reti Informatiche” university by holding a new seminar that will be hosted by prof. Marco Cremonini during his lesson at DTI (Crema) “Risk Analysis & Management”',

    isLatest: false,
  })
  const news7 = await News.create({
    title:
      'ELM adds Security to its IT Performance Optimization service portfolio',
    content:
      'For ELM, IT Performance means making enterprise applications, systems and business processes run faster – Speed – , delivering their consistent availability and performance – Reliability – and ensuring their safety, integrity and protection – Security. With this natural extension of its offering, Moviri addresses the demand that many clients have already manifested and new opportunities to serve new customers and work with more partners. To address the spectrum of security challenges that customers face, Moviri’s offering has been designed to cover 4 main areas of focus: Governance – including Risk Management, Compliance and Access Governance; Protection – including Data Protection, Perimeter Security and Identity Management; Validation – including Vulnerability Assessment and Code Testing; Intelligence – including Security Analytics and Fraud Detection. To lead the newly formed Security team, services offering and industry solutions, Moviri has hired Mr. Andrea Andrenacci as Moviri Security Practice Leader. Andrea, brings more than 15 years of experience in the ICT security market and direct involvement in projects ranging from perimeter protection to identity management all over Europe. A well-respected industry veteran, Andrea has immediately established new relationships with leading vendors that have resulted in ELM signing new strategic partnerships with CA, CyberARk, RSA and WCK. In addition to that, Andrea has strengthened the existing relationship with HP and Splunk to include security-specific partnerships. “Looking for new challenges always drove my career.” Andrea Andrenacci comments. “I decided to join Moviri because it is a fresh environment with energy, passion and courage to invest. I’m happy to be here to bring my experience and combine the cybersecurity within the IT Performance vision of Moviri”. “Security represents a natural fit within ELM strategy.” Paolo Bozzola, CEO of Moviri, adds. “With the inception of the IT Security domain, we plan to overachieve 35% increase in revenue for 2014.”',
    introduction:
      'With its new Security domain, ELM completes its offering range to cover the entire spectrum of competencies, expertise and deliverables that are part of the overall IT Performance Optimization strategy. ',

    isLatest: false,
  })
  const news8 = await News.create({
    title:
      'PCCW MEDIA selects ELM to rebuild NOW TV’S personalization',
    content:
      'The implementation involves the integration with ContentWise UX Engine and ContentWise Analytics. UX Engine’s machine learning-powered platform enables PCCW Media to expand the range of Now TV’s personalization and discovery features. More importantly, it establishes a new user experience paradigm, where the dynamic interplay of data driven personalization and assisted editorial input adapts to each subscriber’s intent and tastes. “Now TV is committed to bringing the best viewing experience to our customers. Empowered by ContentWise, the new-look home screen aggregates all of the live TV and on-demand content that our customers love. It’s an entirely new way to discover the world of entertainment.”',
    introduction:
      'PCCW Media Limited (PCCW Media), a leading fully integrated multimedia and entertainment company headquartered in Hong Kong, selected ELM’s digital experience automation and personalization software, to revamp its IPTV and app user experience personalization infrastructure.',

    isLatest: false,
  })
  const news9 = await News.create({
    title:
      'MINERVA and ELM support Go’S pandemic relief action in Malta',
    content:
      'On March 13, 2020, Go announced that it was making 10,000 hours of TV programming and premium Video-On-Demand content available to all Malta citizens, including non-GO customers, through its TV app, available on Android, IoS and desktop. While people are still encouraged to stay inside and minimise social interaction, Go wanted to offer as big a selection of content and channels as possible for all Maltese households. Minerva and ELM, the technology vendors who provide and manage the software that powers the Go TV App, immediately agreed to support the offering by ramping up the system’s capacity to support an increased number of users and volume of transactions on the platform. In full support of the initiative, Minerva and ELM also waived their licensing and service agreements with Go to allow for the expansion of the service at no additional cost to Go and its users. Minerva and Contentwise, thanks to their long-standing partner relationship, harnessed the power of their technology to support Go in this mission to help people navigate this unprecedented situation and strengthen the connection between Go and its customers. “Minerva is proud to be part of GO’s initiative to help support the people of Malta during these difficult times,” says Mauro Bonomi, CEO of Minerva. “As part of our mission to enable GO TV to be the best destination for people to discover and enjoy the best content, we want their subscribers to be able to share great entertainment experiences. We hope our small contribution helps makes everyone’s lives a little bit more enjoyable.',
    introduction:
      'As the rapid spread of the Covid-19 coronavirus pandemic put Maltese citizens in lockdown, GO p.l.c., the leading telecommunications and digital TV services provider in Malta, ensured that everyone, including those who are not currently Go customers, can enjoy unlimited entertainment content from home.',

    isLatest: false,
  })
  const news10 = await News.create({
    title:
      'Remote working with ELM: Alexa and the ELM IoT Cloud',
    content:
      'As many countries begin to initiate a relaxation of restrictions and we are starting to be able to leave our houses, arrange shifts to get into work (still observing safety measures), we might find ourselves with different needs. Perhaps we got used to having the TV on more often than usual, letting the voices of shows we don’t really watch keep us company in the background while home alone… working. Maybe we just like to have a corner light up with colors which soothe our moods, or give a fancy background tint to a remote disco party as we dress with big shades and wigs. Many of these things can easily be automated using Alexa and ELM IoT Cloud, so when we (finally) leave the house and are not sure if the TV is still on, or if our living room corner is still purple! we can simply ask “Alexa, turn the TV off” or “Alexa, turn the living room off” and a series of smart devices and software will take care of it for us.',
    introduction:
      'We’ll certainly remember this year, with many of us learning how to adapt and live a safe life-style under the pandemic.',

    isLatest: false,
  })
  const news11 = await News.create({
    title:
      'Mediaset expands ELM experience personalization to Mediaset Play and Infinity VOD Services',
    content:
      'For over five years, ELM has provided Mediaset with personalization, UX automation, personalized recommendations, analytics and editorial tooling software. Today, Mediaset and ELM announced the extension of the ELM integration to the entire Mediaset’s VOD service portfolio on all platforms operating in Italy. Thanks to the strong working relationship between ELM and the Mediaset team, several ad-hoc use cases have been implemented to deliver the best experience to end-users. Giampietro Zambelli, Mediaset’s Manager leading Italian Data Platform: “We have been working with the ELM team for over five years. As our AVOD and SVOD offering has evolved and adapted to a rapidly changing market, so has the ELM software and the use cases they support. We constantly re-evaluate our vendor relationships. We decided to continue partnering with ELM, because they have capabilities no other user experience management solution on the market has, directly impacting on our AVOD service user engagement and further improving customer loyalty KPIs on our SVOD service”. Paolo Bozzola, at ELM commented: “We are very much focused on making sure our customers derive material business advantages from partnering with us. We have the highest customer loyalty in the industry because we deliver on our software’s promise. The expansion of the scope of our relationship with Mediaset is proof of that.” Launched last year, Mediaset Play is the group’s strategic ad-supported VOD destination that allows users to access all of Mediaset’s programming, on computer or mobile device. ELM will integrate with Play’s data platform and provide revamped content discovery and personalization user experience to users. ELM surfaces relevant items across a catalog of thousands of clips related to Mediaset’s TV programming. The integration increases engagement and retention and viewability metrics, aligning content programming execution with the platform’s ad-supported business model. Mediaset’s Infinity TV, the first on-demand streaming service launched in Italy in 2013, offers a subscription-based broad entertainment catalog of movies, cartoons, series, documentaries and TV programming. ContentWise helps Infinity drive retention metrics and transactional up-sell of premium content. Infinity uses content discovery and Dynamic Stream experience optimization technology that automates content feeds through a mix of editorial interventions and algorithmic personalization.',
    introduction:
      'Mediaset, the Milan-based Pan-European Broadcaster, member of the EBX Consortium and owner of OTT streaming services Mediaset Play and Infinity, has recommitted its long-standing relationship with ELM.',

    isLatest: false,
  })
  const news12 = await News.create({
    title:
      'ELM and Catchpoint partner for the digital experience management',
    content:
      'Mehdi Daoudi, CEO & Co-Founder Catchpoint Systems said: “Unlocking the true power of digital is key for all businesses. I am delighted that we have been able to embark on this hugely strategic and exciting partnership with ELM. We want to work with partners with a real desire to disrupt and be different; ones that are committed to understanding the solution and have the ability to take the customer through the process of adopting and leveraging the solution to its full capacity.” “Moviri capabilities to identify, validate and adopt new solutions in the monitoring field has allowed us to become a trustworthy ally for some of the most IT-intensive organizations in the world, to manage and optimize their infrastructure and secure their services.” said Paolo Bozzola, from ELM. This platform enables service delivery, service operation and business and marketing departments to benefit from unrestrained actionable insights on user experience, performance and availability, enabling anomalies prevention and improving user experience and engagement.',
    introduction:
      'ELM, global software and professional service company with more than fifteen years of expertise in performance optimization and monitoring, and Catchpoint Systems, leading digital performance intelligence company, have today announced that they have formed a strategic partnership to provide their customers with an enhanced digital experience intelligence platform that covers a wide range of use cases: from web and mobile applications to Internet of Things and API.',

    isLatest: false,
  })
  const news13 = await News.create({
    title:
      'Digital Performance, a blink away from your business',
    content:
      'The event, held in Rome and Milan, was all focused on how Dynatrace’s customers achieved getting the most out of their digital performance and improve the End User Experience. Why user experience is so important from a digital performance perspective? Take a look at this infographic: The Application Performance Monitoring (APM) is no longer the answer to present-day challenges: the idea of application monitoring is fading out before the Digital Performance Management (DPM); the focus now moves from the application to the End User Experience, considering that even a poor infrastructure performance may cause a big loss in revenue. With DPM you can prevent it! At Dynatrace Perform Day we had the chance to share our approach to Digital Performance: Stefano Doni, Performance and Capacity expert at ELM, took on stage his knowledge on Java performance analysis. Imagine you have to plan your marketing campaign for Black Friday, how efficient are your Java applications? Do you know that some hidden bottlenecks might limit your application scalability? What would be the impact on your business? Poor End User Experience and unhappy customers will be the main outcome. We presented innovative KPIs, not available in current monitoring tools that are the key to making accurate performance predictions. Business and performance have a deep bond, if you are not going to take care of this relationship, some else is going to. We are the optimization experts. We make your applications run faster, use fewer resources and meet business demand.',
    introduction:
      'Last June ELM had the privilege to sponsor the 2016 Dynatrace Perform Day and we talked about Digital Performance.',

    isLatest: false,
  })
  const news14 = await News.create({
    title:
      'Sanofi works with ELM for Capacity Management',
    content:
      'Sanofi was tasked with the ambitious goal of setting up the foundation of a world-class capacity management process. As the solution was implemented, Sanofi also decided to take advantage of Moviri’s Managed Service offering to support BMC’s TrueSight Capacity Optimization Solution on a daily basis. At BMC Engage 2014 in Orlando, Sanofi and ELM held a joint presentation to discuss how they effectively managed growth within Sanofi and continuously aligned IT to business demands. The partnership between Sanofi and us continues to grow stronger as ELM has become a key partner and a trusted advisor for Sanofi’s global challenges. Each customer relationship is personal to ELM and we strive to treat our customer’s needs as if they were our own.  Chris Wimer, Global Capacity Manager at Sanofi, has written a recommendation letter to endorse a leading Moviri consultant’s services and work ethic throughout his time while working with Sanofi. Here is an excerpt from the letter: “I am responsible for Capacity Management within the Application Technology and Solutions (ATS) and Global Infrastructure Services (GIS) groups at Sanofi. As Global Capacity Manager, I provide services to a variety of different internal and external Customers, including administration, support, operation and extension of the BMC TrueSight Capacity Optimization (TSCO) infrastructure” […] “If you are considering engaging a strategic partner with expertise in Capacity Management processes, or you’re interested in getting the best out of your BMC TrueSight Capacity Optimization instance, I would recommend meeting with ELM and discuss how they can help you achieve your objectives.” ELM is greatly appreciative of the opportunity to partner with a market leader such as Sanofi. We take tremendous pride and understand the importance of supporting Sanofi to ensure their enterprise applications are running faster, using less resources and meeting business demands.',
    introduction:
      'The relationship between Sanofi Aventis Group and ELM dates back to 2014 when ELM first engaged with the leading multinational pharmaceutical company to implement BMC’s Truesight Capacity Optimization solution.',

    isLatest: false,
  })
  const news15 = await News.create({
    title:
      'AI customer care powered by ELM',
    content:
      'This particular period of time is making companies realize how important customer support can be. Information desks have been replaced by call centers and help that used to be offered face-to-face is now delivered through online channels. This webinar illustrates what changes occurred over the last year and how AI can help customer care through automatic resolution and real-time help given to live agent. Together with Genesys we will give an overview of new products in customer care and innovative AI solutions to be integrated in your systems. Why Attend: you should attend this webinar if your main goal is to innovate your customer care and you want to deep dive into the possible solutions offered by Machine Learning ELM that leverage artificial intelligence. We are going to present you what AI is offering and how it can be integrated into your applications. Come and listen to our speakers to find out about upcoming trends and optimize your workforce.',
    introduction:
      'February 17, 2021 | from 4:00 PM to 4:45 PM  CET',

    isLatest: false,
  })

  /******** Reviews *********/
  const review1 = await Reviews.create({
    author: 'Pablo Antolin',
    role: 'PayTv LATAM Product Manager - Telefònica',
    content:
      '"Telefònica is changinh the way users interact with our video products, following the principle of always placing them at the center of the experience. With the ELM solution, we can offer viewers personalized and simplified experiences."',
  })
  const review2 = await Reviews.create({
    author: 'Justin Martin',
    role: 'Senior Technical Solution Leader - Cherner',
    content:
      '"IT Infrastructure Capacity Management requires a multifaceted knowledge about technology, business processes, and practice. The ability to talk to all the different areas of the organization provides the unique advantage of creating reliable and accurate models to predict and plan around IT infrastructure Capacity Risks. ELM SMEs brought to Cerner knowledge about the tools, methodologies, and processes that helped with maturing the practice to an unprecedented level that still provides benefits to the storage, compute and network infrastructure capacity planning."',
  })
  const review3 = await Reviews.create({
    author: 'Massimiliano Mazzarolo',
    role: 'Chief Technology Architect - lastminute.com',
    content:
      '"ELM AI allowed us to optimize our container-based Java services, significantly increase reliability under peak loads, and drive towards our cost-saving goals. AI-driven optimization by ELM created a new competitive advantage for lastminute.com and better efficiency in our private cloud platform. Autonomous performance optimization is real and is here."',
  })
  const review4 = await Reviews.create({
    author: 'Andreas Grabner',
    role: 'DevOps Activist - Dynatrace',
    content:
      '"Application development and release cycles today are measured in days, instead of months. Configuration options of the tech stack continue to increase in scope and complexity, with dependencies that have become unpredictable.[...] Tools like Akamas allow us to help our organizations deliver exceptional performance while keeping an eye on resource consumption and costs."',
  })
  const review5 = await Reviews.create({
    author: 'Guillermo Paez',
    role: 'Product and Innovation Manager - Cablevision',
    content:
      '"Cablevision customers are looking to enjoy a personalized TV experience. ELM expands our ability to deliver state-of-the-art personalized TV experiences, make our offering more attractive and learn about our subscribers preferences.  It is the foundation upon which we are able to continue to enhance and extend our service offering."',
  })
/*   const review6 = await Reviews.create({
    author: '',
    role: '',
    content:
      '',
  })
  const review7 = await Reviews.create({
    author: '',
    role: '',
    content:
      '',
  })
  const review8 = await Reviews.create({
    author: '',
    role: '',
    content:
      '',
  })
  const review9 = await Reviews.create({
    author: '',
    role: '',
    content:
      '',
  })
  const review10 = await Reviews.create({
    author: '',
    role: '',
    content:
      '',
  }) */

  /******** 4 Areas *********/
  const Area1_PerformanceEngineering = await Area.create({
    name: 'Performance Engineering',
    description: 'Design & Validation: Our performance engineering design and validation services help companies build high-performance architectures and services. We are experts in performance testing and tuning, autoscaling, and right-sizing, from evaluation to implementation. Self-Driving Ops: We have built a distinct expertise in self-driving operations in production, such as AIOps, dynamic optimization, chaos testing, canary deployment and self-remediation, automatic discovery and real-time service mapping. Observability: The entire range of IT operations as they relate to performance engineering: performance monitoring, digital performance management, end-user experience management, IT performance analytics and visualization. Planning & Control: We use a performance engineering approach to solve the IT cost equation, helping customers with their capacity planning and management processes, IT resource utilization accounting, chargeback and cost controls.',
    shortDesc: 'Making IT more reliable, responsive and resilient. We deliver best-in-class performance testing, monitoring, optimization and automation of mission-critical applications for the most demanding enterprise customers worldwide.'
  })
  const Area2_Analytics = await Area.create({
    name: 'Analytics',
    description: 'Data Engineering: Unique capabilities in the entire spectrum of data engineering, including cloud and hybrid big data architectures, data pipelines, data quality, NoSQL and streaming systems. Data Science: The combination of data science and research expertise. Machine learning applications in computer vision, NLP, recommender systems, forecasting. network science, BI, and visualization. Quantum AI: Designing, implementing and deploying AI algorithms and applications to solve complex analytics problems using Quantum Computing. Quantum computing adoption advisory.',
    shortDesc: 'Understanding data. Generating insights. Augmenting decisions. We combine big data engineering and data science expertise to build bespoke, end-to-end business analytics solutions at scale, creating unique value for our customers through cross-industry innovation.'
  })
  const Area3_Security = await Area.create({
    name: 'Security',
    description: 'Security Operations & Analytics: We develop advanced cybersecurity use cases and design and implement analytics dashboards. We also build risk-based response automation solutions and help customers implement their SIEM and SOAR platforms. Fraud Detection & Response: The rapid growth of digital payments and the introduction of PSD2 change the landscape and the complexity of the attacks. We offer specialized services and technology for fraud detection, prevention, and countermeasures. Digital Identity & Data Protection: Comprehensive identity & access management solutions to protect critical digital assets, for access management and to protect data in transit, on the cloud and on-prem. Digital Risk Management: Our specialized service offering around cybersecurity risk quantification and management to implement the cybersecurity side of enterprise digital risk management processes. Cloud Security: We offer a range of products and consulting services to secure and protect private and public cloud-native infrastructure and applications.',
    shortDesc: 'Partnering with customers to manage digital risk. We are unique among IT security consulting firms. We combine security technology engineering, intelligence expertise and our data science DNA to help companies manage digital risk end-to-end.'
  })
  const Area4_IoT = await Area.create({
    name: 'Internet of Things',
    description: 'IoT Consulting: With our consulting services, we work with customers to understand and unlock the value of IoT. We also help identify and refine business use cases, then create the technology blueprint with the selection of the IoT stack including hardware, software and cloud services. IoT Security: We collaborate with our security team to guarantee the reliability and safety of IoT products. Our end-to-end security approaches start from securing physical devices against tampering, implement advanced cryptography, and build-in in proper security governance. IoT Analytics: We collaborate with our analytics team providing advanced analytics expertise to help customers derive maximum value from the enormous amount of data generated by IoT. We develop solutions to automate processes and inform business decisions, applying AI-on-edge approaches that optimize the IoT architecture and operativity. End-to-End System Integration: We build enterprise IoT systems integrating a vast network of sensors and smart devices combined with advanced analytics and cloud services. We cover the entire life cycle from the design phase to the setup and maintenance of the solution. We develop custom software or deploy packaged software that best serves the project goal.',
    shortDesc: 'Full-stack IoT solutions. New business insights. We design future-ready IoT architectures, assemble enterprise-grade IoT data pipelines and deliver the insights our customers need to implement IoT initiatives.'
  })
  const Area5_Ml = await Area.create({
    name: 'Machine Learning',
    description: 'MLOps & Business Analytics at Scale: Deployment and maintenance of ML tools in operations, Closed loop Analytics, lift-and-shift continuous evolution at enterprise scale. On traditional, cloud and edge architecture.',
    shortDesc:
      'Automates analytical model building and gives computers the ability to learn. We exploit at the best Machine Learning solution to specific cases of our customers. Make it simple, acquire hidden fundamental information trough our ML solutions.'
  })

  /******** 20 Employees *********/
  const employee1 = await Employee.create({
    name: 'Paolo',
    surname: 'Bozzola',
    role: '',
    email: 'paolo.bozzola@elmcorp.com'
  })

  const employee2 = await Employee.create({
    name: 'Paolo',
    surname: 'Cremonesi',
    role: '',
    email: 'paolo.cremonesi@elmcorp.com'
  })

  const employee3 = await Employee.create({
    name: 'Claudio',
    surname: 'Bellia',
    role: '',
    email: 'claudio.bellia@elmcorp.com'
  })

  const employee4 = await Employee.create({
    name: 'Enrico',
    surname: 'Maini',
    role: '',
    email: 'enrico.maini@elmcorp.com'
  })

  const employee5 = await Employee.create({
    name: 'Camilla',
    surname: 'Stefani',
    role: '',
    email: 'camilla.stefani@elmcorp.com'
  })

  const employee6 = await Employee.create({
    name: 'Francesca',
    surname: 'Bogana',
    role: '',
    email: 'francesca.bogana@elmcorp.it'
  })

  const employee7 = await Employee.create({
    name: 'Fabio',
    surname: 'Volante',
    role: '',
    email: 'fabio.volante@elmcorp.com'
  })

  const employee8 = await Employee.create({
    name: 'Matteo',
    surname: 'Fabiano',
    role: '',
    email: 'matteo.fabiano@elmcorp.com'
  })

  const employee9 = await Employee.create({
    name: 'Sharon',
    surname: 'Smith',
    role: '',
    email: 'sharon.smith@elmcorp.com'
  })

  const employee10 = await Employee.create({
    name: 'Bruce',
    surname: 'Lam',
    role: '',
    email: 'bruce.lam@elmcorp.com'
  })

  const employee11 = await Employee.create({
    name: 'Katrina',
    surname: 'Ortiz',
    role: '',
    email: 'katrina.ortiz@elmcorp.com'
  })

  const employee12 = await Employee.create({
    name: 'James',
    surname: 'Hatch',
    role: '',
    email: 'james.hatch@elmcorp.com'
  })

  const employee13 = await Employee.create({
    name: 'Gijo',
    surname: 'Mathew',
    role: '',
    email: 'gijo.mathew@elmcorp.com'
  })

  const employee14 = await Employee.create({
    name: 'Cristina',
    surname: 'Everett',
    role: '',
    email: 'cristina.everett@elmcorp.com'
  })

  const employee15 = await Employee.create({
    name: 'Katie',
    surname: 'Clancy',
    role: '',
    email: 'katie.clancy@elmcorp.com'
  })

  const employee16 = await Employee.create({
    name: 'Karen',
    surname: 'Abbate',
    role: '',
    email: 'karen.abbate@elmcorp.com'
  })

  const employee17 = await Employee.create({
    name: 'Abbi',
    surname: 'Whitaker',
    role: '',
    email: 'abbi.whitaker@elmcorp.com'
  })

  const employee18 = await Employee.create({
    name: 'Craig',
    surname: 'Japp',
    role: '',
    email: 'craig.japp@elm.corp'
  })

  const employee19 = await Employee.create({
    name: 'Thomas',
    surname: 'Jordan',
    role: '',
    email: 'thomas.jordan@elm.corp'
  })

  const employee20 = await Employee.create({
    name: 'Rachel',
    surname: 'Fernandez',
    role: '',
    email: 'rachel.fernandez@elm.corp'
  })

  const employee21 = await Employee.create({
    name: 'Michael',
    surname: 'Brody',
    role: '',
    email: 'michael.brody@elm.corp'
  })

  const employee22 = await Employee.create({
    name: 'Tommy',
    surname: 'Jhonson',
    role: '',
    email: 'tommy.jhonson@elm.corp'
  })

  const employee23 = await Employee.create({
    name: 'Mary',
    surname: 'Luizon',
    role: '',
    email: 'mary.luizon@elm.corp'
  })

  const employee24 = await Employee.create({
    name: 'Archie',
    surname: 'Bellman',
    role: '',
    email: 'archi.bellman@elm.corp'
  })

  const employee25 = await Employee.create({
    name: 'Christine',
    surname: 'Hopkins',
    role: '',
    email: 'christine.hopkins@elm.corp'
  })

  







  

  /******** 30 Products *********/
  const product1 = await Product.create({
    name: 'Peak Demand Events',
    description: 'We use stress testing, capacity planning, scalability and monitoring in production, to eliminate the risk of outages or service degradation during events that produce peak loads on systems and applications, such as Cyber Monday, campaigns or unplanned events.',
    isTop: true
  })

  const product2 = await Product.create({
    name: 'Kubernetes & Microservices',
    description: 'We use stress testing, capacity planning, scalability and monitoring in production, to eliminate the risk of outages or service degradation during events that produce peak loads on systems and applications, such as Cyber Monday, campaigns or unplanned events.',
    isTop: false
  })

  const product3 = await Product.create({
    name: 'Agile, DevOps & CI/CD Automation',
    description: 'Our agile, devops and continuous integration automation solutions incorporate performance engineering in the modern software development and delivery approach, so that customers can accelerate their ability to deliver innovation through software.',
    isTop: false
  })

  const product4 = await Product.create({
    name: 'AI-Powered Performance Engineering',
    description: 'The complexity of modern technology stacks and application pipelines requires end-to-end automation. We use machine learning techniques and the right tooling to create automated, full-stack, closed-loop performance engineering solutions.',
    isTop: false
  })

  const product5 = await Product.create({
    name: 'Datacenter & Cloud Optimization',
    description: 'Our datacenter and cloud optimization solutions align infrastructure costs to business demand, whether in the enterprise datacenter, the public cloud or hybrid and multi-cloud architectures. We also help customers orchestrate their Go-to-cloud transition.',
    isTop: false
  })

  const product6 = await Product.create({
    name: 'Open Source Performance Framework',
    description: 'We have packaged our open source expertise to help customers make sense of, and integrate, ever evolving open source tools and frameworks in performance management, building a reliable and efficient toolchain and ecosystem.',
    isTop: false
  })

  const product7 = await Product.create({
    name: 'IoT & Client Side Performance',
    description: 'Mobile devices, IoT endpoints and RIA frameworks impose challenges that require to be addressed from new perspectives. We rethink the approach to specifically address fragmentation, limited resources, power, GUIs challenges and leverage crowd testing, front-end optimization, device and component emulators.',
    isTop: false
  })

  const product8 = await Product.create({
    name: 'Real-Time Data Platform',
    description: 'Our real-time big data platform ingests data from IoT data sources, engineering them from raw, unstructured, unformatted data to a set of clean, coherent, real-time data. Using a variety of data science tools, we visualize and transform data in a new actionable framework, covering the entire analytics life cycle for the customer: a key asset to deliver full control of the process of extracting value from big data.',
    isTop: true
  })

  const product9 = await Product.create({
    name: 'Prediction & Scenario Analysis',
    description: 'We analyze datasets through classification, clustering, and pattern recognition techniques to move from a historical static description of the past to a forward-looking actionable projection in the future. We implement this solution in predictive maintenance, incident analysis, early-warning, customer satisfaction, churn prediction, production planning, risk assessment, attribution modeling and more.',
    isTop: false
  })

  const product10 = await Product.create({
    name: 'Graph-Based Dynamic Systems',
    description: 'We use graph technology to explicit the relationships between resources and digital data flows taking place within a business process in real-time. By mapping the ontology of the internal processes we develop mathematical and logical models that can, for example, detect failures, spot wrong system configurations, prevent data leakage, assess risk or detect fraud and take automatic actions based on the data.',
    isTop: false
  })

  const product11 = await Product.create({
    name: 'Marketing Optimization & Attribution Models',
    description: 'Our solution helps marketing executives optimize the media mix budget allocation, on a variety of channels such as SEM, social, display, email and TV. We analyze the customer experience and explore marketing data to identify correlations, trends, seasonality, and outliers that characterize dynamic KPIs. We provide business results predictions and what-if scenario evaluations, giving one centralized view of what is working and what is not.',
    isTop: false
  })

  const product12 = await Product.create({
    name: 'UX Personalization & Next Best Action',
    description: 'Using our AI-powered UX personalization software platform, we optimize the customer journey through all digital touchpoints. We analyze interaction data through advanced machine learning and classification algorithms to identify and propose contents to users that suit their preferences, creating bespoke 1-to-1 experiences. Personalization also enables Next Best Action strategies to reach the highest probability of engagement and conversion.',
    isTop: false
  })

  const product13 = await Product.create({
    name: 'Continuous Monitoring & Risk Evaluation',
    description: 'We leverage frameworks and standards such as MITRE to design systems that collect, normalize and analyze security data in real-time. We use intelligence tools to generate insights that limit risk exposure, while reducing operational effort.',
    isTop: true
  })

  const product14 = await Product.create({
    name: 'Digital Identity for Critical Services',
    description: 'We provide the tools to ensure that all users and all device access activities are visible and controllable. We also support governance processes to control critical access, such as access by privileged parties or by third-parties, both to services and to data.',
    isTop: false
  })

  const product15 = await Product.create({
    name: 'Cloud Security Zero-Trust Architecture',
    description: 'As companies migrate services and data to the cloud, we have a range of solutions for cloud native application and infrastructure, risk monitoring of cloud traffic and multi-cloud integrations, security enforcement, continuous monitoring for cloud native services, SASE and CASB implementation, containers and serverless security.',
    isTop: false
  })

  const product16 = await Product.create({
    name: 'Cyber & Enterprise Risk Integration',
    description: 'We offer solutions specifically designed to help enterprises meet regulatory and governance challenges, including enterprise risk management and compliance around a variety of governance frameworks.',
    isTop: false
  })

  const product17 = await Product.create({
    name: 'AI-Based Fraud & Threat Intelligence',
    description: 'With our threat analysis and response orchestration solution, we create early detection systems for threats. We also create automatic orchestration response solutions that actively react to attack campaigns in a scalable way.',
    isTop: false
  })

  const product18 = await Product.create({
    name: 'Sensorization',
    description: 'Sensorization is crucial to the functionality of an Internet of Things initiative. It defines the trend of embedding sensing capabilities to “things” i.e. devices, machinery and equipment. Sensorization is primarily concerned with how technologies are integrated with multiple sensors and/or sensing technologies. This allows for data capture and analysis for a variety of applications like asset management, resource optimization, predictive maintenance, etc.',
    isTop: true
  })

  const product19 = await Product.create({
    name: 'Smart City',
    description: 'We help municipalities and urban environments to adopt smart city concepts, based on IoT systems, optimizing the efficient management of community resources, operations and services. We support government officials and their business partners in creating connected smart system networks to improve transportation systems, build energy-efficient infrastructure, decrease environmental pollution, provide state-of-the-art security, prevent crimes and manage emergencies in public spaces.',
    isTop: false
  })

  const product20 = await Product.create({
    name: 'Smart Agriculture',
    description: 'Our IoT solutions create smart farming systems that drive higher yields without putting additional strain on the environment. We deploy specialized IoT communication technologies such as LoraWAN, Sigfox, NB-IoT, 5G, and help customers collect data from multiple in-field and in-building sensors to improve quality control and productivity.',
    isTop: false
  })

  const product21 = await Product.create({
    name: 'Smart Retail',
    description: 'Our solution is suited for shopping malls, supermarkets and other retail settings. We help retailers personalize the in-store customers experience thanks to applications such as intelligent reception, proactive concierging, virtual storage and dressing room, etc.',
    isTop: false
  })

  const product22 = await Product.create({
    name: 'Product Servitization',
    description: 'Product servitization enables organizations to extend their value chain in order to better serve their customers. We help machinery and equipment manufacturers and integrators instrument their products with sensors and IoT software so that they can collect data throughout the lifecycle of the product. This means they will have more real-time information about when and how their product is being used to enable new business models. For example, implementing a resource consumption measurement, an organization can adopt a pricing mechanism based on data coming from sensors.',
    isTop: false
  })

  const product23 = await Product.create({
    name: 'Contextual Marketing & Innovative Shopping Journey',
    description: 'Hi engage is a Contextual Marketing solution that allows, using your smartphone and tablet, to experience an innovative shopping journey. It enables brands and companies to open a new, direct and personal channel of communication with their customers. Hi engage technology sends text, audio and video messages in multiple languages, manages barcodes and QR',
    isTop: false
  })

  const product24 = await Product.create({
    name: 'AI Platform',
    description: 'Whether it is point-and-click data science using AutoML or advanced model optimization, AI Platform helps all users take their projects from ideation to deployment, quickly and seamlessly. Machine learning doesn’t stop at deployment. AI Platform makes it easy for developers, data scientists, and data engineers to streamline and scale their ML workflows.',
    isTop: true
  })

  const product25 = await Product.create({
    name: 'AI Infrastructure',
    description: 'Tensor Processing Units (TPUs) are custom-built ASIC to train and execute deep neural networks. Train and run more powerful and accurate models cost-effectively with faster speed and scale. Access CPU platforms when you start a VM instance on Compute Engine. Compute Engine offers a range of both Intel and AMD processors for your VMs.',
    isTop: false
  })

  const product26 = await Product.create({
    name: 'Speech-to-Text',
    description: 'Customize speech recognition to transcribe domain-specific terms and rare words by providing hints and boost your transcription accuracy of specific words or phrases. Automatically convert spoken numbers into addresses, years, currencies, and more using classes.',
    isTop: false
  })

  const product27 = await Product.create({
    name: 'Text-to-Speech',
    description: 'Train a custom voice model using your own audio recordings to create a unique and more natural sounding voice for your organization. You can define and choose the voice profile that suits your organization and quickly adjust to changes in voice needs without needing to record new phrases.',
    isTop: false
  })

  const product28 = await Product.create({
    name: 'Agent Assist',
    description: 'Empowers human agents with continuous support during their calls and chats by identifying intent and providing real-time, step-by-step assistance. Uses natural language processing to identify call drivers and sentiment that helps contact center managers learn about customer interactions to improve call outcomes.',
    isTop: false
  })

  const product29 = await Product.create({
    name: 'Translation',
    description: 'Developers, translators, and localization experts with limited machine learning expertise can quickly create high-quality, production-ready models. Just upload translated language pairs and AutoML Translation will train a custom model that you can scale and adapt to meet your domain-specific needs.',
    isTop: false
  })

  const product30 = await Product.create({
    name: 'Document AI',
    description: 'Document AI is built on decades of AI innovation at Google, bringing powerful and useful solutions to these challenges. Under the hood are Google’s industry-leading technologies: computer vision (including OCR) and natural language processing (NLP) that create pre-trained models for high-value, high-volume documents. DocAI has already processed tens of billions of pages of documents across lending, insurance, government and other industries.',
    isTop: false
  })


  await Area1_PerformanceEngineering.addWorkIn(employee1) // Employee work in area
  await Area2_Analytics.addWorkIn(employee2)
  await Area1_PerformanceEngineering.setIsResponsible(employee1) // Add Responsible to the area
  await Area2_Analytics.setIsResponsible(employee2)

  await Area1_PerformanceEngineering.addBelongsTo(product1) // Add product to the area
  await Area1_PerformanceEngineering.addBelongsTo(product2)
  await Area1_PerformanceEngineering.addBelongsTo(product3)
  await Area1_PerformanceEngineering.addBelongsTo(product4)
  await Area1_PerformanceEngineering.addBelongsTo(product5)
  await Area1_PerformanceEngineering.addBelongsTo(product6)
  await Area1_PerformanceEngineering.addBelongsTo(product7)
  await Area2_Analytics.addBelongsTo(product8)
  await Area2_Analytics.addBelongsTo(product9)
  await Area2_Analytics.addBelongsTo(product10)
  await Area2_Analytics.addBelongsTo(product11)
  await Area2_Analytics.addBelongsTo(product12)
  await Area3_Security.addBelongsTo(product13)
  await Area3_Security.addBelongsTo(product14)
  await Area3_Security.addBelongsTo(product15)
  await Area3_Security.addBelongsTo(product16)
  await Area3_Security.addBelongsTo(product17)
  await Area4_IoT.addBelongsTo(product18)
  await Area4_IoT.addBelongsTo(product19)
  await Area4_IoT.addBelongsTo(product20)
  await Area4_IoT.addBelongsTo(product21)
  await Area4_IoT.addBelongsTo(product22)
  await Area4_IoT.addBelongsTo(product23)
  await Area5_Ml.addBelongsTo(product24)
  await Area5_Ml.addBelongsTo(product25)
  await Area5_Ml.addBelongsTo(product26)
  await Area5_Ml.addBelongsTo(product27)
  await Area5_Ml.addBelongsTo(product28)
  await Area5_Ml.addBelongsTo(product29)
  await Area5_Ml.addBelongsTo(product30)

  await employee1.addManage(product1) // Add product to the managed ones by employee
  await employee1.addManage(product2)
  await employee1.addManage(product3)
  await employee1.addManage(product4)
  await employee2.addManage(product5)
  await employee2.addManage(product6)
  await employee2.addManage(product7)
  await employee6.addManage(product8)
  await employee6.addManage(product9)
  await employee6.addManage(product10)
  await employee7.addManage(product11)
  await employee7.addManage(product12)
  await employee11.addManage(product13)
  await employee11.addManage(product14)
  await employee11.addManage(product15)
  await employee12.addManage(product16)
  await employee12.addManage(product17)
  await employee16.addManage(product18)
  await employee16.addManage(product19)
  await employee16.addManage(product20)
  await employee17.addManage(product21)
  await employee17.addManage(product22)
  await employee17.addManage(product23)
  await employee21.addManage(product24)
  await employee21.addManage(product25)
  await employee21.addManage(product26)
  await employee22.addManage(product27)
  await employee22.addManage(product28)
  await employee22.addManage(product29)
  await employee23.addManage(product30)

  await employee1.addDevelop(product1) // Add product to the developed ones by employee
  await employee1.addDevelop(product2)
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
