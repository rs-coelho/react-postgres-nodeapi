import React, {useState} from 'react';
import CreateForm from './components/CreateForm';
import ViewForm from './components/ViewForm';

function App (){
  // state = {
  //   response: ''
  // };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('up');
  //   const body = await response.json();
  //   console.log(body);
  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  const [form,SetForm] = useState('Create');
  const [error,SetError] = useState("");
  var axios = require('axios')


  const Create = async(details) =>{
    await axios.post('create', 
      details
      ).then((result)=>{
        SetError('Cadastro Atualizado!')
    })
    .catch((error) => {
      console.log(error.message)
      if(error.message ==='Request failed with status code 500'){
        SetError('This CPF | CNPJ already exists')
      }else if (error.message ==='Request failed with status code 400'){
        SetError('CPF|CNPJ must have 11 or 14 characters')
      }else{
        SetError('System Error invalid credentials')
      }
    });
    
  }
  const Update = async(details) =>{
    await axios.put('update', 
      details
      ).then((result)=>{
        SetError('CPF|CNPJ Atualizado!')
    })
    .catch((error) => {
      console.log(error.message)
      if(error.message ==='Request failed with status code 500'){
        SetError('This CPF | CNPJ already exists')
      }else if (error.message ==='Request failed with status code 404'){
        SetError('CPF|CNPJ not Found')
      }else{
        SetError('System Error invalid credentials')
      }
    });
    
  }
  
    return (
        <div className="App">
        
          {(form === 'Create') ? (
            <div className='Welcome'>
              <CreateForm Create={Create} s='Create' error={error}/>
              <button onClick={()=>{SetForm('View');SetError('');}}>View</button>
            </div>
          ):(form === 'View') ? (
            <div>
            <ViewForm View error={error}/>
            <button onClick={()=>{SetForm('Create');SetError('');}}>Create</button>
            <button onClick={()=>{SetForm('Update');SetError('');}}>Update</button>
            </div>
          ):(
            <div>
            <CreateForm Create={Update} s='Update' error={error}/>
            <button onClick={()=>{SetForm('View');SetError('');}}>View</button>
            </div>
          )
          } 
        </div>
    );
  
}

export default App;