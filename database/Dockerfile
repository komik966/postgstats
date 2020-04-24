FROM postgres
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_PASSWORD=postgres\
    POSTGRES_USER=postgres \
    POSTGRES_DB=postgres
