import './home.scss'
import mapa from "../../assets/mapa.jpg"
import { Normas } from '../../components/Normas/Normas';


function Home() {

  return (
    // <Page>
    <>
      <div style={{ textAlign: 'left', width: '100%', backgroundColor: 'var(--secondary-color)', color: 'white'}}>
        <div style={{ maxWidth: '1750px', margin: 'auto', padding: '0 10px' }}>
          <h1 >Preparados para la carrera más dura de la comarca?</h1>
        </div>
      </div>
      <div style={{ textAlign: 'left', width: '100%', minHeight: '350px', backgroundColor: 'var(--light-gray)', color: 'var(--text-color'}}>
      {/* <div style={{ textAlign: 'left', width: '100%', minHeight: '350px', backgroundColor: '#383232', color: 'white'}}> */}
        <div style={{ maxWidth: '1750px', margin: 'auto', padding: '0 10px' }}>
          <h1 style={{ color: "var(--rules-color)" }}>MAPA CORAZÓNSPARTAN</h1>
          <img style={{ maxWidth: '800px', width: '100%'}} src={mapa} alt="" />
        </div>
      </div>
      <div style={{ textAlign: 'left', width: '100%', backgroundColor: 'var(--rules-color)', color: 'white'}}>
        <Normas />
      </div>
      <div>
        ROLES
        /link a roles
      </div>
    </>
    // </Page>
  )
}

export default Home
