@echo Setting Script Path
set SCRIPTS_PATH=D:\FullStackApp\FullStackAppKC\FlywayMigrations\scripts
@echo ---------------------------------------------------------------
@echo Running Migrations-image
docker run --rm -v %SCRIPTS_PATH%:/flyway/sql migrations-image migrate
@echo ---------------------------------------------------------------
pause
