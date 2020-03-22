FROM pgrouting/pgrouting:v2.6.3-postgresql_12
COPY postgis-initialization.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_PASSWORD=postgres\
    POSTGRES_USER=postgres \
    POSTGRES_DB=postgres
