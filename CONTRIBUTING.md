# Flujo de trabajo (Git Flow)

Este proyecto sigue la metodologia **Git Flow** con las siguientes ramas permanentes:

- **`main`**: version estable, lista para produccion.
- **`develop`**: rama de integracion de desarrollo.
- **`qa`**: rama de control de calidad / pruebas previas a produccion.

## Ramas de trabajo (feature / hotfix)

Cada nueva funcionalidad o correccion se desarrolla en una rama propia, creada desde `develop`:

| Rama | Tipo | Descripcion |
|---|---|---|
| `feature/login-form` | feature | Endpoint de autenticacion (`POST /api/auth/login`) |
| `feature/validate-user-input` | feature | Middleware de validacion de datos en la creacion de productos |
| `feature/payment-api-integration` | feature | Integracion (mock) con API de pagos (`POST /api/payment/checkout`) |
| `feature/user-dashboard` | feature | Endpoint de dashboard con resumen de inventario |
| `hotfix/fix-date-format` | hotfix | Correccion del formato de fecha (ISO 8601) al crear productos |

## Ciclo de integracion por rama

Cada una de las ramas anteriores genera **3 Pull Requests**:

1. `feature|hotfix/*` -> `develop`
2. `feature|hotfix/*` -> `qa`
3. `feature|hotfix/*` -> `main`

Los 3 PRs se revisan y se mergean (quedan en estado *closed/merged*), garantizando que el cambio quede
integrado en las tres ramas principales del flujo.

Con 5 ramas x 3 PRs = **15 Pull Requests cerrados**, y todos los cambios terminan integrados en `main`.

## Automatizacion

El script [`scripts/setup-github-flow.sh`](./scripts/setup-github-flow.sh) automatiza la creacion del
repositorio remoto, el push de todas las ramas y la creacion + merge de los 15 Pull Requests usando
[GitHub CLI](https://cli.github.com).

```bash
gh auth login
chmod +x scripts/setup-github-flow.sh
./scripts/setup-github-flow.sh mi-repo public
```
