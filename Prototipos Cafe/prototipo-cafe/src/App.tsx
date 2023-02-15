import {useState} from 'react'
import styles from './App.module.css';
import logoMaua from './assets/logo-IMT.png'
import logoNspi from './assets/nspi-logo.png'
import { Pedido, processRequest } from './helper/processRequest';

const App = () => {

const [name, setName] = useState("")
const [phone, setPhone] = useState(0)
const [coffee, setCoffee] = useState(0)
const [show, setShow] = useState('')
// const [show,setShow] = useState<Pedido | null>(null)

const sendRequest = () => {
  if (name && phone && coffee) {
    setShow(processRequest(name,phone,coffee))

    setName("")
    setPhone(0)
    setCoffee(0)
  } else {
    alert("Preencha todos os campos")
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

          <input type="string"
          placeholder="Digite seu nome"
          value={name.length > 0 ? name : ''}
          onChange={e => setName(e.target.value)}
          />

          <input type="number"
          placeholder="Digite seu n° de celular"
          value={phone > 0 ? phone : ''}
          onChange={e => setPhone(parseInt(e.target.value))}
          />

          <select 
          id='saborCafe' 
          onChange={e => setCoffee(parseInt(e.target.value))} 
          defaultValue="0"
          value={coffee !== 0 ? coffee : 0}
          >
            <option value="0" disabled>--Escolha o sabor do café--</option>
            <option value="1">Café puro</option>
            <option value="2">Capuccino</option>
            <option value="3">Creme brullê</option>
          </select>

          <label>
            <input type="checkbox" value='info' className={styles.checkbox}/>
            Gostaria de receber informativos da Mauá?
          </label>
          
          <button onClick={sendRequest}>Realizar pedido</button>
        </div>

        <div className={styles.rightSide}>
          <p>Nome: {name}. Telefone: {phone}. Café: {coffee-1}.</p>
          <ul>
            <li>{name} / {phone} / {coffee} </li>
            <li>{show}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


// criar classe com nome, numero, sabor e *opcional* checkbox info
// onClick no botao salvar as infos na classe
// exibir resultado na direita


export default App;