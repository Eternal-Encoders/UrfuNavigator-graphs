import { IService } from "../../utils/Interfaces";
import "./service-container-style.css";
import Service from "../service/Service";

interface ServiceContainerProps {
    services: IService[],
    width: number,
    height: number
}

function ServiceContainer({services, width, height}: ServiceContainerProps) {
    return (
        <div className="service-container">
            {services.map((e) => {
                return (
                    <>
                        <Service {...e} width={width} height={height} />
                    </>
                );
            })}
        </div>
    );
}

export default ServiceContainer;