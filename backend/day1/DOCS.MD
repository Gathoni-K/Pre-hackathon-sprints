# DAY ONE'S TASKS BROKEN DOWN IN DETAIL.

## 1. CREATE A SUPABASE PROJECT.

-Create a project via the Supabase dashboard.

-Plug in the necessary env variables in the .env file.

-Remember to add the .env file to .gitignore so that it is not tracked by git.

-The variables needed from Supabase are:

    SUPABASE_URL=project URL here
    SUPABASE_ANON_KEY=
    DATABASE_URL=db connection string here
    SUPABASE_SERVICE_ROLE_KEY=

-For the connection string, use the direct connection.


## 2. SET UP DRIZZLE.

-Install and set up drizzle using the commands below:

    npm install drizzle-orm postgres dotenv
    npm install -D drizzle-kit tsx @types/node

-Configure drizzle kit as shown below:

    //drizzle.config.ts
    <!-- file is at the root -->

    import { defineConfig } from 'drizzle-kit';
    import * as dotenv from 'dotenv';

    dotenv.config();

    export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle', // The folder where migration files will be generated
    dialect: 'postgresql',
    dbCredentials: {
        // Remember: Drizzle Kit MUST use the Direct URL to alter the schema
        url: process.env.DIRECT_URL!, 
    },
    });

    //src/db/index.ts
    import { drizzle } from 'drizzle-orm/postgres-js';
    import postgres from 'postgres';
    import * as schema from './schema';
    import 'dotenv/config';

    const connectionString = process.env.DATABASE_URL!;

 
    const client = postgres(connectionString);

    export const db = drizzle(client, { schema });

-Once the table has been defined, add the following block of code to our package.json file.