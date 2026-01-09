import React, { useState } from "react";
import { TextLabel, TextAreaLabel, Slider03 } from "../Global/Label";
import LiquidEther from "./Background";
import Footer from '../Global/Footer'
import Menu from "../Global/Menu";
import Color from "../Global/Color";
const Enquire = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState([0]);

  return (
    <>
    <Menu/>
    <div className="min-h-screen  w-full flex items-center justify-center p-6"
    style={{backgroundColor:Color.ButterYellow}}>
      <div
        style={{
          width: "100%",
          height: "125%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <LiquidEther
          colors={[Color.EarlGray,Color.DarkChoc]}
          mouseForce={20}
          cursorSize={50}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      {/* The iOS 18 Glass Card */}
      <div
        className="ios-glass-card w-full max-w-[600px] p-10 flex flex-col gap-6 relative "
        style={{ padding: 16, paddingBottom: 64,marginBottom:32,marginTop:32 }}
      >
        <header className="text-center mb-4">
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            Let's Create something Amazing Together!
          </h1>
        </header>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          <TextLabel
            label="Name*"
            setLabel={setName}
            placeHolder="Enter your name"
            compul={true}
          />
          <TextLabel
            label="Company Name"
            setLabel={setCompany}
            placeHolder="Enter company name"
          />
          <TextLabel
            label="Email*"
            setLabel={setEmail}
            placeHolder="Enter email address"
            type="email"
            compul={true}
          />
          <TextLabel
            label="Phone Number*"
            setLabel={setPhone}
            placeHolder="Enter phone number"
            compul={true}
          />
          <TextLabel
            label="Website"
            setLabel={setWebsite}
            placeHolder="Enter website URL"
          />

          <TextAreaLabel
            label="Project Description"
            setLabel={setDesc}
            placeHolder="Tell us about your project..."
          />

          <div className="space-y-3">
            <div className="flex justify-between text-white/80 text-sm font-medium">
              <span>Budget</span>
              <span>Rs. {budget}-1,00,000</span>
            </div>
            <Slider03 value={budget} setValue={setBudget} />
          </div>

          <button className="ios-button mt-4">Let's Create</button>
        </form>
      </div>
    </div>
      <Footer/></>
  );
};

export default Enquire;
