var mysql = require("mysql");
const fs = require("fs");
const lodash = require("lodash");

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  supportBigNumbers: true
});

// To be optimized
exports.insertMunicipalities = function() {
  const QUERY = "INSERT INTO municipality (number, name) VALUES ?";
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

  municipalities = lodash.uniqWith(municipalities, lodash.isEqual);

  pool.getConnection(function(err, connection) {
    console.log("hey!!");
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
      console.log("result is? ", results);
    });
    console.log("qqq ", connection.sql);
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
  // console.log('aaaa ', postcodes);

  pool.getConnection(function(err, connection) {
    console.log("hey!!");
    if (err) {
      console.log("error!! ");
      return;
    }
    // make the query
    connection.query(QUERY, [postcodes], function(err, results) {
      connection.release();
      if (err) {
        console.log("error....", err);
        return;
      }
      console.log("result is? ");
    });
    // console.log('qqq ', connection.sql);
  });
};

exports.insertMunicipalitiesHasPostcode = function() {
  const query =
    "INSERT INTO `municipality_has_postcode` (`municipality_number`, `pct_in_municipality`, `postcode_id`) VALUES ?";
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
    $QUERY =
      "INSERT INTO municipality_has_postcode(" +
      "municipality_number, postcode_supplement, postcode_number, pct_in_municipality) VALUES?";
    console.log("hey!!");
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
    // console.log('qqq ', connection.sql);
  });
  // console.log('ermm ', municipalities.splice(0, 10));
  // VALUES ('4001', '55', '5538');
};

exports.getAddressByPostcodeNumber = function(number) {
  // Return new promise
  return new Promise(function(resolve, reject) {
    var val;
    // reject();
    pool.getConnection(function(err, connection) {
      $QUERY =
        "SELECT DISTINCT p.name as location, p.number as postcode, m.name as municipality_name, m.number as municipality_number FROM municipality_has_postcode mp INNER JOIN postcode p on p.number=mp.postcode_number INNER JOIN municipality m on m.number = mp.municipality_number WHERE mp.postcode_number = ?";
      if (err) {
        console.log("error!! ");
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
      // console.log('qqq ', results);
    });
  });
};

exports.getMunicipality = function() {
  return new Promise(function(resolve, reject) {
    var val;
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
