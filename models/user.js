var pool = require('../db/connection');
var bcrypt = require('bcrypt');
var SALT_ROUNDS = 10;






//find by username
exports.findByUsername = function (username) {
  return query('SELECT * FROM users WHERE username = $1', [
    username
  ]).then(function(users){
    return users[0];
  }).catch(function(err){
    console.log('Error finding user by username', err);
  });

};
//find by ID
exports.findById= function (id) {
  return query('SELECT * FROM users WHERE id= $1', [
    id
  ]).then(function(users){
    return users[0];
  }).catch(function(err){
    console.log('Error finding user by id', err);
  });

};
//compare password

//make sure u return the promise itself and what's inside it
exports.findAndComparePassword = function (username, password){
  return exports.findByUsername(username).then(function(user){
    return bcrypt.compare(password, user.password).then(function(match){
      return {match: match, user: user};
    }).catch(function(err){
      return false;
    });
  });

};
exports.create = function (username, password, first_name, last_name, street, city, state, zip)  {
  return bcrypt.hash(password, SALT_ROUNDS).then(function(hash){
    return query('INSERT INTO users (username, password, first_name, last_name, street, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *' ,[
      username,
      hash,
      first_name,
      last_name,
      street,
      city,
      state,
      zip
    ]).then(function (users){
      return users[0];
    });
    }).catch(function(err){
      console.log("Error creating user", err);
  });

};

// exports.create('test', '1234').then(function (){
//   console.log('Created a test user');
// });

// //testing new register fields.
// exports.create('test1', '1234', 'user', 'hello', '1401 N Ave', 'Mpls', 'MN', 55431).then(function (){
//   console.log('Created a test user');
// });

// exports.findAndComparePassword('test', '1234').then(function(match){
//   console.log('passwords match', match);
// });


function query(sqlString, data){
  return new Promise(function(resolve, reject) {

    pool.connect(function(err,client,done){
      try {
        if (err){
          return reject(err);
        }

        client.query(sqlString, data, function(err,result){
          if(err){
            return  reject(err);
          }

          resolve(result.rows);
        });
      } finally {
        done();
      }
    });

  });
}
