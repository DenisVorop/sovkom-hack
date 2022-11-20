-- DROP TABLE IF EXISTS users CASCADE;


-- CREATE SEQUENCE user_id_seq START 15;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table if not exists users
(
    id           uuid DEFAULT uuid_generate_v4 () not null
                            constraint user_pk primary key,
    username        varchar     not null,
    firstname       varchar(50),
    lastname        varchar(50),
    password        varchar     not null,
    email_virified  boolean     not null,
    is_admin            boolean,
    approved_by_admin   boolean,
    ban                 boolean,
    date_created timestamp WITH TIME ZONE NOT NULL DEFAULT NOW()
);

create unique index if not exists user_id_uindex
    on users (id);

create unique index if not exists user_username_uindex
    on users (username);