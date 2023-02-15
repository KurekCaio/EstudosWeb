import {useState, useEffect} from 'react'
import Axios from 'axios'
import {useForm} from 'react-hook-form'

import styles from './App.module.css';
import logoMaua from './assets/logo-IMT.png'
import logoNspi from './assets/nspi-logo.png'
import { userSchema } from './validations/UserValidation';

const App = () => {

useEffect(() => {
  Axios.get('http://localhost:3001/api/get').then((response) => {
  // console.log(response.data)
  setList(response.data)
  })
  //
}, [])

const [name, setName] = useState("")
const [email,setEmail] = useState("")
const [coffee, setCoffee] = useState(0)
const [info, setInfo] = useState(false)
const [list, setList] = useState<any[]>([])
const {register,handleSubmit} = useForm()

const [emailCount, setEmailCount] = useState(false)

const createUser = async(event: any) => {
  event.preventDefault()
  let formData = {
    name: event.target[0].value,
    email: event.target[1].value,
    coffee: event.target[2].value,
    info: event.target[3].checked
  };
  const isValid = await userSchema.isValid(formData)
  console.log("---------")
  console.log("isValid: ")
  console.log(isValid)
  console.log("formData")
  console.log(formData)
  console.log("---------")

  Axios.get('http://localhost:3001/api/verify', {params: {email: formData.email}}).then((response) => {
    // setEmailCount(response.data)
    console.log("===========================")
    console.log("EmailCount e full response:")
    console.log(emailCount)
    console.log(response)
    console.log("============")
  })

  if (isValid && emailCount) {  

    Axios.post('http://localhost:3001/api/insert', {
      name: formData.name, 
      email: formData.email, 
      coffee: formData.coffee,
      info: formData.info
    })
    setList([...list, {name: name, email: email}])
    console.log("!!!!!!!!!!!!!!!!")
    console.log("Pedido realizado")
    console.log("!!!!!!!!!!!!!!!!")
    setName("")
    setEmail("")
    setCoffee(0)
    setInfo(false)    
  } else {
    console.log("isValid = False")
  }
}

  return (
    <div className={styles.main}>

      <header className={styles.headerContainer}>
        <div>
          <img src={logoMaua} alt="" width={200} />
        </div>
        <div>
          <img src={logoNspi} alt="" width={200}/>
        </div>
      </header>

      <div className={styles.titleContainer}> 
        <h1>CAS</h1>
        <h2>Coffee Advanced Service</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <p>Peça seu café preenchendo os campos abaixo:</p>

          <form onSubmit={createUser}>
            <input 
              type="text"
              placeholder="Digite seu nome"
              {...register("name")}
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input 
              type="string"
              placeholder="Digite seu email"
              {...register("email")}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <select 
              id='saborCafe'
              {...register("coffee")}
              value={coffee}
              onChange={e => setCoffee(parseInt(e.target.value))}
              >
              <option value="0" disabled>--Escolha o sabor do café--</option>
              <option value="1">Café puro</option>
              <option value="2">Capuccino</option>
              <option value="3">Creme brullê</option>
            </select>

            <div className={styles.checkboxDiv}>
              <input 
                type="checkbox"
                className={styles.checkbox}
                checked={info}
                {...register("info")} 
                onChange={e => {setInfo(e.target.checked)}}
              />
              <p>Gostaria de receber informativos da Mauá?</p>
            </div>
          
            <input type="submit"/>
          </form>

        </div>

        <div className={styles.rightSide}>
          BLOB
          {list.map((val, key) => {
            return (<h4 key={key}>Nome: {val.name}  |  Email: {val.email} </h4>)
          })}
        </div>

      </div>
      
    </div>
  );
}

export default App;

// 8:10 ► https://www.youtube.com/watch?v=wlltgs5jmZw
// https://www.rapidtables.com/code/text/ascii-table.html
// https://www.youtube.com/watch?v=RQ1E2EjyqY4

// https://www.youtube.com/watch?v=9wNl_7_Xtcg