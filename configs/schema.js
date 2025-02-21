import { pgTable ,serial } from "drizzle-orm/pg-core";

export const Users = pgTable('users',{
   id:serial('id').primaryKey(),
   name:varchar('name').notNull(),
   email:varchar('email')
})