let contactInfo = {
  name: "Yunus LULECI",
  phone: "+49 163 9542104",
  email: "info@luleccihome.de",
  website: "https://luleccihome.de",
}
function updateDisplay() {
  document.getElementById("name").textContent = contactInfo.name
  document.getElementById("phone").textContent = contactInfo.phone
  document.getElementById("email").textContent = contactInfo.email
  document.getElementById("website").textContent = contactInfo.website
  generateQRCode()
}

function generateQRCode() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TEL:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:${contactInfo.website}
END:VCARD`

  const qr = qrcode(0, "L")
  qr.addData(vCardData)
  qr.make()

  const qrCodeDiv = document.getElementById("qr-code")
  qrCodeDiv.innerHTML = qr.createImgTag(5) // 5 hücre başına piksel
}

// Sayfa yüklendiğinde
window.addEventListener("load", updateDisplay)

// Service Worker kaydı
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log("ServiceWorker kaydı başarılı:", registration.scope)
      },
      (error) => {
        console.log("ServiceWorker kaydı başarısız:", error)
      }
    )
  })
}
