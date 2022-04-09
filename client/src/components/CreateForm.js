import React,{useState} from 'react'

function CreateForm({Create,s, error}) {
    const [details,setDetails] = useState({cpf_cnpj:"",nome:"",senha:""});

    const submitHandler =e =>{
        e.preventDefault();
        Create(details);
    }
  return (
    <form onSubmit={submitHandler}>
        <div className="inner-form">
            <h2>{s}</h2>
            {(error != "")?(<div className="error">{error}</div>): ""}
            <div className="form-group">
                <label htmlFor='cpf_cnpj'>CPF ou CNPJ:</label>
                <input type="text" name='cpf_cnpj' id='cpf_cnpj' onChange={e=>setDetails({...details,cpf_cnpj: e.target.value})} value={details.cpf_cnpj}/>
            </div>
            <div className="form-group">
                <label htmlFor='nome'>Nome:</label>
                <input type="text" name='nome' id='nome' onChange={e=>setDetails({...details,nome: e.target.value})} value={details.nome}/>
            </div>
            <div className="form-group">
                <label htmlFor='password'>Senha:</label>
                <input type="password" name='senha' id='senha' onChange={e=>setDetails({...details,senha: e.target.value})} value={details.senha}/>
            
            </div>
            
            <input type="submit" value={s}/>
        </div>
    </form>
  )
}

export default CreateForm