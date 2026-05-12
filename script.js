document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        observer.observe(section);
    });

    const resumeUpload = document.getElementById('resume-upload');
    const resumeDisplay = document.getElementById('resume-display');

    if (resumeUpload && resumeDisplay) {
        resumeUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                if (file.type === 'application/pdf') {
                    resumeDisplay.innerHTML = `<embed src="${e.target.result}" width="100%" height="600px" type="application/pdf">`;
                } else {
                    resumeDisplay.innerHTML = `<p>Resume uploaded: ${file.name}</p>`;
                }
            };
            reader.readAsDataURL(file);
        });
    }
});