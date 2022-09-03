const search = document.querySelector('.search')
const selectRegion = document.querySelector('.selectRegion')
const form = document.querySelector('form')


const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()
    renderData(data)
}

fetchData()

const renderData = (data) => {
    const html = data.map((country) => {
        return `
        <div class="country">
            <div class="flag">
                <img src="${country.flags.png}" alt="${country.name.common}">
            </div>
            <div class="country-info">
                <h3 class="country-name">${country.name.common}</h3>
                <p><span class="country-label">Population:</span> ${Number(country.population).toLocaleString('en')}</p>
                <p><span class="country-label">Region:</span> ${country.region}</p>
                <p><span class="country-label">Capital:</span> ${country.capital}</p>
            </div>
        </div>
        `
    }).join('')
    
    document.querySelector('.content').innerHTML = html


    //when user click on a country, open a modal with more info
    const countries = document.querySelectorAll('.country')
    countries.forEach((country) => {
        country.addEventListener('click', () => {
            const countryName = country.querySelector('.country-name').textContent
            const countryInfo = data.filter((country) => country.name.common === countryName)
            const modal = document.querySelector('.modal')
            const modalHtml = countryInfo.map((country) => {
                return `
                <div class="modal-content">
                <button class="remove">< back</button>
                    <div class="modal-header">
                        <img src="${country.flags.png}" alt="${country.name.common}">
                        <h2>${country.name.common}</h2>
                    </div>
                    <div class="modal-body">
                        <div class="modal-info">
                            <p><span class="country-label">Population:</span> ${Number(country.population).toLocaleString('en')}</p>
                            <p><span class="country-label">Region:</span> ${country.region}</p>
                            <p><span class="country-label">Sub Region:</span> ${country.subregion}</p>
                            <p><span class="country-label">Capital:</span> ${country.capital}</p>
                            <p><span class="country-label">Top Level Domain:</span> ${country.tld}</p>
                        </div>
                    </div>
                </div>
                `
            }).join('')
            modal.innerHTML = modalHtml
            modal.classList.add('show-modal')
            
            //close modal
            const remove = document.querySelector('.remove')
            remove.addEventListener('click', () => {
                modal.classList.remove('show-modal')
            })
        })
    })
    
}

//search function

const searchCountry = (e) => {
    const countries = document.querySelectorAll('.country')
    countries.forEach((country) => {
        if (country.querySelector('.country-name').innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
            country.style.display = 'block'
        } else {
            country.style.display = 'none'
        }
    })
}

search.addEventListener('input', searchCountry)

//filter by region

const filterRegion = (e) => {
    const countries = document.querySelectorAll('.country')
    countries.forEach((country) => {
        if (country.querySelector('.country-info p:nth-of-type(2)').innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
            country.style.display = 'block'
        } else {
            country.style.display = 'none'
        }
    })
}

selectRegion.addEventListener('change', filterRegion)


