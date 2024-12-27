// Fetch JSON data
fetch("./assets/js/posts.json")
    .then(response => response.json())
    .then(blogData => {
        // Group blogs by category
        const categories = [...new Set(blogData.map(blog => blog.category))];

        // Container where categories will be injected
        const categoryContainer = document.getElementById("category-container");

        // Add a heading "Top Categories"
        const heading = document.createElement("h2");
        heading.textContent = "Top Categories";
        categoryContainer.appendChild(heading); // Append heading to container

        // Sort categories based on total share count (descending)
        categories.sort((a, b) => {
            const shareCountA = blogData
                .filter(blog => blog.category === a)
                .reduce((total, blog) => total + parseInt(blog.share_count.replace('K', '000')), 0); // Convert 'K' to actual numbers
            const shareCountB = blogData
                .filter(blog => blog.category === b)
                .reduce((total, blog) => total + parseInt(blog.share_count.replace('K', '000')), 0);

            return shareCountB - shareCountA; // Sort in descending order
        });

        // Loop through each category and inject it into the HTML
        categories.forEach(category => {
            // Create a new column for each category
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4"); // Bootstrap grid classes

            // Add category card
            const categoryCard = document.createElement("div");
            categoryCard.classList.add("card");

            // Category card body
            const categoryCardBody = document.createElement("div");
            categoryCardBody.classList.add("card-body");

            // Add category title with a link to the post with the highest share count in that category
            const categoryTitle = document.createElement("h5");
            categoryTitle.classList.add("card-title");

            // Find the post with the maximum share count in the category
            const topPost = blogData
                .filter(blog => blog.category === category)
                .sort((a, b) => parseInt(b.share_count.replace('K', '000')) - parseInt(a.share_count.replace('K', '000')))[0];

            // Create a link for the top post
            const categoryLink = document.createElement("a");
            categoryLink.classList.add("text-decoration-none","category");
            categoryLink.href = `view-post.html?id=${topPost.id}`;
            categoryLink.textContent = category; // Display category name
            categoryTitle.appendChild(categoryLink);
            categoryCardBody.appendChild(categoryTitle);

            // Append the category card body to the category card
            categoryCard.appendChild(categoryCardBody);

            // Append the category card to the category div
            categoryDiv.appendChild(categoryCard);

            // Append the category div to the main container
            categoryContainer.appendChild(categoryDiv);
        });
    })
    .catch(error => console.error("Error loading JSON:", error));
