import {useState} from 'react';
import styles from './assets/App.module.css';
import poweredImage from './assets/powered.png'; 
import {Level,levels,calculateImc} from './helpers/imc';
import leftArrowImg from './assets/leftarrow.png';
import {GridItem} from './components/GridItem';

function App() {

	const [heightField,setHeightField] = useState<number>(0);
	const [weightField,setWeightField] = useState<number>(0);
	const [toShow,setToShow] = useState<Level | null>(null);
	const handleCalculateButton = ()=>{
		if(heightField && weightField){
			setToShow(calculateImc(heightField,weightField));
		}else{
			alert("Digite todos os campos!");
		}
	}

	const handleBackButton = ()=>{
		setToShow(null);
		setHeightField(0);
		setWeightField(0);
	}

  return (
    <div className={styles.main}>
	    <header>
		    <div className={styles.headerContainer}>
			    <img src={poweredImage} width={150} />
		    </div>
	    </header>
	    <div className={styles.container}>
		    <div className={styles.leftSide}>
			<h1>Calcule o seu IMC</h1>
	  		<p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado
				pela Organização Mundial da Saúde para calcular o peso ideal de
				cada pessoa.
			</p>
	  		<input
				type="number"
				placeholder="Digite a sua altura em metros"
				value={heightField > 0? heightField: ''}
				onChange={e=>setHeightField(parseFloat(e.target.value))}
				disabled={toShow?true:false}
			/>
			<input
				type="number"
				placeholder="Digite o seu peso em kilos"
				value={weightField > 0? weightField: ''}
				onChange={e=>setWeightField(parseFloat(e.target.value))}
				disabled={toShow?true:false}
			/>
			<button onClick={handleCalculateButton} disabled={toShow?true:false}>Calcular</button>

		    </div>
		    {!toShow &&
		    <div className={styles.rightSide}>
			<div className={styles.grid}>
				{levels.map((item,key)=>(
					<GridItem key={key} item={item} />
				))}
			</div>
		   </div>
	   	   }
	  	   {toShow &&
		   <div className={styles.rightBig}>
			   <div className={styles.rightArrow} onClick={handleBackButton}>
				   <img src={leftArrowImg} width={25} />
			   </div>
			<GridItem item={toShow} />
		   </div>
		   }
		
	    </div>
    </div>
  )
}

export default App
