import Header from '../Global/Header'
import Footer from '../Global/Footer'
import { useEffect, useState, useMemo } from "react";
import api from "@/utils/axios";
import HorizontalMenu from "../Projects/HorizontalMenu";
import ProjectsGrid from "../Projects/ProjectGrid";
import Color from '../Global/Color'
import Menu from '../Global/Menu';
/* ===== DUMMY FALLBACK ===== */
const DUMMY_SERVICES = [
  { _id: "all", title: "All" },
  { _id: "design", title: "Design" },
  { _id: "development", title: "Development" },
  { _id: "3d", title: "3D" },
  { _id: "branding", title: "Branding" },
  { _id: "ai", title: "AI" },
];

const DUMMY_PROJECTS = [
  {
    _id: "1",
    title: "Creative Website",
    clientname: "Nike",
    year: "2024",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    service: { _id: "design", title: "Design" },
  },
  {
    _id: "2",
    title: "AI Dashboard",
    clientname: "Google",
    year: "2023",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    service: { _id: "ai", title: "AI" },
  },
  {
    _id: "1",
    title: "Creative Website",
    clientname: "Nike",
    year: "2024",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    service: { _id: "design", title: "Design" },
  },
  {
    _id: "2",
    title: "AI Dashboard",
    clientname: "Google",
    year: "2023",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    service: { _id: "ai", title: "AI" },
  },
  {
    _id: "1",
    title: "Creative Website",
    clientname: "Nike",
    year: "2024",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    service: { _id: "design", title: "Design" },
  },
  {
    _id: "2",
    title: "AI Dashboard",
    clientname: "Google",
    year: "2023",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    service: { _id: "ai", title: "AI" },
  },
  {
    _id: "1",
    title: "Creative Website",
    clientname: "Nike",
    year: "2024",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    service: { _id: "design", title: "Design" },
  },
  {
    _id: "2",
    title: "AI Dashboard",
    clientname: "Google",
    year: "2023",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    service: { _id: "ai", title: "AI" },
  },
  {
    _id: "1",
    title: "Creative Website",
    clientname: "Nike",
    year: "2024",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    service: { _id: "design", title: "Design" },
  },
  {
    _id: "2",
    title: "AI Dashboard",
    clientname: "Google",
    year: "2023",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    service: { _id: "ai", title: "AI" },
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, offersRes] = await Promise.all([
          api.get("/projects/active"),
          api.get("/offers/admin"),
        ]);

        /* ===== PROJECTS ===== */
        if (
          projectsRes.data?.success &&
          projectsRes.data.projects?.length
        ) {
          setProjects(projectsRes.data.projects);
        } else {
          setProjects(DUMMY_PROJECTS);
        }

        /* ===== SERVICES ===== */
        const backendServices =
          offersRes.data?.data?.offers;

        if (backendServices?.length) {
          setServices([
            { _id: "all", title: "All" },
            ...backendServices,
          ]);
        } else {
          setServices(DUMMY_SERVICES);
        }
      } catch (error) {
        console.warn("Backend unavailable → using dummy data");
        setProjects(DUMMY_PROJECTS);
        setServices(DUMMY_SERVICES);
      }
    };

    fetchData();
  }, []);

  /* ===== FILTER ===== */
  const filteredProjects = useMemo(() => {
    if (activeService === "all") return projects;
    return projects.filter(
      (p) => p.service?._id === activeService
    );
  }, [projects, activeService]);

  return (<>
    <Header/>
    <Menu/>
    <section className="min-h-screen  text-white pt-[8vh]"style={{backgroundImage:`linear-gradient(black,${Color.DarkChoc} ,${Color.EarlGray})`}}>
      <HorizontalMenu
        services={services}
        active={activeService}
        onChange={setActiveService}
      />

      <ProjectsGrid projects={filteredProjects} />
    </section>
    <Footer/>
    </>
  );
}
