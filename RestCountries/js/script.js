const card=document.querySelector('.card-content')
    inputFiltro=document.getElementById('inputFiltro'),
    region=document.querySelectorAll('.region')

document.addEventListener('DOMContentLoaded', e=>{
    countries()
})
const countries = async ()=>{
    try {
        let respuesta = await fetch('https://restcountries.com/v3.1/all');
        let data = await respuesta.json();
        if(!respuesta.ok){throw {status: respuesta.status, statusText: respuesta.statusText}} 

        showFlag(data)
        filtrarPaises(data)
        filtrarRegion(data)
        } catch (err) {
            let msg = `Error ${err.status}, ${err.statusText}`
            card.innerHTML = `
            <figure>
                <p style='background:#ff0033; color:white;font-size:1.5rem'>${msg}</p>
            </figure>
            `
        }     
    }

//Mostrar TODOS los paises en pantalla

const showFlag = data=>{
    let elem = ''
    data.forEach((el)=>{
        elem += `
        <figure>
            <img loading="lazy" src="${el.flags.svg}" alt="">
            <figcaption>
            <p><b>Pais:</b> ${el.name.common}</p>
            <p><b>Capital:</b> ${el.capital}</p>
            <p><b>Region:</b> ${el.region}</p>
            <p><b>Poblacion:</b> ${el.population.toLocaleString()}</p>
            </figcaption>
        </figure>
      `
    })
    card.innerHTML = elem
}

//Filtro de paises en input

const filtrarPaises = data =>{

    inputFiltro.addEventListener('keyup', e=>{
        e.preventDefault()

        const textoInput = inputFiltro.value.toLowerCase()

        const paisFiltrado = data.filter(item=>{
            let textoApi = item.name.common.toLowerCase()

            if(textoApi.indexOf(textoInput) !== -1){
                return item
            }
        })
        showFlag(paisFiltrado)
    })
}

//Filtro de paises por REGION y Active NAVLinks

const filtrarRegion = data =>{
    region.forEach(reg=>{
        reg.addEventListener('click',(e) =>{
            region.forEach(link=>{
                link.classList.remove('active')
            })
            reg.classList.add('active')

            //Filtrar por region
            if(e.target.getAttribute('data-filter') == 'Todo') showFlag(data)
            else{
                let regionFiltradas = data.filter(item=> item.region === e.target.getAttribute('data-filter'))
                showFlag(regionFiltradas)
            }
        })
    })
}