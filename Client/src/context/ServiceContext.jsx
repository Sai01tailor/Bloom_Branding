import { createContext, useContext, useState } from "react";
import { servicesData } from "../components/Data";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState(servicesData);

  const addService = (service) => {
    setServices(prev => [
      ...prev,
      {
        ...service,
        id: Date.now().toString(),
        isActive: true,
        createdAt: new Date().toLocaleDateString()
      }
    ]);
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const toggleServiceStatus = (id) => {
    setServices(prev =>
      prev.map(s =>
        s.id === id ? { ...s, isActive: !s.isActive } : s
      )
    );
  };

  const totalServices = services.length;
  const activeServices = services.filter(s => s.isActive).length;
  const inactiveServices = services.filter(s => !s.isActive).length;

  return (
    <ServiceContext.Provider
      value={{
        services,
        addService,
        deleteService,
        toggleServiceStatus,
        totalServices,
        activeServices,
        inactiveServices
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => useContext(ServiceContext);
