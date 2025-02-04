const Hero = () => {
    return (
      <section id="home" className="flex items-center w-full">
        <div className="grid grid-cols-2 w-full h-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center items-start space-y-6 px-12">
            <h1 className="text-6xl font-bold text-slate-300">
              Manage Your Expenses Easily With
              <span className="px-5 
                  bg-gradient-to-r from-gray-950 via-slate-200 to-gray-950
                  bg-clip-text text-transparent
                  inline-block mt-4">
                Kha₹cha
                </span>
            </h1>
            <p className="text-slate-500 text-xl max-w-lg">
              We are providing the easiest way to manage expenses. Get a full view so you know where to save.
              Track spending, detect fraud, and keep tabs on rising subscription costs.
            </p>
            <button className="px-8 py-3 rounded-lg 
                    border border-solid border-yellow-50
                    bg-transparent hover:bg-yellow-50 hover:text-gray-950 transition-colors text-lg">
              Get Started
            </button>
            </div>
  
            {/* Right Grid */}
            <div className="grid grid-cols-3 grid-rows-3 h-full border-l-2 border-yellow-50">
                <div className="border border-yellow-50">
                    <img src="goal-plan.png" alt="Plan Goals" className="bg-yellow-50 w-full h-full object-cover" />
                </div>
                <div className="border border-yellow-50"></div>
                <div className="border border-yellow-50">
                    <img src="graph.png" alt="Plan Goals" className="bg-sky-50 w-full h-full object-cover" />
                </div>
                <div className="col-span-3 p-8">
                  <div className="flex flex-col justify-center items-center">
                    <span className="px-5 text-3xl
                        bg-gradient-to-b from-gray-950 via-yellow-100 to-gray-950
                        bg-clip-text text-transparent
                        inline-block mt-4">
                      Track Smarter, Spend Wiser, Save More!
                    </span>
                    <span className="px-5 text-3xl font-thin
                          bg-gradient-to-b from-gray-950 via-sky-100 to-gray-950
                          bg-clip-text text-transparent
                          inline-block mt-4">
                        Track Smarter, Spend Wiser, Save More!
                    </span>
                    <span className="px-5 text-3xl
                          bg-gradient-to-b from-gray-950 via-pink-100 to-gray-950
                          bg-clip-text text-transparent
                          inline-block mt-4">
                        Track Smarter, Spend Wiser, Save More!
                      </span>
                  </div>
                </div>
                <div className="border border-yellow-50">
                    <img src="friends.png" alt="Plan Goals" className="bg-green-50 w-full h-full object-cover" />
                </div>
                <div className="border border-yellow-50"></div>
                <div className="border border-yellow-50">
                    <img src="finance.png" alt="Plan Goals" className="bg-pink-50 w-full h-full object-cover" />
                </div>
            </div>
        </div>
      </section>
    )
  }
  
  export default Hero;