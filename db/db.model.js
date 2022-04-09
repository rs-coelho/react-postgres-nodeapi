module.exports = (sequelize, Sequelize) => {
	const Cadastro = sequelize.define('cadastro', {	
		codPessoa:{
			type: Sequelize.INTEGER(10000),
            primaryKey: true,
			autoIncrement: true
		},
	  	nome: {
			type: Sequelize.STRING(100),
			allowNull: false
	  	},
		telefone: {
			type: Sequelize.INTEGER(11),
			allowNull: false
	  	},
	  	senhaEncriptada: {
		  type: Sequelize.STRING(200),
		  allowNull: false
  		},
		login: {
			type: Sequelize.STRING(40),
			allowNull: false
		},
        cpf: {
            type: Sequelize.INTEGER(11)
    	},
		rg: {
			type: Sequelize.INTEGER(9)
	  	},
	  	cnpj: {
		  type: Sequelize.INTEGER(14)
  		},
        inscricaoEstadual: {
            type: Sequelize.STRING(100)
    	},
	});
	
	return Cadastro;
}