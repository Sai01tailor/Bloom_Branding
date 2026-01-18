import AdminLayout from "../layout/AdminLayout";
import { testimonialsData } from "../components/Data";
import PageTransition from "../components/PageTransition";
const Testimonials = () => {
  return (
    <PageTransition>
      <AdminLayout title="Testimonials">
      <div className="grid md:grid-cols-2 gap-6">
        {testimonialsData.map(t => (
          <div
            key={t.id}
            className="
              bg-white/80
              backdrop-blur
              rounded-2xl
              p-6
              border border-slate-200
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex gap-4 items-start">
              <img
                src={t.photo}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-xs text-slate-500">{t.date}</p>
                <div className="text-yellow-500 text-sm mt-1">
                  {"★".repeat(t.rating)}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {t.message}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
    </PageTransition>
  );
};

export default Testimonials;
