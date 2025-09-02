/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-01 19:45
*****************************************************************************************/
import React from "react";

interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    let badgeColor: string = '';
    let badgeText: string = '';

    if (score > 70) {
        badgeColor = 'bg-badge-green text-green-600';
        badgeText = 'Forte';
    } else if (score > 49) {
        badgeColor = 'bg-badge-yellow text-yellow-600';
        badgeText = 'Bom começo';
    } else {
        badgeColor = 'bg-badge-red text-red-600';
        badgeText = 'Precisa melhorar';
    }

    return (
        <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
            <p className="text-sm font-medium">{badgeText}</p>
        </div>
    );
};

export default ScoreBadge;