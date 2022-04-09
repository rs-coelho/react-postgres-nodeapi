import React,{useState,useEffect} from 'react'
var axios = require('axios')

const ViewForm = () =>{
    
    const [data,setData] = useState([]);

    useEffect(()=>{
        getListCadastro();
    },[]);



const getListCadastro = async () =>{
      await axios.get('list').then((result)=>{
          setData(result.data);
        // console.log("output:" + JSON.stringify(result.data));
     })
}
const cadastroDelete = async (details)=>{
    var myheaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    if(window.confirm("Are you sure you want to delete this Cadastro?")){
        await axios.delete('http://localhost:3333/delete',{headers:myheaders,data:JSON.stringify(details)}).then((result)=>{
            getListCadastro();
          console.log("output:" + JSON.stringify(result.data));
       })
    }
    
}


  return (
    <div style={{marginTop:"150px"}}>
        <table className='sytled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>CodPessoa</th>
                    <th style={{textAlign:"center"}}>Nome</th>
                    <th style={{textAlign:"center"}}>Telefone</th>
                    <th style={{textAlign:"center"}}>Login</th>
                    <th style={{textAlign:"center"}}>CPF</th>
                    <th style={{textAlign:"center"}}>RG</th>
                    <th style={{textAlign:"center"}}>CNPJ</th>
                    <th style={{textAlign:"center"}}>Inscricao Estadual</th>
                    <th style={{textAlign:"center"}}>Action</th>
                    <th style={{textAlign:"center"}}></th>

                </tr>
            </thead>
            <tbody>
                {data && data.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{item.codPessoa}</td>
                            <td>{item.nome}</td>
                            <td>{item.telefone}</td>
                            <td>{item.login}</td>
                            <td>{item.cpf}</td>
                            <td>{item.rg}</td>
                            <td>{item.cnpj}</td>
                            <td>{item.inscricaoEstadual}</td>
                            <td>
                                {/* <button className='btn-edit'>Edit</button> */}
                                
                                <button className='btn-delete' onClick={() =>cadastroDelete(item)}>Delete</button>
                            
                                {/* <Link to={`/view`}>
                                    <button className='btn btn-view'>view</button>
                                </Link> */}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )

}
export default ViewForm