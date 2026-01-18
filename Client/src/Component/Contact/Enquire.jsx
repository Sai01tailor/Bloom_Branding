import React, { useState, useEffect, memo, useCallback } from "react";
import { TextLabel, TextAreaLabel, Slider03 } from "../Global/Label";
import LiquidEther from "./Background";
import Color from "../Global/Color";
import api from "../../utils/axios";

const MemoBackground = memo(() => (
  <div
    style={{
      width: "100%",
      height: "125%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
    }}
  >
    <LiquidEther
      colors={[Color.EarlGray, Color.DarkChoc]}
      resolution={0.2}
      iterationsPoisson={16}
      isViscous={false}
      mouseForce={15}
      autoDemo={true}
      autoIntensity={1.2}
      BFECC={false}
    />
  </div>
));

const JoinUs = () => {
  const [activeTab, setActiveTab] = useState("enquire");
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [openings, setOpenings] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingOpenings, setLoadingOpenings] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    service: "",
    desc: "",
    query: "",
    timeline: "",
    budget: [20000],
    socialLinks: [""],
    experience: "",
    opening: "",
    resume: "",
  });

  // Fetch services for the dropdown
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      try {
        const res = await api.get("/homepage");

        // Handle different response structures
        if (res.data?.success && res.data?.data) {
          setServices(
            Array.isArray(res.data?.data?.homepage?.featuredServices)
              ? res.data?.data?.homepage?.featuredServices
              : []
          );
        } else if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Services Fetch Error:", err);
        // Fallback services if API fails
        setServices([
          "Branding & Identity",
          "Web Design & Development",
          "Digital Marketing",
          "Content Creation",
          "Social Media Management",
          "SEO Services",
        ]);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  // Fetch job openings for careers dropdown
  useEffect(() => {
    const fetchOpenings = async () => {
      setLoadingOpenings(true);
      try {
        const res = await api.get("/job-openings");

        // Handle different response structures
        if (res.data?.success && res.data?.data) {
          setOpenings(Array.isArray(res.data.data) ? res.data.data : []);
        } else if (Array.isArray(res.data)) {
          setOpenings(res.data);
        } else {
          setOpenings([]);
        }
      } catch (err) {
        console.error("Job Openings Fetch Error:", err);
        // Fallback openings if API fails
        setOpenings([
          "Creative Designer",
          "Content Writer",
          "Social Media Manager",
          "Web Developer",
          "Brand Strategist",
        ]);
      } finally {
        setLoadingOpenings(false);
      }
    };

    // Only fetch when careers tab is active
    if (activeTab === "careers") {
      fetchOpenings();
    }
  }, [activeTab]);

  // Phone validation helper
  const validatePhone = (phone) => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(phone);
  };

  // Google Drive link validation helper
  const validateDriveLink = (link) => {
    return link.includes("drive.google.com");
  };

  const handlePost = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        // Phone validation for both forms
        if (!validatePhone(form.phone)) {
          alert(
            "Please enter a valid 10-digit Indian mobile number starting with 6-9"
          );
          setLoading(false);
          return;
        }

        if (activeTab === "enquire") {
          // ENQUIRY SUBMISSION - Matches backend schema
          const enquiryData = {
            name: form.name,
            email: form.email,
            company: form.company,
            service: form.service || "",
            clientDesc: form.desc || "", // Required field
            clientQuery: form.query || "",
            clientSocialHandle: form.socialLinks.filter((l) => l).join(", "),
            clientWebsite: form.website,
            contactNo: form.phone, // Required field (Regex validated on backend)
            budget: `Rs. ${form.budget[0]}`,
            timeline: form.timeline || "",
          };

          console.log("Submitting enquiry to: /enquiries");
          console.log("Enquiry data:", enquiryData);

          const response = await api.post("/enquiries", enquiryData);
          console.log("Enquiry success response:", response.data);
        } else {
          // JOB APPLICATION SUBMISSION - Matches backend schema

          // Validate Google Drive link
          if (!form.resume) {
            alert("Please provide your resume Google Drive link");
            setLoading(false);
            return;
          }

          if (!validateDriveLink(form.resume)) {
            alert("Please provide a valid Google Drive link for your resume");
            setLoading(false);
            return;
          }

          const jobData = {
            fullName: form.name,
            email: form.email,
            phone: form.phone,
            opening: form.opening,
            experience: form.experience,
            resumeLink: form.resume, // Backend expects 'resumeLink' with Google Drive URL
          };

          console.log("Submitting job application to: /job-applications");
          console.log("Job application data:", jobData);

          const response = await api.post("/job-applications", jobData);
          console.log("Job application success response:", response.data);
        }

        alert("Submitted Successfully!");

        // Clear form after successful submission
        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          website: "",
          service: "",
          desc: "",
          query: "",
          timeline: "",
          budget: [20000],
          socialLinks: [""],
          experience: "",
          opening: "",
          resume: "",
        });
      } catch (err) {
        console.error("ERROR DETAILS:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          statusText: err.response?.statusText,
          config: err.config,
        });

        alert(
          err.response?.data?.message ||
            err.response?.data?.error ||
            `Submission failed: ${err.message}. Check console for details.`
        );
      } finally {
        setLoading(false);
      }
    },
    [form, activeTab]
  );

  return (
    <>
      <div
        style={{
          backgroundColor: Color.EarlGray,
          minHeight: "100vh",
          position: "relative",
          padding: "80px 20px",
          overflow: "hidden",
        }}
      >
        <MemoBackground />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              flex: "1",
              minWidth: "320px",
              maxWidth: "650px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              borderRadius: "32px",
              padding: "32px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {/* Tab Switcher */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "30px",
                background: "rgba(0,0,0,0.15)",
                padding: "5px",
                borderRadius: "18px",
              }}
            >
              {["enquire", "careers"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "none",
                    borderRadius: "14px",
                    cursor: "pointer",
                    background:
                      activeTab === t ? Color.DarkChoc : "transparent",
                    color: activeTab === t ? "#fff" : "#000",
                    fontWeight: "700",
                    transition: "0.3s",
                  }}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            <form
              onSubmit={handlePost}
              style={{ display: "grid", gap: "18px" }}
            >
              {/* Row 1: Name & Email */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}
              >
                <TextLabel
                  label={activeTab === "enquire" ? "Name*" : "Full Name*"}
                  setLabel={(v) => setForm({ ...form, name: v })}
                  placeHolder="Your Name"
                  compul
                />
                <TextLabel
                  label="Email*"
                  setLabel={(v) => setForm({ ...form, email: v })}
                  placeHolder="email@example.com"
                  compul
                />
              </div>

              {/* Row 2: Phone & (Company OR Opening) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}
              >
                <TextLabel
                  label="Phone*"
                  setLabel={(v) => setForm({ ...form, phone: v })}
                  placeHolder="10-digit Mobile"
                  compul
                />
                {activeTab === "enquire" ? (
                  <TextLabel
                    label="Company"
                    setLabel={(v) => setForm({ ...form, company: v })}
                    placeHolder="Your Company"
                  />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        color: "#fff",
                        fontSize: "12px",
                        marginBottom: "6px",
                        fontWeight: "600",
                      }}
                    >
                      Opening Applying For*
                    </label>
                    {loadingOpenings ? (
                      <input
                        disabled
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          border: "none",
                          background: "#f0f0f0",
                        }}
                        value="Loading openings..."
                        readOnly
                      />
                    ) : openings.length > 0 ? (
                      <select
                        required
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          border: "none",
                        }}
                        value={form.opening}
                        onChange={(e) =>
                          setForm({ ...form, opening: e.target.value })
                        }
                      >
                        <option value="">Select Opening</option>
                        {openings.map((opening, i) => (
                          <option
                            key={i}
                            value={
                              typeof opening === "object"
                                ? opening.title || opening.name || opening.value
                                : opening
                            }
                          >
                            {typeof opening === "object"
                              ? opening.title || opening.name || opening.label
                              : opening}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        required
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          border: "none",
                        }}
                        placeholder="e.g. Creative Designer"
                        value={form.opening}
                        onChange={(e) =>
                          setForm({ ...form, opening: e.target.value })
                        }
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Tab Specific Fields */}
              {activeTab === "enquire" ? (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label
                        style={{
                          color: "#fff",
                          fontSize: "12px",
                          marginBottom: "6px",
                          fontWeight: "600",
                        }}
                      >
                        Service
                      </label>
                      {loadingServices ? (
                        <select
                          disabled
                          style={{
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                            background: "#f0f0f0",
                          }}
                        >
                          <option>Loading services...</option>
                        </select>
                      ) : (
                        <select
                          style={{
                            padding: "12px",
                            borderRadius: "12px",
                            border: "none",
                          }}
                          value={form.service}
                          onChange={(e) =>
                            setForm({ ...form, service: e.target.value })
                          }
                        >
                          <option value="">Select Service</option>
                          {services.map((s, i) => (
                            <option
                              key={i}
                              value={
                                typeof s === "object"
                                  ? s.value || s.name || s.title
                                  : s
                              }
                            >
                              {typeof s === "object"
                                ? s.label || s.name || s.title
                                : s}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <TextLabel
                      label="Website"
                      setLabel={(v) => setForm({ ...form, website: v })}
                      placeHolder="https://..."
                    />
                  </div>

                  <TextAreaLabel
                    label="Message / Description*"
                    setLabel={(v) => setForm({ ...form, desc: v })}
                    placeHolder="Tell us about your requirements"
                    compul
                  />

                  <TextAreaLabel
                    label="Additional Query"
                    setLabel={(v) => setForm({ ...form, query: v })}
                    placeHolder="Any specific questions or requirements?"
                  />

                  <TextLabel
                    label="Timeline"
                    setLabel={(v) => setForm({ ...form, timeline: v })}
                    placeHolder="e.g., 2-3 months"
                  />

                  <div style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "700",
                        marginBottom: "8px",
                      }}
                    >
                      <span>BUDGET</span>
                      <span>Rs. {form.budget[0]}</span>
                    </div>
                    <Slider03
                      value={form.budget}
                      setValue={(v) => setForm({ ...form, budget: v })}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        color: "#fff",
                        fontSize: "12px",
                        marginBottom: "6px",
                        fontWeight: "600",
                      }}
                    >
                      Experience Level*
                    </label>
                    <select
                      required
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border: "none",
                      }}
                      value={form.experience}
                      onChange={(e) =>
                        setForm({ ...form, experience: e.target.value })
                      }
                    >
                      <option value="">Select Level</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  <TextLabel
                    label="Resume Google Drive Link*"
                    setLabel={(v) => setForm({ ...form, resume: v })}
                    placeHolder="https://drive.google.com/file/d/..."
                    compul
                  />

                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <strong>Note:</strong> Please upload your resume to Google
                    Drive, set sharing to "Anyone with the link can view", and
                    paste the link above.
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  border: "none",
                  background: "#fff",
                  color: "#000",
                  fontWeight: "800",
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: "10px",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading
                  ? "SUBMITTING..."
                  : activeTab === "enquire"
                  ? "LET'S CREATE"
                  : "SUBMIT APPLICATION"}
              </button>
            </form>
          </div>
          <QuickContact />
        </div>
      </div>
    </>
  );
};

const QuickContact = () => {
  const data = [
    { label: "Email", val: "studio@creative.com", icon: "✉️" },
    { label: "Phone", val: "+91 88822 11000", icon: "📞" },
    { label: "Office", val: "Bandra West, Mumbai", icon: "📍" },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "320px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "32px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.2)",
        height: "fit-content",
      }}
    >
      <h2
        style={{
          color: Color.DarkChoc,
          fontSize: "24px",
          textDecoration:'underline',
          fontWeight: "600",
          marginBottom: "24px",
        }}
      >
        Contact Us
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {data.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                color: Color.DarkChoc,
                background: "rgba(255,255,255,0.1)",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              {item.icon}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "10px",
                  color: Color.DarkChoc,
                  fontWeight: "700",
                }}
              >
                {item.label.toUpperCase()}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: Color.DarkChoc,
                  fontWeight: "500",
                  overflow: "hidden",
                }}
              >
                {item.val}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinUs;