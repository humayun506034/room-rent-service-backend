// autoReply.js


export const autoReplyHandler = async (msg:any) => {
  const number = msg.from;
  const text = msg.body.trim().toLowerCase();


  return msg.reply("Hi there, hope you are doing well. you send me this message: " + text + "", );
};

