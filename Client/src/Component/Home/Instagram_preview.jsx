import React from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import { Grid, Film, User, PlusSquare, MessageCircle } from "lucide-react";
import TextType from "../Global/TextType";
import Color from '../Global/Color'
import {Link} from 'react-router-dom'
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
        <rect x="0" y="0" width="433" height="882" rx="72" fill={Color.ElectricBlue} />
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
          paddingTop: 16,
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
      <div className="sticky top-0 z-20 bg-white px-6 py-4 flex justify-between border-b " style={{paddingLeft:16,paddingRight:16}}>
        <p className="font-semibold text-[15px]">bloom.branding_</p>
        <div className="flex gap-4">
          <PlusSquare size={20} />
          <MessageCircle size={20} />
        </div>
      </div>

      {/* PROFILE */}
      <div className="px-6 pt-6" style={{paddingLeft:16,paddingRight:16,paddingTop:4}}>
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 p-[3px]">
            <div className="w-full h-full rounded-full bg-gray-200" />
          </div>
          <div className="w-[50%]">
          <p className="font-semibold text-[1rem]">Bloom branding | Digital Marketing Surat</p>  
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
        </div>

        <div className="mt-4 text-[14px]">
          <p className="text-gray-600">
          Social Media Marketing | branding | Influencer Management | Content Creation
          </p>
          <p className="text-blue-500 mt-1">LocalHost:5734</p>
        </div>

        <div className="flex gap-3 mt-5" style={{paddingBottom:4}}>
          <Link to={'https://instagram.com'} className="flex-1 flex justify-center items-center bg-gray-100 py-2 h-7 rounded text-sm" >
            Follow
          </Link>
          <Link to={'https://instagram.com'} className="flex-1 flex justify-center items-center bg-gray-100 py-2 h-7 rounded text-sm" >
            Message
          </Link>
        </div>
      </div>

      {/* TABS */}
      <div className="flex justify-around h-7  mt-6 py-3" style={{borderBottom:'2px solid black'}}>
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
              className="absolute top-4 right-4 text-white text-xl cursor-pointer"
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
    <div className="relative">
      <motion.div
        className="relative h-[10vh] top-0 bottom-0  text-[5vh] md:absolute md:left-[10vw]"
        style={{ marginBlock: "auto" ,textAlign:'center'}}
        initial={{x:'-100vw',opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:1,ease:'easeInOut'}}
      >
        <h1 style={{ fontFamily: "Bigilla" }}>Instagram Preview</h1>
      </motion.div>
      <motion.div
        className="relative h-[10vh] top-0 bottom-0  text-[5vh] md:absolute md:right-[15vw] "
        
        style={{ marginBlock: "auto",textAlign:"center" }}
        initial={{x:'100vw',opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:1,ease:'easeInOut'}}
      >
        <h1 style={{ fontFamily: "Bigilla" }}>Follow US </h1>
      </motion.div>
      <div className="min-h-screen  flex items-center justify-center " style={{backgroundColor:Color.EarlGray,padding:'5vh'}}>
        <Iphone>
          <InstagramProfile />
        </Iphone>
      </div>
    </div>
  );
}
