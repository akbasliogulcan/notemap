import { homeIcon, personIcon } from "./constant.js";



//*konum belirleme kullanıcıdan izin alarak
window.navigator.geolocation.getCurrentPosition(
           (e) => {

                      //* kullanıcı konumu kabul ederse kendi konumu çıkar.
                      loadMap([e.coords.latitude, e.coords.longitude], "Mevcut konum");
           },
           (e) => {
                      //*eğer ki kullanıcını konumu redderse çıkacak olan konum
                      loadMap([39.924655, 32.836576], "Varsayılan konum");
           }

);

//*Map oluşturan Fonks.  buradaki currentposition yukarıkida window içindeki e den gelir.
function loadMap(currentPosition, message) {
           var map = L.map('map').setView(currentPosition, 11);

           L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                      maxZoom: 19,
                      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           }).addTo(map);

           //*marker oluştur
           L.marker(currentPosition, { icon: homeIcon }).addTo(map).bindPopup(message);

           //*harita üzerindeki tıklanma olaylarını izleyen fonks.

           map.on("click", onMapClick);
};

//*harita üzerindeki tıklanma olaylarını izleyen fonks.
function onMapClick(e) {
           const clickedCoords = [e.latlng.lat, e.latlng.lng];
           console.log(clickedCoords);
};


