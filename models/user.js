var bcrypt = require('bcryptjs');

module.exports = function (sequelize,Datatypes) {
    var User = sequelize.define('user', {
        id : {
            type: Datatypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        facebookId: {
            type: Datatypes.BIGINT
        },
        username: {
            type: Datatypes.STRING,
            unique: true
        },
        name : {
            type : Datatypes.STRING,
            allowNull : false
        },
        password : {
            type : Datatypes.STRING
        },
        email : {
            type : Datatypes.STRING,
            allowNull : false
        },
        profileImage : {
            type : Datatypes.STRING,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        hooks : {
            beforeCreate: function (user, options) {
                  user.password = bcrypt.hashSync(user.password,10) ;
            }
        }
    });

    User.sync();
    return User
}