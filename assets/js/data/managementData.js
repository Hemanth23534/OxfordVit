/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Master Management & Leadership Directorate Data
 * Contains: 7 Verified Management Profiles & Institutional Hierarchy
 */

export const leadershipHierarchy = [
  {
    tier: 1,
    title: 'Group Patronage & Governance',
    subtitle: 'Institutional Vision, Societal Values & Oversight',
    leaders: ['chairman-francis']
  },
  {
    tier: 2,
    title: 'Executive & Academic Directorate',
    subtitle: 'Administrative Policy, Academic Planning & Competitive Syllabi',
    leaders: ['admin-ksr', 'academic-dsr', 'academic-ranga']
  },
  {
    tier: 3,
    title: 'Institutional Strategy & Campus Administration',
    subtitle: 'Campus Operations, Principalship & Student Welfare Services',
    leaders: ['director-raja', 'principal-raghava', 'manager-sambasiva']
  }
];

export const managementProfiles = [
  {
    id: 'chairman-francis',
    name: 'Sri S. Francis Reddy',
    designation: 'Chairman, Oxford Group',
    tierLevel: 1,
    category: 'executive',
    qualifications: 'Founder, Oxford Educational Society (Est. 1999)',
    experienceYears: 35,
    specialization: 'Educational Group Governance & Institutional Philanthropy',
    responsibilities: 'Overall institutional vision, high-level governance, and philanthropic group direction.',
    additionalRole: 'Founder President, Oxford Educational Society',
    verificationStatus: 'Verified Group Chairman (Society Relationship: Pending Formal Institutional Verification)',
    affiliationNotice: 'Founder of Oxford Educational Society (est. 1999). Relationship between Oxford Educational Society and Oxford VIT represents historical founding patronage and society alignment; formal institutional registry synchronization is ongoing.',
    badge: 'Chairman & Founder',
    biography: 'Visionary educational pioneer in Andhra Pradesh who established the Oxford Educational Society in 1999. Revered institutional patriarch whose commitment to disciplined values, academic rigor, and moral ethics laid the foundational bedrock for pre-university institutions across the region.',
    primaryCampus: 'Central Directorate & KSR Towers',
    imageSrc: 'assets/images/management/dr-francis-reddy.svg',
    initials: 'SFR',
    accentColor: '#D6B77A'
  },
  {
    id: 'admin-ksr',
    name: 'K. Srinivasa Rao (KSR)',
    designation: 'Administrative Director',
    tierLevel: 2,
    category: 'executive',
    qualifications: 'M.Sc., B.Ed.',
    experienceYears: 30,
    specialization: 'IIT Mathematics & Educational Administration',
    responsibilities: 'Administrative governance, multi-campus expansion, institutional discipline, and philanthropic trust scholarships.',
    additionalRole: 'President & Founder, KSR Charitable Trust',
    verificationStatus: 'Verified Administrative Director & Registered Trust Leader',
    affiliationNotice: 'Primary administrative architect of Oxford VIT and founding head of the KSR Charitable Trust.',
    badge: 'Administrative Director',
    biography: 'Distinguished academic administrator with three decades of impactful leadership in pre-university education and IIT Mathematics pedagogy. As Administrative Director and head of the KSR Charitable Trust, he oversees institutional discipline, modern infrastructure development across all Bhavans, and awards annual merit-cum-means scholarships to deserving rural achievers.',
    primaryCampus: 'KSR Towers & Balaji Bhavan',
    imageSrc: 'assets/images/management/k-srinivasa-rao.svg',
    initials: 'KSR',
    accentColor: '#526B54'
  },
  {
    id: 'director-raja',
    name: 'Ch. Raja Reddy',
    designation: 'Director',
    tierLevel: 3,
    category: 'executive',
    qualifications: 'M.Com., B.Ed.',
    experienceYears: 24,
    specialization: 'Institutional Strategy & Operations Management',
    responsibilities: 'Institutional strategy, inter-campus operational synergy across Narasaraopet, Guntur, and Bapatla, student amenities, and resource optimization.',
    additionalRole: 'Directorate Coordinator for Multi-Campus Expansion',
    verificationStatus: 'Verified Director — Institutional Strategy & Campus Operations',
    affiliationNotice: 'Oversees operational harmonization between operational Bhavans, sister schools, and regional branches.',
    badge: 'Director (Strategy)',
    biography: 'Dynamic institutional strategist steering the multi-location operational architecture of Oxford VIT. Focuses on seamless resource allocation, world-class classroom technology, transportation safety, and high-standard campus infrastructure throughout Palnadu, Guntur, and Bapatla.',
    primaryCampus: 'Central Operations Directorate & Yashoda Bhavan',
    imageSrc: 'assets/images/management/ch-raja-reddy.svg',
    initials: 'CRR',
    accentColor: '#493B4C'
  },
  {
    id: 'academic-dsr',
    name: 'D. Srinivasa Rao (DSR)',
    designation: 'Academic Director',
    tierLevel: 2,
    category: 'academic',
    qualifications: 'B.Tech. (Ex-SRA, IIT Delhi)',
    experienceYears: 32,
    specialization: 'IIT Mathematics & Comprehensive Academic Planning',
    responsibilities: 'Central academic calendar planning, IIT-JEE Super Wing curriculum synchronization, weekly cumulative testing architecture, and faculty mentoring.',
    additionalRole: 'Chief Academic Council Chairperson & National Test Analyst',
    verificationStatus: 'Verified Academic Director (Academic Media Broadcaster & Council Chair)',
    affiliationNotice: 'Leads senior curriculum planning and competitive exam strategy for national engineering cohorts.',
    badge: 'Academic Director (Planning)',
    biography: 'Accomplished mathematician and academic planner with 32 years of teaching distinction, bringing elite research discipline from his background as a Senior Research Assistant (SRA) at IIT Delhi. Architect of Oxford VIT rigorous weekly test models and personalized error-analysis clinics.',
    primaryCampus: 'Raman Bhavan (IIT-JEE Super Wing) & Main Campus',
    imageSrc: 'assets/images/management/dogiparthi-srinivasa-rao.svg',
    initials: 'DSR',
    accentColor: '#526B54'
  },
  {
    id: 'academic-ranga',
    name: 'P.V. Ranga Rao',
    designation: 'Academic Director',
    tierLevel: 2,
    category: 'academic',
    qualifications: 'M.Sc., IIT Roorkee',
    experienceYears: 19,
    specialization: 'IIT Chemistry (Physical, Organic & Inorganic)',
    responsibilities: 'Direction of chemical sciences curriculum, NEET & JEE Advanced chemistry mastery cohorts, laboratory practicals standardization, and analytical testing.',
    additionalRole: 'Dean of Chemical Sciences & Competitive Research',
    verificationStatus: 'Verified Academic Director (IIT Roorkee Alumnus)',
    affiliationNotice: 'Directs chemistry pedagogy and scientific laboratory standards across all campuses.',
    badge: 'Academic Director (Chemistry)',
    biography: 'Distinguished chemist and educator from IIT Roorkee with 19 years of classroom and competitive mentorship. Celebrated for deconstructing complex organic reaction mechanisms and physical chemistry numerical models, guiding hundreds of students into top-tier IITs, NITs, and AIIMS.',
    primaryCampus: 'Main Campus & Raman Bhavan',
    imageSrc: 'assets/images/management/pv-ranga-rao.svg',
    initials: 'PVR',
    accentColor: '#E9A18C'
  },
  {
    id: 'principal-raghava',
    name: 'Panadi Raghava',
    designation: 'Principal & Academic Director',
    tierLevel: 3,
    category: 'academic',
    qualifications: 'M.Sc., M.A.',
    experienceYears: 19,
    specialization: 'Mathematics Pedagogy & Student Mentorship',
    responsibilities: 'Campus academic administration, classroom curriculum delivery, student motivation, parent-faculty liaison, and day-to-day scholastic discipline.',
    additionalRole: 'KSR Charitable Trust Volunteer & Youth Mentor',
    verificationStatus: 'Verified Principal & Active Social Profile (@raghava_vit)',
    affiliationNotice: 'Active educational counselor with verified social outreach on Instagram (@raghava_vit) and Threads.',
    badge: 'Principal & Academic Director',
    biography: 'Vibrant academic leader, acclaimed mathematics teacher, and youth motivational orator with 19 years of devotion to intermediate students. Serves concurrently as Principal, Super-60 mentor, and enthusiastic KSR Charitable Trust volunteer, fostering ethical conviction alongside academic excellence.',
    primaryCampus: 'Yashoda Bhavan (Main Campus) & Balaji Bhavan',
    imageSrc: 'assets/images/management/panadi-raghava.svg',
    initials: 'PR',
    accentColor: '#B9A8D8',
    socials: {
      instagram: 'https://www.instagram.com/raghava_vit/',
      threads: 'https://www.threads.com/@raghava_vit'
    }
  },
  {
    id: 'manager-sambasiva',
    name: 'K. Sambasiva Rao',
    designation: 'Administrative Manager',
    tierLevel: 3,
    category: 'operations',
    qualifications: 'Graduate in Business Administration',
    experienceYears: 16,
    specialization: 'Campus Logistics & Student Services',
    responsibilities: 'On-ground campus administration in Narasaraopet, hostel logistics, transportation fleet scheduling, and student welfare services.',
    additionalRole: 'Narasaraopet Central Operations Supervisor',
    verificationStatus: 'Verified Campus Administration & Operational Manager',
    affiliationNotice: 'Directs daily facility maintenance, student transit safety, and hostel mess nutrition in Narasaraopet.',
    badge: 'Administrative Manager',
    biography: 'Dedicated operational manager ensuring the flawless execution of day-to-day student welfare and infrastructure services. Oversees the 35+ campus bus transit grid, residential dining hygiene, hostel maintenance, and physical security across Narasaraopet facilities.',
    primaryCampus: 'Main Campus & Balaji Bhavan (Narasaraopet)',
    imageSrc: 'assets/images/management/k-sambasiva-rao.svg',
    initials: 'KSR',
    accentColor: '#D6B77A'
  }
];

