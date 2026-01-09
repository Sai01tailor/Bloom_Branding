import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import { useServices } from "../context/ServiceContext";

const Services = () => {
  const {
    services,
    addService,
    deleteService,
    toggleServiceStatus,
  } = useServices();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    order: 0,
  });

  const handleSubmit = () => {
    addService(form);
    setForm({
      title: "",
      shortDescription: "",
      longDescription: "",
      order: 0,
    });
    setShowForm(false);
  };

  // 🔥 SORT: Active first, Inactive later
  const sortedServices = [...services].sort((a, b) => {
    if (a.isActive === b.isActive) return a.order - b.order;
    return a.isActive ? -1 : 1;
  });

  return (
    <AdminLayout title="Services">
      {/* ADD SERVICE BUTTON */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-black text-white rounded-lg"
      >
        Add Service
      </button>

      {/* ADD SERVICE FORM */}
      {showForm && (
        <div className="bg-white/80 p-6 rounded-lg border mb-8 space-y-4">
          <input
            placeholder="Title"
            className="w-full border p-2 rounded-lg"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          <input
            placeholder="Short Description"
            className="w-full border p-2 rounded-lg"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({
                ...form,
                shortDescription: e.target.value,
              })
            }
          />
          <textarea
            placeholder="Long Description"
            className="w-full border p-2 rounded-lg"
            value={form.longDescription}
            onChange={(e) =>
              setForm({
                ...form,
                longDescription: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Order"
            className="w-full border p-2 rounded-lg"
            value={form.order}
            onChange={(e) =>
              setForm({
                ...form,
                order: Number(e.target.value),
              })
            }
          />

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Save Service
          </button>
        </div>
      )}

      {/* SERVICES LIST */}
      <div className="space-y-6">
        {sortedServices.map((s) => (
          <div
            key={s.id}
            className="bg-white/80 p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold">
                  {s.title}
                </h3>

                <p className="text-slate-600 mt-2">
                  <span className="font-medium">
                    Short:
                  </span>{" "}
                  {s.shortDescription}
                </p>

                <p className="text-slate-600 mt-1">
                  <span className="font-medium">
                    Details:
                  </span>{" "}
                  {s.longDescription}
                </p>

                <p className="text-sm text-slate-400 mt-2">
                  Order: {s.order}
                </p>
              </div>

              {/* STATUS BADGE */}
              <span
                className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
                  s.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {s.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => toggleServiceStatus(s.id)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Toggle Status
              </button>

              <button
                onClick={() => deleteService(s.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
              >
                Delete Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Services;
