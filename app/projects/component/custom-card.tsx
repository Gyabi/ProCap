"use client";
import React from 'react';

export interface CustomCardProps {
    id: string; // UUID as string
    projectName: string; // Project name
    description: string; // Description
    showProject: (id: string) => void; // Function to show project
    children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({id, projectName, description, showProject, children}:CustomCardProps) => {
    return (
        <div className="w-full px-8 py-4 m-2 flex flex-col bg-white hover:bg-purple-500 border border-2 border-gray-200 hover:border-purple-800  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
            onClick={() => showProject(id)}
        >
            {children}
            <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{projectName}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" style={{ wordWrap: 'break-word' }}>
                {description.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        <br />
                    </span>
                ))}
            </p>
        </div>
    );
}

export default CustomCard;
