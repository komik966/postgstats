-- simulate database size
create database test;
drop database test;

--- simulate long query
select pg_sleep(5 * 60);

-- simulate deadlock
CREATE TABLE ABC (ID INT PRIMARY KEY);
CREATE TABLE XYZ (ID INT PRIMARY KEY);
    -- in first session:
    BEGIN;
    INSERT INTO ABC VALUES (1);
    -- in second session:
    BEGIN;
    INSERT INTO XYZ VALUES (1);
    INSERT INTO ABC VALUES (1);

-- simulate base indexes
create table t
(
    k serial PRIMARY KEY,
    v integer
);

insert into t(v)
select trunc(random() * 10)
from generate_series(1, 100000);

select count(*)
from t
where k = 1000;

create index i on t (v);

select count(*)
from t
where k > 9
  and v = 5;
