"use client"

import { QRCodeSVG } from "qrcode.react"

export default function Certificate({ formData }) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto border-2 border-black">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-4">
          {/* Diamond Logo */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 transform rotate-45 rounded-sm"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-gray-400 to-gray-600 transform rotate-45 rounded-sm"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 to-yellow-500 transform rotate-45 rounded-sm"></div>
          </div>

          {/* Company Text */}
          <div>
            <h1 className="text-2xl font-bold text-yellow-600 mb-1">Dubai Gold-Silver Bar Maker</h1>
            <p className="text-lg text-black" style={{ fontFamily: "Arial" }}>
              دبئی گولڈ سلور بار میکر
            </p>
          </div>
        </div>

        {/* QR Code and Date */}
        <div className="text-right">
          <div className="mb-2">
            <QRCodeSVG value="https://dubaigoldsilver.com" size={80} level="M" includeMargin={true} />
          </div>
          <div className="text-sm font-medium">Date: ________________</div>
        </div>
      </div>

      {/* Main Table */}
      <div className="border-2 border-black mb-4">
        {/* First Row Headers */}
        <div className="grid grid-cols-4 border-b-2 border-black">
          <div className="border-r-2 border-black p-3 text-center">
            <div className="font-bold">Bar Number</div>
            <div className="text-sm">بار نمبر</div>
          </div>
          <div className="border-r-2 border-black p-3 text-center">
            <div className="font-bold">Weight</div>
            <div className="text-sm">وزن</div>
          </div>
          <div className="border-r-2 border-black p-3 text-center">
            <div className="font-bold">Fine Weight in Grams</div>
            <div className="text-sm">خالص وزن فی گرام</div>
          </div>
          <div className="p-3 text-center">
            <div className="font-bold">Type</div>
            <div className="text-sm">قسم</div>
          </div>
        </div>

        {/* Data Row */}
        <div className="grid grid-cols-4 border-b-2 border-black min-h-[60px]">
          <div className="border-r-2 border-black p-3 text-center flex items-center justify-center">
            {formData.barNumber}
          </div>
          <div className="border-r-2 border-black p-3 text-center flex items-center justify-center">
            {formData.weight}
          </div>
          <div className="border-r-2 border-black p-3 text-center flex items-center justify-center">
            {formData.fineWeight}
          </div>
          <div className="p-3 text-center flex items-center justify-center">{formData.type}</div>
        </div>

        {/* Second Table Section */}
        <div className="grid grid-cols-3 min-h-[80px]">
          <div className="border-r-2 border-black p-3 text-center">
            <div className="font-bold mb-2">Kg.</div>
            <div className="text-lg">{formData.kg}</div>
          </div>
          <div className="border-r-2 border-black p-3 text-center">
            <div className="font-bold mb-2">Tola</div>
            <div className="text-lg">{formData.tola}</div>
          </div>
          <div className="p-3 text-center relative">
            <div className="font-bold mb-2">Gram</div>
            <div className="text-lg">{formData.gram}</div>
            {/* Small watermark logo in bottom right */}
            <div className="absolute bottom-1 right-1 w-8 h-8 opacity-30">
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 transform rotate-45 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-black">
        <div className="mb-1">Shop#1, Aslam Plaza, Soha Bazar, Rang Mehal, Lahore.</div>
        <div>Cell: 0300-0000000, www.Dubaigoldsilver.com</div>
      </div>
    </div>
  )
}