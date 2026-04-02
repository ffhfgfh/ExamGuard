import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with real-time inventory, payments, and admin dashboard.",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates and drag-and-drop workflows.",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSockets"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Content Generator",
    description:
      "Smart content creation platform powered by machine learning for marketers and writers.",
    tags: ["React", "Python", "OpenAI", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-heading text-sm tracking-widest uppercase mb-3">
            My Work
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Featured{" "}
            <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-xl overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="View live site"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="View source code"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
