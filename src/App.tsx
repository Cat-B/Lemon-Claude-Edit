import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
  Link, useNavigate, useParams,
} from 'react-router-dom';
import {
  Menu, X, Github, Linkedin, Mail, ExternalLink,
  ArrowLeft, ChevronLeft, ChevronRight,
  GraduationCap, MapPin, FileText, Building, Calendar,
} from 'lucide-react';

// ─── IMAGE ASSETS ─────────────────────────────────────────────────────────────
const ASSETS = {
  wholeLemon:   'https://i.imgur.com/Vz05PWy.png',
  quarterLemon: 'https://i.imgur.com/qRlFbqk.png',
  board1:       'https://i.imgur.com/fPMFThj.png',
  board2:       'https://i.imgur.com/rmKVejn.png',
  board3:       'https://i.imgur.com/NWd9bdb.png',
  juicer:       'https://i.imgur.com/e1Se202.png',
  juicedLemon:  'https://i.imgur.com/OtJsBc8.png',
  stir1:        'https://i.imgur.com/jwPIq94.png',
  stir2:        'https://i.imgur.com/29tgC0U.png',
  stir3:        'https://i.imgur.com/gB5W7SW.png',
  pitcher:      'https://i.imgur.com/lCC9Zev.png',
  pitcherPink:  'https://i.imgur.com/fRfqDmd.png',
};
const STIR_FRAMES = [ASSETS.stir1, ASSETS.stir2, ASSETS.stir3];

// ─── COLOUR SCHEMES (yellow ↔ pink lemonade) ──────────────────────────────────
const NORMAL_C = {
  bgHero:       '#FFFDE8',
  bgAbout:      '#F0F9E0',
  bgProjects:   '#FFF8C5',
  bgExperience: '#EBF5DC',
  bgContact:    '#FFE566',
  navBg:        'rgba(255,253,232,0.95)',
  accent:       '#7DAF30',
  accentLt:     '#D4ECA0',
  accentDark:   '#4A7015',
  shadow:       'rgba(180,150,0,0.18)',
  pitcher:      ASSETS.pitcher,
  splashColors: ['#FFE135','#F5A623','#ffc521','#FFF8C5'],
};
const PINK_C = {
  bgHero:       '#FFF0F5',
  bgAbout:      '#FDE8F3',
  bgProjects:   '#FFF0F5',
  bgExperience: '#FDE0EC',
  bgContact:    '#FFB3C8',
  navBg:        'rgba(255,240,245,0.95)',
  accent:       '#2D8A4E',
  accentLt:     '#C5EDD4',
  accentDark:   '#1A6635',
  shadow:       'rgba(45,138,78,0.18)',
  pitcher:      ASSETS.pitcherPink,
  splashColors: ['#FF99BB','#D4608A','#C5EDD4','#1A6635'],
};

// ─── STATIC PALETTE ───────────────────────────────────────────────────────────
const P = {
  lemonBright: '#FFE135',
  lemonPale:   '#FFF8C5',
  lemonCream:  '#FFFDE8',
  lemonZest:   '#F5A623',
  lemonRind:   '#B89A00',
  textDark:    '#2B2B1F',
  textMid:     '#5A5A3A',
  textLight:   '#888870',
  cardBg:      '#FEFDF5',
  cardBorder:  '#E6DDB8',
  fDisplay:    "'Fraunces', Georgia, serif" as string,
  fBody:       "'DM Sans', 'Helvetica Neue', sans-serif" as string,
};

// ─── STATIC THEME (for sub-components that don't receive pinkMode) ────────────
const theme = {
  headingDark:       'text-[#2B2B1F]',
  bodyText:          'text-[#5A5A3A]',
  bodyTextDark:      'text-[#2B2B1F]',
  mutedText:         'text-[#888870]',
  primary:           'text-[#B89A00]',
  primaryBg:         'bg-[#FFE135]',
  primaryHoverBg:    'hover:bg-[#ffbc05]',
  primaryBorder:     'border-[#FFE135]',
  primaryHoverBorder:'hover:border-[#ffbc05]',
  primaryHoverBg2:   'hover:bg-[#fffce8]',
  primaryLight:      'bg-[#FFF8C5]',
  primaryLightText:  'text-[#2B2B1F]',
  primaryMuted:      'text-[#B89A00]',
  primarySubtle:     'bg-[#FFFDE8]',
  cardBg:            'bg-[#FEFDF5]',
  cardBorder:        'border-[#E6DDB8]',
  cardAlt:           'bg-[#FFF8C5]',
  divider:           'bg-[#FFE135]',
  sectionLight:      'bg-[#FFFDE8]',
  sectionMuted:      'bg-[#F0F9E0]',
  ctaBg:             'bg-[#4A7015]',
  ctaHoverBg:        'hover:bg-[#3a720d]',
  footerBg:          'bg-[#1e3a0a]',
  footerText:        'text-[#fffab0]',
  navActive:         'text-[#4A7015]',
  navInactive:       'text-[#5A5A3A]',
  navHover:          'hover:text-[#4A7015]',
};

// ─── FUN FACTS ────────────────────────────────────────────────────────────────
const funFacts = [
  { label: 'Fun Fact', title: 'Gingerbread Architect',
    body: 'Won my high school gingerbread challenge with a fully edible greenhouse featuring gelatin windows and integrated lighting.',
    img: ASSETS.board1 },
  { label: 'Fun Fact', title: 'Pyrotechnics Kid',
    body: 'Helped wire professional fireworks displays using COBRA modules and e-fuses before I could drive.',
    img: ASSETS.board2 },
  { label: 'Fun Fact', title: 'Tap Me',
    body: 'My NFC business card links straight to this site. Yes, you can literally tap me.',
    img: ASSETS.board3 },
];

