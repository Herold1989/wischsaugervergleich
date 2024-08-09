"use client";
import React, { useState } from 'react';
import { Button } from 'primereact/button';

interface ExpertOpinionProps {
    opinion: string;
}

const ExpertOpinion: React.FC<ExpertOpinionProps> = ({ opinion }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="expert-opinion mt-4 p-4 border-t border-gray-200 bg-gray-50 rounded-lg flex flex-col h-full">
            <div className="flex items-start mb-2">
                <div className="border-l-4 border-orange-500 pl-2">
                    <h4 className="font-semibold text-orange-500 mb-2">Meinung der Redaktion</h4>
                    <p className="mb-2 flex-grow italic">
                        {isExpanded ? opinion : `${opinion.substring(0, 100)}...`}
                    </p>
                    <Button label={isExpanded ? "Weniger anzeigen" : "Mehr erfahren"} className="p-button-text mt-2 mb-4 font-semibold" onClick={toggleExpand} />
                </div>
            </div>
            <div className="flex flex-wrap justify-between space-y-2 mt-auto">
                <div className="flex w-full mb-1">
                    <Button label="Video-Review" icon="pi pi-video" className="p-button-sm p-button-secondary w-1/2 mr-1 p-1" />
                    <Button label="Testbericht" icon="pi pi-file" className="p-button-sm p-button-secondary w-1/2 ml-1 p-1" />
                </div>
                <Button label="Amazon" icon="pi pi-amazon" iconPos="right" className="p-button-sm w-full amazon-button" />
            </div>
        </div>
    );
};

export default ExpertOpinion;
