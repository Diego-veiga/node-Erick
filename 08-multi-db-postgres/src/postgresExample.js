

async function main(){
    const Herois = driver.define('herois',{
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    },{
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })
    await Herois.sync()
    await Herois.create({
        nome: 'Teste',
        poder: 'Teste'
    })
    const result = await Herois.findAll({raw: true, atrributes: ['nome']})
    console.log('resul', result)
}
main()