export type OfficeHour = {
  day: string;
  start: string;
  end: string;
  location: string;
};

// Bu veriyi admin'den değil, doğrudan buradan güncelle
export const officeHours: OfficeHour[] = [
  {
    day: "Pazartesi",
    start: "13:00",
    end: "15:00",
    location: "Teknik Bilimler MYO · Akademisyen Odası",
  },
  {
    day: "Çarşamba",
    start: "10:00",
    end: "12:00",
    location: "Teknik Bilimler MYO · Akademisyen Odası",
  },
  {
    day: "Çevrim içi",
    start: "Randevu ile",
    end: "",
    location: "E-posta üzerinden iletişim",
  },
];
