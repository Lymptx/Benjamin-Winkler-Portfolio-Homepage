document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    })

    gsap.ticker.lagSmoothing(0);

});


// Fetch the projects data from the JSON file
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        // Define the sections and their corresponding JSON keys
        const sections = [
            { key: "mainProjects", containerId: "main-projects-container" },
            { key: "projectsInDevelopment", containerId: "projects-in-development-container" },
            { key: "sideProjects", containerId: "side-projects-container" }
        ];

        // Loop through each section and populate it with projects
        sections.forEach(section => {
            const container = document.getElementById(section.containerId);
            if (!container) {
                console.error(`Container with ID '${section.containerId}' not found.`);
                return;
            }

            // Get the corresponding project array from JSON
            const projects = data[section.key];

            projects.forEach(project => {
                // Create a new div for each project
                const projectContainer = document.createElement('div');
                projectContainer.classList.add('project_container');
                projectContainer.style.backgroundImage = `url('${project.image}')`;

                // Create the overlay div
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');

                // Create the keywords container
                const keywordsDiv = document.createElement('div');
                keywordsDiv.classList.add('keywords');
                project.keywords.forEach(keyword => {
                    const keywordSpan = document.createElement('span');
                    keywordSpan.classList.add('keyword');
                    keywordSpan.textContent = keyword;
                    keywordsDiv.appendChild(keywordSpan);
                });

                // Create the project link
                const link = document.createElement('a');
                link.href = project.url;
                link.target = '_blank';
                link.textContent = project.name;

                // Create the external link icon
                const linkIcon = document.createElement('img');
                linkIcon.src = "img/ext_link.svg"; // Ensure this icon exists in your project folder
                linkIcon.alt = "Link Icon";

                // Append elements together
                link.appendChild(linkIcon);
                overlay.appendChild(keywordsDiv);
                overlay.appendChild(link);
                projectContainer.appendChild(overlay);
                container.appendChild(projectContainer);
            });
        });
    })
    .catch(error => console.error('Error loading the projects:', error));
