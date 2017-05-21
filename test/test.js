var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();

chai.use(chaiHttp);

// Need to run "export API_URL=ec0cc812a67bdf0f980e49db6f3fca85" before test execution

describe('yummyli', function() {
  
  it('GET - General index page', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  it('GET - General team page', function(done) {
    chai.request(app)
      .get('/team')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  it('GET - General 404 page', function(done) {
    chai.request(app)
      .get('/32590rw9807swgiosdgskljdgsdkjlghw3o295y2398y5rtw9efohsdflkhsdlgoha98p45y34985yht')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Search in general index page
  it('GET - Search in general index page', function(done) {
    chai.request(app)
      .get('/q?search=bacon&page=1')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
    
  // Show recipe
  it('GET - Show recipe page', function(done) {
    chai.request(app)
      .get('/recipe/35107')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Show Login page
  it('GET - Show Login page', function(done) {
    chai.request(app)
      .get('/auth/login')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Show Signup page
  it('GET - Show Signup page', function(done) {
    chai.request(app)
      .get('/auth/signup')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Show Forgot page
  it('GET - Show Forgot page', function(done) {
    chai.request(app)
      .get('/auth/forgot')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Show Profile page
  it('GET - Show User Profile page', function(done) {
    chai.request(app)
      .get('/profile/5912c571231953191400b517')
      .auth('trvlbids@gmail.com', '123')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
   
  // Show User wishlist page
  it('GET - Show User wishlist page', function(done) {
    chai.request(app)
      .get('/profile/5912c571231953191400b517/wishlist')
      .auth('trvlbids@gmail.com', '123')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Show User Profile update page
  it('GET - Show User Profile update page', function(done) {
    chai.request(app)
      .get('/profile/5912c571231953191400b517/update')
      .auth('trvlbids@gmail.com', '123')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // PUT User Profile update page
  it('PUT - Update User Profile page', function(done) {
    chai.request(app)
      .put('/profile/5912c571231953191400b517/update')
      .field('_method', 'put')
      .field('name', 'Mike')
      .field('surname', 'Penzin')
      .field('location', 'Haifa')
      .field('bio', 'Love is good')
      .auth('trvlbids@gmail.com', '123')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Login
  it('POST - Perform Loggin', function(done) {
    chai.request(app)
      .post('/auth/login')
      .send({username: 'trvlbids@gmail.com', passsword: '123'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Signup
  it('POST - Perform Signup', function(done) {
    chai.request(app)
      .post('/auth/signup')
      .field('username', 'mikekeie@gmail.com')
      .field('password', '12333')
      .field('name', 'Mike')
      .field('surname', 'Penzin')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Add item to wishlist
  it('PUT - Add item to wishlist', function(done) {
    chai.request(app)
      .put('/wishlist/5912c571231953191400b517/2fac5e')
      .field('_method', 'put')
      .field('id', '2fac5e')
      .field('title', 'My Moms Muffins')
      .field('image_url', 'http://static.food2fork.com/muffins2f9ab.jpg')
      .field('publisher', 'The Pioneer Woman')
      .auth('trvlbids@gmail.com', '123')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Remove item to wishlist
  it('PUT - Remove item to wishlist', function(done) {
    chai.request(app)
      .put('/wishlist/5912c571231953191400b517/2fac5e/remove')
      .field('_method', 'put')
      .field('id', '2fac5e')
      .field('title', 'My Moms Muffins')
      .field('image_url', 'http://static.food2fork.com/muffins2f9ab.jpg')
      .field('publisher', 'The Pioneer Woman')
      .auth('trvlbids@gmail.com', '123')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  //=========================
  // Troubleshooting
  //=========================
  
  // Search in general index page - wrong search
  it('GET - Search in general index page - wrong search', function(done) {
    chai.request(app)
      .get('/q?search=fdbgzg,fdgdfgdfg,gdfgdfgdfg&page=1')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Show recipe - bad recipe id
  it('GET - Show recipe page - bad recipe id', function(done) {
    chai.request(app)
      .get('/recipe/5463467')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  
  // Add item to wishlist - without being loggedin
  it('PUT - Add item to wishlist - without being loggedin', function(done) {
    chai.request(app)
      .post('/wishlist/5912c571231953191400b517/2fac5e')
      .field('_method', 'put')
      .field('id', '2fac5e')
      .field('title', 'My Moms Muffins')
      .field('image_url', 'http://static.food2fork.com/muffins2f9ab.jpg')
      .field('publisher', 'The Pioneer Woman')
      .end(function(err, res){
        res.should.have.status(404);
        res.should.be.html;
        done();
      });
  });
  
  // Remove item to wishlist - without being loggedin
  it('PUT - Remove item to wishlist - without being loggedin', function(done) {
    chai.request(app)
      .post('/wishlist/5912c571231953191400b517/2fac5e/remove')
      .field('_method', 'put')
      .field('id', '2fac5e')
      .field('title', 'My Moms Muffins')
      .field('image_url', 'http://static.food2fork.com/muffins2f9ab.jpg')
      .field('publisher', 'The Pioneer Woman')
      .end(function(err, res){
        res.should.have.status(404);
        res.should.be.html;
        done();
      });
  });
  
    // Wrong Login
  it('POST - Perform Bad Loggin', function(done) {
    chai.request(app)
      .post('/login')
      .field('username', 'dfgddfg@fgdfg.com')
      .field('password', '12dfgdfg3')
      .end(function(err, res){
        res.should.have.status(404);
        res.should.be.html;
        done();
      });
  });
  
});