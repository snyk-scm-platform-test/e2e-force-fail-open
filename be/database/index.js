const mysql = require("mysql");
const fs = require("fs");
const uniqWith = require("lodash").uniqWith;
const isEqual = require("lodash").isEqual;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  supportBigNumbers: true
});

// The following three functions are extremely WET,
// ugly, reptitive and whats not. These are scripts which I used
// to get the data into the database. I did not optimize them
exports.insertMunicipalities = function() {
  let fieldNames;
  let GDENR;
  let GDENAMK;
  var municipalities = fs
    .readFileSync("/Users/matthewbarbara/Downloads/PLZ6.csv", "utf8")
    .trim()
    .split("\n")
    .map((line, i) => {
      line = line.trim();
      if (i === 0) {
        fieldNames = line.split(",");
        GDENR = fieldNames.indexOf("GDENR");
        GDENAMK = fieldNames.indexOf("GDENAMK");
        return false;
      }
      return [line.split(",")[GDENR], line.split(",")[GDENAMK]];
    })
    .filter(line => line);
  municipalities = uniqWith(municipalities, isEqual);

  pool.getConnection(function(err, connection) {
    const QUERY = "INSERT INTO municipality (number, name) VALUES ?";
    if (err) {
      console.log(err);
      return;
    }
    // make the query
    connection.query(QUERY, [municipalities], function(err, results) {
      connection.release();
      if (err) {
        console.log(err);
        return;
      }
    });
  });
};
exports.insertPostcodes = function() {
  const QUERY = "INSERT INTO postcode (number, supplement, name) VALUES ?";
  let fieldNames;
  let PLZ4;
  let PLZZ;
  let PLZNAMK;
  var postcodes = fs
    .readFileSync("/Users/matthewbarbara/Downloads/PLZ6.csv", "utf8")
    .trim()
    .split("\n")
    .map((line, i) => {
      line = line.trim();
      if (i === 0) {
        fieldNames = line.split(",");
        PLZ4 = fieldNames.indexOf("PLZ4");
        PLZZ = fieldNames.indexOf("PLZZ");
        PLZNAMK = fieldNames.indexOf("PLZNAMK");
        return false;
      }
      line = line.split(",");
      return [line[PLZ4], line[PLZZ], line[PLZNAMK]];
    })
    .filter(line => line);

  pool.getConnection(function(err, connection) {
    if (err) {
      console.log("error!! ", error);
      return;
    }
    // make the query
    connection.query(QUERY, [postcodes], function(err, results) {
      connection.release();
      if (err) {
        console.log("error....", err);
        return;
      }
    });
  });
};
exports.insertMunicipalitiesHasPostcode = function() {
  let fieldNames;
  let PLZ4;
  let PLZZ;
  let GDENR;
  let PCT;
  var municipalities = fs
    .readFileSync("/Users/matthewbarbara/Downloads/PLZ6.csv", "utf8")
    .trim()
    .split("\n")
    .map((line, i) => {
      line = line.trim();
      if (i === 0) {
        fieldNames = line.split(",");
        GDENR = fieldNames.indexOf("GDENR");
        PLZZ = fieldNames.indexOf("PLZZ");
        PLZ4 = fieldNames.indexOf("PLZ4");
        PCT = fieldNames.indexOf("%_IN_GDE");
        return false;
      }
      line = line.split(",");
      return [line[GDENR], line[PLZZ], line[PLZ4], line[PCT]];
    })
    .filter(line => line);

  pool.getConnection(function(err, connection) {
    const QUERY =
      "INSERT INTO municipality_has_postcode(" +
      "municipality_number, postcode_supplement, postcode_number, pct_in_municipality) VALUES?";
    if (err) {
      console.log("error!! ");
      return;
    }
    // make the query
    connection.query($QUERY, [municipalities], function(err, results) {
      connection.release();
      if (err) {
        console.log(err);
        return;
      }
      console.log("result is? ");
    });
  });
};
// End of ugly code :)

exports.getAddressByPostcodeNumber = function(number) {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      $QUERY =
        "SELECT DISTINCT p.name as location, p.number as postcode, m.name as municipality_name, m.number as municipality_number FROM municipality_has_postcode mp INNER JOIN postcode p on p.number=mp.postcode_number INNER JOIN municipality m on m.number = mp.municipality_number WHERE mp.postcode_number = ?";
      if (err) {
        reject(err);
        return;
      }
      connection.query($QUERY, [number], function(err, results) {
        connection.release();
        if (err) {
          console.log("error....", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
};

// not needed
exports.getMunicipality = function() {
  return new Promise(function(resolve, reject) {
    // reject();
    pool.getConnection(function(err, connection) {
      $QUERY = "SELECT name FROM `municipality`";
      if (err) {
        console.log("error!! ");
        return;
      }
      connection.query($QUERY, function(err, results) {
        connection.release();
        if (err) {
          console.log("error....", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
      // console.log('qqq ', results);
    });
  });
};
