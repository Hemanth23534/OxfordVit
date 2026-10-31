/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Admissions Application & Entrance Registration Logic
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

    const studentName = document.getElementById('adm-name').value.trim();
    const phone = document.getElementById('adm-phone').value.trim();
    const stream = document.getElementById('adm-stream').value;
    const campus = document.getElementById('adm-campus').value;
    const marks = document.getElementById('adm-marks').value.trim();

    if (!studentName || !phone || !stream || !campus) {
      alert('Please fill out all mandatory fields to submit your admission inquiry.');
      return;
    }

    // Phone validation (Indian 10-digit format)
    const phoneClean = phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      alert('Please enter a valid 10-digit phone number.');
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
