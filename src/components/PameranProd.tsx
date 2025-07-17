import { produkList } from './../data/productList'

const container = document.getElementById('carouselList')!

produkList.forEach((produk) => {
  container.innerHTML += `
    <div class="item">
      <img src="${produk.gambar}" alt="${produk.nama}">
      <div class="introduce">
        <div class="title">${produk.judul}</div>
        <div class="topic">${produk.nama}</div>
        <div class="des">
          ${produk.deskripsiSingkat}
        </div>
        <button class="seeMore">SEE MORE &#8599;</button>
      </div>

      <div class="detail">
        <div class="title">${produk.judulDetail}</div>
        <div class="des">
          ${produk.deskripsiLengkap}
        </div>
        <div class="specifications">
          <div><p>Used Time</p><p>${produk.spesifikasi.usedTime}</p></div>
          <div><p>Charging port</p><p>${produk.spesifikasi.chargingPort}</p></div>
          <div><p>Compatible</p><p>${produk.spesifikasi.compatible}</p></div>
          <div><p>Bluetooth</p><p>${produk.spesifikasi.bluetooth}</p></div>
          <div><p>Controlled</p><p>${produk.spesifikasi.control}</p></div>
        </div>
        <div class="checkout">
          <button>ADD TO CART</button>
          <button>CHECKOUT</button>
        </div>
      </div>
    </div>
  `
})
