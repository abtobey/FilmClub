module.exports = function (sequelize, DataTypes) {
  const Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    streamService: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        max: 10,
        min: 0
      }
    },
    writeUp: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 240]
      }
    },
    recommend: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Movie.associate = function (models) {
    Movie.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Movie;
};
