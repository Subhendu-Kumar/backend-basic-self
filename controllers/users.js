import { v4 as uuidv4 } from "uuid";

let users = [
  {
    id: uuidv4(),
    firstName: "John",
    lastName: "Doe",
    age: 25,
  },
];

export const getUsers = (req, res) => {
  res.status(200).send(users);
};

export const createUser = (req, res) => {
  const user = req.body;
  const newUser = { ...user, id: uuidv4() };
  users.push(newUser);
  res
    .status(201)
    .send(
      `User with firstName ${user.firstName} has been added to the database.`
    );
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (foundUser) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send(`User with ID ${id} not found.`);
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).send(`User with ID ${id} deleted.`);
  } else {
    res.status(404).send(`User with ID ${id} not found.`);
  }
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const user = users.find((user) => user.id === id);
  if (user) {
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (age) {
      user.age = age;
    }
    res.status(200).send(`User with ID ${id} has been updated.`);
  } else {
    res.status(404).send(`User with ID ${id} not found.`);
  }
};
