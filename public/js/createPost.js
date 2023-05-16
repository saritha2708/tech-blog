const $title = document.querySelector('#title');
const $description = document.querySelector('#description');
const $createBtn = document.querySelector('#createBtn');

// Calls the api to create a new blog post
const createBlog = async (event) => {
    event.preventDefault();

    const title = $title.value.trim();
    const description = $description.value.trim();

    if(!title || !description){
        return alert('Please provide title and description');
    }

    try{
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } catch (err) {
        alert(err);
    }
};

$createBtn.addEventListener('click', createBlog);