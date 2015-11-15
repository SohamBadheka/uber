/**
 * Created by Rushil on 11/14/2015.
 */

var adminSchema = require('./model/adminSchema');
var requestGen = require('./commons/responseGenerator');

var Admin = adminSchema.Admin;

exports.registerAdmin = function(msg, callback){

    var email = msg.email;
    var password = msg.password;
    var firstName = msg.firstName;
    var lastName = msg.lastName;
    var address = msg.address;
    var city = msg.city;
    var state = msg.state;
    var zipCode = msg.zipCode;
    var phoneNumber = msg.phoneNumber;

    var securityCode = msg.securityCode;

    var json_responses;
    if(securityCode === "mySeCrEtCoDe"){
        Admin.create({
            //id - autoIncrement by default by sequelize
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
            phoneNumber: phoneNumber
        }).then(function(){
            json_responses = requestGen.responseGenerator(200, {message: "admin registration successful" });
            callback(null, json_responses);
        });
    }
    else{
        json_responses = requestGen.responseGenerator(401, {message: "you are not authorized to register as Admin" });
        callback(null, json_responses);
    }
};

exports.loginAdmin = function(msg, callback){

    var email = msg.email;
    var password = msg.password;

    Admin.findOne({where: {email: email, password: password}}).then(function (user) {
        var json_responses;
        if(user){
            req.session.adminId =  user.id;
            json_responses = requestGen.responseGenerator(200, {message: 'admin login successful'});
        }
        else{
            json_responses = requestGen.responseGenerator(401, {message: 'admin login failed'});
        }
        callback(null, json_responses);
    });

};