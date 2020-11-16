module.exports = {

   "type": "postgres",
   "host": process.env.PG_HOST,
   "port": parseInt(process.env.PG_PORT),
   "username": process.env.PG_USER,
   "password": process.env.PG_PASSWORD,
   "database": process.env.PG_DB,
   "synchronize": false,
   "logging": true,
   "entities": ["src/entity/*.ts"],
   "migrations": ["src/migration/*.ts"],
   "cli": {
      migrationsDir: "src/migration"
   }
}