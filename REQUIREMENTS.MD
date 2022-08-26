## API Endpoints

#### Products

- Index `/api/products` [GET]
- Show  `/api/products/:id` [GET]
- Create [token required] `/api/products` [POST]
- Products by category `/api/products/category/:category` [GET]
- Update [token required] `/api/products/:id` [PUT]
- Delete [token required] `/api/products/:id` [DELETE]

#### Users

- Index [token required] `/api/users` [GET]
- Show [token required] `/api/users/:id` [GET]
- Create `/api/users` [POST]
- Update [token required] `/api/users/:id` [PUT]
- Delete [token required] `/api/users/:id` [DELETE]

#### Orders

- Create Order `/orders` [POST]
- Add product to order `/api/orders/:id/products` [POST]
- Show all products in order `/api/orders/:id/products` [GET]
- Show active products in order `/api/orders/:id/active_products` [GET]
- Mark order as complete `/api/orders/:id/complete` [PUT]

## Data Shapes

#### Product

- id
- name
- price
- category
- quantity

#### User

- id
- username
- firstName
- lastName
- password
- role

#### Orders

- id
- user_id

#### Order Products

- id
- order_id
- product_id
