import {EventDetail} from '../EventDetail/EventDetail'

// export const mockEvent: EventDetail = {  
//   id: 101,  
//   banner: "../../../public/event.avif",  
//   name: "Spring Music Festival",  
//   description: "Join us for a day of music, food, and fun at the annual Spring Music Festival!",  
//   location: "Central Park, New York, NY",  
//   status: "Published",  
//   venue_type: "outdoor",  
//   categories: ["Music", "Festival", "Food"],  
//   created_at: "2024-12-05T10:00:00Z",  
//   from_date: "2025-04-15T12:00:00Z",  
//   to_date: "2025-04-15T20:00:00Z",
//   base_price : 20,

// };  

export const mockEvent: EventDetail = {
  id: 1,
  banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  name: "همایش برنامه‌نویسی و هوش مصنوعی",
  description: "در این همایش، متخصصان برتر حوزه هوش مصنوعی و برنامه‌نویسی گرد هم می‌آیند تا آخرین دستاوردها و فناوری‌های روز دنیا را به اشتراک بگذارند.",
  location: "تهران، دانشگاه صنعتی شریف",
  status: "Published",
  venue_type: "Hybrid",
  categories: ["تکنولوژی", "برنامه‌نویسی"],
  created_at: "2024-03-15T08:00:00Z",
  from_date: "2024-04-20T09:00:00Z",
  to_date: "2024-04-20T17:00:00Z",
  base_price: 100000,
  media: [
    {
      id: 1,
      title: "برنامه زمانی همایش",
      type: "pdf",
      url: "https://example.com/schedule.pdf"
    },
    {
      id: 2,
      title: "اسلایدهای ارائه کلیدی",
      type: "pptx",
      url: "https://example.com/keynote.pptx"
    },
    {
      id: 3,
      title: "جزوه کارگاه هوش مصنوعی",
      type: "word",
      url: "https://example.com/workshop.docx"
    },
    {
      id: 4,
      title: "ویدیوی معرفی رویداد",
      type: "video",
      url: "https://example.com/intro.mp4"
    }
  ]
};