const User = require('../models/users');
//TODO refactoring code and test request
exports.getAllUsers = (req, res) => {
    User.find({}, (users) => {
        res.send(users)
    })
};

exports.getUser = (req, res) => {
    const{id} = req.params;

    User.findById({_id: id}, (user) => {
        res.send(user)
    })

};

 //TODO here
 exports.addUser = (req, res) => {
    const{name,
          surname,
          fathername,
          city,
          street,
          build,
          flat,
          role,
          email,
          password,
          date } = req.body;

        User.create({   name: name,
                        surname: surname,
                        fathername: fathername,
                        city: city,
                        street: street,
                        build: build,
                        flat: flat,
                        role: role,
                        email: email,
                        password: password,
                        date: date
                    }, (err, user) => {
                        if(err) return console.error(err);
                        console.log(`Object ${user} was save`);
                        res.send(user)
                    })
};

exports.deleteUser = (req, res) => {
    const{id} = req.params;
    User.findOneAndDelete({_id: id}, (err, user) => {
        if(err) return console.log(err)
        console.log(`Object ${user} was delete`)
    })

};

exports.changeUser = (req, res) => {
    const{id} = req.params;
//TODO here
    User.findOneAndUpdate({_id: id}, {   name: name,
        surname: surname,
        fathername: fathername,
        city: city,
        street: street,
        build: build,
        flat: flat,
        role: role,
        email: email,
        password: password,
        date: date
    }, (err, user) => {
        if(err) return console.log(err);
        console.log(`Object ${user} was update`)
        res.send(user)
    })
};


