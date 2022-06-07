# Traderagon_Private
Traderagon is a virtual cryptocurrency trading platform. Register and get a virtual 10,000 USDT for safe and
experimental trading. All prices and market data maintain a live and realtime state using Kucoin API. Traderagon
currently supports up to 97 coins and wallets with withdrawing and depositing features using QR codes.

# 🌟 Traderagon Features
Traderagon is a simply a light virtual crypto trading platform.
- Make your own account and **access it across multiple devices and from different places**.
- A **fully responsive design** for both desktops and mobile devices
- **Buy and sell** coins
- View your **order history**
- **withdraw and deposit**
- create mupltiple **wallets**

# 🛠 Traderagon/s Functionality and Inner Workings
This section will basically explain how Traderagon was built. This will mostly cover all *backend* work which was written
using **ExpressJS, a back end web application framework for Node.js**. In addition, this will explain how most of the User Interface Design is built which will cover
the *frontend* part of the web application that was written using **React, a front-end JavaScript library for building user interfaces based
on UI components**. 


### Backend
- Traderagon uses REST API architecture for server-client communication. Every part and feature of the web application has its own api route in the backend code (ExpressJS) which is responsible for a certain task. Every feature or part of the web app has its own folder that contains functions, routes, controllers, middleware and some other helper functions
- The underlying database that the web application uses to manage users, wallets, balances ... records is MongoDB, a MongoDB is a source-available cross-platform document-oriented database program. All queries are made using Mongoose, a JavaScript object-oriented programming library that creates a connection between MongoDB and the Express web application framework.
- For authentication, the user must login to his account using the email and the password. All passwords are stored securely using bcrypt, a password-hashing function which is extremely resistant to rainbow table-based attacks due to the salting used in the hashing function in addition to the cost factor which slows the hashing function making it prohibitively expensive to brute-force anything.
- When a buy/sell request is made, the live prices are fetched by the backend to confirm the actual realtime price of the selected coin. The prices are fetched using Kucoin API.
- Middleware like **authMiddleware : a middleware for making sure the request contains a valid JWT and is authenticated**, **transactionMiddleware : a middleware used to confirm that the wallet address is valid and belongs to the user in the JWT alongside the presence of the amount of the transaction** are used to make code more readable and split functionality into separate files.


### Frontend
- The User Interface is built using the React Library. The web application's frontend is split into multiple components which simplifies readability and makes editing the UI way simpler. The web application relies heavily on conditional rendering and only functional components are used.
- All requests made to the backend rely on the Fetch API. Data that should be sent within the request is basically stored either in the component's state (using the useState hook), or in the session storage.
- The layout of the UI design is mostly written using flexbox containers and tables. These containers help in organizing the layout and elements with minimum effort and code while maintaining a good looking user interface.
- The web application is responsive on most devices and screens. To maintain a good looking responsive design, CSS breakpoints and the react-socks library are used (a library that renders component conditionally if they satisfy a certain breakpoint). These breakpoints are defined according to the max-width property.
- Some routes are only accessible to authenticated users. To protect these routes from unauthenticated users, a PrivateRoute component is used. This route will only allow users who are logged in by checking if they have JWT in local storage. If the JWT is present but wrong, the user will get access right to this route only, and not to the content, as the tokens should get validated and verified by the frontend on every request. PublicRoute component is a route that only allow users who are **not logged in** to access them.
- For css animations, Animista library was used.
