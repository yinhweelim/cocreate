![logo](https://github.com/yinhweelim/cocreate/assets/47060493/27297890-159d-4bf4-a77f-098c8d1c7678)

# cocreate
A platform which enables artists and creators to showcase their work, connect with collectors and grow their custom commissions business.

---
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

--- 
## Feature Highlights

### Access creator and patron features with a single log-in
Seamlessly switch between creator and patron dashboards with our account toggle feature.

### Portfolio builder
Craft stunning portfolios with ease, showcasing your work through images and descriptions.

### Commission page builder
Effectively accept commissions requests with a customizable form. Create product options to simplify the process. 

### Project management 
Efficiently manage projects on the creator dashboard
- filter requests based on budget and deadlines.

### Project tracking 
Effectively communicate expectations and updates with patrons via a shareable project tracking link 

---
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
---
## Wireframes 

UI Wireframes on [Figma]([https://www.figma.com/file/s99zepn0OQnpONiTH3P8Ef/Neighbourly?type=design&node-id=54295%3A401&mode=design&t=glvxB0l58AMcp6qo-1](https://www.figma.com/file/F1GvomFS5N0jvI48rnJvyw/Cocreate-wireframes?type=design&node-id=6036%3A164056&mode=design&t=itxI2nONb9XQb4c5-1)) for: 

--- 
## Database design
- Data Entity relationship diagram 

---

## APIs

---

## Future development
- More UI customization
- Customizable project stages 
- Creator analytics

---
## References

