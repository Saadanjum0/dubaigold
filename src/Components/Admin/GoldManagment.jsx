"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Edit, X } from "lucide-react"
import { supabase } from "../../api/supabaseClient"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
 
export default function GoldManagement() {
  const [metals, setMetals] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [weightTypeFilter, setWeightTypeFilter] = useState("all")
  const [metalTypeFilter, setMetalTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  // Fetch metals from Supabase
  useEffect(() => {
    const fetchMetals = async () => {
      try {
        const { data, error } = await supabase
          .from('metals')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setMetals(data || []);
      } catch (err) {
        console.error("Error fetching metals:", err);
        toast.error("Failed to load metals data");
      }
    }
    fetchMetals()
  }, [])

  // Filter metals based on search & filters
  const filteredData = metals.filter((item) => {
    const matchesSearch =
      item.serial_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.metal_type?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesWeightType =
      weightTypeFilter === "all" ||
      item.weight_type?.toLowerCase() === weightTypeFilter.toLowerCase()

    const matchesMetalType =
      metalTypeFilter === "all" ||
      item.metal_type?.toLowerCase() === metalTypeFilter.toLowerCase()

    const matchesDate =
      dateFilter === "" || item.production_date === dateFilter

    return matchesSearch && matchesWeightType && matchesMetalType && matchesDate
  })

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this metal?")) {
      try {
        const { error } = await supabase
          .from('metals')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        toast.success("Data deleted successfully!");
        // Remove deleted item from state to update table instantly
        setMetals((prev) => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to delete Data.");
      }
    }
  };


  const getMetalTypeColor = (metalType) => {
    switch (metalType?.toLowerCase()) {
      case "gold":
        return "text-yellow-600 bg-yellow-50"
      case "silver":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getWeightTypeColor = (weightType) => {
    switch (weightType?.toLowerCase()) {
      case "kg":
        return "text-green-600 bg-green-50"
      case "tola":
        return "text-blue-600 bg-blue-50"
      case "gram":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div>

  

  
    <div className="min-h-screen  bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 font-medium">
              Search & Filter Gold/Silver Bars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Serial number, origin, username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Weight Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Type
              </label>
              <select
                value={weightTypeFilter}
                onChange={(e) => setWeightTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
              >
                <option value="all">All Weight Types</option>
                <option value="kg">Kg</option>
                <option value="tola">Tola</option>
                <option value="gram">Gram</option>
              </select>
            </div>

            {/* Metal Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metal Type
              </label>
              <select
                value={metalTypeFilter}
                onChange={(e) => setMetalTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
              >
                <option value="all">All Metal Types</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Production Date
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border-gray-200 rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              All Metal Bars ({filteredData.length} items)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-gray-200 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serial Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Origin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Production Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fine Weight (Grams)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metal Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchaser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.serial_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {item.origin}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.production_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWeightTypeColor(
                          item.weight_type
                        )}`}
                      >
                        {item.weight_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {item.fine_weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMetalTypeColor(
                          item.metal_type
                        )}`}
                      >
                        {item.metal_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        {item.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                       <button
  onClick={() => handleDelete(item.id)}
  className="inline-flex items-center justify-center h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
>
  <X className="w-4 h-4 text-gray-600 cursor-pointer" />
</button>

                       <Link to={`/detail/${item.id}`}>
                        <button className="inline-flex items-center justify-center h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                   
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
     </div>

  )
}
