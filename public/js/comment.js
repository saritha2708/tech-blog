// const $commentForm = document.querySelector('#comment-form');
const $parentDiv = document.querySelector('#parent');

const createComment = async (event) => {
    event.preventDefault();
    let e = event.target;
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

$parentDiv.addEventListener('click', createComment);