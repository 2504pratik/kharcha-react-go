import { Github, Linkedin, Globe } from "lucide-react"

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-12">Get In Touch</h2>
      <div className="flex justify-center space-x-8">
        <a href="https://github.com/2504pratik" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition-colors">
          <Github className="w-8 h-8" />
        </a>
        <a href="https://www.linkedin.com/in/pratik-kende/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200 transition-colors">
          <Linkedin className="w-8 h-8" />
        </a>
        <a href="https://pratikkende.tech" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition-colors">
          <Globe className="w-8 h-8" />
        </a>
      </div>
    </div>
  </section>
  )
}

export default Contact