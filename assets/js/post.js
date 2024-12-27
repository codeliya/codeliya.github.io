// Fetch blog posts from JSON file
fetch("./assets/js/posts.json")
    .then(response => response.json())
    .then(posts => {
        const blogContainer = document.getElementById("blog-container");
        const postsPerPage = 10; // Number of posts per page
        let currentPage = 1;

        // Sort posts by date (recent first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Function to render posts
        function renderPosts(page = 1) {
            blogContainer.innerHTML = ""; // Clear previous posts
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const paginatedPosts = posts.slice(startIndex, endIndex);

            paginatedPosts.forEach(post => {
                // Create blog post card
                const postElement = document.createElement("div");
                postElement.className = "col-12 col-md-6 col-lg-4 mb-4"; // Bootstrap grid system

                const cardElement = document.createElement("div");
                cardElement.className = "card h-100 border-0";
                
                // Create the image element
                const imageElement = document.createElement("img");
                imageElement.className = "card-img-top";
                imageElement.src = post.image;
                imageElement.alt = post.title;
                imageElement.setAttribute("style","background: var(--dark);");

                // Card body
                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                // Add title
                const titleElement = document.createElement("h5");
                titleElement.className = "card-title";
                titleElement.textContent = post.title;

                // Add metadata (author and date)
                const metaElement = document.createElement("p");
                metaElement.className = "card-text post-meta text-muted";
                metaElement.textContent = `By ${post.author} on ${post.date}`;

                // Add category and share button
                const categoryAndShare = document.createElement("div");
                categoryAndShare.className =
                    "d-flex justify-content-between align-items-center";

                const categoryElement = document.createElement("span");
                categoryElement.className = "beta small";
                categoryElement.textContent = post.category;

                const shareBtn = document.createElement("span");
                shareBtn.className = "beta small";
                shareBtn.innerHTML = `<i class="bi bi-share"></i> ${post.share_count}`;
                shareBtn.addEventListener("click", () => {
                    if (shareBtn) {
                      const wa = document.getElementById("wa");
                      const fb = document.getElementById("fb");
                      const copy_url = document.getElementById("copy_url");
                      const encoded_url = encodeURIComponent(`https://codeliya.github.io/view-post.html?id=${post.id}`);
                      const wa_url = "https://wa.me/?text=";
                      const fb_url = "https://www.facebook.com/sharer/sharer.php?u=";
                      wa.setAttribute("href", wa_url + encoded_url);
                      fb.setAttribute("href", fb_url + encoded_url);
                      copy_url.value = `https://codeliya.github.io/view-post.html?id=${post.id}`;
                      const shareModal = new bootstrap.Modal(document.getElementById('myModel'));
                        shareModal.show();
                    } else {
                      // Doesn't Required
                    }
                });

                categoryAndShare.appendChild(categoryElement);
                categoryAndShare.appendChild(shareBtn);

                // Add excerpt
                const excerptElement = document.createElement("p");
                excerptElement.className = "card-text mt-2 blog-paragraph";
                excerptElement.textContent =
                    post.excerpt || post.content.substring(0, 100) + "...";

                // Append to card body
                cardBody.appendChild(titleElement);
                cardBody.appendChild(metaElement);
                cardBody.appendChild(categoryAndShare);
                cardBody.appendChild(excerptElement);
                // Create footer element
                const footer = document.createElement("div");
                footer.classList.add("card-footer","border-0");
                // Add read more link
                const readMoreElement = document.createElement("a");
                readMoreElement.href = `http://localhost:8158/view-post.html?id=${post.id}`;
                readMoreElement.className = "btn btn-primary btn-sm";
                readMoreElement.textContent = "Read More";
                footer.appendChild(readMoreElement);
                // Append image and body to card
                cardElement.appendChild(imageElement);
                cardElement.appendChild(cardBody);
                
                // Append Footer to post Element 
                cardElement.appendChild(footer); // if you want it outside cardBody but inside cardDiv
                // Append card to post element
                postElement.appendChild(cardElement);

                // Append post element to blog container
                blogContainer.appendChild(postElement);
            });
        }

        // Render pagination
        function renderPagination() {
            const paginationContainer = document.getElementById(
                "pagination-container"
            );
            paginationContainer.innerHTML = ""; // Clear previous pagination

            const totalPages = Math.ceil(posts.length / postsPerPage);

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement("button");
                pageButton.textContent = i;
                pageButton.className = "btn btn-sm btn-primary me-2 mb-2";

                if (i === currentPage) {
                    pageButton.classList.add("active");
                }

                pageButton.addEventListener("click", () => {
                    currentPage = i;
                    renderPosts(currentPage);
                    renderPagination();
                });
                paginationContainer.appendChild(pageButton);
            }
        }

        // Initial render
        renderPosts(currentPage);
        renderPagination();
    })
    .catch(error => console.error("Error fetching posts:", error));
