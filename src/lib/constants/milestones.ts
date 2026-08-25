export interface MilestoneImage {
  src: string;
  alt: string;
  className: string;
}

export interface MilestonePopup {
  year: string;
  heading: string;
  bodyHtml: string;
  images: MilestoneImage[];
}

export interface MilestoneCard {
  id: string;
  origin: string;
  connect: string;
  yearText: string;
  heading: string;
  description: string;
  images: MilestoneImage[];
  bottomText: string[];
  popup: MilestonePopup;
  cardAnim: {
    'data-tl-from': string;
    'data-tl-to': string;
    'data-tl-start': string;
    'data-tl-trigger': string;
    'data-tl-type': string;
  };
  lineAnim?: {
    'data-tl-from': string;
    'data-tl-to': string;
    'data-tl-start': string;
    'data-tl-trigger': string;
    'data-tl-type': string;
  };
}

export const MILESTONES: MilestoneCard[] = [
  {
    id: "ac-1",
    origin: "bottom right",
    connect: "step-1",
    yearText: "19",
    heading: "Starting out with my brother",
    description: "My brother Stefan showed me Webflow. I bothered him with questions for three months straight. He probably regrets it.",
    images: [
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6938003f0416538c089a67eb_Frame-20116046198.avif",
        alt: "My brother Stefan",
        className: "about-card-img z-index-s"
      },
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6938003e6bd18390b3bef67c_Frame-20116046197.avif",
        alt: "",
        className: "about-card-img is-riight-side"
      }
    ],
    bottomText: ["@stefan", "7years ago"],
    popup: {
      year: "2019",
      heading: "Starting out with my brother",
      bodyHtml: "My brother Stefan, a UX designer, opened Webflow and created something right in front of me. I had no idea what I was doing but I couldn't close the laptop. No master plan, no career goal. Just a guy who found something and couldn't let go. Three months of late nights and annoying my brother with questions later, I knew this was it.",
      images: [
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df05a90861c514ccbed5_Frame-20116046201-1.svg",
          alt: "",
          className: "about-card-img"
        },
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df25b4ed7feceb529a70_Frame-20116046202.avif",
          alt: "My Brother Stefan",
          className: "about-card-img is-riight-side"
        }
      ]
    },
    cardAnim: {
      "data-tl-from": "{'y': '10%', 'opacity': 0, 'scale': 0.6}",
      "data-tl-to": "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}",
      "data-tl-start": "-45% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    },
    lineAnim: {
      "data-tl-from": "{'clipPath':'inset(100% 0% % 0%)'}",
      "data-tl-to": "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }",
      "data-tl-start": "-45% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    }
  },
  {
    id: "ac-2",
    origin: "bottom left",
    connect: "step-2",
    yearText: "20",
    heading: "First freelance steps",
    description: "First real client. First real panic. Working for yourself and working for someone else are completely different.",
    images: [
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6938003e6bd18390b3bef67c_Frame-20116046197.avif",
        alt: "",
        className: "about-card-img"
      },
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f930d96c6e20e538418_Frame-20116046202-2.avif",
        alt: "",
        className: "about-card-img is-riight-side"
      }
    ],
    bottomText: ["@webflow", "6years ago"],
    popup: {
      year: "2020",
      heading: "First freelance steps",
      bodyHtml: "Practicing on my own was comfortable. Then someone trusted me with their project and suddenly every pixel mattered in a way it didn't before. That first year of client work taught me more than six months of practice ever did. Not because the projects were complex but because someone was counting on me to get it right.",
      images: [
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df05a90861c514ccbed5_Frame-20116046201-1.svg",
          alt: "",
          className: "about-card-img"
        },
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df05926be20e2a5210dc_Frame-20116046197-1.svg",
          alt: "",
          className: "about-card-img is-riight-side"
        }
      ]
    },
    cardAnim: {
      "data-tl-from": "{'y': '10%', 'opacity': 0, 'scale': 0.6}",
      "data-tl-to": "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}",
      "data-tl-start": "-22% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    },
    lineAnim: {
      "data-tl-from": "{'clipPath':'inset(100% 0% % 0%)'}",
      "data-tl-to": "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }",
      "data-tl-start": "-22% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    }
  },
  {
    id: "ac-3",
    origin: "bottom left",
    connect: "step-3",
    yearText: "21",
    heading: "Beyond what I knew",
    description: "A biotech project that made me think this isn't possible in Webflow. Turns out it was.",
    images: [
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f936be7964da2364ec5_Frame-20116046200.avif",
        alt: "FiftySeven Agency",
        className: "about-card-img"
      }
    ],
    bottomText: ["@fiftyseven", "5years ago"],
    popup: {
      year: "2021",
      heading: "Beyond what I knew",
      bodyHtml: "When <a href=\"https://www.fiftyseven.co/\" target=\"_blank\" class=\"popup-link\">FIFTYSEVEN</a> sent me the brief for Roswell Biotech, my first thought was honestly this can't be done in Webflow. The design demanded pixel-perfect execution, the functionality was complex, and I had to teach myself JavaScript mid-project to make it work. Scariest project I ever took on. Also the one that changed how I approach everything after it.",
      images: [
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df057bcc609a31ad9653_Frame-20116046257.avif",
          alt: "FiftySeven Agency",
          className: "about-card-img"
        }
      ]
    },
    cardAnim: {
      "data-tl-from": "{'y': '10%', 'opacity': 0, 'scale': 0.6}",
      "data-tl-to": "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}",
      "data-tl-start": "-4% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    },
    lineAnim: {
      "data-tl-from": "{'clipPath':'inset(100% 0% % 0%)'}",
      "data-tl-to": "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }",
      "data-tl-start": "-4% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    }
  },
  {
    id: "ac-4",
    origin: "bottom right",
    connect: "step-4",
    yearText: "22",
    heading: "Leveling up",
    description: "The year animations and CMS stopped being extras and started shaping how every project feels.",
    images: [
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f93c84f50980dd014b3_Frame-20116046203.avif",
        alt: "",
        className: "about-card-img"
      },
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f9327bbf72053c6447f_Frame-20116046204.avif",
        alt: "",
        className: "about-card-img is-riight-side"
      }
    ],
    bottomText: ["@gsap", "4years ago"],
    popup: {
      year: "2022",
      heading: "Leveling up",
      bodyHtml: "GSAP went from something I used occasionally to something that shaped every project. Animations weren't decoration anymore, they were part of how a site communicates. On the CMS side I kept finding cleaner and smarter ways to structure content, setups that made managing a site effortless for clients. Everything I worked on this year started feeling more intentional.",
      images: [
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df0596a543d59e90401b_Frame-20116046197-2.svg",
          alt: "",
          className: "about-card-img"
        },
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df0508fec342703e430f_Frame-20116046201.svg",
          alt: "",
          className: "about-card-img is-riight-side"
        }
      ]
    },
    cardAnim: {
      "data-tl-from": "{'y': '10%', 'opacity': 0, 'scale': 0.6}",
      "data-tl-to": "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}",
      "data-tl-start": "11% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    },
    lineAnim: {
      "data-tl-from": "{'clipPath':'inset(100% 0% % 0%)'}",
      "data-tl-to": "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }",
      "data-tl-start": "11% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    }
  },
  {
    id: "ac-5",
    origin: "bottom left",
    connect: "step-5",
    yearText: "23",
    heading: "From trust to referrals",
    description: "No pitch. No portfolio review. Just clients telling people 'work with Nenad.' That hit different.",
    images: [
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f9348881bb03b006451_Frame-20116046201-1.avif",
        alt: "",
        className: "about-card-img"
      },
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f933cc29e0ef38aa1b4_Frame-20116046202-1.avif",
        alt: "",
        className: "about-card-img is-riight-side"
      }
    ],
    bottomText: ["@clients", "3years ago"],
    popup: {
      year: "2023",
      heading: "From trust to referrals",
      bodyHtml: "Clients I'd worked with came back with new projects. Some recommended me to people I'd never met. No interview, no portfolio walkthrough, just 'work with Nenad, he delivers.' That kind of trust isn't something you can put in a case study. But it's the thing I'm most proud of.",
      images: [
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df05fc58dfb3e9f5fbec_Frame-20116046197.svg",
          alt: "",
          className: "about-card-img"
        },
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df06fafef34d89b8c2f0_Frame-20116046198.svg",
          alt: "",
          className: "about-card-img is-riight-side"
        }
      ]
    },
    cardAnim: {
      "data-tl-from": "{'y': '10%', 'opacity': 0, 'scale': 0.6}",
      "data-tl-to": "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}",
      "data-tl-start": "20% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    },
    lineAnim: {
      "data-tl-from": "{'clipPath':'inset(100% 0% % 0%)'}",
      "data-tl-to": "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }",
      "data-tl-start": "20% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    }
  },
  {
    id: "ac-6",
    origin: "bottom left",
    connect: "step-6",
    yearText: "24",
    heading: "A life-changing year",
    description: "I got married. My daughter Djina was born. Suddenly everything I do has a deeper reason behind it.",
    images: [
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f936be7964da2364eca_Frame-20116046201.avif",
        alt: "",
        className: "about-card-img"
      },
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f939dc793550f75d931_Frame-20116046202.avif",
        alt: "Daughter Djina",
        className: "about-card-img is-riight-side"
      }
    ],
    bottomText: ["@family", "2years ago"],
    popup: {
      year: "2024",
      heading: "A life - changing year",
      bodyHtml: "Before this year I thought I understood what motivation meant. I had no idea. Nothing makes you sharper at work than knowing exactly who you're coming home to. Djina changed how I see everything, not just life, but how I show up for every single thing I do.",
      images: [
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6945df057a20901ce46dcb36_Frame-20116046197-3.svg",
          alt: "",
          className: "about-card-img"
        },
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694678ece28003b18bbca37b_Frame-20116046198.avif",
          alt: "Smiling baby girl with blue eyes wearing a pink bow headband and a white outfit.",
          className: "about-card-img is-riight-side"
        }
      ]
    },
    cardAnim: {
      "data-tl-from": "{'y': '10%', 'opacity': 0, 'scale': 0.6}",
      "data-tl-to": "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}",
      "data-tl-start": "36% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    },
    lineAnim: {
      "data-tl-from": "{'clipPath':'inset(100% 0% % 0%)'}",
      "data-tl-to": "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }",
      "data-tl-start": "36% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    }
  },
  {
    id: "ac-7",
    origin: "bottom left",
    connect: "step-7",
    yearText: "26",
    heading: "The journey continues",
    description: "Seven years in. Still obsessed. Now figuring out how AI changes the game. Same drive, new tools.",
    images: [
      {
        src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/69399f93fddfcaeaadcfa3d1_Frame-20116046200-1.avif",
        alt: "",
        className: "about-card-img"
      }
    ],
    bottomText: ["@nenad"],
    popup: {
      year: "2026",
      heading: "The journey continues",
      bodyHtml: "The industry doesn't stand still and neither do I. After seven years of working, learning, and evolving, AI has opened up a whole new layer of what's possible. Same obsession, new tools. The best work is still ahead.",
      images: [
        {
          src: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693fbb7c6a81b0964539f3bc_Frame-201321314730.avif",
          alt: "Me | Nenad Popadic",
          className: "about-card-img"
        }
      ]
    },
    cardAnim: {
      "data-tl-from": "{'y': '10%', 'opacity': 0, 'scale': 0.6}",
      "data-tl-to": "{'y': '0%', 'opacity': 1, 'scale': 1, 'duration': 1.1, 'delay': 0.3, 'ease': 'expo.out'}",
      "data-tl-start": "58% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    },
    lineAnim: {
      "data-tl-from": "{'clipPath':'inset(100% 0% % 0%)'}",
      "data-tl-to": "{'clipPath':'inset(0% 0% 0% 0%)',   'duration':1.5,   'delay':0.2,   'ease':'expo.out' }",
      "data-tl-start": "58% top",
      "data-tl-trigger": ".about-card-container",
      "data-tl-type": "trigger"
    }
  }
];