export const facultyDirectory = [
  {
    id: 'fac-raghava',
    name: 'Panadi Raghava',
    department: 'mathematics',
    role: 'Principal & Academic Director',
    qualification: 'M.Sc., M.A.',
    experience: '19+ Years Experience',
    focus: 'IIT-JEE Mathematics, Differential & Integral Calculus, Student Mentorship',
    campus: 'Yashoda Bhavan & Balaji Bhavan',
    avatarInitial: 'PR'
  },
  {
    id: 'fac-dsr',
    name: 'D. Srinivasa Rao (DSR)',
    department: 'mathematics',
    role: 'Academic Director & Academic Planning Chair',
    qualification: 'B.Tech (Ex-SRA IIT Delhi)',
    experience: '32+ Years Experience',
    focus: 'IIT Mathematics, Advanced Algebra, Coordinate Geometry & Academic Calendars',
    campus: 'Raman Bhavan & Main Campus',
    avatarInitial: 'DSR'
  },
  {
    id: 'fac-ksr',
    name: 'K. Srinivasa Rao (KSR)',
    department: 'mathematics',
    role: 'Administrative Director & KSR Trust Leader',
    qualification: 'M.Sc., B.Ed., IIT Mathematics',
    experience: '30+ Years Experience',
    focus: 'Algebra, Trigonometry & State Board Scoring Blueprint',
    campus: 'KSR Towers & Balaji Bhavan',
    avatarInitial: 'KSR'
  },
  {
    id: 'fac-ranga',
    name: 'P.V. Ranga Rao',
    department: 'chemistry',
    role: 'Academic Director',
    qualification: 'M.Sc., IIT Roorkee',
    experience: '19+ Years Experience',
    focus: 'IIT Chemistry (Physical, Organic & Inorganic) & Laboratory Pedagogy',
    campus: 'Main Campus & Raman Bhavan',
    avatarInitial: 'PVR'
  },
  {
    id: 'fac-subbarao',
    name: 'K. V. Subba Rao',
    department: 'physics',
    role: 'Head of Department – Physics',
    qualification: 'M.Sc. Physics (Gold Medalist)',
    experience: '20+ Years Experience',
    focus: 'Mechanics, Wave Optics & Integrated National Testing',
    campus: 'Balaji Bhavan & Raman Bhavan',
    avatarInitial: 'KVS'
  },
  {
    id: 'fac-rambabu',
    name: 'M. Rambabu',
    department: 'chemistry',
    role: 'Head of Department – Chemistry',
    qualification: 'M.Sc. Organic Chemistry',
    experience: '19+ Years Experience',
    focus: 'Organic Reaction Mechanisms & Stereochemistry',
    campus: 'Main Campus & Yashoda Bhavan',
    avatarInitial: 'MR'
  },
  {
    id: 'fac-sureshkumar',
    name: 'T. Suresh Kumar',
    department: 'chemistry',
    role: 'Senior Lecturer in Inorganic Chemistry',
    qualification: 'M.Sc., M.Phil. Chemistry',
    experience: '16+ Years Experience',
    focus: 'Coordination Compounds, Chemical Bonding & Metallurgy',
    campus: 'Balaji Bhavan',
    avatarInitial: 'TSK'
  },
  {
    id: 'fac-venkateswarlu',
    name: 'G. Venkateswarlu',
    department: 'biology',
    role: 'Dean of Medical Division & Senior Botany Faculty',
    qualification: 'M.Sc. Botany, B.Ed.',
    experience: '21+ Years Experience',
    focus: 'Plant Physiology, Genetics & Molecular Biology (NEET Specialization)',
    campus: 'Yashoda Bhavan & Main Campus',
    avatarInitial: 'GV'
  },
  {
    id: 'fac-sivareddy',
    name: 'Dr. P. Siva Reddy',
    department: 'biology',
    role: 'Senior Zoology Faculty & Medical Mentor',
    qualification: 'Ph.D. in Life Sciences',
    experience: '17+ Years Experience',
    focus: 'Human Physiology, Biotechnology & Evolution Dynamics',
    campus: 'Yashoda Bhavan',
    avatarInitial: 'PSR'
  },
  {
    id: 'fac-lakshminarayana',
    name: 'S. Lakshmi Narayana',
    department: 'mathematics',
    role: 'Senior Lecturer in Mathematics',
    qualification: 'M.Sc. Mathematics',
    experience: '15+ Years Experience',
    focus: 'Coordinate Geometry, Probability & Differential Equations',
    campus: 'Raman Bhavan',
    avatarInitial: 'SLN'
  },
  {
    id: 'fac-radhakrishna',
    name: 'V. Radhakrishna',
    department: 'physics',
    role: 'Senior Lecturer in Physics',
    qualification: 'M.Sc. Applied Physics',
    experience: '18+ Years Experience',
    focus: 'Rotational Dynamics, Fluid Mechanics & Semiconductor Physics',
    campus: 'Balaji Bhavan',
    avatarInitial: 'VRK'
  },
  {
    id: 'fac-anjaneyulu',
    name: 'K. Anjaneyulu',
    department: 'languages',
    role: 'Head of Department – Sanskrit',
    qualification: 'M.A. Sanskrit, Sahitya Shiromani',
    experience: '25+ Years Experience',
    focus: 'Classical Sanskrit Literature, Grammar & 99/100 Board Scoring Blueprint',
    campus: 'All Bhavans',
    avatarInitial: 'KA'
  },
  {
    id: 'fac-marygrace',
    name: 'P. Mary Grace',
    department: 'languages',
    role: 'Senior Lecturer – English & Verbal Communication',
    qualification: 'M.A. English Literature, B.Ed.',
    experience: '16+ Years Experience',
    focus: 'Phonetics, Vocabulary Mastery, Creative Writing & Interview Prep',
    campus: 'All Bhavans',
    avatarInitial: 'PMG'
  }
];

