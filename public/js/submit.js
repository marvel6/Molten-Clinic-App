const Submitbtn = document.getElementById('submitbtn')
const clinicValue = document.getElementById('clincId')
const locationValue = document.getElementById('location')




Submitbtn.addEventListener('submit', async (e) => {
    e.preventDefault()


    const formBody = {
        Address: location.value,
        location: location.value
    }

    try {
        const contents = await fetch('/api/v1/auth/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formBody)
        })

        if (contents.status === 400) {
            throw Error('Store already exists')
        }

        alert('Store Added Successfully!')

        window.location.href = "/index.html"



    } catch (error) {
        alert(error)
    }
});



