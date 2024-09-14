// Get references to the form and display area
var form = document.getElementById('resume-builder');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('Shareable-link-container');
var shareableLinkElement = document.getElementById('Shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById('Username').value;
    var name = document.getElementById('Name').value;
    var email = document.getElementById('Email').value;
    var phone = document.getElementById('Phone').value;
    var education = document.getElementById('Education').value;
    var experience = document.getElementById('Experience').value;
    var skills = document.getElementById('Skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate the resume content dynamically
    var resumeHTML = "\n        <h2>Editable Resume</h2>\n        <h3>Personal Information</h3>\n        <p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username
    var shareableURL = "".concat(window.location.href.split('?')[0], "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    var _a;
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('<html><head><title>Resume</title></head><body>');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write(((_a = document.getElementById('resume-display')) === null || _a === void 0 ? void 0 : _a.innerHTML) || '');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('</body></html>');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.close();
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.focus();
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.print();
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('Username').value = username;
            document.getElementById('Name').value = resumeData.name;
            document.getElementById('Email').value = resumeData.email;
            document.getElementById('Phone').value = resumeData.phone;
            document.getElementById('Education').value = resumeData.education;
            document.getElementById('Experience').value = resumeData.experience;
            document.getElementById('Skills').value = resumeData.skills;
        }
    }
});
