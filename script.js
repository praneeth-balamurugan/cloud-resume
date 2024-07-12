// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchResumeData();
});

async function fetchResumeData() {
    try {
        const response = await fetch('https://dqfg32m0ue.execute-api.ap-south-1.amazonaws.com/prod/resume');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        populateResume(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        const resumeContainer = document.getElementById('resume-container');
        resumeContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}

function populateResume(resumeData) {
    const resumeContainer = document.getElementById('resume-container');

    // Example: Populate basics
    const basics = resumeData.basics;
    if (basics) {
        const basicsHtml = `
            <div class="resume-section">
                <h2>${basics.name}</h2>
                <p>${basics.label}</p>
                <p>${basics.location.city}, ${basics.location.region}</p>
                <p>Email: ${basics.email}</p>
                <p>Phone: ${basics.phone}</p>
                <p><a href="${basics.url}" target="_blank">${basics.url}</a></p>
            </div>
        `;
        resumeContainer.innerHTML += basicsHtml;
    }

    // Example: Populate skills
    const skills = resumeData.skills;
    if (skills) {
        const skillsHtml = `
            <div class="resume-section">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li>${skill.name}: ${skill.keywords.join(', ')}</li>`).join('')}
                </ul>
            </div>
        `;
        resumeContainer.innerHTML += skillsHtml;
    }

    // Add more sections as needed (work, education, etc.)
}
