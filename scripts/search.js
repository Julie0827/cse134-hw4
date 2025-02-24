document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.querySelector(".search-box");
    const searchSidebar = document.querySelector(".search-sidebar");
    const resultsContainer = document.querySelector(".search-results-container");

    const pages = ["index.html", "about.html", "projects.html", "resume.html", "contact.html"];
    const titles = ["HOME", "ABOUT ME", "PROJECTS", "RESUME", "CONTACT"];

    async function fetchPageContent(url) {
        if (pageCache[url]) return pageCache[url];

        try {
            const response = await fetch(url);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            const nonVisibleElements = doc.querySelectorAll("script, style, meta, link, head, title, noscript, nav, audio, video");

            nonVisibleElements.forEach(el => el.remove());
            
            const content = doc.body.textContent.trim();
            pageCache[url] = content;

            return content;
        } catch (error) {
            return "";
        }
    }

    const pageCache = JSON.parse(localStorage.getItem("pageCache")) || {};
    let isCacheLoaded = Object.keys(pageCache).length === pages.length;

    if (!isCacheLoaded) {
        for (let page of pages) {
            fetchPageContent(page);
        }
    }

    async function handleSearchSidebar() {
        resultsContainer.innerHTML = "";

        let query = searchBox.value.trim();
        
        if (query.length < 2) {
            searchSidebar.classList.remove("active");
            return;
        }

        searchSidebar.classList.add("active");

        let searchResults = [];

        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            let title = titles[i];
            let content = await fetchPageContent(page);

            let rx = new RegExp(`(${query})`, "gi");
            let matches = [...content.matchAll(rx)];

            for (let match of matches) {
                let matchIndex = match.index;
                let start = Math.max(matchIndex - 20, 0);
                let end = Math.min(matchIndex + query.length + 20, content.length);
                
                let preview = content.substring(start, end);
                preview = preview.replace(rx, `<span class="match-query">$1</span>`);

                if (start != 0) preview = "..." + preview;
                if (end != content.length) preview = preview + "...";

                searchResults.push({page, title, query, preview});
            }
        }

        if (searchResults.length === 0) {
            resultsContainer.innerHTML = "<p>No results found</p>";
            return;
        }

        searchResults.forEach(result => {
            let resultItem = document.createElement("div");

            resultItem.classList.add("result-item");
            resultItem.innerHTML = `<p><span class="page-title">${result.title}</span> - ${result.preview}</p>`;
            
            resultItem.addEventListener("click", () => {
                window.location.href = result.page + "?search=" + result.query;
            });

            resultsContainer.appendChild(resultItem);
        });
    }

    searchBox.addEventListener("input", handleSearchSidebar);
    searchBox.addEventListener("click", handleSearchSidebar);

    document.addEventListener("click", function (e) {
        if (!searchBox.contains(e.target) && !searchSidebar.contains(e.target)) {
            searchSidebar.classList.remove("active");
        }

        let matchQueries = document.querySelectorAll(".match-query:not(.search-sidebar .match-query)");

        matchQueries.forEach(query => {
            query.classList.remove("match-query");
        });
    });

    function highlightQuery(query) {
        let elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6")

        elements.forEach(el => {
            let rx = new RegExp(`(${query})`, "gi");

            el.innerHTML = el.innerHTML.replace(rx, `<span class="match-query">$1</span>`);
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
