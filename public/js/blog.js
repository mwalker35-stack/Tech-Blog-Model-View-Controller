const formHandler = async(event) => {
    event.preventDefault()

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();


    if (title && content) {
        const response = await fetch(`/api/blog`,{
            body:JSON.stringify({title,content}),
            method:'POST',
            headers:{
                'content-type': 'application/json'
            }
        })
        console.log(response)
        if (response.status ===200){
            console.log("success")
            document.location.replace('/createblog')
        } else {
            alert('error while adding a blog')
        }
    }
}


if (document.querySelector('.new-post-form')) {
    document
        .querySelector('.new-post-form')
        .addEventListener('submit', newFormHandler);
  }
  
  if (document.querySelector('.post-list')) {
    document
        .querySelector('.post-list')
        .addEventListener('click', delButtonHandler);
  }
document.getElementById('submitbtn').addEventListener('click',formHandler)