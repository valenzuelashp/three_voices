/**
 * Group copy lives here.
 * Charles edits advocacies.nature.
 * Sharmaine edits advocacies.animals, plus the shared homepage text in `site`.
 * Ia edits advocacies.climate.
 * The "A note from" paragraphs are starter reflections. Rewrite them in your own words.
 */

export const site = {
  name: "Three Voices",
  tagline: "Protecting Nature, Defending Life, Securing Our Future.",
  lede: "Charles, Sharmaine, and Ia each keep a portfolio on this site. One speaks for forests and natural habitats. One speaks for the way people treat animals. One speaks for the warming climate those lives depend on.",
}

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Nature", to: "/nature" },
  { label: "Animals", to: "/animals" },
  { label: "Climate", to: "/climate" },
  { label: "Get involved", to: "/get-involved" },
]

export const sources = [
  {
    id: "fao-2025",
    label: "FAO, Global Forest Resources Assessment 2025, key findings",
    url: "https://openknowledge.fao.org/server/api/core/bitstreams/2dee6e93-1988-4659-aa89-30dd20b43b15/content/FRA-2025/key-findings.html",
  },
  {
    id: "ipbes-2019",
    label: "IPBES, Global Assessment media release (2019)",
    url: "https://www.ipbes.net/node/35234",
  },
  {
    id: "woah",
    label: "World Organisation for Animal Health, animal welfare vision paper",
    url: "https://www.woah.org/app/uploads/2024/01/en-woah-visionpaper-animalwelfare.pdf",
  },
  {
    id: "wap-2019",
    label: "World Animal Protection, Annual Report 2019",
    url: "https://www.worldanimalprotection.org/globalassets/pdfs/annual-reports/english/world-animal-protection-annual-report-2019.pdf",
  },
  {
    id: "igcc-2025",
    label: "Forster et al., Indicators of Global Climate Change 2025, Earth System Science Data (2026)",
    url: "https://essd.copernicus.org/articles/18/3889/2026/",
  },
  {
    id: "igcc-summary",
    label: "Indicators of Global Climate Change, 2025 summary",
    url: "https://indicators.climate.copernicus.eu/",
  },
  {
    id: "bams-2025",
    label: "American Meteorological Society, State of the Climate in 2025",
    url: "https://www.ametsoc.org/ams/about-ams/news/news-releases/international-state-of-the-climate-report-confirms-record-high-greenhouse-gases-global-sea-level-and-ocean-heat-in-2025/",
  },
]

export const homeFacts = [
  {
    stat: "32%",
    label: "of land worldwide is forest",
    detail: "The FAO estimates 4.14 billion hectares of forest in 2025.",
    source: "FAO, 2025",
    to: "/nature#issues",
    accent: "#86EFAC",
  },
  {
    stat: "400 million",
    label: "free-roaming dogs, by one global estimate",
    detail: "World Animal Protection uses this figure and says mass culling does not fix the problem.",
    source: "World Animal Protection, 2019",
    to: "/animals#issues",
    accent: "#D8B4FE",
  },
  {
    stat: "1.39°C",
    label: "warmer in 2025 than 1850–1900",
    detail: "Researchers put human-caused warming that year at about 1.37°C.",
    source: "Indicators of Global Climate Change, 2025",
    to: "/climate#issues",
    accent: "#7DD3FC",
  },
]

