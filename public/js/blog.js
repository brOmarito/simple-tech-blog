let targetedPost;

const runDelete = async (event) => {
    event.preventDefault();
    const action = event.currentTarget.attributes['href'].value;
    const response = await fetch(action, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json();
        // document.location.replace(`/post/${data.id}`);
        location.reload();
    } else {
        alert('Failed to delete post');
    }
}

const deleteEls = document.querySelectorAll('.delete-link');
if (deleteEls && deleteEls.length) {
    deleteEls.forEach(element => {
        element.addEventListener('click', runDelete)
    });
}
