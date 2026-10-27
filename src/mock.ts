export interface UpsAttribute {
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
    description: "Линейно-интерактивный ИБП для офиса. Обеспечивает надежную защиту серверов и рабочего оборудования от перепадов напряжения.",
    capacity: 1500,
    max_current: 10,
    image_url: "", 
    video_url: "/default.mp4",
    likes_count: 3,
    attributes: [
      { name: "Производитель", value: "APC" },
      { name: "Тип", value: "Линейно-интерактивный" },
      { name: "Время автономии", value: "15 мин" }
    ]
  },
  {
    id: 2,
    ups_name: "ИБП CyberPower OLS2000",
    description: "Онлайн-ИБП с двойным преобразованием.",
    capacity: 2000,
    max_current: 8,
    image_url: "https://picsum.photos/400/300", 
    video_url: "",
    likes_count: 1,
    attributes: [
      { name: "Производитель", value: "CyberPower" },
      { name: "Тип", value: "Онлайн" }
    ]
  },
  {
    id: 3,
    ups_name: "ИБП Ippon Innova RT 1000",
    description: "Для серверных стоек.",
    capacity: 1000,
    max_current: 6,
    image_url: "",
    video_url: "",
    likes_count: 5,
    attributes: [
      { name: "Производитель", value: "Ippon" }
    ]
  }
];