import { Github, Linkedin, Globe } from "lucide-react"

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
        <p className="mb-8 text-lg">I'd love to hear from you! Whether you have a question or just want to say hi, feel free to connect.</p>
        <div className="flex justify-center space-x-8">
          <a href="https://github.com/2504pratik" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition-colors">
            <Github className="w-10 h-10" />
          </a>
          <a href="https://www.linkedin.com/in/pratik-kende/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200 transition-colors">
            <Linkedin className="w-10 h-10" />
          </a>
          <a href="https://pratikkende.tech" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition-colors">
            <Globe className="w-10 h-10" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact