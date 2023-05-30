//1
//screen leri değiştirme
//.screen e .up ekleyerek ekranı değiştireceğiz, index.html de 3 tane .screen imiz var her biri 100vh, .up ,se margin-top u -100vh, -200vh şeklinde değiştirerek screen i değiştireceğiz
// 3 tane screen imiz vardı bunlar bir array e atıyoruz
const screens = document.querySelectorAll('.screen')

// screens[0].classList.add('up')

//2
//seçilebilecek 4 böcek var bunlar bir array
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
//başlama butonu
const start_btn = document.getElementById('start-btn')
//oyun alanı
const game_container = document.getElementById('game-container')
//zaman
const timeEl = document.getElementById('time')
//score
const scoreEl = document.getElementById('score')
//hala devam mı mesajı
const message = document.getElementById('message')

//3
//değişkenlerimiz, zaman için, score ve seçilen böcek için
let seconds = 0
let score = 0
let selected_insect = {}
//4
//başlama butonu ile ilk screen e up class ını ekliyoruz böylelikle -100vh oluyor ve yukarı kayıyor
start_btn.addEventListener('click', () => screens[0].classList.add('up'))

//5
//seçilebilecek böcek ekranı geldi, burada 4 böcek var, her bir böcek için img, src ve alt belirleniyor ve bu seçilen böcek için bu bilgiler 3 de boş olarak tanımladığımız nesneye alınıyor ve ekranlar arrayindeki 2. ekrana up ekleniyor bu sefer, ayrıca 1000ms sonra createInsect func çalıştırılıyor, daha sonra startGame() çalıştırılıyor
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

//9
//startGame saati başlatır, increaseTime(){...} çalıştırır
function startGame() {
    setInterval(increaseTime, 1000)
}
//10
//saati hazırlama
function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

//6
//böceği oluşturalım, div, içine insect class ı, konumu için x,y bilgisi lazım bunun için getRandomLocation() çalıştırılacağı söyleniyor (bunu oluşturacağız) x ve y bilgisi top ve left te kullanılacak, sonta innerHTML oluşturuluyor, içinde böceğin açısı random belirleyecek küçük func yazılıyor,
function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    //5. adımda elimizde olan nesneyi kullanıyoruz, inline style a dikkat, böceğin rotate açısını random belirliyoruz
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`
//oluşturulan böceğe tıklayınca catchInsect(){...} çalışsın
    insect.addEventListener('click', catchInsect)
//böceği oyun lanaında oluşturalım
    game_container.appendChild(insect)
}

//7
//böceğin konumunu random belirleyecek func
//ekranın  w ve h si, hangi çerçeve içinde belirlenecek x ve y , bu func bize x ve y yi verecek
function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

//8
//6. adımda oluşturulan böceğe tıkladığımızda neler olacağı,
//increaseScore() çalışacak
//insect'e caught eklenecek
function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    //insct i kaldıracak
    setTimeout(() => this.remove(), 2000)
    //böcek oluşturacak func
    addInsects()
}

//11
//her 1 ve 1.5 s de bir böcek oluşturacak
function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}
//10
//score u arttıracak func ve score belli bir seviyeyi geçince ekrana uyarı gelecek
function increaseScore() {
    score++
    // if(score > 19) {
    //     message.classList.add('visible')
    // }
    scoreEl.innerHTML = `Score: ${score}`
}
