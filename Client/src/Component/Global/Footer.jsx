import React, { useState, useRef, useEffect } from "react";
import { motion, animate, easeIn } from "framer-motion";
import TextPressure from "./PressureText";
import TextType from "./TextType";
import { Link } from "react-router-dom";
import Colors from "./Color";
import Color from "./Color";
// Assuming your axios instance is exported as 'api' or 'axiosInstance'
import api from "../../utils/axios"; 

const DUMMY_SERVICES = [
  { name: "Branding", slug: "branding" },
  { name: "UI / UX", slug: "ui-ux" },
  { name: "Marketing", slug: "marketing" },
  { name: "SEO", slug: "seo" }
];
/* ---------------- ACCORDION ITEM (MOBILE) ---------------- */

const FooterItem = ({ title, links = [], a = [] }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-white font-semibold"
      >
        {title}
        <span className={`text-xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <ul className="pb-4 space-y-2 text-sm text-gray-400">
          {links.map((item, i) => (
            <li key={i} className="hover:text-white transition cursor-pointer">
              {/* Fallback to '#' if link is missing */}
              <Link to={a[i] || "#"}> {item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const handleClick = () => {
  window.scrollTo(0, 0);
};
/* ---------------- MAIN FOOTER COMPONENT ---------------- */

const Footer = ({ socials = [
  { id: "social-inst-01", platform: "Instagram", logo: 'Instagram.png', url: 'https://instagram.com' },
  { id: "social-fb-03", platform: "Facebook", logo: 'Facebook.png', url: 'https://facebook.com' },
  { id: "social-yt-03", platform: "YouTube", logo: './Youtube.png', url: 'https://youtube.com' }
]}) => {
  
  const [services, setServices] = useState(DUMMY_SERVICES);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await api.get('/homepage');
        // Extracting featured_services from the data object
        const data = response.data;
        if (data && data.featured_services) {
          setServices(data.featured_services);
        }
      } catch (error) {
        console.error("Error fetching footer services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Helper to map services to names for the FooterItem
  const serviceNames = services.map(s => s.name || s.title);
  const serviceLinks = services.map(s => `/services/${s.slug || s.id}`);

  return (
    < >
      {/* MOBILE FOOTER */}
      <footer
        className="md:hidden min-h-[40vh] px-6 py-8 space-y-6"
        style={{
          paddingTop: "3vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: Colors.ElectricBlue,
          backgroundImage:'url(noiseBack.png)',
          backgroundBlendMode:'multiply',
          
        }}
      >
        <FooterItem 
          title="Services" 
          links={loading ? ["Loading..."] : serviceNames} 
          a={serviceLinks}
        />
        <FooterItem title="Pages" links={["Home", "About", "Projects", "Blog"]} a={["/home", "/about", "/projects", "/blog"]} />
        <FooterItem title="Follow US" links={["Instagram", "Facebook", "youtube"]} a={['https://www.instagram.com','https://www.facebook.com','https://www.youtube.com']}/>

        <div>
          <h3 className="text-white font-semibold mb-2">Contact Us</h3>
          <a href="mailto:hello@bloombranding.com" className="text-sm text-gray-400 hover:text-white transition">
            hello@bloombranding.com
          </a>
        </div>
        <div className="flex justify-center items-center">
          <img src="/BigLogo.png" className="h-[20vh] object-cover" alt="Logo" />
        </div>
        <div className="text-center text-white font-bold text-sm mt-4">
          © 2024 Bloom Branding. All rights reserved.
        </div>
      </footer>

      {/* DESKTOP FOOTER */}
      <motion.div
        className="hidden md:block w-screen h-[80vh] p-4 "
        style={{ backgroundColor: Colors.DarkChoc, paddingInline: '1vw' }}
           onViewportEnter={() => {

          const el = document.getElementById("path");

          el && animate(el, { pathLength: 0, x: "10vw" }, { duration: 0.8 });

        }}

        onViewportLeave={() => {

          const el = document.getElementById("path");

          el && animate(el, { pathLength: 1, x: 0 }, { duration: 0.8 });

        }}
      >
        <div className="flex h-[95%] w-full justify-between items-center px-6">
          {/* LEFT — Brand & Socials */}
          <div className="w-[20%] h-full flex flex-col justify-between" style={{ paddingBlock: 64 }}>
            <div className="flex flex-col items-center">
              <img src="/BigLogo.png" className="w-1/2 object-contain" alt="Logo" />
              <span className="text-2xl font-bold underline mt-4 overflow-hidden" style={{ color: Colors.ButterYellow }}>
                Bloom Branding
              </span>
            </div>

            <div>
              <span className="text-xl font-bold underline" style={{ color: Colors.ButterYellow }}>Follow Us</span>
              <div className="mt-4 space-y-3 flex gap-2">
                {socials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noreferrer">
                    <img src={s.logo} className="w-12 h-12 grayscale hover:grayscale-0 transition" alt={s.platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER — Call to Action */}
          <div className="w-[40%] h-full flex flex-col justify-center items-center">
            <motion.div
              className="border-8 h-[50%] w-full rounded-2xl p-6 flex flex-col items-center justify-center"
              style={{ borderColor: Colors.ButterYellow, backgroundColor: 'transparent' }}
            >
              <TextPressure text="Blooming" textColor={Colors.ButterYellow} minFontSize={36} />
              <div className="mt-2">
                <TextType text="In The Style " className="italic overflow-hidden" textColors={[Colors.ElectricBlue]} />
              </div>
            </motion.div>
            
            <motion.button
              style={{
                fontSize: "2.5vh",
                color: Color.EarlGray,
                border: "2px solid ",
                borderColor: Color.EarlGray,
                borderRadius: 200,
                paddingInline: 32,
                paddingBlock: 12,
                marginTop: 32,
                backgroundColor: 'transparent'
              }}
              whileHover={{ backgroundColor: Color.EarlGray, color: Color.ButterYellow, scale: 1.05 }}
            >
              <Link to="/contact">Enquire Now</Link>
            </motion.button>
          </div>

          {/* RIGHT COLUMN — Navigation Grids */}
          <div className="w-[30%] h-full flex flex-col justify-center gap-6">
            <div className="flex gap-6 h-[45%]">
              {/* Dynamic Services Box */}
              <div className="flex-1 border-4 rounded-2xl flex flex-col items-center justify-center text-center p-4" 
                   style={{ borderColor: Colors.ButterYellow }}>
                <h3 className="text-white font-bold text-lg mb-4">Services</h3>
                <ul className="space-y-2 text-sm">
                  {loading ? (
                    <li className="text-white/50">Loading...</li>
                  ) : (
                    services.slice(0, 5).map((service, index) => (
                      <li key={index} className="hover:underline cursor-pointer" style={{ color: Colors.ButterYellow }}>
                        <Link to={`/services/${service.slug || service.id}`}>{service.name || service.title}</Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Static Pages Box */}
              <div className="flex-1 border-4 rounded-2xl flex flex-col items-center justify-center text-center p-4" 
                   style={{ backgroundColor: Colors.ButterYellow, borderColor: Colors.EarlGray }}>
                <h3 className="text-gray-800 font-bold text-lg mb-4">Pages</h3>
                <ul className="space-y-2 text-sm text-gray-700 font-medium">
                  <li><Link to='/home' onClick={handleClick}  className="hover:text-black">Home</Link></li>
                  <li><Link to='/projects' onClick={handleClick} className="hover:text-black">Project</Link></li>
                  <li><Link to='/services' onClick={handleClick}  className="hover:text-black">Services</Link></li>
                  <li><Link to='/contact' onClick={handleClick}  className="hover:text-black">Contact</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact Box */}
            <div className="h-[25%] border-4 rounded-2xl flex flex-col items-center justify-center text-center p-4" 
                 style={{ backgroundColor: Colors.ButterYellow, borderColor: Colors.EarlGray }}>
              <h3 className="text-gray-800 font-bold text-lg mb-1">Contact Us</h3>
              <p className="text-sm text-gray-700">hello@bloombranding.com</p>
              <Link to='/contact' className="text-sm font-bold underline mt-2">Enquire Now</Link>
            </div>
          </div>
        </div>
        <hr/>
        <div className="text-center text-white font-bold text-sm mt-4">
          © 2024 Bloom Branding. All rights reserved.
        </div>
      </motion.div>
    </>
  );
};

export default Footer;