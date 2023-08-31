import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyGetHeaders } from "https://c-craftjs.github.io/api/api.js";
import { CihuyQuerySelector } from "https://c-craftjs.github.io/element/element.js";
import { CihuyRole } from "https://c-craftjs.github.io/link/link.js";

const masukbutton = CihuyQuerySelector(".masukButton");

masukbutton.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const token = CihuyGetCookie("login");

    const apiUrlAdmin = "https://simbe-dev.ulbi.ac.id/api/v1/admins/";
    const apiUrlFakultas = "https://simbe-dev.ulbi.ac.id/api/v1/fakultas/";
    const apiUrlAuditor = "https://simbe-dev.ulbi.ac.id/api/v1/auditor/";
    const apiUrlProdi = "https://simbe-dev.ulbi.ac.id/api/v1/prodi/";

    try {
      const resultAuditor = await CihuyGetHeaders(apiUrlAuditor, token);
      const resultFakultas = await CihuyGetHeaders(apiUrlFakultas, token);
      const resultAdmin = await CihuyGetHeaders(apiUrlAdmin, token);
      const resultProdi = await CihuyGetHeaders(apiUrlProdi, token);

      const userData = {
        auditor: JSON.parse(resultAuditor).data,
        fakultas: JSON.parse(resultFakultas).data,
        admin: JSON.parse(resultAdmin).data,
        prodi: JSON.parse(resultProdi).data,
      };

      const clickedUserRole = button.getAttribute("data-role"); // Ambil peran dari tombol

      const userRole = determineUserRole(userData, clickedUserRole);

      if (userRole) {
        redirectToDashboard(userRole);
      } else {
        console.log("Role tidak cocok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

function determineUserRole(userData, clickedUserRole) {
  switch (clickedUserRole) {
    case "auditor":
      return "auditor";
    case "fakultas":
      return "fakultas";
    case "admin":
      return "admin";
    case "prodi":
      return "prodi";
    default:
      return null;
  }
}

console.log(CihuyGetHeaders);

CihuyGetHeaders(apiUrl, token)
  .then((result) => {
    const userRole = JSON.parse(result).role;
    CihuyRole(userRole);
  })
  .catch((error) => console.error("Error:", error));
