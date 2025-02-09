import { motion } from 'framer-motion';

const Hero = () => {
    return (
      <section id="home" className="flex items-center w-full min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 xl:grid-cols-2 w-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center items-center lg:items-start space-y-6 px-4 sm:px-8 lg:px-12">
              <div className="max-w-2xl lg:max-w-none">
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-slate-300 text-center lg:text-left">
                  Manage Your Expenses Easily With
                  <span className="px-5 
                      bg-gradient-to-r from-gray-950 via-slate-200 to-gray-950
                      bg-clip-text text-transparent
                      inline-block mt-2 lg:mt-4">
                    Kha₹cha
                  </span>
                </h1>
                <blockquote className="text-slate-500 text-lg sm:text-xl lg:border-l border-slate-400 pl-4 lg:pl-6 italic mt-6 text-center lg:text-left">
                  We are providing the easiest way to manage expenses. Get a full view so you know where to save.
                  Track spending, detect fraud, and keep tabs on rising subscription costs.
                </blockquote>
                <div className="flex justify-center lg:justify-start w-full">
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg mt-6
                          border border-solid border-yellow-50
                          bg-transparent hover:bg-yellow-50 hover:text-gray-950 transition-colors 
                          text-base sm:text-lg">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Right Grid */}
            <div className="hidden xl:grid grid-cols-3 grid-rows-3 h-full border-l-2 border-yellow-50">
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
        </motion.div>
      </section>
    )
}

export default Hero;