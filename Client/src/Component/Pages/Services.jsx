import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import api from "@/utils/axios";

import Header from "../Global/Header";
import Footer from "../Global/Footer";
import Menu from "../Global/Menu";
import Color from "../Global/Color.jsx";
import MouseTrail from "../Global/MouseTrail";
import ScrollStack, { ScrollStackItem } from "../Global/ScrollStack";

/* ===== DUMMY FALLBACK ===== */
const DUMMY_SERVICES = [
  {
    _id: "1",
    title: "Brand Identity",
    description:
      "We craft distinctive visual identities that resonate with your audience.",
    color: "bg-zinc-900",
    projects: 127,
  },
  {
    _id: "2",
    title: "Digital Experience",
    description:
      "Immersive web experiences that captivate and convert.",
    color: "bg-zinc-800",
    projects: 89,
  },
  {
    _id: "3",
    title: "Motion & Video",
    description:
      "Dynamic storytelling through motion and animation.",
    color: "bg-zinc-900",
    projects: 156,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/offers/admin");
        const offers = res.data?.data?.offers;

        if (offers?.length) {
          setServices(
            offers.map((offer, i) => ({
              _id: offer._id,
              title: offer.title,
              description: offer.description || "",
              color: i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800",
              projects: offer.projectsCount || 0,
            }))
          );
        } else {
          setServices(DUMMY_SERVICES);
        }
      } catch {
        setServices(DUMMY_SERVICES);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: Color.EarlGray ,backgroundImage:'url(Hero2Back.jpg)',backgroundBlendMode:'multiply'}}>
      <Header />

      {/* HERO */}
      <section className="min-h-[40vh] flex items-center justify-center px-6 py-12 ">
        <div className="max-w-5xl w-full " >
          <div
            className="aspect-video rounded-2xl flex items-center justify-center m-6"
            style={{
              backgroundImage: "url(./ServiceHero.jpg)",
              backgroundSize: "cover",
              filter: "grayscale(1)",boxShadow:'2px 2px 10px black'
            }}
          >
            <h1
              className="text-5xl md:text-7xl font-bold"
              style={{ color: Color.ButterYellow }}
            >
              SERVICES
            </h1>
          </div>
        </div>
      </section>
      <div>
        <div className="text-center">
                    <p className="text-6xl md:text-xl font-bold tracking-wider uppercase mb-1" style={{ color: Color.ButterYellow }}>
                      your voice = your signature
                    </p>
                    <p className="text-lg md:text-base text-zinc-400 uppercase tracking-wide">
                      different is good!
                    </p>
                  </div>
                </div>
      {/* STACKING CARDS */}
      <section className="relative px-6 min-h-[220vh]">
        <div className="max-w-7xl mx-auto">
          {services.length > 0 && (
            <ScrollStack
              key={services.length}     // 🔥 forces recalculation
              useWindowScroll={false}   // 🔥 Lenis-safe
              itemDistance={100}
              itemStackDistance={60}
              stackPosition="15%"
              baseScale={0.9}
              itemScale={0.02}
            >
              {services.map((service) => (
                <ScrollStackItem key={service._id}>
                  <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden" style={{backgroundColor:Color.EarlGray}}>
                    
                    {/* HEADER */}
                    <div className="p-6 md:p-8 bg-gradient-to-r from-zinc-50 to-zinc-100 border-b" style={{backgroundColor:Color.DarkChoc}}>
                      <h2 className="text-3xl md:text-5xl font-bold text-slate-900  overflow-hidden" style={{color:Color.ButterYellow}}>
                        {service.title}
                      </h2>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* MEDIA */}
                        <div className="relative aspect-square">
                          <div
                            className={`w-full h-full ${service.color} rounded-2xl`}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                              <Play className="w-8 h-8 text-black fill-black ml-1" />
                            </div>
                          </div>
                        </div>

                        {/* TEXT */}
                        <div className="flex flex-col justify-center space-y-6">
                          <p className="text-base md:text-xl text-slate-600  overflow-hidden" style={{color:Color.ButterYellow}}>
                            {service.description}
                          </p>

                          <div className="pt-4 border-t">
                            <p className="text-xs uppercase tracking-wider text-slate-400">
                              Total Projects
                            </p>
                            <p className="text-4xl font-bold text-slate-900 overflow-hidden" style={{color:Color.ElectricBlue}}>
                              {service.projects}+
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          )}
        </div>
      </section>

      <Menu />
      <Footer />
    </div>
  );
}
