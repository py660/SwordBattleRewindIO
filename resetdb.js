const postgres = require("postgres");
const sql = postgres(process.env.DATABASE_URL, {ssl: {rejectUnauthorized:false}});
function print(content){
  console.log(content);
}
async function main(){
  try{
    print(await sql``);
  }
  catch{
    print("Tables are nonexistent, continuing...");
  }
  print(await sql`
  -- Table for account details
  CREATE TABLE public.accounts (
    skins jsonb NULL,
    password text NOT NULL,
    secret text NOT NULL,
    email text NULL,
    username text NOT NULL,
    coins int NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    id serial NOT NULL,
    lastusernamechange timestamp(6) without time zone NULL
  );`);
  
  print(await sql`
  ALTER TABLE public.accounts ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);`);
  
  print(await sql`
  -- Table for game details
  CREATE TABLE public.games (
    "time" bigint NULL,
    killerverified boolean NULL,
    verified boolean NULL,
    name text NULL,
    killedby text NULL,
    created_at timestamp without time zone NULL DEFAULT now(),
    kills bigint NULL,
    coins bigint NULL,
    id serial NOT NULL
  );`);
  
  print(await sql`
  ALTER TABLE public.games ADD CONSTRAINT games_pkey PRIMARY KEY (id);`);

  print(await sql`
  -- Table for game stats
  CREATE TABLE public.stats (
    id serial NOT NULL,
    game_date date NOT NULL DEFAULT CURRENT_DATE,
    username text NOT NULL,
    game_time bigint NOT NULL DEFAULT 0,
    game_count integer NOT NULL DEFAULT 0,
    stabs integer NOT NULL DEFAULT 0,
    coins integer NOT NULL DEFAULT 0
  );`);
  
  print(await sql`
  ALTER TABLE public.stats ADD CONSTRAINT stats_pkey PRIMARY KEY (id);`);
  
  print(await sql`
  ALTER TABLE stats ADD CONSTRAINT unique_username UNIQUE (username, game_date);`);
  
  print(await sql`
  -- Table for content details
  CREATE TABLE public.content (
    id serial NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    link text NULL,
    title text NULL,
    author text NULL,
    chance integer NOT NULL DEFAULT 1,
    source text NOT NULL DEFAULT 'youtube'::text,
    label text NULL
  );`);
  
  print(await sql`
  ALTER TABLE public.content ADD CONSTRAINT content_pkey PRIMARY KEY (id);`);
  //print(await sql`SELECT * FROM public.content;`);
}
main()//.then(out => {console.log(out); console.log(":> Done resetting database.");});
console.log(":> Done resetting database.");