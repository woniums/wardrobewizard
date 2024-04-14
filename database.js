import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");

// Function that initialize the database and create tables
export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS images (
           id INTEGER PRIMARY KEY,
           uri TEXT NOT NULL,
           tag TEXT NOT NULL
         );`
    );
  });
};

// Function to insert image URI and tag into the database
export const insertImageWithTag = (uri, tag) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO images (uri, tag) VALUES (string, string)",
      [uri, tag],
      (_, { insertId }) => {
        console.log("Inserted image with ID:", insertId);
      },
      (_, error) => {
        console.error("Error inserting image:", error);
      }
    );
  });
};
