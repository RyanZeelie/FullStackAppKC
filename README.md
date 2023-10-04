# FullStackAppKC

### Wireframe link : 
- https://www.figma.com/file/3kAbxE6w0EjL3rN1pGK9AY/FullStackAppKC?type=design&node-id=0%3A1&mode=design&t=mCSLthSBcce1xghz-1

## Migrations : 
- CD into the flywayMigrations folder
- ### Create a flyway image
   - Update flyway.conf with your database information
   - docker build -t migrations-image .

- Add any new migrations to the respective folders
   - V{datetime}__{description}
- ### Run the migrations
   - docker run --rm -v {absolute path to scripts folder}:/flyway/sql migrations-image migrate
   - OR : Update the path in the migrations.bat file and run it
