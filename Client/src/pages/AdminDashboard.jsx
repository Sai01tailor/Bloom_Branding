import AdminLayout from "../layout/AdminLayout";
import { dashboardStats } from "../components/Data";
import PageTransition from "../components/PageTransition";
import { useEnquiries } from "../context/EnquiryContext";
import { useServices } from "../context/ServiceContext";

const cardClass = `
  bg-white/80
  backdrop-blur
  rounded-2xl
  p-6
  border border-slate-200
  shadow-sm
  transition-all duration-300
  hover:-translate-y-1
  hover:shadow-xl
`;

const AdminDashboard = () => {
  const { pendingCount, resolvedCount } = useEnquiries();
  const { totalServices, activeServices, inactiveServices } = useServices();

  return (
    <PageTransition>
      <AdminLayout title="Dashboard">

        {/* ================= TOP CORE STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {dashboardStats.map((item, i) => (
            <div key={i} className={cardClass}>
              <p className="text-sm text-slate-500 tracking-wide">
                {item.title}
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 mt-2">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* ================= ACTIONABLE STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className={cardClass}>
            <p className="text-sm text-slate-500 tracking-wide">
              Pending Enquiries
            </p>
            <h2 className="text-3xl font-semibold mt-2">
              {pendingCount}
            </h2>
          </div>

          <div className={cardClass}>
            <p className="text-sm text-slate-500 tracking-wide">
              Resolved Enquiries
            </p>
            <h2 className="text-3xl font-semibold mt-2">
              {resolvedCount}
            </h2>
          </div>

          

          <div className={cardClass}>
            <p className="text-sm text-slate-500 tracking-wide">
              Active Services
            </p>
            <h2 className="text-3xl font-semibold mt-2 ">
              {activeServices}
            </h2>
          </div>

          <div className={cardClass}>
            <p className="text-sm text-slate-500 tracking-wide">
              Inactive Services
            </p>
            <h2 className="text-3xl font-semibold mt-2 ">
              {inactiveServices}
            </h2>
          </div>
        </div>

        {/* ================= OVERVIEW ================= */}
        <div
          className="
            mt-10
            bg-white/80
            backdrop-blur
            rounded-2xl
            p-8
            border border-slate-200
            shadow-sm
          "
        >
          <h3 className="text-xl font-semibold mb-3">
            System Overview
          </h3>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            This dashboard provides a clean and centralized overview of
            testimonials, services, and enquiries. Designed with a
            minimal and professional admin experience focused on
            managing content and user interactions efficiently.
          </p>
        </div>

      </AdminLayout>
    </PageTransition>
  );
};

export default AdminDashboard;
