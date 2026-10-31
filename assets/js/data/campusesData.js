/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Master Centralized Multi-Campus & Locations Data
 * Cities: Narasaraopet (Founding Hub), Guntur (Regional & Medical Hub), Bapatla (Coastal Branch)
 */

export const citiesData = [
  {
    id: 'narasaraopet',
    name: 'Narasaraopet',
    district: 'Palnadu District',
    state: 'Andhra Pradesh',
    pincode: '522601',
    role: 'Founding Headquarters & Main Educational Hub',
    description: 'The historic cradle of Oxford VIT, hosting the Yashoda Bhavan Main Campus, Balaji Bhavan Intermediate sections, Raman Bhavan IIT-JEE Super Wing, Oxford IIT Concept School, and the KSR Towers historical heritage archives.',
    pageUrl: 'narasaraopet.html',
    campusCount: 5
  },
  {
    id: 'guntur',
    name: 'Guntur',
    district: 'Guntur District',
    state: 'Andhra Pradesh',
    pincode: '522002',
    role: 'Regional Competitive & Medical Hub',
    description: 'The high-velocity urban competitive center featuring the Balaji Tower IIT-JEE & Medical Academy, Vasavi Tower Girls Residential & Day Campus, and the specialized VIT Medical Academy Long-Term NEET Wing.',
    pageUrl: 'guntur.html',
    campusCount: 3
  },
  {
    id: 'bapatla',
    name: 'Bapatla',
    district: 'Bapatla District',
    state: 'Andhra Pradesh',
    pincode: '522101',
    role: 'Coastal Regional Branch',
    description: 'Serving coastal Andhra scholars with dedicated Intermediate Board and EAPCET coaching under verified regional academic coordination.',
    pageUrl: 'bapatla.html',
    campusCount: 1
  }
];

