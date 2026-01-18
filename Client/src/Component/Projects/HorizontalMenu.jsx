import Color from "../Global/Color";

export default function HorizontalMenu({ services, active, onChange }) {
  return (
    <div className="sticky top-0 z-20 flex gap-8 overflow-x-auto px-8 py-6 justify-center" >

      <button
        onClick={() => onChange("All")}
        className={`uppercase text-sm transition  ${
          active === "All" ? "text-white" : "text-white/40"
        }`}
      >
      </button>

      {services.map((service) => (
        <button
          key={service._id}
          style={{paddingInline:'2vw',paddingBlock:'1vh',border:'2px solid',borderColor:Color.EarlGray,borderRadius:5000}}
          onClick={() => onChange(service._id)}
          className={`uppercase text-sm transition whitespace-nowrap ${
            active === service._id
              ? `text-white`
              : "text-white/40 hover:text-white/70"
          }`}
        >
          {service.title}
        </button>
      ))}
    </div>
  );
}
