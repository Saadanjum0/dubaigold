"use client"

import React, { useState, useRef, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { X } from "lucide-react"
import { supabase } from "../api/supabaseClient"

const Verifygold = () => {
  const [serialNumber, setSerialNumber] = useState("")
  const [showCertificate, setShowCertificate] = useState(false)
  const [metalData, setMetalData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showCertificate ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [showCertificate])

  // Generate random metal data
  const generateRandomMetalData = () => {
    const metalTypes = ["GOLD", "SILVER", "PLATINUM"]
    const weightTypes = ["gm", "oz", "kg"]
    const weights = ["10", "20", "50", "100", "250", "500", "1000"]
    const purities = ["99.9%", "99.5%", "24K", "22K", "18K", "999", "925"]
    
    const randomSerialNumber = Math.random().toString(36).substring(2, 15).toUpperCase()
    
    return {
      metal_type: metalTypes[Math.floor(Math.random() * metalTypes.length)],
      weight: weights[Math.floor(Math.random() * weights.length)],
      weight_type: weightTypes[Math.floor(Math.random() * weightTypes.length)],
      fine_weight: purities[Math.floor(Math.random() * purities.length)],
      serial_number: randomSerialNumber
    }
  }

  const fetchMetalData = async () => {
    setLoading(true)
    setError("")
    
    // If no serial number is entered, generate random data
    if (!serialNumber.trim()) {
      setTimeout(() => {
        const randomData = generateRandomMetalData()
        setMetalData(randomData)
        setShowCertificate(true)
        setLoading(false)
      }, 1000) // Add a small delay to simulate loading
      return
    }

    try {
      const { data, error } = await supabase
        .from('metals')
        .select('*')
        .eq('serial_number', serialNumber.trim())
        .single();
      
      if (error) {
        throw error;
      }
      
      setMetalData(data);
      setShowCertificate(true);
    } catch (err) {
      console.error("Error fetching metal:", err);
      setError("Serial number not found");
      setMetalData(null);
      setShowCertificate(false);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMetalData()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit(e)
  }

  const handleButtonClick = () => fetchMetalData()
  const handleCloseModal = () => setShowCertificate(false)

  return (
    <main className="min-h-screen relative">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Images/burj.webp')`, // Replace with your image path
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-transparent bg-opacity-40"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 p-8 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full flex flex-col items-center">
          <h1 className="md:text-6xl text-4xl font-bold text-white mb-8 md:mb-12 text-center">
           Verification 
          </h1>

          <div className="space-y-6 w-full max-w-sm bg-transparent bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="space-y-2 flex flex-col items-center">
              <label htmlFor="item-serial" className="text-sm font-medium text-black text-center">
                Item serial number
              </label>
              <input
                id="item-serial"
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter serial number"
                className="w-full max-w-sm border-gray-300 h-9 px-3 border border-input rounded-md focus:outline-none focus:ring-0 focus:ring-ring focus:border-yellow-300"
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={handleButtonClick}
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-600 text-sm px-5 py-2 rounded-md transition-colors duration-200"
              >
                {loading ? "Loading..." : "VIEW CERTIFICATE"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && metalData && (
        <>
          <div
            className="fixed inset-0 bg-gradient-to-br from-gray-800 via-gray-800 to-black opacity-80 z-40"
            onClick={handleCloseModal}
          ></div>

          <button
            onClick={handleCloseModal}
            className="fixed p-1 border-2 border-white top-4 right-8 z-50 bg-black text-white rounded-sm flex font-bold"
          >
            <X size={30} />
          </button>

          <div className="fixed inset-0 z-45">
            <div className="bg-white w-full h-full relative overflow-y-auto">
              <CertificatePopup metalData={metalData} />
            </div>
          </div>
        </>
      )}

      {/* Logo - Absolute Bottom Right (only in this section) */}
      <div className="absolute bottom-5 right-5 z-30">
        <div className="w-25 h-25  text-white flex items-center justify-center ">
          <img src="/Images/stamp.webp"  />
        </div>
      </div>
    </main>
  )
}

const CertificatePopup = ({ metalData }) => {
  const certificateRef = useRef(null)
  const websiteUrl = "https://dubaigold-barmaker.netlify.app/"

  const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = reject
      img.src = url
    })
  }

  const downloadCertificate = async () => {
    try {
      // Convert both logos to base64
      const logoBase64 = await convertImageToBase64('/Images/newlogo.webp')
      const regBase64 = await convertImageToBase64('/Images/reg.webp')
      
      const printWindow = window.open("", "_blank")
      const qrSvg = certificateRef.current.querySelector("svg")
      const svgData = new XMLSerializer().serializeToString(qrSvg)

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate ${metalData.serial_number}</title>
          <style>
            * { margin:0; padding:0; box-sizing:border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background:white; color:#1f2937; line-height:1.5; }
            @media print { .no-print{ display:none !important;} }
            .certificate-container { max-width:672px; margin:0 auto; padding:32px; background:white; }
            .header { text-align:center; margin-bottom:32px; }
            .header-flex { display: flex; align-items: center; justify-content: center; margin-bottom: 16px; position: relative; }
            .logo { width: 80px; height: 80px; margin-right: 16px; object-fit: contain; }
            .reg-logo { position: absolute; right: -15px; top: 0; width: 16px; height: 16px; object-fit: contain; }
            .title-container { position: relative; }
            .company-title { font-size:2rem; font-weight:bold; color:#DB9500; margin:0; }
            .company-subtitle { font-size:1.2rem; color:#4b5563; margin-top: 8px; }
            .certificate-title { text-align:center; margin-bottom:32px; font-size:1.875rem; font-weight:600; color:#1f2937; }
            .details-section { margin-bottom:32px; }
            .detail-row { display:flex; justify-content:space-between; align-items:center; padding:16px 0; font-size:1.125rem; border-bottom:1px solid #e5e7eb; }
            .detail-row:last-child { border-bottom:none; }
            .detail-label { font-weight:600; color:#1f2937; }
            .detail-value { color:#374151; text-transform:uppercase; }
            .detail-value.normal-case { text-transform:none; }
            .qr-section { display:flex; align-items:flex-end; justify-content:flex-start; margin-bottom:24px; }
            .footer { margin-top: 32px; font-size: 0.875rem; color: #6b7280; text-align: center; }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="header">
              <div class="header-flex">
                <img src="${logoBase64}" class="logo" alt="Dubai GoldBarMaker Logo" />
                <div class="title-container">
                  <div class="company-title">DUBAI Gold/Silver-BarMaker</div>
                  <img src="${regBase64}" class="reg-logo" alt="Registered" />
                </div>
              </div>
              <div class="company-subtitle">Made in Pakistan</div>
            </div>

            <div class="certificate-title">Certificate</div>

            <div class="details-section">
              <div class="detail-row"><span class="detail-label">Metal Type</span><span class="detail-value">${metalData.metal_type}</span></div>
              <div class="detail-row"><span class="detail-label">Weight</span><span class="detail-value normal-case">${metalData.weight} ${metalData.weight_type}</span></div>
              <div class="detail-row"><span class="detail-label">Fineness/Purity</span><span class="detail-value normal-case">${metalData.fine_weight}</span></div>
              <div class="detail-row"><span class="detail-label">Serial Number</span><span class="detail-value normal-case">${metalData.serial_number}</span></div>
            </div>

            <div class="qr-section">${svgData}</div>

            <div class="footer">
              <p>This product ${metalData.serial_number} and its certificate are not challengeable in any court of law.</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() { window.close(); }
              }, 1000);
            }
          </script>
        </body>
        </html>
      `)

      printWindow.document.close()
    } catch (error) {
      console.error('Error downloading certificate:', error)
      alert('Error downloading certificate. Please try again.')
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 text-right">
        <button
          onClick={downloadCertificate}
          className="bg-[#F0B100] hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Download Certificate
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div ref={certificateRef} className="bg-white p-8 max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/Images/newlogo.webp"
                className="w-20 h-20 object-contain mr-4"
                alt="Dubai GoldBarMaker Logo"
              />
              <div>

   <div className=" ml-80 md:ml-120 h-3 w-3 md:w-4 md:h-4">
 <img src="/Images/reg.webp"/>
                
              </div>

              <div className="text-2xl md:text-4xl font-bold text-[#DB9500]">DUBAI Gold/Silver-BarMaker</div>
              </div>
            </div>
            <div className="text-sm md:text-lg text-gray-600">Made in Pakistan</div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-8 text-3xl font-semibold text-gray-800">Certificate</div>

          {/* Certificate Details */}
          <div className="space-y-0 mb-8 text-lg">
            <div className="flex justify-between border-b border-gray-200 py-4">
              <span className="font-semibold text-gray-800">Metal Type</span>
              <span className="text-gray-700 uppercase">{metalData.metal_type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-4">
              <span className="font-semibold text-gray-800">Weight</span>
              <span className="text-gray-700">{metalData.weight} {metalData.weight_type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-4">
              <span className="font-semibold text-gray-800">Fineness/Purity</span>
              <span className="text-gray-700">{metalData.fine_weight}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="font-semibold text-gray-800">Serial Number</span>
              <span className="text-gray-700">{metalData.serial_number}</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex items-end justify-start mb-6">
            <QRCodeSVG value={websiteUrl} size={120} level="M" includeMargin={false} />
          </div>

          {/* Footer */}
          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>This product {metalData.serial_number} and its certificate are not challengeable in any court of law.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verifygold