// ─── EXPERIENCE DATA ──────────────────────────────────────────────────────────
const experienceData = [
  { id: 1, title: 'Research & Development Intern',
    company: 'The Applied Research Laboratory at Penn State',
    location: 'State College, PA', duration: 'October 2025 – Present',
    description: 'As an R&D Engineering Intern I learned FPV drone fabrication and operation with preparation for FAA Part 107 certification, was selected as a Pipeline Student, and hold an active security clearance.' },
  { id: 2, title: 'Mechanical Engineering Intern',
    company: 'Communications & Power Industries',
    location: 'State College, PA', duration: 'Summer 2025',
    description: 'Designed components for manufacturability, supported satellite systems, and integrated mechanical and electronic knowledge. Work included SolidWorks modeling and simulation, detailed documentation, and BOM management.' },
  { id: 3, title: 'Student Trainee',
    company: 'The Naval Undersea Warfare Center (NUWC)',
    location: 'Newport, RI', duration: 'Summer 2024',
    description: 'Updated legacy designs into detailed 3D models and drawings, developed and critiqued assembly guides for technician use, and collaborated with electrical engineers to deliver cross-disciplinary solutions.' },
  { id: 4, title: 'Drone Crew Member',
    company: 'Sky Elements Drone Shows',
    location: 'Dallas, TX', duration: 'April 2021 – January 2023',
    description: 'Maintained and prepared UAVs for live shows, ensured safe operation of hazardous equipment, and arranged preparatory formations — an experience that sparked my passion for drone technology.' },
  { id: 5, title: 'Pyrotechnic Assistant',
    company: 'Flambeaux Fireworks',
    location: 'Texas', duration: '2018 – 2020',
    description: 'Assisted in wiring and setting up professional fireworks displays using COBRA modules and e-fuses, following fire safety protocols and hands-on training to ensure safe and successful shows.' },
];

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const projectsData = [
  { id: 5, title: 'Gingerbread Greenhouse Dream', date: 'Fall 2022',
    shortDescription: 'Designed and built a complex edible greenhouse with sloped roofs, gelatin windows, and integrated lights with christmas themed interior.',
    image: 'https://i.imgur.com/ZV8Iv8Y.jpeg',
    tech: ['Architectural Design','Food Engineering','Passion Project','Project Planning'],
    overview: 'For a high school creative engineering challenge, I designed and constructed a fully edible, architecturally complex gingerbread greenhouse. The structure featured sloped roofs, a small entry hall with swinging double doors, integrated lighting beneath a tiled floor, and window panels made of gelatin sheets to create a realistic greenhouse effect.',
    mainBody: [
      'In my senior year of high school, I challenged myself to build an architecturally ambitious gingerbread structure. Inspired by greenhouse design, the final build featured sloped roofs, gelatin sheet windows, and a fully edible entry hall with swinging double doors.',
      'To make the project work, I relied on careful geometric planning. The intersection of angled rooflines required advanced 3D visualization and some hand-calculated trigonometry. I sketched ideas, tested with paper templates, and created a scaled cardboard mockup before baking.',
      'Structurally, the greenhouse walls acted more like frames than solid panels, which introduced challenges in maintaining stability. I experimented with icing formulations to ensure strong adhesion between gelatin windows and gingerbread without sacrificing edibility.',
      'I installed a patterned peppermint tile floor and embedded fairy lights beneath it, using frosting as grout. When lit, the floor glowed between tiles for a blinking effect. The interior was fully decorated, complete with an ice cream cone tree and small wrapped gifts.',
      'Though it began as a seasonal build, the final structure held together beautifully and became a winter centerpiece for months.',
    ],
    outcomes: 'The purpose of this project was mainly fun, while I did learn some new geometry to calculate the roof shape, the overall project was mostly creative/art rather than engineering/calculation based. This project and other physical projects I have done have strengthened my spatial reasoning skills, and ultimately made me a more skilled designer when I learned CAD at a higher level.',
    gallery: ['https://i.imgur.com/nyAAhUl.jpeg','https://i.imgur.com/0j5ndnl.jpeg','https://i.imgur.com/LqrKlB0.jpeg','https://i.imgur.com/PmqSBN0.jpeg','https://i.imgur.com/42AiL9D.jpeg','https://i.imgur.com/6ANpE0C.jpeg'],
  },
  { id: 35, title: 'EE210 Karaoke Machine', date: 'Summer 2025',
    shortDescription: 'Designed, prototyped, and soldered a five-block op-amp karaoke machine with tone, volume, and LED display.',
    image: 'https://i.imgur.com/XWU0mm3.jpeg',
    tech: ['Soldering','PCB Assembly','Mechatronics','Op-Amps','Circuit Design'],
    overview: 'In my EE210 Circuits and Devices course, I worked on a semester-long project that brought together the key concepts we learned throughout the class. The goal was to design and build a working karaoke machine by applying fundamentals like op-amps, resistors, capacitors, potentiometers, LEDs, and switches.',
    mainBody: 'The circuit design was divided into five main parts: a mixer for combining microphone and music signals, a tone control stage for treble and bass adjustments, a volume control stage, a volume display using LEDs that responded to loudness, and an output driver with attenuation. I began by sketching the blocks on paper, then recreated the design in Multisim to simulate the system and troubleshoot potential issues. Once the simulation was complete, I tested the circuit on a breadboard before finally moving to a PCB where I soldered all the components.',
    outcomes: 'This project pushed me out of my comfort zone, since I started the class with very little electrical knowledge. Along the way, I learned how to work with op-amps in different configurations, how to approach problems methodically through simulation and testing, and how to solder and assemble a functional PCB.',
    gallery: ['https://i.imgur.com/Q3VF4Hy.jpeg','https://i.imgur.com/QDXGVsu.jpeg','https://i.imgur.com/XWU0mm3.jpeg','https://i.imgur.com/Z0wNYsV.jpeg','https://i.imgur.com/Nm1VEUC.jpeg'],
    pdfUrl: '/karaoke_final.pdf',
  },
  { id: 25, title: 'ASME Hovercraft Project', date: 'Spring 2025',
    shortDescription: 'Contributed to a winning team hovercraft through fabrication, design file management, and final competition prep.',
    image: 'https://i.imgur.com/1ChHnxY.jpeg',
    tech: ['Fusion360','Team Work','Organization','Fabrication'],
    overview: 'Through Penn State\'s ASME club, I contributed to a team project focused on designing and competing with a small hovercraft. The challenge involved three teams each building a shoebox-sized hovercraft from scratch, with a competition taking place in March 2025.',
    mainBody: [
      'The hovercraft, named Driftstorm, pulled inspiration from fan boat acceleration structures. It featured two fan systems: one directed downward to inflate a skirt of nylon fabric that allowed the craft to hover above the floor, and another pointed backward to generate forward thrust.',
      'My contributions included fabricating a new skirt using the Penn State Learning Factory\'s laser cutter, which provided precise cuts in the nylon material. I also helped reorganize the Fusion 360 project files, streamlining them so only current versions of the design were accessible.',
      'The team consisted of around sixteen members, which required significant coordination. In the end, our team\'s hovercraft performed well and Team Driftstorm won the event, which was highlighted on Penn State\'s LinkedIn profile.',
    ],
    outcomes: 'This project gave me exposure to a collaborative engineering environment outside the classroom, where the dynamics of teamwork, iteration, and rapid problem-solving were front and center. I gained hands-on experience with fabrication tools like the laser cutter and saw firsthand how small adjustments can make a significant impact on performance.',
    gallery: ['https://i.imgur.com/TEG8q4q.jpeg','https://i.imgur.com/ER0IhCb.jpeg','https://i.imgur.com/7jL8A6j.jpeg','https://i.imgur.com/jK08w1d.jpeg','https://i.imgur.com/2dUJ3GT.jpeg'],
  },
  { id: 20, title: 'ELSA-d LEO Engineering Presentation', date: 'Fall 2024',
    shortDescription: 'Presented a professional, research-driven talk on ELSA-d satellite retrieval and the orbital debris problem.',
    image: 'https://imgs.search.brave.com/XWEwsoNsTsJqDA8EL5ulT0evB4iSTLccx-GCn9W-CD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZW9wb3J0YWwub3Jn/L2FwaS9jbXMvZG9j/dW1lbnRzL2QvZW9w/b3J0YWwvZWxzYS1k/X2F1dG8yLWpwZWc',
    tech: ['Academic Research','Public Speaking','Professional Communication','Technical Presentation','Aerospace Engineering'],
    overview: 'In a technical speech class at Penn State, I completed a semester-long project that culminated in a single, intensive speech of approximately twelve minutes focused on the ELSA-d mission and the broader challenges of space pollution.',
    mainBody: [
      'Preparing this speech was a rigorous process that demanded extensive research, careful source evaluation, and meticulous organization. I had to hunt for academic and engineering sources, ensuring that every point I made was accurate, well-supported, and relevant to the broader context of space sustainability.',
      'The speech itself was very intense, as it required sustained focus for twelve minutes, memorizing key statistics and facts for precise, accurate delivery. I practiced repeatedly, refining my timing, pacing, and slides to maximize comprehension and engagement.',
      'The culmination of this work was my nomination as a semifinalist in the Penn State College of Engineering Speech Competition, an honor that recognized me for my hard work and natural talents speaking publicly.',
    ],
    outcomes: 'This project taught me how to tackle challenging technical material and present it in a compelling way, emphasizing clarity without sacrificing depth. I gained experience in academic research, public speaking, and time management under high-pressure conditions.',
    gallery: ['https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=800'],
    pdfUrl: '/elsa-d-presentation.pdf',
  },
  { id: 15, title: '3D Printed Penny Boats', date: 'Fall 2023/24',
    shortDescription: 'Designed and 3D printed two competition-winning penny boats that balanced buoyancy, creativity, and sustainability while doubling as everyday organizers.',
    image: 'https://i.imgur.com/tUHkEFq.jpeg',
    tech: ['SolidWorks','3D Printing','Sustainable Design','Artistic Flair','Rapid Prototyping'],
    overview: 'Through Penn State\'s 3D Printing Club, I participated in the annual Penny Boat competition during both my freshman and sophomore years. The challenge was to design and 3D print a small boat that could hold as many pennies as possible before sinking.',
    mainBody: [
      'During my freshman year, I designed the Queen Bee Barge, a honeycomb-inspired boat that featured hexagonal cells resembling a beehive. This design not only gave the boat strength and structure but also required no supports during printing, making it material efficient and easier to process. The design was a success, and my boat won the competition.',
      'In my sophomore year, I designed the Bathtub Boat, inspired by antique clawfoot tubs. I incorporated small sections into the design so that after the competition, the boat could continue serving as a functional organizer. This focus on reuse was intentional — I wanted my design to avoid being a single-use item.',
      'From a technical perspective, I considered weight distribution and buoyancy in both designs. I placed pennies evenly across the hull and used an infill pattern that maximized air pockets without sacrificing structural strength.',
    ],
    outcomes: 'These projects taught me creative problem-solving, practical 3D printing techniques, and how to balance competition goals with sustainability and real-world use. The Penny Boat projects showed me how engineering can be fun, resourceful, and environmentally thoughtful all at the same time.',
    gallery: ['https://i.imgur.com/HAgbXWK.jpeg','https://i.imgur.com/JHnkAsA.jpeg','https://i.imgur.com/tUHkEFq.jpeg','https://i.imgur.com/flFfWhH.jpeg','https://i.imgur.com/RcIZIq9.png'],
  },
  { id: 30, title: 'Student Portfolio Upgrade', date: 'Summer 2025',
    shortDescription: 'Using AI programming tools and coding skills, built and deployed a professional engineering portfolio website.',
    image: 'https://i.imgur.com/YOzFYlx.png',
    tech: ['TypeScript','Website Development','Coding','AI Integration','bolt.new'],
    overview: 'To showcase my engineering work in a professional way, I built my own portfolio website. The project began as an update to my old high school resume website made in Google Sites. While I had little prior web development experience, I used an AI-assisted coding platform to generate the base structure of the site, then gradually refined and expanded it.',
    mainBody: [
      'The process began with the AI platform, which helped me generate the initial framework of the site. This gave me a template to build on. On the baseline plan I had access to a very limited number of tokens, which forced me to dive into the raw code myself. I migrated everything into GitHub and began manually editing and adjusting the site.',
      'Another important step was learning how to buy a custom domain and publish the site under it. That process gave me hands-on experience with web infrastructure and the practical side of making a site accessible to the public. To tie it all together, I also created a laser-engraved NFC business card linked directly to my website.',
    ],
    outcomes: 'This project taught me far more than I expected going in. On the technical side, I gained confidence working with TypeScript, GitHub, and the basics of deploying a live website. I also saw firsthand how AI can accelerate learning when used thoughtfully, but that it can\'t replace the need to understand and engage with the material yourself.',
    gallery: ['https://i.imgur.com/YOzFYlx.png','https://i.imgur.com/t7uPOBw.png','https://i.imgur.com/vCrxCPz.jpeg','https://i.imgur.com/tpbEC7y.jpeg'],
    pdfUrl: 'https://sites.google.com/view/cboss-hs-en/home',
  },
  { id: 40, title: 'Matlab Presentation', date: 'October 2025',
    shortDescription: 'Delivered a large-scale MATLAB tech talk to ~100 ASME members, reframing the tool as accessible and powerful for undergraduate engineers.',
    image: 'https://i.imgur.com/99CDz4C.png',
    tech: ['Tech Talk','Public Speaking','Professional Communication','AI Integration','Technical Presentation','MATLAB'],
    overview: 'As the Dual Secretary for the Penn State chapter of ASME, I delivered a large-scale technical presentation focused on MATLAB, a tool that many undergraduate engineers approach with hesitation. My goal was to reframe MATLAB as an accessible, powerful engineering resource when used correctly.',
    mainBody: [
      'This presentation took place during the second week of classes at one of our early design team meetings and was attended by roughly 100 ASME members, ranging from first-year students to seniors. I spent a significant amount of time preparing custom MATLAB scripts, slides, and demonstrations designed to meet students at different experience levels.',
      'To make the talk concrete and engaging, I built live demonstrations drawing from thermodynamics, vibrations, and data visualization. I also discussed how MATLAB concepts translate cleanly into other programming languages and how it can interface with hardware platforms such as Raspberry Pi and Arduino.',
      'A key section addressed the responsible use of AI in programming — showing how it can support debugging, exploration, and efficiency without undermining engineering intuition or problem-solving skills.',
    ],
    outcomes: 'This project strengthened my ability to plan and deliver a large technical talk to a diverse audience while maintaining confidence and clarity. I gained experience communicating with multiple stakeholders, defending my technical perspective professionally, and presenting content I genuinely care about.',
    gallery: ['https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=800'],
    pdfUrl: '/matlab_talk.pdf',
  },
];

