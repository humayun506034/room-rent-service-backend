// autoReply.js

import axios from 'axios'
// export const autoReplyHandler = async (msg:any) => {
//   const number = msg.from;
//   const text = msg.body.trim().toLowerCase();

// try {
//     const response = await axios.post(
//       "http://172.83.14.141:8010/api/v1/api/v1/chat",
//       {
//         message: text,
//         user_id: number
//       },
//       {
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json"
//         }
//       }
//     );

//       return msg.reply(response.data);


//     // console.log();
//   } catch (error) {
//    console.log(error)
//   }

// };



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
