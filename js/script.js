document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    })

    gsap.ticker.lagSmoothing(0);

    // Load technical skills
    loadTechnicalSkills();

    // Load projects
    loadProjects();
});

// Function to load and populate technical skills
function loadTechnicalSkills() {
    fetch('skills.json')
        .then(response => response.json())
        .then(data => {
            const skillsGrids = document.querySelectorAll('.skills-grid');

            skillsGrids.forEach(grid => {
                // Clear existing content
                grid.innerHTML = '';

                // Add each category with its skills
                data.technicalSkills.forEach(category => {
                    // Create category container
                    const categoryDiv = document.createElement('div');
                    categoryDiv.classList.add('skill-category');

                    // Create category title
                    const categoryTitle = document.createElement('h5');
                    categoryTitle.classList.add('category-title');
                    categoryTitle.textContent = category.category;
                    categoryDiv.appendChild(categoryTitle);

                    // Create skills container for this category
                    const skillsContainer = document.createElement('div');
                    skillsContainer.classList.add('category-skills');

                    // Add each skill
                    category.skills.forEach(skill => {
                        const skillSpan = document.createElement('span');
                        skillSpan.textContent = skill;
                        skillsContainer.appendChild(skillSpan);
                    });

                    categoryDiv.appendChild(skillsContainer);
                    grid.appendChild(categoryDiv);
                });
            });
        })
        .catch(error => console.error('Error loading the skills:', error));
}

// Function to load and populate projects
function loadProjects() {
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const sections = [
                { key: "mainProjects", containerId: "main-projects-container" },
                { key: "projectsInDevelopment", containerId: "projects-in-development-container" },
                { key: "sideProjects", containerId: "side-projects-container" }
            ];

            let currentlyFlipped = null;

            sections.forEach(section => {
                const container = document.getElementById(section.containerId);
                if (!container) {
                    console.error(`Container with ID '${section.containerId}' not found.`);
                    return;
                }

                const projects = data[section.key];

                projects.forEach(project => {
                    // Create project container
                    const projectContainer = document.createElement('div');
                    projectContainer.classList.add('project_container');

                    // Inner wrapper for flipping effect
                    const projectInner = document.createElement('div');
                    projectInner.classList.add('project_inner');

                    // Front side
                    const projectFront = document.createElement('div');
                    projectFront.classList.add('project_front');
                    projectFront.style.backgroundImage = `url('${project.image}')`;

                    // Corner icon container (as a link if URL exists)
                    const iconWrapper = document.createElement('div');
                    iconWrapper.classList.add('corner_icon_wrapper');

                    const projectLink = document.createElement('a');
                    projectLink.classList.add('corner_icon_link');

                    const projectIcon = document.createElement('img');
                    projectIcon.classList.add('corner_icon');
                    projectIcon.src = "./img/flip_icon.png";
                    projectIcon.alt = "Corner Icon";

                    projectLink.appendChild(projectIcon);
                    iconWrapper.appendChild(projectLink);
                    projectFront.appendChild(iconWrapper);

                    // Overlay content
                    const overlay = document.createElement('div');
                    overlay.classList.add('overlay');

                    const keywordsDiv = document.createElement('div');
                    keywordsDiv.classList.add('keywords');
                    project.keywords.forEach(keyword => {
                        const keywordSpan = document.createElement('span');
                        keywordSpan.classList.add('keyword');
                        keywordSpan.textContent = keyword;
                        keywordsDiv.appendChild(keywordSpan);
                    });

                    const link = document.createElement('a');
                    link.target = '_blank';
                    link.textContent = project.name;

                    //if the json has a link, make it a link with the link icon
                    if (project.url) {
                        link.href = project.url;
                        const linkIcon = document.createElement('img');
                        linkIcon.src = "img/ext_link.svg";
                        linkIcon.alt = "Link Icon";
                        link.appendChild(linkIcon);
                    }

                    overlay.appendChild(keywordsDiv);
                    overlay.appendChild(link);
                    projectFront.appendChild(overlay);

                    // Back side
                    const projectBack = document.createElement('div');
                    projectBack.classList.add('project_back');

                    // Create a paragraph for backside text
                    const backText = document.createElement('p');
                    backText.classList.add('back_text');
                    backText.textContent = project.backsidetxt;

                    projectBack.appendChild(backText);

                    // Append front & back to inner wrapper
                    projectInner.appendChild(projectFront);
                    projectInner.appendChild(projectBack);
                    projectContainer.appendChild(projectInner);

                    // Click event to flip the card
                    projectContainer.addEventListener('click', () => {
                        if (currentlyFlipped && currentlyFlipped !== projectContainer) {
                            currentlyFlipped.classList.remove('flipped');
                        }

                        const isFlipped = projectContainer.classList.contains('flipped');
                        if (isFlipped) {
                            projectContainer.classList.remove('flipped');
                            currentlyFlipped = null;
                        } else {
                            projectContainer.classList.add('flipped');
                            currentlyFlipped = projectContainer;
                        }
                    });

                    container.appendChild(projectContainer);
                });
            });
        })
        .catch(error => console.error('Error loading the projects:', error));
}