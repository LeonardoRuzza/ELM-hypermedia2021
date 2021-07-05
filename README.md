# ELM-hypermedia2021
Group Name: ELM

Edoardo Venir 10570524 edoardo.venir@mail.polimi.it

Leonardo Ruzza 10608001 leonardo.ruzza@mail.polimi.it

Matteo Plona 10533085 matteo.plona@mail.polimi.it

GitHub: https://github.com/LeonardoRuzza/ELM-hypermedia2021.git

Website: https://elm-hypermedia2021.herokuapp.com/

## Implementation Contributions
The following contributions are ONLY indicative of the workload distribution of the develop, we want to emphasize that ALL the team members evenly cooperated with diligence to develop the whole website. 
Slightly more in detail, initially we have started splitting the components between us, Matteo has focused on the core funtionalities of the more interactive once, Leonardo has defined the main structure of most of them, Edoardo has cooperated to put the foundations on some of them, but principally started implementing the main server-side features and then has been reached by the others to conclude some critical parts of it (and populate the DB more late). Then we have parallelized the basic implementation of the pages, evenly splitting them between us and following the previous made design choices. At the end we have converged to agree on the more critical implementation parts of the various pages and widely cooperated to output a semi-final version. Finally, with the same "modus operandi", Edoardo and Leonardo have focused on the chatbot integration in the website while Matteo has placed attentions to achive the great possible responsiveness, cooperating continuously in case of decision-making needs, and all continuing to update more the style of the website and upgrading the previously implemented components and pages. 
Finally, we want to re-emphasize, that there is no parts where some of us didn't directly get in touch with, in fact all of us cooperate to write or double-check everything which is implemented in this website. 

## Server and DB
Server-Side technology: NodeJS with Express.

Database: PostgreSQL.

Hosting on: Heroku.

To implement the backend part, we followed the structure presented during the course. In particular, in the folder "server", "db-conn.js" is the implementation of the Postgres database that store all the information necessary to support the website (description of entities/relationships and population of the DB itself). In the sub-folder "rest", "api.js" provide the implementation of all the functionalities necessary to answer to all the requests coming from the client-side (i.e., make a query to the DB and send it as answer to a request) to support the dynamic pages of the website which needs to retrieve data from the database.

## Components

* ### TheHeader
This component is the header present in all the pages of the website, in fact it contains all the main landmarks providing useful link for the navigation. It is setted also to be fixed on the top of the view during the scroll of the pages and provide basic orientation info underlining a specific landmark if the user is in the associated specific page. The landmark representing the Homepage is the logo of the company. Furthermore, for the landmark "Areas" is implemented a dropdown menu which appear when the user go on it, to show all the areas to navigate to them (thanks to a listener and some methods implemented in the script part of the component).
Imported by: default.vue

* ### TheFooter
This component is the footer present in all the pages of the website, in fact  it contains all the main landmarks (except the Homepage) providing useful link for the navigation. It is setted to be position at the end of the page. It contains also the social icons of the company.
Impoorted by: default.vue

* ### TheBreadCrumbs
This component provide, to the pages which import it, customized breadcrumps that are usefull to provide orientation info to the user and also, being clickable, to go up on the page navigation hierarchy. 
Imported by: about/index.vue, areas/_id.vue, /employees/index.vue, /employees/_id.vue, news/index.vue, news/_id.vue, products/index.vue, products/_id.vue, team/_id.vue, contacts.vue (e.g., all the pages except the Homepage)

* ### TheCarousel
This component provide the implementation of a carousel, customizable with n images indicated by the page that import it. It provides next/previous functionalities to see respectively the previous or the next image in the carousel and also dotted points on the bottom to make appear a specific image in the carousel. In the top the component show the number identifier of the current showed image.
Imported by: products/_id.vue

* ### TheSideBar
This component provide the implementation of a sidebar with two "items" that are useful in the pages where there are two different "views" (e.g., different exclusive contents to show in the same web page). It also highlight the item which is currently selected. In particular, this component exploit the use of an event to inform the page when an item is clicked (e.g., the sidebar it is not directly responsible on what happens then).
Imported by: news/index.vue, about/index.vue

* ### TheContactForm
This component provide a form with some field to be filled/selected (e.g., name, surname, email, country, message). It allow to set a default message provided by the page which import it (useful in the case of the page of a product to pre-fill a part of the message). For our purposes it "fake" the send of the message printing a "Message Sent" on the top when the form is submitted, preventing any other "real" action.
Imported by: contacts.vue, products/_id.vue

* ### TheCard
This component implement a customizable "card". In particular it can be filled by the page which import it with (not necessary all): a title, a subtitle, an image, a description, a link (to make che card clickable in order to navigate to the represented element). 
Imported by: areas/_id.vue, employees/index.vue, employees/_id.vue, news/index.vue, products/index.vue, products/_id.vue, team/_id.vue

