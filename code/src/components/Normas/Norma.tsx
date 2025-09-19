import React from 'react'

type Norma = {
  img: string;
  titulo: string;
  mensaje: string;
}

type NormaProps = {
    norma: Norma;
}

export const Norma: React.FC<NormaProps> = ({norma}) => {
  return (
    <div className='norma' >
        <div className='norma-cont_img'>
            <img className='norma-cont_img-img' src={norma.img} />
        </div>
        <span className='norma-title'>{norma.titulo}</span>
        <span className='norma-message'>{norma.mensaje}</span>
    </div>
  )
}
