import React,{useState} from 'react'

function CreateForm({Create,s, error}) {
    const [details,setDetails] = useState({nome:"",senha:""});
    const [fis_jus,setFisJur]= useState('fis')
    const [colorJ,setColorJ]=useState('')
    const [colorF,setColorF]=useState('selected')

    const submitHandler =e =>{
            e.preventDefault();
            Create(details);
    }
    const changeColors=(fis_jus)=>{
        if(fis_jus==='fis'){
            setColorF('selected')
            setColorJ('')
        }else{
            setColorF('')
            setColorJ('selected')
        }

    }
  return (
    <form onSubmit={submitHandler}>
        <div className="inner-form">
            <h2>{s}</h2>
            {(error !== "")?(<div className="error">{error}</div>): ""}
            

            <button type='button' className={colorF} onClick={()=>{setFisJur('fis');changeColors(fis_jus)}}>Pessoa Fisica</button>
            <button type='button' className={colorJ} onClick={()=>{setFisJur('jur');changeColors(fis_jus)}}>Pessoa Juridica</button>
            {(s === "Update")?(
            <div className="form-group">
                <label htmlFor='codPessoa'>CodPessoa:</label>
                <input type="text" name='codPessoa' id='codPessoa' onChange={e=>setDetails({...details,codPessoa: e.target.value})} value={details.codPessoa}/>
            </div>
            ): ""}
            <div className="form-group">
                <label htmlFor='nome'>Nome:</label>
                <input type="text" name='nome' id='nome' onChange={e=>setDetails({...details,nome: e.target.value})} value={details.nome}/>
            </div>
            <div className="form-group">
                <label htmlFor='password'>Senha:</label>
                <input type="password" name='senha' id='senha' onChange={e=>setDetails({...details,senha: e.target.value})} value={details.senha}/>
            </div>
            <div className="form-group">
                <label htmlFor='telefone'>Telefone:</label>
                <input type="text" name='telefone' id='telefone' onChange={e=>setDetails({...details,telefone: e.target.value})} value={details.telefone}/>
            </div>
            <div className="form-group">
                <label htmlFor='login'>Login:</label>
                <input type="text" name='login' id='login' onChange={e=>setDetails({...details,login: e.target.value})} value={details.login}/>
            </div>
            {(fis_jus === "fis")?(
                <div className="form-group">
                <label htmlFor='cpf'>CPF:</label>
                <input type="text" name='cpf' id='cpf' onChange={e=>setDetails({...details,cpf: e.target.value})} value={details.cpf}/>
                </div>
            ): ""}
            {(fis_jus === "fis")?(
                <div className="form-group">
                <label htmlFor='rg'>RG:</label>
                <input type="text" name='rg' id='rg' onChange={e=>setDetails({...details,rg: e.target.value})} value={details.rg}/>
                </div>
            ): ""}
            {(fis_jus === "jur")?(
            <div className="form-group">
                <label htmlFor='cnpj'>CNPJ:</label>
                <input type="text" name='cnpj' id='cnpj' onChange={e=>setDetails({...details,cnpj: e.target.value})} value={details.cnpj}/>
            </div>
            ): ""}
            {(fis_jus === "jur")?(
            <div className="form-group">
                <label htmlFor='inscricaoEstadual'>Inscricao Estadual:</label>
                <input type="text" name='inscricaoEstadual' id='inscricaoEstadual' onChange={e=>setDetails({...details,inscricaoEstadual: e.target.value})} value={details.inscricaoEstadual}/>
            </div>
            ): ""}
            <input type="submit" value={s} name='submit'/>
        </div>
    </form>
  )
}

export default CreateForm