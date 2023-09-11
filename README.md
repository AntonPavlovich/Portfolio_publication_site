## Read this to setup project!

### Working with migrations:
#### Generate migration
Due to the latest typeorm update it`s required to add **-d** flag to the **typeorm** command
```bash
npm run typeorm migration:generate -n ./src/database/migrations/<migration name> -- -d ./src/database/dataSource.ts;
```
#### Run migrations
We have to explicitly define the migrations folder for typeorm in configuration file
also if you run migrations in js extension it's required to run **build** command first!
```bash
npm run build && npm run typeorm migration:run -- -d ./src/database/dataSource.ts
```

### Env variables
Must be stored in .env file inside project's root folder. 
```dotenv
APP_PORT= #application port
APP_HOST= #if you need to explicitly set host for static files

DB_HOST= #database host
DB_PORT= #database port

SALT_ROUNDS= #salt round for password hashing

POSTGRES_USER= #database user 
POSTGRES_DB= #database name
POSTGRES_PASSWORD= #database password if provided


ACCESS_TOKEN_SECRET= #access token secret
REFRESH_TOKEN_SECRET= #refresh token secret

ACCESS_TOKEN_EXPIRING_UNIT= #"second" | "minute" | "hour" | "day"
REFRESH_TOKEN_EXPIRING_UNIT= #"second" | "minute" | "hour" | "day"

ACCESS_TOKEN_EXPIRING_AMOUNT= #numeric value representing amount of units("second" | "minute" | "hour" | "day")
REFRESH_TOKEN_EXPIRING_AMOUNT= #numeric value representing amount of units("second" | "minute" | "hour" | "day")
```
