const updateBtnHandler = async (event) => {
    let title = document.querySelector('.blog-title').value
    let post = document.querySelector('.blog-content').value
    if(event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id')

      const response = await fetch(`/api/blog/${id}`,{
        method:'PUT',
        body: JSON.stringify({
          title,
          blog
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok){
        document.location.replace('/')
      } else {
        alert(response.statusText)
      }
    }
  }

  document.querySelector('.update-blog').addEventListener('click', updateBtnHandler)