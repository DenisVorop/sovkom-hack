
-- DROP TABLE IF EXISTS mail_tasks CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- пока без оптимизации
CREATE TABLE if not exists con_user_accounts (
    id_user uuid,
    id_account int
);

CREATE TABLE if not exists con_account_txs (
    id_account int,
    id_tx int
);

CREATE INDEX con_user_accounts_column_1_index
    ON con_user_accounts (id_user);

CREATE INDEX con_account_txs_column_1_index
    ON con_account_txs (id_account);

-- баланс и остаток считается по транзакциям

CREATE TABLE if not exists account (
    id serial PRIMARY KEY,
    account_hash varchar(256),
    ticket varchar(8) NOT NULL,
    type varchar(32),
    leverage real,
    date_created timestamp WITH TIME ZONE NOT NULL DEFAULT NOW(),
    date_updated timestamp WITH TIME ZONE NOT NULL DEFAULT NOW(),
    date_deleted timestamp WITH TIME ZONE
);

-- tx_hash varchar(256), -- для поиска

CREATE TABLE if not exists txs (
    id serial PRIMARY KEY,
    tx_hash varchar(256),
    ticket_from varchar(8),
    ticket_to varchar(8),
    instrument varchar(16),
    amount real,
    leverage real,
    client_open_value real,
    backand_open_value real,
    client_close_value real,
    backand_close_value real,
    status varchar(16),
    timestamp_open timestamp WITH TIME ZONE NOT NULL DEFAULT NOW(),
    timestamp_close timestamp WITH TIME ZONE,
    date_created timestamp WITH TIME ZONE NOT NULL DEFAULT NOW(),
    date_deleted timestamp WITH TIME ZONE 

);

CREATE UNIQUE INDEX account_column_2_index
    ON account (account_hash);

CREATE UNIQUE INDEX txs_column_2_index
    ON txs (tx_hash);



-- COPY LOG
-- CREATE TABLE txs_log as (select * from txs) with no data;


-- CREATE OR REPLACE FUNCTION updated_timestamp_func() RETURNS trigger AS $$
-- BEGIN
--   NEW.date_updated := NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- DO $$
-- DECLARE
--     t text;
-- BEGIN
--     FOR t IN
--         SELECT table_name FROM information_schema.columns WHERE column_name = 'date_updated'
--     LOOP
--         EXECUTE format('CREATE TRIGGER trigger_update_timestamp
--                     BEFORE UPDATE ON %I
--                     FOR EACH ROW EXECUTE PROCEDURE updated_timestamp_func()', t,t);
--     END loop;
-- END;
-- $$ language 'plpgsql';

-- CREATE TRIGGER sync_lastmod BEFORE UPDATE ON currency FOR EACH ROW EXECUTE PROCEDURE sync_lastmod();

