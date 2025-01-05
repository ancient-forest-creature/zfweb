// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { desc, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `zfweb_${name}`);

export const product = createTable(
  "product",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 1024 }).notNull(),
    price: integer("price").notNull(),
    imgKey1: varchar("img_key_1", { length: 1024 }).notNull(),
    imgurl1: varchar("img_url_1", { length: 1024 }).notNull(),
    imgKey2: varchar("img_key_2", { length: 1024 }),
    imgurl2: varchar("img_url_2", { length: 1024 }),
    imgKey3: varchar("img_key_3", { length: 1024 }),
    imgurl3: varchar("img_url_3", { length: 1024 }),
    videoKey: varchar("video_key", { length: 1024 }),
    videoUrl: varchar("video_url", { length: 1024 }),
    inventory: integer("inventory").notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
  }),
);

export const order = createTable("order", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  buyerId: integer("buyer_id")
    .references(() => customer.id)
    .notNull(),
  receiverId: integer("receiver_id").references(() => customer.id),
  buyerAddressId: integer("buyer_address_id")
    .references(() => address.id)
    .notNull(),
  shipAddressId: integer("ship_address_id")
    .references(() => address.id)
    .notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  price: integer("price").notNull(),
  utkey: varchar("utkey", { length: 1024 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const address = createTable("address", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  customer_id: integer("customer_id")
    .references(() => customer.id)
    .notNull(),
  add1: varchar("add1", { length: 256 }).notNull(),
  add2: varchar("add2", { length: 256 }).notNull(),
  add3: varchar("add3", { length: 256 }).notNull(),
  city: varchar("city", { length: 1024 }).notNull(),
  state: varchar("state", { length: 256 }).notNull(),
  zip: integer("zip").notNull(),
  postcode: varchar("postcode", { length: 256 }),
  province: varchar("province", { length: 256 }),
  country: varchar("country", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const customer = createTable("customer", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  middleName: varchar("middle_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 1024 }).notNull(),
  phone: integer("ph").notNull(),
  isUser: boolean("is_user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const order_products = createTable("order_products", {
  orderId: integer("order_id")
    .references(() => order.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => product.id)
    .notNull(),
});
