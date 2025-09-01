/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-01 08:45
*****************************************************************************************/
import React from 'react'
import ScoreGauge from './ScoreGauge'

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
      <div className='flex flex-row items-center p-4 gap-8'>

        <ScoreGauge score={feedback.overallScore} />

        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>Sua pontuação do currículo</h2>
          <p className='text-sm text-gray-500'>
            Resume Score: Essa pontuação é calculada com base na lista de variáveis analisadas abaixo.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Summary