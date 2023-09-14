![logo](https://github.com/yinhweelim/cocreate/assets/47060493/27297890-159d-4bf4-a77f-098c8d1c7678)

# Cocreate
A platform which enables artists and creators to showcase their work, connect with collectors and grow their custom commissions business.

---

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
Users can seamlessly switch between creator and patron dashboards with our account toggle feature.

### Portfolio builder
Creators can craft stunning portfolios with ease, showcase portfolio projects and share their commissions process.

### Commission form builder
Creators can build their own commission request form and offer product options to simplify the process. 

### Project management 
Creators can view and manage projects on the creator dashboard and filter requests based on budget and deadlines to prioritise work.

### Project tracking 
Creators can effectively communicate expectations and updates with patrons via a shareable project tracking link.

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

