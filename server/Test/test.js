// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const app =require('../index')
const User = require('../model/User')

// Configure chai
const { expect } = chai;
chai.use(chaiHttp);

describe("Server", () => {
    describe("GET /", () => {
        it("welcomes user to the api", (done) => {
             chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.equals("Welcome to Server");
                    done();
                });
         });
    });
});


describe("User actions", () => {
    describe("POST & GET /", () => {

        let token 

        it("Sucessful signUp", (done) => {
            const user = {
                email: 'Test@Test.com',
                password: 'Sqwepop!213',
                username: 'Adminstrator'
            }

            chai.request(app)
               .post('/user/signup')
               .send(user)
               .end((err, res) => {
                   expect(res).to.have.status(201);
                   expect(res.body).be.a('object');
                   done();
               });
        });

        it("Duplicated email signUp", (done) => {
            const user = {
                email: 'Test@Test.com',
                password: 'Sqwepop!213',
                username: 'Adminstrator'
            }

            chai.request(app)
               .post('/user/signup')
               .send(user)
               .end((err, res) => {
                   expect(res).to.have.status(400);
                   expect(res.body).be.a('object');
                   done();
               });
        });

        it("Failed to signup with missing email, password or username", (done) => {
            const user = {
                email: '',
                password: '',
                username: ''
            }

            chai.request(app)
            .post('/user/signup')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).be.a('object');
                done();
            });
        });

        it("Failed to signup with missing password or username", (done) => {
            const user = {
                email: 'testing@testing.com',
                password: '',
                username: ''
            }

            chai.request(app)
            .post('/user/signup')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).be.a('object');
                done();
            });
        });

        it("Failed to signup with missing username", (done) => {
            const user = {
                email: 'testing@testing.com',
                password: 'Sqwepop!213',
                username: ''
            }

            chai.request(app)
            .post('/user/signup')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).be.a('object');
                done();
            });
        });





        it("User login with incorrect email", (done) => {
            const user = {
                email: 'Testing@Test.com',
                // password: 'Sqwepop!213',
            }
            chai.request(app)
               .post('/user/login')
               .send(user)
               .end((err, res) => {
                   token = res.body.token
                   expect(res).to.have.status(400);
                   expect(res.body).be.a('object');
                   expect(res.body.message).to.equals("User Not Exist");
                   done();
               });
        });

        it("User login with incorrect password", (done) => {
            const user = {
                email: 'Test@Test.com',
                password: 'Sqwepop!21331',
            }
            chai.request(app)
               .post('/user/login')
               .send(user)
               .end((err, res) => {
                   token = res.body.token
                   expect(res).to.have.status(400);
                   expect(res.body).be.a('object');
                   expect(res.body.message).to.equals("Incorrect Password");
                   done();
               });
        });

        it("User sucessfully login", (done) => {
            const user = {
                email: 'Test@Test.com',
                password: 'Sqwepop!213',
            }

            chai.request(app)
               .post('/user/login')
               .send(user)
               .end((err, res) => {
                   token = res.body.token
                   expect(res).to.have.status(200);
                   expect(res.body).be.a('object');
                   expect(res.body.token).be.a('string');
                   done();
               });
        });


        it("User retrieve profile information with authorization token", (done) => {
            chai.request(app)
                .get('/user/me')
                .set('authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('object');
                    expect(res.body.id).be.a('string');
                    expect(res.body.username).be.a('string');
                    expect(res.body.email).be.a('string');
                    done();
                });
        });

        it("User retrieve profile information with wrong authorization token", (done) => {
            
            let wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            
            chai.request(app)
                .get('/user/me')
                .set('authorization', 'Bearer ' + wrongToken)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).be.a('object');
                    expect(res.body.error).be.a('string');
                    expect(res.body.error).to.equals("Please authenticate!");
                    done();
                });
        });


        it("User succesfully logout", (done) => {
            chai.request(app)
                .get('/user/logout')
                .set('authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.equals("Account successfully logged out");
                    done();
                });
        });

        

        // Remove test@test account from db
        after((done) => {
            User.findOneAndRemove({ email: 'Test@Test.com' })
            .then(() => done());
        });
    });
});



// sign up

// login 

//  get me profile