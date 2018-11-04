let model = require("./user.schema");
let jwt = require("jsonwebtoken");
let util = require("../../utils");

let genTokenAuth = user => {
    user.password="";
    jwt.sign({
            user: user
        },
        "IngWeb_Auth", {
            expiresIn: "5m"
        },
        (err, token) => {
            return token;
        }
    );
};

let transfer = (req, res) => {
    Promise.all([
        util.getUser(model, req.body.origen),
        util.getUser(model, req.body.destiny)
    ]).then(result => {
        console.log(result);

        [origen, destino] = result;

        if (destino != null && origen != null) {
            let arrayValidation = [
                util.validBalance(origen.balance),
                util.validAmount(origen.balance, req.body.amount)
            ].filter(val => val === false);

            if (arrayValidation.length === 0) {
                destino.balance = parseInt(destino.balance) + parseInt(req.body.amount);
                origen.balance = parseInt(origen.balance) - parseInt(req.body.amount);
                console.log(destino.balance, origen.balance);
                Promise.all([
                    util.updateUser(model, destino),
                    util.updateUser(model, origen)
                ]).then(result => {
                    let tok = genTokenAuth(origen);
                    console.log(tok);
                    jwt.sign({
                            user: origen.username
                        },
                        "IngWeb_Auth", {
                            expiresIn: "5m"
                        },
                        (err, token) => {
                            return res.status(200).json({
                                msg: "succesful transaction",
                                token: token
                            });
                        }
                    );
                });
            } else {
                return res.status(401).json({
                    msg: "error"
                });
            }
        } else {
            return res.status(401).json({
                msg: "error"
            });
        }
    });
};

let consignment = (req, res) => {
    Promise.all([util.getUser(model, req.body.destiny)]).then(result => {
        console.log(result);
        [destino] = result;
        if (destino != null) {
            console.log(destino.balance);
            destino.balance = parseInt(destino.balance) + parseInt(req.body.amount);
            console.log(destino.balance);
            Promise.all([util.updateUser(model, destino)]).then(result => {
                let tok = genTokenAuth(destino);
                console.log(tok);
                jwt.sign({
                        user: destino.username
                    },
                    "IngWeb_Auth", {
                        expiresIn: "5m"
                    },
                    (err, token) => {
                        return res.status(200).json({
                            msg: "succesful transaction",
                            token: token
                        });
                    }
                );
            });
        } else {
            return res.status(401).json({
                msg: "error"
            });
        }
    });
};

let retreat = (req, res) => {
    Promise.all([util.getUser(model, req.body.origen)]).then(result => {
        console.log(result);
        [origen] = result;
        if (origen != null) {
            console.log(origen.balance);
            if (origen.balance >= req.body.amount) {
                origen.balance = parseInt(origen.balance) - parseInt(req.body.amount);
                console.log(origen.balance);
                Promise.all([util.updateUser(model, origen)]).then(result => {
                    let tok = genTokenAuth(origen);
                    console.log(tok);
                    jwt.sign({
                            user: origen.username
                        },
                        "IngWeb_Auth", {
                            expiresIn: "5m"
                        },
                        (err, token) => {
                            return res.status(200).json({
                                msg: "succesful transaction",
                                token: token
                            });
                        }
                    );
                });
            } else {
                return res.status(401).json({
                    msg: "No balance"
                });
            }
        } else {
            return res.status(401).json({
                msg: "error"
            });
        }
    })
}

module.exports = {
    transfer,
    consignment,
    retreat
};