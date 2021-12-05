const addComment = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#post-comment').value.trim();
    const locationArr = window.location.href.split('/');
    const post_id = locationArr[locationArr.length - 1];

    if (post_id && content) {
        const response = await fetch('/api/post/comment', {
            method: 'POST',
            body: JSON.stringify({ post_id, content }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.location.replace(`/post/${data.post_id}`);
        } else {
            alert('Failed to create post');
        }
    }
}

document
    .querySelector('.form-add-comment')
    .addEventListener('submit', addComment);
