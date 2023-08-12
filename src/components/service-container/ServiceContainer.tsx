import React from "react";
import { IService } from "../../utils/Interfaces";
import "./service-container-style.css";
import Service from "../service/Service";

interface ServiceContainerProps {
    services: IService[],
    widht: number,
    height: number
}

function ServiceContainer({services, widht, height}: ServiceContainerProps) {
    return (
        <div className="service-container">
            {services.map((e) => {
                return (
                    <>
                        <Service {...e} width={widht} height={height} />
                    </>
                );
            })}
        </div>
    );
}

export default ServiceContainer;