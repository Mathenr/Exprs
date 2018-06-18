let controller = require("./controller");
let auth = require("./auth");

module.exports = function(app){
    app.post("/api/login", auth.login);
    app.post("/api/users", controller.setUser);
    app.post("/api/posts", controller.setPost);
    app.get("/api/users", controller.getUsers);
    app.get("/api/users/:id", controller.getUserDetails);
    app.get("/api/posts", controller.getPosts);
}