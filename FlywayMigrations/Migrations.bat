@echo Setting Script Path
set SCRIPTS_PATH=D:\FullStackApp\FullStackAppKC\FlywayMigrations\scripts
@echo ---------------------------------------------------------------
@echo Running Migrations
docker run --rm -v %SCRIPTS_PATH%:/flyway/sql my-flyway-image migrate
@echo ---------------------------------------------------------------
pause
