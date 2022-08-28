var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

const AuthModel = require("./authModel");

const login = async (req, res) => {
    try {

        const password = req.body.password;
        const user = await AuthModel.findOne({ email: req.body.email });

        if (!user) {
            let responseData = {
                status: 200,
                message: "Email not found",
                data: user,
            };
            res.json(responseData);
            return;
        }
        const passwordCheck = await bcrypt.compareSync(password, user.password)
        if (!passwordCheck) {
            let result = {
                status: 200,
                message: "Password is not correct",
            };
            res.json(result);
            return;
        }

        var token = jwt.sign(
            { email: user.email, firstName: user.firstName, lastName: user.lastName, phone: user.phone },
            process.env.privateKey
        );
        let response = {
            status: 200,
            message: "successfully login",
            token,
            data: user,
        };
        res.json(response);
    } catch (error) {
        let response = {
            status: 401,
            message: error,
        };
        res.json(response);
    }
};

const signup = async (req, res) => {
    if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.phone ||
        !req.body.email ||
        !req.body.password
    ) {
        let response = {
            status: 201,
            message: "params are required",
        };
       return res.json(response);
    }
console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    // logic createPost
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: hash
    };

    const user = new AuthModel(newUser);
    try {
        await user.save();
        var token = jwt.sign(
            { email: user.email, firstName: user.firstName, lastName: user.lastName, phone: user.phone},
            process.env.privateKey
            );
            
            console.log(token);
            
        let response = {
            status: 400,
            message: "successfully signup",
            token
        };
        res.json(response);
    } catch (error) {
        let response = {
            status: 200,
            message: error,
        };
        res.json(response);
    }
};
const isUser = async (req, res) => {
    try {
        var token = req.body.token

        if (!token) {
            let responseData = {
                status: 200,
                message: "token not found",
            };
            return res.json(responseData);
            
        }
        var validToken = await jwt.verify(token, process.env.privateKey);
        var user = await AuthModel.findOne({ email: validToken.email })

        if (user) {
            let response = {
                status: 400,
                message: "successfully login",
                token: token,
                data: user,
            };
            res.json(response)
        } else {
            let response = {
                status: 201,
                message: "User not found",
            };
            res.json(response);
        }

    } catch (error) {
        let response = {
            status: 201,
            message: error,
        };
        res.json(response);
    }
};

module.exports = {
    login,
    signup,
    isUser,
};