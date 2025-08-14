import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    //here we just kept it simple 
    //In a real world app you'd like to put a user id or ip address as your key
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;


