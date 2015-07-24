//
// tests.js
//

var request = require('request');
var expect = require('chai').expect;
var cheerio = require("cheerio");
var chai = require("chai");
var mocha = require("mocha");
var baseUrl = 'http://localhost:3000';

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

//Test 1 - GET
describe('Idea Hunt', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('http://localhost:3000', function(err, res, body) {
      //Positive case
      expect(res.statusCode).to.equal(200)
      //Negative case
      //expect(res.statusCode).to.equal(300)
      done();
    })
  })
});

describe('Idea page', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('http://localhost:3000/ideas/55b151ab5032814c6df00017', function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      // expect(res.statusCode).to.equal(300)
      done();
    });
  });
});

describe('Idea Hunt', function() {
  it('The title header should include "The Product Hunt for Ideas"', function(done) {
    request(baseUrl, function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('title').text();
      expect(title).to.equal("The Product Hunt for Ideas");
      // expect(title).to.equal('Moogle');
      done();
    });
  });
});

describe('Idea Hunt', function() {
  it('The h2 header should include "Submit your idea!"', function(done) {
    request(baseUrl, function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('#submitscreen h2').text();
      expect(title).to.equal("Submit your idea!");
      // expect(title).to.equal('Moogle');
      done();
    });
  });
});

describe('Idea Hunt', function() {
  it('The h2 header should include "Submit your idea!"', function(done) {
    request(baseUrl, function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('#signupscreen h2').text();
      expect(title).to.equal("Please Sign Up!");
      // expect(title).to.equal('Moogle');
      done();
    });
  });
});

