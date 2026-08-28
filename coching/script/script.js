// ================================================================
// FLUENTIQ ACADEMY — MAIN SCRIPT (WHATSAPP INTEGRATED)
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    // ----- PRELOADER -----
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('preloader').classList.add('hidden');
        }, 1000);
    });

    // ----- NAVBAR SCROLL -----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ----- HAMBURGER -----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            this.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            if (hamburger) hamburger.textContent = '☰';
        });
    });

    // ============================================================
    // WHATSAPP CONFIGURATION
    // ============================================================
    const WHATSAPP_NUMBER = '923172492509'; // +92 317 2492509 (Pakistan format)
    
    // WhatsApp par message bhejne ka function
    window.sendToWhatsApp = function(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    // ============================================================
    // ADMISSION FORM — WhatsApp Integration
    // ============================================================
    const form = document.getElementById('admissionForm');
    const courseType = document.getElementById('courseType');
    const courseSelect = document.getElementById('courseSelect');
    const formSuccess = document.getElementById('formSuccess');

    const courseOptions = {
        academic: ['Class VI', 'Class VII', 'Class VIII', 'Class IX (Nine)', 'Class X (Metric)', 'Class XI (1st Year)',
            'Class XII (2nd Year)'
        ],
        computer: ['CIT', 'MS Office', 'DIT', 'Game Development', 'Artificial Intelligence', 'E-Commerce & Freelancing',
            'Web Development'
        ],
        language: ['English', 'German', 'French', 'Arabic', 'Chinese', 'Spanish', 'Italian', 'Korean', 'Turkish', 'Japanese', 'Russian']
    };

    if (courseType) {
        courseType.addEventListener('change', function() {
            const type = this.value;
            courseSelect.innerHTML = '<option value="">Select Course</option>';
            if (type && courseOptions[type]) {
                courseOptions[type].forEach(function(course) {
                    const opt = document.createElement('option');
                    opt.value = course;
                    opt.textContent = course;
                    courseSelect.appendChild(opt);
                });
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const required = form.querySelectorAll('[required]');
            let valid = true;

            required.forEach(function(field) {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff6b6b';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!valid) {
                alert('Please fill in all required fields.');
                return;
            }

            // Form data collect karein
            const data = {
                fullName: document.getElementById('fullName').value,
                fatherName: document.getElementById('fatherName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                courseType: courseType.value,
                course: courseSelect.value,
                cnic: document.getElementById('cnic').value,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
                message: document.getElementById('message').value,
                date: new Date().toISOString()
            };

            // WhatsApp message format karein
            const whatsappMessage = `
🎓 *NEW ADMISSION APPLICATION* 🎓
━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${data.fullName}
👨‍👦 *Father's Name:* ${data.fatherName}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
📚 *Course Type:* ${data.courseType}
📖 *Selected Course:* ${data.course}
🪪 *CNIC/B-Form:* ${data.cnic}
🎂 *Date of Birth:* ${data.dob}
🏠 *Address:* ${data.address}
📝 *Message:* ${data.message || 'N/A'}
━━━━━━━━━━━━━━━━━━━━
📅 *Date:* ${new Date().toLocaleString()}
`;

            // WhatsApp par bhejein
            sendToWhatsApp(whatsappMessage);

            // Local storage mein save karein (optional)
            localStorage.setItem('fluentiq_admission', JSON.stringify(data));

            // Success message dikhayein
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // ----- PDF DOWNLOAD -----
    window.downloadPDF = function() {
        const data = JSON.parse(localStorage.getItem('fluentiq_admission'));
        if (!data) {
            alert('No application data found.');
            return;
        }

        const content = `
                    <div style="font-family: 'Segoe UI', sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #e8edf5; border-radius: 16px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #0a2463; font-size: 28px;">Fluentiq <span style="color: #f4a62a;">Academy</span></h1>
                            <p style="color: #6b7a9a;">Admission Application Receipt</p>
                            <hr style="border: 1px solid #f0f5ff; margin: 20px 0;">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div><strong>Full Name:</strong> ${data.fullName}</div>
                            <div><strong>Father's Name:</strong> ${data.fatherName}</div>
                            <div><strong>Email:</strong> ${data.email}</div>
                            <div><strong>Phone:</strong> ${data.phone}</div>
                            <div><strong>Course Type:</strong> ${data.courseType}</div>
                            <div><strong>Course:</strong> ${data.course}</div>
                            <div><strong>CNIC/B-Form:</strong> ${data.cnic}</div>
                            <div><strong>DOB:</strong> ${data.dob}</div>
                            <div style="grid-column: 1 / -1;"><strong>Address:</strong> ${data.address}</div>
                            ${data.message ? `<div style="grid-column: 1 / -1;"><strong>Message:</strong> ${data.message}</div>` : ''}
                            <div style="grid-column: 1 / -1; text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #f0f5ff; color: #6b7a9a; font-size: 14px;">
                                <p>Submitted on: ${new Date(data.date).toLocaleString()}</p>
                                <p style="color: #22c55e; font-weight: 600;">✓ Application Received</p>
                            </div>
                        </div>
                    </div>
                `;

        const opt = {
            margin: 10,
            filename: `Fluentiq_Admission_${data.fullName.replace(/\s/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const temp = document.createElement('div');
        temp.innerHTML = content;
        temp.style.position = 'fixed';
        temp.style.left = '-9999px';
        temp.style.top = '0';
        temp.style.background = '#ffffff';
        document.body.appendChild(temp);

        html2pdf().set(opt).from(temp).save().then(function() {
            document.body.removeChild(temp);
        });
    };

    // ============================================================
    // CONTACT FORM — WhatsApp Integration
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value || 'N/A';
            const message = document.getElementById('contactMessage').value;

            const whatsappMessage = `
📞 *CONTACT FORM SUBMISSION* 📞
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📧 *Email:* ${email}
📋 *Subject:* ${subject}
💬 *Message:* ${message}
━━━━━━━━━━━━━━━━━━━━
📅 *Date:* ${new Date().toLocaleString()}
`;

            sendToWhatsApp(whatsappMessage);

            alert('✅ Your message has been sent via WhatsApp! We will get back to you soon.');
            this.reset();
        });
    }

    // ----- SMOOTH SCROLL -----
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    console.log('%c Fluentiq Academy ', 'background: #0a2463; color: #f4a62a; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Learn. Grow. Succeed. ', 'color: #6b7a9a; font-size: 14px;');

});