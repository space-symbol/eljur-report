# Eljur Reports
Приложение, созданное с использованием Electron.js, React.js и TypeScript для создания отчетов на основе данных, полученных через API ЭлЖур.

# Изменения в этой ветке
Добавлена возможность сохранять отчёты в базе данных MySQL. Для этого вам нужно создать базу данных с произвольным названием и перед созданием отчёта выбрать пункт "Сохранить данные в базу данных MySQL"

## Настройка проекта
### Установка зависимостей

```bash
$ npm install
```
### Запуск в режиме development
```bash
$ npm run start:dev
```

### Запуск в режиме production
```bash
$ npm run start:prod
```

### Сборка
```bash
# Для Windows
$ npm run build:win

# Для macOS
$ npm run build:mac

# Для Linux
$ npm run build:linux
```