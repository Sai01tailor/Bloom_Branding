import AdminLayout from "../layout/AdminLayout";
import { useEnquiries } from "../context/EnquiryContext";

const Enquiries = () => {
  const { enquiries, resolveEnquiry } = useEnquiries();

  return (
    <AdminLayout title="Enquiries">
      <div className="space-y-4">
        {enquiries.map((e) => (
          <div
            key={e.id}
            className="bg-white/80 p-5 rounded-xl border border-slate-200 shadow-sm"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{e.name}</h3>
                <p className="text-sm text-slate-500">{e.email}</p>
              </div>

              {/* STATUS BADGE */}
              <span
                className={`
                  px-3 py-1 text-xs font-medium rounded-lg
                  ${
                    e.status === "pending"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }
                `}
              >
                {e.status === "pending" ? "Pending" : "Resolved"}
              </span>
            </div>

            {/* BODY */}
            <div className="mt-3">
              <p className="text-sm text-slate-600">
                <strong>Subject:</strong> {e.subject}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {e.message}
              </p>
            </div>

            {/* ACTION */}
            {e.status === "pending" && (
              <button
                onClick={() => resolveEnquiry(e.id)}
                className="
                  mt-4 px-4 py-2
                  bg-green-600 text-white
                  rounded-lg text-sm
                  hover:bg-green-700
                "
              >
                Resolve
              </button>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Enquiries;
