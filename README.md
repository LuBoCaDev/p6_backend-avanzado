# Nodepop Fundamentos

## Deploy

### Install dependencies

```sh
npm install
```

### Configure

Copy .env.example to .env and review your config.

### Init database

**Only** on first deploy:

```sh
npm run initDB
```

## Start

To start a single instance:

```sh
npm start
```

To start in development mode:

```sh
npm run dev
```

## API

http://localhost:3000/api/

---
 El API inicialmente tendrá al menos dos usuarios:

 ● admin@example.com, clave 1234

 ● user1@example.com, clave 1234


### POST /api/login
Permite hacer login en el API retornando un JWT
```json
{
    "tokenJWT": // "the generated web token"
}
```

### GET /api/products
Retorna una lista de productos con algún filtro (p.e. por nombre), paginación,
 ordenación y selección de campos. Solo devuelve los productos que son
 propiedad del usuario logado.
```json
{
    "results": [
        {
            "_id": "6783a9f23c9dff4f56732fd3",
            "name": "Bicicleta",
            "owner": "6783a9f23c9dff4f56732fcd",
            "price": 23015,
            "tags": [
                "lifestyle",
                "motor"
            ],
            "__v": 0
        },
        // ...
    ],
    "count": 2
}
```

### GET /api/products/"productID"
Retorna un producto

http://localhost:3000/api/products/6783a9f23c9dff4f56732fd4

```json
{
    "result": {
        "_id": "6783a9f23c9dff4f56732fd4",
        "name": "Iphone",
        "owner": "6783a9f23c9dff4f56732fcd",
        "price": 5000,
        "tags": [
            "lifestyle",
            "mobile"
        ],
        "__v": 0
    }
}
```

### POST /api/products
Crea un producto, con subida de imágen
```json
{
    "result": {
        "name": "prueba",
        "price": 4850,
        "tags": [],
        "_id": "6783ac131975f7e4bb3953bf",
        "owner": "6783a9f23c9dff4f56732fcd",
        "__v": 0
    }
}
```

### PUT /api/products/"productID"
Actualiza un producto

http://localhost:3000/api/products/6783a9f23c9dff4f56732fd4
```json
{
    "result": {
        "_id": "6783a9f23c9dff4f56732fd4",
        "name": "patatas",
        "owner": "6783a9f23c9dff4f56732fcd",
        "price": 5000,
        "tags": [
            "lifestyle",
            "mobile"
        ],
        "__v": 0
    }
}
```

### DELETE /api/products/"productID"
Elimina un producto

http://localhost:3000/api/products/6783a9f23c9dff4f56732fd4
```json

```




## References

### UI fragments

- https://getbootstrap.com/docs/5.3/examples/
- https://getbootstrap.com/docs/5.3/examples/headers/
- https://getbootstrap.com/docs/5.3/forms/form-control/
- https://icons.getbootstrap.com/#install
