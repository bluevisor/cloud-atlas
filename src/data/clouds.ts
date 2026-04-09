import cirrus from "@/assets/clouds/cirrus.jpg";
import cirrocumulus from "@/assets/clouds/cirrocumulus.jpg";
import cirrostratus from "@/assets/clouds/cirrostratus.jpg";
import altocumulus from "@/assets/clouds/altocumulus.jpg";
import altostratus from "@/assets/clouds/altostratus.jpg";
import stratocumulus from "@/assets/clouds/stratocumulus.jpg";
import stratus from "@/assets/clouds/stratus.jpg";
import nimbostratus from "@/assets/clouds/nimbostratus.jpg";
import cumulus from "@/assets/clouds/cumulus.jpg";
import cumulonimbus from "@/assets/clouds/cumulonimbus.jpg";

import cirrusAlt from "@/assets/clouds/cirrus_alt.jpg";
import cirrocumulusAlt from "@/assets/clouds/cirrocumulus_alt.jpg";
import cirrostratusAlt from "@/assets/clouds/cirrostratus_alt.jpg";
import altocumulusAlt from "@/assets/clouds/altocumulus_alt.jpg";
import altostratusAlt from "@/assets/clouds/altostratus_alt.jpg";
import stratocumulusAlt from "@/assets/clouds/stratocumulus_alt.jpg";
import stratusAlt from "@/assets/clouds/stratus_alt.jpg";
import nimbostratusAlt from "@/assets/clouds/nimbostratus_alt.jpg";
import cumulusAlt from "@/assets/clouds/cumulus_alt.jpg";
import cumulonimbusAlt from "@/assets/clouds/cumulonimbus_alt.jpg";

export interface CloudType {
  id: string;
  name: string;
  category: "high" | "middle" | "low" | "vertical";
  altitude: string;
  image: string;
  altImage: string;
  shortDescription: string;
  description: string;
  characteristics: string[];
  aviationSignificance: string;
}

