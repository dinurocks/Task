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
export const createUserContactTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS UserContact (ID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Mobile TEXT, Address TEXT);',
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

export const upsertUserContact = (email, mobile, address) => {
  db.transaction(tx => {
    // First, check if a contact exists for the provided email
    tx.executeSql(
      'SELECT * FROM UserContact WHERE Email = ?;',
      [email],
      (tx, results) => {
        if (results.rows.length > 0) {
          // If a contact exists, update it
          tx.executeSql(
            'UPDATE UserContact SET Mobile = ?, Address = ? WHERE Email = ?;',
            [mobile, address, email],
            (tx, updateResults) => {
              console.log('Contact updated:', updateResults.rowsAffected);
            },
            error => {
              console.error('Update error:', error);
            },
          );
        } else {
          // If no contact exists, insert a new one
          tx.executeSql(
            'INSERT INTO UserContact (Email, Mobile, Address) VALUES (?,?,?);',
            [email, mobile, address],
            (tx, insertResults) => {
              console.log('Contact inserted:', insertResults.rowsAffected);
            },
            error => {
              console.error('Insert error:', error);
            },
          );
        }
      },
      error => {
        console.error('Select error:', error);
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

export const getUserContact = (email, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM UserContact WHERE Email = ?;',
      [email],
      (tx, results) => {
        if (results.rows.length > 0) {
          // If a contact is found, return it via the callback
          const contact = results.rows.item(0);
          callback(null, contact);
        } else {
          // If no contact is found, return null or a suitable message
          callback('No contact found for the given email', null);
        }
      },
      error => {
        console.error('Select error:', error);
        callback(error, null); // Pass the error to the callback
      },
    );
  });
};
