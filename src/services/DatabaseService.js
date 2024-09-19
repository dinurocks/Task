import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'UserDatabase.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error('Database error:', error);
  },
);

export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Name TEXT, SignupDate TEXT);',
    );
  });
};

export const insertUser = (email, name) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Users (Email, Name, SignupDate) VALUES (?,?,?);',
      [email, name, moment().format('DD-MM-YYYY')],
      (tx, results) => {
        console.log('User inserted:', results.rowsAffected);
      },
      error => {
        console.error('Insert error:', error);
      },
    );
  });
};

export const getUsers = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Users;', [], (tx, results) => {
      const rows = results.rows;
      let users = [];
      for (let i = 0; i < rows.length; i++) {
        users.push(rows.item(i));
      }
      callback(users);
    });
  });
};

export const updateUser = (email, name) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Users SET Name = ? WHERE Email = ?;',
      [name, email],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('User updated:', results.rowsAffected);
        } else {
          console.log('No user found with the given email.');
        }
      },
      error => {
        console.error('Update error:', error);
      },
    );
  });
};
