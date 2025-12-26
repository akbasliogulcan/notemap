import { homeIcon, personIcon } from "./constant.js";
import { getStatus, getNoteIcon } from "./helper.js";
import elements from "./ui.js";


//*global variables
let clickedCoords;
let layer;

//*let notes kısmında daha önce kaydettiğimiz notları tutuyoruz bunlarda JSON formatında olduğu içim
//*geri Json formatına çeviriyoruz.
let notes = JSON.parse(localStorage.getItem('notes')) || [];
if (!Array.isArray(notes)) {
           notes = [];
           localStorage.setItem('notes', JSON.stringify(notes))
};


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
           //*zoom kısmı ilk etapda defaulttan farklı olarak kapatıldı.
           var map = L.map('map', { zoomControl: false }).setView(currentPosition, 11);

           L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                      maxZoom: 19,
                      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           }).addTo(map);

           //*harita zoom
           L.control.zoom({ position: "bottomright" }).addTo(map);

           //*marker oluştur
           L.marker(currentPosition, { icon: homeIcon }).addTo(map).bindPopup(message);


           //*harita üzerine layer katmanı ekle
           layer = L.layerGroup().addTo(map);

           //*harita üzerindeki tıklanma olayı
           map.on("click", onMapClick);

           renderNotes();
           renderMarkers();


};

//*harita üzerindeki tıklanma olaylarını izleyen fonks.
function onMapClick(e) {
           //*global scope kısmında olmasının nedeni koordinatlara her yerden erişilmek istenmesi.
           //*bunu da let ile yazarız.
           clickedCoords = [e.latlng.lat, e.latlng.lng];

           //*aside kısmını ekleme modu
           elements.aside.classList.add("add");

};


//*Cancel Btn Fonks.
elements.cancelBtn.addEventListener('click', () => {
           elements.aside.classList.remove("add");

});

//*form Gönderildiğinde çalışacak fonks.
elements.form.addEventListener('submit', (e) => {
           e.preventDefault();

           //*Form
           const title = e.target[0].value;
           const date = e.target[1].value;
           const status = e.target[2].value;

           //*Note objesi oluştur
           const newNote = {
                      id: new Date().getTime(),
                      title,
                      date,
                      status,
                      coords: clickedCoords,
           };


           //*note objesini notes dizisine ekle
           notes.push(newNote);

           //*LocalStorege Güncelle
           localStorage.setItem('notes', JSON.stringify(notes));

           //*Form reset
           e.target.reset();

           //*Aside kısmını eski haline çevir
           elements.aside.classList.remove('add');

           renderNotes();

           renderMarkers();


});



//*Eklenen notları renderlayan Fonks.
function renderNotes() {
           //*Notes dizisini dönüp her bir note için bir Html oluştur.
           const noteCards = notes.map((note) => {

                      //*Tarih ayarlaması
                      const date = new Date(note.date).toLocaleDateString('tr', {
                                 day: 'numeric',
                                 month: 'long',
                                 year: 'numeric',
                      });



                      return `  <li>
                                            <div>
                                                       <p>${note.title}</p>
                                                       <p>${date}</p>
                                                       <p>${getStatus(note.status)}</p>
                                            </div>
                                            <div class="icons">
                                                       <i class="bi bi-airplane" id="fly-btn"></i>
                                                       <i class="bi bi-trash3-fill" id="delete-btn"></i>
                                            </div>

                                 </li>`}).join("");


           //*Elde edilen Html'i Aside kısmına aktar.
           elements.noteList.innerHTML = noteCards;

};


//*Mevcut notlar için birer marker render eden Fonks.
function renderMarkers() {

           //Haritadaki markerları sıfırla 
           layer.clearLayers();

           //notları dön ve her bir not için bir marker oluştur.
           notes.map((note) => {
                      const icon = getNoteIcon(note.status);


                      //Marker render et.
                      L.marker(note.coords, { icon }).addTo(layer);
           });


};

