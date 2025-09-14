import { motion } from "framer-motion";
import { ArrowDown, Lightbulb, Code2, Rocket } from "lucide-react";

const StrategicExecution = () => {
 

  const steps = [
    {
      number: "01",
      icon: Lightbulb,
      title: "INNOVATION",
      description:
        "Innovation is the process of creating and implementing new ideas, products, services, or processes that bring about positive change or improvement. It involves finding novel solutions to existing problems or identifying new opportunities in various fields.",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: Code2,
      title: "DEVELOPMENT",
      description:
        "Development is a broad and multifaceted term that can refer to several different contexts, including economic, social, personal, and organizational. This refers to the process by which a nation's wealth and standard of living improve over time.",
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "03",
      icon: Rocket,
      title: "CREATOR",
      description:
        "Creator is a term commonly used to refer to individuals or entities that produce or bring something into existence. Creators are often associated with the generation of various forms of content, art, inventions, or innovations.",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <>
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="mb-6"
              >
                <ArrowDown className="w-8 h-8 text-blue-600 mx-auto" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Strategic{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Execution
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Tailored Managed IT Services That Adapt To Your Evolving
                Business Needs
              </p>
            </motion.div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200 from-blue-500 to-purple-600"></div>
                    <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
                      <div
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${step.color} mb-6`}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <img
            src="./service/car4.png"
            style={{ width: "100%" }}
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default StrategicExecution;
