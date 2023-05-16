const $parentDiv = document.querySelector('#parent');

// Calls the api to create a new comment on a blog post
const createComment = async (event) => {
    event.preventDefault();
    let e = event.target; // targets the blog intended to be commented on
    if (e.matches('.commentBtn')) {
        const blog_id = e.getAttribute('data-id');
        const $commentText = document.querySelector(`#comment-text${blog_id}`);
        const description = $commentText.value.trim();
    

        if(!description){
            return alert('Please provide description');
        }

        try{
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ description, blog_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        } catch (err) {
            alert(err);
        }

    }
};

// Event listener for the entire div which contains all the blogs
$parentDiv.addEventListener('click', createComment);