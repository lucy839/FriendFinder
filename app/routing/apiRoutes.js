var friends = require('../data/friends.js');

//  2 routes 
module.exports = function(app) {
    app.get('/api/friends', function(req,res){
        res.json(friends);
    });
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
         
        var scoreDiff = [];
        for (var i in friends){
            var compare = 0;
            for (var j in newFriend.scores){
                compare += Math.abs(newFriend.scores[j]-friends[i].scores[j])
            }
            scoreDiff.push(compare);
        }
        var bestMatch = 0;
        for (var i in scoreDiff){
            if(scoreDiff[i] <= scoreDiff[bestMatch]){
                bestMatch = i;
            }
        }
        
        var bestFriend = friends[bestMatch];
        res.json(bestFriend);
        friends.push(newFriend);
      });
};

