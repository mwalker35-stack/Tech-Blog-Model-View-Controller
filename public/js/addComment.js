const addCommentHandler = async(event) => {
    event.preventDefault()


const comment_text = document.querySelector('.addComment').value.trim();
const id = document.querySelector('.btn').getAttribute('data-id')

if (comment_text) {
    const response = await fetch(`/router/api/blog/addcomment/${id}`, {
      method: 'POST',
      body: JSON.stringify({comment_text}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response)

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('No comment added');
    }
  }
}

 document .querySelector('.addComment').addEventListener('submit', addCommentHandler)