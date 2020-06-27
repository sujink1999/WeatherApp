console.log('This is from app.js')

const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')


searchForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    m1.textContent = 'Loading...'
    m2.textContent = ''

    const location = searchInput.value
    fetch('http://localhost:3000/weather?address='+location).then((data)=>{
    data.json().then((res)=>{
        if(res.error){
            m1.textContent = res.error
            m2.textContent = ''
        }else{
            m1.textContent = 'Title: '+res.title
            m2.textContent = 'Location: '+res.location
        }
        
    })
})
})