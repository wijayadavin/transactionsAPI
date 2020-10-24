# Welcome to our Food Stores API
by Team C of Binar Academy batch 8

# Feature Planning:
# A. Features
## A.1. Open for public
Anyone can browse foods and restaurants from our web:
#### **/**
- hello world!
#### **/auth/register**
- CREATE a new user account, simply put your first name, last name, username, and password
#### **/auth/login**
- LOGIN with registered username and password
#### **/menus**
- READ all menus in our web (i.e. menu name, price, and restaurant name)
#### **/restaurants**
- READ all restaurants in our web (i.e. restaurant name and address)
- Note: Listings are made manually by admin for now


## A.2. Authorization system
Register as a user to get access to these sites:
#### **/profile**
- READ & UPDATE user's profile (not other users)
#### **/orders/items**
- CRUD order items
#### **/orders**
CRUD orders with status draft
READ orders with status != draft

## A.3. Admin system
- for admin users, get access to special permissions:
#### **/admin/users**:
CRUD  users
#### **/admin/restaurants**:
CRUD  restaurants
#### **/admin/menus**:
CRUD menus
#### **/admin/orders**:
CRUD transactions
#### **/admin/orderItems**:
CRUD transactions


# B. Database schema:
<img src="https://i.ibb.co/txCPw14/Schema.png" alt="Schema" border="0">
