class UsersRepository {
  constructor() {
    this.users = [];
    this.createUser = this.createUser.bind(this);

    this.nextId =
      this.users.length !== 0
        ? Math.max(...this.users.map((user) => user.id)) + 1
        : 0;
  }

  createUser(email, password, activationLink) {
    const newUser = {
      email,
      password,
      isActivated: false,
      activationLink,
      id:this.nextId
    };
    this.users.push(newUser);
    this.nextId++;
    return newUser;
  }
}
module.exports=  new UsersRepository();
