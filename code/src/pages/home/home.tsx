import './home.scss'
// import { Login } from '../../components/Login/Login'
import { APP_ROUTES } from '../../shared/constants/appRoutes';
import { useNavigate } from 'react-router-dom';
// import Page from '../../components/Page/Page';
// import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';
// import { FormattedMessage } from 'react-intl';

type Norma = {
  img: string;
  titulo: string;
  mensaje: string;
}

function Home() {

  const navigate = useNavigate();

  const normas = [
    { img: "src/assets/normas/norma_1.jpg", titulo: "todo el equipo junto", mensaje: "Todo el grupo debe ir junto, si empiezan antes de que lleguen todos se penaliza con un tiempo de 10 segundos extra."},
    { img: "src/assets/normas/norma_2.jpg", titulo: "No molestar a los rivales", mensaje: "Si un equipo molesta en la carrera a otro equipo rival será penalizado con una pausa de 1min."},
    { img: "src/assets/normas/norma_3.jpg", titulo: "grito de guerra", mensaje: "El equipo de la mano del animador/a debe realizar su grito de guerra antes de la carrera y al acabar, si NO lo hace será PENALIZADO con 10 segundos extra."},
    { img: "src/assets/normas/norma_4.jpg", titulo: "balón en el aire", mensaje: "Si el balón medicinal cae al suelo penalización para todo el grupo + 10 segundos cada vez que cae."}
  ]

  return (
    // <Page>
    <>
      <div style={{ textAlign: 'left', width: '100%', backgroundColor: 'grey', color: 'white'}}>
        <div style={{ maxWidth: '1750px', margin: 'auto', padding: '0 10px' }}>
          <h1 style={{ fontFamily: 'Playfair Display' }} >Preparados para la carrera más dura de la comarca?</h1>
        </div>
      </div>
      <div style={{ textAlign: 'left', width: '100%', backgroundColor: '#383232', color: 'white'}}>
        <div style={{ maxWidth: '1750px', margin: 'auto', padding: '0 10px' }}>
          <h1 style={{ fontFamily: 'Playfair Display' }}>MAPA CORAZÓNSPARTAN</h1>
          <img style={{ maxWidth: '800px', width: '100%'}} src="src/assets/mapa.jpg" alt="" />
        </div>
      </div>
      <div style={{ textAlign: 'left', width: '100%', height: '500px', backgroundColor: '#FFAAAA', color: 'white'}}>
        <div style={{ maxWidth: '1750px', margin: 'auto', padding: '0 10px' }}>
          <h1 style={{ fontFamily: 'Playfair Display' }}>NORMAS</h1>
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {normas.map((norma) => {
              return <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column', gap: '10px', width: '215px', height: '100%'}}>
                <div style={{ width: '215px', height: '160px', overflow: 'hidden'}}>
                  <img style={{  width: '215px', minHeight: '160px', borderRadius: '50% 50% 0 0'}} src={norma.img} />
                </div>
                <span style={{ fontFamily: 'Helvetica', textTransform: 'uppercase', fontSize: '15px', fontWeight: 'bold', height: '40px', alignContent: 'center' }}>{norma.titulo}</span>
                <span style={{ fontFamily: 'Helvetica'}}>{norma.mensaje}</span>
              </div>
            })}
          </div>
        </div>
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
