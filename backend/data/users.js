import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@proshop.com",
    password: bcrypt.hashSync("Admin123", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("John123", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("Jane123", 10),
  },
];

export default users;