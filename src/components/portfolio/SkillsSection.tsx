import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "AWS", "CI/CD", "Figma"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-heading text-sm tracking-widest uppercase mb-3">
            My Skills
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Technologies I{" "}
            <span className="text-gradient">work with</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-5">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
