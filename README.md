<img width="1470" alt="Screenshot 2023-09-15 at 12 43 30 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/f5066c4a-4539-4526-a808-c60a48b39f9b">

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


https://github.com/yinhweelim/cocreate/assets/47060493/635f9089-cbec-49a6-9dd1-522bf6b86b2a


### Portfolio builder
Creators can craft stunning portfolios with ease, showcase portfolio projects and share their commissions process.

https://github.com/yinhweelim/cocreate/assets/47060493/967aa9ec-62ab-4fce-9c00-ad35735d6438
<img width="1470" alt="Screenshot 2023-09-15 at 12 42 17 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/2d374c91-d413-493e-b468-dbabe1385d4f">
<img width="1470" alt="Screenshot 2023-09-15 at 12 40 57 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/4893f231-5df3-47e1-be9d-723026dc196f">


### Commission form builder
Creators can build their own commission request form and offer product options to simplify the process. 
<img width="1470" alt="Screenshot 2023-09-15 at 1 01 58 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/46312766-db9f-4faa-8018-29fb6a458981">
<img width="1470" alt="Screenshot 2023-09-15 at 1 02 10 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/6ddf4929-a058-4ecb-800c-5c2b4a663ca0">

### Project management 
Creators can view and manage projects on the creator dashboard and filter requests based on budget and deadlines to prioritise work.
<img width="1470" alt="Screenshot 2023-09-15 at 12 40 42 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/5106798a-ba62-463a-a9f1-0213f9a27495">

<img width="1470" alt="Screenshot 2023-09-15 at 12 40 42 AM" src="https://github.com/yinhweelim/cocreate/assets/47060493/ab42b551-bd6e-4f05-8e05-577966f32e49">

### Project tracking 
Creators can effectively communicate expectations and updates with patrons via a shareable project tracking link.


https://github.com/yinhweelim/cocreate/assets/47060493/ff15ef1e-3d6b-4637-ac31-276000f5cc5a


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

