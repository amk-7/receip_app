import { Recipe } from "./types";

export const recipesData: Recipe[] = [
  {
    userId: "user_1",
    title: "PÂTE DE MAÏS",
    cooking_time: 23,
    image: "pate.jpeg",
    ingredients: [
      { name: "farine de maïs", quantity: "500 g" },
      { name: "eau", quantity: "1,5 L" }
    ],
    steps: [
      "Mélanger une partie de la farine dans un peu d’eau froide pour former une bouillie",
      "Verser la bouillie dans l’eau bouillante dans la marmite",
      "Laisser bouillir pendant 5 min",
      "Diminuer un peu de bouillie",
      "Ajouter le reste de la farine et mélanger énergiquement",
      "Rajouter la bouillie retirée précédemment",
      "Laisser cuire 10-15 min à feu doux en remuant puis servir"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "WATCHI",
    cooking_time: 60,
    image: "watchi.jpeg",
    ingredients: [
      { name: "riz", quantity: "500 g" },
      { name: "haricots rouges ou noirs", quantity: "250 g" },
      { name: "sel", quantity: "au goût" },
      { name: "eau", quantity: "suffisamment" },
      { name: "potasse blanche ou rouge", quantity: "au goût" }
    ],
    steps: [
      "Mettre de la potasse dans un quart d'eau",
      "Cuire les haricots avec la potasse pendant 45 min",
      "Ajouter le riz aux haricots cuits, saler et laisser cuire ensemble"
    ],
    is_public: true,
    rating: 5,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "COM",
    cooking_time: 20,
    image: "com.jpg",
    ingredients: [
      { name: "farine de maïs fermentée", quantity: "suffisamment" },
      { name: "eau", quantity: "suffisamment" }
    ],
    steps: [
      "Faire une bouillie avec la farine fermentée",
      "Cuire en remuant jusqu’à épaississement"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "RIZ BLANC",
    cooking_time: 25,
    image: "",
    ingredients: [
      { name: "riz", quantity: "500 g" },
      { name: "eau", quantity: "1 L" },
      { name: "sel", quantity: "au goût" }
    ],
    steps: [
      "Laver le riz",
      "Le mettre dans l’eau salée",
      "Cuire à feu doux jusqu'à absorption"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "RIZ AU GRAS",
    cooking_time: 40,
    image: "Riz_blanc.jpg",
    ingredients: [
      { name: "riz", quantity: "500 g" },
      { name: "tomates", quantity: "2" },
      { name: "tomates concentrées", quantity: "2" },
      { name: "oignon", quantity: "1" },
      { name: "huile", quantity: "suffisamment" },
      { name: "sel", quantity: "au goût" },
      { name: "épices", quantity: "au goût" }
    ],
    steps: [
      "Faire revenir l’oignon et les tomates",
      "Ajouter de l’eau et le riz lavé",
      "Cuire jusqu’à évaporation"
    ],
    is_public: true,
    rating: 5,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "RAGOUT DE VIANDE",
    cooking_time: 75,
    image: "ragout.jpg",
    ingredients: [
      { name: "viande", quantity: "500 g" },
      { name: "tomates", quantity: "suffisamment" },
      { name: "oignons", quantity: "suffisamment" },
      { name: "ail", quantity: "au goût" },
      { name: "épices", quantity: "au goût" }
    ],
    steps: [
      "Faire revenir la viande",
      "Ajouter tomates, oignons et eau",
      "Laisser mijoter"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "HARICOTS",
    cooking_time: 30,
    image: "haricot.jpg",
    ingredients: [
      { name: "haricots", quantity: "500 g" },
      { name: "eau", quantity: "suffisamment" },
      { name: "sel", quantity: "au goût" }
    ],
    steps: [
      "Tremper les haricots pendant 4h ou toute une nuit",
      "Cuire à l’eau bouillante"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "DOYI",
    cooking_time: 30,
    image: "doyi.jpg",
    ingredients: [
      { name: "igname ou manioc bouilli", quantity: "suffisamment" },
      { name: "sel", quantity: "au goût" },
      { name: "beurre ou huile", quantity: "suffisamment" }
    ],
    steps: [
      "Écraser l’igname/manioc bouilli en purée",
      "Ajouter du sel et du beurre"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "FOUFOU",
    cooking_time: 60,
    image: "foufou.jpg",
    ingredients: [
      { name: "igname", quantity: "suffisamment" },
      { name: "eau", quantity: "suffisamment" }
    ],
    steps: [
      "Cuire l’igname à l’eau",
      "Piler chaud jusqu’à texture lisse"
    ],
    is_public: true,
    rating: 5,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "COLICO",
    cooking_time: 60,
    image: "colico.jpeg",
    ingredients: [
      { name: "igname", quantity: "suffisamment" },
      { name: "huile", quantity: "suffisamment" },
      { name: "sel", quantity: "au goût" }
    ],
    steps: [
      "Couper l’igname",
      "Saler",
      "Frire les tranches"
    ],
    is_public: true,
    rating: 5,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "IGNAME FUMÉE",
    cooking_time: 30,
    image: "igname_fumée.jpeg",
    ingredients: [
      { name: "igname", quantity: "suffisamment" }
    ],
    steps: [
      "Cuire l’igname au feu ou au four traditionnel",
      "Tourner au fur et à mesure pour éviter la carbonisation"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "IGNAME PRÉPARÉE",
    cooking_time: 28,
    image: "igname_fumée.jpg",
    ingredients: [
      { name: "igname", quantity: "suffisamment" },
      { name: "eau", quantity: "suffisamment" },
      { name: "sel", quantity: "au goût" }
    ],
    steps: [
      "Peler l’igname",
      "Cuire à l’eau salée"
    ],
    is_public: true,
    rating: 5,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "SALADE",
    cooking_time: 15,
    image: "salade.jpg",
    ingredients: [
      { name: "tomates", quantity: "suffisamment" },
      { name: "oignons", quantity: "suffisamment" },
      { name: "carottes râpées", quantity: "suffisamment" },
      { name: "laitue", quantity: "suffisamment" },
      { name: "œuf", quantity: "1" },
      { name: "mayonnaise", quantity: "au goût" },
      { name: "vinaigre", quantity: "au goût" },
      { name: "huile végétale", quantity: "au goût" }
    ],
    steps: [
      "Préparer une vinaigrette avec mayonnaise, vinaigre, jaune d'œuf et huile",
      "Laver, couper et assembler les ingrédients",
      "Ajouter la vinaigrette"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  },
  {
    userId: "user_1",
    title: "OMELETTE TOGOLAISE",
    cooking_time: 13,
    image: "omelette.jpg",
    ingredients: [
      { name: "œufs", quantity: "suffisamment" },
      { name: "oignon", quantity: "1" },
      { name: "tomate", quantity: "1" },
      { name: "piment", quantity: "au goût" },
      { name: "sel", quantity: "au goût" }
    ],
    steps: [
      "Battre les œufs avec les légumes",
      "Cuire à la poêle dans un peu d’huile"
    ],
    is_public: true,
    rating: 4,
    created_at: Date.now()
  }
];
