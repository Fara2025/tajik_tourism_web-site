import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  const techStack = [
    { name: "React 19", icon: "⚛️", desc: t("about_react_desc") },
    { name: "TypeScript", icon: "📘", desc: t("about_ts_desc") },
    { name: "TailwindCSS", icon: "🎨", desc: t("about_tailwind_desc") },
    { name: "Django 5", icon: "🐍", desc: t("about_django_desc") },
    { name: "Django REST Framework", icon: "🔗", desc: t("about_drf_desc") },
    { name: "PostgreSQL", icon: "🐘", desc: t("about_postgres_desc") },
    { name: "i18next", icon: "🌐", desc: t("about_i18n_desc") },
    { name: "Framer Motion", icon: "✨", desc: t("about_framer_desc") },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            📋 {t("about_title")}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
        </motion.div>

        {/* University Info */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">🏛️</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t("about_university")}</h2>
              <p className="text-primary font-medium">{t("about_university_full")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/5 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">🎓 {t("about_department_label")}</h3>
              <p className="text-gray-600">{t("about_faculty")}</p>
              <p className="text-gray-600">{t("about_department")}</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">📅 {t("about_year_label")}</h3>
              <p className="text-gray-600">{t("about_year")}</p>
            </div>
          </div>
        </motion.section>

        {/* About the Project */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">🌍</span> {t("about_project_title")}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {t("about_project_desc_1")}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {t("about_project_desc_2")}
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-5 mt-4">
            <h3 className="font-semibold text-gray-800 mb-3">🎯 {t("about_goals_title")}</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> {t("about_goal_1")}</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> {t("about_goal_2")}</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> {t("about_goal_3")}</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> {t("about_goal_4")}</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> {t("about_goal_5")}</li>
            </ul>
          </div>
        </motion.section>

        {/* System Architecture */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">⚙️</span> {t("about_system_title")}
          </h2>
          <p className="text-gray-700 mb-6">{t("about_system_desc")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 text-center">
              <span className="text-4xl block mb-2">🖥️</span>
              <h3 className="font-semibold text-gray-800">Frontend</h3>
              <p className="text-sm text-gray-600 mt-1">React + TypeScript + TailwindCSS</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 text-center">
              <span className="text-4xl block mb-2">🔧</span>
              <h3 className="font-semibold text-gray-800">Backend</h3>
              <p className="text-sm text-gray-600 mt-1">Django + REST Framework</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5 text-center">
              <span className="text-4xl block mb-2">🗄️</span>
              <h3 className="font-semibold text-gray-800">{t("about_database")}</h3>
              <p className="text-sm text-gray-600 mt-1">PostgreSQL</p>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🛠️</span> {t("about_stack_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <span className="text-3xl block mb-2">{tech.icon}</span>
                <h3 className="font-semibold text-gray-800 text-sm">{tech.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">👥</span> {t("about_team_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/15 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center text-2xl">👩‍🎓</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t("about_student_name")}</h3>
                  <p className="text-primary text-sm font-medium">{t("about_student_role")}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{t("about_student_info")}</p>
            </div>
            {/* Supervisor */}
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/15 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center text-2xl">👨‍🏫</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{t("about_supervisor_name")}</h3>
                  <p className="text-secondary text-sm font-medium">{t("about_supervisor_role")}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{t("about_supervisor_info")}</p>
            </div>
          </div>
        </motion.section>

        {/* Footer note */}
        <motion.div
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>© 2025–2026 Туризм Таджикистана — {t("about_footer_note")}</p>
        </motion.div>

      </div>
    </motion.div>
  );
}
