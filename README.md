# CRUD Git Flow Project

API REST CRUD funcional construida con **Node.js + Express**, desarrollada aplicando la metodologia **Git Flow**.

## Recurso principal: Productos

Operaciones CRUD completas sobre el recurso `productos`, almacenado en memoria (archivo JSON) para simplicidad de demostracion.

## Endpoints

| Metodo | Ruta               | Descripcion                  |
|--------|---------------------|-------------------------------|
| GET    | /api/productos       | Lista todos los productos     |
| GET    | /api/productos/:id   | Obtiene un producto por ID    |
| POST   | /api/productos       | Crea un nuevo producto        |
| PUT    | /api/productos/:id   | Actualiza un producto         |
| DELETE | /api/productos/:id   | Elimina un producto           |

## Instalacion

```bash
npm install
npm start
```

El servidor corre por defecto en `http://localhost:3000`.

## Estrategia de ramas (Git Flow)

- `main` -> Codigo estable en produccion.
- `develop` -> Rama de integracion de desarrollo.
- `qa` -> Rama de validacion / control de calidad antes de produccion.
- `feature/*` -> Nuevas funcionalidades, nacen de `develop`.
- `hotfix/*` -> Correcciones urgentes.

Cada rama feature/hotfix genera Pull Requests hacia `develop`, `qa` y `main` como parte del flujo de integracion documentado en este repositorio.
