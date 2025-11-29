// autoReply.js

import axios from 'axios'
import { ProductService } from '../products/product.service';



export const autoReplyHandler = async (msg: any) => {
  const number = msg.from;
  const text = msg.body.trim().toLowerCase();

  try {
    const response = await axios.post(
      "http://172.83.14.141:8010/api/v1/api/v1/chat",
      {
        message: text,
        user_id: number
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const data = response.data;

    // --------------------------
    // FORMAT THE MESSAGE
    // --------------------------

    let replyText = `*${data.general_response}*\n\n`;

    data.apartments.forEach((apt: any, index: number) => {
      replyText += `🏠 *Apartment ${index + 1}*\n`;
      replyText += `📍 Location: ${apt.location}\n`;
      replyText += `🛏 Bedrooms: ${apt.bedrooms}\n`;
      replyText += `🛁 Bathrooms: ${apt.bathrooms}\n`;
      replyText += `💰 Rent: ${apt.monthly_rent} BDT per month\n`;
      replyText += `ℹ️ About: ${apt.about}\n`;
      replyText += `ID: ${apt.id}\n`;
      replyText += `------------------------------------\n`;
    });

    return msg.reply(replyText);

  } catch (error: any) {
    console.error("AutoReply error:", error?.response?.data || error);
    return msg.reply("❗ Something went wrong. Please try again later.");
  }
};


// export const autoReplyHandler = async (msg: any) => {
//   const number = msg.from;
//   const text = msg.body.trim().toLowerCase();

//   try {
//     const response = await axios.post("http://172.83.14.141:8010/api/v1/api/v1/chat", {
//       message: text,
//       user_id: number
//     });

//     const data = response.data;

//     const apartmentsFromApi = data.apartment_ids; 
//     const allDetails: any[] = [];

//     for (const id of apartmentsFromApi) {
//       const apartment = await ProductService.getSingleProduct(id);
//       if (apartment) {
//         allDetails.push(apartment); // 👈 এখানে সব ডেটা জমতেছে
//       }
//     }

//     console.log("Final Apartments Detail:", allDetails);

//     // এখন তুমি allDetails থেকে নিজে replyText বানাবে
//     // আমি কিছু যোগ করলাম না কারণ তুমি বলেছো পরে নিজে modify করবে

//     return msg.reply("Apartments fetched successfully.");

//   } catch (error: any) {
//     console.error(error);
//     return msg.reply("❗ Something went wrong.");
//   }
// };
