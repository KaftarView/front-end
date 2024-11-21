// mockEvents.ts
export type Event = {
    ID: number;
    Status: "draft" | "published" | "cancelled" | "completed";
    Category: string;
    Description: string;
    FromDate: string; // ISO date string
    ToDate: string; // ISO date string
    MinCapacity: number;
    MaxCapacity: number;
    VenueType: "online" | "physical" | "hybrid";
    Location: string;
  };
  
  // Mock events data
  export const mockEvents: Event[] = [
    {
      ID: 1,
      Status: "published",
      Category: "Tech Workshop",
      Description: "A workshop on advanced programming techniques.",
      FromDate: "2024-12-01T09:00:00Z",
      ToDate: "2024-12-01T17:00:00Z",
      MinCapacity: 20,
      MaxCapacity: 100,
      VenueType: "online",
      Location: "",
    },
    {
      ID: 2,
      Status: "draft",
      Category: "Art Exhibition",
      Description: "Showcasing modern art from local artists.",
      FromDate: "2024-12-15T10:00:00Z",
      ToDate: "2024-12-15T18:00:00Z",
      MinCapacity: 10,
      MaxCapacity: 50,
      VenueType: "physical",
      Location: "دانشگاه علم و صنعت",
    },
    {
      ID: 3,
      Status: "completed",
      Category: "Music Concert",
      Description: "A live performance by a famous band.",
      FromDate: "2024-11-10T18:00:00Z",
      ToDate: "2024-11-10T21:00:00Z",
      MinCapacity: 50,
      MaxCapacity: 500,
      VenueType: "physical",
      Location: "دانشگاه شریف",
    },
    {
      ID: 4,
      Status: "cancelled",
      Category: "Cooking Class",
      Description: "Learn to cook delicious meals.",
      FromDate: "2024-11-25T14:00:00Z",
      ToDate: "2024-11-25T16:00:00Z",
      MinCapacity: 5,
      MaxCapacity: 20,
      VenueType: "online",
      Location: "",
    },
    {
      ID: 5,
      Status: "published",
      Category: "Business Seminar",
      Description: "A seminar on scaling startups.",
      FromDate: "2024-12-20T09:00:00Z",
      ToDate: "2024-12-20T15:00:00Z",
      MinCapacity: 30,
      MaxCapacity: 200,
      VenueType: "hybrid",
      Location: "تئاترشهر",
    },
    {
      ID: 6,
      Status: "completed",
      Category: "آموزش لاراول",
      Description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها لازم است",
      FromDate: "2024-12-01T09:00:00Z",
      ToDate: "2024-12-01T17:00:00Z",
      MinCapacity: 20,
      MaxCapacity: 790,
      VenueType: "online",
      Location: "",
    },
  ];





  
  