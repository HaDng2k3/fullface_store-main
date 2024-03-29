var mysql = require('mysql');
var chai = require('chai');
const { v4: uuidv4 } = require('uuid');
var expect = chai.expect;

describe('Database connection test', function() {
  var db;

  beforeAll(function(done) {
    // Thiết lập kết nối với cơ sở dữ liệu
    db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'fullface_shop'
    });

    // Kết nối vào cơ sở dữ liệu
    db.connect(function(err) {
      if (err) {
        console.error("Database is failed to connect!", err);
        done(err); // Kết thúc test case và truyền lỗi nếu có lỗi kết nối
      } else {
        console.log('Database is connected successfully');
        done(); // Kết thúc test case nếu kết nối thành công
      }
    });
  });

  afterAll(function(done) {
    // Đóng kết nối cơ sở dữ liệu sau khi các test case hoàn thành
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

  it('should connect to the database successfully', function() {
    // Kiểm tra xem trạng thái kết nối đã được thiết lập hay chưa
    expect(db.state).to.equal('authenticated');
  });
});

// Hàm thêm người dùng vào cơ sở dữ liệu
function addUser(user, callback) {
  const { ho, ten, email, username, password } = user;
  const idUser = uuidv4(); // Tạo ID ngẫu nhiên cho người dùng

  const sql = "INSERT INTO users (idUser, ho, ten, email, username, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [idUser, ho, ten, email, username, password], function(err, result) {
      if (err) {
          console.error("Error adding user:", err);
          callback(err, null);
      } else {
          console.log("User added successfully");
          callback(null, result);
      }
  });
}
