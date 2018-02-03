var generateMessage = (from,text) => {
  return {
    from,
    text,
    create:new Date().getTime()
  };
};

module.exports = {generateMessage};