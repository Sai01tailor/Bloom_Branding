import { motion } from "framer-motion";

export default function ProjectsGrid({ projects }) {
  if (!projects.length) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-white/40">
        No projects found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 p-8 sm:grid-cols-3 lg:grid-cols-4">
      {projects.map((project) => (
        <motion.div
          key={project._id}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4 }}
          className="group relative overflow-hidden rounded-2xl bg-white/5"
        >
          {project.mediaType === "image" ? (
            <img
              src={project.mediaUrl.replace(
                "/upload/",
                "/upload/f_auto,q_auto,w_800/"
              )}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <video
              src={project.mediaUrl}
              autoPlay
              muted
              loop
              className="h-full w-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100" />

          {/* Meta */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-6 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-white/70">
              {project.clientname} • {project.year}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