// ─── WAVE DIVIDER ─────────────────────────────────────────────────────────────
const WAVE_PATHS = [
  'M0,25 C200,80 400,0 600,38 C800,75 1000,5 1200,48 C1320,70 1390,18 1440,32 L1440,80 L0,80 Z',
  'M0,50 C80,12 160,68 280,38 C400,8 500,72 640,42 C780,12 900,60 1040,35 C1160,12 1310,65 1440,38 L1440,80 L0,80 Z',
  'M0,18 C260,85 520,2 780,52 C900,72 1020,22 1160,58 C1270,80 1380,22 1440,42 L1440,80 L0,80 Z',
  'M0,55 C140,15 280,72 440,35 C600,0 740,68 900,42 C1040,18 1200,62 1440,28 L1440,80 L0,80 Z',
];

function WaveDivider({ bg, fill, variant = 0 }: { bg: string; fill: string; variant?: number }) {
  return (
    <div style={{ background: bg, lineHeight: 0, display: 'block', fontSize: 0 }}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 64 }}>
        <path d={WAVE_PATHS[variant % WAVE_PATHS.length]} fill={fill} />
      </svg>
    </div>
  );
}

// ─── CAROUSEL CARD ────────────────────────────────────────────────────────────
const CARD_W       = 260;
const MOBILE_W     = 340;
const CARD_H       = 460;
const CENTER_SCALE = 1.15;
const CENTER_MX    = Math.ceil((CARD_W * (CENTER_SCALE - 1)) / 2) + 6;
const MOBILE_IMG_H = Math.round(MOBILE_W * 9 / 16);

type ProjectItem = (typeof projectsData)[0];

function CarouselCard({ p, width, height }: { p: ProjectItem; width: number; height: number }) {
  return (
    <Link
      to={`/project/${p.id}`}
      className={`${theme.cardBg} rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col`}
      style={{ width, height, flexShrink: 0, border: `2px solid ${P.lemonBright}` }}
    >
      <img src={p.image} alt={p.title} className="w-full aspect-video object-cover flex-shrink-0" />
      <div className="p-4 flex flex-col flex-1 overflow-hidden">
        <h3 className="text-base font-semibold mb-1 leading-snug" style={{ fontFamily: P.fDisplay, color: P.textDark }}>{p.title}</h3>
        <p className="text-xs mb-2" style={{ color: P.lemonRind }}>{p.date}</p>
        <p className="text-sm mb-3 leading-relaxed" style={{ color: P.textMid }}>{p.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5 overflow-hidden" style={{ maxHeight: '3.5rem' }}>
          {p.tech.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-0.5 text-xs rounded-full whitespace-nowrap"
              style={{ background: P.lemonPale, color: P.textDark, border: `1px solid ${P.lemonBright}` }}>
              {tech}
            </span>
          ))}
          {p.tech.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-full"
              style={{ background: P.lemonPale, color: P.textDark, border: `1px solid ${P.lemonBright}` }}>
              +{p.tech.length - 3}
            </span>
          )}
        </div>
        <div className="mt-auto pt-2 flex items-center text-sm" style={{ color: P.lemonRind }}>
          <span className="mr-1">View Details</span>
          <ExternalLink size={13} />
        </div>
      </div>
    </Link>
  );
}

// ─── FEATURED CAROUSEL ────────────────────────────────────────────────────────
const DECO_H = 150;

// Pre-computed splash offsets — deterministic, no Math.random in render
const SPLASH_RING = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { dx: Math.cos(a) * 38, dy: Math.sin(a) * 38 - 8 };
});

