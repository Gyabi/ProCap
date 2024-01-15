"use client";

import { Project } from "./data/project";
import React, { useState, useCallback } from 'react';
import CustomCard from "./component/custom-card";
interface ItemContainerProps {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    showProject: (id: string) => void;
}

export const ItemContainer: React.FC<ItemContainerProps> = ({projects, setProjects, showProject}:ItemContainerProps) => {

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {projects.map((project) => {
                return (
                    <CustomCard
                        key={project.id}
                        id={project.id}
                        projectName={project.projectName}
                        description={project.description}
                        showProject={showProject}
                    />
                );
            })}

        </div>

    );
};