export const advocacies = {
  nature: {
    slug: "nature",
    path: "/nature",
    nav: "Nature",
    member: "Charles",
    title: "Nature Conservation",
    accent: "#86EFAC",
    summary: "Protect forests, biodiversity, and the habitats that hold them together.",
    hero: {
      kicker: "Charles · Advocacy 01",
      headline: "Protect our nature",
      lede: "Forests, wildlife, and clean water depend on habitats that are still being cleared. This page explains what is being lost, and what a person can do to keep natural places intact.",
      image: "/images/nature-forest.jpg",
      imageAlt: "A dirt path through a tall green forest, with sunlight between the trunks",
    },
    about: {
      title: "About this advocacy",
      paragraphs: [
        "Nature conservation is the work of keeping forests, rivers, soil, and wild habitats intact, and of restoring them where they have been cut or broken apart. These places are not empty scenery. They hold soil, store carbon, steady water, and give plants and animals somewhere to live.",
        "Charles focuses on deforestation, biodiversity, and the protection of natural habitats. The goal is to help visitors notice what healthy nature does, then choose one action that leaves more of it standing.",
      ],
    },
    issues: [
      {
        stat: "4.12 million ha",
        statLabel: "net forest loss each year, 2015–2025",
        title: "Forests are still shrinking",
        text: "The FAO’s 2025 assessment puts global forest at 4.14 billion hectares, about 32 percent of the world’s land. Net loss counts deforestation minus new forest, so it is smaller than deforestation alone. The yearly net loss has fallen from 10.7 million hectares in the 1990s, and it has not stopped. In many tropical regions, older natural forest is still cleared for farms, roads, and timber.",
        source: "FAO Global Forest Resources Assessment 2025",
        image: "/images/nature-canopy.jpg",
        imageAlt: "Mist resting on a mountainside covered in dense green forest",
      },
      {
        stat: "1 million",
        statLabel: "species threatened, by the IPBES estimate",
        title: "Species lose a home before they lose a name",
        text: "The 2019 IPBES Global Assessment estimated that around 1 million animal and plant species are threatened with extinction, many within decades, unless the pressures on them are reduced. It also estimated that more than 500,000 terrestrial species do not have enough habitat left for long-term survival unless that habitat is restored. A forest split into fragments is harder for animals to cross, feed in, and breed in.",
        source: "IPBES Global Assessment, 2019",
      },
      {
        title: "Habitat, water, and carbon work together",
        text: "A standing forest is doing several jobs at once. Roots hold soil. Canopies slow rainfall. Trees store carbon that would otherwise sit in the air. When the forest goes, those jobs go with it, and the animals that lived there have to move or decline. Protecting a watershed, a mangrove, or a patch of native trees is nature conservation even when it does not look like a famous park.",
        source: "FAO and IPBES, summarized above",
        image: "/images/nature-water.jpg",
        imageAlt: "A tall waterfall in a forested canyon, with a footbridge crossing in front of the falls",
      },
    ],
    help: [
      {
        title: "Learn one nearby habitat",
        text: "Pick a park, river, empty lot with native plants, or forest edge you can actually visit. Learn what lives there before you decide it does not matter.",
      },
      {
        title: "Use fewer throwaway wood and paper products",
        text: "Reuse paper, skip extra packaging when you have a choice, and ask where wood products come from. A small cut in demand is still a real cut.",
      },
      {
        title: "Leave wild animals in the wild",
        text: "Do not buy pets taken from forests or oceans, and do not buy products made from threatened wildlife.",
      },
      {
        title: "Help a real place",
        text: "Join a watershed cleanup, a native-tree planting, or a park program that tells you exactly where the work happens. Then share one fact from this page with the source attached.",
      },
    ],
    reflection:
      "I chose nature conservation because wild places are easy to treat as a backdrop for photos instead of as systems people depend on. I want this page to make forests and habitats feel specific, and to leave visitors with one step they can take without waiting for someone else to care first.",
    sourceIds: ["fao-2025", "ipbes-2019"],
  },
  animals: {
    slug: "animals",
    path: "/animals",
    nav: "Animals",
    member: "Sharmaine",
    title: "Animal Welfare",
    accent: "#D8B4FE",
    summary: "Stand up for pets, free-roaming animals, and wildlife.",
    hero: {
      kicker: "Sharmaine · Advocacy 02",
      headline: "Stand up for animals",
      lede: "Animals live with the consequences of ordinary human choices. This page is about responsible care, free-roaming dogs, wildlife, and ways to prevent harm.",
      image: "/images/animals-dogs.jpg",
      imageAlt: "Two small dogs running toward the camera on a dirt path in warm light",
    },
    about: {
      title: "About this advocacy",
      paragraphs: [
        "Animal welfare asks what an animal’s life is actually like: food, water, health, room to move, and freedom from cruelty. Sharmaine’s portfolio looks at pets, free-roaming dogs, and wildlife. The photos show animals at ease. The facts below name what happens when that care is missing.",
        "Animals raised for food belong to the same question. The World Organisation for Animal Health notes that more than 80 billion terrestrial animals are raised and slaughtered for meat each year, not counting aquatic animals. How those animals are housed, handled, and killed is a welfare issue, even when it happens out of sight.",
      ],
    },
    issues: [
      {
        title: "A pet is a commitment, not a mood",
        text: "Responsible ownership means food, water, shelter, veterinary care, and a home for the animal’s whole life. Adoption can be a good way to begin, and it only helps if the person is ready to stay. When plans change, abandoning an animal is not a solution. Shelters and rescues would rather be asked for help than receive an animal left behind.",
        source: "Animal welfare practice, and WOAH on the duty of care",
        image: "/images/animals-cat.jpg",
        imageAlt: "A black-and-white cat resting its paws on a wooden rail and looking at the camera",
      },
      {
        stat: "400 million",
        statLabel: "free-roaming dogs, World Animal Protection estimate",
        title: "Culling does not solve a roaming-dog problem",
        text: "Estimates vary, and World Animal Protection has written of about 400 million free-roaming dogs, many living with hunger, injury, disease, and little veterinary care. The same report says that around 10 million are killed in culls, often because of fear of rabies or the number of dogs on a street. Beating, poison, and similar methods are cruel, and they do not last. Humane management means vaccination, sterilization, registration, and people who do not abandon dogs. The organization notes that eliminating rabies from an area means vaccinating about 70 percent of its dogs.",
        source: "World Animal Protection, Annual Report 2019",
      },
      {
        stat: ">40%",
        statLabel: "of amphibian species are threatened",
        title: "Wild animals need somewhere to live",
        text: "IPBES reports that more than 40 percent of amphibian species, almost a third of reef-forming corals, and more than a third of marine mammals are threatened. The drivers it names are land and sea use, direct exploitation, climate change, pollution, and invasive species. Protecting wildlife includes leaving habitat in place. Charles’s portfolio stays with that habitat. Ia’s stays with the climate pressure.",
        source: "IPBES Global Assessment, 2019",
        image: "/images/animals-deer.jpg",
        imageAlt: "A buck standing in a grassy field with trees behind him",
      },
    ],
    help: [
      {
        title: "Decide before you take an animal in",
        text: "If you want a pet, adopt from a shelter when you can, and only if you can pay for food, care, and time. A cute photo is not a plan.",
      },
      {
        title: "Sterilize, vaccinate, and do not abandon",
        text: "Ask a vet or a shelter about sterilization and vaccines. If you cannot keep an animal, contact a rescue before you leave it somewhere.",
      },
      {
        title: "Report cruelty without putting yourself in danger",
        text: "Tell local authorities or a trusted rescue what you saw. Do not start a confrontation that could harm you or the animal further. Do not share videos that treat animal harm as entertainment.",
      },
      {
        title: "Give wildlife distance",
        text: "Do not keep a wild animal as a pet. Do not feed wild animals in a way that makes them sick or dependent. Watching quietly is a form of respect.",
      },
    ],
    reflection:
      "I chose animal welfare because compassion is easy to claim and harder to practice. It shows up in ordinary decisions: whether a pet is cared for, whether a dog on the street is ignored, and whether a wild animal is left with somewhere to live. I hope this page makes those choices clearer, and offers help that is kind and responsible.",
    sourceIds: ["woah", "wap-2019", "ipbes-2019"],
  },
  climate: {
    slug: "climate",
    path: "/climate",
    nav: "Climate",
    member: "Ia",
    title: "Global Warming",
    accent: "#7DD3FC",
    summary: "Understand the warming, then cut waste and emissions where you can.",
    hero: {
      kicker: "Ia · Advocacy 03",
      headline: "Face global warming",
      lede: "Earth’s average temperature is rising because greenhouse gases from human activity are holding more heat in the atmosphere. This page starts with the measurements, then turns them into habits worth keeping.",
      image: "/images/climate-earth.jpg",
      imageAlt: "Earth at night from orbit, with city lights and a thin blue atmosphere",
    },
    about: {
      title: "About this advocacy",
      paragraphs: [
        "Global warming is the rise in Earth’s average surface temperature. The main cause is greenhouse gases, especially carbon dioxide from burning coal, oil, and gas, along with methane and nitrous oxide. A warmer planet changes heat, rain, ice, oceans, crops, and the habitats other living things need.",
        "Ia’s goal is climate-conscious action that still tells the truth about scale. Personal habits matter. They do not replace cleaner energy, safer transport, or the protection of forests. Both levels count, and neither one excuses the other.",
      ],
    },
    issues: [
      {
        stat: "1.39°C",
        statLabel: "above 1850–1900 in the year 2025",
        title: "The warming is already measured",
        text: "A 2026 scientific update found that Earth’s surface in 2025 was 1.39°C warmer than the 1850–1900 average, plus or minus 0.13°C. About 1.37°C of warming in that year was attributed to human activity. The decade 2016–2025 averaged 1.26°C above the same baseline. 2024 was warmer still, at about 1.51°C. A slightly cooler year does not mean the trend turned around. The assessed rate of human-caused warming over that decade was about 0.27°C per decade.",
        source: "Indicators of Global Climate Change 2025",
        image: "/images/climate-earth.jpg",
        imageAlt: "The curve of Earth at night, seen from space",
      },
      {
        stat: "425.6 ppm",
        statLabel: "global average carbon dioxide in 2025",
        title: "Greenhouse gases are at a record high",
        text: "The 2025 State of the Climate report recorded a global average carbon dioxide concentration of 425.6 parts per million, about 53 percent higher than the pre-industrial level of roughly 278 ppm. Methane and nitrous oxide were also at record highs. The same report estimated fossil-fuel carbon emissions in 2025 at 10.3 petagrams of carbon per year, plus or minus 0.5. That figure counts carbon, not the full weight of carbon dioxide gas. These gases trap heat that would otherwise escape to space.",
        source: "State of the Climate in 2025",
      },
      {
        stat: "111 mm",
        statLabel: "global sea level above the 1993 average",
        title: "Oceans, ice, and coasts are responding",
        text: "Ocean heat and global mean sea level reached record highs in that 2025 report. Sea level stood about 111 millimeters above the 1993 average, the fourteenth record year in a row. In the Arctic, the maximum sea-ice extent in 2025 was the lowest in the 47-year satellite record. The coast in the photo is not a picture of disaster. It is the kind of shore that rising seas and warmer water reach. Those changes also add pressure on the forests and animals in the other two portfolios. IPBES lists climate change as one driver of biodiversity loss, beside habitat loss and direct exploitation.",
        source: "State of the Climate in 2025 and IPBES, 2019",
        image: "/images/climate-coast.jpg",
        imageAlt: "Seabirds flying over waves on a sandy beach at sunrise",
      },
    ],
    help: [
      {
        title: "Waste less of what you already bought",
        text: "Finish food, repair what can be repaired, and skip a single-use item when a reusable one is in reach. Waste is an emissions source you can see.",
      },
      {
        title: "Use less energy at home",
        text: "Turn lights off when you leave. Choose a moderate air-conditioning setting instead of the coldest one. Small savings add up inside a household, and they are not the whole solution.",
      },
      {
        title: "Move with fewer emissions when the trip allows it",
        text: "Walk, cycle, or take public transport for trips that fit. If you ride in a car, combine errands so the trip happens once.",
      },
      {
        title: "Check a claim before you share it",
        text: "A hot afternoon is weather. A rising average over decades is climate. Read a source on this page before you pass a number on. Personal habits help, and cleaner energy, transport, and forest protection still have to happen at a larger scale.",
      },
    ],
    helpImage: {
      src: "/images/climate-wind.jpg",
      alt: "Wind turbines standing in a field while the sun sets behind them",
      caption: "Wind power is one way to make electricity with fewer emissions. A turbine in a photograph is not proof that the problem is solved.",
    },
    reflection:
      "I chose global warming because the climate is the setting for every other life on this site. Forests and animals cannot be protected on a planet we refuse to measure. I want visitors to leave with the numbers, the sources, and one habit they will actually keep.",
    sourceIds: ["igcc-2025", "igcc-summary", "bams-2025", "ipbes-2019"],
  },
}

export const advocacyList = [advocacies.nature, advocacies.animals, advocacies.climate]

export function sourcesFor(ids) {
  return ids.map((id) => sources.find((source) => source.id === id)).filter(Boolean)
}
