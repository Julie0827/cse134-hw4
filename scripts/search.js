document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.querySelector(".search-box");
    const searchSidebar = document.querySelector(".search-sidebar");
    const resultsContainer = document.querySelector(".search-results");

    const pages = ["index.html", "about.html", "projects.html", "resume.html", "contact.html"];
    const titles = ["HOME", "ABOUT ME", "PROJECTS", "RESUME", "CONTACT"];

    async function handleSearchSidebar() {
        resultsContainer.innerHTML = "";
        
        let query = searchBox.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchSidebar.classList.remove("active");
            return;
        }

        searchSidebar.classList.add("active");

        let searchResults = [];

        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            let title = titles[i];
            let originalContent = await fetchPageContent(page);
            let content = originalContent.toLowerCase();

            if (content.includes(query)) {
                let matchIndex = content.indexOf(query);
                let start = Math.max(matchIndex - 20, 0);
                let end = Math.min(matchIndex + query.length + 20, content.length);
                let preview = originalContent.substring(start, end);
                let originalQuery = originalContent.substring(matchIndex, matchIndex + query.length);

                if (start != 0) preview = "..." + preview;
                if (end != content.length) preview = preview + "...";

                searchResults.push({page, title, preview, originalQuery});
            }
        }

        if (searchResults.length === 0) {
            resultsContainer.innerHTML = "<p>No results found</p>";
            return;
        }

        searchResults.forEach(result => {
            let resultItem = document.createElement("div");

            resultItem.classList.add("result-item");
            resultItem.innerHTML = `<a href="${result.page}?search=${query}">${result.title} - ${result.preview.replace(result.originalQuery, `<span class="search-query">${result.originalQuery}</span>`)}</a>`;
            
            console.log(query);
            console.log(result.preview);

            resultsContainer.appendChild(resultItem);
        });
    }

    searchBox.addEventListener("input", handleSearchSidebar);
    searchBox.addEventListener("click", handleSearchSidebar);

    async function fetchPageContent(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            const nonVisibleElements = doc.querySelectorAll(
                "script, style, meta, link, head, title, noscript, audio, video"
            );

            nonVisibleElements.forEach(el => el.remove());
            
            return doc.body.textContent.trim();
        } catch (error) {
            return "";
        }
    }

    document.addEventListener("click", function (e) {
        if (!searchBox.contains(e.target) && !searchSidebar.contains(e.target)) {
            searchSidebar.classList.remove("active");

            let searchQueries = document.querySelectorAll(".search-query");

            searchQueries.forEach(query => {
                query.classList.remove("search-query");
            });
        }
    });

    function highlightQuery(query) {
        let elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6")

        elements.forEach(el => {
            let rx = new RegExp(`(${query})`, "gi");

            el.innerHTML = el.innerHTML.replace(rx, `<span class="search-query">$1</span>`);
        })
    }

    window.onload = function () {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("search");

        if (query) {
            searchBox.value = query;
            highlightQuery(query);
        }
    }
});
