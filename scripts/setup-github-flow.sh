#!/usr/bin/env bash
#
# setup-github-flow.sh
#
# Automatiza TODO el flujo requerido sobre tu cuenta real de GitHub:
#   1. Crea el repositorio remoto (si no existe).
#   2. Sube las ramas: main, develop, qa y las 5 feature/hotfix.
#   3. Por cada una de las 5 ramas feature/hotfix crea 3 Pull Requests:
#        - hacia develop
#        - hacia qa
#        - hacia main
#      y los mergea (queda cerrado/merged), sumando 15 PRs cerrados.
#   4. Al final, todos los cambios quedan integrados en main.
#
# REQUISITOS PREVIOS:
#   - Tener instalado GitHub CLI: https://cli.github.com
#   - Haber ejecutado:  gh auth login   (o exportar GITHUB_TOKEN)
#   - Ejecutar este script DESDE la raiz del proyecto (donde esta .git)
#
# USO:
#   chmod +x scripts/setup-github-flow.sh
#   ./scripts/setup-github-flow.sh <nombre-del-repo> [visibilidad: public|private]
#
# Ejemplo:
#   ./scripts/setup-github-flow.sh crud-git-flow-project public
#
set -euo pipefail

REPO_NAME="${1:-crud-git-flow-project}"
VISIBILITY="${2:-public}"
BRANCHES=(
  "feature/login-form"
  "feature/validate-user-input"
  "feature/payment-api-integration"
  "feature/user-dashboard"
  "hotfix/fix-date-format"
)
TARGETS=("develop" "qa" "main")

echo "==> Verificando que gh CLI este autenticado..."
if ! gh auth status >/dev/null 2>&1; then
  echo "ERROR: No estas autenticado en GitHub CLI. Ejecuta primero: gh auth login"
  exit 1
fi

echo "==> Creando repositorio remoto '${REPO_NAME}' (${VISIBILITY})..."
if ! gh repo view "${REPO_NAME}" >/dev/null 2>&1; then
  gh repo create "${REPO_NAME}" --"${VISIBILITY}" --source=. --remote=origin --push=false
else
  echo "El repositorio ya existe, se reutiliza."
  git remote add origin "$(gh repo view "${REPO_NAME}" --json url -q .url).git" 2>/dev/null || true
fi

echo "==> Empujando ramas base (main, develop, qa)..."
git push -u origin main
git push -u origin develop
git push -u origin qa

echo "==> Empujando ramas feature/hotfix..."
for branch in "${BRANCHES[@]}"; do
  git push -u origin "${branch}"
done

echo "==> Creando y cerrando (merge) los 15 Pull Requests..."
for branch in "${BRANCHES[@]}"; do
  for target in "${TARGETS[@]}"; do
    echo "----------------------------------------------------"
    echo "PR: ${branch} -> ${target}"
    PR_URL=$(gh pr create \
      --repo "$(gh repo view --json nameWithOwner -q .nameWithOwner)" \
      --base "${target}" \
      --head "${branch}" \
      --title "Merge ${branch} into ${target}" \
      --body "Integracion de la rama \`${branch}\` hacia \`${target}\` como parte del flujo Git Flow." \
      2>&1) || true

    if echo "${PR_URL}" | grep -q "http"; then
      PR_LINK=$(echo "${PR_URL}" | grep -o 'https://github.com[^ ]*' | tail -1)
      echo "PR creado: ${PR_LINK}"
      gh pr merge "${PR_LINK}" --merge --delete-branch=false || \
        echo "AVISO: no se pudo mergear automaticamente ${PR_LINK} (revisar conflictos manualmente)."
    else
      echo "AVISO: no se pudo crear PR ${branch} -> ${target}. Puede que ya exista o no haya diffs. Detalle:"
      echo "${PR_URL}"
    fi
  done
done

echo "==> Listo. Verificando PRs cerrados/mergeados en el repositorio..."
gh pr list --repo "$(gh repo view --json nameWithOwner -q .nameWithOwner)" --state closed --limit 50

echo ""
echo "Proceso completado. Revisa el repositorio en GitHub:"
gh repo view --json url -q .url
