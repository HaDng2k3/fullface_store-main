const mysql = require('mysql2');
const config = require('./jest.config.yml');

// Tạo kết nối MySQL từ thông tin trong tệp YAML
const db = mysql.createConnection(config.dbConnection);

// Kết nối vào cơ sở dữ liệu
db.connect(function(err) {
  if (err) {
    console.error("Database is failed to connect!", err);
  } else {
    console.log('Database is connected successfully');
  }
});

// Đóng kết nối cơ sở dữ liệu sau khi các test case hoàn thành
afterAll(function(done) {
  db.end(function(err) {
    if (err) {
      console.error("Error closing database connection", err);
      done(err);
    } else {
      console.log("Database connection closed");
      done();
    }
  });
});
