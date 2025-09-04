/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-01 21:00
*****************************************************************************************/
import { cn } from 'lib/utils';
import React from 'react'

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
        score > 69
          ? "from-green-100"
          : score > 49
            ? "from-yellow-100"
            : "from-red-100"
      )}
    >
      <div className="flex flex-row gap-4 items-center">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 49
                ? "/icons/ats-warning.svg"
                : "/icons/ats-bad.svg"
          }
          alt="ATS"
          className="w-10 h-10"
        />
        <p className="text-2xl font-semibold">Score ATS - {score}/100</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-xl">
          Como seu currículo está avaliado no sistema ATS (Applicant Tracking Systems)?
        </p>
        <p className="text-lg text-gray-700 mb-2">
          O seu currículo foi analisado como o de um candidato para a vaga. Aqui está o resumo:
        </p>
        <hr className='text-gray-900' />
        {suggestions.map((suggestion, index) => (
          <div className="flex flex-row gap-3 items-center" key={index}>
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="ATS"
              className="w-4 h-4"
            />
            <p className="text-lg text-gray-700">{suggestion.tip}</p>
          </div>
        ))}
        <hr className='text-gray-900 mt-2' />
        <p className="text-lg text-gray-700">
          Quer melhorar? Siga as dicas e sugestões para o seu curriculo lsitadas abaixo.
        </p>
      </div>
    </div>
  );
};

export default ATS;