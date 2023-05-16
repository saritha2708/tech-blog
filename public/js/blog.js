console.log('blog.js loaded');
const $title = document.getElementById('title');
const $description = document.getElementById('description');
const $updateBtn = document.getElementById('updateBtn');
const $deleteBtn = document.getElementById('deleteBtn');
const $blogForm = document.getElementById('blogForm');
const $newPost = document.getElementById('newPost');

// calls api to update the blog post 
const updateBlog = async (event) => {
    event.preventDefault();

    const title = $title.value.trim();
    const description = $description.value.trim();
    const id = $blogForm.dataset.id;

    if(!title || !description){
        return alert('Please provide title and description');
    }

    try{
        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
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

// calls api to Delete the blog post
const deleteBlog = async (event) => {
    event.preventDefault();

    const id = $blogForm.dataset.id;

    try{
        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
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



$updateBtn.addEventListener('click', updateBlog);
$deleteBtn.addEventListener('click', deleteBlog);
