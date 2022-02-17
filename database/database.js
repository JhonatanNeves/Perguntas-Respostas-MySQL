const Sequeize = riquere('sequelize');

const connection = new Sequeize('guiaperguntas', 'root', 'g36segopro', {
    host: 'localhost',
    dialect: 'mysql'
});