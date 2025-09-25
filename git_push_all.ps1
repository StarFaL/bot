# =========================================
# Скрипт для авто-коммита и пуша всех подмодулей и основного репо
# =========================================

# Получаем список всех подмодулей
$submodules = git config --file .gitmodules --get-regexp path | ForEach-Object { $_ -split " " } | ForEach-Object { $_[1] }

foreach ($sub in $submodules) {
    Write-Host "`n=== Проверяем подмодуль: $sub ==="
    if (Test-Path $sub) {
        Push-Location $sub

        git add -A
        if (git status --porcelain) {
            git commit -m "Авто-коммит подмодуля $sub"
            git push origin main
            Write-Host "Подмодуль $sub обновлён и запушен."
        } else {
            Write-Host "Изменений в подмодуле $sub нет."
        }

        Pop-Location
    } else {
        Write-Host "Подмодуль $sub не найден."
    }
}

# =========================================
# Обновляем основной репозиторий
# =========================================
Write-Host "`n=== Обновляем основной репо ==="
git add -A
if (git status --porcelain) {
    git commit -m "Авто-коммит основного репо с обновлёнными подмодулями"
    git push origin main
    Write-Host "Основной репо обновлён и запушен."
} else {
    Write-Host "Изменений в основном репо нет."
}
