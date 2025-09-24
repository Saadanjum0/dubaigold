import { Link } from "react-router-dom"

const AtombeatFooter = () => {
  return (
    <footer className="bg-black text-yellow-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Left side - Logo and mission */}
          <div className="flex-1 max-w-md">
            <div className="mb-6">
                <div>

        
                </div>
              <p className="text-lg font-bold text-yellow-500">DUBAI
Gold/Silver-BarMaker</p>
            </div>
            <p className="text-md text-white leading-relaxed mb-6">
            Our mission is to provide trusted, high-quality gold and silver bars exclusively for Pakistan.
            </p>
            <div className=" flex gap-2 " >
<Link to='https://wa.me/923164646715
' >
            
              <div className="w-10 h-10  rounded-full flex items-center justify-center transition-colors cursor-pointer">
            <img src="/Images/newwhat.webp" />
              
            </div>
</Link>
<Link to='https://www.instagram.com/dubai_gold_silver_bars_maker?igsh=MWYyM2Z6YWpxdzM1cw==' >
                
              <div className="w-7 h-7 mt-1.5  rounded-full flex items-center justify-center transition-colors cursor-pointer">
            <img src="/Images/instagram.webp" />
              
            </div>
</Link>
<Link to='https://www.tiktok.com/@dubai_gold_silver_bar?_t=ZS-8zur7aNhnQV&_r=1' >
                
              <div className="w-11 h-11 mb-1 rounded-full flex items-center justify-center transition-colors cursor-pointer">
            <img src="/Images/tiktok.webp" />
             
            </div>
</Link>
<Link to='https://www.facebook.com/share/176CqcbK7x/' >
               
              <div className="w-8 h-11  rounded-full flex items-center justify-center transition-colors cursor-pointer">
            <img src="/Images/fb.webp" />
              
            </div>
</Link>


            </div>
          </div>
          {/* Right side - Navigation */}
          <div className="flex  flex-col md:mr-20 gap-4 justify-center text-center">
            <Link to="https://wa.me/923164646715" className="text-white hover:text-blue-200 transition-colors text-lg">
         WhatsApp 
            </Link>
            <Link to="https://www.instagram.com/dubai_gold_silver_bars_maker/#" className="text-white hover:text-blue-200 transition-colors text-lg">
          Instagram
            </Link>
            <Link to="https://www.facebook.com/share/176CqcbK7x/" className="text-white hover:text-blue-200 transition-colors text-lg">
              FaceBook
            </Link>
            <Link to="https://www.tiktok.com/@dubai_gold_silver_bar?_t=ZS-8zur7aNhnQV&_r=1" className="text-white hover:text-blue-200 transition-colors text-lg">
              TikTok
            </Link>
         
          </div>
        </div>
        {/* Bottom section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-300">
          <p className="text-lg text-blue-100">This product  and its certificate are not challengeable in any court of law.</p>
           <p className="text-lg mr-3  text-blue-100">Made in Pakistan</p>
       
        </div>
      </div>
    </footer>
  )
}

export default AtombeatFooter