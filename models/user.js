/* jshint indent: 2 */
var crypto = require('crypto');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
            primaryKey: true,
            autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
    }, {

        tableName: 'user',
        timestamps: false,
        freezeTableName: true,
        instanceMethods: {
            toJSON: function () {
                var values = this.get();
                delete values.hashedPassword;
                delete values.salt;
                return values;
            },
            makeSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            authenticate: function (plainText) {
                return plainText === this.password;
                //return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
            },
            encryptPassword: function (password, salt) {
                if (!password || !salt) {
                    return '';
                }
                salt = new Buffer(salt, 'base64');
                return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
            }
        }

  });
};
