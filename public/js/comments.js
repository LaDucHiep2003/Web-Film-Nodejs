document.getElementById('commentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const comment = formData.get('comment');
    const movieId = document.getElementById('commentForm').getAttribute("data-id")
    const response = await fetch(`/phim/comment/${movieId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ comment })
    });

    if (response.ok) {
        const newComment = await response.json();
        console.log(newComment);
        addCommentToDOM(newComment);
        form.reset();
    } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to post comment');
    }
});

function addCommentToDOM(comment) {
    const commentContainer = document.getElementById('comment-section');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-top';

    commentElement.innerHTML = `
    <div class="avata-user">
      <img src="${comment.user.avata}" alt="${comment.user.userName}" />
    </div>
    <div class="text-comment">
      <div class="nameUser">
        <span>${comment.user.userName}</span>
      </div>
      <div class="content-comment">
        <p>${comment.comment}</p>
      </div>
    </div>
    `;

    commentContainer.appendChild(commentElement);
}
