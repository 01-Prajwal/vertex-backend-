exports.addCredit = async (user, type) => {
    let creditEarned = 0;
  
    if (type === "login") {
      const lastLogin = user.activityLog.find(a => a.type === "login");
      const today = new Date().toDateString();
  
      if (!lastLogin || new Date(lastLogin.timestamp).toDateString() !== today) {
        creditEarned = 5;
      }
    } else if (["save", "share", "report"].includes(type)) {
      creditEarned = 2;
    }
  
    if (creditEarned > 0) {
      user.credits += creditEarned;
      user.activityLog.push({ type });
      await user.save();
    }
  
    return creditEarned;
  };
  