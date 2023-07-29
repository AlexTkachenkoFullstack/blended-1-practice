const path = require("path");
const fs = require("fs/promises");
// console.log(__dirname);
// console.log(path.join());
// console.log(path.resolve());
const usersPath = path.join(__dirname, "..", "db", "users.json");
class FileOperations {
  constructor(path) {
    this.path = path;
  }
  read = async () => {
    const file = await fs.readFile(this.path);
    return JSON.parse(file);
  };

  display = async () => {
    const users = await this.read();
    console.table(users);
  };

  create = async (data) => {
    return await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  };

  update = async (data) => {
    const users = await this.read();
    users.push(data);
    return await this.create(users);
  };

  remove = async () => {
    return await fs.unlink(this.path);
  };

  findAndUpdate = async (id, data) => {
    const users = await this.read();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      console.log("We did not find this user");
      return null;
    }
    users[index] = { id, ...data };
    return await this.create(users);
  };

  findAndRemove = async (id) => {
    const users = await this.read();
    const newUsers = users.filter((user) => user.id !== id);
    if (users.length === newUsers.length) {
      console.log("No this user");
      return null;
    }
    return this.create(newUsers);
  };
}
const file = new FileOperations(usersPath);
// file.display();
const users = [
  {
    id: "1",
    name: "Alex",
  },
  {
    id: "2",
    name: "Julia",
  },
  {
    id: "3",
    name: "Kostia",
  },
];
// file.create(users);
// file.update({
//   id: "4",
//   name: "Andriy",
// });

// file.remove()
// file.findAndUpdate("27", { name: "Julia Karas" });
file.findAndRemove("5");

// file.replace()-повністю удаляє із db/users.json та переносить в папку alex/users.json