export const mediaAndYoutube = [
  {
    id: 'yt-1',
    title: 'Oxford VIT Academy Narasaraopet & Guntur Overview',
    speaker: 'D. Srinivasa Rao (Academic Director)',
    description: 'Comprehensive academic briefing detailing integrated intermediate education, state-of-the-art laboratory infrastructure, and faculty mentorship.',
    tag: 'Campus Overview',
    url: 'https://www.youtube.com/results?search_query=oxford+vit+academy+narasaraopet',
    channel: 'Oxford VIT Media / D. Srinivasa Rao'
  },
  {
    id: 'yt-2',
    title: 'Annual Prathibha Puraskaralu & Toppers Felicitation',
    speaker: 'K. Srinivasa Rao (KSR) & Panadi Raghava',
    description: 'Live broadcast of the annual rankers felicitation honoring JEE Advanced, NEET, and AP EAPCET toppers in the presence of parents.',
    tag: 'Awards & Convocation',
    url: 'https://www.youtube.com/results?search_query=oxford+vit+jr+college+felicitation',
    channel: 'Oxford Official Channel'
  },
  {
    id: 'yt-3',
    title: 'Institutional Foundation Day & Family Celebrations',
    speaker: 'Sri S. Francis Reddy & Ch. Raja Reddy',
    description: 'Celebration of institutional milestones, educational expansion, and staff excellence awards.',
    tag: 'Anniversary Ceremony',
    url: 'https://www.youtube.com/results?search_query=oxford+educational+institutions+anniversary',
    channel: 'Regional News & Oxford Media'
  },
  {
    id: 'yt-4',
    title: 'Oxford VIT Cultural Sambaralu & Youth Fest Highlights',
    speaker: 'Student Council & Faculty Directorate',
    description: 'Vibrant showcase of Telugu cultural traditions, music, dance, Rangoli, and youth sports tournaments.',
    tag: 'Campus Life & Events',
    url: 'https://www.youtube.com/results?search_query=oxford+vit+narasaraopet+fest',
    channel: 'Campus Life Chronicles'
  }
];

export const managementData = {
  hierarchy: leadershipHierarchy,
  centralLeadership: managementProfiles,
  facultyDirectory: facultyDirectory,
  mediaAndYoutube: mediaAndYoutube
};
