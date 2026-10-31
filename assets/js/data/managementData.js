/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Master Management & Leadership Directorate Data
 * Contains: 6 Verified Management Profiles & Institutional Hierarchy
 */

export const leadershipHierarchy = [
  {
    tier: 1,
    title: 'Institutional Leadership & Chairmen',
    subtitle: 'Institutional Leadership, Strategic Vision & Senior Mentorship',
    leaders: ['admin-ksr', 'academic-dsr']
  },
  {
    tier: 2,
    title: 'Executive & Academic Directorate',
    subtitle: 'Campus Expansion, Strategy & Chemical Sciences Mastery',
    leaders: ['director-raja', 'academic-ranga']
  },
  {
    tier: 3,
    title: 'Institutional Strategy & Campus Administration',
    subtitle: 'Campus Operations, Principalship & Student Welfare Services',
    leaders: ['principal-raghava', 'manager-sambasiva']
  }
];

export const managementProfiles = [
  {
    id: 'admin-ksr',
    name: 'K. Srinivasa Rao (KSR Sir)',
    designation: 'Chairman / Institutional Leadership',
    tierLevel: 1,
    category: 'executive',
    qualifications: 'M.Sc., B.Ed.',
    experienceYears: 30,
    specialization: 'Senior IIT Mathematics Mentor',
    responsibilities: 'Institutional leadership, administrative governance, multi-campus expansion, institutional discipline, and philanthropic trust scholarships.',
    additionalRole: 'President & Founder, KSR Charitable Trust',
    verificationStatus: 'Verified Chairman & Registered Trust Leader',
    affiliationNotice: 'Institutional Chairman of Oxford VIT and founding head of the KSR Charitable Trust.',
    badge: 'Chairman / Institutional Leadership',
    biography: 'Distinguished institutional leader and educator with 30 years of impactful leadership in pre-university education and IIT Mathematics pedagogy. As Chairman and head of the KSR Charitable Trust, he oversees institutional discipline, modern infrastructure development across all Bhavans, and awards annual merit-cum-means scholarships to deserving achievers.',
    primaryCampus: 'KSR Towers & Balaji Bhavan',
    imageSrc: 'assets/images/management/k-srinivasa-rao.svg',
    initials: 'KSR',
    accentColor: '#526B54'
  },
  {
    id: 'academic-dsr',
    name: 'D. Srinivasa Rao (DSR Sir)',
    designation: 'Chairman / Institutional Leadership',
    tierLevel: 1,
    category: 'academic',
    qualifications: 'B.Tech.',
    experienceYears: 32,
    background: 'Ex-SRA, IIT Delhi',
    specialization: 'Senior IIT Mathematics Mentor and Academic Planning',
    responsibilities: 'Institutional leadership, central academic planning, IIT-JEE Super Wing curriculum synchronization, weekly cumulative testing architecture, and faculty mentoring.',
    additionalRole: 'Chief Academic Council Chairperson & National Test Analyst',
    verificationStatus: 'Verified Chairman & Chief Academic Council Chair (Ex-SRA, IIT Delhi)',
    affiliationNotice: 'Institutional Chairman of Oxford VIT leading senior curriculum planning, IIT-JEE Super Wing direction, and competitive examination strategy.',
    badge: 'Chairman / Institutional Leadership',
    biography: 'Accomplished institutional leader, mathematician, and academic planner with 32 years of teaching distinction, bringing elite research discipline from his background as an Ex-Senior Research Assistant (Ex-SRA) at IIT Delhi. As Chairman, he architects Oxford VIT\'s rigorous weekly test models, Super Wing curricula, and personalized error-analysis clinics.',
    primaryCampus: 'Raman Bhavan (IIT-JEE Super Wing) & Main Campus',
    imageSrc: 'assets/images/management/dogiparthi-srinivasa-rao.svg',
    initials: 'DSR',
    accentColor: '#D6B77A'
  },
  {
    id: 'director-raja',
    name: 'Ch. Raja Reddy',
    designation: 'Director',
    tierLevel: 2,
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

import { facultyData } from './facultyData.js';

export { facultyData };
export const facultyDirectory = facultyData;

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
    speaker: 'Chairman K. Srinivasa Rao & Director Ch. Raja Reddy',
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
