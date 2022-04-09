module.exports = (sequelize, Sequelize) => {
	const Cadastro = sequelize.define('cadastro', {	
        cpf_cnpj: {
            type: Sequelize.STRING(14),
            primaryKey: true
    },
	  nome: {
			type: Sequelize.STRING(100)
	  },
	  senha: {
		  type: Sequelize.STRING(200)
  	}
	});
	
	return Cadastro;
}