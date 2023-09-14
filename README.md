<img width="1470" alt="Screenshot 2023-09-15 at 12 43 30 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/f5066c4a-4539-4526-a808-c60a48b39f9b">

# Cocreate
A platform which enables artists and creators to showcase their work, connect with collectors and grow their custom commissions business.


## Table of Contents

- [Languages and Technologies Used](#languages-and-technologies-used)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
  - [Others](#others)
- [Feature Highlights](#feature-highlights)
- [Setup](#setup)
  - [Backend](#backend)
  - [Front-end](#front-end)
- [Database Design](#database-design)
- [APIs](#apis)
- [Future Development](#future-development)
- [References](#references)


## Languages and Technologies Used

### Front-end
- React.js
- Typescript
- CSS
- Design library: Material UI

### Back-end
- Express.js
- Database: PostgreSQL hosted on ElephantSQL
- Image storage: AWS S3

### Others
- Project management: Jira
- UI Wireframing and prototyping: Figma


## Feature Highlights

### Access creator and patron features with a single log-in
Users can seamlessly switch between creator and patron dashboards with our account toggle feature.


https://github.com/yinhweelim/cocreate/assets/47060493/635f9089-cbec-49a6-9dd1-522bf6b86b2a


### Portfolio builder
Creators can craft stunning portfolios with ease, showcase portfolio projects and share their commissions process.

https://github.com/yinhweelim/cocreate/assets/47060493/beeddd5a-47f5-4387-a1c9-7a46a4ef0c9f

<img width="1470" alt="Screenshot 2023-09-15 at 12 42 17 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/2d374c91-d413-493e-b468-dbabe1385d4f">
<img width="1470" alt="Screenshot 2023-09-15 at 12 40 57 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/4893f231-5df3-47e1-be9d-723026dc196f">


### Commission form builder
Creators can build their own commission request form and offer product options to simplify the process. 
<img width="1470" alt="Screenshot 2023-09-15 at 1 01 58 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/46312766-db9f-4faa-8018-29fb6a458981">
<img width="1470" alt="Screenshot 2023-09-15 at 1 02 10 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/6ddf4929-a058-4ecb-800c-5c2b4a663ca0">

### Project management 
Creators can view and manage projects on the creator dashboard and filter requests based on budget and deadlines to prioritise work.
<img width="1470" alt="Screenshot 2023-09-15 at 12 40 42 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/ab42b551-bd6e-4f05-8e05-577966f32e49">

### Shareable project tracking link 
Creators can effectively communicate expectations and updates with patrons via a shareable project tracking link.

https://github.com/yinhweelim/cocreate/assets/47060493/ff15ef1e-3d6b-4637-ac31-276000f5cc5a



## Setup

###  Backend
All the backend code is in the Back-end directory. Run all backend commands from inside that directory.

Create a new .env file in the back-end directory and add the following lines:
```
PORT=5001

# elephantSQL database
HOST=
DB_USER=
PASSWORD=

# AWS 
BUCKET_NAME=
BUCKET_REGION=
ACCESS_KEY=
SECRET_ACCESS_KEY=

# secrets
ACCESS_SECRET=
REFRESH_SECRET=

```
Add in your values here. 
- The database url has to be for a elephantSQL database.
- Add in credentials for your AWS S3 bucket
- Generate your own Access Secret and Refresh Secret

Install dependencies: 
```
npm i
```

Run the app:
```
npm start
```

### Front-end
All the frontend react code is in the Front-end directory. Run all frontend commands from inside that directory.

Create a new .env file in the front-end directory and add the following lines:
```
VITE_SERVER=http://localhost:5001
```
Install dependencies: 
```
npm i
```

Run the app:
```
npm start
```


## Database design
Entity relationship diagram (subject to changes): 
![drawSQL-cocreate-export-2023-09-14](https://github.com/yinhweelim/cocreate/assets/47060493/1b3ad004-b584-49e9-8c0c-1ba123aa42b5)


## Future development
- More UI customization
- Customizable project stages 
- Creator analytics

## References
- **Typescript**
    - React + Drag and drop: [YouTube Tutorial](https://www.youtube.com/watch?v=FJDVKeh7RJI)
    - Express: [YouTube Tutorial](https://www.youtube.com/watch?v=qy8PxD3alWw)
    - Connecting Express to Postgres: [Tutorial](https://www.atatus.com/blog/building-crud-rest-api-with-node-js-express-js-and-postgresql/#using-node.js-to-connect-to-a-postgres-database)

- **Hosting**
    - ElephantSQL: [Website](https://www.elephantsql.com/)

- **PostgreSQL**
    - Begin Transaction: [Tutorial](https://www.tutorialspoint.com/postgresql/postgresql_transactions.htm#:~:text=The%20BEGIN%20TRANSACTION%20Command,or%20if%20an%20error%20occurs)

- **MUI (Material-UI)**
    - MUI Grid Center Align and Vertical Align: [Tutorial](https://smartdevpreneur.com/the-complete-guide-to-material-ui-grid-align-items/#:~:text=Material%2DUI%20Grid%20Center%20Align%20and%20Vertical%20Align,-%3CGrid%20container%20direction&text=However%2C%20if%20you%20wanted%20to,flex%2Dend%3A%20vertically%20aligns%20bottom)

- **Adding Protected Routes**
    - React Protected Routes with React Router Tutorial: [Tutorial](https://www.positronx.io/react-protected-routes-with-react-router-tutorial/)

- **Storing Images and Using Amazon S3**
    - Storing Images Tutorial: [YouTube Tutorial](https://www.youtube.com/watch?v=eQAIojcArRY)
    - GitHub Repository for Amazon S3 Get, Put, and Delete: [GitHub Repository](https://github.com/meech-ward/s3-get-put-and-delete/tree/master)
