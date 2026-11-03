require('dotenv').config();
const dns = require('dns');

// Use public DNS servers to resolve MongoDB SRV records on Windows
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
const Club = require('./models/club');

const clubsData = [
  {
    name: 'GDGC',
    slug: 'gdgc',
    fullName: 'Google Developer Group on Campus',
    description: 'Technology, coding and developer events.',
    longDescription:
      'A vibrant student-led technical community empowering engineers at UIET Kurukshetra through hands-on learning, Google Cloud certifications, open-source projects, and developer workshops.',
    category: 'Technical',
    vision:
      'To bridge the gap between academic theory and real-world software engineering.',
    mission:
      'Fostering developer skills in Web Development, Artificial Intelligence, Mobile Apps, and Cloud Infrastructure.',
    achievements: [
      'Organized Google Cloud Arcade Facilitator program cohorts.',
      'Hosted campus-wide ideathons & Gen AI codelabs.',
      'Built collaborative open-source campus platforms.'
    ],
    domains: [
      {
        title: 'Web & App Development',
        desc: 'Building responsive full-stack applications with modern frameworks.'
      },
      {
        title: 'Cloud & DevOps',
        desc: 'Hands-on practice on Google Cloud Platform, containers, and deployment.'
      },
      {
        title: 'AI & Machine Learning',
        desc: 'Workshops on Gemini API, LangChain, and machine learning basics.'
      }
    ],
    socialLinks: {
      website:
        'https://gdg.community.dev/gdg-on-campus-university-institute-of-engineering-and-technology-kurukshetra-university-kurukshetra-india/',
      email: 'director.uiet@kuk.ac.in',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'E-Cell',
    slug: 'ecell',
    fullName: 'Entrepreneurship Cell (E-Cell)',
    description: 'Entrepreneurship, startups and innovation.',
    longDescription:
      'Supporting and fostering the entrepreneurial spirit among student innovators at UIET Kurukshetra. We provide a bridge between student startups, mentors, angel investors, and incubation centers.',
    category: 'Entrepreneurship',
    vision:
      'Empowering students to turn innovative ideas into scalable business ventures.',
    mission:
      'Identify key problems, innovate creative solutions, and incubate startups with mentorship and seed funding.',
    achievements: [
      'Facilitated mentorship sessions with startup founders and prominent alumni.',
      'Conducted annual campus pitch competitions and ideathons.',
      'Assisted student venture teams in accessing regional incubator grants.'
    ],
    domains: [
      {
        title: 'Ideate',
        desc: 'Identify key societal and industry problems to brainstorm innovative solutions.'
      },
      {
        title: 'Innovate',
        desc: 'Convert creative ideas into viable business models with expert mentorship.'
      },
      {
        title: 'Incubate',
        desc: 'Gain access to seed funding, investor networks, and incubation facilities.'
      }
    ],
    socialLinks: {
      website: 'https://uietkuk.ac.in',
      email: 'director.uiet@kuk.ac.in',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      github: ''
    }
  },
  {
    name: 'SAE',
    slug: 'sae',
    fullName: 'Society of Automotive Engineers (SAE)',
    description: 'Automotive engineering and practical projects.',
    longDescription:
      'Designing, building, and racing high-performance vehicles while driving innovation in mobility engineering at UIET Kurukshetra.',
    category: 'Automotive & Mechanical',
    vision:
      'Promoting hands-on mobility engineering through practical vehicle projects and national competitions.',
    mission:
      'Hands-on vehicle manufacturing, aerodynamic testing, and participation in national BAJA and SUPRA competitions.',
    achievements: [
      'Fabricated custom all-terrain vehicle (ATV) prototypes.',
      'Participated in national level collegiate automotive design competitions.',
      'Conducted hands-on mechanical fabrication and CAD workshops for juniors.'
    ],
    domains: [
      {
        title: 'Automotive Design',
        desc: 'Vehicle dynamics, chassis modeling, and CAD analysis.'
      },
      {
        title: 'EV Mobility',
        desc: 'Electric powertrain design, battery management, and motor controllers.'
      },
      {
        title: 'Manufacturing & Fabrication',
        desc: 'Hands-on welding, machining, and prototype assembly.'
      },
      {
        title: 'Aerodynamics',
        desc: 'CFD analysis and aerodynamic efficiency optimization.'
      }
    ],
    socialLinks: {
      website: 'https://uietkuk.ac.in',
      email: 'director.uiet@kuk.ac.in',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      github: ''
    }
  },
  {
    name: 'Elektron',
    slug: 'elektron',
    fullName: 'Elektron Club',
    description: 'Electronics, technology and student activities.',
    longDescription:
      'The hardware innovation hub of UIET, empowering students in electronics, IoT, embedded systems, and robotics.',
    category: 'Electronics & Hardware',
    vision:
      'Fostering practical expertise in electronics hardware design, embedded firmware, and smart connected devices.',
    mission:
      'Bridging circuit theory with hardware prototyping through workshops, microcontrollers, and IoT projects.',
    achievements: [
      'Organized hands-on workshops on PCB design and Arduino robotics.',
      'Built smart campus automation and sensor network prototypes.',
      'Mentored students in national hardware hackathons and embedded challenges.'
    ],
    domains: [
      {
        title: 'Embedded Systems',
        desc: 'Microcontroller programming with STM32, ESP32, and Arduino platforms.'
      },
      {
        title: 'IoT Solutions',
        desc: 'Designing smart sensor networks and cloud-connected hardware systems.'
      },
      {
        title: 'Circuit Design & PCB',
        desc: 'Schematic capture, PCB routing, and hardware prototyping in KiCAD.'
      },
      {
        title: 'Robotics & Automation',
        desc: 'Sensors, motor drivers, and autonomous control algorithms.'
      }
    ],
    socialLinks: {
      website: 'https://uietkuk.ac.in',
      email: 'director.uiet@kuk.ac.in',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      github: ''
    }
  },
  {
    name: 'Genesis',
    slug: 'genesis',
    fullName: 'Genesis — Biotechnology Society',
    description: 'Student community and creative activities.',
    longDescription:
      'Genesis is the official Biotechnology and Life Sciences Engineering Society at UIET Kurukshetra, bridging biological sciences with computational biology, bioprocessing, and bio-engineering.',
    category: 'Biotechnology & Life Sciences',
    vision:
      'Advancing student exploration and innovation at the intersection of biological sciences and engineering.',
    mission:
      'Encouraging research culture in bioinformatics, CRISPR, biopharmaceuticals, and environmental bioprocessing.',
    achievements: [
      'Organized bioinformatics sequence analysis workshops using Python and BLAST.',
      'Hosted CRISPR and gene editing guest expert lecture series.',
      'Conducted Bio-Innovate campus ideation hackathon for sustainable biotech solutions.'
    ],
    domains: [
      {
        title: 'Computational Biology',
        desc: 'Protein modeling, sequence alignment, and algorithmic data analysis.'
      },
      {
        title: 'Bioprocess Engineering',
        desc: 'Fermentation, enzyme kinetics, and industrial bioproduct synthesis.'
      },
      {
        title: 'Genetic Engineering',
        desc: 'Molecular cloning, recombinant DNA technology, and CRISPR mechanisms.'
      }
    ],
    socialLinks: {
      website: 'https://uietkuk.ac.in',
      email: 'director.uiet@kuk.ac.in',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      github: ''
    }
  }
];

const seedClubs = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL environment variable is missing in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully! 🚀\n');

    console.log(`Seeding ${clubsData.length} clubs into database...`);

    for (const club of clubsData) {
      const updated = await Club.findOneAndUpdate(
        { slug: club.slug },
        club,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✓ Seeded club: ${updated.name} (${updated.fullName})`);
    }

    console.log('\nAll clubs have been seeded successfully! 🎉');
  } catch (error) {
    console.error('Error seeding clubs:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

seedClubs();
