// require the friends data file
var friends = require('../data/friends.js');

// routes
module.exports = function(app) {
    // API GET Requests
    app.get('/api/friends', function(req,res){
        res.json(friends);
    });
    // API POST Requests
    app.post("/api/friends", function(req, res) {
        var scoresArr = [];
        for (var i in req.body.scores){
            scoresArr.push(parseInt(req.body.scores[i]));
        }
        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores:scoresArr
        };
        //  compare the scores
        var scoreDiff = [];
        for (var i in friends){
            var compare = 0;
            for (var j in newFriend.scores){
                compare += Math.abs(newFriend.scores[j]-friends[i].scores[j])
            }
            scoreDiff.push(compare);
        }
        // find the best match
        var bestMatch = 0;
        for (var i in scoreDiff){
            if(scoreDiff[i] <= scoreDiff[bestMatch]){
                bestMatch = i;
            }
        }
        var bestFriend = friends[bestMatch];
        // return a JSON with the user's bestMatch to be used by the HTML.
        res.json(bestFriend);
        // save the user's data to the database
        friends.push(newFriend);
      });
};

