module.exports = function (sequelize, DataTypes) {
  const TvShow = sequelize.define('TvShow', {
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
    minEpisodes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true
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

  TvShow.associate = function (models) {
    TvShow.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return TvShow;
};
