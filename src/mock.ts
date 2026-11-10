export interface UpsAttribute {
  id: number;
  name: string;
  value: string; 
}

export interface UpsItem {
  id: number;
  ups_name: string;
  description: string;
  capacity: number;
  max_current: number;
  image_url: string;
  video_url: string;
  likes_count: number;
  attributes: UpsAttribute[];
}

export const MOCK_DATA: UpsItem[] = [
  {
    id: 1,
    ups_name: "ИБП APC Smart-UPS 1500",
    description: "Линейно-интерактивный ИБП для офиса",
    capacity: 1500,
    max_current: 10,
    image_url: "", 
    video_url: "",
    likes_count: 3,
    attributes: [
      { id: 1, name: "Производитель", value: "APC" },
      { id: 2, name: "Тип", value: "Линейно-интерактивный" },
      { id: 3, name: "Гарантия", value: "24 месяца" }
    ]
  },
  {
    id: 2,
    ups_name: "ИБП CyberPower OLS2000",
    description: "Онлайн-ИБП с двойным преобразованием",
    capacity: 2000,
    max_current: 8,
    image_url: "", 
    video_url: "",
    likes_count: 1,
    attributes: [
      { id: 1, name: "Производитель", value: "CyberPower" },
      { id: 2, name: "Тип", value: "" }, // Пустое
    ]
  }
];