/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Admissions Application & Entrance Registration Logic
 * Fields: Student Name, Parent Name, Mobile, Email, Course, Preferred Campus
 */

export class AdmissionsHandler {
  constructor() {
    this.form = document.getElementById('admissions-inquiry-form');
    this.successModal = document.getElementById('admissions-success-modal');
    this.successRefCode = document.getElementById('success-ref-code');
    this.successModalClose = document.getElementById('admissions-success-close');

    if (!this.form) return;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    if (this.successModalClose) {
      this.successModalClose.addEventListener('click', () => {
        this.successModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const studentName = document.getElementById('adm-student-name').value.trim();
    const parentName = document.getElementById('adm-parent-name').value.trim();
    const mobile = document.getElementById('adm-mobile').value.trim();
    const email = document.getElementById('adm-email').value.trim();
    const course = document.getElementById('adm-course').value;
    const campus = document.getElementById('adm-campus').value;

    if (!studentName || !parentName || !mobile || !email || !course || !campus) {
      alert('Please fill out all mandatory fields to submit your admission inquiry.');
      return;
    }

    // Phone validation (10 digits)
    const phoneClean = mobile.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Generate unique Oxford VIT application reference token
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `OXF-2026-${randomNum}`;

    if (this.successRefCode) {
      this.successRefCode.textContent = refCode;
    }

    if (this.successModal) {
      this.successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    this.form.reset();
  }
}
