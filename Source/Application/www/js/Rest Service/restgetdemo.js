/**
 * Created by sruthigelivi on 3/19/17.
 */
var express = require('express');
var app = express();
var request = require('request');
app.get('/getPlace', function (req, res) {
  var result={
    'mood': []
  };

  var param=req.query.inputtext;
  console.log(param);

  request('https://api.uclassify.com/v1/prfekt/mood/Classify?readkey=LBjvgm3r7lHZ&text='+param, function (error, response, body) {
    //Check for error
    if(error){
      return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
      return console.log('Invalid Status Code Returned:', response.statusCode);
    }
    //All is good. Print the body
    body = JSON.parse(body);
  //  var ven = body.data;
   /* for(var i=0;i<ven.length;i++)
    {
      console.log("'name': " +ven[i].happy+",'address':"+ven[i].upset.toString());
      result.venue.push({'name': ven[i].happy,
        'address':ven[i].upset.toString()});
    }*/
   console.log("'happy': "+body.happy+",'upset':"+body.upset);
   result.mood.push({'happy':body.happy,'upset':body.upset});
    res.contentType('application/json');
    res.write(JSON.stringify(result));
    res.end();
  });
  console.log(result);


})

app.get('/getRest', function (req, res) {
  var result={
    'dictionary': []
  };

  var param=req.query.inputtext;

  request('http://api.pearson.com/v2/dictionaries/entries?headword='+param, function (error, response, body) {
    //Check for error
    if(error){
      return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
      return console.log('Invalid Status Code Returned:', response.statusCode);
    }
    //All is good. Print the body
    body = JSON.parse(body);
    var ven = body.data;
    /*for(var i=0;i<ven.length;i++)
     {
     console.log("'name': " +ven[i].name+",'address':"+ven[i].location.formattedAddress.toString());
     result.venue.push({'name': ven[i].name,
     'address':ven[i].location.formattedAddress.toString()});
     }*/
    console.log("'text': "+body.results[2].senses[0].definition+",'definition':"+body.results[2].senses[0].examples[0].text);
    result.dictionary.push({'text':body.results[2].senses[0].definition,'definition':body.results[2].senses[0].examples[0].text});

    console.log(body+"");
    res.contentType('application/json');
    res.write(JSON.stringify(result));
    res.end();
  });
  console.log(result);


})

var server = app.listen(8061, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
})
