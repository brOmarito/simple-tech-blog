const createPostForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.location.replace(`/post/${data.id}`);
        } else {
            alert('Failed to create post');
        }
    }
}

document
    .querySelector('.form-post-create')
    .addEventListener('submit', createPostForm);
