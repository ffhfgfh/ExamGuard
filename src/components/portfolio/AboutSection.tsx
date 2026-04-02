import { motion } from "framer-motion";
import { Code, Palette, Zap } from "lucide-react";

const highlights = [
  {
    Icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    Icon: Palette,
    title: "Creative Design",
    description: "Blending aesthetics with functionality for memorable experiences.",
  },
  {
    Icon: Zap,
    title: "Performance",
    description: "Optimizing every pixel and millisecond for blazing-fast apps.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-heading text-sm tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Turning ideas into{" "}
            <span className="text-gradient">reality</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a full-stack developer with 5+ years of experience building
              web applications. I specialize in React, TypeScript, and modern
              web technologies that deliver exceptional user experiences.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new design trends,
              contributing to open-source projects, or sharing knowledge through
              technical writing and mentoring.
            </p>
          </motion.div>

          <div className="space-y-5">
            {highlights.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="glass-card rounded-lg p-5 flex items-start gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
