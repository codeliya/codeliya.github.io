// Fetch the post ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Fetch posts from JSON
fetch('./assets/js/posts.json?v=1.1')
  .then(response => response.json())
  .then(posts => {
    const blogContainer = document.getElementById('blog-container');

    // Find the main post using the ID
    const post = posts.find(p => p.id == postId);

    if (post) {
      blogContainer.innerHTML = "";
      // Create the main post content dynamically using JavaScript
      const postDiv = document.createElement('div');
      postDiv.classList.add('col-12','col-md-12','col-lg-6');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'mb-4', 'border-0');

      const img = document.createElement('img');
      img.src = post.image;
      img.alt = post.title;
      img.classList.add('card-img-top');
      img.setAttribute("style","background: var(--dark);");

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const title = document.createElement('h2');
      title.classList.add('card-title');
      title.textContent = post.title;

      const meta = document.createElement('p');
      meta.classList.add('text-muted','post-meta');
      meta.textContent = `By ${post.author} on ${post.date}`;

      const badgeDiv = document.createElement('div');
      badgeDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

      const badge = document.createElement('span');
      badge.classList.add('beta', 'small');
      badge.textContent = post.category;

      const shareButton = document.createElement('span');
      shareButton.classList.add('beta', 'small');
      shareButton.id = 'share-btn';
      // shareButton.type = 'button';
      shareButton.innerHTML = `<i class="bi bi-share"></i> ${post.share_count}`;

      // Add event listener to share button for main post
      shareButton.addEventListener('click', (event) => {
        event.preventDefault();
        if(shareButton) {
          const main_wa = document.getElementById("wa");
                      const main_fb = document.getElementById("fb");
                      const main_copy_url = document.getElementById("copy_url");
                      const main_encoded_url = encodeURIComponent(`https://codeliya.github.io/view-post.html?id=${post.id}`);
                      const main_wa_url = "https://wa.me/?text=";
                      const main_fb_url = "https://www.facebook.com/sharer/sharer.php?u=";
                      main_wa.setAttribute("href", main_wa_url + main_encoded_url);
                      main_fb.setAttribute("href", main_fb_url + main_encoded_url);
                      main_copy_url.value = `https://codeliya.github.io/view-post.html?id=${post.id}`;
                      const shareModal = new bootstrap.Modal(document.getElementById('myModel'));
                        shareModal.show();
        }else {
          // Doens't Required...
        }
      });

      badgeDiv.appendChild(badge);
      badgeDiv.appendChild(shareButton);

      const content = document.createElement('p');
      content.classList.add('card-text', 'blog-paragraph', 'mt-2');
      // replace - textContent to innerHTML
      content.innerHTML = `${post.content} - ${post.explainedContent}`;
      

      // Append everything
      cardBody.appendChild(title);
      cardBody.appendChild(meta);
      cardBody.appendChild(badgeDiv);
      cardBody.appendChild(content);

      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);

      postDiv.appendChild(cardDiv);

      // Add main post to blog container
      blogContainer.appendChild(postDiv);

      // Show related posts dynamically
      const relatedPosts = posts.filter(p => p.id != postId && p.category === post.category).slice(0, 4);
      if (relatedPosts.length > 0) {
        const relatedDiv = document.createElement('div');
        relatedDiv.classList.add('col-12','col-md-12','col-lg-6');

        const relatedHeader = document.createElement('h3');
        relatedHeader.classList.add('mb-4');
        relatedHeader.innerHTML = "Related Posts";

        const relatedRow = document.createElement('div');
        relatedRow.classList.add('row');

        relatedPosts.forEach(rPost => {
          const relatedCol = document.createElement('div');
          relatedCol.classList.add('col-12','col-md-6','col-lg-6');

          const relatedCard = document.createElement('div');
          relatedCard.classList.add('card', 'border-0', 'related-post-card');

          const relatedLink = document.createElement('a');
          relatedLink.href = `?id=${rPost.id}`;
          relatedLink.classList.add('text-decoration-none', 'text-dark');

          const relatedImg = document.createElement('img');
          relatedImg.src = rPost.image;
          relatedImg.alt = rPost.title;
          relatedImg.classList.add('card-img-top');
          relatedImg.setAttribute("style","background: var(--light);");

          const relatedCardBody = document.createElement('div');
          relatedCardBody.classList.add('card-body');

          const relatedTitle = document.createElement('h5');
          relatedTitle.classList.add('card-title');
          relatedTitle.textContent = rPost.title;

          const relatedBadgeDiv = document.createElement('div');
          relatedBadgeDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

          const relatedBadge = document.createElement('span');
          relatedBadge.classList.add('badge');
          relatedBadge.textContent = rPost.category;

          const relatedShareButton = document.createElement('span');
          relatedShareButton.classList.add('badge');
          // relatedShareButton.type = 'button';
          relatedShareButton.innerHTML = `<i class="bi bi-share"></i> ${rPost.share_count}`;

          // Add event listener to related post share button
          relatedShareButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (relatedShareButton) {
              const related_wa = document.getElementById("wa");
                      const related_fb = document.getElementById("fb");
                      const related_copy_url = document.getElementById("copy_url");
                      const related_encoded_url = encodeURIComponent(`https://codeliya.github.io/view-post.html?id=${rPost.id}`);
                      const related_wa_url = "https://wa.me/?text=";
                      const related_fb_url = "https://www.facebook.com/sharer/sharer.php?u=";
                      related_wa.setAttribute("href", related_wa_url + related_encoded_url);
                      related_fb.setAttribute("href", related_fb_url + related_encoded_url);
                      related_copy_url.value = `https://codeliya.github.io/view-post.html?id=${rPost.id}`;
                      const shareModal = new bootstrap.Modal(document.getElementById('myModel'));
                        shareModal.show();
                    } else {
                      // Doesn't Required...
                    }
          });

          relatedBadgeDiv.appendChild(relatedBadge);
          relatedBadgeDiv.appendChild(relatedShareButton);

          relatedCardBody.appendChild(relatedTitle);
          relatedCardBody.appendChild(relatedBadgeDiv);

          relatedLink.appendChild(relatedImg);
          relatedLink.appendChild(relatedCardBody);

          relatedCard.appendChild(relatedLink);
          relatedCol.appendChild(relatedCard);

          relatedRow.appendChild(relatedCol);
        });

        relatedDiv.appendChild(relatedHeader);
        relatedDiv.appendChild(relatedRow);
        blogContainer.appendChild(relatedDiv);
      }
    } else {
      blogContainer.innerHTML = `
      <div class="col-12">
      <div class="text-center">
    <div class="alert alert-danger" role="alert">
    <i class="bi bi-info-circle-fill me-2"></i>
      Sorry! Post not found!
    </div>
    <a href="https://codeliya.github.io/" class="btn btn-primary btn-sm">Back</a>
  </div>
      </div>
      `;
    }
  })
  .catch(error => console.error('Error fetching posts:', error));