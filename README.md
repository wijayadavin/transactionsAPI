# Welcome to our Food Stores API  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3b7c54a9707bda788ae0)
A backend project by Team C of Binar Academy batch 8
This RESTful-API (REpresentational State Transfer - Application Programming Interface) project is developed as a practice to implement basic CRUD operations (Create Read Update Delete) that commonly used in many online applications these days. Note that in this project we don't implement a strict data type (no data-schema).

#### About the Food Stores API:
- A simple API that let registered users to buy food by online
- Because this is not a fully-scaled development, the restaurants and menus are added manually by Admin

#### Specifications:

- Tech Stack: LowDB - Express.js - Node.js
- Modularization with MVC design pattern (without View)
- Automatically run the routes in routes directory folder (app.use)


# Feature Planning:
# A. Features
## A.1. Open for public
Anyone can browse foods and restaurants from our web:
#### **/** - Root ✔️ 
hello world!
#### **/auth/register** - CREATE a new user account ✔️
simply put your first name, last name, username, and password
#### **/auth/login**- LOGIN ✔️
login with registered username and password
#### **/menus** - READ all menus ✔️
Read all menus in our web (i.e. menu name, price, and restaurant name)
#### **/restaurants** - READ all restaurants ✔️
Read all restaurants in our web (i.e. restaurant name and address)
- Note: Listings are made manually by admin for now


## A.2. User-only:
Login as a user to get access to these sites:
#### **/profile** - READ & UPDATE user's profile (not other users) ✔️
#### **/orders/items** - CRUD order items ✔️
- CREATE a new order item (the menu in order item must be from one restaurant only)
- READ an order item by Query
- UPDATE an order item by ID
- DELETE an order item by ID
#### **/orders** - CRUD orders ✔️
- CREATE a new empty order (not added any orderItem yet)
- READ user's order list
- UPDATE user's order status from draft (status = 0) into checkout (status = 1)
- DELETE user's order with status = draft

## A.3. Admin-only:
Login as an admin user to get access to special permissions:
#### **/admin/users** - CRUD  users ✔️
#### **/admin/restaurants** - CRUD  restaurants ✔️
#### **/admin/menus** - CRUD menus ✔️
#### **/admin/orders** - CRUD transactions ✔️
#### **/admin/orders/items** - CRUD transactions ✔️


# B. Database schema:
<img src="https://i.ibb.co/wL4yJRV/Screenshot-from-2020-10-26-06-53-12.png" alt="Screenshot-from-2020-10-26-06-53-12" border="0">
