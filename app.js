let temp = 1000;

const getAllCategorys = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json()
    showAllCategorys(data.data);
}


const showAllCategorys = (data) => {
    const AllCategorys = document.getElementById('All-categorys')
    AllCategorys.innerHTML = " "
    data.forEach(item => {
        const btn = document.createElement('button')
        btn.classList.add("btn")
        btn.classList.add("text-[#252525b3]")
        btn.id ='categoryBtn'
        btn.innerHTML = `${item.category}`
        btn.addEventListener('click', () => {
            temp = item.category_id;
            CategorysItems(item.category_id)
        })
        AllCategorys.appendChild(btn)
    });
}


const CategorysItems = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json() 
    const allItemsContainer = document.getElementById('all-items-container')
    allItemsContainer.innerHTML = ""

    if(data.data.length === 0) {
        const div = document.createElement('div')
        allItemsContainer.classList.replace('grid', 'blobk')
        div.innerHTML = `
                  <div clfeass="mt-10">
                        <img class="mx-auto" src="images/Icon.png" alt="Shoes" />
                        <h1 class="text-center mt-6 font-semibold text-4xl">Oops!! Sorry, There is no <br> content here</h1>
                  </div>
        `
        allItemsContainer.appendChild(div)
    }else {
        allItemsContainer.classList.add('grid')
    }

    data.data.forEach((item) => {
        function secondsToHms(d) {
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
        
            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : "hrs, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : "min") : "";
            return hDisplay + mDisplay 
        }

        const div = document.createElement('div')
        div.innerHTML = `
            <div class="relative">
                <figure><img class="rounded-md w-full h-48" src=${item.thumbnail} alt="Shoes" /></figure>
                    <div>
                    <div class="flex mt-4 items-center gap-2">
                        <div><img class="w-12 h-12 rounded-full object-cover" src=${item.authors[0].profile_picture} alt="Shoes" /></div>
                        <div><h3 class="text-xl font-semibold">${item.title}</h3></div>
                    </div>
                    <div class="flex mt-2 ml-6">
                        <h2 class="text-[#171717b3] mr-2">${item.authors[0].profile_name}</h2>
                        <img src="${item.authors[0].verified ? 'fi_10629607.svg' : ""}" /> 
                    </div>
                    <span class="text-[#171717b3] mt-3 text-sm font-medium">${item.others.views}</span>
                </div>
                ${item.others.posted_date ? `<span class="absolute bg-[#171717] text-white text-sm p-2 rounded-md font-medium right-2 bottom-32">${secondsToHms(item.others.posted_date)}</span>` : " "}
            </div>
        `
        allItemsContainer.appendChild(div)
    })
}



const handleSort = async () => {
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${temp}`)
        const data = await res.json() 

        const sortData = data.data.sort((a, b) => {
            return parseInt(a.others.views) - parseInt(b.others.views);
        });
        const rurrentData = sortData.reverse()
        console.log(rurrentData);        

        const allItemsContainer = document.getElementById('all-items-container')
        allItemsContainer.innerHTML = ""

        function secondsToHms(d) {
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
        
            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : "hrs, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : "min") : "";
            return hDisplay + mDisplay 
        }

        rurrentData.forEach((item) => {
            const div = document.createElement('div')
            div.innerHTML = `
                <div class="relative">
                    <figure><img class="rounded-md w-full h-48" src=${item.thumbnail} alt="Shoes" /></figure>
                        <div>
                        <div class="flex mt-4 items-center gap-2">
                            <div><img class="w-12 h-12 rounded-full object-cover" src=${item.authors[0].profile_picture} alt="Shoes" /></div>
                            <div><h3 class="text-xl font-semibold">${item.title}</h3></div>
                        </div>
                        <div class="flex mt-2 ml-6">
                            <h2 class="text-[#171717b3] mr-2">${item.authors[0].profile_name}</h2>
                            <img src="${item.authors[0].verified ? 'fi_10629607.svg' : ""}" /> 
                        </div>
                        <span class="text-[#171717b3] mt-3 text-sm font-medium">${item.others.views}</span>
                    </div>
                    <span class="absolute bg-[#171717] text-white text-sm p-2 rounded-md font-medium right-2 bottom-32">${secondsToHms(item.others.posted_date)}</span>
                </div>
            `
            allItemsContainer.appendChild(div)
        })
}


getAllCategorys(handleSort)
CategorysItems(1000)