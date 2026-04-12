export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: "Makale" | "Bildiri";
  url: string;
  tags: string[];
};

export const publications: Publication[] = [
  {
    title:
      "Using Explainable Artificial Intelligence in Buy and Sell Signals in the Cryptocurrency Market",
    authors: "Çetlenbik, O. C., Süzen, A. A.",
    venue:
      "4th International Conference on Contemporary Academic Research (ICCAR 2025)",
    year: "2025",
    type: "Bildiri",
    url: "https://drive.google.com/file/d/1NaPQ5A7Tccv43LkdVjXhNv6Q6RRO3Hb2/view",
    tags: ["XAI", "Kripto", "Finans"],
  },
  {
    title: "IoT Security and Software Testing",
    authors: "Çetlenbik, O. C., Süzen, A. A., Duman, B.",
    venue: "Yalvaç Akademi Dergisi, Cilt 9",
    year: "2024",
    type: "Makale",
    url: "https://doi.org/10.57120/yalvac.1437571",
    tags: ["IoT", "Güvenlik", "Yazılım Testi"],
  },
  {
    title:
      "Hybrid Approaches to Price Prediction in Cryptocurrency Markets: Machine Learning and Technical Analysis",
    authors: "Çetlenbik, O. C., Süzen, A. A.",
    venue:
      "5th International Conference on Engineering and Applied Natural Sciences (ICEANS 2024)",
    year: "2024",
    type: "Bildiri",
    url: "https://drive.google.com/file/d/1FoUXnsnwrA5G1AOwAgNmqwIwLudu6XTI/view",
    tags: ["ML", "Kripto", "Teknik Analiz"],
  },
  {
    title: "Classification of Phishing Attacks Using the RoBERTa Model",
    authors: "Çetlenbik, O. C., Gürfidan, R., Süzen, A. A.",
    venue:
      "4th International Conference on Innovative Academic Studies (ICIAS 2024)",
    year: "2024",
    type: "Bildiri",
    url: "https://www.researchgate.net/publication/379119600_CLASSIFICATION_OF_PHISHING_ATTACKS_USING_THE_RoBERTa_MODEL",
    tags: ["NLP", "Phishing", "Transformer"],
  },
  {
    title: "Examining the Results of Phishing Attacks in a Sample Attack Simulation",
    authors: "Süzen, A. A., Çetlenbik, O. C.",
    venue: "1st International Conference on Innovative Academic Studies",
    year: "2022",
    type: "Bildiri",
    url: "https://www.researchgate.net/publication/363771750_Examining_the_Results_of_Phishing_Attacks_in_a_Sample_Attack_Simulation",
    tags: ["Phishing", "Simülasyon", "Sosyal Mühendislik"],
  },
];