export const campusesData = [
  {
    id: 'yashoda-bhavan',
    name: 'Yashoda Bhavan — Main Campus',
    city: 'Narasaraopet',
    district: 'Palnadu District',
    category: 'junior-college',
    categoryLabel: 'Junior College (Intermediate)',
    badge: 'Main Campus & Flagship Center',
    operationalStatus: 'Currently Operational',
    governance: 'Oxford VIT Central Directorate & Trust',
    governanceStatus: 'Verified Direct Administration',
    address: 'Reddy Nagar / Ramireddypeta, Narasaraopet, Palnadu District, AP - 522601',
    landmark: 'Near Reddy Nagar Sector',
    description: 'The designated Main Campus of Oxford VIT in Narasaraopet. Sprawling multi-acre educational sanctuary housing centralized executive lecture theatres, state-of-the-art biological and physical science laboratories, academic counseling suites, and premier residential facilities.',
    facilities: [
      'Central Multi-Tier Smart Lecture Amphitheatres',
      'Modern Physics, Chemistry & Biology Laboratories',
      'Air-Cooled Digital Library & Reference Alcoves',
      '24/7 Monitored Secure Gated Residential Quarters',
      'Hygienic Steam Kitchen & Pure Vegetarian Dining',
      'Health Clinic & Resident Lady Doctor on Call'
    ],
    courses: [
      'Intermediate MPC (IIT-JEE Main & Advanced Track)',
      'Intermediate BiPC (NEET Medical Excellence Track)',
      'AP EAPCET Intensive Engineering & Medical Prep',
      'BIEAP Intermediate Board Preparation'
    ],
    phone: '+91 77991 37799',
    accentColor: '#D6B77A',
    imageSrc: 'assets/images/campuses/yashoda-bhavan.svg',
    cityPageUrl: 'narasaraopet.html'
  },
  {
    id: 'balaji-bhavan',
    name: 'Balaji Bhavan — Senior & Junior Intermediate Sections',
    city: 'Narasaraopet',
    district: 'Palnadu District',
    category: 'junior-college',
    categoryLabel: 'Junior College (Intermediate)',
    badge: 'Senior & Junior Sections',
    operationalStatus: 'Currently Operational',
    governance: 'Oxford VIT Academic Directorate',
    governanceStatus: 'Verified Direct Administration',
    address: 'Reddy Nagar / Vengala Reddy Nagar, Narasaraopet, Palnadu District, AP - 522601',
    landmark: 'Reddy Nagar Main Arch Junction',
    description: 'Housing the dedicated Senior and Junior Intermediate classroom blocks and the renowned Super-60 competitive cell. Engineered for focused academic discipline, continuous evening tutorials, and rigorous test series.',
    facilities: [
      'Ergonomic Individual Study Desks & Pods',
      '24/7 Supervised Silent Reading Chambers',
      'Dedicated Faculty Mentorship Chambers for Doubts',
      'RO Industrial Water Treatment Facility',
      'Evening Supervised Study & Practice Testing Center',
      'Nutritious Residential Dining Hall'
    ],
    courses: [
      'Senior Intermediate (2nd Year) MPC & BiPC',
      'Junior Intermediate (1st Year) MPC & BiPC',
      'Super-60 National Engineering Aspirants Cohort',
      'National Olympiad Guidance (PRMO, NSEP, NSEC)'
    ],
    phone: '+91 92467 64999',
    accentColor: '#526B54',
    imageSrc: 'assets/images/campuses/balaji-bhavan.svg',
    cityPageUrl: 'narasaraopet.html'
  },
  {
    id: 'raman-bhavan',
    name: 'Raman Bhavan — Senior IIT-JEE Super Wing',
    city: 'Narasaraopet',
    district: 'Palnadu District',
    category: 'specialized-academy',
    categoryLabel: 'Specialized Competitive Academy',
    badge: 'Senior IIT-JEE Super Wing',
    operationalStatus: 'Currently Operational',
    governance: 'Oxford VIT Academic Directorate',
    governanceStatus: 'Verified Direct Administration',
    address: 'Ramireddypeta / Arundelpet (near Sainath Towers), Narasaraopet, Palnadu District, AP - 522601',
    landmark: 'Near Sainath Towers, Arundelpet',
    description: 'Named in honor of Nobel Laureate Sir C.V. Raman, this specialized academy serves as the nerve center for senior IIT-JEE aspirants and Olympiad candidates. Features computerized online testing simulating NTA examination interfaces.',
    facilities: [
      '150+ Networked Terminals with NTA-Standard CBT Software',
      'Advanced Physical Demonstration Theatre',
      'Dedicated Higher Mathematics Resource Archive',
      'High-Speed Fiber Optic Backbone with Battery Redundancy',
      'Interactive Digital Audio-Visual Projection Suites',
      'Senior Faculty Research & Doubt-Clearing Cabins'
    ],
    courses: [
      'Senior IIT-JEE Super Wing Intensive Cohort',
      'JEE Advanced Top-100 National Problem-Solving Track',
      'Computer-Based Testing (CBT) Real-Time Simulator',
      'Higher Level Physics & Organic Chemistry Workshops'
    ],
    phone: '+91 92467 64999',
    accentColor: '#B9A8D8',
    imageSrc: 'assets/images/campuses/raman-bhavan.svg',
    cityPageUrl: 'narasaraopet.html'
  },
  {
    id: 'ksr-towers',
    name: 'KSR Towers — Historical Campus Information',
    city: 'Narasaraopet',
    district: 'Palnadu District',
    category: 'historical',
    categoryLabel: 'Historical Building / Heritage Archive',
    badge: 'Historical Building / Archive',
    operationalStatus: 'Historical Campus / Heritage Archive',
    governance: 'KSR Charitable Trust Foundation',
    governanceStatus: 'Verified Historical & Philanthropic Archive',
    address: 'Arundelpet, Narasaraopet, Palnadu District, AP - 522601',
    landmark: 'Arundelpet Commercial Sector',
    description: 'KSR Towers holds a storied place in the institutional evolution of Oxford VIT as the historic executive seat and foundational tower of the KSR Charitable Trust. Maintained today as a heritage institutional repository, student welfare trust archive, and administrative advisory landmark. Not used for daily classroom instruction.',
    facilities: [
      'Historical Directorate Council Chambers',
      'Archival Records & Academic Merit Repository',
      'KSR Charitable Trust Counseling Alcove',
      'Parent Consultation & Philanthropy Lounge',
      'Heritage Photographic & Award Galleries'
    ],
    courses: [
      'Historical Campus Archive (No Daily Intermediate Classes)',
      'KSR Charitable Trust Philanthropic Merit Scholarships',
      'Institutional Documentation & Alumni Archives'
    ],
    phone: '+91 92467 64999',
    accentColor: '#493B4C',
    imageSrc: 'assets/images/campuses/ksr-towers.svg',
    cityPageUrl: 'narasaraopet.html'
  },
  {
    id: 'oxford-iit-school',
    name: 'Oxford IIT School / Concept School',
    city: 'Narasaraopet',
    district: 'Palnadu District',
    category: 'sister-school',
    categoryLabel: 'Sister School & Foundation Wing',
    badge: 'Sister School & Foundation Wing',
    operationalStatus: 'Currently Operational',
    governance: 'Sister Institution / Oxford Concept School Trust',
    governanceStatus: 'Verified Sister Educational Institution',
    address: 'Narasaraopet, Palnadu District, AP - 522601',
    landmark: 'Central Narasaraopet Education Zone',
    description: 'The dedicated high school and foundational crucible preparing younger scholars (Classes 6th to 10th) with early concept mastery in Mathematics, Physics, Chemistry, and Biology. Provides a seamless intellectual runway into Oxford VIT senior intermediate competitive wings.',
    facilities: [
      'Spacious High School Classrooms with Visual Aids',
      'Junior Science Discovery & Experimentation Lab',
      'Children Reference & Literature Reading Room',
      'Safe Dedicated Transport Bus Routes for School Children',
      'Playground for Athletic Drills, Cricket & Kho-Kho',
      'Continuous Formative Assessment System'
    ],
    courses: [
      'High School Classes (6th, 7th, 8th, 9th, 10th)',
      'Early IIT-JEE & NEET Concept Foundation',
      'State Board (BSEAP) / CBSE Curriculum Integration',
      'National Talent Search & Math Olympiad Foundation'
    ],
    phone: '+91 92467 64999',
    accentColor: '#E9A18C',
    imageSrc: 'assets/images/campuses/oxford-iit-school.svg',
    cityPageUrl: 'narasaraopet.html'
  },
  {
    id: 'guntur-balaji-tower',
    name: 'Balaji Tower Campus — IIT-JEE & Medical Academy',
    city: 'Guntur',
    district: 'Guntur District',
    category: 'specialized-academy',
    categoryLabel: 'Specialized Competitive Academy',
    badge: 'Guntur Competitive Hub',
    operationalStatus: 'Currently Operational',
    governance: 'Oxford VIT Institutional Network',
    governanceStatus: 'Verified Regional Competitive Academy',
    address: 'Balaji Tower, Arundelpet / Brodipet Sector, Guntur, AP - 522002',
    landmark: 'Arundelpet / Brodipet Commercial Zone',
    description: 'Oxford VIT premier flagship campus in Guntur city, located at Balaji Tower. Tailored specifically for high-achieving scholars targeting Top 500 ranks in JEE Advanced, BITSAT, and NEET. Operates with an intensive test-driven curriculum and senior mentor faculty.',
    facilities: [
      'Modern Air-Conditioned Smart Lecture Halls',
      'Networked Computer-Based Testing Lab',
      'Extended Evening Study Pods with Faculty Mentors',
      'Pure Drinking Water Systems & Refreshment Lounge',
      'Direct Proximity to Guntur Bus & Rail Terminals',
      'Comprehensive Student Performance Tracking System'
    ],
    courses: [
      'Guntur IIT-JEE Super Batch (MPC)',
      'Guntur AIIMS & NEET Medical Vanguard (BiPC)',
      'Intensive EAPCET Rank Booster Course',
      'Integrated Intermediate BIEAP Syllabus'
    ],
    phone: '+91 92467 64999',
    accentColor: '#526B54',
    imageSrc: 'assets/images/campuses/guntur-balaji-tower.svg',
    cityPageUrl: 'guntur.html'
  },
  {
    id: 'guntur-vasavi-tower',
    name: 'Vasavi Tower Girls Campus — Residential & Day',
    city: 'Guntur',
    district: 'Guntur District',
    category: 'junior-college',
    categoryLabel: 'Junior College (Intermediate)',
    badge: 'Girls Residential & Day',
    operationalStatus: 'Currently Operational',
    governance: 'Oxford VIT Institutional Network',
    governanceStatus: 'Verified Regional Girls Campus',
    address: 'Vasavi Tower, Brodipet / Lakshmipuram Sector, Guntur, AP - 522007',
    landmark: 'Brodipet Main Commercial Road',
    description: 'A purpose-designed, secure educational citadel for girl scholars in Guntur. Offers residential boarding with 24/7 security, dedicated study alcoves, nutritious vegetarian food, and day-scholar programs with supervised evening doubt resolution.',
    facilities: [
      'Gated High-Security Campus with Biometric Monitoring',
      'Resident Lady Lecturers & Full-Time Wardens',
      'Comfortable Hygienic Residential Suites',
      'On-Call Medical Care & Emergency Protocol',
      'Specialized Girls Study Library & Reading Hall',
      'Steam-Cooked Wholesome Vegetarian Dining'
    ],
    courses: [
      'Intermediate BiPC (NEET Medical Dedicated Cohort)',
      'Intermediate MPC (Engineering & BITSAT Focus)',
      'Residential Comprehensive Board & Competitive Track',
      'Day Scholar Secure Study Wing'
    ],
    phone: '+91 77991 37799',
    accentColor: '#B9A8D8',
    imageSrc: 'assets/images/campuses/guntur-vasavi-tower.svg',
    cityPageUrl: 'guntur.html'
  },
  {
    id: 'guntur-vit-medical',
    name: 'VIT Medical Academy — Long-Term NEET Wing',
    city: 'Guntur',
    district: 'Guntur District',
    category: 'specialized-academy',
    categoryLabel: 'Specialized Competitive Academy',
    badge: 'Long-Term NEET Repeater Wing',
    operationalStatus: 'Currently Operational',
    governance: 'Oxford VIT Academic Directorate',
    governanceStatus: 'Verified Specialized Medical Division',
    address: 'VIT Medical Academic Sector, Guntur, AP - 522004',
    landmark: 'Near Guntur Medical Hub',
    description: 'An exclusive, high-intensity academy dedicated entirely to Long-Term NEET repeaters and aspiring medical doctors who have completed Intermediate. Features daily 720-mark pattern practice tests, error-analysis clinics, and personal NCERT line-by-line masterclasses.',
    facilities: [
      'Continuous 14-Hour Supervised Academic Pods',
      'Specialized OMR Practice & Instant Analytics Cell',
      'NCERT Deep-Study Reference Library',
      'Individual Senior Subject Faculty Consultation Desks',
      'Quiet Zone Study Cabins with Zero Distraction',
      'Nutritious Energy Meals & Health Monitoring'
    ],
    courses: [
      'Long-Term NEET Repeater Intensive Program',
      'AIIMS & JIPMER High-Scorer Specialized Modules',
      'NCERT Micro-Level Biology & Chemistry Drills',
      'Weekly Grand Cumulative All-India Simulator Exams'
    ],
    phone: '+91 92467 64999',
    accentColor: '#E9A18C',
    imageSrc: 'assets/images/campuses/guntur-vit-medical.svg',
    cityPageUrl: 'guntur.html'
  },
  {
    id: 'bapatla-branch',
    name: 'VIT Junior College / Bapatla Branch',
    city: 'Bapatla',
    district: 'Bapatla District',
    category: 'junior-college',
    categoryLabel: 'Junior College (Intermediate)',
    badge: 'Coastal Regional Branch',
    operationalStatus: 'Currently Operational',
    governance: 'Pending Verification - Regional Affiliation / Society Registration',
    governanceStatus: 'Pending Verification - Regional Affiliation',
    address: 'Bapatla Town, Bapatla District, AP - 522101',
    landmark: 'Central Bapatla Educational Sector',
    description: 'Serving students from Bapatla, Chirala, Karlapalem, and surrounding coastal agricultural belts. Focuses on foundational Intermediate board excellence (MPC and BiPC) alongside AP EAPCET competitive preparation, bringing quality coaching closer to coastal scholars.',
    facilities: [
      'Well-Lit Ventilated Classroom Blocks',
      'Integrated Science Practical Laboratory',
      'Student Study & Reference Textbook Library',
      'Dedicated Local Bus Transportation Routes',
      'Regular Parent-Teacher Progress Meetings',
      'Career Guidance for Agricultural & Engineering Degrees'
    ],
    courses: [
      'Intermediate MPC (Board Excellence & EAPCET)',
      'Intermediate BiPC (Board & Medical Foundation)',
      'AP EAPCET Regional Fast-Track Cohort',
      'Foundation English & Science Workshops'
    ],
    phone: '+91 92467 64999',
    accentColor: '#D6B77A',
    imageSrc: 'assets/images/campuses/bapatla-branch.svg',
    cityPageUrl: 'bapatla.html'
  }
];
