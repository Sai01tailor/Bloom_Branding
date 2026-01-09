import { createContext, useContext, useState } from "react";
import { enquiriesData } from "../components/Data"; // existing data file

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState(enquiriesData);

  const resolveEnquiry = (id) => {
    setEnquiries(prev =>
      prev.map(e =>
        e.id === id ? { ...e, status: "resolved" } : e
      )
    );
  };

  const pendingCount = enquiries.filter(e => e.status === "pending").length;
  const resolvedCount = enquiries.filter(e => e.status === "resolved").length;

  return (
    <EnquiryContext.Provider
      value={{
        enquiries,
        resolveEnquiry,
        pendingCount,
        resolvedCount
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiries = () => useContext(EnquiryContext);
