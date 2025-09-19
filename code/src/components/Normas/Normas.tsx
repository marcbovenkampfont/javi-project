import norma1 from "../../assets/normas/norma_1.jpg"
import norma2 from "../../assets/normas/norma_2.jpg"
import norma3 from "../../assets/normas/norma_3.jpg"
import norma4 from "../../assets/normas/norma_4.jpg"
import { Norma } from "./Norma"
import "./Normas.scss"

export const Normas = () => {

    const normas = [
        { img: norma1, titulo: "todo el equipo junto", mensaje: "Todo el grupo debe ir junto, si empiezan antes de que lleguen todos se penaliza con un tiempo de 10 segundos extra."},
        { img: norma2, titulo: "No molestar a los rivales", mensaje: "Si un equipo molesta en la carrera a otro equipo rival será penalizado con una pausa de 1min."},
        { img: norma3, titulo: "grito de guerra", mensaje: "El equipo de la mano del animador/a debe realizar su grito de guerra antes de la carrera y al acabar, si NO lo hace será PENALIZADO con 10 segundos extra."},
        { img: norma4, titulo: "balón en el aire", mensaje: "Si el balón medicinal cae al suelo penalización para todo el grupo + 10 segundos cada vez que cae."}
    ]

    return (
        <div className="normas">
          <h1 className="normas-title">NORMAS</h1>
          <div className="normas-content">
            {normas.map((norma) => {
              return <Norma norma={norma} />
            })}
          </div>
        </div>
    )
}