export const clouds: CloudType[] = [
  {
    id: "cirrus",
    name: "Cirrus",
    category: "high",
    altitude: "Above 20,000 ft AGL",
    image: cirrus,
    altImage: cirrusAlt,
    shortDescription: "Thin, wispy strands of ice crystals at high altitude.",
    description: "Cirrus clouds are delicate, feathery clouds composed entirely of ice crystals. They form at altitudes above 20,000 feet and are among the highest clouds in the troposphere. Their wispy, hair-like appearance is created by wind shear at high altitudes, which stretches and curves the ice crystal trails.",
    characteristics: ["Thin, wispy filaments", "Made of ice crystals", "Often indicate fair weather", "Can signal approaching warm front"],
    aviationSignificance: "Generally pose no hazard to flight but can indicate approaching weather systems. Jet contrails often form at similar altitudes."
  },
  {
    id: "cirrocumulus",
    name: "Cirrocumulus",
    category: "high",
    altitude: "Above 20,000 ft AGL",
    image: cirrocumulus,
    altImage: cirrocumulusAlt,
    shortDescription: "Small white puffs arranged in rows, forming a mackerel sky.",
    description: "Cirrocumulus clouds appear as small, white patches of cloud arranged in rows or rippled patterns, often referred to as a 'mackerel sky.' They are composed of ice crystals and supercooled water droplets at very high altitudes. These clouds are relatively rare and indicate instability at high levels.",
    characteristics: ["Small rounded puffs", "Rippled or wavelike pattern", "No shadows on ground", "Indicate high-level instability"],
    aviationSignificance: "Can indicate turbulence at high altitudes. Pilots should be aware of potential clear-air turbulence in the vicinity."
  },
  {
    id: "cirrostratus",
    name: "Cirrostratus",
    category: "high",
    altitude: "Above 20,000 ft AGL",
    image: cirrostratus,
    altImage: cirrostratusAlt,
    shortDescription: "Transparent, veil-like layer that often produces halos around the sun.",
    description: "Cirrostratus clouds form a thin, nearly transparent veil that covers large portions of the sky. Composed of ice crystals, they often create a halo effect around the sun or moon. These clouds typically precede an approaching warm front and can signal precipitation within 12-24 hours.",
    characteristics: ["Thin transparent veil", "Creates sun/moon halos", "Covers large sky areas", "Precedes warm fronts"],
    aviationSignificance: "Generally not hazardous but the halo effect can reduce visibility. Often a precursor to deteriorating weather conditions."
  },
  {
    id: "altocumulus",
    name: "Altocumulus",
    category: "middle",
    altitude: "6,500 – 20,000 ft AGL",
    image: altocumulus,
    altImage: altocumulusAlt,
    shortDescription: "White or gray patches of cloud in rounded masses at middle altitude.",
    description: "Altocumulus clouds appear as white or gray patches, sheets, or layers of cloud composed of rounded masses or rolls. They form at middle altitudes between 6,500 and 20,000 feet. When seen on a warm, humid morning, they can signal afternoon thunderstorms.",
    characteristics: ["Rounded gray/white patches", "Often in parallel bands", "Larger elements than cirrocumulus", "Can indicate convective instability"],
    aviationSignificance: "Morning altocumulus on a warm day can signal afternoon thunderstorm development. Moderate turbulence possible within these clouds."
  },
  {
    id: "altostratus",
    name: "Altostratus",
    category: "middle",
    altitude: "6,500 – 20,000 ft AGL",
    image: altostratus,
    altImage: altostratusAlt,
    shortDescription: "Gray or blue-gray sheet covering the sky, sun appears as if through frosted glass.",
    description: "Altostratus clouds form a uniform gray or blue-gray sheet or layer that partially or totally covers the sky. The sun may be dimly visible through thinner parts as if seen through frosted glass. These clouds often form ahead of storms with continuous rain or snow.",
    characteristics: ["Uniform gray sheet", "Sun dimly visible", "Covers entire sky", "Often precedes continuous precipitation"],
    aviationSignificance: "Can produce icing conditions hazardous to aircraft. Reduced visibility and instrument conditions are common when flying through altostratus layers."
  },
  {
    id: "stratocumulus",
    name: "Stratocumulus",
    category: "low",
    altitude: "Below 6,500 ft AGL",
    image: stratocumulus,
    altImage: stratocumulusAlt,
    shortDescription: "Low, lumpy gray cloud layer with patches of blue sky visible between.",
    description: "Stratocumulus clouds are low, lumpy masses of cloud that form in patches, sheets, or layers. They are the most common cloud type worldwide, covering about 20% of Earth's surface at any given time. They appear as large, dark, rounded masses with breaks of blue sky visible between.",
    characteristics: ["Low lumpy gray masses", "Most common cloud type", "Patches with gaps", "Usually no precipitation"],
    aviationSignificance: "Can cause low ceilings affecting VFR flight. Generally light turbulence within but can reduce visibility near airports."
  },
  {
    id: "stratus",
    name: "Stratus",
    category: "low",
    altitude: "Below 6,500 ft AGL",
    image: stratus,
    altImage: stratusAlt,
    shortDescription: "Uniform gray layer resembling fog that doesn't reach the ground.",
    description: "Stratus clouds form a continuous, uniform gray layer that covers the sky like a blanket. They resemble fog that doesn't reach the ground and can produce drizzle or light snow. Stratus clouds typically form in stable atmospheric conditions when a large air mass is cooled uniformly.",
    characteristics: ["Uniform featureless gray layer", "Resembles elevated fog", "May produce light drizzle", "Forms in stable conditions"],
    aviationSignificance: "Major concern for aviation due to very low ceilings. Can reduce visibility to IFR or even below minimums. Drizzle from stratus can cause icing."
  },
  {
    id: "nimbostratus",
    name: "Nimbostratus",
    category: "low",
    altitude: "Below 6,500 ft AGL",
    image: nimbostratus,
    altImage: nimbostratusAlt,
    shortDescription: "Thick, dark gray layer producing steady rain or snow.",
    description: "Nimbostratus clouds are thick, dark, and nearly uniform rain-producing clouds. They cover the sky in a dark gray layer and are associated with continuous, steady precipitation. The prefix 'nimbo' comes from the Latin word for rain, indicating their precipitation-producing nature.",
    characteristics: ["Thick dark gray layer", "Continuous precipitation", "Obscures the sun completely", "Associated with frontal systems"],
    aviationSignificance: "Hazardous to flight with embedded turbulence, icing, and very low visibility. Extended areas of precipitation make these clouds a significant concern for pilots."
  },
  {
    id: "cumulus",
    name: "Cumulus",
    category: "vertical",
    altitude: "Base below 6,500 ft, tops variable",
    image: cumulus,
    altImage: cumulusAlt,
    shortDescription: "White, fluffy clouds with flat bases and rounded tops.",
    description: "Cumulus clouds are the classic 'fair-weather' clouds with flat bases and rounded, cauliflower-like tops. They form through daytime convection as the sun heats the ground, causing warm air to rise. Fair-weather cumulus are typically small and widely spaced, indicating stable conditions.",
    characteristics: ["Flat base, rounded top", "Formed by convection", "White and fluffy", "Can grow into cumulonimbus"],
    aviationSignificance: "Fair-weather cumulus indicate thermal activity useful for glider pilots. Growing cumulus can signal developing convection and potential thunderstorms."
  },
  {
    id: "cumulonimbus",
    name: "Cumulonimbus",
    category: "vertical",
    altitude: "Base near surface, tops above 40,000 ft",
    image: cumulonimbus,
    altImage: cumulonimbusAlt,
    shortDescription: "Massive towering cloud with anvil top, producing thunderstorms.",
    description: "Cumulonimbus clouds are the king of clouds — massive, towering formations that can extend from near the surface to above 40,000 feet. Their distinctive anvil-shaped top forms when the rising air reaches the tropopause. These clouds produce thunderstorms, heavy rain, lightning, hail, and occasionally tornadoes.",
    characteristics: ["Massive vertical extent", "Anvil-shaped top", "Produces thunderstorms", "Can generate tornadoes and hail"],
    aviationSignificance: "The most dangerous cloud type for aviation. Severe turbulence, icing, hail, lightning, windshear, and microbursts. All aircraft should avoid cumulonimbus clouds by at least 20 nautical miles."
  }
];

export const categoryLabels: Record<string, string> = {
  high: "High Clouds",
  middle: "Middle Clouds",
  low: "Low Clouds",
  vertical: "Clouds with Vertical Development"
};

export const categoryColors: Record<string, string> = {
  high: "hsl(var(--primary))",
  middle: "hsl(210 60% 50%)",
  low: "hsl(160 50% 40%)",
  vertical: "hsl(280 50% 50%)"
};
