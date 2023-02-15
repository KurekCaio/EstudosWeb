import styles from './App.module.css';
import poweredImg from './assets/powered.png'
import leftArrowImg from './assets/leftarrow.png'
import {useState} from 'react';
import {levels,calculateImc, Level} from './helper/imc'
import { Grid, } from './components/Grid'

const App = () => {

const [height, setHeight] = useState(0);
const [weight, setWeight] = useState(0);
const [show, setShow] = useState<Level | null>(null);

const calculate = () => {
  if(height && weight) {
    setShow(calculateImc(height,weight))
  } else {
    alert("Digite todos os campos!");
  }
}

const backButton = () => {
  setShow(null)
  setHeight(0)
  setWeight(0)
}

  return (
    <div className={styles.main}>
      <header className={styles.headerContainer}>
      <div>
        <img src={poweredImg} alt="" width={150} />
      </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>

          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
        
          <input 
            type="number"
            placeholder='Digite sua altura. Ex: 1.5 (em metros)'
            value={height > 0 ? height : ''}
            onChange={e => setHeight(parseFloat(e.target.value))}
            disabled={show ? true : false}
            /> 

          <input 
            type="number"
            placeholder='Digite seu peso. Ex: 65.3 (em kg)'
            value={weight > 0 ? weight : ''}
            onChange={e => setWeight(parseFloat(e.target.value))}
            disabled={show ? true : false}
            />

            <button onClick={calculate} disabled={show ? true : false}>Calcular</button> 
        </div>

        <div  className={styles.rightSide}>
          {!show &&
            <div className={styles.grid}>
              {levels.map((item,key)=>(
                <Grid item={item}key={key}/>
              ))}
            </div>
          }
          {show &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={backButton}>
                <img src={leftArrowImg} alt="" width={25}/>
              </div>
              <Grid item={show}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
