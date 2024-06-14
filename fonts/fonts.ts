import {
  Bebas_Neue,
  Big_Shoulders_Inline_Display,
  Libre_Barcode_128_Text,
} from "next/font/google";

export const libreBarcode128Text = Libre_Barcode_128_Text({
  weight: ["400"], // Libre Barcode 128 Text typically comes in one weight
  subsets: ["latin"],
  display: "swap",
});
// Import the font with the required weight
export const bebasNeue = Bebas_Neue({
  weight: "400", // Bebas Neue usually comes in only one weight
  subsets: ["latin"],
  display: "swap",
});

export const bigShouldersInlineDisplay = Big_Shoulders_Inline_Display({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Define the weights you want to use
  subsets: ["latin"],
  display: "swap",
});
