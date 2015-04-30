module.exports = {
    setUp : setUp
};

function setUp(paths, app){
    paths.forEach(function(path){
      app.get(path, function(req, res, next){
        res.render("index");
      });
    });
}