function FeaturedCarousel(_props: Record<string, never> | { ids?: number[] }) {
  const real = [...projectsData].sort((a, b) => b.id - a.id);
  const n    = real.length;
  const SLOT = CAROUSEL_CARD_W + CAROUSEL_GAP;
  const visW = 3 * CAROUSEL_CARD_W + 2 * CAROUSEL_GAP;

  // Cloned array: [last N real, ...all real, first N real]
  const cloned: typeof real = [
    ...real.slice(n - N_CLONES),
    ...real,
    ...real.slice(0, N_CLONES),
  ];

  const [trackIdx,  setTrackIdx]  = useState(N_CLONES); // start centered on first real card
  const [noTransit, setNoTransit] = useState(false);    // disables transition during wrap-jump
  const [squeezing, setSqueezing] = useState(false);    // lemon presses down
  const [splashKey, setSplashKey] = useState(0);        // increments to re-trigger splash
  const [touchPos,  setTouchPos]  = useState<{ x: number; y: number } | null>(null);

  const translateX = -(trackIdx - 1) * SLOT;

  const navigate = (dir: 1 | -1) => {
    setTrackIdx(i => i + dir);
    setSqueezing(true);
    setSplashKey(k => k + 1);
    setTimeout(() => setSqueezing(false), 480);
  };
  const prev = () => navigate(-1);
  const next = () => navigate(1);

  // After transition ends, silently wrap if we've moved into a clone zone
  const handleTransitionEnd = () => {
    const lo = N_CLONES, hi = N_CLONES + n - 1;
    if      (trackIdx > hi) { setNoTransit(true); setTrackIdx(t => t - n); }
    else if (trackIdx < lo) { setNoTransit(true); setTrackIdx(t => t + n); }
  };

  // Re-enable transition one frame after the silent wrap render
  useEffect(() => {
    if (!noTransit) return;
    const id = requestAnimationFrame(() => setNoTransit(false));
    return () => cancelAnimationFrame(id);
  }, [noTransit]);

  const realIdx      = ((trackIdx - N_CLONES) % n + n) % n;
  const mobileProject = real[realIdx];

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchPos) return;
    const dx = e.changedTouches[0].clientX - touchPos.x;
    const dy = e.changedTouches[0].clientY - touchPos.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx < 0 ? next() : prev();
    setTouchPos(null);
  };

  const BTN_SPACE = 56; // button width + gap space on each side

  return (
    <div className="w-full py-4">
      {/* ── Desktop (lg+) ── */}
      <div className="hidden lg:block">
        {/* Decoration row — spacers mirror nav button widths so juicer aligns with center card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: BTN_SPACE, flexShrink: 0 }} />
          <div style={{ width: visW, height: DECO_H, position: 'relative', flexShrink: 0 }}>
            {/* Left quarter lemon */}
            <div style={{ position: 'absolute', bottom: 8, left: CAROUSEL_CARD_W / 2, transform: 'translateX(-50%)' }}>
              <img src={ASSETS.quarterLemon} alt=""
                style={{ width: 72, opacity: 0.9, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }} />
            </div>
            {/* Center juicer area */}
            <div style={{ position: 'absolute', bottom: 0, left: CAROUSEL_CARD_W + CAROUSEL_GAP, width: CAROUSEL_CARD_W }}>
              {/* Juice splash drops — remount via key to restart animation */}
              {SPLASH_RING.map((off, i) => (
                <div key={`${splashKey}-${i}`} style={{
                  position: 'absolute', bottom: '62%', left: '50%',
                  width: 9, height: 9, borderRadius: '50%',
                  background: i % 2 === 0 ? P.lemonBright : P.lemonZest,
                  pointerEvents: 'none',
                  ['--jdx' as any]: `${off.dx}px`,
                  ['--jdy' as any]: `${off.dy}px`,
                  animation: splashKey > 0 ? `juiceOut 0.55s ease-out ${i * 0.03}s forwards` : 'none',
                }} />
              ))}
              {/* Juiced lemon — same width as juicer, presses down when squeezing */}
              <img src={ASSETS.juicedLemon} alt="" style={{
                position: 'absolute', width: CAROUSEL_CARD_W, left: 0,
                bottom: squeezing ? '8%' : '30%', zIndex: 2,
                transition: 'bottom 0.3s cubic-bezier(0.4,0,0.2,1)',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
              }} />
              {/* Juicer body */}
              <img src={ASSETS.juicer} alt="" style={{
                position: 'absolute', bottom: 0, left: 0,
                width: CAROUSEL_CARD_W, zIndex: 1,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))',
              }} />
            </div>
            {/* Right quarter lemon */}
            <div style={{ position: 'absolute', bottom: 8, right: CAROUSEL_CARD_W / 2, transform: 'translateX(50%)' }}>
              <img src={ASSETS.quarterLemon} alt=""
                style={{ width: 72, opacity: 0.9, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))', transform: 'scaleX(-1)' }} />
            </div>
          </div>
          <div style={{ width: BTN_SPACE, flexShrink: 0 }} />
        </div>

        {/* Track row with nav buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <button onClick={prev} aria-label="Previous"
            className={`flex-shrink-0 ${theme.cardBg} shadow-lg rounded-full p-3 border`}
            style={{ borderColor: P.cardBorder }}
            onMouseEnter={e => (e.currentTarget.style.background = P.lemonPale)}
            onMouseLeave={e => (e.currentTarget.style.background = P.cardBg)}>
            <ChevronLeft size={24} style={{ color: P.textMid }} />
          </button>
          {/* Clip window — hides cards outside the 3-card view */}
          <div style={{ width: visW, overflow: 'hidden', flexShrink: 0 }}>
            <div
              style={{
                display: 'flex', gap: CAROUSEL_GAP,
                transform: `translateX(${translateX}px)`,
                transition: noTransit ? 'none' : 'transform 0.45s cubic-bezier(0.25,0.1,0.25,1)',
                willChange: 'transform',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {cloned.map((p, i) => (
                <div key={i} style={{ flexShrink: 0 }}>
                  <CarouselCard p={p} width={CAROUSEL_CARD_W} height={CAROUSEL_CARD_H} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={next} aria-label="Next"
            className={`flex-shrink-0 ${theme.cardBg} shadow-lg rounded-full p-3 border`}
            style={{ borderColor: P.cardBorder }}
            onMouseEnter={e => (e.currentTarget.style.background = P.lemonPale)}
            onMouseLeave={e => (e.currentTarget.style.background = P.cardBg)}>
            <ChevronRight size={24} style={{ color: P.textMid }} />
          </button>
        </div>
      </div>

      {/* ── Mobile (<lg) ── */}
      <div className="lg:hidden" style={{ touchAction: 'pan-x' }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Mobile juicer */}
        <div style={{ position: 'relative', height: 100, width: MOBILE_W, margin: '0 auto' }}>
          <img src={ASSETS.juicedLemon} alt="" style={{
            position: 'absolute', width: MOBILE_W, left: 0,
            bottom: squeezing ? '6%' : '26%', zIndex: 2,
            transition: 'bottom 0.3s cubic-bezier(0.4,0,0.2,1)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
          }} />
          <img src={ASSETS.juicer} alt="" style={{
            position: 'absolute', bottom: 0, left: 0,
            width: MOBILE_W, zIndex: 1,
            filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.18))',
          }} />
        </div>
        {/* Card with nav arrows */}
        <div style={{ position: 'relative', width: MOBILE_W, margin: '0 auto' }}>
          <CarouselCard p={mobileProject} width={MOBILE_W} height={CAROUSEL_CARD_H} />
          <button onClick={prev} aria-label="Previous"
            className="absolute z-10 shadow-md rounded-full p-2"
            style={{ left: 8, top: MOBILE_IMG_H, transform: 'translateY(-50%)',
              background: 'rgba(254,253,245,0.85)', border: `1px solid ${P.cardBorder}` }}>
            <ChevronLeft size={20} style={{ color: P.textMid }} />
          </button>
          <button onClick={next} aria-label="Next"
            className="absolute z-10 shadow-md rounded-full p-2"
            style={{ right: 8, top: MOBILE_IMG_H, transform: 'translateY(-50%)',
              background: 'rgba(254,253,245,0.85)', border: `1px solid ${P.cardBorder}` }}>
            <ChevronRight size={20} style={{ color: P.textMid }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS GALLERY PAGE ────────────────────────────────────────────────────
function ProjectsGallery() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const sorted = [...projectsData].sort((a, b) => b.id - a.id);
  return (
    <div style={{ minHeight: '100vh', background: P.lemonCream }}>
      <header style={{ background: P.cardBg, borderBottom: `2px dashed ${P.lemonBright}`, padding: '14px 32px' }}>
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 btn-lift"
          style={{ background: P.lemonBright, border: `2px solid ${P.lemonRind}`, borderRadius: 999, padding: '8px 20px', fontWeight: 600, cursor: 'pointer', color: P.textDark, fontFamily: P.fBody, fontSize: '0.9rem' }}>
          <ArrowLeft size={18} /> Back to Portfolio
        </button>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: P.textDark }}>
            All Projects, <em>Freshly Squeezed</em>
          </h1>
          <div style={{ width: 56, height: 4, borderRadius: 2, background: P.lemonBright, margin: '12px auto 0' }} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map(project => (
            <Link key={project.id} to={`/project/${project.id}`}
              className="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
              style={{ background: P.cardBg, border: `1.5px solid ${P.cardBorder}` }}>
              <img src={project.image} alt={project.title} className="w-full h-44 object-cover" />
              <div className="p-5">
                <h3 style={{ fontFamily: P.fDisplay, fontWeight: 700, color: P.textDark, marginBottom: 4 }}>{project.title}</h3>
                <p className="text-sm mb-2" style={{ color: P.lemonRind }}>{project.date}</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: P.textMid }}>{project.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs rounded-full" style={{ background: P.lemonPale, color: P.textDark, border: `1px solid ${P.lemonBright}` }}>{t}</span>
                  ))}
                </div>
                <div className="flex items-center text-sm" style={{ color: P.lemonRind }}>
                  <span className="mr-1">View Details</span><ExternalLink size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT DETAIL PAGE ──────────────────────────────────────────────────────
function ProjectDetail() {
  const { id }       = useParams<{ id: string }>();
  const navigate     = useNavigate();
  const project      = projectsData.find(p => p.id === parseInt(id || '1'));
  const [imgIdx, setImgIdx]           = useState(0);
  const [modalOpen, setModalOpen]     = useState(false);
  const [modalIdx, setModalIdx]       = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!modalOpen || !project) return;
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'ArrowLeft')  setModalIdx(i => (i - 1 + project.gallery.length) % project.gallery.length);
      if (e.key === 'ArrowRight') setModalIdx(i => (i + 1) % project.gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen, project]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: P.lemonCream }}>
      <div className="text-center">
        <h1 style={{ fontFamily: P.fDisplay, color: P.textDark, marginBottom: 16 }}>Project Not Found</h1>
        <button onClick={() => navigate('/')}
          style={{ background: P.lemonBright, border: `2px solid ${P.textDark}`, borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>
          Back to Portfolio
        </button>
      </div>
    </div>
  );

  const prevImg = () => setImgIdx(i => (i - 1 + project.gallery.length) % project.gallery.length);
  const nextImg = () => setImgIdx(i => (i + 1) % project.gallery.length);

  return (
    <div style={{ minHeight: '100vh', background: P.lemonCream }}>
      {/* ── Hero header ── */}
      <div style={{ background: P.lemonPale, borderBottom: `3px dashed ${P.lemonBright}`, padding: '40px 48px 36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 80% 50%, ${P.lemonBright} 0%, transparent 58%)`,
          opacity: 0.35, pointerEvents: 'none' }} />
        <button onClick={() => navigate(-1 as any)}
          className="btn-lift"
          style={{ position: 'relative', zIndex: 2,
            background: P.lemonBright,
            border: `2px solid ${P.lemonRind}`, borderRadius: 999,
            padding: '8px 22px', fontWeight: 600, cursor: 'pointer',
            fontSize: '0.9rem', marginBottom: 20, display: 'inline-flex',
            alignItems: 'center', gap: 7, fontFamily: P.fBody, color: P.textDark }}>
          <ArrowLeft size={15} /> Back to Portfolio
        </button>
        <h1 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(1.8rem,4vw,2.8rem)',
          fontWeight: 800, lineHeight: 1.1, color: P.textDark, position: 'relative', zIndex: 2 }}>
          {project.title}
        </h1>
        <p style={{ color: P.textLight, marginTop: 8, position: 'relative', zIndex: 2 }}>{project.date}</p>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Gallery / PDF */}
        {(project.id === 20 || project.id === 40) ? (
          <div className="mb-10">
            <h2 className="detail-section-heading">Presentation Preview</h2>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: `2px solid ${P.lemonBright}` }}>
              <iframe src={project.pdfUrl} className="w-full" style={{ height: 420, display: 'block', border: 'none' }}
                title={`${project.title} Preview`} />
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <h2 className="detail-section-heading">Project Gallery</h2>
            <div className="relative">
              <img src={project.gallery[imgIdx]} alt={`${project.title} ${imgIdx + 1}`}
                className="w-full object-cover rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                style={{ height: 380, border: `2px solid ${P.lemonPale}` }}
                onClick={() => { setModalIdx(imgIdx); setModalOpen(true); }} />
              <button onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg"
                style={{ background: 'rgba(254,253,245,0.85)', border: `1.5px solid ${P.cardBorder}` }}>
                <ChevronLeft size={22} style={{ color: P.textMid }} />
              </button>
              <button onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg"
                style={{ background: 'rgba(254,253,245,0.85)', border: `1.5px solid ${P.cardBorder}` }}>
                <ChevronRight size={22} style={{ color: P.textMid }} />
              </button>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
                {imgIdx + 1} / {project.gallery.length}
              </div>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {project.gallery.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className="flex-shrink-0 w-18 h-18 rounded-xl overflow-hidden"
                  style={{ width: 72, height: 72, border: `2px solid ${i === imgIdx ? P.lemonBright : P.cardBorder}`, transition: 'border-color 0.2s' }}>
                  <img src={img} alt={`thumb ${i+1}`} className="w-full h-full object-cover"
                    onClick={e => { e.stopPropagation(); setModalIdx(i); setModalOpen(true); }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2/3 + 1/3 layout */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="detail-section-heading">Overview</h2>
              <p className="leading-relaxed text-lg" style={{ color: P.textMid, lineHeight: 1.85 }}>{project.overview}</p>
            </section>
            <section>
              <h2 className="detail-section-heading">Project Details</h2>
              <div className="space-y-4">
                {Array.isArray(project.mainBody)
                  ? project.mainBody.map((para, i) => <p key={i} className="leading-relaxed" style={{ color: P.textMid, lineHeight: 1.85 }}>{para}</p>)
                  : <p className="leading-relaxed" style={{ color: P.textMid, lineHeight: 1.85 }}>{project.mainBody}</p>}
              </div>
            </section>
            <section>
              <h2 className="detail-section-heading">Outcomes &amp; Learning</h2>
              <p className="leading-relaxed" style={{ color: P.textMid, lineHeight: 1.85 }}>{project.outcomes}</p>

              {project.id === 30 && (
                <div style={{ marginTop: 20, padding: '16px 20px', background: P.lemonPale, borderRadius: 12, border: `1.5px solid ${P.lemonBright}` }}>
                  <h4 style={{ fontFamily: P.fDisplay, color: P.textDark, marginBottom: 8 }}>Previous Portfolio</h4>
                  <a href="https://sites.google.com/view/cboss-hs-en/home" target="_blank" rel="noopener noreferrer"
                    className="detail-link inline-flex items-center gap-2">
                    <ExternalLink size={14} /> Visit Previous Portfolio
                  </a>
                </div>
              )}
              {project.id === 35 && project.pdfUrl && (
                <div style={{ marginTop: 20, padding: '16px 20px', background: P.lemonPale, borderRadius: 12, border: `1.5px solid ${P.lemonBright}` }}>
                  <h4 style={{ fontFamily: P.fDisplay, color: P.textDark, marginBottom: 8 }}>Circuit Documentation</h4>
                  <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="detail-link inline-flex items-center gap-2">
                    <FileText size={14} /> View Circuit Diagram
                  </a>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl p-6" style={{ background: P.lemonPale, border: `1.5px solid ${P.lemonBright}` }}>
              <h3 style={{ fontFamily: P.fDisplay, fontWeight: 700, color: P.textDark, marginBottom: 16, fontSize: '1.1rem' }}>Project Info</h3>
              <div className="space-y-4">
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.textLight, marginBottom: 4 }}>Date</p>
                  <p style={{ color: P.textDark, fontWeight: 500 }}>{project.date}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.textLight, marginBottom: 8 }}>Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 rounded text-sm"
                        style={{ background: P.lemonCream, border: `1.5px solid ${P.lemonBright}`, color: P.textDark, fontWeight: 500 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <button onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-white rounded-full p-2 z-10" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <X size={24} />
          </button>
          <button onClick={() => setModalIdx(i => (i - 1 + project.gallery.length) % project.gallery.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white rounded-full p-3 z-10" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <ChevronLeft size={32} />
          </button>
          <button onClick={() => setModalIdx(i => (i + 1) % project.gallery.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white rounded-full p-3 z-10" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <ChevronRight size={32} />
          </button>
          <img src={project.gallery[modalIdx]} alt={`Full size ${modalIdx + 1}`} className="max-w-full max-h-full object-contain" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
            {modalIdx + 1} / {project.gallery.length}
          </div>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
            {project.gallery.map((img, i) => (
              <button key={i} onClick={() => setModalIdx(i)}
                style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === modalIdx ? 'white' : 'rgba(255,255,255,0.4)'}` }}>
                <img src={img} alt={`thumb ${i+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SPLASH TYPE ──────────────────────────────────────────────────────────────
type Splash = { id: number; x: number; y: number; dx: number; dy: number; color: string; size: number };

// ─── PORTFOLIO (main page) ────────────────────────────────────────────────────
function Portfolio() {
  const [pinkMode, setPinkMode]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActive]        = useState('home');
  const [scrollPct, setScrollPct]         = useState(0);
  const [splashes, setSplashes]           = useState<Splash[]>([]);
  const [hoveredExpId, setHoveredExpId]   = useState<number | null>(null);
  const [timelineStirFrame, setTimelineStirFrame] = useState(0);
  const splashId = useRef(0);

  // Derived colour scheme
  const c = pinkMode ? PINK_C : NORMAL_C;

  // Scroll tracker
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      const sections = ['home','about','projects','experience','contact'];
      const scrollY  = window.scrollY + 120;
      for (const sec of sections) {
        const el2 = document.getElementById(sec);
        if (el2 && scrollY >= el2.offsetTop && scrollY < el2.offsetTop + el2.offsetHeight) {
          setActive(sec); break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Timeline stir animation — only plays while a card is hovered
  useEffect(() => {
    if (hoveredExpId === null) { setTimelineStirFrame(0); return; }
    const t = setInterval(() => setTimelineStirFrame(f => (f + 1) % 3), 420);
    return () => { clearInterval(t); setTimelineStirFrame(0); };
  }, [hoveredExpId]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Juice splash on click
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Don't splash on interactive elements
    if (target.closest('a,button,input,textarea')) return;
    const colors = c.splashColors;
    const newSplashes: Splash[] = Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.4;
      const dist  = 28 + Math.random() * 48;
      return { id: ++splashId.current, x: e.clientX, y: e.clientY,
        dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist,
        color: colors[i % colors.length], size: 7 + Math.random() * 7 };
    });
    setSplashes(p => [...p, ...newSplashes]);
    const ids = newSplashes.map(s => s.id);
    setTimeout(() => setSplashes(p => p.filter(s => !ids.includes(s.id))), 620);
  };

  const navItems = ['home','about','projects','experience','contact'];

  return (
    <div onClick={handleClick} style={{ minHeight: '100vh', fontFamily: P.fBody }}>
      {/* ── Scroll progress bar ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, height: 4,
        width: `${scrollPct}%`, pointerEvents: 'none',
        background: `linear-gradient(90deg, ${c.accent}, ${P.lemonBright}, ${P.lemonZest})`,
        transition: 'width 0.08s linear' }} />

      {/* ── Juice splashes ── */}
      {splashes.map(s => (
        <div key={s.id} style={{
          position: 'fixed', left: s.x, top: s.y,
          width: s.size, height: s.size, borderRadius: '50%',
          background: s.color, pointerEvents: 'none', zIndex: 9998,
          ['--jdx' as any]: `${s.dx}px`, ['--jdy' as any]: `${s.dy}px`,
          animation: 'juiceOut 0.58s ease-out forwards',
        }} />
      ))}

      {/* ── Navigation ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 200, display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 32px', background: c.navBg,
        backdropFilter: 'blur(14px)', borderBottom: `2px dashed ${P.lemonBright}`,
        transition: 'background 0.4s' }}>
        <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}
          className="logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={ASSETS.wholeLemon} alt="" className="lemon-spin" style={{ width: 28, height: 28 }} />
          <span style={{ fontFamily: P.fDisplay, fontWeight: 700, fontSize: '1.15rem', color: '#111' }}>
            Catherine Boss
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 4 }}>
          {navItems.map(item => (
            <li key={item}>
              <button className={`nav-pill ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollTo(item)}
                style={{ color: P.textMid, textTransform: 'capitalize' }}>
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: P.textDark }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ position: 'sticky', top: 56, zIndex: 190, background: c.navBg,
          borderBottom: `2px dashed ${P.lemonBright}`, padding: '8px 16px 12px' }}
          className="md:hidden">
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)}
              className="block w-full text-left nav-pill"
              style={{ color: P.textMid, textTransform: 'capitalize', borderRadius: 8, marginBottom: 2 }}>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ════════════════ HERO ════════════════ */}
      <section id="home" style={{ background: c.bgHero, padding: '60px 0 20px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Photo */}
            <div className="flex justify-center order-first lg:order-last">
              <div className="hero-photo-wrap">
                {/* Animated blob */}
                <div className="blob-bg" style={{
                  position: 'absolute', inset: -14,
                  background: P.lemonBright, zIndex: 0,
                  animationDuration: '4s',
                }} />
                <img src="https://i.imgur.com/FgJr1hj.jpeg" alt="Catherine Boss"
                  className="hero-photo"
                  style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%',
                    objectFit: 'cover', borderRadius: '50%', border: '4px solid white' }} />
              </div>
            </div>

            {/* Text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center',
                background: c.accentLt, color: c.accentDark,
                padding: '6px 16px', borderRadius: 999, fontSize: '0.85rem',
                fontWeight: 600, marginBottom: 18, transition: 'all 0.4s' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.accent, marginRight: 8, transition: 'background 0.4s' }} />
                Open to Opportunities
              </div>

              <h1 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(2.8rem,5.5vw,4.5rem)',
                fontWeight: 800, lineHeight: 1.08, color: P.textDark, marginBottom: 12 }}>
                <span style={{
                  background: `linear-gradient(180deg, transparent 58%, ${P.lemonBright} 58%)`,
                  padding: '0 4px',
                }}>Catherine Boss</span>
              </h1>

              <p style={{ fontFamily: P.fDisplay, fontStyle: 'italic', fontSize: '1.15rem',
                color: c.accentDark, marginBottom: 6, transition: 'color 0.4s' }}>
                Engineering student. Problem squeezer. Lemonade enthusiast.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24, color: P.textMid }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <GraduationCap size={18} style={{ color: c.accentDark, flexShrink: 0 }} />
                  Mechanical Engineering · Mechatronics Minor
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={18} style={{ color: c.accentDark, flexShrink: 0 }} />
                  Penn State University · Class of 2027
                </div>
              </div>

              <p style={{ color: P.textMid, lineHeight: 1.8, maxWidth: 540, marginBottom: 28, fontSize: '1.02rem' }}>
                I'm an engineer driven by a desire to be useful, make meaningful contributions, and lead with
                purpose. I approach every challenge with focus, curiosity, and dedication — and try to leave
                everything better than I found it.
              </p>

              <div className="hero-buttons">
                <a href="/cboss_Resume.pdf" target="_blank" rel="noopener noreferrer"
                  className="btn-lift"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px', borderRadius: 999, fontWeight: 600, fontSize: '0.95rem',
                    background: P.lemonBright, color: P.textDark, textDecoration: 'none',
                    border: '2px solid transparent', boxShadow: `0 4px 14px ${c.shadow}`,
                    transition: 'box-shadow 0.2s' }}>
                  <FileText size={16} /> Resume
                </a>
                <a href="https://www.linkedin.com/in/catherine-boss-030207289/" target="_blank" rel="noopener noreferrer"
                  className="btn-lift"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px', borderRadius: 999, fontWeight: 600, fontSize: '0.95rem',
                    background: 'white', color: P.textDark, textDecoration: 'none',
                    border: `2px solid ${P.lemonBright}`, boxShadow: `0 4px 14px ${c.shadow}` }}>
                  <ExternalLink size={16} /> LinkedIn
                </a>
                <a href="mailto:CatherineBoss27@gmail.com"
                  className="btn-lift"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px', borderRadius: 999, fontWeight: 600, fontSize: '0.95rem',
                    background: c.accentDark, color: 'white', textDecoration: 'none',
                    border: '2px solid transparent', boxShadow: `0 4px 14px ${c.shadow}`,
                    transition: 'background 0.4s, box-shadow 0.2s' }}>
                  <Mail size={16} /> Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider bg={c.bgHero} fill={c.bgAbout} variant={0} />

      {/* ════════════════ ABOUT ════════════════ */}
      <section id="about" style={{ background: c.bgAbout, padding: '56px 0', transition: 'background 0.4s' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left: bio + skills */}
            <div>
              <h2 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(2rem,3.8vw,3rem)',
                fontWeight: 800, lineHeight: 1.12, color: '#111', marginBottom: 20 }}>
                When life gives you lemons,{' '}
                <span style={{ color: c.accentDark, transition: 'color 0.4s' }}>build something with them.</span>
              </h2>
              <div style={{ width: 56, height: 4, borderRadius: 2, background: P.lemonBright, marginBottom: 20 }} />

              <p style={{ color: P.textMid, lineHeight: 1.85, fontSize: '1.02rem', marginBottom: 32 }}>
                I'm a third-year Mechanical Engineering student with a passion for problem-solving and
                hands-on design. What excites me most is taking things apart, improving them, and leaving
                them better than I found them. I enjoy working with people just as much as I enjoy
                digging into a project on my own, and I feel at home leading discussions or presenting
                in front of a crowd. I try to bring kindness, energy, and a positive attitude wherever I go.
              </p>

              <div style={{ marginBottom: 10 }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: P.textLight, marginBottom: 8 }}>What I Do</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                  {['SolidWorks / CAD','3D Printing','Mechatronics','Hands-On Solving'].map(s => (
                    <span key={s} className="skill-chip"
                      style={{ background: c.accentLt, color: P.textDark, transition: 'background 0.4s' }}>
                      {s}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: P.textLight, marginBottom: 8 }}>Who I Am</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Organized','Energetic','Curious','Communicative'].map(s => (
                    <span key={s} className="skill-chip"
                      style={{ background: c.accentLt, color: P.textDark, transition: 'background 0.4s' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: cutting board fun-fact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontFamily: P.fDisplay, fontStyle: 'italic', textAlign: 'center',
                fontSize: '0.9rem', color: P.textLight, marginBottom: 4 }}>
                — a few fresh facts —
              </p>
              {funFacts.map((fact, i) => (
                <div key={i} className="board-card" style={{ padding: '20px 90px 20px 20px', minHeight: 100 }}>
                  <img src={fact.img} alt="" className="board-lemon-img" style={{
                    position: 'absolute', right: -6, bottom: 0,
                    height: '115%', width: 'auto', objectFit: 'contain',
                    pointerEvents: 'none',
                  }} />
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>
                    {fact.label}
                  </p>
                  <h4 style={{ fontFamily: P.fDisplay, color: 'white', fontSize: '1rem',
                    fontWeight: 700, marginBottom: 4 }}>
                    {fact.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.87)', lineHeight: 1.6 }}>
                    {fact.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider bg={c.bgAbout} fill={c.bgProjects} variant={1} />

      {/* ════════════════ PROJECTS ════════════════ */}
      <section id="projects" style={{ background: c.bgProjects, padding: '52px 0 40px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header: 2-col on desktop so juicer center has clear space */}
          <div className="mb-10 hidden lg:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'end' }}>
            <div>
              <h2 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(2.2rem,4vw,3.2rem)',
                fontWeight: 800, color: P.textDark, lineHeight: 1.1 }}>
                Projects,<br /><em>Freshly Squeezed</em>
              </h2>
              <div style={{ width: 56, height: 4, borderRadius: 2, background: P.lemonBright, margin: '12px 0 0' }} />
            </div>
            <p style={{ color: P.textMid, fontSize: '1rem', lineHeight: 1.7 }}>
              A selection of engineering projects showcasing my skills in mechanical design,
              creative problem solving, and technical implementation.
            </p>
          </div>
          {/* Mobile: centered */}
          <div className="text-center mb-10 lg:hidden">
            <h2 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(2.2rem,4vw,3.2rem)',
              fontWeight: 800, color: P.textDark, lineHeight: 1.1 }}>
              Projects, <em>Freshly Squeezed</em>
            </h2>
            <div style={{ width: 56, height: 4, borderRadius: 2, background: P.lemonBright, margin: '12px auto 14px' }} />
            <p style={{ color: P.textMid, maxWidth: 600, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
              A selection of engineering projects showcasing my skills in mechanical design,
              creative problem solving, and technical implementation.
            </p>
          </div>

          <FeaturedCarousel ids={[40, 35, 25]} />

          <div className="text-center mt-10" style={{ position: 'relative', zIndex: 10 }}>
            <Link to="/projects" className="btn-lift inline-flex items-center gap-2"
              style={{ padding: '12px 28px', borderRadius: 999, fontWeight: 600,
                background: c.accentDark, color: 'white', textDecoration: 'none',
                boxShadow: `0 4px 14px ${c.shadow}`, transition: 'background 0.4s, box-shadow 0.2s',
                fontSize: '0.95rem' }}>
              See All Projects <ExternalLink size={15} />
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider bg={c.bgProjects} fill={c.bgExperience} variant={2} />

      {/* ════════════════ EXPERIENCE ════════════════ */}
      <section id="experience" style={{ background: c.bgExperience, padding: '52px 0 40px', transition: 'background 0.4s' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-10">
            <h2 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(2.2rem,4vw,3.2rem)',
              fontWeight: 800, color: P.textDark, lineHeight: 1.1 }}>
              Adding Flavor to Every Team
            </h2>
            <div style={{ width: 56, height: 4, borderRadius: 2, background: P.lemonBright, margin: '12px 0 10px' }} />
            <p style={{ color: P.textMid, maxWidth: 520, lineHeight: 1.7 }}>
              Internships and roles that have shaped my technical skills and professional perspective.
            </p>
          </div>

          {/* Desktop: timeline */}
          <div className="hidden lg:block" style={{ position: 'relative', paddingLeft: 64 }}>
            {/* Rail */}
            <div style={{ position: 'absolute', left: 18, top: 0, bottom: 0, width: 3, borderRadius: 4,
              background: `linear-gradient(180deg, ${P.lemonBright}, ${c.accentDark})` }} />

            {experienceData.map((exp, i) => (
              <div key={exp.id} style={{ position: 'relative', marginBottom: 32 }}
                onMouseEnter={() => setHoveredExpId(exp.id)}
                onMouseLeave={() => setHoveredExpId(null)}>
                {/* Stir dot */}
                <div className="hidden lg:flex" style={{ position: 'absolute', left: -56, top: 4,
                  width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={STIR_FRAMES[hoveredExpId === exp.id ? timelineStirFrame : 0]}
                    alt=""
                    style={{ width: 42, height: 42, objectFit: 'contain',
                      filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.18))',
                      transition: 'transform 0.08s' }}
                  />
                </div>

                <div className="timeline-card" style={{
                  background: P.cardBg, border: `2px solid ${c.accentLt}`,
                  borderRadius: 14, padding: '18px 22px',
                  transition: 'background 0.4s, border-color 0.2s, transform 0.2s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                    <div>
                      <h3 style={{ fontFamily: P.fDisplay, fontSize: '1.12rem', fontWeight: 700,
                        color: P.textDark, marginBottom: 2 }}>{exp.title}</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: c.accentDark, fontWeight: 600, transition: 'color 0.4s' }}>
                          <Building size={14} /> {exp.company}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: P.textMid }}>
                          <MapPin size={14} /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <span style={{ background: P.lemonPale, color: P.textLight,
                      padding: '3px 12px', borderRadius: 999, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />{exp.duration}
                    </span>
                  </div>
                  <p style={{ color: P.textMid, lineHeight: 1.75, fontSize: '0.95rem' }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: plain cards (no timeline) */}
          <div className="lg:hidden space-y-4">
            {experienceData.map(exp => (
              <div key={exp.id} style={{ background: P.cardBg, borderRadius: 14,
                padding: '18px 20px', border: `1.5px solid ${P.cardBorder}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily: P.fDisplay, fontSize: '1.05rem', fontWeight: 700,
                  color: P.textDark, marginBottom: 4 }}>{exp.title}</h3>
                <p style={{ color: c.accentDark, fontWeight: 600, fontSize: '0.9rem',
                  marginBottom: 2, transition: 'color 0.4s' }}>{exp.company}</p>
                <p style={{ color: P.textLight, fontSize: '0.82rem', marginBottom: 10 }}>
                  {exp.location} · {exp.duration}
                </p>
                <p style={{ color: P.textMid, lineHeight: 1.7, fontSize: '0.93rem' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider bg={c.bgExperience} fill={c.bgContact} variant={3} />

      {/* ════════════════ CONTACT ════════════════ */}
      <section id="contact" style={{ background: c.bgContact, padding: '52px 0 40px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ fontFamily: P.fDisplay, fontSize: 'clamp(2.2rem,4vw,3.2rem)',
            fontWeight: 800, color: P.textDark, lineHeight: 1.1 }}>
            Let’s Share a Glass
          </h2>
          <div style={{ width: 56, height: 4, borderRadius: 2, background: P.lemonBright, margin: '12px auto 14px' }} />
          <p style={{ color: P.textMid, marginBottom: 32, fontSize: '1rem', lineHeight: 1.7 }}>
            I'm always open to new opportunities, collaborations, and conversations.
            Let's make something together.
          </p>

          {/* Pitcher — click to toggle pink mode */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <img
              src={c.pitcher}
              alt="Lemonade pitcher"
              onClick={() => setPinkMode(v => !v)}
              style={{ width: 160, cursor: 'pointer', userSelect: 'none',
                filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.12))',
                transition: 'transform 0.15s ease, filter 0.4s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
          <p style={{ fontSize: '0.78rem', color: P.textLight, marginBottom: 32, fontStyle: 'italic' }}>
            Psst — click the pitcher.
          </p>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-3 gap-5 max-w-xl mx-auto">
            {[
              { href: 'mailto:catherineboss27@gmail.com', icon: <Mail size={28} />, label: 'Email', sub: 'catherineboss27@gmail.com' },
              { href: 'https://www.linkedin.com/in/catherine-boss-030207289/', icon: <Linkedin size={28} />, label: 'LinkedIn', sub: 'Professional network' },
              { href: 'https://github.com/Cat-B', icon: <Github size={28} />, label: 'GitHub', sub: 'github.com/Cat-B' },
            ].map(card => (
              <a key={card.label} href={card.href} target={card.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="btn-lift flex flex-col items-center p-5 rounded-2xl"
                style={{ background: P.cardBg, border: `2px solid ${P.lemonBright}`,
                  textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <span style={{ color: c.accentDark, marginBottom: 8, transition: 'color 0.4s' }}>{card.icon}</span>
                <p style={{ fontWeight: 600, color: P.textDark, marginBottom: 3 }}>{card.label}</p>
                <p style={{ fontSize: '0.78rem', color: P.textLight, textAlign: 'center' }}>{card.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer style={{ background: '#1e3a0a', padding: '14px 32px', textAlign: 'center' }}>
        <p style={{ color: '#fffab0', fontSize: '0.85rem', marginBottom: 3 }}>
          © {new Date().getFullYear()} Catherine Boss · All rights reserved
        </p>
        <p style={{ color: 'rgba(255,250,176,0.5)', fontSize: '0.75rem' }}>
          All assets and illustrations created by Catherine Boss in Procreate
        </p>
      </footer>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  useEffect(() => {
    // Fonts
    if (!document.getElementById('lemon-fonts')) {
      const pc1 = document.createElement('link');
      pc1.rel = 'preconnect'; pc1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(pc1);
      const pc2 = document.createElement('link');
      pc2.rel = 'preconnect'; pc2.href = 'https://fonts.gstatic.com';
      (pc2 as any).crossOrigin = 'anonymous';
      document.head.appendChild(pc2);
      const link = document.createElement('link');
      link.id = 'lemon-fonts'; link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;0,9..144,800;1,9..144,500;1,9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    // Global CSS
    if (!document.getElementById('lemon-global')) {
      const style = document.createElement('style');
      style.id = 'lemon-global';
      style.textContent = `
        html { overflow-x: clip; }
        *, *::before, *::after { box-sizing: border-box; }
        body { font-family: 'DM Sans', 'Helvetica Neue', sans-serif; margin: 0; overflow-x: clip; }
        @keyframes blobWobble {
          0%   { border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%; }
          50%  { border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%; }
          100% { border-radius: 55% 45% 60% 40% / 45% 55% 45% 55%; }
        }
        @keyframes juiceOut {
          0%   { opacity: 0.9; transform: translate(0,0) scale(1); }
          100% { opacity: 0;   transform: translate(var(--jdx),var(--jdy)) scale(0.1); }
        }
        .blob-bg { animation: blobWobble 4s ease-in-out infinite alternate; }
        .hero-photo { transition: transform 0.3s ease; }
        .hero-photo:hover { transform: scale(1.03) rotate(-2deg); }
        .hero-photo-wrap { position: relative; width: 300px; height: 300px; }
        @media (min-width: 1024px) { .hero-photo-wrap { width: 380px; height: 380px; } }
        .lemon-spin { display: inline-block; transition: transform 0.45s ease; }
        .logo-link:hover .lemon-spin { transform: rotate(360deg); }
        .nav-pill {
          transition: background 0.18s, color 0.18s;
          border-radius: 999px; padding: 6px 16px;
          font-size: 0.87rem; font-weight: 500;
          cursor: pointer; background: transparent; border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-pill:hover, .nav-pill.active { background: #FFE135; color: #2B2B1F !important; }
        .timeline-card { transition: border-color 0.2s, transform 0.2s; }
        .timeline-card:hover { border-color: #FFE135 !important; transform: translateX(6px); }
        /* ── Skill chips ── */
        .skill-chip {
          display: inline-flex; align-items: center;
          padding: 5px 14px; border-radius: 999px;
          font-size: 0.82rem; font-weight: 600;
        }
        /* ── Cutting board cards ── */
        .board-card {
          position: relative; border-radius: 16px; overflow: hidden;
          border: 4px solid #A06828;
          box-shadow: 5px 5px 0 #7A4E18;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .board-card:nth-child(2) { background: #C8903E; }
        .board-card:nth-child(3) { background: #B87E30; }
        .board-card:nth-child(4) { background: #9A5F18; }
        .board-card::before {
          content: ''; position: absolute; inset: 6px;
          border: 2px dashed rgba(255,255,255,0.32); border-radius: 10px;
          pointer-events: none; z-index: 0;
        }
        .board-card > * { position: relative; z-index: 1; }
        .board-card > img.board-lemon-img { position: absolute !important; z-index: 2; }
        .board-card:hover { transform: translateY(-3px); box-shadow: 7px 7px 0 #7A4E18; }
        @media (max-width: 1023px) {
          .board-card { padding: 18px 100px 18px 22px !important; }
          .board-lemon-img { height: 88% !important; width: auto !important; right: -4px !important; opacity: 0.8 !important; }
        }
        /* ── Hero buttons ── */
        .hero-buttons { display: flex; gap: 12px; flex-wrap: wrap; }
        @media (max-width: 767px) {
          .hero-buttons { flex-direction: column; gap: 10px; }
          .hero-buttons a { width: 100%; justify-content: center; display: flex !important; box-sizing: border-box; }
        }
        .btn-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .btn-lift:hover { transform: translateY(-3px); }
        .btn-lift:active { transform: translateY(0); }
        .detail-link {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 22px; background: #FFE135;
          border: 2px solid #B89A00; border-radius: 999px;
          font-weight: 600; font-size: 0.9rem;
          text-decoration: none; color: #2B2B1F; cursor: pointer;
          box-shadow: 0 4px 12px rgba(180,150,0,0.2);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .detail-link:hover { box-shadow: 0 6px 18px rgba(180,150,0,0.3); transform: translateY(-2px); }
        .detail-section-heading {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.35rem; font-weight: 700; color: #4A7015; margin-bottom: 14px;
        }
        .detail-section-heading::after {
          content: ''; flex: 1; height: 2px;
          background: linear-gradient(90deg, #FFE135, transparent); border-radius: 2px;
        }
        @keyframes carouselSlideRight {
          from { opacity: 0.55; transform: translateX(28px); }
          to   { opacity: 1;    transform: translateX(0); }
        }
        @keyframes carouselSlideLeft {
          from { opacity: 0.55; transform: translateX(-28px); }
          to   { opacity: 1;    transform: translateX(0); }
        }
        .carousel-slide-right { animation: carouselSlideRight 0.35s ease-out; }
        .carousel-slide-left  { animation: carouselSlideLeft  0.35s ease-out; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/"           element={<Portfolio />} />
        <Route path="/projects"   element={<ProjectsGallery />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
