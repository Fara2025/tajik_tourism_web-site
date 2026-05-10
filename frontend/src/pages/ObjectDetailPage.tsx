import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getCulturalObject, createReview, CulturalObject, ReviewData } from "../api";

function localized(en: string, ru: string, tj: string, lang: string): string {
  if (lang === "ru" && ru) return ru;
  if (lang === "tj" && tj) return tj;
  return en;
}

export default function ObjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [obj, setObj] = useState<CulturalObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCulturalObject(Number(id))
      .then((data) => { setObj(data); setLoading(false); })
      .catch(() => { setError(t("error_loading")); setLoading(false); });
  }, [id, t]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!obj) return;
    setSubmitting(true);
    try {
      await createReview({ cultural_object: obj.id, author_name: reviewName, rating: reviewRating, text: reviewText });
      setReviewSuccess(true);
      setReviewName(""); setReviewText(""); setReviewRating(5);
      const updated = await getCulturalObject(obj.id);
      setObj(updated);
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err) { console.error(err); }
    setSubmitting(false);
  };

  if (loading) return (<div className="min-h-screen flex items-center justify-center pt-24"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>);
  if (error || !obj) return (<div className="min-h-screen flex flex-col items-center justify-center pt-24"><p className="text-red-500 text-xl mb-4">{error || t("error_loading")}</p><Link to="/objects" className="text-primary hover:underline">← {t("back_to_objects")}</Link></div>);

  const title = localized(obj.title, obj.title_ru, obj.title_tj, lang);
  const description = localized(obj.description, obj.description_ru, obj.description_tj, lang);

  return (
    <motion.div className="min-h-screen bg-gray-50 pt-24 pb-16" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/objects" className="inline-flex items-center text-primary hover:underline mb-6">← {t("back_to_objects")}</Link>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {obj.image ? (<img src={obj.image} alt={title} className="w-full h-72 md:h-96 object-cover" referrerPolicy="no-referrer" />) : (<div className="w-full h-72 md:h-96 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center"><span className="text-8xl">🏛️</span></div>)}
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">📂 {obj.category_name}</span>
              {obj.region_name && <span className="bg-secondary/10 text-secondary text-sm px-3 py-1 rounded-full font-medium">📍 {obj.region_name}</span>}
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">📍 {obj.location}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{description}</p>
            {obj.latitude && obj.longitude && (
              <div className="mt-6 rounded-xl overflow-hidden shadow-md">
                <iframe title={`Map — ${title}`} src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${obj.longitude}!3d${obj.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s`} width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💬 {t("reviews_title")} ({obj.reviews?.length || 0})</h2>
          {obj.reviews && obj.reviews.length > 0 ? (
            <div className="space-y-4 mb-8">
              {obj.reviews.map((review: ReviewData) => (
                <div key={review.id} className="bg-white p-5 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">{review.author_name}</span>
                    <div className="flex">{[1,2,3,4,5].map((s) => <span key={s} className={s <= review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>)}</div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-500 mb-8">{t("no_reviews")}</p>}

          {/* Review form */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{t("leave_review")}</h3>
            {reviewSuccess && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">✅ {t("review_success")}</div>}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} required placeholder={t("review_name_placeholder")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50" />
              <div className="flex space-x-2">{[1,2,3,4,5].map((s) => <button key={s} type="button" onClick={() => setReviewRating(s)} className={`text-2xl hover:scale-125 transition ${s <= reviewRating ? "text-yellow-400" : "text-gray-300"}`}>★</button>)}</div>
              <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required placeholder={t("review_text_placeholder")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 h-28 resize-none"></textarea>
              <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50">{submitting ? "..." : t("review_submit")}</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