* ### Chat
This component is like the one presented during the course for the chatbot implementation part, except for some new style and the autoscroll implementation. It is present in all the pages and allow the interaction between the user and the chatbot itself.
Imported by: default.vue

## Plugins
* We have exploited the use of the "mmcc" plugin for the chatbot implementation. 
* We have exploited the use of the "store" for the chatbot implementation. In fact, the state and the mutations are implementend in the file "index.js" in the folder "store". In particular, the state is represented by two variables: the list of messages and a sort of discriminant variable to use in a diramation of the process (e.g., what to visualize highlighted in the Contact Us page). Moreover, the mutations are two: one to add a message coming from the chatbot or from the user to the list of all the messages of the chat, the other to set the variable to distinguish in the branch of the chatbot what to visualize highlighted in the Contact Us page.  
* We have exploited the use of the "routing" provided by the framework, in order to better manage the navigation in the website (e.g., between the various pages in the folder "pages").
* We have exploited the use of "Babel" for transpiling modern JavaScript.
* We have exploited the use of "ESLint" for ensuring code quality.
* Also, any other present plugin was automatically included in the project when creating it like explained us during the course.


## Framework Comments
* Following the conventions of naming the pages in the folder "pages", we have avoided to write every "route" manually. More in detail, we have exploited this conventions to write also "parametric" names' pages (i.e., "_id.vue" in the sub-folder "products" which represents the structure of the page for each product), and then we have used intensively the "nuxt-link" element.
* We have defined a layout "default.vue" which is applied to all the pages and allowed us to include common components (i.e., header, footer, chat) once and for all pages. Also, in this layout, we have defined some common CSS rules being coherent in all the pages in "one shot" (the most of the others CSS rules are specified "scoped" in the single pages, avoiding conflicts in the style between different pages).
* The components themselves that we have implemented try to make the application very modular and scalable. In fact, most components are imported and used by more pages, and the one used only one time, "TheCarousel.vue", can become reusable very well in a future upgrade of the website.
* We have used the folder "static" to store in it all the images/thumbnail with some "conventions" on the names in order to simplify the parametric retrieving of them when needed by the pages. 
* We have expoloited the use of constructs like "v-for", "v-if", "v-else", and dynamic properties ("v-bind" and "v-"on" directives) to generate parametrically and dynamically the "view" of a page (e.g., iterate on "TheCard" component in the "products/index.vue" to generate one card for all the products to show) or allow dynamic changes (i.e., the switch between the "latestNews" or "allNews" sections in the "news/index.vue").
* We have exploited the communication from components to pages with the concept of emitting and capture custom "events" (e.g., the component "TheSideBar.vue" emit an event, later managed from the page which import it to change the view, for example of the "about/index.vue"), and viceversa with the use of the "props" (e.g., to create parametrically a card with the info passed by the page that import it).
* We have implemented dynamic pages that retrieve data from the backend using "asyncData" to interact with the api specified in "server/api.js" that then manage the request and properly answer.
* To share common code to all the pages (in our case necessary for the chatbot implementation) we have exploited the notion of "mixin" (e.g., "mmcc-mixin.js" in the folder "mixins", which is included directly in our "layouts/defaul.vue").
* We have also exploited the dynamic interaction between components/pages trough the "store". In particular, it was necessary for us in order to implement the chatbot, allowing the sharing of a common state (committing/watching for possible mutations of it) between the "Chat.vue" component (for the messages), the "mmcc-mixin.js" (for the messages) and also the "contacts.vue" page (for the possible focuses in one of the two parts of this page).
* We have took into account the instances lifecycle, for example, we have implemented the "beforeMount()" and "beforeDestroy()" methods to manage a listener in the component "TheHeader.vue".
* Our pages and components are "adaptive" to different end user device to strongly augment the responsiveness. A simple example of it is the component "TheSideBar.vue" which become de facto a top bar when the user screen is too little. Another good example is our "TheHeader.vue" which completely change aspect (obviously mantaining the same core functionalities and objectives) between a desktop version and a mobile version.
* We also have directly considered to well satisfies standard accessibility requirements (i.e., "alt" specification). In particular we have developed our project also following the "P-O-U-R" principles explained during the course, to achive high perceivable interface (e.g., visually in our case), easely operable interface (e.g., for buttons and other interactive elements), well understandable interface (users will be able to comprehend the content, and learn and remember how to use it), and robust (to be standards-compliant, and designed to function on all appropriate technologies).
* The website follow the "SSR" pattern (server side rendering) and we have contributed directly to SEO optimization, for example, including meta description globally and locally (e.g., "head" specifications of the pages with "title", "initial-scale" etc.).

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
