/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Academic Programs & Pedagogical Structure Data
 */

export const academicsData = {
  programs: [
    {
      id: 'iit-jee-super60',
      title: 'IIT-JEE Super-60 Program',
      category: 'engineering',
      tag: 'Premier Competitive Track',
      featured: true,
      description: 'An elite, high-intensity cohort tailored for students targeting top ranks in JEE Advanced, JEE Main, BITSAT, and premier national technical institutes.',
      highlights: [
        'Curated 60-student batch with 1:15 faculty ratio',
        'Daily Grand Tests with national percentile ranking',
        'Advanced problem sets designed by IIT/NIT alumni',
        'Evening 3-hour micro-doubt clearing sessions',
        'Weekly error log analysis & psychological mentoring'
      ],
      curriculum: 'BIEAP Intermediate MPC + Advanced JEE Main & Advanced Syllabus',
      targetExams: ['JEE Advanced', 'JEE Main', 'BITSAT', 'AP EAPCET', 'VITEEE']
    },
    {
      id: 'neet-medical-academy',
      title: 'NEET Medical Academy',
      category: 'medical',
      tag: 'Healthcare Careers Division',
      featured: true,
      description: 'Comprehensive NCERT line-by-line mastery combined with high-yield clinical reasoning and speed-accuracy training for AIIMS, JIPMER, and top medical colleges.',
      highlights: [
        'Rigorous NCERT-centric Biology & Chemistry drills',
        'Physics numerical simplification workshops',
        'OMR precision training with negative-marking controls',
        'Weekly full-length NEET mock simulations',
        'Special biological specimen demonstration sessions'
      ],
      curriculum: 'BIEAP Intermediate BiPC + National NEET-UG Curriculum',
      targetExams: ['NEET-UG', 'AIIMS', 'JIPMER', 'State Medical Counselling']
    },
    {
      id: 'bieap-board-excellence',
      title: 'Intermediate Board Excellence',
      category: 'board',
      tag: 'MPC | BiPC | MEC Streams',
      featured: false,
      description: 'Mastery over the Board of Intermediate Education Andhra Pradesh (BIEAP) curriculum, consistently producing 990+/1000 and 465+/470 state toppers.',
      highlights: [
        'Chapter-wise blueprint mastery & presentation techniques',
        'Comprehensive question bank with 10 years of solved papers',
        'Dedicated language labs for English & Sanskrit',
        'Frequent revision cycles before board examinations',
        'Personal handwriting and score maximization clinics'
      ],
      curriculum: 'Andhra Pradesh State Intermediate Board Syllabus',
      targetExams: ['IPE 1st & 2nd Year', 'EAPCET', 'CUET', 'Degree Admissions']
    },
    {
      id: 'olympiad-foundation',
      title: 'Olympiad & Foundation Wing',
      category: 'foundation',
      tag: 'Early Career Acceleration',
      featured: false,
      description: 'Cultivating analytical rigor and scientific curiosity from foundational years, preparing students for RMO, NSEP, NSEC, NSEB, and NTSE.',
      highlights: [
        'Higher-order thinking skills (HOTS) and logical reasoning',
        'Laboratory-backed conceptual learning and experimentations',
        'Interactive mathematical puzzle modules',
        'Foundation for Class 8th, 9th, and 10th transitioning to Intermediate'
      ],
      curriculum: 'Integrated CBSE/State Olympiad Foundation Syllabus',
      targetExams: ['PRMO/RMO', 'NSEP/NSEC/NSEB', 'NMTC', 'NTSE']
    }
  ],
  dailySchedule: [
    { time: '05:30 AM – 06:30 AM', activity: 'Morning Mind Freshening, Physical Wellness & Yoga' },
    { time: '06:30 AM – 07:30 AM', activity: 'Supervised Morning Concept Revision' },
    { time: '07:30 AM – 08:15 AM', activity: 'Hygienic Nutritious Breakfast' },
    { time: '08:30 AM – 01:00 PM', activity: 'Core Concept Lecture Sessions (Maths/Bio, Physics, Chemistry)' },
    { time: '01:00 PM – 02:00 PM', activity: 'Wholesome Lunch & Rest Hour' },
    { time: '02:00 PM – 04:30 PM', activity: 'Guided Problem Solving & Practice Workshop' },
    { time: '04:30 PM – 05:00 PM', activity: 'Nutritious Snacks & Outdoor Sports / Recreation' },
    { time: '05:00 PM – 06:30 PM', activity: 'Daily Assessment / Cumulative Grand Test' },
    { time: '06:45 PM – 08:30 PM', activity: '1:1 Doubt Resolution Pods with Resident Faculty' },
    { time: '08:30 PM – 09:15 PM', activity: 'Dinner & Relaxation' },
    { time: '09:15 PM – 10:30 PM', activity: 'Personal Study, Error Log Maintenance & Day Wrap-up' }
  ]
};
