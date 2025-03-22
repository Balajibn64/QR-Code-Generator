import { useState } from "react"

const QrCode = () => {
  const [img,setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState();
  const [qrSize, setQrSize] = useState();

  async function generateQR(){
    setLoading(true);
    setImg("sundarPichai.png");
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
        console.error("Error generating QR Code",error);
        alert("Error generating QR Code");
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img).then((response)=>response.blob())
    .then((blob) => {
      const link =  document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="QRCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
      .catch ((error) => {
        console.error("Error generating QR Code", error);
        alert("Error generating QR Code");
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait....</p>}
      {img && <img src={img} className="qr-image" alt="" />}
      <div>
        <label htmlFor="dataInput" className="input-label">Data for QR Code :</label>
        <input type="text" value={qrData} onChange={(e) => setQrData(e.target.value)} id="dataInput" placeholder="Enter Data for QR Code" />
        <label htmlFor="sizeInput" className="input-label">Image size (e.g., 150):</label>
        <input type="text" value={qrSize} onChange={(e) => setQrSize(e.target.value)} id="sizeInput" placeholder="Enter the Image Size" />
        <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download-buttom" onClick={downloadQR}>Download QR Code</button>
      </div>
    </div>
  )
}

export default QrCode