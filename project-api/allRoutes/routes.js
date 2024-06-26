const routes = require("express").Router();

// localhost:8080/api/city

routes.use("/api/city", require("../controllers/CityController"));

routes.use("/api/signup", require("../controllers/SignupController"));
routes.use("/api/userauth", require("../controllers/UserAuthController"));
routes.use("/api/adminauth", require("../controllers/AdminAuthController"));

routes.use("/api/destination", require("../controllers/DestinationController"));
routes.use("/api/hotels", require("../controllers/HotelsController"));
routes.use("/api/user", require("../controllers/UserController"));
routes.use("/api/product", require("../controllers/ProductController"));


module.exports = routes;