
const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'john', password: 'user123', role: 'user' }
  ];
  
  function findUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
  }
  
  module.exports = { users, findUser };
  