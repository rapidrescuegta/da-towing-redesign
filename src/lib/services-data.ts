export interface ServiceData {
  slug: string;
  title: string;
  headline: string;
  description: string;
  details: string[];
  image?: string;
  features: string[];
  callout?: string;
}

export const servicesData: ServiceData[] = [
  {
    slug: "equipment-towing",
    title: "Equipment Towing",
    headline: "Heavy Equipment Moving & Transport",
    description:
      "D&A Towing provides professional equipment towing and transport services for construction companies, contractors, and industrial operations across Ontario. From excavators to loaders, we have the specialized trailers and experienced operators to move your heavy machinery safely.",
    details: [
      "We handle all types of construction and industrial equipment — excavators, bulldozers, backhoes, skid steers, compactors, generators, and more.",
      "Our fleet includes lowboy trailers, flatdecks, and float trailers rated for the heaviest loads. Every piece of equipment is secured with proper chains, binders, and blocking per MTO regulations.",
      "Whether it's a single machine move across town or a full site relocation, we coordinate logistics to minimize your downtime and keep your project on schedule.",
    ],
    image: "/images/equipment-towing.jpg",
    features: [
      "Lowboy & float trailers for oversized loads",
      "Fully licensed for highway transport",
      "Proper securement per MTO regulations",
      "Site-to-site and cross-province transport",
      "Experienced heavy equipment operators",
      "Competitive rates for contractors",
    ],
    callout: "Moving a piece of equipment? Call us for a free quote — we'll beat any comparable rate in Simcoe County.",
  },
  {
    slug: "heavy-duty-towing",
    title: "Heavy Duty Towing",
    headline: "Commercial & Heavy Duty Towing Services",
    description:
      "When the big rigs go down, D&A Towing answers the call. Our heavy duty fleet handles commercial trucks, tractor-trailers, buses, and large vehicles that other tow companies can't touch.",
    details: [
      "Our heavy duty wreckers and rotators are equipped to handle vehicles up to 40+ tons. We tow semis, dump trucks, cement mixers, buses, RVs, and more.",
      "We provide emergency recovery for jackknifed trailers, rollovers, and highway incidents. Our operators are trained in safe recovery techniques that protect your vehicle and minimize road closures.",
      "We also offer scheduled heavy duty tows for breakdowns, relocations, and transport to repair facilities anywhere in Ontario.",
    ],
    image: "/images/heavy-duty.jpg",
    features: [
      "40+ ton towing capacity",
      "Tractor-trailer & semi recovery",
      "Jackknife & rollover recovery",
      "Highway incident response",
      "Bus & RV towing",
      "24/7 emergency dispatch",
    ],
  },
  {
    slug: "rv-towing",
    title: "RV Towing",
    headline: "RV & Motorhome Towing Specialists",
    description:
      "D&A Towing specializes in the safe transport of recreational vehicles — motorhomes, travel trailers, fifth wheels, and campers of all sizes. We understand these aren't just vehicles, they're your home away from home.",
    details: [
      "RVs require special handling due to their size, weight distribution, and the personal belongings inside. Our operators are experienced with all RV types and use proper equipment to avoid damage.",
      "Whether your motorhome broke down on the highway, you need a trailer moved to a new campsite, or you're transporting an RV purchase, we handle it with care.",
      "We tow Class A, B, and C motorhomes, travel trailers, fifth wheels, toy haulers, and pop-up campers throughout Ontario and beyond.",
    ],
    image: "/images/rv-towing.jpg",
    features: [
      "All RV classes — A, B, C",
      "Travel trailers & fifth wheels",
      "Damage-free transport guaranteed",
      "Long-distance RV transport available",
      "Campsite-to-campsite moves",
      "Breakdown recovery on all highways",
    ],
  },
  {
    slug: "light-duty-towing",
    title: "Light Duty Towing",
    headline: "Cars, SUVs & Light Truck Towing",
    description:
      "The backbone of our business — fast, reliable towing for everyday vehicles. Whether you've broken down, been in a fender bender, or need a vehicle relocated, D&A Towing gets you moving again.",
    details: [
      "We tow cars, SUVs, pickup trucks, and small commercial vehicles using modern wheel-lift and flatbed equipment. Your vehicle is in safe hands.",
      "Our average response time is 30 minutes across the Barrie area. We dispatch the closest available truck to your location and keep you updated until we arrive.",
      "We work with all major insurance companies, CAA, and roadside assistance programs. We can tow to any destination — your mechanic, dealership, home, or our secure storage facility.",
    ],
    image: "/images/light-duty.jpg",
    features: [
      "30-minute average response time",
      "Flatbed & wheel-lift options",
      "Insurance & CAA accepted",
      "Tow to any destination",
      "Lockout & roadside assistance",
      "Accident scene towing",
    ],
  },
  {
    slug: "flatbed-towing",
    title: "Flatbed Towing",
    headline: "Zero-Contact Flatbed Transport",
    description:
      "Flatbed towing is the safest method for transporting vehicles — especially luxury cars, lowered vehicles, AWD/4WD, and classic cars. The vehicle rides on a flat platform with zero wheel contact on the road.",
    details: [
      "Our flatbed trucks gently load your vehicle using a hydraulic tilting platform or winch system, then secure it with professional-grade straps and wheel chocks.",
      "This method eliminates drivetrain wear and road damage, making it the preferred choice for high-value vehicles, accident-damaged cars that can't roll, and vehicles with transmission issues.",
      "We maintain a fleet of flatbeds in various sizes to handle everything from compact cars to large SUVs and trucks.",
    ],
    image: "/images/flatbed.jpg",
    features: [
      "Zero drivetrain wear",
      "Ideal for luxury & lowered vehicles",
      "AWD/4WD safe — no transmission damage",
      "Accident-damaged vehicle transport",
      "Classic & collector car transport",
      "Hydraulic tilt loading",
    ],
  },
  {
    slug: "accident-towing",
    title: "Accident Recovery",
    headline: "24/7 Emergency Accident Towing & Recovery",
    description:
      "Accidents are stressful enough. D&A Towing provides fast, professional accident recovery services that handle the heavy lifting so you can focus on what matters — your safety and your next steps.",
    details: [
      "We respond to accident scenes across Barrie, Orillia, Essa, and all of Simcoe County around the clock. Our dispatchers coordinate with police and emergency services to clear the scene safely and efficiently.",
      "Our operators are trained in accident scene management, debris cleanup, and fluid containment. We recover vehicles from ditches, medians, embankments, and multi-vehicle pileups.",
      "We work directly with your insurance company and can tow your vehicle to any body shop, dealership, or our secure storage facility until you're ready to decide next steps.",
    ],
    image: "/images/accident.jpg",
    features: [
      "24/7 emergency response",
      "Police & insurance coordination",
      "Debris cleanup & fluid containment",
      "Ditch & rollover recovery",
      "Secure vehicle storage included",
      "Direct insurance billing available",
    ],
  },
  {
    slug: "auto-car-hauling",
    title: "Auto Car Hauling",
    headline: "Multi-Vehicle Transport & Car Hauling",
    description:
      "D&A Towing offers professional auto hauling services for dealerships, auctions, fleet operators, and individuals who need multiple vehicles transported efficiently and on schedule.",
    details: [
      "Our car haulers can transport multiple vehicles at once, making them the most cost-effective option for dealership transfers, auction pickups, and fleet relocations.",
      "Every vehicle is individually secured and inspected before transport. We document condition before and after, giving you complete peace of mind.",
      "We serve dealerships, auto auctions, rental companies, and private sellers across Ontario with reliable, scheduled transport services.",
    ],
    image: "/images/auto-hauling.jpg",
    features: [
      "Multi-vehicle transport capacity",
      "Dealership & auction services",
      "Fleet relocation specialists",
      "Pre/post transport condition reports",
      "Scheduled & on-demand service",
      "Ontario-wide coverage",
    ],
  },
  {
    slug: "float-towing",
    title: "Float Towing",
    headline: "Float & Trailer Towing Services",
    description:
      "D&A Towing provides float towing services for equipment floats, utility trailers, and specialized trailers across Barrie and the surrounding region. Our D&A Float Services division handles it all.",
    details: [
      "Equipment floats are essential for moving heavy machinery between job sites. We tow all sizes of floats with proper truck-and-trailer combinations rated for the load.",
      "Whether you need a float picked up and delivered, moved between construction sites, or transported for maintenance, our team handles it safely and on time.",
      "Our D&A Float Services division operates dedicated equipment for float towing, ensuring availability and reliability for contractors who depend on timely equipment moves.",
    ],
    features: [
      "Equipment float transport",
      "All trailer sizes accommodated",
      "Contractor & construction site service",
      "Dedicated float towing equipment",
      "Simcoe County & beyond",
      "Call D&A Float Services: 705-726-1267",
    ],
  },
  {
    slug: "cross-country-transport",
    title: "Cross-Country Transport",
    headline: "Long-Distance Auto Transport Across Canada",
    description:
      "Need a vehicle moved across the province or across the country? D&A Towing offers long-distance auto transport with door-to-door service and real-time updates throughout the journey.",
    details: [
      "We transport cars, trucks, SUVs, and specialty vehicles anywhere in Canada. Whether you're relocating, buying a vehicle from another province, or shipping for any reason — we've got you covered.",
      "Our long-distance transport service includes door-to-door pickup and delivery, enclosed or open transport options, and full insurance coverage for the journey.",
      "We provide competitive quotes based on distance, vehicle type, and timeline. Contact us for a custom quote — we often beat the national carriers on price and service quality.",
    ],
    features: [
      "Door-to-door service across Canada",
      "Open & enclosed transport options",
      "Full insurance coverage in transit",
      "Real-time tracking updates",
      "Competitive long-distance rates",
      "Personal & dealership transport",
    ],
  },
  {
    slug: "storage-warehousing",
    title: "Storage & Warehousing",
    headline: "Secure Vehicle Storage in Barrie",
    description:
      "D&A Towing operates a secure, gated storage facility at our Barrie location on Tiffin Street. We offer short and long-term vehicle storage with 24/7 surveillance and easy access.",
    details: [
      "Our facility offers both indoor and outdoor storage options for vehicles of all sizes — cars, trucks, RVs, trailers, and equipment. The yard is fully fenced and gated with security cameras.",
      "Storage is available for accident holds, insurance claims, impounds, seasonal storage, and general vehicle storage. We work with insurance companies and police services for evidence holds.",
      "Vehicle access is available during business hours, and after-hours access can be arranged. We maintain a clean, organized facility and treat every stored vehicle with care.",
    ],
    features: [
      "Gated & fenced facility",
      "24/7 security surveillance",
      "Indoor & outdoor options",
      "Short & long-term storage",
      "Insurance & police hold storage",
      "Convenient Barrie location on Tiffin St",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
