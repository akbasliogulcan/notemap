import { personIcon } from "./constant.js";



//*konum belirleme kullanıcıdan izin alarak
window.navigator.geolocation.getCurrentPosition(
           (e) => {

                      //* kullanıcı konumu kabul ederse kendi konumu çıkar.
                      loadMap([e.coords.latitude, e.coords.longitude]);
           },
           (e) => {
                      //*eğer ki kullanıcını konumu redderse çıkacak olan konum
                      loadMap([39.924655, 32.836576]);
           }

);






//*Map oluşturan Fonks.  buradaki currentposition yukarıkida window içindeki e den gelir.
function loadMap(currentPosition) {



           var map = L.map('map').setView(currentPosition, 13);

           L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                      maxZoom: 19,
                      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           }).addTo(map);

           //*marker oluştur
           L.marker(currentPosition, { icon: personIcon }).addTo(map);


}


