/**
 * today() --> get today's date in format YYYY-MM-DD
 * @return {date} current date
 */
function today() {
  const today = new Date();
  return today.getFullYear()+
    '-'+(today.getMonth()+1)+
    '-'+today.getDate();
}


module.exports = today;
