CREATE TABLE booklist (
    book_id integer NOT NULL,
    title character varying(255),
    author character varying(255),
    short_title text,
    img_book character varying(255),
    price_rent real,
    category_id integer
);

CREATE TABLE category (
    id integer NOT NULL,
    content character varying(255)
);

CREATE TABLE payment (
    id integer NOT NULL,
    date_time date,
    exp_date date,
    total_price double precision,
    useraccount_id integer,
    booklist_id integer
);

CREATE TABLE useraccount (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    password character varying(255),
    email character varying(255),
    phone character(10),
    imguserurl character varying(255)
);