import { personIcon, homeIcon, jobIcon, goToIcon, parkIcon } from "./constant.js";

// Note içerisindeki status değerini istenilen formata dönüştüren fonksiyon
const getStatus = (status) => {
           switch (status) {
                      case "goto":
                                 return "Ziyaret";

                      case "park":
                                 return "Park";

                      case "home":
                                 return "Ev";

                      case "job":
                                 return "İş";

                      default:
                                 return "Tanımsız Durum";
           }
};


//Note'un Statüsüne göre renderlanacak iconu seçen fonks.
const getNoteIcon = (status) => {

           switch (status) {
                      case "goto":
                                 return goToIcon;

                      case "park":
                                 return parkIcon;

                      case "home":
                                 return homeIcon;

                      case "job":
                                 return jobIcon;

                      default:
                                 return personIcon;
           }

};

export { getStatus, getNoteIcon };