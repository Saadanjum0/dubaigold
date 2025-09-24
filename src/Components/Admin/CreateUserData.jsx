import { supabase } from "../../api/supabaseClient";

"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Download, Printer, X } from "lucide-react"
import QRCode from "react-qr-code"
import { toast } from "react-toastify";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    barNumber: "",
    accountType: "Kg",
    firstName: "",
    lastName: "",
    metalType: "GOLD",
    serialNumber: "",
    origin: "Lahore",
    productionDate: "",
    username: "",
  })
  
  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)

  const initialFormData = {
    barNumber: "",
    accountType: "Kg",
    firstName: "",
    lastName: "",
    metalType: "GOLD",
    serialNumber: "",
    origin: "Lahore",
    productionDate: "",
    username: "",
  }

  // Major Pakistani cities for dropdown
  const pakistaniCities = [
    "Lahore",
    "Karachi", 
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Bahawalpur",
    "Sargodha",
    "Sukkur",
    "Larkana",
    "Sheikhupura",
    "Jhang",
    "Gujrat",
    "Mardan",
    "Kasur"
  ]

  // Scroll lock when popup is open
  useEffect(() => {
    if (showCertificate) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showCertificate])

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({}) // Clear errors when resetting
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}) 
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('metals')
        .insert([
          {
            serial_number: formData.serialNumber,
            origin: formData.origin,
            production_date: formData.productionDate,
            weight_type: formData.accountType,
            weight: parseFloat(formData.firstName) || 0,
            fine_weight: parseFloat(formData.lastName) || 0,
            metal_type: formData.metalType,
            username: formData.username,
            created_by: user?.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Update with API response
      setFormData({
        barNumber: data?.id || formData.barNumber,
        accountType: data?.weight_type || formData.accountType,
        firstName: data?.weight?.toString() || formData.firstName,
        lastName: data?.fine_weight?.toString() || formData.lastName,
        metalType: data?.metal_type || formData.metalType,
        serialNumber: data?.serial_number || formData.serialNumber,
        origin: data?.origin || formData.origin,
        productionDate: data?.production_date || formData.productionDate,
        username: data?.username || formData.username,
      });

      setShowCertificate(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      toast.success("Metal record created successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to store data!")
      console.error(error)
    }
  }

  const handleNumberChange = (field, value) => {
    if (value === "" || Number.parseFloat(value) >= 0) {
      setFormData({ ...formData, [field]: value })
    }
  }

  // Print Function - Exact same design
  const handlePrint = () => {
    try {
      const printContent = document.getElementById("certificate-content")
      if (!printContent) {
        toast.error("Certificate content not found!");
        return;
      }

      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        toast.error("Popup blocked! Please allow popups for this site.");
        return;
      }

      // Get all styles from current page
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n')
          } catch (e) {
            return ''
          }
        })
        .join('\n')

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Certificate</title>
            <meta charset="utf-8">
            <style>
              ${styles}
              
              /* Additional print specific styles */
              * { box-sizing: border-box; }
              body { 
                font-family: Arial, sans-serif !important;
                margin: 0 !important;
                padding: 20px !important;
                background: white !important;
                width: 800px !important;
              }
              
              #certificate-content {
                width: 800px !important;
                height: 500px !important;
                background: white !important;
                padding: 24px !important;
                position: relative !important;
              }
              
              table {
                border-collapse: collapse !important;
                width: 100% !important;
                border: 2px solid black !important;
                margin-bottom: 24px !important;
              }
              
              th, td {
                border: 1px solid black !important;
                padding: 12px !important;
                text-align: center !important;
                font-size: 14px !important;
              }
              
              th {
                background: white !important;
                font-weight: bold !important;
              }
              
              .text-yellow-600 {
                color: #d97706 !important;
              }
              
              .text-gray-800 {
                color: #1f2937 !important;
              }
              
              @media print {
                body { 
                  margin: 0 !important; 
                  padding: 10px !important;
                  width: 800px !important;
                }
                
                #certificate-content {
                  width: 800px !important;
                  height: 500px !important;
                }
                
                @page {
                  size: A4 landscape;
                  margin: 0.5in;
                }
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                  setTimeout(function() {
                    window.close();
                  }, 100);
                }, 500);
              }
            </script>
          </body>
        </html>
      `)
      
      printWindow.document.close()
      
    } catch (error) {
      console.error("Print error:", error)
      toast.error("Failed to print certificate!")
    }
  }

  // Download with same design as print
  const handleDownload = async () => {
    try {
      const printContent = document.getElementById("certificate-content")
      if (!printContent) {
        toast.error("Certificate content not found!");
        return;
      }


      // Import html2canvas dynamically
      const html2canvas = (await import('html2canvas')).default;
      
      // Create a clone for processing
      const clonedElement = printContent.cloneNode(true);
      clonedElement.style.width = "800px";
      clonedElement.style.height = "500px";
      clonedElement.style.padding = "24px";
      clonedElement.style.fontFamily = "Arial, sans-serif";
      clonedElement.style.backgroundColor = "#ffffff";
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.top = "0";
      
      document.body.appendChild(clonedElement);

      // Generate canvas with exact same styling as print
      const canvas = await html2canvas(clonedElement, {
        width: 800,
        height: 500,
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: false,
        logging: false,
        onclone: (clonedDoc) => {
          // Apply the same styles as print
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * { box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            
            #certificate-content {
              width: 800px !important;
              height: 500px !important;
              background: white !important;
              padding: 24px !important;
              position: relative !important;
              font-family: Arial, sans-serif !important;
            }
            
            table {
              border-collapse: collapse !important;
              width: 100% !important;
              border: 2px solid black !important;
              margin-bottom: 24px !important;
            }
            
            th, td {
              border: 1px solid black !important;
              padding: 12px !important;
              text-align: center !important;
              font-size: 14px !important;
            }
            
            th {
              background: white !important;
              font-weight: bold !important;
            }
            
            .text-yellow-600 {
              color: #d97706 !important;
            }
            
            .text-gray-800 {
              color: #1f2937 !important;
            }

            .text-2xl {
              font-size: 1.5rem !important;
            }

            .text-lg {
              font-size: 1.125rem !important;
            }

            .font-bold {
              font-weight: bold !important;
            }

            .mb-10 {
              margin-bottom: 2.5rem !important;
            }

            .mb-3 {
              margin-bottom: 0.75rem !important;
            }

            .ml-3 {
              margin-left: 0.75rem !important;
            }

            .flex {
              display: flex !important;
            }

            .items-center {
              align-items: center !important;
            }

            .justify-between {
              justify-content: space-between !important;
            }

            .text-right {
              text-align: right !important;
            }

            .w-20 {
              width: 5rem !important;
            }

            .h-20 {
              height: 5rem !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Remove cloned element
      document.body.removeChild(clonedElement);

      // Convert to WebP and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        const serialNum = formData.serialNumber || 'certificate';
        
        link.download = `${serialNum}-${timestamp}.webp`;
        link.href = url;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        toast.dismiss("download");
        toast.success('Certificate downloaded with same design as print!');
        
      }, 'image/webp', 0.9);

    } catch (error) {
      console.error('Download error:', error);
      toast.dismiss("download");
      toast.error('Failed to download certificate!');
    }
  }

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-in">
          <CheckCircle className="h-5 w-5" />
          <span>Certificate generated successfully!</span>
        </div>
      )}

      {showCertificate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-3 z-10">
              <button
                onClick={handleDownload}
                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                title="Download Same as Print Design"
              >
                <Download className="w-5 h-5 text-blue-600" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                title="Print Certificate"
              >
                <Printer className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  setShowCertificate(false);
                  handleReset();
                }}
                className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>

            <div className="p-8 flex justify-center">
              <div
                id="certificate-content"
                className="bg-white relative border-0"
                style={{ 
                  width: "800px", 
                  height: "500px",
                  padding: "24px",
                  fontFamily: "Arial, sans-serif"
                }}
              >
                {/* Header with logo and title */}
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center">
                    <img 
                      className="w-30 h-30 object-contain" 
                      src="/Images/newlogo.webp" 
                      alt="Company Logo"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <div className="">
                      <div>
                        <div className="w-5 h-5 " >

<img className="ml-102"  src="/Images/reg.webp"/>
                        </div>
                      <div className="text-yellow-600 font-bold text-3xl leading-tight tracking-wide">
                        Dubai Gold-Silver Bar Maker
                      </div>
                        </div>
                      <div
                        className="text-xl leading-tight text-gray-800 mt-1"
                        style={{ fontFamily: "Arial", direction: "rtl" }}
                      >
                        دبئی گولڈ سلور بار میکر
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-3">
                      <QRCode
                        value={`https://dubaigoldsilver.com}`}
                        size={80}
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                    <div className="text-sm font-medium">
                      Date: {formData.productionDate || new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <table className="w-full border-collapse border-2 border-black text-sm mb-6">
                  <thead>
                    <tr>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                        Serial Number
                        <br />
                        <span className="text-xs font-normal">نمبر بار</span>
                      </th>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                        Weight
                        <br />
                        <span className="text-xs font-normal">وزن</span>
                      </th>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                      Purity
                        <br />
                        <span className="text-xs font-normal">خالص </span>
                      </th>
                      <th className="border border-black p-3 bg-white text-center font-bold">
                        Type
                        <br />
                        <span className="text-xs font-normal">قسم</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black p-4 text-center font-medium">
                        {formData.serialNumber || "N/A"}
                      </td>
                      <td className="border border-black p-4 text-center font-medium">
                        {formData.firstName ? `${formData.firstName} ${formData.accountType}` : "N/A"}
                      </td>
                      <td className="border border-black p-4 text-center font-medium">
                        {formData.lastName || "N/A"}
                      </td>
                      <td className="border border-black p-4 text-center font-medium">
                        {formData.metalType}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-sm leading-relaxed text-gray-800">
                  <div className="font-medium">www.Dubaigoldsilver.com</div>
                  <div className="font-medium">
                    Cell: +92 316 4646715 | Email: dubaigoldsilverbarmakers@gmail.com
                  </div>
                  {formData.origin && (
                    <div className="mt-2">
                      <strong>Origin:</strong> {formData.origin}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Serial Number */}
        <div className="space-y-2">
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
            Serial Number <span className="text-red-500">*</span>
          </label>
          <input
            id="serialNumber"
            type="text"
            placeholder="Enter serial number"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.serial_number && (
            <p className="text-red-500 text-sm">{errors.serial_number[0]}</p>
          )}
        </div>

        {/* Origin - Now a dropdown */}
        <div className="space-y-2">
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
            Origin <span className="text-red-500">*</span>
          </label>
          <select
            id="origin"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {pakistaniCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.origin && (
            <p className="text-red-500 text-sm">{errors.origin[0]}</p>
          )}
        </div>

        {/* Production Date */}
        <div className="space-y-2">
          <label htmlFor="productionDate" className="block text-sm font-medium text-gray-700">
            Production Date
          </label>
          <input
            id="productionDate"
            type="date"
            value={formData.productionDate}
            onChange={(e) => setFormData({ ...formData, productionDate: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.production_date && (
            <p className="text-red-500 text-sm">{errors.production_date[0]}</p>
          )}
        </div>

        {/* Weight Type */}
        <div className="space-y-2">
          <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
            Weight Type
          </label>
          <select
            id="accountType"
            value={formData.accountType}
            onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Kg">Kg</option>
            <option value="Tola">Tola</option>
            <option value="Gram">Gram</option>
          </select>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Weight <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter weight"
            value={formData.firstName}
            onChange={(e) => handleNumberChange("firstName", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight[0]}</p>
          )}
        </div>

        {/* Fine Weight In Grams */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Fine Weight In Grams <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter fine weight"
            value={formData.lastName}
            onChange={(e) => handleNumberChange("lastName", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.fine_weight && (
            <p className="text-red-500 text-sm">{errors.fine_weight[0]}</p>
          )}
        </div>

        {/* Metal Type */}
        <div className="space-y-2">
          <label htmlFor="metalType" className="block text-sm font-medium text-gray-700">
            Metal Type <span className="text-red-500">*</span>
          </label>
          <select
            id="metalType"
            value={formData.metalType}
            onChange={(e) => setFormData({ ...formData, metalType: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="GOLD">GOLD</option>
            <option value="SILVER">SILVER</option>
          </select>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Purchaser
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username (optional)"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Data
          </button>
        </div>
      </div>

      <style >{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}