## Storefront Database Schema

#### Users

| Field         | Type             | Special Attributes |
| ------------- | ---------------- | ------------------ |
| **id**        | **SERIAL**       | **Primary Key**    |
| **username**  | **VARCHAR(100)** | **NOT NULL**       |
| **first_name**| **VARCHAR(50)**  | **NOT NULL**       |
| **last_name** | **VARCHAR(50)**  | **NOT NULL**       |
| **role**      | **VARCHAR(25)**  | **NOT NULL**       |
| **hash**      | **VARCHAR(255)** | **NOT NULL**       |

#### Products

| Field        | Type             | Special Attributes |
| --------     | ---------------- | ------------------ |
| **id**       | **Serial**       | **Primary Key**    |
| **name**     | **VARCHAR(100)** | **NOT NULL**       |
| **price**    | **REAL**         | **NOT NUll**       |
| **category** | **VARCHAR(100)** | **N/A**            |
| **quantity** | **INTEGER**      | **NOT NULL**       |

#### Orders

| Field       | Type             | Special Attributes |
| ---------   | ---------------- | ------------------ |
| **id**      | **Serial**       | **Primary Key**    |
| **user_id** | **Integer**      | **Foreign Key**    |
| **status**  | **VARCHAR(25)**  | **Default active** |

#### Order_products

| Field          | Type        | Special Attributes |
| -------------- | ----------- | ------------------ |
| **id**         | **Serial**  | **Primary Key**    |
| **order_id**   | **Integer** | **Foreign Key**    |
| **product_id** | **Integer** | **Foreign Key**    |