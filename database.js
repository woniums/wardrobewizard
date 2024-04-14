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
// Dont mess with the strings inside!!!
// Function to insert image URI and tag into the database
export const insertImageWithTag = (uri, tag) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id FROM images WHERE uri = ? AND tag = ?",
      [uri, tag],
      (_, result) => {
        if (result.rows.length > 0) {
          // If the URI and tag combination already exists, update the tag
          const imageId = result.rows.item(0).id;
          tx.executeSql(
            "UPDATE images SET tag = ? WHERE id = ?",
            [tag, imageId],
            (_, rowsAffected) => {
              if (rowsAffected > 0) {
                console.log("Updated tag for image with URI:", uri);
              } else {
                console.log("No rows were updated.");
              }
            },
            (_, error) => {
              console.error("Error updating tag:", error);
            }
          );
        } else {
          // If the URI and tag combination doesn't exist, insert a new row
          tx.executeSql(
            "INSERT INTO images (uri, tag) VALUES (?, ?)",
            [uri, tag],
            (_, { insertId }) => {
              console.log("Inserted new image with URI and tag:", uri, tag);
            },
            (_, error) => {
              console.error("Error inserting new entry:", error);
            }
          );
        }
      },
      (_, error) => {
        console.error("Error in the database", error);
      }
    );
  });
};
// Will be usual later on to get specific images based on there tags
export const getURIsByTag = (tag, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT uri FROM images WHERE tag = ?",
      [tag],
      (_, result) => {
        const uris = [];
        //searchs through each row of the database
        for (let i = 0; i < result.rows.length; i++) {
          uris.push(result.rows.item(i).uri);
        }
        //callback = return
        //Returns it as an array so will have to unpack on return
        callback(uris);
      },
      (_, error) => {
        //Fallback incase the user has no picture with that tag
        console.error("Error extracting URIs / None Exist:", error);
        callback([]);
      }
    );
  });
};
