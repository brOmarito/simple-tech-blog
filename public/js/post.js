const locationArr = window.location.href.split('/');
const post_id = locationArr[locationArr.length - 1];

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

const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'PUT',
            body: JSON.stringify({ post_id, title, content }),
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

const handleUpdateFormValues = async (formEl) => {
    const response = await fetch(`/api/post/${post_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json();
        formEl.querySelector('#post-title').value = data.title;
        formEl.querySelector('#post-content').value = data.content;
    } else {
        alert('Failed to find post');
        document.location.replace(`/`);
    }
}

const createForm = document.querySelector('.form-post-create');
if (createForm) createForm.addEventListener('submit', createPostForm);

const updateForm = document.querySelector('.form-post-update');
if (updateForm) {
    handleUpdateFormValues(updateForm);
    updateForm.addEventListener('submit', updatePost);
}
