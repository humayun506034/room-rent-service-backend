// autoReply.js

import axios from 'axios'
import { ProductService } from '../products/product.service';
import { TApartment } from '../products/product.interface';



// export const autoReplyHandler = async (msg: any) => {
//   const number = msg.from;
//   const text = msg.body.trim().toLowerCase();

//   try {
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

//     const data = response.data;

//     // --------------------------
//     // FORMAT THE MESSAGE
//     // --------------------------

//     let replyText = `*${data.general_response}*\n\n`;

//     data.apartments.forEach((apt: any, index: number) => {
//       replyText += `🏠 *Apartment ${index + 1}*\n`;
//       replyText += `📍 Location: ${apt.location}\n`;
//       replyText += `🛏 Bedrooms: ${apt.bedrooms}\n`;
//       replyText += `🛁 Bathrooms: ${apt.bathrooms}\n`;
//       replyText += `💰 Rent: ${apt.monthly_rent} BDT per month\n`;
//       replyText += `ℹ️ About: ${apt.about}\n`;
//       replyText += `ID: ${apt.id}\n`;
//       replyText += `------------------------------------\n`;
//     });

//     return msg.reply(replyText);

//   } catch (error: any) {
//     console.error("AutoReply error:", error?.response?.data || error);
//     return msg.reply("❗ Something went wrong. Please try again later.");
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
      }
    );

    const data = response.data;
    let replyText = `*${data.general_response}*\n\n`;

    const apartmentIds = data.apartment_ids;

    for (let i = 0; i < apartmentIds.length; i++) {
      // getSingleProduct() should return lean() object or Mongoose Document
      const apt = await ProductService.getSingleProduct(apartmentIds[i]);

      if (!apt) continue;

      replyText += `🏠 *Apartment ${i + 1}*\n`;
      replyText += `------------------------------------\n`;

      if (apt.city_name && apt.neighborhood) 
        replyText += `📍 Location: ${apt.city_name}, ${apt.neighborhood}\n`;
      if (apt.property_size) 
        replyText += `📏 Size: ${apt.property_size} sq ft\n`;

      // Bedrooms/Bathrooms
      if ("bedrooms" in apt && apt.bedrooms) replyText += `🛏 Bedrooms: ${apt.bedrooms}\n`;
      if ("bathrooms" in apt && apt.bathrooms) replyText += `🛁 Bathrooms: ${apt.bathrooms}\n`;

      // Office specific
      if ("office_rooms" in apt && apt.office_rooms) replyText += `🏢 Office Rooms: ${apt.office_rooms}\n`;
      if ("office_conference_rooms" in apt && apt.office_conference_rooms)
        replyText += `🏢 Conference Rooms: ${apt.office_conference_rooms}\n`;
      if ("office_workstations" in apt && apt.office_workstations)
        replyText += `💻 Workstations: ${apt.office_workstations}\n`;

      if (apt.listing_type) replyText += `🏷 Listing Type: ${apt.listing_type}\n`;
      if (apt.property_category) replyText += `🏡 Category: ${apt.property_category}\n`;
      if (apt.about) replyText += `💬 About: ${apt.about}\n\n`;

      // Owner info
      if (apt.owner_name || apt.owner_phone) {
        replyText += `📞 Owner Details\n`;
        if (apt.owner_name) replyText += `👤 Name: ${apt.owner_name}\n`;
        if (apt.owner_phone) replyText += `📱 Phone: ${apt.owner_phone}\n\n`;
      }

      // Nearby info
      if (apt.distance_to_main_road) replyText += `📌 Distance to Road: ${apt.distance_to_main_road}\n`;
      if (apt.nearby_landmarks) replyText += `📌 Landmarks: ${apt.nearby_landmarks}\n\n`;

      // Rent / Stay info
      if ("monthly_rent" in apt && apt.monthly_rent) replyText += `💰 Rent: ${apt.monthly_rent} BDT/month\n`;
      if ("advance_payment" in apt && apt.advance_payment) replyText += `💵 Advance: ${apt.advance_payment}\n`;
      if ("security_deposit" in apt && apt.security_deposit) replyText += `💰 Security: ${apt.security_deposit}\n`;

      if ("minimum_stay_days" in apt && apt.minimum_stay_days)
        replyText += `🛏 Minimum Stay: ${apt.minimum_stay_days} days\n`;
      if ("maximum_stay_days" in apt && apt.maximum_stay_days)
        replyText += `🗓 Maximum Stay: ${apt.maximum_stay_days} days\n`;
      if ("daily_rate" in apt && apt.daily_rate) replyText += `💵 Daily Rate: ${apt.daily_rate} USD\n`;

      if ("checkInTime" in apt && apt.checkInTime) replyText += `⏰ Check-In: ${apt.checkInTime}\n`;
      if ("checkOutTime" in apt && apt.checkOutTime) replyText += `⏰ Check-Out: ${apt.checkOutTime}\n`;

      // House rules & included items
      if ("house_rules" in apt && apt.house_rules?.length) {
        replyText += `📜 House Rules:\n`;
        apt.house_rules.forEach(rule => replyText += `• ${rule}\n`);
      }

      if ("whats_included" in apt && apt.whats_included?.length) {
        replyText += `🎁 What's Included:\n`;
        apt.whats_included.forEach(item => replyText += `• ${item}\n`);
      }

      // Property features & building amenities
      if ("property_features" in apt && apt.property_features?.length) {
        replyText += `🏢 Property Features:\n`;
        apt.property_features.forEach(f => replyText += `• ${f}\n`);
      }

      if ("building_amenities" in apt && apt.building_amenities?.length) {
        replyText += `🏗 Building Amenities:\n`;
        apt.building_amenities.forEach(a => replyText += `• ${a}\n`);
      }

      // References
      if (apt.references?.length) {
        replyText += `📌 References:\n`;
        apt.references.forEach(ref => {
          replyText += `• ${ref.reference_name} (${ref.reference_relationship}): ${ref.reference_phone}\n`;
        });
      }

      // Images
      if (apt.images?.length) {
        replyText += `🖼 Images:\n`;
        apt.images.forEach(img => replyText += `${img.link}\n`);
      }

      if (apt._id) replyText += `\n🆔 ID: ${apt._id}\n`;
      replyText += `------------------------------------\n\n`;

      let finalLink = "";

    if (apt.listing_type === "Normal Apartment") {
   finalLink = `https://yannyamba/apartment/${apt._id}`;
    } else if (apt.listing_type === "Furnished Apartment") {
  finalLink = `https://yannyamba/furnished/${apt._id}`;
    }

    replyText += `🔗 View Details: ${finalLink}\n`;
    }

    return msg.reply(replyText);

  } catch (error: any) {
    console.error("AutoReply error:", error?.response?.data || error);
    return msg.reply("❗ Something went wrong. Please try again later.");
  }
};
