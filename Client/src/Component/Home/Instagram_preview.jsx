import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Film, User, PlusSquare, MessageCircle } from "lucide-react";

/* ===== PHONE ===== */
const PHONE_WIDTH = 433;
const PHONE_HEIGHT = 882;

function Iphone({ children }) {
  return (
    <div
      className="relative"
      style={{
        width: 420,
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
      }}
    >
      {/* PHONE BODY (BACKGROUND) */}
      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        className="absolute inset-0 w-full h-full z-0"
      >
        {/* OUTER */}
        <rect x="0" y="0" width="433" height="882" rx="72" fill="#e5e5e5" />
        {/* INNER */}
        <rect x="8" y="8" width="417" height="866" rx="64" fill="#000" />
        {/* ISLAND */}
        <rect x="154" y="32" width="125" height="36" rx="18" fill="#111" />
      </svg>

      {/* SCREEN */}
      <div
        className="absolute z-10 bg-white overflow-hidden shadow-xl rounded"
        style={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
          borderRadius: 56,
          paddingTop:16,
          paddingLeft:8,
          paddingRight:8
        }}
      >
        <div
          className="h-full overflow-y-auto overscroll-contain"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ===== INSTAGRAM ===== */
const posts = Array.from({ length: 18 });
function InstagramProfile() {
  const [activePost, setActivePost] = React.useState(null);
  React.useEffect(() => {
    if (activePost !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [activePost]);

  return (
    <div className="relative bg-white">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white px-6 py-4 flex justify-between border-b">
        <p className="font-semibold text-[15px]">your_username</p>
        <div className="flex gap-4">
          <PlusSquare size={20} />
          <MessageCircle size={20} />
        </div>
      </div>

      {/* PROFILE */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 p-[3px]">
            <div className="w-full h-full rounded-full bg-gray-200" />
          </div>

          <div className="flex flex-1 justify-between text-center">
            {[
              ["Posts", "128"],
              ["Followers", "12.4K"],
              ["Following", "321"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-semibold">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-[14px]">
          <p className="font-semibold">Your Name</p>
          <p className="text-gray-600">
            Web Dev • Designer <br />
            Building clean internet things ✨
          </p>
          <p className="text-blue-500 mt-1">yourwebsite.com</p>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="flex-1 bg-gray-100 py-2 rounded-xl text-sm">
            Follow
          </button>
          <button className="flex-1 bg-gray-100 py-2 rounded-xl text-sm">
            Message
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex justify-around border-t mt-6 py-3">
        <Grid size={20} />
        <Film size={20} className="text-gray-400" />
        <User size={20} className="text-gray-400" />
      </div>

      {/* POSTS GRID */}
      <div className="grid grid-cols-3 gap-[2px] bg-gray-200">
        {posts.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setActivePost(i)}
            whileTap={{ scale: 0.95 }}
            className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 cursor-pointer"
          />
        ))}
      </div>

      {/* POST MODAL */}
      <AnimatePresence>
        {activePost !== null && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePost(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-[360px] aspect-square rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 shadow-2xl"
            />

            {/* CLOSE */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 text-white text-xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===== APP ===== */
export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
      <Iphone>
        <InstagramProfile />
      </Iphone>
    </div>
  );
}
